/** 消息框类型 */
type MessageBoxType = 'success' | 'warning' | 'info' | 'error';
/** 消息框选项 */
interface MessageBoxOptions {
    type?: MessageBoxType;
    title?: string;
    message?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    showConfirmButton?: boolean;
    showCancelButton?: boolean;
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
    showClose?: boolean;
    showInput?: boolean;
    inputPlaceholder?: string;
    inputPattern?: RegExp;
    inputValidator?: (value: string) => boolean | string;
    inputErrorMessage?: string;
    confirmButtonClass?: string;
    cancelButtonClass?: string;
    callback?: (action: string) => void;
    beforeClose?: (action: string, done: () => void) => void;
    dangerouslyUseHTMLString?: boolean;
    distinguishCancelAndClose?: boolean;
}
/** MessageBox 返回值类型 */
interface MessageBoxResult {
    action: string;
    value?: string;
}
/** 创建 MessageBox */
declare function MMessageBox(message: string, title?: string, options?: MessageBoxOptions): Promise<MessageBoxResult>;
declare namespace MMessageBox {
    var alert: (message: string, title?: string, options?: MessageBoxOptions) => Promise<MessageBoxResult>;
    var confirm: (message: string, title?: string, options?: MessageBoxOptions) => Promise<MessageBoxResult>;
    var prompt: (message: string, title?: string, options?: MessageBoxOptions) => Promise<MessageBoxResult>;
}
export { MMessageBox };
export default MMessageBox;
