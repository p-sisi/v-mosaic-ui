import { type Ref } from 'vue';
/** 统一的 teleport 容器管理，用于 Dialog/Drawer/Message/Notification 等需要 append-to-body 的组件 */
export declare function useTeleportTarget(containerId?: string): {
    containerRef: Ref<HTMLElement | null, HTMLElement | null>;
    ensureContainer: () => void;
    removeContainer: () => void;
};
