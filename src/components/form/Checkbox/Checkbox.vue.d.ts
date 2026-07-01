type CheckboxSize = 'small' | 'default' | 'large';
type __VLS_Props = {
    modelValue?: boolean | (string | number | boolean)[];
    label?: string | number | boolean;
    checkedValue?: string | number;
    uncheckedValue?: string | number;
    disabled?: boolean;
    border?: boolean;
    size?: CheckboxSize;
    name?: string;
    checked?: boolean;
    indeterminate?: boolean;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    disabled: boolean;
    border: boolean;
    indeterminate: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
