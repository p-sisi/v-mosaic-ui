import type { Directive } from 'vue'

/** v-infinite-scroll 指令：滚动到底部时触发回调 */
export const vInfiniteScroll: Directive<HTMLElement, () => void> = {
  mounted(el, binding) {
    const callback = binding.value
    if (typeof callback !== 'function') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          callback()
        }
      },
      { root: el, threshold: 0.1 }
    )

    // 创建哨兵元素
    const sentinel = document.createElement('div')
    sentinel.setAttribute('data-infinite-scroll-sentinel', '')
    el.appendChild(sentinel)
    observer.observe(sentinel)

    ;(el as any).__infiniteScrollObserver = observer
    ;(el as any).__infiniteScrollSentinel = sentinel
  },
  unmounted(el) {
    const observer = (el as any).__infiniteScrollObserver
    const sentinel = (el as any).__infiniteScrollSentinel
    if (observer) {
      observer.disconnect()
    }
    if (sentinel) {
      sentinel.remove()
    }
    delete (el as any).__infiniteScrollObserver
    delete (el as any).__infiniteScrollSentinel
  },
}
