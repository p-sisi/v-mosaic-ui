import { ref, watch, onUnmounted, type Ref } from 'vue'
import { useZIndex } from '../useZIndex'
import { useLockScroll } from '../useLockScroll'

export interface UsePopupOptions {
  /** 是否显示遮罩层 */
  modal?: boolean
  /** 点击遮罩层是否关闭 */
  closeOnClickModal?: boolean
  /** 按 ESC 是否关闭 */
  closeOnPressEscape?: boolean
  /** 是否锁定滚动 */
  lockScroll?: boolean
  /** 打开前回调，返回 false 可阻止打开 */
  beforeClose?: () => boolean | Promise<boolean>
}

/** 模态弹窗生命周期管理：遮罩层、z-index、滚动锁定 */
export function usePopup(
  visible: Ref<boolean>,
  options: UsePopupOptions = {}
) {
  const {
    modal = true,
    closeOnClickModal = true,
    closeOnPressEscape = true,
    lockScroll = true,
    beforeClose,
  } = options

  const { nextZIndex } = useZIndex()
  const { lock, unlock } = useLockScroll()
  const zIndex = ref(0)

  const open = () => {
    zIndex.value = nextZIndex()
    if (lockScroll) lock()
    visible.value = true
  }

  const close = async () => {
    if (beforeClose) {
      const canClose = await beforeClose()
      if (!canClose) return
    }
    visible.value = false
    if (lockScroll) unlock()
  }

  const onModalClick = () => {
    if (closeOnClickModal) close()
  }

  const onEscape = (e: KeyboardEvent) => {
    if (closeOnPressEscape && e.key === 'Escape' && visible.value) {
      close()
    }
  }

  watch(visible, (val) => {
    if (val) {
      zIndex.value = nextZIndex()
      if (lockScroll) lock()
      document.addEventListener('keydown', onEscape)
    } else {
      if (lockScroll) unlock()
      document.removeEventListener('keydown', onEscape)
    }
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', onEscape)
    if (lockScroll) unlock()
  })

  return { zIndex, open, close, onModalClick }
}
