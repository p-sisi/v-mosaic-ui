<template>
  <div :class="classes" :style="rootStyle">
    <button
      v-if="showSideControls"
      class="m-input-number__decrease"
      :disabled="decreaseDisabled"
      @click="handleDecrease"
    >
      −
    </button>
    <div class="m-input-number__wrapper">
      <div v-if="showLeftControls" class="m-input-number__controls-left">
        <button
          class="m-input-number__increase m-input-number__controls-left-btn"
          :disabled="increaseDisabled"
          @click="handleIncrease"
        >
          +
        </button>
        <button
          class="m-input-number__decrease m-input-number__controls-left-btn"
          :disabled="decreaseDisabled"
          @click="handleDecrease"
        >
          −
        </button>
      </div>
      <span v-if="unit && prependUnit" class="m-input-number__unit m-input-number__unit--prepend">{{ unit }}</span>
      <input
        ref="inputRef"
        class="m-input-number__inner"
        :value="displayValue"
        :disabled="effectiveDisabled"
        :readonly="effectiveReadonly"
        :placeholder="placeholder"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-if="unit && !prependUnit" class="m-input-number__unit m-input-number__unit--append">{{ unit }}</span>
      <div v-if="showRightControls" class="m-input-number__controls-right">
        <button
          class="m-input-number__increase m-input-number__controls-right-btn"
          :disabled="increaseDisabled"
          @click="handleIncrease"
        >
          +
        </button>
        <button
          class="m-input-number__decrease m-input-number__controls-right-btn"
          :disabled="decreaseDisabled"
          @click="handleDecrease"
        >
          −
        </button>
      </div>
    </div>
    <button
      v-if="showSideControls"
      class="m-input-number__increase"
      :disabled="increaseDisabled"
      @click="handleIncrease"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MInputNumber' })

type InputNumberSize = 'small' | 'default' | 'large'
type ControlTrigger = 'always' | 'hover'

const props = withDefaults(defineProps<{
  modelValue?: number | string  // 绑定值，支持 v-model 双向绑定
  min?: number                  // 最小值
  max?: number                  // 最大值
  step?: number                 // 步长
  stepStrictly?: boolean        // 是否严格步进，只能输入步长的倍数
  precision?: number            // 精度，小数点后位数
  size?: InputNumberSize        // 输入数字框尺寸
  disabled?: boolean            // 是否禁用
  readonly?: boolean            // 是否只读
  controls?: boolean            // 是否显示增减按钮
  controlsPosition?: 'left' | 'right' | undefined  // 控制按钮位置，left/right 时按钮纵向排列在对应侧
  trigger?: ControlTrigger      // 控制按钮展示时机，hover 悬浮显示，always 始终显示
  placeholder?: string          // 占位文本
  formatter?: (value: number) => string  // 自定义显示格式化函数
  unit?: string                 // 输入框单位文本
  prependUnit?: boolean         // 单位是否展示在输入框前面
  allowUndefinedValue?: boolean // 是否允许清空为 undefined
  width?: string | number       // 输入框宽度
  color?: string                // 聚焦时边框颜色
}>(), {
  modelValue: 0,
  min: -Infinity,
  max: Infinity,
  step: 1,
  stepStrictly: false,
  size: 'default',
  disabled: false,
  readonly: false,
  controls: true,
  trigger: 'always',
  formatter: undefined,
  unit: '',
  prependUnit: false,
  allowUndefinedValue: false,
  width: undefined,
  color: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: number | string | undefined]  // v-model 更新事件
  change: [currentValue: number | undefined, oldValue: number | undefined]  // 值变更时触发
  blur: [event: FocusEvent]                     // 失焦时触发
  focus: [event: FocusEvent]                    // 获焦时触发
}>()

const inputRef = ref<HTMLInputElement>()
const { effectiveSize, effectiveDisabled, effectiveReadonly } = useFormItem(props)

const currentValue = ref<number | undefined>(toValue(props.modelValue))
const userInput = ref(false)
const oldValue = ref(currentValue.value)

