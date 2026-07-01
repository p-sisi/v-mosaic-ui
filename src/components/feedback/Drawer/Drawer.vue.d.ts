type DrawerDirection = 'ltr' | 'rtl' | 'ttb' | 'btt';
type __VLS_Props = {
    modelValue?: boolean;
    title?: string;
    size?: string | number;
    direction?: DrawerDirection;
    appendToBody?: boolean;
    modal?: boolean;
    lockScroll?: boolean;
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
    showClose?: boolean;
    withHeader?: boolean;
    wrapperClosable?: boolean;
    beforeClose?: () => boolean | Promise<boolean>;
    destroyOnClose?: boolean;
};
declare var __VLS_14: {}, __VLS_25: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_14) => any;
} & {
    default?: (props: typeof __VLS_25) => any;
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
    size: string | number;
    title: string;
    direction: DrawerDirection;
    modelValue: boolean;
    modal: boolean;
    closeOnClickModal: boolean;
    closeOnPressEscape: boolean;
    lockScroll: boolean;
    appendToBody: boolean;
    showClose: boolean;
    destroyOnClose: boolean;
    withHeader: boolean;
    wrapperClosable: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
