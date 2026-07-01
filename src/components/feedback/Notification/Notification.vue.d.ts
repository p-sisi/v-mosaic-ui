type NotificationType = 'success' | 'warning' | 'info' | 'error';
type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
type __VLS_Props = {
    title?: string;
    message?: string;
    type?: NotificationType;
    dangerouslyUseHTMLString?: boolean;
    position?: NotificationPosition;
    customClass?: string;
    offset?: number;
    showClose?: boolean;
    duration?: number;
    clickHandler?: () => void;
    closeHandler?: () => void;
    id?: string;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => any;
    destroy: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClose?: (() => any) | undefined;
    onDestroy?: (() => any) | undefined;
}>, {
    type: NotificationType;
    title: string;
    duration: number;
    offset: number;
    message: string;
    position: NotificationPosition;
    showClose: boolean;
    id: string;
    customClass: string;
    dangerouslyUseHTMLString: boolean;
    closeHandler: () => void;
    clickHandler: () => void;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
