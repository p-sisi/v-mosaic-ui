import { type Ref } from 'vue';
/** 键盘焦点陷阱，Tab 键在容器内循环 */
export declare function useFocusTrap(containerRef: Ref<HTMLElement | null>): {
    activate: () => void;
    deactivate: () => void;
};
