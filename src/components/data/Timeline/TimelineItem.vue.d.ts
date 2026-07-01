type TimelineItemType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | '';
type TimelineItemPlacement = 'top' | 'bottom';
type TimelineItemSize = 'normal' | 'large';
type __VLS_Props = {
    timestamp?: string;
    placement?: TimelineItemPlacement;
    type?: TimelineItemType;
    color?: string;
    size?: TimelineItemSize;
    hollow?: boolean;
};
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    dot?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    type: TimelineItemType;
    size: TimelineItemSize;
    color: string;
    placement: TimelineItemPlacement;
    timestamp: string;
    hollow: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
