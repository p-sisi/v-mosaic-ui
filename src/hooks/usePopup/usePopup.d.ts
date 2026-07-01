import { type Ref } from 'vue';
export interface UsePopupOptions {
    /** 是否显示遮罩层 */
    modal?: boolean;
    /** 点击遮罩层是否关闭 */
    closeOnClickModal?: boolean;
    /** 按 ESC 是否关闭 */
    closeOnPressEscape?: boolean;
    /** 是否锁定滚动 */
    lockScroll?: boolean;
    /** 打开前回调，返回 false 可阻止打开 */
    beforeClose?: () => boolean | Promise<boolean>;
}
/** 模态弹窗生命周期管理：遮罩层、z-index、滚动锁定 */
export declare function usePopup(visible: Ref<boolean>, options?: UsePopupOptions): {
    zIndex: Ref<number, number>;
    open: () => void;
    close: () => Promise<void>;
    onModalClick: () => void;
};
