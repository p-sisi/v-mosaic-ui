type DropdownSize = 'small' | 'default' | 'large';
type DropdownTrigger = 'hover' | 'click';
type __VLS_Props = {
    modelValue?: boolean;
    trigger?: DropdownTrigger;
    type?: string;
    size?: DropdownSize;
    splitButton?: boolean;
    hideOnClick?: boolean;
    placement?: string;
    showTimeout?: number;
    hideTimeout?: number;
    disabled?: boolean;
    color?: string;
};
declare var __VLS_1: {}, __VLS_3: {}, __VLS_9: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
} & {
    dropdown?: (props: typeof __VLS_9) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (event: MouseEvent) => any;
    "update:modelValue": (visible: boolean) => any;
    "visible-change": (visible: boolean) => any;
    command: (command: string | number | object) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((visible: boolean) => any) | undefined;
    "onVisible-change"?: ((visible: boolean) => any) | undefined;
    onCommand?: ((command: string | number | object) => any) | undefined;
}>, {
    type: string;
    size: DropdownSize;
    disabled: boolean;
    color: string;
    placement: string;
    trigger: DropdownTrigger;
    modelValue: boolean;
    splitButton: boolean;
    hideOnClick: boolean;
    showTimeout: number;
    hideTimeout: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
