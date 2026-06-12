<template>
  <div :class="classes" :style="customStyle">
    <div v-if="type !== 'textarea'" class="m-input__wrapper">
      <span v-if="$slots.prepend" class="m-input__prepend">
        <slot name="prepend" />
      </span>
      <input
        ref="inputRef"
        class="m-input__inner"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="max || undefined"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
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

const isTextarea = computed(() => props.type === 'textarea')

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
    'm-input--focused': isFocused.value,
    'm-input--has-word-count': showWordInside.value || showWordLimitInside.value,
    'm-input--exceed': effectiveMax.value != null && currentLength.value > effectiveMax.value,
    'm-input--below-min': props.min != null && currentLength.value < props.min,
    'm-input--prepend': !isTextarea.value && !!useSlots().prepend,
    'm-input--append': !isTextarea.value && !!useSlots().append,
    'm-input--textarea': isTextarea.value,
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

<style>
.m-input {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
}

.m-input__wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--mosaic-border-color);
  border-radius: var(--mosaic-border-radius);
  background-color: #fff;
  transition: border-color 0.2s;
}

.m-input--focused .m-input__wrapper {
  border-color: var(--mosaic-primary);
}

.m-input__inner {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0;
  color: var(--mosaic-text-primary);
  font-size: var(--mosaic-font-size);
  background: transparent;
}

.m-input__inner::placeholder {
  color: var(--mosaic-text-placeholder);
}

.m-input__clear {
  cursor: pointer;
  color: var(--mosaic-text-secondary);
  font-size: 16px;
  margin-left: 4px;
}

.m-input__clear:hover {
  color: var(--mosaic-text-primary);
}

/* 内部字数统计 */
.m-input__word-count {
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

.m-input--has-word-count .m-input__inner {
  padding-right: 50px;
}

.m-input--exceed .m-input__word-count {
  color: var(--mosaic-danger);
}

/* 外部字数统计 */
.m-input__word-count-outside {
  font-size: 12px;
  color: var(--mosaic-text-secondary);
  line-height: 1.5;
  text-align: right;
  margin-right: 6px;
}

.m-input--exceed .m-input__word-count-outside {
  color: var(--mosaic-danger);
}

.m-input--below-min .m-input__word-count-outside {
  color: var(--mosaic-danger);
}

.m-input--small .m-input__wrapper {
  height: 24px;
  font-size: var(--mosaic-font-size-sm);
}

.m-input--large .m-input__wrapper {
  height: 40px;
  font-size: var(--mosaic-font-size-lg);
}

.m-input--disabled .m-input__wrapper {
  cursor: not-allowed;
  background-color: #f5f7fa;
  border-color: #e4e7ed;
}

.m-input--disabled .m-input__inner {
  color: var(--mosaic-text-secondary);
  cursor: not-allowed;
}

.m-input--prepend .m-input__wrapper {
  padding-left: 0;
}

.m-input--append .m-input__wrapper {
  padding-right: 0;
}

.m-input--prepend .m-input__inner {
  margin-left: 8px;
}

.m-input--append .m-input__inner {
  margin-right: 8px;
}

/* 前置/后置内容 */
.m-input__prepend,
.m-input__append {
  display: inline-flex;
  align-items: center;
  color: var(--mosaic-text-regular);
  font-size: var(--mosaic-font-size);
  white-space: nowrap;
}

.m-input__prepend {
  padding: 0 12px;
  border-right: 1px solid var(--mosaic-border-color);
  align-self: stretch;
  background-color: #f5f7fa;
}

.m-input__append {
  padding: 0 12px;
  border-left: 1px solid var(--mosaic-border-color);
  align-self: stretch;
  background-color: #f5f7fa;
}

/* textarea 文本域 */
.m-input--textarea .m-input__wrapper {
  height: auto;
  padding: 8px 12px;
  align-items: flex-start;
}

.m-input__textarea-wrapper {
  position: relative;
}

.m-input__textarea {
  resize: vertical;
  min-height: auto;
  line-height: 1.5;
}

.m-input--textarea .m-input__textarea {
  resize: none;
}

.m-input__textarea-clear {
  position: absolute;
  right: 8px;
  top: 8px;
}

.m-input__textarea-word-count {
  position: absolute;
  right: 8px;
  bottom: 8px;
}
</style>