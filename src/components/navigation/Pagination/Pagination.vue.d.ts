type __VLS_Props = {
    small?: boolean;
    pageSize?: number;
    total?: number;
    pageCount?: number;
    pagerCount?: number;
    currentPage?: number;
    layout?: string;
    pageSizes?: number[];
    prevText?: string;
    nextText?: string;
    background?: boolean;
    disabled?: boolean;
    hideOnSinglePage?: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:currentPage": (page: number) => any;
    "update:pageSize": (size: number) => any;
    "current-change": (newPage: number, oldPage: number) => any;
    "size-change": (size: number) => any;
    "prev-click": (page: number) => any;
    "next-click": (page: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:currentPage"?: ((page: number) => any) | undefined;
    "onUpdate:pageSize"?: ((size: number) => any) | undefined;
    "onCurrent-change"?: ((newPage: number, oldPage: number) => any) | undefined;
    "onSize-change"?: ((size: number) => any) | undefined;
    "onPrev-click"?: ((page: number) => any) | undefined;
    "onNext-click"?: ((page: number) => any) | undefined;
}>, {
    small: boolean;
    disabled: boolean;
    background: boolean;
    pageSize: number;
    total: number;
    pageCount: number;
    pagerCount: number;
    currentPage: number;
    layout: string;
    pageSizes: number[];
    prevText: string;
    nextText: string;
    hideOnSinglePage: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
