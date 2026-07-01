type StepDirection = 'horizontal' | 'vertical';
type StepProcessStatus = 'process' | 'wait' | 'success' | 'error' | 'finish';
type StepFinishStatus = 'wait' | 'success' | 'error' | 'finish';
type __VLS_Props = {
    space?: number | string;
    active?: number;
    direction?: StepDirection;
    alignCenter?: boolean;
    simple?: boolean;
    processStatus?: StepProcessStatus;
    finishStatus?: StepFinishStatus;
};
declare function setActive(index: number): void;
declare function prev(): void;
declare function next(): void;
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
    prev: typeof prev;
    next: typeof next;
    setActive: typeof setActive;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (newIndex: number, oldIndex: number) => any;
    "update:active": (active: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onChange?: ((newIndex: number, oldIndex: number) => any) | undefined;
    "onUpdate:active"?: ((active: number) => any) | undefined;
}>, {
    direction: StepDirection;
    space: number | string;
    active: number;
    alignCenter: boolean;
    simple: boolean;
    processStatus: StepProcessStatus;
    finishStatus: StepFinishStatus;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
