/** 通知类型 */
type NotificationType = 'success' | 'warning' | 'info' | 'error';
/** 通知位置 */
type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
/** 通知选项 */
interface NotificationOptions {
    title?: string;
    message?: string;
    type?: NotificationType;
    dangerouslyUseHTMLString?: boolean;
    position?: NotificationPosition;
    customClass?: string;
    offset?: number;
    showClose?: boolean;
    duration?: number;
    onClick?: () => void;
    onClose?: () => void;
}
/** 通知实例处理器 */
interface NotificationHandler {
    close: () => void;
}
/** 创建通知 */
declare function MNotification(options: NotificationOptions | string): NotificationHandler;
declare namespace MNotification {
    var success: (options: NotificationOptions | string) => NotificationHandler;
    var warning: (options: NotificationOptions | string) => NotificationHandler;
    var info: (options: NotificationOptions | string) => NotificationHandler;
    var error: (options: NotificationOptions | string) => NotificationHandler;
}
export { MNotification };
export default MNotification;
