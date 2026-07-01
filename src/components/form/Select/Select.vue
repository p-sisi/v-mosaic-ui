<template>
  <div :class="classes" ref="wrapperRef">
    <div
      class="m-select__trigger"
      :class="{
        'is-open': popperVisible,
        'is-empty': !hasValue,
        'is-focused': focused,
        'is-hover': hovered,
      }"
      :style="triggerStyle"
      @click="handleTriggerClick"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <!-- 多选模式：Tag 展示 -->
      <template v-if="multiple">
        <div v-if="hasValue" ref="tagsContainerRef" class="m-select__tags">
          <MTag
            v-for="tag in visibleTags"
            :key="tag.value"
            class="m-select__tag"
            :size="tagSize"
            closable
            disable-transitions
            @close="removeTag(tag.value)"
          >
            {{ tag.label }}
          </MTag>
          <template v-if="collapsedCount > 0">
            <MTooltip
              v-if="collapseTagsTooltip"
              :content="collapsedTooltipContent"
              placement="top"
              :show-after="300"
            >
              <span :class="['m-select__tag-collapse', `m-select__tag-collapse--${tagSize}`]">+{{ collapsedCount }}</span>
            </MTooltip>
            <span v-else :class="['m-select__tag-collapse', `m-select__tag-collapse--${tagSize}`]">+{{ collapsedCount }}</span>
          </template>
        </div>
        <span v-else class="m-select__display is-placeholder">{{ placeholder }}</span>
        <!-- 测量层：用于动态计算可视区域可容纳的 tag 数量 -->
        <div
          v-if="collapseTags && selectedTags.length > 0 && maxCollapseTags === undefined"
          ref="measureRef"
          class="m-select__tags-measure"
        >
          <MTag
            v-for="tag in selectedTags"
            :key="tag.value"
            :size="tagSize"
            closable
            disable-transitions
          >
            {{ tag.label }}
          </MTag>
          <span :class="['m-select__tag-collapse', `m-select__tag-collapse--${tagSize}`]">+0</span>
        </div>
      </template>

      <!-- 单选模式 -->
      <template v-else>
        <span class="m-select__display" :class="{ 'is-placeholder': !hasValue }">
          {{ displayLabel }}
        </span>
      </template>

      <span
        v-if="clearable && hasValue && !effectiveDisabled && (hovered || focused)"
        class="m-select__clear"
        @mousedown.prevent.stop="handleClear"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </span>
      <span v-else class="m-select__suffix" :class="{ 'is-open': popperVisible }">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>

    <Teleport to="body">
      <Transition name="m-fade-in-linear">
        <div
          v-show="popperVisible"
          ref="popperRef"
          class="m-select__popper"
          :class="popperClass"
          :style="popperStyle"
        >
          <ul class="m-select__dropdown">
            <slot />
          </ul>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { usePopper } from '../../../hooks/usePopper'
import { useZIndex } from '../../../hooks/useZIndex'
import { useFormItem } from '../../../hooks/useFormItem'
import MTag from '../../general/Tag/Tag.vue'
import MTooltip from '../../feedback/Tooltip/Tooltip.vue'

defineOptions({ name: 'MSelect' })

type SelectValue = string | number
type ModelValue = SelectValue | SelectValue[]

const props = withDefaults(defineProps<{
  modelValue?: ModelValue
  size?: 'small' | 'default' | 'large'
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  placement?: string
  popperClass?: string
  width?: string | number
  multiple?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  maxCollapseTags?: number
}>(), {
  modelValue: '',
  size: 'default',
  disabled: false,
  clearable: false,
  placeholder: '请选择',
  placement: 'bottom-start',
  popperClass: '',
  width: 200,
  multiple: false,
  collapseTags: false,
  collapseTagsTooltip: false,
  maxCollapseTags: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: ModelValue]
  change: [value: ModelValue]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  show: []
  hide: []
  clear: []
  'remove-tag': [value: SelectValue]
}>()

const { effectiveDisabled, effectiveSize } = useFormItem(props)
const { nextZIndex } = useZIndex()

const wrapperRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)
const focused = ref(false)
const hovered = ref(false)

// 选项标签注册表：value -> label
const labelMap = ref<Record<string, string>>({})

function registerOption(value: string | number, label: string | number) {
  labelMap.value[String(value)] = String(label)
}

function unregisterOption(value: string | number) {
  delete labelMap.value[String(value)]
}

// 提供 mSelect 注入上下文
provide('mSelect', {
  modelValue: computed(() => props.modelValue),
  multiple: computed(() => props.multiple),
  handleOptionSelect,
  registerOption,
  unregisterOption,
})

const isMultiple = computed(() => props.multiple)

const hasValue = computed(() => {
  if (isMultiple.value) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  }
  return props.modelValue !== '' && props.modelValue !== undefined && props.modelValue !== null
})

