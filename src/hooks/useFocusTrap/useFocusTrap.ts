import { onMounted, onUnmounted, type Ref } from 'vue'

/** 键盘焦点陷阱，Tab 键在容器内循环 */
export function useFocusTrap(containerRef: Ref<HTMLElement | null>) {
  let previouslyFocusedElement: HTMLElement | null = null

  const trapFocus = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return

    const container = containerRef.value
    if (!container) return

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ]
    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(focusableSelectors.join(','))
    ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex >= 0)

    if (focusableElements.length === 0) return

    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        event.preventDefault()
        lastFocusable.focus()
      }
    } else {
      if (document.activeElement === lastFocusable) {
        event.preventDefault()
        firstFocusable.focus()
      }
    }
  }

  const activate = () => {
    previouslyFocusedElement = document.activeElement as HTMLElement
    document.addEventListener('keydown', trapFocus)
    // 聚焦到容器内第一个可聚焦元素
    const container = containerRef.value
    if (container) {
      const firstFocusable = container.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    }
  }

  const deactivate = () => {
    document.removeEventListener('keydown', trapFocus)
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus()
      previouslyFocusedElement = null
    }
  }

  onMounted(() => activate())
  onUnmounted(() => deactivate())

  return { activate, deactivate }
}
