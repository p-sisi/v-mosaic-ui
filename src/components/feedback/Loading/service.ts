import { createApp, type App, type Component } from 'vue'
import { useZIndex } from '../../../hooks/useZIndex'

/** Loading 服务选项 */
interface LoadingServiceOptions {
  target?: HTMLElement | string   // 加载遮罩挂载的目标元素
  text?: string                   // 加载提示文字
  background?: string             // 遮罩背景色
  fullscreen?: boolean            // 是否全屏显示
  lock?: boolean                  // 是否锁定屏幕滚动
  customClass?: string            // 自定义类名
}

/** Loading 实例处理器 */
interface LoadingHandler {
  close: () => void
}

const { nextZIndex } = useZIndex()

/** 创建 loading 遮罩 DOM 并挂载 */
export function LoadingService(options: LoadingServiceOptions = {}): LoadingHandler {
  const {
    text = '',
    background = '',
    fullscreen = false,
    lock = false,
    customClass = '',
  } = options

  let target: HTMLElement
  if (options.target) {
    if (typeof options.target === 'string') {
      target = document.querySelector(options.target) as HTMLElement
    } else {
      target = options.target
    }
  } else {
    target = document.body
  }

  const overlay = document.createElement('div')
  overlay.classList.add('m-loading-mask')

  if (fullscreen || target === document.body) {
    overlay.classList.add('m-loading-mask--fullscreen')
  }

  if (customClass) {
    overlay.classList.add(customClass)
  }

  if (background) {
    overlay.style.backgroundColor = background
  }

  overlay.style.zIndex = String(nextZIndex())

  const spinnerEl = document.createElement('div')
  spinnerEl.classList.add('m-loading-spinner')

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('class', 'm-loading-spinner__svg')
  svg.setAttribute('viewBox', '0 0 50 50')
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  circle.setAttribute('class', 'm-loading-spinner__circle')
  circle.setAttribute('cx', '25')
  circle.setAttribute('cy', '25')
  circle.setAttribute('r', '20')
  circle.setAttribute('fill', 'none')
  circle.setAttribute('stroke-width', '3')
  circle.setAttribute('stroke-miterlimit', '10')
  svg.appendChild(circle)
  spinnerEl.appendChild(svg)

  if (text) {
    const textEl = document.createElement('p')
    textEl.classList.add('m-loading-text')
    textEl.textContent = text
    spinnerEl.appendChild(textEl)
  }

  overlay.appendChild(spinnerEl)

  if (lock && fullscreen) {
    document.body.style.overflow = 'hidden'
  }

  if (target !== document.body) {
    target.style.position = target.style.position || 'relative'
  }

  target.appendChild(overlay)

  const handler: LoadingHandler = {
    close() {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay)
      }
      if (lock && fullscreen) {
        document.body.style.overflow = ''
      }
    },
  }

  return handler
}

LoadingService.service = LoadingService

export default LoadingService