type SpinnerType = 'border' | 'growing' | 'dots';
type SpinnerSize = 'small' | 'default' | 'large';
type __VLS_Props = {
    type?: SpinnerType;
    size?: SpinnerSize;
    color?: string;
    plain?: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    type: SpinnerType;
    size: SpinnerSize;
    plain: boolean;
    color: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
