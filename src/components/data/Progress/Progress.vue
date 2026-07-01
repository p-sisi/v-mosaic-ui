<template>
  <!-- 线性进度条 -->
  <div v-if="type === 'line'" :class="lineClasses">
    <div class="m-progress__outer" :style="outerStyle">
      <div class="m-progress__inner" :style="innerStyle">
        <div v-if="textInside && showText" class="m-progress__text-inside">
          <slot :percentage="clampedPercentage">{{ formattedText }}</slot>
        </div>
      </div>
    </div>
    <div v-if="!textInside && showText" class="m-progress__text">
      <slot :percentage="clampedPercentage">{{ formattedText }}</slot>
    </div>
  </div>

  <!-- 环形进度条 -->
  <div v-else-if="type === 'circle'" :class="circleClasses">
    <svg class="m-progress__circle" :width="width" :height="width" :viewBox="`0 0 ${width} ${width}`">
      <circle
        class="m-progress__circle-track"
        :cx="width / 2"
        :cy="width / 2"
        :r="circleRadius"
        fill="none"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
      />
      <circle
        class="m-progress__circle-bar"
        :cx="width / 2"
        :cy="width / 2"
        :r="circleRadius"
        fill="none"
        :stroke-width="strokeWidth"
        :stroke-linecap="strokeLinecap"
        :stroke="barColor"
        :stroke-dasharray="circleDashArray"
        :stroke-dashoffset="circleDashOffset"
        :style="{ transition: 'stroke-dashoffset var(--mosaic-transition-duration) ease' }"
      />
    </svg>
    <div v-if="showText" class="m-progress__text">
      <slot :percentage="clampedPercentage">{{ formattedText }}</slot>
    </div>
  </div>

  <!-- 仪表盘进度条 -->
  <div v-else-if="type === 'dashboard'" :class="circleClasses">
    <svg class="m-progress__circle" :width="width" :height="width" :viewBox="`0 0 ${width} ${width}`">
      <circle
        class="m-progress__circle-track"
        :cx="width / 2"
        :cy="width / 2"
        :r="circleRadius"
        fill="none"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="dashboardDashArray"
        :stroke-dashoffset="dashboardDashOffset"
      />
      <circle
        class="m-progress__circle-bar"
        :cx="width / 2"
        :cy="width / 2"
        :r="circleRadius"
        fill="none"
        :stroke-width="strokeWidth"
        :stroke-linecap="strokeLinecap"
        :stroke="barColor"
        :stroke-dasharray="dashboardBarDashArray"
        :style="{ transition: 'stroke-dasharray var(--mosaic-transition-duration) ease' }"
      />
    </svg>
    <div v-if="showText" class="m-progress__text">
      <slot :percentage="clampedPercentage">{{ formattedText }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MProgress' })

type ProgressType = 'line' | 'circle' | 'dashboard'
type ProgressStatus = 'success' | 'exception' | 'warning' | ''
type StrokeLinecap = 'butt' | 'round' | 'square'
type ProgressColorStop = { color: string; percentage: number }

const props = withDefaults(defineProps<{
  percentage?: number                       // 百分比，0-100
  type?: ProgressType                       // 进度条类型
  status?: ProgressStatus                   // 进度条状态
  strokeWidth?: number                      // 进度条宽度(px)
  strokeLinecap?: StrokeLinecap             // 端点形状
  textInside?: boolean                      // 进度条文字是否内嵌
  width?: number                            // 环形进度条画布宽度(px)
  showText?: boolean                        // 是否显示文字
  color?: string | string[] | ProgressColorStop[] | ((percentage: number) => string)  // 进度条颜色
  format?: (percentage: number) => string   // 自定义文字格式化函数
  striped?: boolean                         // 是否显示条纹
  stripedFlow?: boolean                     // 条纹是否流动动画
}>(), {
  percentage: 0,
  type: 'line',
  status: '',
  strokeWidth: 6,
  strokeLinecap: 'round',
  textInside: false,
  width: 126,
  showText: true,
  striped: false,
  stripedFlow: false,
})

const clampedPercentage = computed(() => Math.min(100, Math.max(0, props.percentage)))

const barColor = computed(() => {
  if (typeof props.color === 'function') {
    return props.color(clampedPercentage.value)
  }
  if (typeof props.color === 'string' && props.color) {
    return props.color
  }
  if (Array.isArray(props.color)) {
    const colors = props.color
    if (colors.length === 0) return undefined
    // 对象形式：{ color, percentage }[]，按百分比阈值取色
    if (typeof colors[0] === 'object' && colors[0] !== null) {
      const sorted = [...(colors as ProgressColorStop[])].sort((a, b) => a.percentage - b.percentage)
      let result = sorted[0].color
      for (const c of sorted) {
        if (clampedPercentage.value >= c.percentage) result = c.color
        else break
      }
      return result
    }
    // 字符串数组形式：均分区间取色
    const segment = 100 / colors.length
    const index = Math.min(Math.floor(clampedPercentage.value / segment), colors.length - 1)
    return colors[index]
  }
  return undefined
})

const formattedText = computed(() => {
  if (props.format) {
    return props.format(clampedPercentage.value)
  }
  return `${clampedPercentage.value}%`
})

/* --- Line progress --- */
const lineClasses = computed(() => [
  'm-progress',
  'm-progress--line',
  {
    [`m-progress--${props.status}`]: !!props.status,
    'm-progress--striped': props.striped,
    'm-progress--striped-flow': props.stripedFlow,
  },
])

const outerStyle = computed(() => ({
  height: `${props.strokeWidth}px`,
}))

const innerStyle = computed(() => {
  const style: Record<string, string> = {
    width: `${clampedPercentage.value}%`,
  }
  if (barColor.value) {
    style.backgroundColor = barColor.value
  }
  return style
})

/* --- Circle / Dashboard progress --- */
const circleClasses = computed(() => [
  'm-progress',
  'm-progress--circle',
  {
    [`m-progress--${props.status}`]: !!props.status,
    'm-progress--dashboard': props.type === 'dashboard',
  },
])

const circleRadius = computed(() => (props.width - props.strokeWidth * 2) / 2)

const circumference = computed(() => 2 * Math.PI * circleRadius.value)

const circleDashArray = computed(() => `${circumference.value * (clampedPercentage.value / 100)} ${circumference.value}`)

const circleDashOffset = computed(() => 0)

/* --- Dashboard --- */
const dashboardDashArray = computed(() => `${circumference.value * 0.75} ${circumference.value * 0.25}`)

const dashboardDashOffset = computed(() => 0)

const dashboardBarDashArray = computed(() =>
  `${circumference.value * 0.75 * (clampedPercentage.value / 100)} ${circumference.value}`
)
</script>

<style lang="scss">
.m-progress {
  display: flex;
  align-items: center;
  font-size: var(--mosaic-font-size);
  line-height: 1;

  /* --- Line --- */
  &--line {
    width: 100%;
  }

  &__outer {
    flex: 1;
    background-color: var(--mosaic-fill-color-light);
    border-radius: 100px;
    overflow: hidden;
  }

  &__inner {
    height: 100%;
    background-color: var(--mosaic-primary);
    border-radius: 100px;
    transition: width var(--mosaic-transition-duration) ease;
    position: relative;
  }

  /* 条纹进度条：通过 ::before 叠加斜条纹 */
  &--striped &__inner::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-image: repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.25) 0,
      rgba(255, 255, 255, 0.25) 10px,
      transparent 10px,
      transparent 20px
    );
    background-size: 28px 28px;
  }

  &--striped-flow &__inner::before {
    animation: m-progress-stripes 1s linear infinite;
  }

  @keyframes m-progress-stripes {
    from { background-position: 0 0; }
    to { background-position: 28px 0; }
  }

  &__text-inside {
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    font-size: var(--mosaic-font-size-sm);
    color: #fff;
    white-space: nowrap;
  }

  &__text {
    margin-left: 10px;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-regular);
    white-space: nowrap;
  }

  /* Status colors */
  &--success &__inner {
    background-color: var(--mosaic-success);
  }
  &--success &__text,
  &--success &__circle-bar {
    color: var(--mosaic-success);
    stroke: var(--mosaic-success);
  }

  &--exception &__inner {
    background-color: var(--mosaic-danger);
  }
  &--exception &__text,
  &--exception &__circle-bar {
    color: var(--mosaic-danger);
    stroke: var(--mosaic-danger);
  }

  &--warning &__inner {
    background-color: var(--mosaic-warning);
  }
  &--warning &__text,
  &--warning &__circle-bar {
    color: var(--mosaic-warning);
    stroke: var(--mosaic-warning);
  }

  /* --- Circle / Dashboard --- */
  &--circle {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    .m-progress__text {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      text-align: center;
      margin: 0;
    }
  }

  &__circle {
    transform: rotate(-90deg);
  }

  &__circle-track {
    stroke: var(--mosaic-fill-color-light);
  }

  &__circle-bar {
    stroke: var(--mosaic-primary);
    transition: stroke-dashoffset var(--mosaic-transition-duration) ease;
  }

  /* Dashboard rotation: rotate SVG so the 270deg arc gap is centered at the bottom */
  &--dashboard &__circle {
    transform: rotate(135deg);
  }
}
</style>
