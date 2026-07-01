<template>
  <div :class="classes" :style="customStyle">
    <div v-if="type !== 'textarea'" class="m-input__wrapper">
      <span v-if="$slots.prepend" class="m-input__prepend">
        <slot name="prepend" />
      </span>
      <input
        ref="inputRef"
        class="m-input__inner"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="effectiveReadonly"
        :maxlength="max || undefined"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span
        v-if="isPassword"
        class="m-input__password-toggle"
        @click="togglePassword"
        @mousedown.prevent
      >
        <svg v-if="passwordVisible" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      </span>
      <span
        v-if="clearable && modelValue"
        class="m-input__clear"
        @click="handleClear"
      >
        &times;
      </span>
      <span v-if="showWordLimitInside" class="m-input__word-count">
        {{ wordLimitText }}
      </span>
      <span v-if="showWordInside" class="m-input__word-count">
        {{ currentLength }}
      </span>
      <span v-if="$slots.append" class="m-input__append">
        <slot name="append" />
      </span>
    </div>
    <div v-else class="m-input__wrapper m-input__textarea-wrapper">
      <textarea
        ref="textareaRef"
        class="m-input__inner m-input__textarea"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="effectiveReadonly"
        :maxlength="max || undefined"
        :rows="rows"
        :style="textareaStyle"
        @input="handleTextareaInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span
        v-if="clearable && modelValue"
        class="m-input__clear m-input__textarea-clear"
        @click="handleClear"
      >
        &times;
      </span>
      <span v-if="showWordLimitInside" class="m-input__word-count m-input__textarea-word-count">
        {{ wordLimitText }}
      </span>
      <span v-if="showWordInside" class="m-input__word-count m-input__textarea-word-count">
        {{ currentLength }}
      </span>
    </div>
    <div v-if="showWordLimitOutside || showWordOutside" class="m-input__word-count-outside">
      {{ showWordLimitOutside ? wordLimitText : currentLength }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useSlots, watch } from 'vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MInput' })

type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'textarea'
type InputSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  modelValue?: string | number  // 绑定值，支持 v-model 双向绑定
  type?: InputType              // 输入框类型，textarea 为文本域
  size?: InputSize              // 输入框尺寸
  width?: string                // 自定义宽度，如 "100%"、"200px"
  placeholder?: string          // 占位提示文本
  disabled?: boolean            // 是否禁用输入框
  readonly?: boolean            // 是否只读输入框
  clearable?: boolean           // 是否显示一键清除按钮
  maxlength?: number            // 最大可输入字符数（原生属性，兼容保留）
  max?: number                  // 最大字数限制
  min?: number                  // 最小字数限制
  showWordLimit?: boolean       // 展示当前剩余字数（输入框内部末尾）
  showWord?: boolean            // 展示当前输入了多少个字符（输入框内部末尾）
  showWordLimitOutside?: boolean// 剩余字数展示在输入框外部末尾下面
  showWordOutside?: boolean     // 当前输入字符数展示在输入框外部末尾下面
  rows?: number                 // textarea 默认行数
  autosize?: boolean | { minRows?: number; maxRows?: number }  // 自适应高度
  minRows?: number              // textarea 最小行数
  maxRows?: number              // textarea 最大行数
}>(), {
  modelValue: '',
  type: 'text',
  size: 'default',
  width: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  clearable: false,
  showWordLimit: false,
  showWord: false,
  showWordLimitOutside: false,
  showWordOutside: false,
  rows: 2,
  autosize: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]  // v-model 更新事件
  input: [value: string | number]                // 输入时触发
  change: [value: string | number]               // 值变更时触发
  focus: [event: FocusEvent]                     // 获焦时触发
  blur: [event: FocusEvent]                      // 失焦时触发
  clear: []                                      // 点击清除按钮时触发
}>()

const isFocused = ref(false)
const textareaRef = ref<HTMLTextAreaElement>()
const inputRef = ref<HTMLInputElement>()
const passwordVisible = ref(false)

const { effectiveReadonly } = useFormItem(props)

const isTextarea = computed(() => props.type === 'textarea')
const isPassword = computed(() => props.type === 'password')
const inputType = computed(() => {
  if (isPassword.value && passwordVisible.value) return 'text'
  return props.type
})

