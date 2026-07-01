/** 消息类型 */
type MessageType = 'success' | 'warning' | 'info' | 'error';
/** 消息选项 */
interface MessageOptions {
    message?: string;
    type?: MessageType;
    dangerouslyUseHTMLString?: boolean;
    customClass?: string;
    duration?: number;
    showClose?: boolean;
    center?: boolean;
    onClose?: () => void;
    offset?: number;
}
/** 消息实例处理器 */
interface MessageHandler {
    close: () => void;
}
/** 创建消息 */
declare function MMessage(options: string | MessageOptions): MessageHandler;
declare namespace MMessage {
    var success: (msg: string | MessageOptions) => MessageHandler;
    var warning: (msg: string | MessageOptions) => MessageHandler;
    var info: (msg: string | MessageOptions) => MessageHandler;
    var error: (msg: string | MessageOptions) => MessageHandler;
}
export { MMessage };
export default MMessage;
