<template>
  <div :class="classes" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="m-carousel__container" :style="containerStyle">
      <slot />
      <button
        v-if="arrow !== 'never'"
        v-show="arrowVisible"
        class="m-carousel__arrow m-carousel__arrow--left"
        @click="prev"
      >
        {{ arrowIcon.prev }}
      </button>
      <button
        v-if="arrow !== 'never'"
        v-show="arrowVisible"
        class="m-carousel__arrow m-carousel__arrow--right"
        @click="next"
      >
        {{ arrowIcon.next }}
      </button>
    </div>
    <ul v-if="indicatorPosition !== 'none'" :class="indicatorClasses">
      <li
        v-for="i in itemCount"
        :key="i"
        :class="['m-carousel__indicator', { 'm-carousel__indicator--active': activeIndex === i - 1 }]"
        @mouseenter="trigger === 'hover' ? setActive(i - 1) : undefined"
        @click="trigger === 'click' ? setActive(i - 1) : undefined"
      >
        <button class="m-carousel__indicator-button"></button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, provide, watch, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'MCarousel' })

type CarouselTrigger = 'click' | 'hover'
type IndicatorPosition = 'outside' | 'inside' | 'none'
type ArrowVisibility = 'always' | 'hover' | 'never'
type CarouselType = 'default' | 'card'
type CarouselDirection = 'horizontal' | 'vertical'

const props = withDefaults(defineProps<{
  modelValue?: number                         // 当前激活的幻灯片索引
  height?: string                             // 走马灯高度
  initialIndex?: number                       // 初始激活的幻灯片索引
  trigger?: CarouselTrigger                   // 指示器触发方式
  autoplay?: boolean                          // 是否自动切换
  interval?: number                           // 自动切换间隔时间（毫秒）
  indicatorPosition?: IndicatorPosition       // 指示器位置
  arrow?: ArrowVisibility                     // 切换箭头显示时机
  type?: CarouselType                         // 走马灯类型
  loop?: boolean                              // 是否循环显示
  direction?: CarouselDirection               // 展示方向
}>(), {
  modelValue: 0,
  height: '150px',
  initialIndex: 0,
  trigger: 'click',
  autoplay: true,
  interval: 3000,
  indicatorPosition: 'outside',
  arrow: 'hover',
  type: 'default',
  loop: true,
  direction: 'horizontal',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [current: number, prev: number]
}>()

const activeIndex = ref(props.initialIndex)
const itemCount = ref(0)
const hover = ref(false)
const arrowVisible = ref(props.arrow === 'always')
let timer: ReturnType<typeof setInterval> | null = null

const classes = computed(() => [
  'm-carousel',
  `m-carousel--${props.direction}`,
  {
    'm-carousel--card': props.type === 'card',
  },
])

const containerStyle = computed(() => ({
  height: props.height,
}))

const indicatorClasses = computed(() => [
  'm-carousel__indicators',
  `m-carousel__indicators--${props.indicatorPosition}`,
  `m-carousel__indicators--${props.direction}`,
])

const arrowIcon = computed(() => props.direction === 'vertical'
  ? { prev: '↑', next: '↓' }
  : { prev: '‹', next: '›' })

const setActive = (index: number) => {
  const prev = activeIndex.value
  if (props.loop) {
    activeIndex.value = ((index % itemCount.value) + itemCount.value) % itemCount.value
  } else {
    activeIndex.value = Math.max(0, Math.min(index, itemCount.value - 1))
  }
  emit('update:modelValue', activeIndex.value)
  if (prev !== activeIndex.value) {
    emit('change', activeIndex.value, prev)
  }
}

const prev = () => setActive(activeIndex.value - 1)
const next = () => setActive(activeIndex.value + 1)

const startAutoplay = () => {
  if (props.autoplay && itemCount.value > 1) {
    stopAutoplay()
    timer = setInterval(() => {
      if (!hover.value) next()
    }, props.interval)
  }
}

const stopAutoplay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const handleMouseEnter = () => {
  hover.value = true
  if (props.arrow === 'hover') arrowVisible.value = true
}

const handleMouseLeave = () => {
  hover.value = false
  if (props.arrow === 'hover') arrowVisible.value = false
}

watch(() => props.modelValue, (val) => {
  setActive(val)
})

watch([() => props.autoplay, () => props.interval], () => {
  startAutoplay()
})

provide('mCarousel', {
  activeIndex: computed(() => activeIndex.value),
  direction: computed(() => props.direction),
  type: computed(() => props.type),
  loop: computed(() => props.loop),
  itemCount,
})

const registerItem = () => {
  const index = itemCount.value
  itemCount.value++
  return index
}
const unregisterItem = () => { itemCount.value-- }

provide('mCarouselRegister', { register: registerItem, unregister: unregisterItem })

onMounted(() => {
  startAutoplay()
  if (props.arrow === 'always') arrowVisible.value = true
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style lang="scss">
.m-carousel {
  position: relative;
  overflow: hidden;

  &__container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background-color: rgba(31, 45, 61, 0.5);
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--mosaic-transition-duration-fast) ease;

    &:hover {
      background-color: rgba(31, 45, 61, 0.8);
    }

    &--left {
      left: 16px;
    }

    &--right {
      right: 16px;
    }
  }

  &--vertical &__arrow--left {
    top: 16px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }

  &--vertical &__arrow--right {
    top: auto;
    bottom: 16px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }

  &__indicators {
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 10;
    display: flex;

    // inside：叠加在图片上
    &--inside.m-carousel__indicators--horizontal {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
    }

    &--inside.m-carousel__indicators--vertical {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      flex-direction: column;
    }

    // outside：水平位于图片下方；垂直同样放右侧
    &--outside.m-carousel__indicators--horizontal {
      justify-content: center;
      margin-top: 8px;
    }

    &--outside.m-carousel__indicators--vertical {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      flex-direction: column;
    }
  }

  &__indicator {
    padding: 4px;
    cursor: pointer;
  }

  &__indicator-button {
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background-color: rgba(31, 45, 61, 0.3);
    cursor: pointer;
    transition: background-color var(--mosaic-transition-duration-fast) ease;

    .m-carousel__indicators--outside & {
      background-color: var(--mosaic-text-placeholder, #a8abb2);
    }
  }

  &__indicator--active &__indicator-button {
    background-color: var(--mosaic-primary);
  }
}
</style>