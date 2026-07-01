type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
type __VLS_Props = {
    title?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonType?: ButtonType;
    cancelButtonType?: ButtonType;
    width?: number | string;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    cancel: () => any;
    confirm: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onCancel?: (() => any) | undefined;
    onConfirm?: (() => any) | undefined;
}>, {
    width: number | string;
    title: string;
    confirmButtonText: string;
    cancelButtonText: string;
    confirmButtonType: ButtonType;
    cancelButtonType: ButtonType;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
