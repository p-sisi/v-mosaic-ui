type __VLS_Props = {
    modelValue?: string;
    fetchSuggestions: (query: string, cb: (results: any[]) => void) => void;
    placeholder?: string;
    disabled?: boolean;
    valueKey?: string;
    debounce?: number;
    placement?: string;
    triggerOnFocus?: boolean;
    selectWhenUnmatched?: boolean;
    hideLoading?: boolean;
    popperClass?: string;
    highlightFirstItem?: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {
    focus: () => void | undefined;
    blur: () => void | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    input: (value: string) => any;
    select: (item: any) => any;
    focus: (event: FocusEvent) => any;
    "update:modelValue": (value: string) => any;
    blur: (event: FocusEvent) => any;
    change: (value: string) => any;
    clear: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onInput?: ((value: string) => any) | undefined;
    onSelect?: ((item: any) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: string) => any) | undefined;
    onClear?: (() => any) | undefined;
}>, {
    disabled: boolean;
    placeholder: string;
    placement: string;
    modelValue: string;
    valueKey: string;
    debounce: number;
    triggerOnFocus: boolean;
    selectWhenUnmatched: boolean;
    hideLoading: boolean;
    highlightFirstItem: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
