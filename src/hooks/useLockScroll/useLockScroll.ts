import { onMounted, onUnmounted } from 'vue'

/** 锁定/解锁 body 滚动，并补偿滚动条宽度避免页面抖动 */
export function useLockScroll() {
  let scrollbarWidth = 0
  let locked = false

  const lock = () => {
    if (locked) return
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    scrollbarWidth = scrollBarWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    locked = true
  }

  const unlock = () => {
    if (!locked) return
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    locked = false
  }

  return { lock, unlock }
}
