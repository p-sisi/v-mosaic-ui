type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type TagSize = 'small' | 'default' | 'large';
type TagEffect = 'dark' | 'light' | 'plain';
type __VLS_Props = {
    type?: TagType;
    closable?: boolean;
    disableTransitions?: boolean;
    noBorder?: boolean;
    color?: string;
    size?: TagSize;
    effect?: TagEffect;
};
declare var __VLS_5: {}, __VLS_7: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_5) => any;
} & {
    default?: (props: typeof __VLS_7) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (event: MouseEvent) => any;
    close: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
    onClose?: (() => any) | undefined;
}>, {
    type: TagType;
    size: TagSize;
    noBorder: boolean;
    color: string;
    closable: boolean;
    disableTransitions: boolean;
    effect: TagEffect;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
