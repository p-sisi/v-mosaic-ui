<template>
  <div class="m-radio-group" :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'

defineOptions({ name: 'MRadioGroup' })

type RadioSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  modelValue?: string | number | boolean  // 绑定值，选中项的 label
  disabled?: boolean                      // 是否禁用所有单选框
  size?: RadioSize                        // 单选框组尺寸
  vertical?: boolean                      // 是否垂直排列
  textColor?: string                      // 选中按钮类型的文字颜色
  fill?: string                           // 选中按钮类型的填充色
  color?: string                          // 选中时的颜色
}>(), {
  disabled: false,
  size: 'default',
  vertical: false,
  textColor: '#fff',
  fill: '#a78bfa',
  color: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]  // v-model 更新事件
  change: [value: string | number | boolean]               // 选中项变化时触发
}>()

function changeEvent(value: string | number | boolean) {
  emit('update:modelValue', value)
  emit('change', value)
}

provide('mRadioGroup', {
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  size: computed(() => props.size),
  textColor: computed(() => props.textColor),
  fill: computed(() => props.fill),
  color: computed(() => props.color),
  changeEvent,
})

const classes = computed(() => [
  'm-radio-group',
  `m-radio-group--${props.size}`,
  {
    'm-radio-group--disabled': props.disabled,
    'm-radio-group--vertical': props.vertical,
  },
])
</script>

<style lang="scss">
.m-radio-group {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: var(--mosaic-font-size);

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  &--disabled {
    cursor: not-allowed;
  }
}
</style>