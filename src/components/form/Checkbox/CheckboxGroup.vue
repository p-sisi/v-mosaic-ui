<template>
  <div class="m-checkbox-group" :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, watch } from 'vue'

defineOptions({ name: 'MCheckboxGroup' })

type CheckboxSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  modelValue?: any[]              // 绑定值，选中项的 label 数组
  disabled?: boolean              // 是否禁用所有复选框
  min?: number                    // 最少选中个数
  max?: number                    // 最多选中个数
  size?: CheckboxSize             // 复选框组尺寸
  fill?: string                   // 选中按钮类型的填充色
  textColor?: string              // 选中按钮类型的文字颜色
}>(), {
  modelValue: () => [],
  disabled: false,
  fill: '#a78bfa',
  textColor: '#fff',
})

const emit = defineEmits<{
  'update:modelValue': [value: any[]]  // v-model 更新事件
  change: [value: any[]]               // 选中项变化时触发
}>()

function changeEvent(value: any[]) {
  emit('update:modelValue', value)
  emit('change', value)
}

provide('mCheckboxGroup', {
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  min: computed(() => props.min),
  max: computed(() => props.max),
  size: computed(() => props.size),
  fill: computed(() => props.fill),
  textColor: computed(() => props.textColor),
  changeEvent,
})

const classes = computed(() => [
  'm-checkbox-group',
  {
    'm-checkbox-group--disabled': props.disabled,
  },
])
</script>

<style lang="scss">
.m-checkbox-group {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: var(--mosaic-font-size);
}
</style>