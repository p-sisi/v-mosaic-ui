type ItemAlign = 'left' | 'center' | 'right';
type __VLS_Props = {
    label?: string;
    span?: number;
    labelClassName?: string;
    contentClassName?: string;
    labelStyle?: object | string;
    contentStyle?: object | string;
    align?: ItemAlign;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    label: string;
    span: number;
    labelStyle: object | string;
    align: ItemAlign;
    labelClassName: string;
    contentClassName: string;
    contentStyle: object | string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
