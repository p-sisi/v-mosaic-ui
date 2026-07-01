<template>
  <div :class="classes" ref="wrapperRef">
    <input
      ref="inputRef"
      class="m-autocomplete__input"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.up.prevent="handleKeyUp"
      @keydown.down.prevent="handleKeyDown"
      @keydown.enter.prevent="handleKeyEnter"
      @keydown.esc.prevent="handleKeyEsc"
    />
    <span
      v-if="modelValue && !disabled"
      class="m-autocomplete__clear"
      @click="handleClear"
    >
      &times;
    </span>
    <Teleport to="body">
      <div
        v-if="suggestionsVisible"
        ref="popperRef"
        class="m-autocomplete__suggestions"
        :class="[popperClass, { 'm-autocomplete__suggestions--loading': loading }]"
        :style="popperStyle"
      >
        <div v-if="loading && !hideLoading" class="m-autocomplete__loading">
          <span class="m-autocomplete__loading-icon"></span>
        </div>
        <ul v-else class="m-autocomplete__suggestion-list">
          <li
            v-for="(item, index) in suggestions"
            :key="index"
            :class="[
              'm-autocomplete__suggestion-item',
              {
                'm-autocomplete__suggestion-item--highlighted': highlightedIndex === index,
                'm-autocomplete__suggestion-item--disabled': item.disabled,
              },
            ]"
            @click="handleSelect(item)"
            @mouseenter="highlightedIndex = index"
          >
            {{ getItemValue(item) }}
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { usePopper } from '../../../hooks/usePopper'
import { useZIndex } from '../../../hooks/useZIndex'

defineOptions({ name: 'MAutocomplete' })

const props = withDefaults(defineProps<{
  modelValue?: string             // 绑定值，输入框的文本
  fetchSuggestions: (query: string, cb: (results: any[]) => void) => void  // 获取建议的方法，必填
  placeholder?: string            // 占位提示文本
  disabled?: boolean              // 是否禁用
  valueKey?: string               // 建议项中用于显示的键名
  debounce?: number               // 搜索防抖延迟(ms)
  placement?: string              // 弹出层位置
  triggerOnFocus?: boolean        // 是否在聚焦时触发搜索
  selectWhenUnmatched?: boolean   // 是否在无匹配项时按回车也触发 select
  hideLoading?: boolean           // 是否隐藏加载状态
  popperClass?: string            // 弹出层自定义类名
  highlightFirstItem?: boolean    // 是否默认高亮第一项
}>(), {
  modelValue: '',
  placeholder: '请输入',
  disabled: false,
  valueKey: 'value',
  debounce: 300,
  placement: 'bottom-start',
  triggerOnFocus: true,
  selectWhenUnmatched: false,
  hideLoading: false,
  highlightFirstItem: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]  // v-model 更新事件
  input: [value: string]                // 输入时触发
  change: [value: string]               // 值变更时触发
  select: [item: any]                   // 选中建议项时触发
  focus: [event: FocusEvent]            // 获焦时触发
  blur: [event: FocusEvent]             // 失焦时触发
  clear: []                             // 点击清除按钮时触发
}>()

const wrapperRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

const suggestions = ref<any[]>([])
const loading = ref(false)
const highlightedIndex = ref(-1)
const suggestionsVisible = ref(false)

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const { visible, show, hide, updatePosition } = usePopper(
  wrapperRef,
  popperRef,
  arrowRef,
  {
    placement: props.placement as any,
    offset: 6,
    trigger: 'manual',
  }
)

const { nextZIndex } = useZIndex()

const popperStyle = computed(() => {
  const style: Record<string, string> = {
    zIndex: String(nextZIndex()),
  }
  if (wrapperRef.value) {
    style.width = `${wrapperRef.value.offsetWidth}px`
  }
  return style
})

function fetchData(query: string) {
  loading.value = true
  suggestions.value = []
  highlightedIndex.value = props.highlightFirstItem ? 0 : -1

  props.fetchSuggestions(query, (results) => {
    loading.value = false
    if (Array.isArray(results)) {
      suggestions.value = results
      if (results.length > 0) {
        suggestionsVisible.value = true
        visible.value = true
        updatePosition()
      } else {
        suggestionsVisible.value = false
        visible.value = false
      }
    }
  })
}

function debouncedFetch(query: string) {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    fetchData(query)
  }, props.debounce)
}

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value)
  if (value) {
    debouncedFetch(value)
  } else {
    suggestions.value = []
    suggestionsVisible.value = false
    visible.value = false
  }
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
  if (props.triggerOnFocus) {
    fetchData(props.modelValue)
  }
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
  setTimeout(() => {
    suggestionsVisible.value = false
    visible.value = false
  }, 150)
}

function handleKeyUp() {
  if (suggestions.value.length === 0) return
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--
  } else {
    highlightedIndex.value = suggestions.value.length - 1
  }
}

function handleKeyDown() {
  if (suggestions.value.length === 0) return
  if (highlightedIndex.value < suggestions.value.length - 1) {
    highlightedIndex.value++
  } else {
    highlightedIndex.value = 0
  }
}

function handleKeyEnter() {
  if (suggestionsVisible.value && highlightedIndex.value >= 0 && highlightedIndex.value < suggestions.value.length) {
    handleSelect(suggestions.value[highlightedIndex.value])
  } else if (props.selectWhenUnmatched) {
    emit('select', { value: props.modelValue })
  }
}

function handleKeyEsc() {
  suggestionsVisible.value = false
  visible.value = false
}

function handleSelect(item: any) {
  const value = getItemValue(item)
  emit('update:modelValue', value)
  emit('change', value)
  emit('select', item)
  suggestionsVisible.value = false
  visible.value = false
}

function handleClear() {
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  suggestions.value = []
  suggestionsVisible.value = false
  visible.value = false
}

function getItemValue(item: any): string {
  if (typeof item === 'object') {
    return item[props.valueKey] || ''
  }
  return String(item)
}

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

const classes = computed(() => [
  'm-autocomplete',
  {
    'm-autocomplete--disabled': props.disabled,
  },
])

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<style lang="scss">
.m-autocomplete {
  display: inline-flex;
  position: relative;
  width: 100%;

  &__input {
    width: 100%;
    height: 32px;
    padding: 0 12px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    color: var(--mosaic-text-primary);
    font-size: var(--mosaic-font-size);
    background-color: #fff;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: var(--mosaic-primary);
    }

    &::placeholder {
      color: var(--mosaic-text-placeholder);
    }
  }

  &--disabled &__input {
    background-color: var(--mosaic-disabled-bg-color);
    color: var(--mosaic-disabled-text-color);
    cursor: not-allowed;
    border-color: var(--mosaic-disabled-border-color);
  }

  &__clear {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: var(--mosaic-text-secondary);
    font-size: 16px;
    z-index: 1;

    &:hover {
      color: var(--mosaic-text-primary);
    }
  }

  &__suggestions {
    background-color: #fff;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    max-height: 200px;
    overflow-y: auto;
  }

  &__loading {
    padding: 12px;
    text-align: center;
    color: var(--mosaic-text-secondary);

    &-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid var(--mosaic-primary);
      border-top-color: transparent;
      border-radius: 50%;
      animation: m-autocomplete-spin 0.6s linear infinite;
    }
  }

  &__suggestion-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__suggestion-item {
    padding: 0 12px;
    height: 34px;
    line-height: 34px;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-regular);
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--mosaic-fill-color-light);
    }

    &--highlighted {
      background-color: var(--mosaic-fill-color-light);
    }

    &--disabled {
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }
  }
}

@keyframes m-autocomplete-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>