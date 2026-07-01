type ValidateStatus = '' | 'validating' | 'success' | 'error';
type FormSize = 'small' | 'default' | 'large';
type __VLS_Props = {
    label?: string;
    labelWidth?: string;
    prop?: string;
    required?: boolean;
    rules?: object | any[];
    error?: string;
    validateStatus?: ValidateStatus;
    showMessage?: boolean;
    inlineMessage?: string;
    size?: FormSize;
};
declare function validate(trigger: string, callback?: (message: string, field: any) => void): Promise<void>;
declare function resetField(): void;
declare function clearValidate(): void;
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
    validate: typeof validate;
    resetField: typeof resetField;
    clearValidate: typeof clearValidate;
    validateState: import("vue").Ref<ValidateStatus, ValidateStatus>;
    validateMessage: import("vue").Ref<string, string>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:validateStatus": (status: ValidateStatus) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:validateStatus"?: ((status: ValidateStatus) => any) | undefined;
}>, {
    showMessage: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
