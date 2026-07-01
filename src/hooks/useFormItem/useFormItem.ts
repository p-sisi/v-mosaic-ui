import { inject, computed, type ComputedRef } from 'vue'

interface FormContext {
  model: Record<string, any>
  rules?: Record<string, any>
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string
  labelSuffix?: string
  inline?: boolean
  disabled?: boolean
  readonly?: boolean
  size?: 'small' | 'default' | 'large'
  showMessage?: boolean
  statusIcon?: boolean
  validateOnRuleChange?: boolean
  addField: (field: any) => void
  removeField: (field: any) => void
  validate?: (trigger?: string, callback?: (isValid: boolean, invalidFields: Record<string, any>) => void) => Promise<boolean>
  resetFields?: () => void
  clearValidate?: (props?: string | string[]) => void
}

interface FormItemContext {
  size?: 'small' | 'default' | 'large'
  disabled?: boolean
  readonly?: boolean
  validateState?: string
  validateMessage?: string
  validate(trigger: string): Promise<void>
  resetField(): void
  clearValidate(): void
}

/** 注入表单和表单项上下文，提供级联的 size、disabled 和 readonly 计算 */
export function useFormItem(
  props: { size?: 'small' | 'default' | 'large'; disabled?: boolean; readonly?: boolean }
): {
  formItem: FormItemContext | undefined
  form: FormContext | undefined
  effectiveSize: ComputedRef<'small' | 'default' | 'large'>
  effectiveDisabled: ComputedRef<boolean>
  effectiveReadonly: ComputedRef<boolean>
} {
  const form = inject<FormContext | undefined>('mForm', undefined)
  const formItem = inject<FormItemContext | undefined>('mFormItem', undefined)

  const effectiveSize = computed(() => {
    return props.size || formItem?.size || form?.size || 'default'
  })

  const effectiveDisabled = computed(() => {
    return props.disabled || formItem?.disabled || form?.disabled || false
  })

  const effectiveReadonly = computed(() => {
    return props.readonly || formItem?.readonly || form?.readonly || false
  })

  return { formItem, form, effectiveSize, effectiveDisabled, effectiveReadonly }
}
