type ProgressType = 'line' | 'circle' | 'dashboard';
type ProgressStatus = 'success' | 'exception' | 'warning' | '';
type StrokeLinecap = 'butt' | 'round' | 'square';
type __VLS_Props = {
    percentage?: number;
    type?: ProgressType;
    status?: ProgressStatus;
    strokeWidth?: number;
    strokeLinecap?: StrokeLinecap;
    textInside?: boolean;
    width?: number;
    showText?: boolean;
    color?: string | string[] | ((percentage: number) => string);
    format?: (percentage: number) => string;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    type: ProgressType;
    width: number;
    status: ProgressStatus;
    showText: boolean;
    percentage: number;
    strokeWidth: number;
    strokeLinecap: StrokeLinecap;
    textInside: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
