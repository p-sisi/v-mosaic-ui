<template>
  <div style="display: none;"></div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, reactive, computed, useSlots } from 'vue'

defineOptions({ name: 'MDescriptionsItem' })

type ItemAlign = 'left' | 'center' | 'right'

const props = withDefaults(defineProps<{
  label?: string                              // 标签文本
  span?: number                               // 列的数量
  labelClassName?: string                     // 自定义标签类名
  contentClassName?: string                   // 自定义内容类名
  labelStyle?: object | string                // 自定义标签样式
  contentStyle?: object | string              // 自定义内容样式
  align?: ItemAlign                           // 对齐方式
}>(), {
  label: '',
  span: 1,
  labelClassName: '',
  contentClassName: '',
  labelStyle: () => ({}),
  contentStyle: () => ({}),
  align: 'left',
})

const slots = useSlots()

const mDescriptions = inject<{
  addItem: (item: any) => void
  removeItem: (itemId: string) => void
}>('mDescriptions', {
  addItem: () => {},
  removeItem: () => {},
})

const itemId = `desc_item_${Math.random().toString(36).slice(2, 9)}`

const itemConfig = reactive({
  id: itemId,
  label: computed(() => props.label),
  span: computed(() => props.span),
  labelClassName: computed(() => props.labelClassName),
  contentClassName: computed(() => props.contentClassName),
  labelStyle: computed(() => props.labelStyle),
  contentStyle: computed(() => props.contentStyle),
  align: computed(() => props.align),
  renderSlot: slots.default,
})

onMounted(() => {
  mDescriptions.addItem(itemConfig)
})

onUnmounted(() => {
  mDescriptions.removeItem(itemId)
})
</script>
