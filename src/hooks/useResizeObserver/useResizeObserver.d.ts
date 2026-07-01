import { type Ref } from 'vue';
/** 监听元素尺寸变化 */
export declare function useResizeObserver(target: Ref<HTMLElement | null>, callback: (entry: ResizeObserverEntry) => void): {
    /** 手动停止观察 */
    stop: () => void;
};
