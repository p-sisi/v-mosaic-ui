interface TreeNode {
    data: any;
    _level: number;
    _expanded: boolean;
    _checked: boolean;
    _indeterminate: boolean;
    _childNodes: TreeNode[];
    _parent: TreeNode | null;
    _loading: boolean;
    _loaded: boolean;
    isLeaf?: boolean;
}
type __VLS_Props = {
    data?: any[];
    emptyText?: string;
    nodeKey?: string;
    props?: object;
    renderAfterExpand?: boolean;
    lazy?: boolean;
    load?: Function;
    highlightCurrent?: boolean;
    defaultExpandAll?: boolean;
    defaultExpandedKeys?: any[];
    defaultCheckedKeys?: any[];
    currentNodeKey?: string | number;
    filterNodeMethod?: Function;
    accordion?: boolean;
    indent?: number;
    expandOnClickNode?: boolean;
    checkOnClickNode?: boolean;
    showCheckbox?: boolean;
    checkStrictly?: boolean;
    draggable?: boolean;
    allowDrop?: Function;
    allowDrag?: Function;
};
declare var __VLS_1: {
    node: TreeNode;
    data: any;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    filter: (query: string) => any;
    currentChange: (data: any, node: TreeNode) => any;
    nodeClick: (data: any, node: TreeNode, instance: any) => any;
    nodeContextmenu: (event: MouseEvent, data: any, node: TreeNode, instance: any) => any;
    nodeExpand: (data: any, node: TreeNode, instance: any) => any;
    nodeCollapse: (data: any, node: TreeNode, instance: any) => any;
    check: (data: any, checkedInfo: any) => any;
    checkChange: (data: any, checked: boolean, indeterminate: boolean) => any;
    nodeDragStart: (node: TreeNode, event: DragEvent) => any;
    nodeDragEnd: (draggingNode: TreeNode, dropNode: TreeNode, dropType: string, event: DragEvent) => any;
    nodeDragOver: (draggingNode: TreeNode, dropNode: TreeNode, event: DragEvent) => any;
    nodeDragLeave: (draggingNode: TreeNode, dropNode: TreeNode, event: DragEvent) => any;
    nodeDrop: (draggingNode: TreeNode, dropNode: TreeNode, dropType: string, event: DragEvent) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onFilter?: ((query: string) => any) | undefined;
    onCurrentChange?: ((data: any, node: TreeNode) => any) | undefined;
    onNodeClick?: ((data: any, node: TreeNode, instance: any) => any) | undefined;
    onNodeContextmenu?: ((event: MouseEvent, data: any, node: TreeNode, instance: any) => any) | undefined;
    onNodeExpand?: ((data: any, node: TreeNode, instance: any) => any) | undefined;
    onNodeCollapse?: ((data: any, node: TreeNode, instance: any) => any) | undefined;
    onCheck?: ((data: any, checkedInfo: any) => any) | undefined;
    onCheckChange?: ((data: any, checked: boolean, indeterminate: boolean) => any) | undefined;
    onNodeDragStart?: ((node: TreeNode, event: DragEvent) => any) | undefined;
    onNodeDragEnd?: ((draggingNode: TreeNode, dropNode: TreeNode, dropType: string, event: DragEvent) => any) | undefined;
    onNodeDragOver?: ((draggingNode: TreeNode, dropNode: TreeNode, event: DragEvent) => any) | undefined;
    onNodeDragLeave?: ((draggingNode: TreeNode, dropNode: TreeNode, event: DragEvent) => any) | undefined;
    onNodeDrop?: ((draggingNode: TreeNode, dropNode: TreeNode, dropType: string, event: DragEvent) => any) | undefined;
}>, {
    props: object;
    data: any[];
    load: Function;
    draggable: boolean;
    lazy: boolean;
    defaultExpandAll: boolean;
    emptyText: string;
    nodeKey: string;
    renderAfterExpand: boolean;
    highlightCurrent: boolean;
    defaultExpandedKeys: any[];
    defaultCheckedKeys: any[];
    currentNodeKey: string | number;
    filterNodeMethod: Function;
    accordion: boolean;
    indent: number;
    expandOnClickNode: boolean;
    checkOnClickNode: boolean;
    showCheckbox: boolean;
    checkStrictly: boolean;
    allowDrop: Function;
    allowDrag: Function;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
