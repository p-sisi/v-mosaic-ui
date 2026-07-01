<template>
  <div :class="classes" :style="sliderStyle">
    <div ref="runwayRef" class="m-slider__runway">
      <div ref="trackRef" class="m-slider__track" @click="handleTrackClick">
        <div class="m-slider__bar" :style="barStyle" />
        <div
          v-if="range"
          class="m-slider__button-wrapper m-slider__button-wrapper--left"
          :style="leftButtonStyle"
          @mousedown="handleButtonDown($event, 'left')"
          @mouseenter="handleButtonHover('left')"
          @mouseleave="handleButtonLeave('left')"
        >
          <slot v-if="$slots.thumb" name="thumb" :value="firstValue" />
          <div v-else class="m-slider__button" :class="{ 'm-slider__button--hover': hovering === 'left', 'm-slider__button--dragging': dragging === 'left' }" />
          <div v-if="showTooltip && hovering === 'left'" class="m-slider__tooltip">
            {{ formatValue(firstValue) }}
          </div>
        </div>
        <div
          v-if="range"
          class="m-slider__button-wrapper m-slider__button-wrapper--right"
          :style="rightButtonStyle"
          @mousedown="handleButtonDown($event, 'right')"
          @mouseenter="handleButtonHover('right')"
          @mouseleave="handleButtonLeave('right')"
        >
          <slot v-if="$slots.thumb" name="thumb" :value="secondValue" />
          <div v-else class="m-slider__button" :class="{ 'm-slider__button--hover': hovering === 'right', 'm-slider__button--dragging': dragging === 'right' }" />
          <div v-if="showTooltip && hovering === 'right'" class="m-slider__tooltip">
            {{ formatValue(secondValue) }}
          </div>
        </div>
        <div
          v-if="!range"
          class="m-slider__button-wrapper"
          :style="singleButtonStyle"
          @mousedown="handleButtonDown($event)"
          @mouseenter="handleButtonHover('single')"
          @mouseleave="handleButtonLeave('single')"
        >
          <slot v-if="$slots.thumb" name="thumb" :value="firstValue" />
          <div v-else class="m-slider__button" :class="{ 'm-slider__button--hover': hovering === 'single', 'm-slider__button--dragging': dragging === 'single' }" />
          <div v-if="showTooltip && hovering === 'single'" class="m-slider__tooltip">
            {{ formatValue(firstValue) }}
          </div>
        </div>
        <div v-if="showStops" class="m-slider__stops">
          <span
            v-for="stop in stops"
            :key="stop"
            class="m-slider__stop"
            :style="stopStyle(stop)"
          />
        </div>
        <div v-if="marks" class="m-slider__mark-stops">
          <span
            v-for="key in Object.keys(marks)"
            :key="'mark-stop-' + key"
            class="m-slider__stop m-slider__stop--mark"
            :style="stopStyle(Number(key))"
          />
        </div>
      </div>
      <div v-if="marks" class="m-slider__marks">
        <span
          v-for="[key, val] in Object.entries(marks)"
          :key="key"
          class="m-slider__mark"
          :style="markStyle(Number(key))"
        >
          {{ val }}
        </span>
      </div>
    </div>
    <div v-if="showInput && !range" class="m-slider__input">
      <MInputNumber
        v-model="inputValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="effectiveDisabled"
        :controls="showInputControls"
        size="small"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted, watch } from 'vue'
import { useFormItem } from '../../../hooks/useFormItem'
import MInputNumber from '../InputNumber/InputNumber.vue'

defineOptions({ name: 'MSlider' })

const props = withDefaults(defineProps<{
  modelValue?: number | number[]  // 绑定值，单个数字或范围数组
  min?: number                    // 最小值
  max?: number                    // 最大值
  disabled?: boolean              // 是否禁用
  step?: number                   // 步长
  showInput?: boolean             // 是否显示输入框
  showInputControls?: boolean     // 输入框是否显示控制按钮
  showStops?: boolean             // 是否显示间断点
  showTooltip?: boolean           // 是否显示 tooltip
  range?: boolean                 // 是否为范围选择
  vertical?: boolean              // 是否垂直模式
  height?: string                 // 垂直模式时的高度
  marks?: Record<number, string>  // 标记
  color?: string                  // 自定义滑块颜色（bar 与圆点边框）
  reverse?: boolean               // 是否反向滑动
}>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  disabled: false,
  step: 1,
  showInput: false,
  showInputControls: true,
  showStops: false,
  showTooltip: true,
  range: false,
  vertical: false,
  height: '200px',
  color: '',
  reverse: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: number | number[]]  // v-model 更新事件
  change: [value: number | number[]]               // 值变更时触发
  input: [value: number | number[]]                // 输入时触发
}>()

const { effectiveDisabled } = useFormItem(props)

const firstValue = ref<number>(0)
const secondValue = ref<number>(0)
const hovering = ref<string>('')
const dragging = ref<string>('')
const trackRef = ref<HTMLElement | null>(null)
let startPos = 0
let startValue = 0

