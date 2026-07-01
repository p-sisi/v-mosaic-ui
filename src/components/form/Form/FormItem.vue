<template>
  <div ref="rootRef" :class="classes">
    <label
      v-if="label || form?.labelPosition !== 'top'"
      ref="labelRef"
      :class="labelClasses"
      :style="labelStyle"
    >
      <span v-if="isRequired && !form?.hideRequiredAsterisk" class="m-form-item__required">*</span>
      {{ currentLabel }}
      <MPopover v-if="info" :content="info" trigger="hover" placement="top" :width="200">
        <span class="m-form-item__info">
          <InfoIcon :size="18" />
        </span>
      </MPopover>
    </label>
    <div class="m-form-item__content" @focusout="handleBlur" @change="handleChange">
      <slot />
      <transition name="m-form-item-error">
        <div v-if="showErrorMessage" class="m-form-item__error">{{ validateMessage }}</div>
      </transition>
      <div v-if="inlineMessage" class="m-form-item__inline-message">{{ inlineMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, watch, reactive, nextTick } from 'vue'
import { useEmitter } from '../../../hooks/useEmitter'
import MTooltip from '../../feedback/Tooltip/Tooltip.vue'
import MPopover from '../../feedback/Popover/Popover.vue'
import InfoIcon from '../../../icons/InfoIcon.vue'

defineOptions({ name: 'MFormItem' })

type ValidateStatus = '' | 'validating' | 'success' | 'error'
type FormSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  label?: string                    // 标签文本
  labelWidth?: string               // 标签宽度，如 '100px'
  prop?: string                     // 字段属性名，对应 model 中的键
  required?: boolean                // 是否必填
  rules?: object | any[]            // 校验规则
  error?: string                    // 错误信息
  validateStatus?: ValidateStatus   // 校验状态
  showMessage?: boolean             // 是否显示校验错误信息
  inlineMessage?: string            // 行内错误信息
  size?: FormSize                   // 表单项尺寸
  readonly?: boolean                // 是否只读表单项
  info?: string                     // 标签提示信息，hover 图标时气泡展示
}>(), {
  showMessage: true,
})

const emit = defineEmits<{
  'update:validateStatus': [status: ValidateStatus]  // 更新校验状态
}>()

const form = inject<any>('mForm', undefined)

const { dispatch } = useEmitter()

const rootRef = ref<HTMLElement>()
const labelRef = ref<HTMLElement>()
const validateState = ref<ValidateStatus>('')
const validateMessage = ref('')
const validateDisabled = ref(false)

const currentSize = computed(() => props.size || form?.size || 'default')
const currentDisabled = computed(() => form?.disabled || false)
const currentShowMessage = computed(() => props.showMessage !== undefined ? props.showMessage : form?.showMessage !== undefined ? form?.showMessage : true)

const currentLabel = computed(() => {
  const suffix = form?.labelSuffix || ''
  return (props.label || '') + suffix
})

const currentLabelWidth = computed(() => {
  const w = props.labelWidth || form?.labelWidth || '80px'
  if (w === 'auto') {
    return form?.autoLabelWidth ? `${form.autoLabelWidth}px` : 'auto'
  }
  return w
})

const labelStyle = computed(() => {
  if (form?.labelPosition === 'top') return {}
  const w = currentLabelWidth.value
  if (w === 'auto') return {}
  return { width: w }
})

const isRequired = computed(() => {
  if (props.required === true) return true

  const formRules = form?.rules
  if (formRules && props.prop) {
    const raw = formRules[props.prop]
    const rules = Array.isArray(raw) ? raw : [raw]
    if (rules.some((r: any) => r?.required)) return true
  }

  if (props.rules) {
    const rules = Array.isArray(props.rules) ? props.rules : [props.rules]
    if (rules.some((r: any) => r?.required)) return true
  }

  return false
})

