type __VLS_Props = {
    modelValue?: boolean;
    title?: string;
    width?: string | number;
    fullscreen?: boolean;
    top?: string;
    modal?: boolean;
    appendToBody?: boolean;
    lockScroll?: boolean;
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
    showClose?: boolean;
    draggable?: boolean;
    center?: boolean;
    destroyOnClose?: boolean;
    noDivider?: boolean;
    beforeClose?: () => boolean | Promise<boolean>;
};
declare var __VLS_14: {}, __VLS_16: {}, __VLS_18: {}, __VLS_29: {}, __VLS_31: {}, __VLS_33: {};
type __VLS_Slots = {} & {
    title?: (props: typeof __VLS_14) => any;
} & {
    default?: (props: typeof __VLS_16) => any;
} & {
    footer?: (props: typeof __VLS_18) => any;
} & {
    title?: (props: typeof __VLS_29) => any;
} & {
    default?: (props: typeof __VLS_31) => any;
} & {
    footer?: (props: typeof __VLS_33) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => any;
    "update:modelValue": (value: boolean) => any;
    open: () => any;
    opened: () => any;
    closed: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onOpen?: (() => any) | undefined;
    onOpened?: (() => any) | undefined;
    onClosed?: (() => any) | undefined;
}>, {
    width: string | number;
    title: string;
    center: boolean;
    top: string;
    modelValue: boolean;
    modal: boolean;
    closeOnClickModal: boolean;
    closeOnPressEscape: boolean;
    lockScroll: boolean;
    fullscreen: boolean;
    appendToBody: boolean;
    showClose: boolean;
    draggable: boolean;
    destroyOnClose: boolean;
    noDivider: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
