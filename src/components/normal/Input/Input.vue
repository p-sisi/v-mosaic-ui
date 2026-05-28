<template>
  <div :class="classes" :style="customStyle">
    <div class="m-input__wrapper">
      <input
        class="m-input__inner"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'MInput' })

type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url'
type InputSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  modelValue?: string | number  // 绑定值，支持 v-model 双向绑定
  type?: InputType              // 输入框类型，决定原生 input 的 type 属性
  size?: InputSize              // 输入框尺寸
  width?: string                // 自定义宽度，如 "100%"、"200px"
  placeholder?: string          // 占位提示文本
  disabled?: boolean            // 是否禁用输入框
  clearable?: boolean           // 是否显示一键清除按钮
  maxlength?: number            // 最大可输入字符数
}>(), {
  modelValue: '',
  type: 'text',
  size: 'default',
  width: '',
  placeholder: '',
  disabled: false,
  clearable: false,
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
  },
])

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value)
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
}
</script>

<style>
.m-input {
  display: inline-flex;
  width: 100%;
}

.m-input__wrapper {
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
</style>