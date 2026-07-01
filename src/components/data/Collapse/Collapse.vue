<template>
  <div class="m-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'

defineOptions({ name: 'MCollapse' })

const props = withDefaults(defineProps<{
  modelValue?: any[] | string                // 当前激活的面板
  accordion?: boolean                        // 是否手风琴模式
}>(), {
  modelValue: () => [],
  accordion: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: any[] | string]
  change: [activeNames: any[] | string]
}>()

const activeNames = ref<any[]>(Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue])

watch(() => props.modelValue, (val) => {
  activeNames.value = Array.isArray(val) ? val : [val]
})

const setActiveNames = (names: any[]) => {
  activeNames.value = names
  const value = props.accordion ? names[0] || '' : names
  emit('update:modelValue', value)
  emit('change', value)
}

const handleItemClick = (name: string | number) => {
  const index = activeNames.value.indexOf(name)
  if (props.accordion) {
    setActiveNames(index > -1 ? [] : [name])
  } else {
    if (index > -1) {
      activeNames.value.splice(index, 1)
    } else {
      activeNames.value.push(name)
    }
    setActiveNames([...activeNames.value])
  }
}

provide('mCollapse', {
  activeNames: computed(() => activeNames.value),
  accordion: computed(() => props.accordion),
  handleItemClick,
})
</script>

<style lang="scss">
.m-collapse {
  border-top: 1px solid var(--mosaic-border-color);
  border-bottom: 1px solid var(--mosaic-border-color);
}
</style>