function toValue(val: number | string | undefined): number | undefined {
  if (val === '' || val === undefined || val === null) {
    return props.allowUndefinedValue ? undefined : 0
  }
  if (typeof val === 'number') return val
  const n = parseFloat(val)
  return isNaN(n) ? (props.allowUndefinedValue ? undefined : 0) : n
}

function getPrecision(): number {
  if (props.precision !== undefined) return props.precision
  const stepStr = String(props.step)
  const dotIndex = stepStr.indexOf('.')
  return dotIndex === -1 ? 0 : stepStr.length - dotIndex - 1
}

function setPrecision(val: number): number {
  const p = getPrecision()
  return parseFloat(val.toFixed(p))
}

function ensureRange(val: number): number {
  if (val < props.min) return props.min
  if (val > props.max) return props.max
  return val
}

function snapToStep(val: number): number {
  if (!props.stepStrictly) return val
  const snapped = Math.round(val / props.step) * props.step
  return setPrecision(snapped)
}

function enforce(val: number): number {
  return snapToStep(ensureRange(val))
}

const displayValue = computed(() => {
  if (currentValue.value === undefined) return ''
  if (userInput.value) {
    return String(currentValue.value)
  }
  const val = setPrecision(currentValue.value)
  return props.formatter ? props.formatter(val) : String(val)
})

const decreaseDisabled = computed(() => {
  if (currentValue.value === undefined) return false
  return effectiveDisabled.value || effectiveReadonly.value || currentValue.value - props.step < props.min
})

const increaseDisabled = computed(() => {
  if (currentValue.value === undefined) return false
  return effectiveDisabled.value || effectiveReadonly.value || currentValue.value + props.step > props.max
})

const currentSize = computed(() => effectiveSize.value)

// 侧边按钮（左右各一个）：仅 controlsPosition 未设置且 trigger=always 时展示
const showSideControls = computed(() =>
  props.controls && !props.controlsPosition && props.trigger === 'always'
)

// 左侧按钮：controlsPosition=left 时展示
const showLeftControls = computed(() =>
  props.controls && props.controlsPosition === 'left'
)

// 右侧按钮：controlsPosition=right 或 trigger=hover（未设置位置）时展示
const showRightControls = computed(() =>
  props.controls && (props.controlsPosition === 'right' || (props.trigger === 'hover' && !props.controlsPosition))
)

function handleDecrease() {
  if (decreaseDisabled.value) return
  const base = currentValue.value ?? 0
  const val = setPrecision(ensureRange(base - props.step))
  const old = currentValue.value
  currentValue.value = val
  userInput.value = false
  emit('update:modelValue', val)
  emit('change', val, old)
}

function handleIncrease() {
  if (increaseDisabled.value) return
  const base = currentValue.value ?? 0
  const val = setPrecision(ensureRange(base + props.step))
  const old = currentValue.value
  currentValue.value = val
  userInput.value = false
  emit('update:modelValue', val)
  emit('change', val, old)
}

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  userInput.value = true
  if (value === '' && props.allowUndefinedValue) {
    currentValue.value = undefined
    return
  }
  const num = parseFloat(value)
  if (!isNaN(num)) {
    currentValue.value = num
  }
}

function handleChange(event: Event) {
  const value = (event.target as HTMLInputElement).value
  if (value === '' && props.allowUndefinedValue) {
    const old = oldValue.value
    currentValue.value = undefined
    emit('update:modelValue', undefined)
    emit('change', undefined, old)
    userInput.value = false
    return
  }
  const num = parseFloat(value)
  if (isNaN(num)) {
    currentValue.value = oldValue.value
  } else {
    const val = enforce(num)
    const old = oldValue.value
    currentValue.value = val
    emit('update:modelValue', val)
    emit('change', val, old)
  }
  userInput.value = false
}

function handleFocus(event: FocusEvent) {
  userInput.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  userInput.value = false
  if (currentValue.value !== undefined) {
    currentValue.value = enforce(currentValue.value)
  }
  emit('update:modelValue', currentValue.value)
  emit('blur', event)
}

