type TableSize = 'large' | 'default' | 'small';
type __VLS_Props = {
    data?: any[];
    height?: string | number;
    maxHeight?: string | number;
    stripe?: boolean;
    border?: boolean;
    size?: TableSize;
    fit?: boolean;
    showHeader?: boolean;
    highlightCurrentRow?: boolean;
    currentRowKey?: string | number;
    rowClassName?: Function | string;
    rowStyle?: Function | string;
    defaultExpandAll?: boolean;
    emptyText?: string;
};
declare var __VLS_1: {}, __VLS_7: {
    row: any;
    index: number;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    expand?: (props: typeof __VLS_7) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (...args: any[]) => void;
    selectAll: (...args: any[]) => void;
    selectionChange: (...args: any[]) => void;
    cellMouseEnter: (...args: any[]) => void;
    cellMouseLeave: (...args: any[]) => void;
    cellClick: (...args: any[]) => void;
    cellDblclick: (...args: any[]) => void;
    rowClick: (...args: any[]) => void;
    rowContextmenu: (...args: any[]) => void;
    rowDblclick: (...args: any[]) => void;
    headerClick: (...args: any[]) => void;
    sortChange: (...args: any[]) => void;
    currentChange: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSelect?: ((...args: any[]) => any) | undefined;
    onSelectAll?: ((...args: any[]) => any) | undefined;
    onSelectionChange?: ((...args: any[]) => any) | undefined;
    onCellMouseEnter?: ((...args: any[]) => any) | undefined;
    onCellMouseLeave?: ((...args: any[]) => any) | undefined;
    onCellClick?: ((...args: any[]) => any) | undefined;
    onCellDblclick?: ((...args: any[]) => any) | undefined;
    onRowClick?: ((...args: any[]) => any) | undefined;
    onRowContextmenu?: ((...args: any[]) => any) | undefined;
    onRowDblclick?: ((...args: any[]) => any) | undefined;
    onHeaderClick?: ((...args: any[]) => any) | undefined;
    onSortChange?: ((...args: any[]) => any) | undefined;
    onCurrentChange?: ((...args: any[]) => any) | undefined;
}>, {
    size: TableSize;
    height: string | number;
    data: any[];
    fit: boolean;
    border: boolean;
    maxHeight: string | number;
    rowStyle: Function | string;
    stripe: boolean;
    showHeader: boolean;
    highlightCurrentRow: boolean;
    currentRowKey: string | number;
    rowClassName: Function | string;
    defaultExpandAll: boolean;
    emptyText: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
