type InputNumberSize = 'small' | 'default' | 'large';
type __VLS_Props = {
    modelValue?: number | string;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    size?: InputNumberSize;
    disabled?: boolean;
    controls?: boolean;
    controlsPosition?: 'right' | undefined;
    placeholder?: string;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {
    focus: () => void | undefined;
    blur: () => void | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    focus: (event: FocusEvent) => any;
    "update:modelValue": (value: string | number) => any;
    blur: (event: FocusEvent) => any;
    change: (currentValue: number, oldValue: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onFocus?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((currentValue: number, oldValue: number) => any) | undefined;
}>, {
    size: InputNumberSize;
    disabled: boolean;
    max: number;
    modelValue: number | string;
    min: number;
    step: number;
    controls: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
