<template>
  <label :class="classes" :style="rootStyle">
    <span :class="inputClasses">
      <span class="m-radio__inner" />
      <input
        type="radio"
        class="m-radio__original"
        :checked="isChecked"
        :disabled="effectiveDisabled"
        :name="name || radioGroupName"
        :value="label"
        @change="handleChange"
      />
    </span>
    <span class="m-radio__label">
      <slot />{{ label !== undefined && !$slots.default ? label : '' }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MRadio' })

type RadioSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  modelValue?: string | number | boolean  // 绑定值，选中项的 label
  label: string | number | boolean        // 单选框的值，必填
  disabled?: boolean                      // 是否禁用
  border?: boolean                        // 是否显示边框
  size?: RadioSize                        // 单选框尺寸
  name?: string                           // 原生 name 属性
  color?: string                          // 选中时的颜色
}>(), {
  disabled: false,
  border: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]  // v-model 更新事件
  change: [value: string | number | boolean]               // 值变更时触发
}>()

const radioGroup = inject<any>('mRadioGroup', undefined)
const { effectiveSize, effectiveDisabled } = useFormItem(props)

const currentSize = computed(() => {
  if (props.size) return props.size
  if (radioGroup?.size?.value) return radioGroup.size.value
  return effectiveSize.value
})

const currentDisabled = computed(() => {
  if (props.disabled) return true
  if (radioGroup?.disabled?.value) return true
  return effectiveDisabled.value
})

const radioGroupName = computed(() => radioGroup?.name || '')

const currentColor = computed(() => {
  if (props.color) return props.color
  if (radioGroup?.color?.value) return radioGroup.color.value
  return undefined
})

const rootStyle = computed(() => {
  if (!currentColor.value) return {}
  return { '--m-radio-color': currentColor.value }
})

const isChecked = computed(() => {
  if (radioGroup) {
    return radioGroup.modelValue.value === props.label
  }
  return props.modelValue === props.label
})

function handleChange() {
  if (currentDisabled.value) return

  if (radioGroup) {
    radioGroup.changeEvent(props.label)
    return
  }

  emit('update:modelValue', props.label)
  emit('change', props.label)
}

const classes = computed(() => [
  'm-radio',
  `m-radio--${currentSize.value}`,
  {
    'm-radio--checked': isChecked.value,
    'm-radio--disabled': currentDisabled.value,
    'm-radio--border': props.border,
  },
])

const inputClasses = computed(() => [
  'm-radio__input',
  {
    'm-radio__input--checked': isChecked.value,
    'm-radio__input--disabled': currentDisabled.value,
  },
])
</script>

<style lang="scss">
.m-radio {
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
  }

  &__inner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.2s;
    position: relative;
  }

  &--checked &__inner,
  &__input--checked &__inner {
    border-color: var(--m-radio-color, var(--mosaic-primary));

    &::after {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--m-radio-color, var(--mosaic-primary));
    }
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

    .m-radio__inner {
      background-color: var(--mosaic-disabled-bg-color);
      border-color: var(--mosaic-disabled-border-color);
    }

    &.m-radio--checked .m-radio__inner::after {
      background-color: var(--mosaic-disabled-text-color);
    }

    .m-radio__label {
      color: var(--mosaic-disabled-text-color);
    }
  }

  /* border mode */
  &--border {
    padding: 4px 10px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);

    &.m-radio--checked {
      border-color: var(--m-radio-color, var(--mosaic-primary));
    }
  }

  /* size variations */
  &--small {
    .m-radio__inner {
      width: 14px;
      height: 14px;

      &::after {
        width: 6px;
        height: 6px;
      }
    }

    .m-radio__label {
      font-size: var(--mosaic-font-size-sm);
    }

    &.m-radio--border {
      padding: 2px 8px;
    }
  }

  &--large {
    .m-radio__inner {
      width: 18px;
      height: 18px;

      &::after {
        width: 10px;
        height: 10px;
      }
    }

    .m-radio__label {
      font-size: var(--mosaic-font-size-lg);
    }

    &.m-radio--border {
      padding: 6px 12px;
    }
  }

  /* hover */
  &:not(.m-radio--disabled):hover &__inner {
    border-color: var(--m-radio-color, var(--mosaic-primary));
  }
}
</style>