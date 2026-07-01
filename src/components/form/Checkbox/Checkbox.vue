<template>
  <label :class="classes">
    <span class="m-checkbox__input">
      <input
        type="checkbox"
        class="m-checkbox__original"
        :checked="isChecked"
        :disabled="isDisabled"
        :name="name"
        :value="label"
        @change="handleChange"
      />
      <span :class="innerClasses" />
    </span>
    <span v-if="$slots.default || label !== undefined" class="m-checkbox__label">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MCheckbox' })

type CheckboxSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  modelValue?: boolean | (string | number | boolean)[]  // 绑定值，布尔值或数组
  label?: string | number | boolean                      // 复选框的值，在 group 中使用
  checkedValue?: string | number                         // 选中时的值
  uncheckedValue?: string | number                       // 未选中时的值
  disabled?: boolean                                     // 是否禁用
  border?: boolean                                       // 是否显示边框
  size?: CheckboxSize                                    // 复选框尺寸
  name?: string                                          // 原生 name 属性
  checked?: boolean                                      // 是否选中（初始值）
  indeterminate?: boolean                                // 是否为不确定状态
}>(), {
  disabled: false,
  border: false,
  indeterminate: false,
})

const emit = defineEmits([
  'update:modelValue',
  'change',
])

const checkboxGroup = inject<any>('mCheckboxGroup', undefined)
const { effectiveSize, effectiveDisabled } = useFormItem(props)

const currentSize = computed(() => {
  if (props.size) return props.size
  if (checkboxGroup?.size?.value) return checkboxGroup.size.value
  return effectiveSize.value
})

const isChecked = computed(() => {
  if (checkboxGroup) {
    return (checkboxGroup.modelValue.value || []).includes(props.label as string | number | boolean)
  }
  if (props.modelValue !== undefined) {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue.includes(props.label as string | number | boolean)
    }
    if (props.checkedValue !== undefined && props.uncheckedValue !== undefined) {
      return props.modelValue === props.checkedValue as any
    }
    return !!props.modelValue
  }
  return !!props.checked
})

const isDisabled = computed(() => {
  if (props.disabled) return true
  if (checkboxGroup?.disabled?.value) return true
  if (effectiveDisabled.value) return true
  if (checkboxGroup) {
    const groupLen = (checkboxGroup.modelValue.value || []).length
    const max = checkboxGroup.max?.value
    const min = checkboxGroup.min?.value
    // 达到上限时，未选中的禁用
    if (max !== undefined && groupLen >= max && !isChecked.value) return true
    // 达到下限时，已选中的禁用（不能取消）
    if (min !== undefined && groupLen <= min && isChecked.value) return true
  }
  return false
})

function handleChange(event: Event) {
  if (isDisabled.value) return

  const checked = (event.target as HTMLInputElement).checked

  if (checkboxGroup) {
    const groupValue = [...(checkboxGroup.modelValue.value || [])]
    const labelVal = props.label as string | number | boolean
    if (checked) {
      if (checkboxGroup.max?.value !== undefined && groupValue.length >= checkboxGroup.max.value) return
      groupValue.push(labelVal)
    } else {
      const index = groupValue.indexOf(labelVal)
      if (index > -1) groupValue.splice(index, 1)
    }
    checkboxGroup.changeEvent(groupValue)
    return
  }

  if (props.checkedValue !== undefined && props.uncheckedValue !== undefined) {
    const value = checked ? props.checkedValue : props.uncheckedValue
    emit('update:modelValue', value)
    emit('change', value)
    return
  }

  if (Array.isArray(props.modelValue)) {
    const arr = [...props.modelValue]
    const labelVal = props.label as string | number | boolean
    if (checked) {
      arr.push(labelVal)
    } else {
      const index = arr.indexOf(labelVal)
      if (index > -1) arr.splice(index, 1)
    }
    emit('update:modelValue', arr)
    emit('change', arr)
    return
  }

  emit('update:modelValue', checked)
  emit('change', checked)
}

