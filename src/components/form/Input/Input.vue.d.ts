type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'textarea';
type InputSize = 'small' | 'default' | 'large';
type __VLS_Props = {
    modelValue?: string | number;
    type?: InputType;
    size?: InputSize;
    width?: string;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    maxlength?: number;
    max?: number;
    min?: number;
    showWordLimit?: boolean;
    showWord?: boolean;
    showWordLimitOutside?: boolean;
    showWordOutside?: boolean;
    rows?: number;
    autosize?: boolean | {
        minRows?: number;
        maxRows?: number;
    };
    minRows?: number;
    maxRows?: number;
};
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    prepend?: (props: typeof __VLS_1) => any;
} & {
    append?: (props: typeof __VLS_3) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    input: (value: string | number) => any;
    focus: (event: FocusEvent) => any;
    "update:modelValue": (value: string | number) => any;
    blur: (event: FocusEvent) => any;
    change: (value: string | number) => any;
    clear: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onInput?: ((value: string | number) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: string | number) => any) | undefined;
    onClear?: (() => any) | undefined;
}>, {
    type: InputType;
    size: InputSize;
    width: string;
    disabled: boolean;
    placeholder: string;
    rows: number;
    modelValue: string | number;
    clearable: boolean;
    showWordLimit: boolean;
    showWord: boolean;
    showWordLimitOutside: boolean;
    showWordOutside: boolean;
    autosize: boolean | {
        minRows?: number;
        maxRows?: number;
    };
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
