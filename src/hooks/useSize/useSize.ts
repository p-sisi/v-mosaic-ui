import { inject, computed, type ComputedRef } from 'vue'

/** 解析有效尺寸：本地 prop > 表单注入 > 默认值 */
export function useSize(
  props: { size?: 'small' | 'default' | 'large' }
): { effectiveSize: ComputedRef<'small' | 'default' | 'large'> } {
  const formSize = inject<'small' | 'default' | 'large' | undefined>('mFormSize', undefined)

  const effectiveSize = computed(() => {
    return props.size || formSize || 'default'
  })

  return { effectiveSize }
}
