import { type ComputedRef } from 'vue';
/** 解析有效尺寸：本地 prop > 表单注入 > 默认值 */
export declare function useSize(props: {
    size?: 'small' | 'default' | 'large';
}): {
    effectiveSize: ComputedRef<'small' | 'default' | 'large'>;
};
