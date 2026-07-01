<template>
  <Transition name="m-fade-in">
    <div
      v-show="visible"
      class="m-backtop"
      :style="backtopStyle"
      @click="handleClick"
    >
      <svg viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75.3c5.1 0 9.9-2.5 12.9-6.6L512 369.8l283.8 391.6c3 4.1 7.8 6.6 12.9 6.6h75.3c6.6 0 10.3-7.4 6.5-12.7z"/></svg>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'MBacktop' })

const props = withDefaults(defineProps<{
  target?: string               // 触发滚动的目标元素选择器，默认为窗口
  visibilityHeight?: number     // 滚动高度达到此值时显示回到顶部按钮
  right?: number                // 距离右侧的距离(px)
  bottom?: number               // 距离底部的距离(px)
}>(), {
  target: '',
  visibilityHeight: 200,
  right: 40,
  bottom: 40,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const visible = ref(false)
let scrollContainer: HTMLElement | Window = window

const backtopStyle = computed(() => ({
  right: `${props.right}px`,
  bottom: `${props.bottom}px`,
  position: props.target ? 'absolute' as const : 'fixed' as const,
}))

function handleScroll() {
  const scrollTop = scrollContainer instanceof Window
    ? scrollContainer.scrollY || document.documentElement.scrollTop
    : scrollContainer.scrollTop
  visible.value = scrollTop >= props.visibilityHeight
}

function scrollToTop() {
  if (scrollContainer instanceof Window) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function handleClick(event: MouseEvent) {
  scrollToTop()
  emit('click', event)
}

onMounted(() => {
  if (props.target) {
    const el = document.querySelector(props.target) as HTMLElement | null
    if (el) {
      scrollContainer = el
      // Ensure the target container is positioned so the backtop button stays within it
      if (getComputedStyle(el).position === 'static') {
        el.style.position = 'relative'
      }
    }
  }
  scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  scrollContainer.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
.m-backtop {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--mosaic-fill-color-blank);
  box-shadow: var(--mosaic-box-shadow-base);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--mosaic-text-regular);
  font-size: 16px;
  z-index: var(--mosaic-z-index-popper);
  transition: background-color var(--mosaic-transition-duration-fast), color var(--mosaic-transition-duration-fast);

  &:hover {
    background-color: var(--mosaic-primary);
    color: #fff;
  }
}
</style>