function togglePassword() {
  passwordVisible.value = !passwordVisible.value
}

// Resolve effective minRows / maxRows from autosize object or standalone props
const effectiveMinRows = computed(() => {
  if (typeof props.autosize === 'object' && props.autosize.minRows != null) {
    return props.autosize.minRows
  }
  return props.minRows
})

const effectiveMaxRows = computed(() => {
  if (typeof props.autosize === 'object' && props.autosize.maxRows != null) {
    return props.autosize.maxRows
  }
  return props.maxRows
})

const isAutosize = computed(() => !!props.autosize)

const textareaStyle = computed(() => {
  if (!isTextarea.value) return undefined
  // When autosize is off, let the native rows attribute control height
  if (!isAutosize.value) return undefined
  // Autosize handles height via resizeTextarea — return empty to avoid conflict
  return { overflow: 'hidden' }
})

const currentLength = computed(() => String(props.modelValue).length)

const effectiveMax = computed(() => props.max ?? props.maxlength)

const remaining = computed(() => {
  const m = effectiveMax.value
  if (m == null) return 0
  return m - currentLength.value
})

const wordLimitText = computed(() => {
  const m = effectiveMax.value
  if (m == null) return `${currentLength.value}`
  return `${currentLength.value} / ${m}`
})

const showWordLimitInside = computed(() => props.showWordLimit && !props.showWordLimitOutside)
const showWordInside = computed(() => props.showWord && !props.showWordOutside)

const customStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) style.width = props.width
  return style
})

const classes = computed(() => [
  'm-input',
  `m-input--${props.size}`,
  {
    'm-input--disabled': props.disabled,
    'm-input--readonly': effectiveReadonly.value,
    'm-input--focused': isFocused.value,
    'm-input--has-word-count': showWordInside.value || showWordLimitInside.value,
    'm-input--exceed': effectiveMax.value != null && currentLength.value > effectiveMax.value,
    'm-input--below-min': props.min != null && currentLength.value < props.min,
    'm-input--prepend': !isTextarea.value && !!useSlots().prepend,
    'm-input--append': !isTextarea.value && !!useSlots().append,
    'm-input--textarea': isTextarea.value,
    'm-input--password': isPassword.value,
    'm-input--autosize': isTextarea.value && isAutosize.value,
  },
])

function resizeTextarea() {
  const el = textareaRef.value
  if (!el || !isAutosize.value) return

  // Reset height to get the correct scrollHeight
  el.style.height = 'auto'
  const lineHeight = Number.parseFloat(getComputedStyle(el).lineHeight) || 20
  const paddingTop = Number.parseFloat(getComputedStyle(el).paddingTop) || 0
  const paddingBottom = Number.parseFloat(getComputedStyle(el).paddingBottom) || 0
  const borderWidth = Number.parseFloat(getComputedStyle(el).borderTopWidth) || 0
        + Number.parseFloat(getComputedStyle(el).borderBottomWidth) || 0

  const minHeight = effectiveMinRows.value != null
    ? lineHeight * effectiveMinRows.value + paddingTop + paddingBottom + borderWidth
    : 0
  const maxHeight = effectiveMaxRows.value != null
    ? lineHeight * effectiveMaxRows.value + paddingTop + paddingBottom + borderWidth
    : Infinity

  const scrollHeight = el.scrollHeight
  const height = Math.max(minHeight, Math.min(scrollHeight, maxHeight))

  el.style.height = `${height}px`
  el.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden'
}

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value)
}

