<template>
  <label :class="classes">
    <input
      type="checkbox"
      class="m-checkbox-button__original"
      :checked="isChecked"
      :disabled="isDisabled"
      :name="name"
      :value="label"
      @change="handleChange"
    />
    <span class="m-checkbox-button__inner" :style="checkedStyle">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MCheckboxButton' })

const props = withDefaults(defineProps<{
  label?: string | number | boolean  // 复选框按钮的值，在 checkbox-group 中使用
  disabled?: boolean                 // 是否禁用
  name?: string                      // 原生 name 属性
}>(), {
  disabled: false,
})

const emit = defineEmits<{
  change: [value: (string | number | boolean)[]]  // 值变更时触发
}>()

const checkboxGroup = inject<any>('mCheckboxGroup', undefined)
const { effectiveDisabled } = useFormItem(props)

const isChecked = computed(() => {
  if (checkboxGroup) {
    return (checkboxGroup.modelValue.value || []).includes(props.label)
  }
  return false
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

const checkedStyle = computed(() => {
  if (!isChecked.value) return {}
  if (isDisabled.value) {
    return {
      backgroundColor: 'var(--mosaic-disabled-bg-color)',
      color: 'var(--mosaic-disabled-text-color)',
    }
  }
  const fill = checkboxGroup?.fill?.value || '#a78bfa'
  const textColor = checkboxGroup?.textColor?.value || '#fff'
  return {
    backgroundColor: fill,
    color: textColor,
  }
})

function handleChange(event: Event) {
  if (isDisabled.value) return

  const checked = (event.target as HTMLInputElement).checked

  if (checkboxGroup) {
    const groupValue = [...(checkboxGroup.modelValue.value || [])]
    if (checked) {
      if (checkboxGroup.max?.value !== undefined && groupValue.length >= checkboxGroup.max.value) return
      groupValue.push(props.label)
    } else {
      const index = groupValue.indexOf(props.label)
      if (index > -1) groupValue.splice(index, 1)
    }
    checkboxGroup.changeEvent(groupValue)
    emit('change', groupValue)
  }
}

const classes = computed(() => [
  'm-checkbox-button',
  {
    'm-checkbox-button--checked': isChecked.value,
    'm-checkbox-button--disabled': isDisabled.value,
  },
])
</script>

<style lang="scss">
.m-checkbox-button {
  display: inline-flex;
  position: relative;
  cursor: pointer;
  user-select: none;

  /* 按钮组内去掉 group 的 gap，使相邻按钮边框贴合 */
  .m-checkbox-group:has(&) {
    gap: 0;
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
    padding: 0 16px;
    height: 32px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: 0;
    background-color: #fff;
    color: var(--mosaic-text-regular);
    font-size: var(--mosaic-font-size);
    white-space: nowrap;
    transition: all 0.2s;
  }

  &:first-child &__inner {
    border-radius: var(--mosaic-border-radius) 0 0 var(--mosaic-border-radius);
  }

  &:last-child &__inner {
    border-radius: 0 var(--mosaic-border-radius) var(--mosaic-border-radius) 0;
  }

  & + & &__inner {
    margin-left: -1px;
  }

  &:not(.m-checkbox-button--checked):not(.m-checkbox-button--disabled):hover &__inner {
    color: var(--mosaic-primary);
    position: relative;
    z-index: 1;
  }

  &--checked &__inner {
    position: relative;
    z-index: 1;
  }

  &--disabled {
    cursor: not-allowed;

    .m-checkbox-button__inner {
      background-color: var(--mosaic-disabled-bg-color);
      border-color: var(--mosaic-disabled-border-color);
      color: var(--mosaic-disabled-text-color);
      box-shadow: none;
    }
  }
}
</style>
