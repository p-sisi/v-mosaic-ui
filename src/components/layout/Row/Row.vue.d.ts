type RowType = 'flex' | undefined;
type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
type RowAlign = 'top' | 'middle' | 'bottom';
type __VLS_Props = {
    gutter?: number;
    type?: RowType;
    justify?: RowJustify;
    align?: RowAlign;
    tag?: string;
};
declare var __VLS_6: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_6) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    type: "flex";
    gutter: number;
    justify: RowJustify;
    align: RowAlign;
    tag: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
