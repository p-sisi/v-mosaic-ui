type TooltipEffect = 'dark' | 'light';
type __VLS_Props = {
    modelValue?: boolean;
    content?: string;
    placement?: string;
    effect?: TooltipEffect;
    offset?: number;
    transition?: string;
    showAfter?: number;
    hideAfter?: number;
    enterable?: boolean;
    visibleArrow?: boolean;
    popperClass?: string;
    disabled?: boolean;
    tabindex?: number;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    disabled: boolean;
    content: string;
    transition: string;
    effect: TooltipEffect;
    placement: string;
    offset: number;
    showAfter: number;
    hideAfter: number;
    enterable: boolean;
    modelValue: boolean;
    visibleArrow: boolean;
    popperClass: string;
    tabindex: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
