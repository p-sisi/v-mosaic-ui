type MenuMode = 'vertical' | 'horizontal';
type __VLS_Props = {
    defaultActive?: string;
    defaultOpeneds?: string[];
    mode?: MenuMode;
    collapse?: boolean;
    backgroundColor?: string;
    textColor?: string;
    activeTextColor?: string;
    uniqueOpened?: boolean;
    router?: boolean;
    collapseTransition?: boolean;
    color?: string;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (index: string, indexPath: string[], item: any, routeResult?: any) => any;
    close: (index: string, indexPath: string[]) => any;
    open: (index: string, indexPath: string[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSelect?: ((index: string, indexPath: string[], item: any, routeResult?: any) => any) | undefined;
    onClose?: ((index: string, indexPath: string[]) => any) | undefined;
    onOpen?: ((index: string, indexPath: string[]) => any) | undefined;
}>, {
    color: string;
    mode: MenuMode;
    backgroundColor: string;
    textColor: string;
    defaultActive: string;
    defaultOpeneds: string[];
    collapse: boolean;
    activeTextColor: string;
    uniqueOpened: boolean;
    router: boolean;
    collapseTransition: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
