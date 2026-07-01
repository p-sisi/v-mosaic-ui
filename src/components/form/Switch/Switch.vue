<template>
  <div :class="classes" :style="rootStyle" @click="handleClick">
    <input
      type="checkbox"
      class="m-switch__input"
      :checked="isChecked"
      :disabled="effectiveDisabled"
      @change="handleChange"
    />
    <span v-if="inactiveText && !inlinePrompt" class="m-switch__label m-switch__label--left" :class="{ 'm-switch__label--active': !isChecked }">
      {{ inactiveText }}
    </span>
    <span class="m-switch__core" :style="switchStyle">
      <span v-if="inlinePrompt && (activeText || inactiveText)" class="m-switch__inner">
        {{ isChecked ? activeText : inactiveText }}
      </span>
      <span class="m-switch__action">
        <span v-if="loading" class="m-switch__loading"></span>
        <slot v-else name="content" :checked="isChecked" />
      </span>
    </span>
    <span v-if="activeText && !inlinePrompt" class="m-switch__label m-switch__label--right" :class="{ 'm-switch__label--active': isChecked }">
      {{ activeText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MSwitch' })

type SwitchSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  modelValue?: boolean | string | number  // 绑定值，支持 v-model 双向绑定
  disabled?: boolean                      // 是否禁用
  width?: number                          // 开关宽度（像素），不设置则随尺寸自适应
  activeText?: string                     // 打开时的文字描述
  inactiveText?: string                   // 关闭时的文字描述
  activeValue?: boolean | string | number  // 打开时的值
  inactiveValue?: boolean | string | number // 关闭时的值
  activeColor?: string                    // 打开时的背景色
  inactiveColor?: string                  // 关闭时的背景色
  validateEvent?: boolean                 // 是否触发表单校验
  loading?: boolean                       // 是否显示加载状态
  inlinePrompt?: boolean                  // 文字是否显示在点内
  size?: SwitchSize                       // 开关尺寸
  round?: boolean                         // 是否为圆角，false 时为方形带小圆角
}>(), {
  modelValue: false,
  disabled: false,
  width: undefined,
  activeValue: true,
  inactiveValue: false,
  activeColor: '',
  inactiveColor: '',
  validateEvent: true,
  loading: false,
  inlinePrompt: false,
  size: 'default',
  round: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | string | number]
  change: [value: boolean | string | number]
}>()

const { effectiveDisabled, form } = useFormItem(props)

const isChecked = computed(() => props.modelValue === props.activeValue)

const effectiveWidth = computed(() => {
  if (props.width !== undefined) return props.width
  const defaults: Record<SwitchSize, number> = { small: 36, default: 40, large: 48 }
  return defaults[props.size]
})

const rootStyle = computed(() => ({
  '--m-switch-active-color': props.activeColor || 'var(--mosaic-primary)',
  '--m-switch-inactive-color': props.inactiveColor || 'var(--mosaic-border-color)',
}))

const switchStyle = computed(() => {
  const style: Record<string, string> = {}
  if (!props.inlinePrompt) {
    style.width = `${effectiveWidth.value}px`
  }
  if (effectiveDisabled.value) {
    style.backgroundColor = isChecked.value
      ? 'var(--mosaic-disabled-border-color)'
      : 'var(--mosaic-disabled-bg-color)'
  } else if (isChecked.value) {
    style.backgroundColor = props.activeColor || 'var(--mosaic-primary)'
  } else {
    style.backgroundColor = props.inactiveColor || 'var(--mosaic-border-color)'
  }
  return style
})

function handleClick() {
  if (effectiveDisabled.value || props.loading) return
  const val = isChecked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', val)
  emit('change', val)
  if (props.validateEvent && form) {
    form.validate?.('', () => {})
  }
}

function handleChange() {
  // handled by handleClick
}

const classes = computed(() => [
  'm-switch',
  `m-switch--${props.size}`,
  {
    'm-switch--checked': isChecked.value,
    'm-switch--disabled': effectiveDisabled.value,
    'm-switch--loading': props.loading,
    'm-switch--square': !props.round,
    'm-switch--inline-prompt': props.inlinePrompt,
  },
])
</script>

<style lang="scss">
.m-switch {
  --m-switch-core-height: 20px;
  --m-switch-action-size: 18px;

  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: var(--mosaic-font-size);
  user-select: none;
  vertical-align: middle;

  &--small {
    --m-switch-core-height: 16px;
    --m-switch-action-size: 14px;
  }

  &--large {
    --m-switch-core-height: 24px;
    --m-switch-action-size: 22px;
  }

  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    z-index: -1;
  }

  &__core {
    display: inline-flex;
    align-items: center;
    position: relative;
    height: var(--m-switch-core-height);
    border-radius: 9999px;
    background-color: var(--mosaic-border-color);
    transition: background-color 0.3s;
    overflow: hidden;
  }

  &--square &__core {
    border-radius: 4px;
  }

  &__action {
    position: absolute;
    left: 1px;
    top: 1px;
    width: var(--m-switch-action-size);
    height: var(--m-switch-action-size);
    border-radius: 50%;
    background-color: #fff;
    transition: left 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    overflow: hidden;
    font-size: 10px;
    color: var(--mosaic-text-secondary);
  }

  &--square &__action {
    border-radius: 3px;
  }

  &--checked &__action {
    left: calc(100% - var(--m-switch-action-size) - 1px);
  }

  /* inline-prompt: core auto-sizes to content, text centered */
  &--inline-prompt &__core {
    justify-content: center;
    padding: 0 calc(var(--m-switch-action-size) + 6px);
  }

  &__inner {
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
    line-height: 1;
    pointer-events: none;
    z-index: 1;
  }

  &--small &__inner {
    font-size: 10px;
  }

  &--large &__inner {
    font-size: 13px;
  }

  &__loading {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid var(--mosaic-primary);
    border-top-color: transparent;
    border-radius: 50%;
    animation: m-switch-spin 0.6s linear infinite;
  }

  &--small &__loading {
    width: 9px;
    height: 9px;
    border-width: 1.5px;
  }

  &--large &__loading {
    width: 14px;
    height: 14px;
  }

  &__label {
    color: var(--mosaic-text-placeholder);
    font-size: var(--mosaic-font-size);
    transition: color 0.3s;

    &--left {
      margin-right: 8px;
    }

    &--right {
      margin-left: 8px;
    }

    &--left.m-switch__label--active {
      color: var(--m-switch-inactive-color, var(--mosaic-border-color));
    }

    &--right.m-switch__label--active {
      color: var(--m-switch-active-color, var(--mosaic-primary));
    }
  }

  &--small &__label {
    font-size: var(--mosaic-font-size-sm);
  }

  &--large &__label {
    font-size: var(--mosaic-font-size-lg);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;

    .m-switch__core {
      background-color: var(--mosaic-disabled-bg-color);
    }

    &.m-switch--checked .m-switch__core {
      background-color: var(--mosaic-disabled-border-color);
    }
  }

  &--loading {
    cursor: default;
  }
}

@keyframes m-switch-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
