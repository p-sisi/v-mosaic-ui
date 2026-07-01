type __VLS_Props = {
    index?: string;
    popperClass?: string;
    showTimeout?: number;
    hideTimeout?: number;
    disabled?: boolean;
};
declare var __VLS_1: {}, __VLS_7: {}, __VLS_17: {};
type __VLS_Slots = {} & {
    title?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_7) => any;
} & {
    default?: (props: typeof __VLS_17) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    disabled: boolean;
    popperClass: string;
    index: string;
    showTimeout: number;
    hideTimeout: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