const displayLabel = computed(() => {
  if (!hasValue.value) return props.placeholder
  return labelMap.value[String(props.modelValue)] || String(props.modelValue)
})

// ===== 多选 tags =====
const selectedTags = computed<{ value: SelectValue; label: string }[]>(() => {
  if (!isMultiple.value) return []
  const arr = Array.isArray(props.modelValue) ? props.modelValue : []
  return arr.map(v => ({
    value: v,
    label: labelMap.value[String(v)] || String(v),
  }))
})

// 动态计算的最大可显示 tag 数（collapseTags 且未设 maxCollapseTags 时生效）
const dynamicMaxTags = ref(Infinity)
const tagsContainerRef = ref<HTMLElement | null>(null)
const measureRef = ref<HTMLElement | null>(null)

const effectiveMaxTags = computed(() => {
  if (!props.collapseTags) return Infinity
  if (props.maxCollapseTags !== undefined) return props.maxCollapseTags
  return dynamicMaxTags.value
})

// 根据容器可视区域计算能容纳的 tag 数量
function calcMaxTags() {
  if (!props.collapseTags) return
  if (props.maxCollapseTags !== undefined) return
  if (!measureRef.value || !tagsContainerRef.value) return
  const containerWidth = tagsContainerRef.value.clientWidth
  const tagEls = measureRef.value.querySelectorAll<HTMLElement>('.m-tag')
  const collapseEl = measureRef.value.querySelector<HTMLElement>('.m-select__tag-collapse')
  if (tagEls.length === 0) {
    dynamicMaxTags.value = Infinity
    return
  }
  const gap = 4
  const tagWidths = Array.from(tagEls).map(el => el.offsetWidth + gap)
  const collapseWidth = collapseEl ? collapseEl.offsetWidth + gap : 0

  // 全部能放下时无需折叠
  const totalWidth = tagWidths.reduce((a, b) => a + b, 0)
  if (totalWidth <= containerWidth) {
    dynamicMaxTags.value = tagEls.length
    return
  }
  // 否则计算在预留 +N 空间后能容纳多少个
  let acc = 0
  let count = 0
  for (let i = 0; i < tagWidths.length; i++) {
    if (acc + tagWidths[i] + collapseWidth > containerWidth) break
    acc += tagWidths[i]
    count++
  }
  dynamicMaxTags.value = Math.max(1, count)
}

const visibleTags = computed(() => {
  return selectedTags.value.slice(0, effectiveMaxTags.value)
})

const collapsedCount = computed(() => {
  return Math.max(0, selectedTags.value.length - effectiveMaxTags.value)
})

const collapsedTooltipContent = computed(() =>
  selectedTags.value.slice(effectiveMaxTags.value).map(t => t.label).join('；')
)

const tagSize = computed<'small' | 'default'>(() =>
  effectiveSize.value === 'large' ? 'default' : 'small'
)

function handleOptionSelect(value: SelectValue, _label: string | number) {
  if (effectiveDisabled.value) return
  if (isMultiple.value) {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const idx = current.indexOf(value)
    if (idx >= 0) {
      current.splice(idx, 1)
    } else {
      current.push(value)
    }
    emit('update:modelValue', current)
    emit('change', current)
  } else {
    emit('update:modelValue', value)
    emit('change', value)
    hide()
  }
}

function removeTag(value: SelectValue) {
  if (effectiveDisabled.value) return
  if (!isMultiple.value) return
  const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const idx = current.indexOf(value)
  if (idx >= 0) {
    current.splice(idx, 1)
    emit('update:modelValue', current)
    emit('change', current)
    emit('remove-tag', value)
  }
}

const { visible: popperVisible, show, hide, toggle } = usePopper(
  wrapperRef,
  popperRef,
  arrowRef,
  {
    placement: props.placement as any,
    offset: 6,
    trigger: 'manual',
  }
)

watch(popperVisible, (val) => {
  emit(val ? 'show' : 'hide')
})

function handleTriggerClick(event: MouseEvent) {
  if (effectiveDisabled.value) return
  focused.value = true
  emit('focus', event as any)
  toggle()
}

function handleClear() {
  if (isMultiple.value) {
    emit('update:modelValue', [])
    emit('change', [])
  } else {
    emit('update:modelValue', '')
    emit('change', '')
  }
  emit('clear')
}

// 点击外部关闭
function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node
  if (popperVisible.value) {
    if (wrapperRef.value?.contains(target) || popperRef.value?.contains(target)) {
      return
    }
    hide()
    focused.value = false
    emit('blur', event as any)
  }
}

