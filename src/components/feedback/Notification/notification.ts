import { createApp, h, type App } from 'vue'
import NotificationVue from './Notification.vue'
import { useZIndex } from '../../../hooks/useZIndex'

/** 通知类型 */
type NotificationType = 'success' | 'warning' | 'info' | 'error'

/** 通知位置 */
type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

/** 通知选项 */
interface NotificationOptions {
  title?: string                     // 标题
  message?: string                   // 消息内容
  type?: NotificationType            // 通知类型
  dangerouslyUseHTMLString?: boolean // 是否将 message 作为 HTML 片段处理
  position?: NotificationPosition    // 显示位置
  customClass?: string               // 自定义类名
  offset?: number                    // 偏移量
  showClose?: boolean                // 是否显示关闭按钮
  duration?: number                  // 显示时间(ms)，设为 0 则不会自动关闭
  onClick?: () => void               // 点击通知时的回调
  onClose?: () => void               // 关闭时的回调
}

/** 通知实例处理器 */
interface NotificationHandler {
  close: () => void
}

const { nextZIndex } = useZIndex()

interface NotificationInstance {
  app: App
  container: HTMLElement
  id: string
  position: NotificationPosition
  offset: number
  height: number
}

let instances: NotificationInstance[] = []
let seed = 0

/** 获取指定位置的实例列表 */
function getInstancesByPosition(position: NotificationPosition): NotificationInstance[] {
  return instances.filter((i) => i.position === position)
}

/** 计算偏移量 */
function getOffset(position: NotificationPosition, id: string): number {
  const posInstances = getInstancesByPosition(position)
  let offset = 16
  for (const instance of posInstances) {
    if (instance.id === id) break
    offset += (instance.height || 80) + 16
  }
  return offset
}

/** 更新同一位置的所有通知偏移 */
function updateOffsets(position: NotificationPosition) {
  const posInstances = getInstancesByPosition(position)
  let offset = 16
  for (const instance of posInstances) {
    instance.offset = offset
    const el = instance.container.querySelector('.m-notification') as HTMLElement
    if (el) {
      if (position.startsWith('top')) {
        el.style.top = `${offset}px`
      } else {
        el.style.bottom = `${offset}px`
      }
    }
    offset += (instance.height || 80) + 16
  }
}

/** 关闭指定通知实例 */
function closeInstance(id: string) {
  const idx = instances.findIndex((i) => i.id === id)
  if (idx === -1) return

  const instance = instances[idx]
  const position = instance.position
  instance.app.unmount()
  if (instance.container.parentNode) {
    instance.container.parentNode.removeChild(instance.container)
  }
  instances.splice(idx, 1)

  // 重新计算偏移量
  updateOffsets(position)
}

/** 创建通知 */
function MNotification(options: NotificationOptions | string): NotificationHandler {
  const opts: NotificationOptions = typeof options === 'string' ? { message: options } : { ...options }

  const position = opts.position ?? 'top-right'
  const id = `m-notification-${seed++}`
  const zIndex = nextZIndex()

  const container = document.createElement('div')
  container.id = id

  const app = createApp({
    render() {
      const { onClick: _onClick, onClose: _onClose, ...restOpts } = opts
      return h(NotificationVue, {
        ...restOpts,
        position,
        offset: 16,
        id,
        closeHandler: () => {
          opts.onClose?.()
        },
        onDestroy: () => {
          closeInstance(id)
        },
        clickHandler: () => {
          opts.onClick?.()
        },
      })
    },
  })

  app.mount(container)
  document.body.appendChild(container)

  // 设置 z-index
  const notificationEl = container.querySelector('.m-notification') as HTMLElement
  if (notificationEl) {
    notificationEl.style.zIndex = String(zIndex)
  }

  const height = notificationEl?.offsetHeight || 80

  // 计算偏移
  const offset = getOffset(position, id)
  if (notificationEl) {
    if (position.startsWith('top')) {
      notificationEl.style.top = `${offset}px`
    } else {
      notificationEl.style.bottom = `${offset}px`
    }
  }

  const instance: NotificationInstance = {
    app,
    container,
    id,
    position,
    offset,
    height,
  }
  instances.push(instance)

  return {
    close() {
      closeInstance(id)
    },
  }
}

/** 快捷方法 */
MNotification.success = (options: NotificationOptions | string) =>
  MNotification(typeof options === 'string' ? { message: options, type: 'success' } : { ...options, type: 'success' })
MNotification.warning = (options: NotificationOptions | string) =>
  MNotification(typeof options === 'string' ? { message: options, type: 'warning' } : { ...options, type: 'warning' })
MNotification.info = (options: NotificationOptions | string) =>
  MNotification(typeof options === 'string' ? { message: options, type: 'info' } : { ...options, type: 'info' })
MNotification.error = (options: NotificationOptions | string) =>
  MNotification(typeof options === 'string' ? { message: options, type: 'error' } : { ...options, type: 'error' })

export { MNotification }
export default MNotification