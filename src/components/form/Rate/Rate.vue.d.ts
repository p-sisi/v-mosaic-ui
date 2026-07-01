type __VLS_Props = {
    modelValue?: number;
    max?: number;
    disabled?: boolean;
    allowHalf?: boolean;
    showScore?: boolean;
    showText?: boolean;
    textColor?: string;
    texts?: string[];
    colors?: string[];
    scoreTemplate?: string;
    size?: number;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: number) => any;
    change: (value: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    onChange?: ((value: number) => any) | undefined;
}>, {
    size: number;
    disabled: boolean;
    max: number;
    modelValue: number;
    textColor: string;
    allowHalf: boolean;
    showScore: boolean;
    showText: boolean;
    texts: string[];
    colors: string[];
    scoreTemplate: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