const totalRange = computed(() => props.max - props.min)

function normalPercent(value: number): number {
  return ((value - props.min) / totalRange.value) * 100
}

function percent(value: number): number {
  return props.reverse ? 100 - normalPercent(value) : normalPercent(value)
}

function formatValue(val: number): string {
  return String(val)
}

const barStyle = computed(() => {
  if (props.vertical) {
    if (props.range) {
      const bottom = Math.min(percent(firstValue.value), percent(secondValue.value))
      const height = normalPercent(secondValue.value) - normalPercent(firstValue.value)
      return { bottom: `${bottom}%`, height: `${height}%` }
    }
    if (props.reverse) {
      return { top: '0%', height: `${normalPercent(firstValue.value)}%` }
    }
    return { bottom: '0%', height: `${normalPercent(firstValue.value)}%` }
  }
  if (props.range) {
    const left = Math.min(percent(firstValue.value), percent(secondValue.value))
    const width = normalPercent(secondValue.value) - normalPercent(firstValue.value)
    return { left: `${left}%`, width: `${width}%` }
  }
  if (props.reverse) {
    return { right: '0%', width: `${normalPercent(firstValue.value)}%` }
  }
  return { left: '0%', width: `${normalPercent(firstValue.value)}%` }
})

const singleButtonStyle = computed(() => {
  if (props.vertical) {
    return { bottom: `${percent(firstValue.value)}%` }
  }
  return { left: `${percent(firstValue.value)}%` }
})

const leftButtonStyle = computed(() => {
  if (props.vertical) {
    return { bottom: `${percent(firstValue.value)}%` }
  }
  return { left: `${percent(firstValue.value)}%` }
})

const rightButtonStyle = computed(() => {
  if (props.vertical) {
    return { bottom: `${percent(secondValue.value)}%` }
  }
  return { left: `${percent(secondValue.value)}%` }
})

const sliderStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.vertical) {
    style.height = props.height
  }
  if (props.color) {
    style['--m-slider-color'] = props.color
  }
  return style
})

const stops = computed(() => {
  const stopCount = totalRange.value / props.step
  const result: number[] = []
  for (let i = 1; i < stopCount; i++) {
    result.push(props.min + i * props.step)
  }
  return result
})

function stopStyle(stop: number) {
  if (props.vertical) {
    return { bottom: `${percent(stop)}%` }
  }
  return { left: `${percent(stop)}%` }
}

function markStyle(position: number) {
  if (props.vertical) {
    return { bottom: `${percent(position)}%` }
  }
  return { left: `${percent(position)}%` }
}

function setValues() {
  if (props.range) {
    if (Array.isArray(props.modelValue)) {
      firstValue.value = Math.max(props.min, Math.min(props.modelValue[0], props.max))
      secondValue.value = Math.max(props.min, Math.min(props.modelValue[1], props.max))
    } else {
      firstValue.value = props.min
      secondValue.value = props.max
    }
  } else {
    if (typeof props.modelValue === 'number') {
      firstValue.value = Math.max(props.min, Math.min(props.modelValue, props.max))
    }
  }
}

function emitValue() {
  if (props.range) {
    emit('update:modelValue', [firstValue.value, secondValue.value])
    emit('input', [firstValue.value, secondValue.value])
  } else {
    emit('update:modelValue', firstValue.value)
    emit('input', firstValue.value)
  }
}

function getPositionFromEvent(clientX: number, clientY: number, rect: DOMRect): number {
  if (props.vertical) {
    if (props.reverse) {
      return ((clientY - rect.top) / rect.height) * totalRange.value + props.min
    }
    return ((rect.bottom - clientY) / rect.height) * totalRange.value + props.min
  }
  if (props.reverse) {
    return ((rect.right - clientX) / rect.width) * totalRange.value + props.min
  }
  return ((clientX - rect.left) / rect.width) * totalRange.value + props.min
}

function handleTrackClick(event: MouseEvent) {
  if (effectiveDisabled.value || dragging.value) return

  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()

  let position = getPositionFromEvent(event.clientX, event.clientY, rect)

  // snap to step
  position = Math.round(position / props.step) * props.step
  position = Math.max(props.min, Math.min(position, props.max))

  if (props.range) {
    if (Math.abs(position - firstValue.value) < Math.abs(position - secondValue.value)) {
      firstValue.value = position
    } else {
      secondValue.value = position
    }
  } else {
    firstValue.value = position
  }

  emitValue()
  emit('change', props.range ? [firstValue.value, secondValue.value] : firstValue.value)
}

function handleButtonDown(event: MouseEvent, button?: string) {
  if (effectiveDisabled.value) return
  event.preventDefault()
  dragging.value = button || 'single'

  if (props.vertical) {
    startPos = event.clientY
  } else {
    startPos = event.clientX
  }

  if (button === 'left') {
    startValue = firstValue.value
  } else if (button === 'right') {
    startValue = secondValue.value
  } else {
    startValue = firstValue.value
  }

  window.addEventListener('mousemove', handleDragging)
  window.addEventListener('mouseup', handleDragEnd)
}

