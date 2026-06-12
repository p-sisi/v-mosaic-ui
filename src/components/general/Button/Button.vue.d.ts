type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
type ButtonSize = 'small' | 'default' | 'large';
type __VLS_Props = {
    type?: ButtonType;
    size?: ButtonSize;
    width?: string;
    height?: string;
    round?: boolean;
    circle?: boolean;
    disabled?: boolean;
    loading?: boolean;
    plain?: boolean;
    noBorder?: boolean;
    text?: boolean;
    color?: string;
    textPlain?: boolean;
    dash?: boolean;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (event: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
}>, {
    type: ButtonType;
    size: ButtonSize;
    width: string;
    height: string;
    round: boolean;
    circle: boolean;
    disabled: boolean;
    loading: boolean;
    plain: boolean;
    noBorder: boolean;
    text: boolean;
    color: string;
    textPlain: boolean;
    dash: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
