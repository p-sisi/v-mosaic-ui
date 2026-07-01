type CarouselTrigger = 'click' | 'hover';
type IndicatorPosition = 'outside' | 'inside' | 'none';
type ArrowVisibility = 'always' | 'hover' | 'never';
type CarouselType = 'default' | 'card';
type CarouselDirection = 'horizontal' | 'vertical';
type __VLS_Props = {
    modelValue?: number;
    height?: string;
    initialIndex?: number;
    trigger?: CarouselTrigger;
    autoplay?: boolean;
    interval?: number;
    indicatorPosition?: IndicatorPosition;
    arrow?: ArrowVisibility;
    type?: CarouselType;
    loop?: boolean;
    direction?: CarouselDirection;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: number) => any;
    change: (current: number, prev: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    onChange?: ((current: number, prev: number) => any) | undefined;
}>, {
    type: CarouselType;
    height: string;
    direction: CarouselDirection;
    trigger: CarouselTrigger;
    modelValue: number;
    initialIndex: number;
    autoplay: boolean;
    interval: number;
    indicatorPosition: IndicatorPosition;
    arrow: ArrowVisibility;
    loop: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
