/** Loading 服务选项 */
interface LoadingServiceOptions {
    target?: HTMLElement | string;
    text?: string;
    background?: string;
    fullscreen?: boolean;
    lock?: boolean;
    customClass?: string;
}
/** Loading 实例处理器 */
interface LoadingHandler {
    close: () => void;
}
/** 创建 loading 遮罩 DOM 并挂载 */
export declare function LoadingService(options?: LoadingServiceOptions): LoadingHandler;
export declare namespace LoadingService {
    var service: typeof LoadingService;
}
export default LoadingService;
