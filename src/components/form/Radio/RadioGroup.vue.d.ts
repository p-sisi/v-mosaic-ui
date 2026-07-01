type RadioSize = 'small' | 'default' | 'large';
type __VLS_Props = {
    modelValue?: string | number | boolean;
    disabled?: boolean;
    size?: RadioSize;
    vertical?: boolean;
    textColor?: string;
    fill?: string;
    color?: string;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | number | boolean) => any;
    change: (value: string | number | boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | number | boolean) => any) | undefined;
    onChange?: ((value: string | number | boolean) => any) | undefined;
}>, {
    fill: string;
    size: RadioSize;
    disabled: boolean;
    vertical: boolean;
    textColor: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