watch(() => props.modelValue, (val) => {
  const num = toValue(val)
  if (num !== currentValue.value) {
    currentValue.value = num === undefined ? undefined : enforce(num)
  }
}, { immediate: true })

const rootStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width !== undefined) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.color) {
    style['--m-input-number-focus-color'] = props.color
  }
  return style
})

const classes = computed(() => [
  'm-input-number',
  `m-input-number--${currentSize.value}`,
  {
    'm-input-number--disabled': effectiveDisabled.value,
    'm-input-number--readonly': effectiveReadonly.value,
    'm-input-number--controls-right': showRightControls.value,
    'm-input-number--controls-left': showLeftControls.value,
    'm-input-number--no-controls': !props.controls,
    'm-input-number--trigger-hover': props.trigger === 'hover',
    'm-input-number--has-unit': !!props.unit,
  },
])

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<style lang="scss">
.m-input-number {
  display: inline-flex;
  align-items: center;
  gap: 0;
  width: 120px;

  &__decrease,
  &__increase {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid var(--mosaic-border-color);
    background-color: var(--mosaic-fill-color-light);
    color: var(--mosaic-text-regular);
    cursor: pointer;
    font-size: var(--mosaic-font-size);
    user-select: none;
    transition: all 0.2s;

    &:not(:disabled):hover {
      color: var(--mosaic-primary);
      background-color: rgba(167, 139, 250, 0.08);
    }

    &:disabled {
      cursor: not-allowed;
      color: var(--mosaic-disabled-text-color);
      background-color: var(--mosaic-disabled-bg-color);
    }
  }

  &__decrease {
    border-right: none;
    border-radius: var(--mosaic-border-radius) 0 0 var(--mosaic-border-radius);
  }

  &__increase {
    border-left: none;
    border-radius: 0 var(--mosaic-border-radius) var(--mosaic-border-radius) 0;
  }

  &__wrapper {
    display: inline-flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 32px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: 0;
    background-color: #fff;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  &:focus-within {
    .m-input-number__wrapper,
    .m-input-number__decrease,
    .m-input-number__increase {
      border-color: var(--m-input-number-focus-color, var(--mosaic-primary));
    }
  }

  &:not(.m-input-number--controls-right):not(.m-input-number--controls-left):not(.m-input-number--no-controls):not(.m-input-number--trigger-hover) &__wrapper {
    border-radius: 0;
  }

  &--controls-right &__wrapper,
  &--controls-left &__wrapper,
  &--no-controls &__wrapper,
  &--trigger-hover &__wrapper {
    border-radius: var(--mosaic-border-radius);
  }

  &__unit {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    padding: 0 12px;
    height: 100%;
    background-color: var(--mosaic-fill-color-light);
    color: var(--mosaic-text-regular);
    font-size: var(--mosaic-font-size);
    user-select: none;

    &--prepend {
      border-right: 1px solid var(--mosaic-border-color);
    }

    &--append {
      border-left: 1px solid var(--mosaic-border-color);
    }
  }

  &--has-unit &__inner {
    text-align: center;
  }

  &__inner {
    flex: 1;
    width: 100%;
    height: 100%;
    min-width: 0;
    border: none;
    outline: none;
    padding: 0 12px;
    text-align: center;
    color: var(--mosaic-text-primary);
    font-size: var(--mosaic-font-size);
    background: transparent;

    &::placeholder {
      color: var(--mosaic-text-placeholder);
    }
  }

  /* controls-right: buttons stacked vertically on the right */
  &__controls-right {
    display: inline-flex;
    flex-direction: column;
    height: 100%;
    border-left: 1px solid var(--mosaic-border-color);
    flex-shrink: 0;

    &-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 50%;
      border: none;
      background-color: var(--mosaic-fill-color-light);
      color: var(--mosaic-text-regular);
      cursor: pointer;
      font-size: 12px;
      user-select: none;
      transition: all 0.2s;
      line-height: 1;

      &:first-child {
        border-bottom: 1px solid var(--mosaic-border-color);
      }

      &:not(:disabled):hover {
        color: var(--mosaic-primary);
        background-color: rgba(167, 139, 250, 0.08);
      }

      &:disabled {
        cursor: not-allowed;
        color: var(--mosaic-disabled-text-color);
        background-color: var(--mosaic-disabled-bg-color);
      }
    }
  }

  /* controls-left: buttons stacked vertically on the left */
  &__controls-left {
    display: inline-flex;
    flex-direction: column;
    height: 100%;
    border-right: 1px solid var(--mosaic-border-color);
    flex-shrink: 0;

    &-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 50%;
      border: none;
      background-color: var(--mosaic-fill-color-light);
      color: var(--mosaic-text-regular);
      cursor: pointer;
      font-size: 12px;
      user-select: none;
      transition: all 0.2s;
      line-height: 1;

      &:first-child {
        border-bottom: 1px solid var(--mosaic-border-color);
      }

      &:not(:disabled):hover {
        color: var(--mosaic-primary);
        background-color: rgba(167, 139, 250, 0.08);
      }

      &:disabled {
        cursor: not-allowed;
        color: var(--mosaic-disabled-text-color);
        background-color: var(--mosaic-disabled-bg-color);
      }
    }
  }

  /* trigger=hover: 隐藏按钮，悬浮时显示 */
  &--trigger-hover &__controls-right,
  &--trigger-hover &__controls-left {
    opacity: 0;
    transition: opacity 0.2s;
  }

  &--trigger-hover:hover &__controls-right,
  &--trigger-hover:focus-within &__controls-right,
  &--trigger-hover:hover &__controls-left,
  &--trigger-hover:focus-within &__controls-left {
    opacity: 1;
  }

  /* size variations */
  &--small {
    & .m-input-number__decrease,
    & .m-input-number__increase {
      width: 24px;
      height: 24px;
      font-size: var(--mosaic-font-size-sm);
    }

    & .m-input-number__wrapper {
      height: 24px;
    }

    & .m-input-number__inner {
      font-size: var(--mosaic-font-size-sm);
    }

    & .m-input-number__controls-right-btn,
    & .m-input-number__controls-left-btn {
      width: 20px;
      font-size: 11px;
    }
  }

  &--large {
    & .m-input-number__decrease,
    & .m-input-number__increase {
      width: 40px;
      height: 40px;
      font-size: var(--mosaic-font-size-lg);
    }

    & .m-input-number__wrapper {
      height: 40px;
    }

    & .m-input-number__inner {
      font-size: var(--mosaic-font-size-lg);
    }

    & .m-input-number__controls-right-btn,
    & .m-input-number__controls-left-btn {
      width: 28px;
      font-size: 14px;
    }
  }

  /* disabled */
  &--disabled {
    & .m-input-number__decrease,
    & .m-input-number__increase {
      cursor: not-allowed;
      color: var(--mosaic-disabled-text-color);
      background-color: var(--mosaic-disabled-bg-color);
    }

    & .m-input-number__wrapper {
      background-color: var(--mosaic-disabled-bg-color);
      border-color: var(--mosaic-disabled-border-color);
    }

    & .m-input-number__inner {
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;
    }

    & .m-input-number__controls-right-btn,
    & .m-input-number__controls-left-btn {
      cursor: not-allowed;
      color: var(--mosaic-disabled-text-color);
      background-color: var(--mosaic-disabled-bg-color);
    }

    & .m-input-number__unit {
      color: var(--mosaic-disabled-text-color);
      background-color: var(--mosaic-disabled-bg-color);
    }
  }

  &--readonly {
    & .m-input-number__decrease,
    & .m-input-number__increase,
    & .m-input-number__controls-right-btn,
    & .m-input-number__controls-left-btn {
      cursor: not-allowed;
      color: var(--mosaic-text-secondary);
    }

    & .m-input-number__wrapper {
      background-color: #f5f7fa;
    }

    & .m-input-number__inner {
      color: var(--mosaic-text-regular);
      cursor: default;
    }
  }
}
</style>