function getRules(): any[] {
  const formRules = form?.rules
  const selfRules = props.rules

  let requiredRule: any[] = []
  if (props.required === true) {
    requiredRule = [{ required: true }]
  }

  let propRules: any[] = []
  if (formRules && props.prop) {
    propRules = (Array.isArray(formRules[props.prop]) ? formRules[props.prop] : [formRules[props.prop]]) as any[]
  }

  let selfRuleList: any[] = []
  if (selfRules) {
    selfRuleList = Array.isArray(selfRules) ? selfRules : [selfRules]
  }

  return [...requiredRule, ...propRules, ...selfRuleList].filter((r) => r)
}

function getFilteredRules(trigger: string): any[] {
  const rules = getRules()
  if (!trigger) return rules
  return rules.filter((rule: any) => {
    if (!rule.trigger || !trigger) return true
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.indexOf(trigger) > -1
    }
    return rule.trigger === trigger
  })
}

function validate(trigger: string = '', callback?: (message: string, field: any) => void): Promise<void> {
  const rules = getFilteredRules(trigger)
  if (!rules || !rules.length) {
    if (callback) callback('', props)
    return Promise.resolve()
  }

  validateState.value = 'validating'
  emit('update:validateStatus', 'validating')

  const prop = props.prop || ''
  const model = form?.model
  const value = model && prop ? model[prop] : undefined

  let promise: Promise<void> | undefined
  if (typeof callback !== 'function') {
    promise = new Promise((resolve, reject) => {
      callback = (message, field) => {
        if (message) {
          reject({ [prop]: message })
        } else {
          resolve()
        }
      }
    })
  }

  let count = 0
  let hasError = false

  rules.forEach((rule: any) => {
    const result = rule.validator ? rule.validator(value, rule, (err?: string) => {
      count++
      if (err) {
        hasError = true
        validateMessage.value = err
        validateState.value = 'error'
        emit('update:validateStatus', 'error')
      } else if (count === rules.length && !hasError) {
        validateMessage.value = ''
        validateState.value = 'success'
        emit('update:validateStatus', 'success')
      }
      if (callback) callback(err || '', props)
    }) : (() => {
      count++
      let isValid = true
      let message = ''

      if (rule.required && (value === undefined || value === '' || value === null)) {
        isValid = false
        message = rule.message || `${prop} is required`
      } else if (isValid && rule.min != null && typeof value === 'string' && value.length < rule.min) {
        isValid = false
        message = rule.message || `${prop} 长度不能少于 ${rule.min} 个字符`
      } else if (isValid && rule.max != null && typeof value === 'string' && value.length > rule.max) {
        isValid = false
        message = rule.message || `${prop} 长度不能超过 ${rule.max} 个字符`
      } else if (isValid && rule.pattern && !new RegExp(rule.pattern).test(String(value))) {
        isValid = false
        message = rule.message || `${prop} 格式不正确`
      }

      if (!isValid) {
        hasError = true
        validateMessage.value = message
        validateState.value = 'error'
        emit('update:validateStatus', 'error')
      } else if (count === rules.length && !hasError) {
        validateMessage.value = ''
        validateState.value = 'success'
        emit('update:validateStatus', 'success')
      }
      if (callback) callback(isValid ? '' : validateMessage.value, props)
    })()
  })

  if (!rules.length) {
    validateState.value = ''
    validateMessage.value = ''
    emit('update:validateStatus', '')
  }

  return promise || Promise.resolve()
}

function resetField() {
  const model = form?.model
  const prop = props.prop
  if (model && prop) {
    model[prop] = undefined
  }
  validateState.value = ''
  validateMessage.value = ''
  emit('update:validateStatus', '')
}

function clearValidate() {
  validateState.value = ''
  validateMessage.value = ''
  emit('update:validateStatus', '')
}

const showErrorMessage = computed(() => {
  if (!currentShowMessage.value) return false
  return validateState.value === 'error' && validateMessage.value
})

function handleBlur() {
  const rules = getRules()
  if (!rules || !rules.length) return
  validate('blur')
}

function handleChange() {
  const rules = getRules()
  if (!rules || !rules.length) return
  validate('change')
}

