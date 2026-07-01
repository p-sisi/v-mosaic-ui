import { onMounted, onUnmounted, type Ref } from 'vue'

/** 监听元素尺寸变化 */
export function useResizeObserver(
  target: Ref<HTMLElement | null>,
  callback: (entry: ResizeObserverEntry) => void
) {
  let observer: ResizeObserver | null = null

  onMounted(() => {
    if (target.value) {
      observer = new ResizeObserver((entries) => {
        if (entries[0]) callback(entries[0])
      })
      observer.observe(target.value)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return {
    /** 手动停止观察 */
    stop: () => { observer?.disconnect(); observer = null },
  }
}
