/** 锁定/解锁 body 滚动，并补偿滚动条宽度避免页面抖动 */
export declare function useLockScroll(): {
    lock: () => void;
    unlock: () => void;
};
