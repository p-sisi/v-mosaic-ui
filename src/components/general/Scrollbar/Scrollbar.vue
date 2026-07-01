<template>
  <div class="m-scrollbar" :class="`m-scrollbar--trigger-${trigger}`" @mouseenter="onMouseEnter">
    <div
      ref="wrapRef"
      class="m-scrollbar__wrap"
      :class="{ 'm-scrollbar__wrap--hidden-native': !native }"
      :style="wrapStyle"
      @scroll="onScroll"
    >
      <div ref="viewRef" class="m-scrollbar__view">
        <slot />
      </div>
    </div>
    <template v-if="!native">
      <div v-show="overflowX" class="m-scrollbar__bar m-scrollbar__bar--horizontal" @mousedown.prevent="onTrackClick($event, 'horizontal')">
        <div
          class="m-scrollbar__thumb m-scrollbar__thumb--horizontal"
          :style="thumbHorizontalStyle"
          @mousedown.stop="onThumbMouseDown($event, 'horizontal')"
        ></div>
      </div>
      <div v-show="overflowY" class="m-scrollbar__bar m-scrollbar__bar--vertical" @mousedown.prevent="onTrackClick($event, 'vertical')">
        <div
          class="m-scrollbar__thumb m-scrollbar__thumb--vertical"
          :style="thumbVerticalStyle"
          @mousedown.stop="onThumbMouseDown($event, 'vertical')"
        ></div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref } from 'vue'

defineOptions({ name: 'MScrollbar' })

const props = withDefaults(defineProps<{
  native?: boolean                // 是否使用原生滚动条
  maxHeight?: number | string     // 最大高度
  trigger?: 'none' | 'hover'      // 滚动条触发方式，none 始终显示，hover 悬浮显示
  minSize?: number                // 滚动条最小尺寸（像素）
}>(), {
  native: false,
  maxHeight: undefined,
  trigger: 'hover',
  minSize: 20,
})

const wrapRef = ref<HTMLElement | null>(null)
const viewRef = ref<HTMLElement | null>(null)
const ratioX = ref(1)
const ratioY = ref(1)
const thumbWidth = ref(0)
const thumbHeight = ref(0)
const scrollLeft = ref(0)
const scrollTop = ref(0)

const overflowX = computed(() => ratioX.value < 1)
const overflowY = computed(() => ratioY.value < 1)

let dragStartX = 0
let dragStartY = 0
let dragStartScrollLeft = 0
let dragStartScrollTop = 0
let isDragging = false
let currentDragAxis: 'horizontal' | 'vertical' | null = null

const wrapStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.maxHeight !== undefined) {
    const val = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
    style.maxHeight = val
  }
  return style
})

const thumbHorizontalStyle = computed(() => ({
  width: `${thumbWidth.value}px`,
  transform: `translateX(${scrollLeft.value}px)`,
}))

const thumbVerticalStyle = computed(() => ({
  height: `${thumbHeight.value}px`,
  transform: `translateY(${scrollTop.value}px)`,
}))

function update() {
  if (!wrapRef.value) return
  const wrap = wrapRef.value
  const offsetWidth = wrap.offsetWidth
  const offsetHeight = wrap.offsetHeight
  const scrollWidth = wrap.scrollWidth
  const scrollHeight = wrap.scrollHeight

  ratioX.value = offsetWidth / scrollWidth
  ratioY.value = offsetHeight / scrollHeight

  const barWidth = Math.max(ratioX.value * offsetWidth, props.minSize)
  const barHeight = Math.max(ratioY.value * offsetHeight, props.minSize)

  thumbWidth.value = barWidth
  thumbHeight.value = barHeight

  updateScrollPosition()
}

function updateScrollPosition() {
  if (!wrapRef.value) return
  const wrap = wrapRef.value
  const maxMoveX = wrap.offsetWidth - thumbWidth.value
  const maxMoveY = wrap.offsetHeight - thumbHeight.value

  scrollLeft.value = (wrap.scrollLeft / (wrap.scrollWidth - wrap.offsetWidth)) * maxMoveX || 0
  scrollTop.value = (wrap.scrollTop / (wrap.scrollHeight - wrap.offsetHeight)) * maxMoveY || 0
}

function onScroll() {
  updateScrollPosition()
}

function onMouseEnter() {
  update()
}

function onThumbMouseDown(event: MouseEvent, axis: 'horizontal' | 'vertical') {
  isDragging = true
  currentDragAxis = axis
  dragStartX = event.clientX
  dragStartY = event.clientY
  dragStartScrollLeft = scrollLeft.value
  dragStartScrollTop = scrollTop.value
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(event: MouseEvent) {
  if (!isDragging || !wrapRef.value || !currentDragAxis) return
  const wrap = wrapRef.value

  if (currentDragAxis === 'horizontal') {
    const dx = event.clientX - dragStartX
    const maxMoveX = wrap.offsetWidth - thumbWidth.value
    const ratio = maxMoveX > 0 ? (dragStartScrollLeft + dx) / maxMoveX : 0
    wrap.scrollLeft = ratio * (wrap.scrollWidth - wrap.offsetWidth)
  } else {
    const dy = event.clientY - dragStartY
    const maxMoveY = wrap.offsetHeight - thumbHeight.value
    const ratio = maxMoveY > 0 ? (dragStartScrollTop + dy) / maxMoveY : 0
    wrap.scrollTop = ratio * (wrap.scrollHeight - wrap.offsetHeight)
  }
}

function onMouseUp() {
  isDragging = false
  currentDragAxis = null
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
  if (!showBar.value) return
  // keep visible briefly after mouse up
}

function onTrackClick(event: MouseEvent, axis: 'horizontal' | 'vertical') {
  if (!wrapRef.value) return
  const wrap = wrapRef.value
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()

  if (axis === 'vertical') {
    const clickRatio = (event.clientY - rect.top) / rect.height
    wrap.scrollTop = clickRatio * (wrap.scrollHeight - wrap.offsetHeight)
  } else {
    const clickRatio = (event.clientX - rect.left) / rect.width
    wrap.scrollLeft = clickRatio * (wrap.scrollWidth - wrap.offsetWidth)
  }
}

onMounted(() => {
  nextTick(() => update())
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
})
</script>

<style lang="scss">
.m-scrollbar {
  position: relative;
  overflow: hidden;

  &__wrap {
    overflow: auto;
    height: 100%;

    &--hidden-native {
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
      }
    }
  }

  &__view {
    min-height: 100%;
  }

  &__bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s ease;

    &--vertical {
      width: 6px;
      top: 2px;
    }

    &--horizontal {
      height: 6px;
      left: 2px;
    }
  }

  &--trigger-hover:hover .m-scrollbar__bar,
  &--trigger-hover .m-scrollbar__bar:active {
    opacity: 1;
  }

  &--trigger-none .m-scrollbar__bar {
    opacity: 1;
  }

  &__thumb {
    position: relative;
    display: block;
    border-radius: 4px;
    background-color: var(--mosaic-text-placeholder);
    opacity: 0.4;
    cursor: pointer;
    transition: background-color 0.3s, opacity 0.3s;

    &:hover,
    &:active {
      opacity: 0.7;
      background-color: var(--mosaic-text-secondary);
    }

    &--horizontal {
      height: 100%;
    }

    &--vertical {
      width: 100%;
    }
  }
}
</style>
