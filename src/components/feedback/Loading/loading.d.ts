import type { Directive } from 'vue';
/** v-loading 指令绑定选项 */
interface LoadingBindingOptions {
    text?: string;
    background?: string;
    customClass?: string;
}
/** v-loading 指令：为目标元素添加加载遮罩 */
export declare const vLoading: Directive<HTMLElement, boolean | LoadingBindingOptions>;
export default vLoading;
