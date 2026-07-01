type MessageType = 'success' | 'warning' | 'info' | 'error';
type __VLS_Props = {
    message?: string;
    type?: MessageType;
    showClose?: boolean;
    center?: boolean;
    dangerouslyUseHTMLString?: boolean;
    closeHandler?: () => void;
    duration?: number;
    offset?: number;
    id?: string;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => any;
    destroy: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClose?: (() => any) | undefined;
    onDestroy?: (() => any) | undefined;
}>, {
    type: MessageType;
    center: boolean;
    duration: number;
    offset: number;
    message: string;
    showClose: boolean;
    id: string;
    dangerouslyUseHTMLString: boolean;
    closeHandler: () => void;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
