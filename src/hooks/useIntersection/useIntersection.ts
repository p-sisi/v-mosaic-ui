import { onMounted, onUnmounted, type Ref } from 'vue'

export interface UseIntersectionOptions {
  /** 目标元素与视口交叉的比例阈值 */
  threshold?: number
  /** 根元素边距 */
  rootMargin?: string
  /** 根元素 */
  root?: Element | null
}

/** IntersectionObserver 封装，用于懒加载、滚动检测等 */
export function useIntersection(
  target: Ref<HTMLElement | null>,
  callback: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
  options: UseIntersectionOptions = {}
) {
  const { threshold = 0, rootMargin = '0px', root = null } = options
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (target.value) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]) {
            callback(entries[0].isIntersecting, entries[0])
          }
        },
        { threshold, rootMargin, root }
      )
      observer.observe(target.value)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return {
    stop: () => { observer?.disconnect(); observer = null },
  }
}
