import { type Ref } from 'vue';
import { type Placement } from '@floating-ui/dom';
export interface UsePopperOptions {
    /** 弹出层位置 */
    placement?: Placement;
    /** 偏移量 */
    offset?: number;
    /** 是否显示箭头 */
    showArrow?: boolean;
    /** 触发方式 */
    trigger?: 'hover' | 'click' | 'focus' | 'manual';
    /** 弹出延迟(ms) */
    showAfter?: number;
    /** 隐藏延迟(ms) */
    hideAfter?: number;
    /** 弹出层类名 */
    popperClass?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 鼠标是否可进入弹出层 */
    enterable?: boolean;
    /** 自动消失时间(ms)，0 表示不自动消失 */
    autoDismiss?: number;
}
/** 基于 @floating-ui/dom 的弹出定位 composable */
export declare function usePopper(referenceRef: Ref<HTMLElement | null>, popperRef: Ref<HTMLElement | null>, arrowRef: Ref<HTMLElement | null>, options?: UsePopperOptions): {
    visible: Ref<boolean, boolean>;
    show: () => void;
    hide: () => void;
    toggle: () => void;
    updatePosition: () => Promise<void>;
    onReferenceMouseEnter: () => void;
    onReferenceMouseLeave: () => void;
    onPopperMouseEnter: () => void;
    onPopperMouseLeave: () => void;
    onReferenceClick: () => void;
    onReferenceFocus: () => void;
    onReferenceBlur: () => void;
};
