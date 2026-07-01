type LabelPosition = 'left' | 'right' | 'top';
type FormSize = 'small' | 'default' | 'large';
type __VLS_Props = {
    model: Record<string, any>;
    rules?: Record<string, any>;
    labelPosition?: LabelPosition;
    labelWidth?: string;
    labelSuffix?: string;
    inline?: boolean;
    disabled?: boolean;
    size?: FormSize;
    showMessage?: boolean;
    statusIcon?: boolean;
    validateOnRuleChange?: boolean;
    hideRequiredAsterisk?: boolean;
};
/** 校验指定字段 */
declare function validate(callback?: (isValid: boolean, invalidFields: Record<string, any>) => void): Promise<boolean>;
/** 重置所有字段 */
declare function resetFields(): void;
/** 清除所有校验结果 */
declare function clearValidate(props?: string | string[]): void;
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
    validate: typeof validate;
    resetFields: typeof resetFields;
    clearValidate: typeof clearValidate;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    validate: (prop: string, isValid: boolean, message: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onValidate?: ((prop: string, isValid: boolean, message: string) => any) | undefined;
}>, {
    size: FormSize;
    disabled: boolean;
    labelPosition: LabelPosition;
    labelWidth: string;
    labelSuffix: string;
    inline: boolean;
    showMessage: boolean;
    statusIcon: boolean;
    validateOnRuleChange: boolean;
    hideRequiredAsterisk: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
