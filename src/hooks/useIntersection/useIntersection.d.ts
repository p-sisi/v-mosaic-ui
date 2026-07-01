import { type Ref } from 'vue';
export interface UseIntersectionOptions {
    /** 目标元素与视口交叉的比例阈值 */
    threshold?: number;
    /** 根元素边距 */
    rootMargin?: string;
    /** 根元素 */
    root?: Element | null;
}
/** IntersectionObserver 封装，用于懒加载、滚动检测等 */
export declare function useIntersection(target: Ref<HTMLElement | null>, callback: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void, options?: UseIntersectionOptions): {
    stop: () => void;
};