watch(popperVisible, (val) => {
  if (val) {
    setTimeout(() => document.addEventListener('click', handleDocumentClick), 0)
  } else {
    document.removeEventListener('click', handleDocumentClick)
    focused.value = false
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  resizeObserver?.disconnect()
  resizeObserver = null
})

// ===== 动态折叠 tag 测量 =====
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (typeof ResizeObserver !== 'undefined' && tagsContainerRef.value) {
    resizeObserver = new ResizeObserver(() => calcMaxTags())
    resizeObserver.observe(tagsContainerRef.value)
  }
  nextTick(calcMaxTags)
})

watch(() => selectedTags.value.length, () => nextTick(calcMaxTags))
watch(selectedTags, () => nextTick(calcMaxTags))
watch(() => props.collapseTags, () => nextTick(calcMaxTags))
watch(() => props.width, () => nextTick(calcMaxTags))

const triggerStyle = computed(() => {
  const w = props.width
  return {
    width: typeof w === 'number' ? `${w}px` : w,
  }
})

const triggerWidth = ref(0)

const popperStyle = computed(() => ({
  zIndex: String(nextZIndex()),
  minWidth: triggerWidth.value ? `${triggerWidth.value}px` : undefined,
}))

watch(popperVisible, (val) => {
  if (val) {
    nextTick(() => {
      if (wrapperRef.value) {
        triggerWidth.value = wrapperRef.value.offsetWidth
      }
    })
  }
})

const classes = computed(() => [
  'm-select',
  `m-select--${effectiveSize.value}`,
  {
    'm-select--disabled': effectiveDisabled.value,
    'm-select--multiple': isMultiple.value,
    'm-select--collapse': isMultiple.value && props.collapseTags,
  },
])
</script>

<style lang="scss">
.m-select {
  display: inline-block;
  vertical-align: middle;

  &__trigger {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding: 0 8px;
    background-color: #fff;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    cursor: pointer;
    box-sizing: border-box;
    transition: border-color 0.2s;
    user-select: none;

    &:hover {
      border-color: var(--mosaic-primary);
    }

    &.is-open,
    &.is-focused {
      border-color: var(--mosaic-primary);
    }
  }

  &__display {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);

    &.is-placeholder {
      color: var(--mosaic-text-placeholder);
    }
  }

  &__suffix,
  &__clear {
    display: inline-flex;
    align-items: center;
    color: var(--mosaic-text-placeholder);
    flex-shrink: 0;
    transition: color 0.2s, transform 0.2s;
  }

  &__suffix.is-open {
    transform: rotate(180deg);
    color: var(--mosaic-primary);
  }

  &__clear {
    cursor: pointer;
    color: var(--mosaic-text-placeholder);

    &:hover {
      color: var(--mosaic-text-regular);
    }
  }

  /* 尺寸 */
  &--small &__trigger {
    height: 24px;
    font-size: var(--mosaic-font-size-sm);
  }

  &--default &__trigger {
    height: 32px;
  }

  &--large &__trigger {
    height: 40px;
    font-size: var(--mosaic-font-size-lg);
  }

  /* 多选模式 */
  &--multiple &__trigger {
    flex-wrap: wrap;
    height: auto;
    padding: 2px 8px;
  }

  &--small.m-select--multiple &__trigger {
    min-height: 24px;
  }

  &--default.m-select--multiple &__trigger {
    min-height: 32px;
  }

  &--large.m-select--multiple &__trigger {
    min-height: 40px;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
    flex: 1;
    min-width: 0;
    padding: 1px 0;
  }

  /* 折叠模式：单行不换行，超出隐藏 */
  &--collapse &__tags {
    flex-wrap: nowrap;
    overflow: hidden;
  }

  &__tags-measure {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    left: 0;
    top: 0;
    display: flex;
    gap: 4px;
    align-items: center;
    white-space: nowrap;
  }

  &__tag {
    max-width: 100%;
  }

  &__tag-collapse {
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-secondary);
    background-color: var(--mosaic-fill-color-light);
    border: 1px solid var(--mosaic-border-color-lighter);
    border-radius: var(--mosaic-border-radius);
    cursor: default;
    flex-shrink: 0;
    line-height: 1;
    user-select: none;

    &--small {
      height: 20px;
    }

    &--default {
      height: 24px;
    }
  }

  /* 禁用 */
  &--disabled &__trigger {
    background-color: var(--mosaic-disabled-bg-color);
    border-color: var(--mosaic-disabled-border-color);
    cursor: not-allowed;

    &:hover {
      border-color: var(--mosaic-disabled-border-color);
    }
  }

  &--disabled &__display {
    color: var(--mosaic-disabled-text-color);
  }

  /* 弹出层 */
  &__popper {
    position: absolute;
    padding: 4px 0;
    background-color: #fff;
    border-radius: var(--mosaic-border-radius);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  }

  &__dropdown {
    list-style: none;
    margin: 0;
    padding: 0;
    min-width: 100%;
  }
}
</style>
