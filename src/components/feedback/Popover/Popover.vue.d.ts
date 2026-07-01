type PopoverTrigger = 'click' | 'focus' | 'hover' | 'manual';
type __VLS_Props = {
    modelValue?: boolean;
    trigger?: PopoverTrigger;
    title?: string;
    content?: string;
    width?: number | string;
    placement?: string;
    visibleArrow?: boolean;
    offset?: number;
    transition?: string;
    popperClass?: string;
    showAfter?: number;
    hideAfter?: number;
    enterable?: boolean;
    disabled?: boolean;
    dark?: boolean;
};
declare var __VLS_1: {}, __VLS_16: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    content?: (props: typeof __VLS_16) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
    show: () => any;
    hide: () => any;
    afterEnter: () => any;
    afterLeave: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onShow?: (() => any) | undefined;
    onHide?: (() => any) | undefined;
    onAfterEnter?: (() => any) | undefined;
    onAfterLeave?: (() => any) | undefined;
}>, {
    width: number | string;
    disabled: boolean;
    title: string;
    content: string;
    transition: string;
    dark: boolean;
    placement: string;
    offset: number;
    trigger: PopoverTrigger;
    showAfter: number;
    hideAfter: number;
    enterable: boolean;
    modelValue: boolean;
    visibleArrow: boolean;
    popperClass: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
