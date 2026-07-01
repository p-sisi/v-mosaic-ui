type SwitchSize = 'small' | 'default' | 'large';
type __VLS_Props = {
    modelValue?: boolean | string | number;
    disabled?: boolean;
    width?: number;
    activeText?: string;
    inactiveText?: string;
    activeValue?: boolean | string | number;
    inactiveValue?: boolean | string | number;
    activeColor?: string;
    inactiveColor?: string;
    validateEvent?: boolean;
    loading?: boolean;
    inlinePrompt?: boolean;
    size?: SwitchSize;
    round?: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | number | boolean) => any;
    change: (value: string | number | boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | number | boolean) => any) | undefined;
    onChange?: ((value: string | number | boolean) => any) | undefined;
}>, {
    disabled: boolean;
    loading: boolean;
    modelValue: boolean | string | number;
    activeValue: boolean | string | number;
    inactiveValue: boolean | string | number;
    activeColor: string;
    inactiveColor: string;
    validateEvent: boolean;
    inlinePrompt: boolean;
    size: SwitchSize;
    round: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
