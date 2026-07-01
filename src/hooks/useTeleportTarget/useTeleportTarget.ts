import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/** 统一的 teleport 容器管理，用于 Dialog/Drawer/Message/Notification 等需要 append-to-body 的组件 */
export function useTeleportTarget(containerId: string = 'mosaic-ui-container') {
  const containerRef: Ref<HTMLElement | null> = ref(null)
  let isNew = false

  const ensureContainer = () => {
    let container = document.getElementById(containerId)
    if (!container) {
      container = document.createElement('div')
      container.id = containerId
      document.body.appendChild(container)
      isNew = true
    }
    containerRef.value = container
  }

  const removeContainer = () => {
    if (isNew && containerRef.value) {
      containerRef.value.remove()
      containerRef.value = null
      isNew = false
    }
  }

  onMounted(ensureContainer)
  onUnmounted(removeContainer)

  return { containerRef, ensureContainer, removeContainer }
}
