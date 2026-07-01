<template>
  <label :class="classes">
    <input
      type="radio"
      class="m-radio-button__original"
      :checked="isChecked"
      :disabled="isDisabled"
      :name="name"
      :value="label"
      @change="handleChange"
    />
    <span class="m-radio-button__inner" :style="checkedStyle">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MRadioButton' })

type RadioSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  label: string | number | boolean  // 单选按钮的值，必填
  disabled?: boolean                // 是否禁用
  size?: RadioSize                  // 单选按钮尺寸
  name?: string                     // 原生 name 属性
  color?: string                    // 选中时的颜色
}>(), {
  disabled: false,
})

const emit = defineEmits<{
  change: [value: string | number | boolean]  // 值变更时触发
}>()

const radioGroup = inject<any>('mRadioGroup', undefined)
const { effectiveDisabled } = useFormItem(props)

const currentSize = computed(() => props.size || radioGroup?.size?.value || 'default')

const isDisabled = computed(() => {
  if (props.disabled) return true
  if (radioGroup?.disabled?.value) return true
  return effectiveDisabled.value
})

const isChecked = computed(() => {
  if (radioGroup) {
    return radioGroup.modelValue.value === props.label
  }
  return false
})

const checkedStyle = computed(() => {
  if (!isChecked.value) return {}
  if (isDisabled.value) {
    return {
      backgroundColor: 'var(--mosaic-disabled-bg-color)',
      borderColor: 'var(--mosaic-disabled-border-color)',
      color: 'var(--mosaic-disabled-text-color)',
      boxShadow: 'none',
    }
  }
  const fill = props.color || radioGroup?.color?.value || radioGroup?.fill?.value || '#a78bfa'
  const textColor = radioGroup?.textColor?.value || '#fff'
  return {
    backgroundColor: fill,
    borderColor: fill,
    color: textColor,
    boxShadow: `-1px 0 0 0 ${fill}`,
  }
})

function handleChange() {
  if (isDisabled.value) return

  if (radioGroup) {
    radioGroup.changeEvent(props.label)
    emit('change', props.label)
  }
}

const classes = computed(() => [
  'm-radio-button',
  `m-radio-button--${currentSize.value}`,
  {
    'm-radio-button--checked': isChecked.value,
    'm-radio-button--disabled': isDisabled.value,
  },
])
</script>

<style lang="scss">
.m-radio-button {
  display: inline-flex;
  position: relative;
  cursor: pointer;
  user-select: none;

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
    border-left: none;
  }

  &:not(.m-radio-button--checked):not(.m-radio-button--disabled):hover &__inner {
    color: var(--mosaic-primary);
  }

  &--small &__inner {
    height: 28px;
    padding: 0 12px;
    font-size: var(--mosaic-font-size-sm);
  }

  &--large &__inner {
    height: 36px;
    padding: 0 18px;
    font-size: var(--mosaic-font-size-lg);
  }

  &--disabled {
    cursor: not-allowed;

    .m-radio-button__inner {
      background-color: var(--mosaic-disabled-bg-color);
      border-color: var(--mosaic-disabled-border-color);
      color: var(--mosaic-disabled-text-color);
      box-shadow: none;
    }
  }
}
</style>
