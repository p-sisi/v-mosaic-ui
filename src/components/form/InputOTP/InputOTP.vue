<template>
  <div :class="classes" @paste="handlePaste">
    <input
      v-for="(_, index) in length"
      :key="index"
      :ref="el => setInputRef(el as HTMLInputElement, index)"
      class="m-input-otp__item"
      :type="mask ? 'password' : 'text'"
      :value="otpValues[index]"
      :disabled="effectiveDisabled"
      :readonly="false"
      :maxlength="1"
      :autocomplete="index === 0 ? 'one-time-code' : 'off'"
      :inputmode="inputMode"
      @input="handleInput($event, index)"
      @keydown="handleKeydown($event, index)"
      @focus="handleFocus($event, index)"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MInputOTP' })

type OTPType = 'outlined' | 'filled' | 'underlined'
type InputSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  modelValue?: string
  length?: number
  type?: OTPType
  size?: InputSize
  disabled?: boolean
  mask?: boolean
  numeric?: boolean
  alphabetic?: boolean
  uppercase?: boolean
}>(), {
  modelValue: '',
  length: 6,
  type: 'outlined',
  size: 'default',
  disabled: false,
  mask: false,
  numeric: false,
  alphabetic: false,
  uppercase: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  complete: [value: string]
  focus: [event: FocusEvent, index: number]
  blur: [event: FocusEvent]
}>()

const { effectiveDisabled, effectiveSize } = useFormItem(props)

const inputRefs = ref<HTMLInputElement[]>([])
const otpValues = ref<string[]>(Array(props.length).fill(''))
const focusedIndex = ref<number>(-1)

function setInputRef(el: HTMLInputElement | null, index: number) {
  if (el) {
    inputRefs.value[index] = el
  }
}

const inputMode = computed(() => props.numeric ? 'numeric' : 'text')

// 根据属性过滤和转换字符
function sanitizeChar(char: string): string {
  if (props.numeric && !/^\d$/.test(char)) return ''
  if (props.alphabetic && !/^[a-zA-Z]$/.test(char)) return ''
  if (props.uppercase) return char.toUpperCase()
  return char
}

const classes = computed(() => [
  'm-input-otp',
  `m-input-otp--${props.type}`,
  `m-input-otp--${effectiveSize.value}`,
  {
    'm-input-otp--disabled': effectiveDisabled.value,
  },
])

// ===== modelValue 同步 =====
watch(() => props.modelValue, (val) => {
  let raw = val || ''
  if (props.uppercase) raw = raw.toUpperCase()
  const chars = raw.split('').slice(0, props.length)
  const newValues = Array(props.length).fill('')
  chars.forEach((c, i) => { newValues[i] = c })
  // Only update if different to avoid cursor jump
  if (newValues.join('') !== otpValues.value.join('')) {
    otpValues.value = newValues
  }
}, { immediate: true })

watch(otpValues, (val) => {
  const joined = val.join('')
  emit('update:modelValue', joined)
  emit('change', joined)
  if (joined.length === props.length && !val.includes('')) {
    emit('complete', joined)
  }
}, { deep: true })

// ===== 交互 =====
function handleInput(event: Event, index: number) {
  const target = event.target as HTMLInputElement
  let char = target.value

  // Only take the last character
  if (char.length > 1) {
    char = char.charAt(char.length - 1)
  }

  // Apply filtering (numeric/alphabetic) and transformation (uppercase)
  const sanitized = sanitizeChar(char)
  if (!sanitized) {
    target.value = otpValues.value[index]
    return
  }

  otpValues.value[index] = sanitized
  // Sync the input element's displayed value
  target.value = sanitized

  // Auto-advance to next
  if (sanitized && index < props.length - 1) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus()
    })
  }
}

