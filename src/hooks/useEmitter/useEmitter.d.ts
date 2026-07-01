/** Vue 3 替代 Element 的 emitter mixin，使用 provide/inject + 自定义事件实现组件间通信 */
export declare function useEmitter(): {
    dispatch: (componentName: string, eventName: string, params?: unknown) => void;
    broadcast: (componentName: string, eventName: string, params?: unknown) => void;
};
