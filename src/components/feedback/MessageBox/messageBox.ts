import { createApp, h } from 'vue'
import MessageBoxVue from './MessageBox.vue'
import { useZIndex } from '../../../hooks/useZIndex'

/** 消息框类型 */
type MessageBoxType = 'success' | 'warning' | 'info' | 'error'

/** 消息框选项 */
interface MessageBoxOptions {
  type?: MessageBoxType                          // 消息类型
  title?: string                                 // 标题
  message?: string                               // 消息内容
  confirmButtonText?: string                     // 确认按钮文本
  cancelButtonText?: string                      // 取消按钮文本
  showConfirmButton?: boolean                    // 是否显示确认按钮
  showCancelButton?: boolean                     // 是否显示取消按钮
  closeOnClickModal?: boolean                    // 点击遮罩层是否关闭
  closeOnPressEscape?: boolean                   // 按 ESC 是否关闭
  showClose?: boolean                            // 是否显示关闭按钮
  showInput?: boolean                            // 是否显示输入框
  inputPlaceholder?: string                      // 输入框占位符
  inputPattern?: RegExp                          // 输入框正则校验
  inputValidator?: (value: string) => boolean | string  // 输入框校验函数
  inputErrorMessage?: string                     // 输入框校验失败提示
  confirmButtonClass?: string                    // 确认按钮自定义类名
  cancelButtonClass?: string                     // 取消按钮自定义类名
  callback?: (action: string) => void            // 操作回调
  beforeClose?: (action: string, done: () => void) => void  // 关闭前回调
  dangerouslyUseHTMLString?: boolean             // 是否将 message 作为 HTML 片段处理
  distinguishCancelAndClose?: boolean            // 是否区分取消和关闭
}

/** MessageBox 返回值类型 */
interface MessageBoxResult {
  action: string
  value?: string
}

const { nextZIndex } = useZIndex()

/** 创建 MessageBox */
function MMessageBox(message: string, title?: string, options?: MessageBoxOptions): Promise<MessageBoxResult> {
  const opts: MessageBoxOptions = {
    message,
    title: title ?? '',
    ...options,
  }

  return new Promise<MessageBoxResult>((resolve, reject) => {
    const container = document.createElement('div')

    let inputValue = ''

    const app = createApp({
      render() {
        return h(MessageBoxVue, {
          ...opts,
          onAction(action: string) {
            const result: MessageBoxResult = { action, value: inputValue }

            opts.callback?.(action)

            if (action === 'confirm') {
              resolve(result)
            } else if (action === 'cancel' || action === 'close') {
              reject(result)
            }

            // Close and cleanup
            app.unmount()
            if (container.parentNode) {
              container.parentNode.removeChild(container)
            }
          },
        })
      },
    })

    app.mount(container)
    document.body.appendChild(container)
  })
}

/** Alert 快捷方法 - 只有确认按钮 */
MMessageBox.alert = (message: string, title?: string, options?: MessageBoxOptions) => {
  return MMessageBox(message, title, {
    ...options,
    showConfirmButton: true,
    showCancelButton: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
  })
}

/** Confirm 快捷方法 - 有确认和取消按钮 */
MMessageBox.confirm = (message: string, title?: string, options?: MessageBoxOptions) => {
  return MMessageBox(message, title, {
    ...options,
    showConfirmButton: true,
    showCancelButton: true,
    type: options?.type ?? 'warning',
  })
}

/** Prompt 快捷方法 - 带输入框 */
MMessageBox.prompt = (message: string, title?: string, options?: MessageBoxOptions) => {
  return MMessageBox(message, title, {
    ...options,
    showConfirmButton: true,
    showCancelButton: true,
    showInput: true,
    type: options?.type ?? 'warning',
  })
}

export { MMessageBox }
export default MMessageBox