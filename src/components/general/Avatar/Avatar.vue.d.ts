type AvatarSize = number | 'large' | 'default' | 'small';
type AvatarShape = 'circle' | 'square';
type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
type __VLS_Props = {
    size?: AvatarSize;
    shape?: AvatarShape;
    src?: string;
    alt?: string;
    srcSet?: string;
    fit?: ObjectFit;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (event: Event) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onError?: ((event: Event) => any) | undefined;
}>, {
    size: AvatarSize;
    shape: AvatarShape;
    src: string;
    alt: string;
    srcSet: string;
    fit: ObjectFit;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
