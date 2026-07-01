type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
type ImageLoading = 'lazy' | 'eager';
type __VLS_Props = {
    src?: string;
    alt?: string;
    fit?: ImageFit;
    lazy?: boolean;
    previewSrcList?: string[];
    initialIndex?: number;
    zindex?: number;
    loading?: ImageLoading;
};
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    placeholder?: (props: typeof __VLS_1) => any;
} & {
    error?: (props: typeof __VLS_3) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (event: Event) => any;
    load: (event: Event) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onError?: ((event: Event) => any) | undefined;
    onLoad?: ((event: Event) => any) | undefined;
}>, {
    loading: ImageLoading;
    src: string;
    alt: string;
    fit: ImageFit;
    lazy: boolean;
    previewSrcList: string[];
    initialIndex: number;
    zindex: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
