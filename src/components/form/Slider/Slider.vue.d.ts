type __VLS_Props = {
    modelValue?: number | number[];
    min?: number;
    max?: number;
    disabled?: boolean;
    step?: number;
    showInput?: boolean;
    showInputControls?: boolean;
    showStops?: boolean;
    showTooltip?: boolean;
    range?: boolean;
    vertical?: boolean;
    height?: string;
    marks?: Record<number, string>;
    color?: string;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    input: (value: number | number[]) => any;
    "update:modelValue": (value: number | number[]) => any;
    change: (value: number | number[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onInput?: ((value: number | number[]) => any) | undefined;
    "onUpdate:modelValue"?: ((value: number | number[]) => any) | undefined;
    onChange?: ((value: number | number[]) => any) | undefined;
}>, {
    height: string;
    disabled: boolean;
    color: string;
    vertical: boolean;
    max: number;
    modelValue: number | number[];
    min: number;
    range: boolean;
    step: number;
    showInput: boolean;
    showInputControls: boolean;
    showStops: boolean;
    showTooltip: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