function handleDragging(event: MouseEvent) {
  if (!dragging.value) return

  const trackEl = trackRef.value
  if (!trackEl) return
  const rect = trackEl.getBoundingClientRect()

  let position = getPositionFromEvent(event.clientX, event.clientY, rect)

  position = Math.round(position / props.step) * props.step
  position = Math.max(props.min, Math.min(position, props.max))

  if (dragging.value === 'left') {
    firstValue.value = Math.min(position, secondValue.value)
  } else if (dragging.value === 'right') {
    secondValue.value = Math.max(position, firstValue.value)
  } else {
    firstValue.value = position
  }

  emitValue()
}

function handleDragEnd() {
  dragging.value = ''
  emit('change', props.range ? [firstValue.value, secondValue.value] : firstValue.value)
  window.removeEventListener('mousemove', handleDragging)
  window.removeEventListener('mouseup', handleDragEnd)
}

function handleButtonHover(button: string) {
  hovering.value = button
}

function handleButtonLeave(_button?: string) {
  hovering.value = ''
}

const inputValue = computed({
  get: () => firstValue.value,
  set: (val: number | string | undefined) => {
    const num = typeof val === 'number' ? val : parseFloat(String(val))
    if (!isNaN(num)) {
      firstValue.value = Math.max(props.min, Math.min(num, props.max))
      emitValue()
      emit('change', firstValue.value)
    }
  },
})

watch(() => props.modelValue, () => {
  setValues()
}, { immediate: true })

onUnmounted(() => {
  window.removeEventListener('mousemove', handleDragging)
  window.removeEventListener('mouseup', handleDragEnd)
})

const classes = computed(() => [
  'm-slider',
  `m-slider--${props.vertical ? 'vertical' : 'horizontal'}`,
  {
    'm-slider--disabled': effectiveDisabled.value,
    'm-slider--range': props.range,
    'm-slider--show-input': props.showInput,
    'm-slider--reverse': props.reverse,
  },
])
</script>

<style lang="scss">
.m-slider {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: var(--mosaic-font-size);

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    height: 200px;
  }

  &__runway {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &--vertical &__runway {
    flex-direction: row;
    align-items: center;
    min-height: 0;
  }

  &__track {
    position: relative;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background-color: var(--mosaic-fill-color-light);
    cursor: pointer;
  }

  &--vertical &__track {
    width: 6px;
    height: 100%;
    flex: 1;
    min-height: 0;
  }

  &__bar {
    position: absolute;
    height: 6px;
    border-radius: 3px;
    background-color: var(--m-slider-color, var(--mosaic-primary));
    transition: width 0.1s;
  }

  &--vertical &__bar {
    width: 6px;
    height: auto;
    transition: height 0.1s;
  }

  &__button-wrapper {
    position: absolute;
    top: -14px;
    width: 36px;
    height: 36px;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
  }

  &--vertical &__button-wrapper {
    top: auto;
    left: -14px;
    transform: translateY(50%);
  }

  &__button {
    width: 16px;
    height: 16px;
    border: 2px solid var(--m-slider-color, var(--mosaic-primary));
    border-radius: 50%;
    background-color: #fff;
    transition: transform 0.2s;
    cursor: grab;

    &--hover {
      transform: scale(1.2);
    }

    &--dragging {
      transform: scale(1.4);
      cursor: grabbing;
    }
  }

  &__tooltip {
    position: absolute;
    top: -32px;
    left: 50%;
    transform: translateX(-50%);
    padding: 2px 8px;
    background-color: var(--mosaic-text-primary);
    color: #fff;
    font-size: 12px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
  }

  &--vertical &__tooltip {
    top: auto;
    left: auto;
    right: -40px;
    bottom: 50%;
    transform: translateY(50%);
  }

  &__stop {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%);
    top: 50%;
  }

  &--vertical &__stop {
    transform: translate(-50%, 50%);
    top: auto;
    left: 50%;
  }

  &__marks {
    position: relative;
    width: 100%;
    height: 20px;
    margin-top: 4px;
  }

  &--vertical &__marks {
    width: 20px;
    height: 100%;
    margin-top: 0;
    margin-left: 4px;
  }

  &__mark {
    position: absolute;
    font-size: 12px;
    color: var(--mosaic-text-secondary);
    transform: translateX(-50%);
  }

  &--vertical &__mark {
    transform: translateY(50%);
  }

  &__input {
    margin-left: 12px;
    flex-shrink: 0;
  }

  &--disabled {
    .m-slider__track {
      cursor: not-allowed;
    }

    .m-slider__bar {
      opacity: 0.5;
    }

    .m-slider__button {
      cursor: not-allowed;
    }

    .m-slider__button-wrapper {
      cursor: not-allowed;
    }
  }
}
</style>