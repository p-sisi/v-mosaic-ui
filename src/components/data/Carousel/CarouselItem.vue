<template>
  <div :class="classes" :style="itemStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'MCarouselItem' })

const props = withDefaults(defineProps<{
  name?: string                               // 幻灯片名称
  label?: string                              // 幻灯片标签文本
}>(), {
  name: '',
  label: '',
})

const mCarousel = inject<{
  activeIndex: { value: number }
  direction: { value: string }
  type: { value: string }
  loop: { value: boolean }
  itemCount: { value: number }
}>('mCarousel', { activeIndex: { value: 0 }, direction: { value: 'horizontal' }, type: { value: 'default' }, loop: { value: true }, itemCount: { value: 0 } })

const mCarouselRegister = inject<{
  register: () => number
  unregister: () => void
}>('mCarouselRegister', { register: () => 0, unregister: () => {} })

const itemIndex = ref(0)

const classes = computed(() => [
  'm-carousel-item',
  {
    'm-carousel-item--active': mCarousel.activeIndex.value === itemIndex.value,
    'm-carousel-item--card-inactive': mCarousel.type.value === 'card' && mCarousel.activeIndex.value !== itemIndex.value,
  },
])

const itemStyle = computed(() => {
  const active = mCarousel.activeIndex.value
  const idx = itemIndex.value
  const isHorizontal = mCarousel.direction.value === 'horizontal'
  const count = mCarousel.itemCount.value

  const style: Record<string, string> = {}

  if (mCarousel.type.value === 'card' && isHorizontal) {
    let diff = idx - active
    // Shortest-path adjustment for smooth looping
    if (mCarousel.loop.value && count > 0) {
      if (diff > count / 2) diff -= count
      else if (diff < -count / 2) diff += count
    }
    const absDiff = Math.abs(diff)
    const W = 65 // 当前卡片宽度占比，留出两侧展示前后卡片
    style.width = `${W}%`
    style.left = `${(100 - W) / 2}%`
    let tx = 0
    if (absDiff === 0) {
      style.height = '100%'
      style.top = '0'
      tx = 0
      style.zIndex = '2'
      style.opacity = '1'
    } else if (absDiff === 1) {
      // 紧贴当前卡片两侧，缩小高度与比例，露出部分内容
      style.height = '80%'
      style.top = '10%'
      tx = diff * 100
      style.zIndex = '1'
      style.opacity = '0.5'
    } else {
      tx = diff * 100
      style.zIndex = '0'
      style.opacity = '0'
    }
    style.transform = `translateX(${tx}%)`
    style.transition = 'transform 0.4s ease, opacity 0.4s ease, height 0.4s ease, top 0.4s ease'
  } else {
    let offset = idx - active
    // Shortest-path adjustment for smooth looping
    if (mCarousel.loop.value && count > 0) {
      if (offset > count / 2) offset -= count
      else if (offset < -count / 2) offset += count
    }
    const translate = isHorizontal ? `translateX(${offset * 100}%)` : `translateY(${offset * 100}%)`
    style.transform = translate
    style.transition = `transform var(--mosaic-transition-duration) ease`
  }

  return style
})

onMounted(() => {
  itemIndex.value = mCarouselRegister.register()
})

onUnmounted(() => {
  mCarouselRegister.unregister()
})
</script>

<style lang="scss">
.m-carousel-item {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  transition: transform 0.3s ease, opacity 0.3s ease;

  &--active {
    z-index: 2;
  }

  &--card-inactive {
    z-index: 1;
  }
}
</style>
