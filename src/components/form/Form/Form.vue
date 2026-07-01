<template>
  <form class="m-form" :class="classes" @submit.prevent>
    <slot />
    <div v-if="$slots.footer" class="m-form__footer">
      <slot name="footer" />
    </div>
    <div v-else-if="submit || reset" class="m-form__footer m-form__footer--default">
      <MButton v-if="reset" @click="handleResetClick">重置</MButton>
      <MButton v-if="submit" type="primary" @click="handleSubmitClick">提交</MButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { provide, reactive, ref, computed, onUnmounted, watch } from 'vue'
import MButton from '../../general/Button/Button.vue'

defineOptions({ name: 'MForm' })

type LabelPosition = 'left' | 'right' | 'top'
type FormSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  model: Record<string, any>      // 表单数据对象，必填
  rules?: Record<string, any>     // 表单验证规则
  labelPosition?: LabelPosition   // 表单项标签的位置
  labelWidth?: string             // 表单项标签的宽度，如 '80px'
  labelSuffix?: string            // 表单项标签的后缀文本
  inline?: boolean                // 是否为行内表单
  disabled?: boolean              // 是否禁用整个表单
  readonly?: boolean              // 是否只读整个表单
  size?: FormSize                 // 表单尺寸，用于控制表单项的尺寸
  showMessage?: boolean           // 是否显示校验错误信息
  statusIcon?: boolean            // 是否在表单项校验状态后显示图标
  validateOnRuleChange?: boolean  // 是否在 rules 改变后立即触发校验
  hideRequiredAsterisk?: boolean  // 是否隐藏必填标记星号
  scrollToError?: boolean         // 校验失败时是否滚动到第一个错误表单项
  submit?: () => void             // 提交按钮回调（footer 插槽未使用时生效）
  reset?: () => void              // 重置按钮回调（footer 插槽未使用时生效）
}>(), {
  labelPosition: 'right',
  labelWidth: '80px',
  labelSuffix: '',
  inline: false,
  disabled: false,
  readonly: false,
  size: 'default',
  showMessage: true,
  statusIcon: false,
  validateOnRuleChange: true,
  hideRequiredAsterisk: false,
  scrollToError: false,
})

const emit = defineEmits<{
  validate: [prop: string, isValid: boolean, message: string]  // 校验完成后触发
}>()

const fields: any[] = []

function addField(field: any) {
  fields.push(field)
}

function removeField(field: any) {
  const index = fields.indexOf(field)
  if (index !== -1) fields.splice(index, 1)
}

/** label-width="auto" 时的宽度收集 */
const labelWidths = reactive<Record<string, number>>({})
const autoLabelWidth = computed(() => {
  const widths = Object.values(labelWidths)
  return widths.length ? Math.max(...widths) : 0
})

function registerLabelWidth(key: string, width: number) {
  if (key) labelWidths[key] = width
}

function deregisterLabelWidth(key: string) {
  delete labelWidths[key]
}

const formContext = reactive({
  model: props.model,
  rules: props.rules,
  labelPosition: props.labelPosition,
  labelWidth: props.labelWidth,
  labelSuffix: props.labelSuffix,
  inline: props.inline,
  disabled: props.disabled,
  readonly: props.readonly,
  size: props.size,
  showMessage: props.showMessage,
  statusIcon: props.statusIcon,
  hideRequiredAsterisk: props.hideRequiredAsterisk,
  autoLabelWidth,
  registerLabelWidth,
  deregisterLabelWidth,
  addField,
  removeField,
})

// Keep form context in sync with props
watch(() => props, () => {
  formContext.model = props.model
  formContext.rules = props.rules
  formContext.labelPosition = props.labelPosition
  formContext.labelWidth = props.labelWidth
  formContext.labelSuffix = props.labelSuffix
  formContext.inline = props.inline
  formContext.disabled = props.disabled
  formContext.readonly = props.readonly
  formContext.size = props.size
  formContext.showMessage = props.showMessage
  formContext.statusIcon = props.statusIcon
  formContext.hideRequiredAsterisk = props.hideRequiredAsterisk
}, { deep: true })

provide('mForm', formContext)

const classes = computed(() => [
  'm-form',
  `m-form--label-${props.labelPosition}`,
  {
    'm-form--inline': props.inline,
    'm-form--hide-required-asterisk': props.hideRequiredAsterisk,
  },
])

/** 校验指定字段 */
function validate(callback?: (isValid: boolean, invalidFields: Record<string, any>) => void): Promise<boolean> {
  if (!props.model) {
    console.warn('[MForm] model is required for validate to work!')
    return Promise.resolve(false)
  }
  let promise: Promise<boolean> | undefined
  if (typeof callback !== 'function') {
    promise = new Promise((resolve, reject) => {
      callback = (valid, invalidFields) => {
        if (valid) resolve(true)
        else reject(invalidFields)
      }
    })
  }

  let count = 0
  let valid = true
  const invalidFields: Record<string, any> = {}
  const errorFieldEls: HTMLElement[] = []

  fields.forEach((field) => {
    field.validate('', (message: string, field: any) => {
      if (message) {
        valid = false
        invalidFields[field.prop] = message
        if (field.el) errorFieldEls.push(field.el)
      }
      count++
      if (count === fields.length) {
        if (!valid && props.scrollToError && errorFieldEls.length) {
          errorFieldEls[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        callback!(valid, invalidFields)
      }
    })
  })

  return promise || Promise.resolve(true)
}

/** 重置所有字段 */
function resetFields() {
  if (!props.model) {
    console.warn('[MForm] model is required for resetFields to work!')
    return
  }
  fields.forEach((field) => {
    field.resetField()
  })
}

/** 清除所有校验结果 */
function clearValidate(props?: string | string[]) {
  fields.forEach((field) => {
    if (props && Array.isArray(props)) {
      if (props.indexOf(field.prop) !== -1) {
        field.clearValidate()
      }
    } else if (!props) {
      field.clearValidate()
    }
  })
}

function handleSubmitClick() {
  props.submit?.()
}

function handleResetClick() {
  props.reset?.()
}

watch(() => props.rules, () => {
  if (props.validateOnRuleChange) {
    validate()
  }
})

onUnmounted(() => {
  fields.length = 0
})

defineExpose({
  validate,
  resetFields,
  clearValidate,
})
</script>

<style lang="scss">
.m-form {
  display: flex;
  flex-direction: column;
  gap: 0;

  &--label-left .m-form-item__label {
    text-align: left;
  }

  &--label-right .m-form-item__label {
    text-align: right;
  }

  &--label-top .m-form-item {
    flex-direction: column;
  }

  &--label-top .m-form-item__label {
    text-align: left;
    padding-bottom: 4px;
    width: auto !important;
  }

  &--inline {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;

    .m-form-item {
      flex-direction: row;
      align-items: center;
    }

    .m-form-item__label {
      width: auto !important;
      padding-right: 8px;
    }

    .m-form-item__content {
      flex: none;
    }
  }

  &--hide-required-asterisk .m-form-item__label .m-form-item__required::before {
    display: none;
  }

  &__footer {
    margin-top: 16px;

    &--default {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  }

  &--inline &__footer {
    width: 100%;
  }
}
</style>