function handleKeydown(event: KeyboardEvent, index: number) {
  const target = event.target as HTMLInputElement

  if (event.key === 'Backspace') {
    if (target.value) {
      // Current has value: clear it (default behavior)
      otpValues.value[index] = ''
      // Prevent default to avoid browser navigating
    } else if (index > 0) {
      // Current empty: go back and clear previous
      event.preventDefault()
      otpValues.value[index - 1] = ''
      nextTick(() => {
        inputRefs.value[index - 1]?.focus()
      })
    }
    return
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    if (index > 0) {
      inputRefs.value[index - 1]?.focus()
      nextTick(() => {
        const el = inputRefs.value[index - 1]
        if (el) el.select()
      })
    }
    return
  }

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    if (index < props.length - 1) {
      inputRefs.value[index + 1]?.focus()
      nextTick(() => {
        const el = inputRefs.value[index + 1]
        if (el) el.select()
      })
    }
    return
  }

  if (event.key === 'Home') {
    event.preventDefault()
    inputRefs.value[0]?.focus()
    return
  }

  if (event.key === 'End') {
    event.preventDefault()
    // Focus last filled or last input
    const lastFilled = otpValues.value.findIndex(v => v === '')
    const targetIdx = lastFilled === -1 ? props.length - 1 : Math.max(0, lastFilled - 1)
    inputRefs.value[targetIdx]?.focus()
    return
  }

  // For single char input, select existing content first for replacement
  if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
    // Select current content so it gets replaced
    nextTick(() => target.select())
  }
}

function handleFocus(event: FocusEvent, index: number) {
  focusedIndex.value = index
  const target = event.target as HTMLInputElement
  nextTick(() => target.select())
  emit('focus', event, index)
}

function handleBlur(event: FocusEvent) {
  focusedIndex.value = -1
  emit('blur', event)
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault()
  const pasted = event.clipboardData?.getData('text') || ''
  const chars = pasted.replace(/\s/g, '').split('').slice(0, props.length)

  let lastFilled = -1
  chars.forEach((c, i) => {
    if (i < props.length) {
      const sanitized = sanitizeChar(c)
      if (!sanitized) return
      otpValues.value[i] = sanitized
      lastFilled = i
    }
  })

  // Focus the next empty or last filled
  const nextIndex = lastFilled + 1 < props.length ? lastFilled + 1 : props.length - 1
  nextTick(() => {
    inputRefs.value[nextIndex]?.focus()
  })
}

defineExpose({
  focus: () => inputRefs.value[0]?.focus(),
  blur: () => inputRefs.value.forEach(el => el?.blur()),
  clear: () => {
    otpValues.value = Array(props.length).fill('')
    nextTick(() => inputRefs.value[0]?.focus())
  },
})
</script>

<style lang="scss">
.m-input-otp {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &__item {
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: var(--mosaic-text-primary);
    background-color: #fff;
    border-radius: var(--mosaic-border-radius);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
    box-sizing: border-box;
    padding: 0;
    caret-color: var(--mosaic-primary);

    &::selection {
      background: rgba(167, 139, 250, 0.2);
    }

    &:focus {
      border-color: var(--mosaic-primary);
      box-shadow: 0 0 0 2px rgba(167, 139, 250, 0.2);
    }

    &:disabled {
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;
    }
  }

  /* === Type: outlined === */
  &--outlined &__item {
    border: 1px solid var(--mosaic-border-color);

    &:hover:not(:disabled):not(:focus) {
      border-color: var(--mosaic-primary);
    }
  }

  /* === Type: filled === */
  &--filled &__item {
    border: 1px solid transparent;
    background-color: var(--mosaic-fill-color-light);

    &:hover:not(:disabled):not(:focus) {
      background-color: var(--mosaic-fill-color);
    }

    &:focus {
      background-color: var(--mosaic-fill-color);
      border-color: var(--mosaic-primary);
    }
  }

  /* === Type: underlined === */
  &--underlined &__item {
    border: none;
    border-radius: 0;
    border-bottom: 2px solid var(--mosaic-border-color);
    background-color: transparent;

    &:hover:not(:disabled):not(:focus) {
      border-bottom-color: var(--mosaic-primary);
    }

    &:focus {
      border-bottom-color: var(--mosaic-primary);
      box-shadow: none;
    }
  }

  /* === Size === */
  &--small &__item {
    width: 32px;
    height: 32px;
    font-size: 15px;
  }

  &--large &__item {
    width: 48px;
    height: 48px;
    font-size: 22px;
  }

  /* === Disabled === */
  &--disabled &__item {
    background-color: var(--mosaic-disabled-bg-color);
    border-color: var(--mosaic-disabled-border-color);
    cursor: not-allowed;

    &:hover {
      border-color: var(--mosaic-disabled-border-color);
    }
  }

  &--disabled.m-input-otp--underlined &__item {
    background-color: transparent;
    border-bottom-color: var(--mosaic-disabled-border-color);
  }

  &--disabled.m-input-otp--filled &__item {
    background-color: var(--mosaic-disabled-bg-color);
    border-color: transparent;
  }
}
</style>