function handleTextareaInput(event: Event) {
  const value = (event.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
  emit('input', value)
  nextTick(resizeTextarea)
}

function handleChange(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('change', value)
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false
  emit('blur', event)
}

function handleClear() {
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  if (isTextarea.value) nextTick(resizeTextarea)
}

onMounted(() => {
  if (isTextarea.value && isAutosize.value) resizeTextarea()
})

watch(() => props.modelValue, () => {
  if (isTextarea.value && isAutosize.value) nextTick(resizeTextarea)
})
</script>

<style lang="scss">
.m-input {
  display: inline-flex;
  flex-direction: column;
  width: 100%;

  &__wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    height: 32px;
    padding: 0 12px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    background-color: #fff;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus-within {
      border-color: var(--mosaic-primary);
      box-shadow: 0 0 0 2px rgba(167, 139, 250, 0.2);
    }
  }

  &--focused &__wrapper {
    border-color: var(--mosaic-primary);
    box-shadow: 0 0 0 2px rgba(167, 139, 250, 0.2);
  }

  &__inner {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0;
    color: var(--mosaic-text-primary);
    font-size: var(--mosaic-font-size);
    background: transparent;

    &::placeholder {
      color: var(--mosaic-text-placeholder);
    }
  }

  &__clear {
    cursor: pointer;
    color: var(--mosaic-text-secondary);
    font-size: 16px;
    margin-left: 4px;

    &:hover {
      color: var(--mosaic-text-primary);
    }
  }

  &__password-toggle {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: var(--mosaic-text-secondary);
    margin-left: 4px;
    flex-shrink: 0;
    transition: color 0.2s;

    &:hover {
      color: var(--mosaic-text-primary);
    }
  }

  /* 内部字数统计 */
  &__word-count {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--mosaic-text-secondary);
    font-size: 12px;
    white-space: nowrap;
    line-height: 1;
    pointer-events: none;
  }

  &--has-word-count &__inner {
    padding-right: 50px;
  }

  &--exceed &__word-count {
    color: var(--mosaic-danger);
  }

  /* 外部字数统计 */
  &__word-count-outside {
    font-size: 12px;
    color: var(--mosaic-text-secondary);
    line-height: 1.5;
    text-align: right;
    margin-right: 6px;
  }

  &--exceed &__word-count-outside {
    color: var(--mosaic-danger);
  }

  &--below-min &__word-count-outside {
    color: var(--mosaic-danger);
  }

  &--small &__wrapper {
    height: 24px;
    font-size: var(--mosaic-font-size-sm);
  }

  &--large &__wrapper {
    height: 40px;
    font-size: var(--mosaic-font-size-lg);
  }

  &--disabled {
    .m-input__wrapper {
      cursor: not-allowed;
      background-color: #f5f7fa;
      border-color: #e4e7ed;
    }

    .m-input__inner {
      color: var(--mosaic-text-secondary);
      cursor: not-allowed;
    }
  }

  &--readonly {
    .m-input__wrapper {
      background-color: #f5f7fa;
      border-color: var(--mosaic-border-color);
    }

    .m-input__inner {
      color: var(--mosaic-text-regular);
      cursor: default;
    }
  }

  &--prepend {
    .m-input__wrapper {
      padding-left: 0;
    }

    .m-input__inner {
      margin-left: 8px;
    }
  }

  &--append {
    .m-input__wrapper {
      padding-right: 0;
    }

    .m-input__inner {
      margin-right: 8px;
    }
  }

  /* 前置/后置内容 */
  &__prepend,
  &__append {
    display: inline-flex;
    align-items: center;
    color: var(--mosaic-text-regular);
    font-size: var(--mosaic-font-size);
    white-space: nowrap;
  }

  &__prepend {
    padding: 0 12px;
    border-right: 1px solid var(--mosaic-border-color);
    align-self: stretch;
    background-color: #f5f7fa;
  }

  &__append {
    padding: 0 12px;
    border-left: 1px solid var(--mosaic-border-color);
    align-self: stretch;
    background-color: #f5f7fa;
  }

  /* textarea 文本域 */
  &--textarea &__wrapper {
    height: auto;
    padding: 8px 12px;
    align-items: flex-start;
  }

  &__textarea-wrapper {
    position: relative;
  }

  &__textarea {
    resize: vertical;
    min-height: auto;
    line-height: 1.5;
  }

  &--textarea &__textarea {
    resize: none;
  }

  &--textarea.m-input--autosize &__wrapper:hover {
    border-color: var(--mosaic-primary);
  }

  &--textarea.m-input--autosize &__textarea {
    resize: vertical;
  }

  &__textarea-clear {
    position: absolute;
    right: 8px;
    top: 8px;
  }

  &__textarea-word-count {
    position: absolute;
    right: 8px;
    bottom: 8px;
  }
}
</style>