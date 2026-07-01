type AlertType = 'success' | 'warning' | 'error' | 'info';
type AlertEffect = 'light' | 'dark';
type __VLS_Props = {
    title?: string;
    description?: string;
    type?: AlertType;
    closable?: boolean;
    closeText?: string;
    showIcon?: boolean;
    center?: boolean;
    effect?: AlertEffect;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClose?: (() => any) | undefined;
}>, {
    type: AlertType;
    title: string;
    center: boolean;
    closable: boolean;
    effect: AlertEffect;
    description: string;
    closeText: string;
    showIcon: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
