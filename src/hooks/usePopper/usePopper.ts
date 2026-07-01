import { ref, watch, onMounted, onUnmounted, type Ref } from 'vue'
import { computePosition, flip, shift, offset as floatingOffset, arrow, autoUpdate, type Placement, type Middleware } from '@floating-ui/dom'
import { useZIndex } from '../useZIndex'

export interface UsePopperOptions {
  /** 弹出层位置 */
  placement?: Placement
  /** 偏移量 */
  offset?: number
  /** 是否显示箭头 */
  showArrow?: boolean
  /** 触发方式 */
  trigger?: 'hover' | 'click' | 'focus' | 'manual'
  /** 弹出延迟(ms) */
  showAfter?: number
  /** 隐藏延迟(ms) */
  hideAfter?: number
  /** 弹出层类名 */
  popperClass?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 鼠标是否可进入弹出层 */
  enterable?: boolean
  /** 自动消失时间(ms)，0 表示不自动消失 */
  autoDismiss?: number
}

/** 基于 @floating-ui/dom 的弹出定位 composable */
export function usePopper(
  referenceRef: Ref<HTMLElement | null>,
  popperRef: Ref<HTMLElement | null>,
  arrowRef: Ref<HTMLElement | null>,
  options: UsePopperOptions = {}
) {
  const {
    placement = 'bottom',
    offset = 12,
    showArrow = false,
    trigger = 'hover',
    showAfter = 0,
    hideAfter = 0,
    disabled = false,
    enterable = true,
    autoDismiss = 0,
  } = options

  const visible = ref(false)
  const { nextZIndex } = useZIndex()
  let showTimer: ReturnType<typeof setTimeout> | null = null
  let hideTimer: ReturnType<typeof setTimeout> | null = null
  let autoDismissTimer: ReturnType<typeof setTimeout> | null = null
  let cleanupAutoUpdate: (() => void) | null = null

  const updatePosition = async () => {
    if (!referenceRef.value || !popperRef.value) return

    const middleware: Middleware[] = [floatingOffset(offset), flip(), shift({ padding: 4 })]

    if (showArrow && arrowRef.value) {
      middleware.push(arrow({ element: arrowRef.value }))
    }

    const { x, y, placement: finalPlacement, middlewareData } = await computePosition(
      referenceRef.value,
      popperRef.value,
      { placement, middleware }
    )

    if (popperRef.value) {
      Object.assign(popperRef.value.style, {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        zIndex: nextZIndex(),
      })
    }

    if (showArrow && arrowRef.value && middlewareData.arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow
      const side = finalPlacement.split('-')[0]
      const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side]

      Object.assign(arrowRef.value.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        [staticSide!]: '-4px',
      })
    }
  }

  const doShow = () => {
    if (disabled) return
    visible.value = true
    if (autoDismiss > 0) {
      if (autoDismissTimer) clearTimeout(autoDismissTimer)
      autoDismissTimer = setTimeout(() => doHide(), autoDismiss)
    }
  }

  const doHide = () => {
    visible.value = false
    if (autoDismissTimer) { clearTimeout(autoDismissTimer); autoDismissTimer = null }
  }

  const show = () => {
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
    if (showAfter > 0) {
      showTimer = setTimeout(doShow, showAfter)
    } else {
      doShow()
    }
  }

  const hide = () => {
    if (showTimer) { clearTimeout(showTimer); showTimer = null }
    if (hideAfter > 0) {
      hideTimer = setTimeout(doHide, hideAfter)
    } else {
      doHide()
    }
  }

  const toggle = () => {
    visible.value ? hide() : show()
  }

  const onReferenceMouseEnter = () => { if (trigger === 'hover') show() }
  const onReferenceMouseLeave = () => {
    if (trigger === 'hover') {
      if (enterable) {
        // 延迟隐藏，给鼠标移入 popper 的时间
        if (hideTimer) clearTimeout(hideTimer)
        hideTimer = setTimeout(doHide, 200)
      } else {
        hide()
      }
    }
  }
  const onPopperMouseEnter = () => { if (trigger === 'hover' && enterable) { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null } } }
  const onPopperMouseLeave = () => { if (trigger === 'hover') hide() }
  const onReferenceClick = () => { if (trigger === 'click') toggle() }
  const onReferenceFocus = () => { if (trigger === 'focus') show() }
  const onReferenceBlur = () => { if (trigger === 'focus') hide() }

  watch(visible, async (val) => {
    if (val) {
      await updatePosition()
      if (referenceRef.value && popperRef.value) {
        cleanupAutoUpdate = autoUpdate(referenceRef.value, popperRef.value, updatePosition)
      }
    } else {
      cleanupAutoUpdate?.()
      cleanupAutoUpdate = null
    }
  })

  onUnmounted(() => {
    cleanupAutoUpdate?.()
    if (showTimer) clearTimeout(showTimer)
    if (hideTimer) clearTimeout(hideTimer)
    if (autoDismissTimer) clearTimeout(autoDismissTimer)
  })

  return {
    visible,
    show,
    hide,
    toggle,
    updatePosition,
    onReferenceMouseEnter,
    onReferenceMouseLeave,
    onPopperMouseEnter,
    onPopperMouseLeave,
    onReferenceClick,
    onReferenceFocus,
    onReferenceBlur,
  }
}
