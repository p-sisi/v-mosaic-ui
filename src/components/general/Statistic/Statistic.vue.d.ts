type __VLS_Props = {
    title?: string;
    value?: number | string;
    precision?: number;
    prefix?: string;
    suffix?: string;
    info?: string;
    separator?: boolean;
};
declare var __VLS_1: {}, __VLS_6: {}, __VLS_8: {};
type __VLS_Slots = {} & {
    title?: (props: typeof __VLS_1) => any;
} & {
    prefix?: (props: typeof __VLS_6) => any;
} & {
    suffix?: (props: typeof __VLS_8) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    info: string;
    title: string;
    value: number | string;
    precision: number;
    prefix: string;
    suffix: string;
    separator: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
