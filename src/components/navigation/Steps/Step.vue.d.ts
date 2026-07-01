type StepStatus = 'wait' | 'process' | 'finish' | 'error' | 'success';
type __VLS_Props = {
    title?: string;
    description?: string;
    status?: StepStatus;
    disabled?: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    disabled: boolean;
    title: string;
    description: string;
    status: StepStatus;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