const classes = computed(() => [
  'm-checkbox',
  `m-checkbox--${currentSize.value}`,
  {
    'm-checkbox--checked': isChecked.value,
    'm-checkbox--disabled': isDisabled.value,
    'm-checkbox--border': props.border,
    'm-checkbox--indeterminate': props.indeterminate,
  },
])

const innerClasses = computed(() => [
  'm-checkbox__inner',
  {
    'm-checkbox__inner--checked': isChecked.value && !props.indeterminate,
    'm-checkbox__inner--indeterminate': props.indeterminate,
    'm-checkbox__inner--disabled': isDisabled.value,
  },
])
</script>

<style lang="scss">
.m-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: var(--mosaic-font-size);
  line-height: 1;
  white-space: nowrap;
  margin-right: 16px;

  &__input {
    position: relative;
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    line-height: 1;
  }

  &__original {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    z-index: -1;
  }

  &__inner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 16px;
    height: 16px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: 2px;
    background-color: #fff;
    transition: all 0.2s;
    box-sizing: border-box;

    &--checked {
      background-color: var(--mosaic-primary);
      border-color: var(--mosaic-primary);

      &::after {
        content: '';
        display: block;
        width: 13px;
        height: 13px;
        background-color: #fff;
        -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M9 16.17 4.83 12l-1.41 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E") center/contain no-repeat;
        mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M9 16.17 4.83 12l-1.41 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E") center/contain no-repeat;
      }
    }

    &--indeterminate {
      background-color: var(--mosaic-primary);
      border-color: var(--mosaic-primary);

      &::after {
        content: '';
        display: block;
        width: 8px;
        height: 2px;
        background-color: #fff;
      }
    }

    &--disabled {
      background-color: var(--mosaic-disabled-bg-color);
      border-color: var(--mosaic-disabled-border-color);
      cursor: not-allowed;
    }
  }

  &__label {
    margin-left: 8px;
    color: var(--mosaic-text-regular);
    font-size: var(--mosaic-font-size);
  }

  &--checked &__label {
    color: var(--mosaic-text-primary);
  }

  &--disabled {
    cursor: not-allowed;

    .m-checkbox__inner--checked {
      background-color: var(--mosaic-disabled-border-color);
      border-color: var(--mosaic-disabled-border-color);

      &::after {
        background-color: var(--mosaic-disabled-text-color);
      }
    }

    .m-checkbox__inner--indeterminate {
      background-color: var(--mosaic-disabled-border-color);
      border-color: var(--mosaic-disabled-border-color);

      &::after {
        background-color: var(--mosaic-disabled-text-color);
      }
    }

    .m-checkbox__label {
      color: var(--mosaic-disabled-text-color);
    }
  }

  /* border mode */
  &--border {
    padding: 6px 12px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);

    &.m-checkbox--checked {
      border-color: var(--mosaic-primary);
    }
  }

  /* size variations */
  &--small &__inner {
    width: 14px;
    height: 14px;
  }

  &--small &__inner--checked::after {
    width: 9px;
    height: 9px;
  }

  &--small &__inner--indeterminate::after {
    width: 6px;
  }

  &--small &__label {
    font-size: var(--mosaic-font-size-sm);
  }

  &--small.m-checkbox--border {
    padding: 4px 8px;
  }

  &--large &__inner {
    width: 18px;
    height: 18px;
  }

  &--large &__inner--checked::after {
    width: 13px;
    height: 13px;
  }

  &--large &__inner--indeterminate::after {
    width: 10px;
  }

  &--large &__label {
    font-size: var(--mosaic-font-size-lg);
  }

  &--large.m-checkbox--border {
    padding: 8px 14px;
  }

  /* hover */
  &:not(.m-checkbox--disabled):hover &__inner {
    border-color: var(--mosaic-primary);
  }
}
</style>