const classes = computed(() => [
  'm-form-item',
  `m-form-item--${currentSize.value}`,
  {
    'm-form-item--error': validateState.value === 'error',
    'm-form-item--validating': validateState.value === 'validating',
    'm-form-item--success': validateState.value === 'success',
    'm-form-item--required': isRequired.value,
    'm-form-item--no-label': !props.label && form?.labelPosition !== 'top',
  },
])

const labelClasses = computed(() => [
  'm-form-item__label',
  {
    'm-form-item__label--top': form?.labelPosition === 'top',
  },
])

/** 测量并注册 label 自然宽度（label-width="auto" 时使用） */
function measureLabelWidth() {
  const w = props.labelWidth || form?.labelWidth
  if (w !== 'auto' || !labelRef.value || form?.labelPosition === 'top') return
  const el = labelRef.value
  const oldWidth = el.style.width
  el.style.width = 'auto'
  const naturalWidth = el.offsetWidth
  el.style.width = oldWidth
  form?.registerLabelWidth?.(props.prop || props.label || '', naturalWidth)
}

onMounted(() => {
  measureLabelWidth()
  if (props.prop) {
    form?.addField?.({
      prop: props.prop,
      validate,
      resetField,
      clearValidate,
      size: currentSize.value,
      disabled: currentDisabled.value,
      el: rootRef.value,
    })
  }
  dispatch('MForm', 'addField', {
    prop: props.prop,
    validate,
    resetField,
    clearValidate,
  })
})

onUnmounted(() => {
  form?.deregisterLabelWidth?.(props.prop || props.label || '')
  form?.removeField?.({
    prop: props.prop,
    validate,
    resetField,
    clearValidate,
  })
  dispatch('MForm', 'removeField', {
    prop: props.prop,
  })
})

watch(() => props.label, () => {
  nextTick(measureLabelWidth)
})
watch(() => form?.labelSuffix, () => {
  nextTick(measureLabelWidth)
})

watch(() => props.error, (val) => {
  validateMessage.value = val ?? ''
  validateState.value = val ? 'error' : ''
  emit('update:validateStatus', validateState.value)
}, { immediate: true })

watch(() => props.validateStatus, (val) => {
  validateState.value = val || ''
})

defineExpose({
  validate,
  resetField,
  clearValidate,
  validateState,
  validateMessage,
})
</script>

<style lang="scss">
.m-form-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 18px;
  font-size: var(--mosaic-font-size);

  &--small {
    font-size: var(--mosaic-font-size-sm);

    & .m-form-item__label {
      line-height: 24px;
      font-size: var(--mosaic-font-size-sm);
    }

    & .m-form-item__content {
      line-height: 24px;
    }
  }

  &--large {
    font-size: var(--mosaic-font-size-lg);

    & .m-form-item__label {
      line-height: 40px;
      font-size: var(--mosaic-font-size-lg);
    }

    & .m-form-item__content {
      line-height: 40px;
    }
  }

  &__label {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 12px;
    box-sizing: border-box;
    color: var(--mosaic-text-regular);
    font-size: var(--mosaic-font-size);
    line-height: 32px;
    flex-shrink: 0;

    &--top {
      justify-content: flex-start;
      padding-right: 0;
    }
  }

  &__required {
    color: var(--mosaic-danger);
    margin-right: 4px;
  }

  &__info {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    color: var(--mosaic-text-secondary);
    line-height: 1;
    cursor: help;
    user-select: none;
    transition: color 0.2s;

    &:hover {
      color: var(--mosaic-primary);
    }
  }

  &__content {
    flex: 1;
    position: relative;
    line-height: 32px;
  }

  &__error {
    color: var(--mosaic-danger);
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }

  &__inline-message {
    color: var(--mosaic-danger);
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
  }

  &--error &__content {
    color: var(--mosaic-danger);
  }

  &--validating &__content::after {
    content: '';
  }

  &--no-label &__content {
    margin-left: 0;
  }
}

.m-form-item-error-enter-active,
.m-form-item-error-leave-active {
  transition: opacity 0.2s;
}

.m-form-item-error-enter-from,
.m-form-item-error-leave-to {
  opacity: 0;
}
</style>