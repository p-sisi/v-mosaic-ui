import { createApp, type App, h } from 'vue'
import MessageVue from './Message.vue'
import { useZIndex } from '../../../hooks/useZIndex'

/** 消息类型 */
type MessageType = 'success' | 'warning' | 'info' | 'error'

/** 消息选项 */
interface MessageOptions {
  message?: string                     // 消息文本
  type?: MessageType                   // 消息类型
  dangerouslyUseHTMLString?: boolean   // 是否将 message 作为 HTML 片段处理
  customClass?: string                 // 自定义类名
  duration?: number                    // 显示时间(ms)，设为 0 则不会自动关闭
  showClose?: boolean                  // 是否显示关闭按钮
  center?: boolean                     // 文字是否居中
  onClose?: () => void                 // 关闭时的回调
  offset?: number                      // 距离顶部的偏移量
}

/** 消息实例处理器 */
interface MessageHandler {
  close: () => void
}

const { nextZIndex } = useZIndex()

interface MessageInstance {
  app: App
  container: HTMLElement
  id: string
  offset: number
  height: number
}

let instances: MessageInstance[] = []
let seed = 0

/** 计算消息实例的偏移量 */
function getOffset(id: string): number {
  let offset = 0
  for (const instance of instances) {
    if (instance.id === id) break
    offset += (instance.height || 44) + 16
  }
  return offset + 20
}

/** 关闭指定消息实例 */
function closeInstance(id: string) {
  const idx = instances.findIndex((i) => i.id === id)
  if (idx === -1) return

  const instance = instances[idx]
  instance.app.unmount()
  if (instance.container.parentNode) {
    instance.container.parentNode.removeChild(instance.container)
  }
  instances.splice(idx, 1)

  // 重新计算偏移量
  for (let i = idx; i < instances.length; i++) {
    instances[i].offset = getOffset(instances[i].id)
    const messageEl = instances[i].container.querySelector('.m-message') as HTMLElement
    if (messageEl) {
      messageEl.style.top = `${instances[i].offset}px`
    }
  }
}

/** 创建消息 */
function MMessage(options: string | MessageOptions): MessageHandler {
  const opts: MessageOptions = typeof options === 'string' ? { message: options } : { ...options }

  const id = `m-message-${seed++}`
  const zIndex = nextZIndex()

  const container = document.createElement('div')
  container.id = id

  const offset = getOffset(id)

  const { onClose: _onClose, ...restOpts } = opts

  const app = createApp({
    render() {
      return h(MessageVue, {
        ...restOpts,
        id,
        offset,
        closeHandler: () => {
          opts.onClose?.()
        },
        onDestroy: () => {
          closeInstance(id)
        },
      })
    },
  })

  app.mount(container)
  document.body.appendChild(container)

  // 设置 z-index 和偏移
  const messageEl = container.querySelector('.m-message') as HTMLElement
  if (messageEl) {
    messageEl.style.zIndex = String(zIndex)
    messageEl.style.top = `${offset}px`
  }

  const height = messageEl?.offsetHeight || 44

  const instance: MessageInstance = { app, container, id, offset, height }
  instances.push(instance)

  return {
    close() {
      closeInstance(id)
    },
  }
}

/** 快捷方法 */
MMessage.success = (msg: string | MessageOptions) => MMessage(typeof msg === 'string' ? { message: msg, type: 'success' } : { ...msg, type: 'success' })
MMessage.warning = (msg: string | MessageOptions) => MMessage(typeof msg === 'string' ? { message: msg, type: 'warning' } : { ...msg, type: 'warning' })
MMessage.info = (msg: string | MessageOptions) => MMessage(typeof msg === 'string' ? { message: msg, type: 'info' } : { ...msg, type: 'info' })
MMessage.error = (msg: string | MessageOptions) => MMessage(typeof msg === 'string' ? { message: msg, type: 'error' } : { ...msg, type: 'error' })

export { MMessage }
export default MMessage