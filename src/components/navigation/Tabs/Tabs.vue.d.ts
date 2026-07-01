type TabType = 'line' | 'card' | 'segment';
type TabPosition = 'top' | 'right' | 'bottom' | 'left';
type __VLS_Props = {
    modelValue?: string | number;
    type?: TabType;
    closable?: boolean;
    addable?: boolean;
    editable?: boolean;
    tabPosition?: TabPosition;
    beforeLeave?: (newName: string | number, oldName: string | number) => boolean | Promise<boolean>;
    stretch?: boolean;
    color?: string;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    "tab-click": (...args: any[]) => void;
    "tab-remove": (...args: any[]) => void;
    "tab-add": (...args: any[]) => void;
    edit: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onTab-click"?: ((...args: any[]) => any) | undefined;
    "onTab-remove"?: ((...args: any[]) => any) | undefined;
    "onTab-add"?: ((...args: any[]) => any) | undefined;
    onEdit?: ((...args: any[]) => any) | undefined;
}>, {
    type: TabType;
    color: string;
    closable: boolean;
    modelValue: string | number;
    addable: boolean;
    editable: boolean;
    tabPosition: TabPosition;
    stretch: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
