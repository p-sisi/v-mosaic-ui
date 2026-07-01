type DescriptionsSize = 'large' | 'default' | 'small';
type DescriptionsDirection = 'horizontal' | 'vertical';
type __VLS_Props = {
    title?: string;
    size?: DescriptionsSize;
    bordered?: boolean;
    column?: number;
    direction?: DescriptionsDirection;
    extra?: string;
    colon?: boolean;
    labelClassName?: string;
    contentClassName?: string;
    labelStyle?: object | string;
    contentStyle?: object | string;
};
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    title?: (props: typeof __VLS_3) => any;
} & {
    extra?: (props: typeof __VLS_5) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    size: DescriptionsSize;
    title: string;
    direction: DescriptionsDirection;
    extra: string;
    labelStyle: object | string;
    labelClassName: string;
    bordered: boolean;
    column: number;
    colon: boolean;
    contentClassName: string;
    contentStyle: object | string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
