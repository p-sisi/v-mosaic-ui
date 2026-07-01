import type { Directive, DirectiveBinding } from 'vue'

/** v-loading 指令绑定选项 */
interface LoadingBindingOptions {
  text?: string
  background?: string
  customClass?: string
}

/** 创建 loading 遮罩 DOM */
function createLoadingEl(binding: DirectiveBinding<boolean | LoadingBindingOptions>): HTMLElement {
  const overlay = document.createElement('div')
  overlay.classList.add('m-loading-mask')

  const options: LoadingBindingOptions = typeof binding.value === 'object' ? binding.value : {}

  if (options.customClass) {
    overlay.classList.add(options.customClass)
  }
  if (options.background) {
    overlay.style.backgroundColor = options.background
  }

  const spinner = document.createElement('div')
  spinner.classList.add('m-loading-spinner')

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
  spinner.appendChild(svg)

  if (options.text) {
    const text = document.createElement('p')
    text.classList.add('m-loading-text')
    text.textContent = options.text
    spinner.appendChild(text)
  }

  overlay.appendChild(spinner)
  return overlay
}

/** v-loading 指令：为目标元素添加加载遮罩 */
export const vLoading: Directive<HTMLElement, boolean | LoadingBindingOptions> = {
  mounted(el, binding) {
    if (binding.value !== false) {
      addLoading(el, binding)
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value !== false) {
        addLoading(el, binding)
      } else {
        removeLoading(el)
      }
    }
  },
  unmounted(el) {
    removeLoading(el)
  },
}

function addLoading(el: HTMLElement & { _mLoadingEl?: HTMLElement }, binding: DirectiveBinding<boolean | LoadingBindingOptions>) {
  removeLoading(el)

  const isFullscreen = binding.modifiers.fullscreen
  const isBody = binding.modifiers.body

  const loadingEl = createLoadingEl(binding)
  el._mLoadingEl = loadingEl

  if (isFullscreen || isBody) {
    loadingEl.classList.add('m-loading-mask--fullscreen')
    document.body.appendChild(loadingEl)
  } else {
    el.style.position = el.style.position || 'relative'
    el.appendChild(loadingEl)
  }
}

function removeLoading(el: HTMLElement & { _mLoadingEl?: HTMLElement }) {
  if (el._mLoadingEl) {
    if (el._mLoadingEl.parentNode) {
      el._mLoadingEl.parentNode.removeChild(el._mLoadingEl)
    }
    delete el._mLoadingEl
  }
}

export default vLoading
