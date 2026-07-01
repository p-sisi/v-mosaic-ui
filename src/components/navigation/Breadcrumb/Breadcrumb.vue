<template>
  <div class="m-breadcrumb">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'

defineOptions({ name: 'MBreadcrumb' })

const props = withDefaults(defineProps<{
  separator?: string       // 分隔符
  separatorIcon?: string   // 分隔符图标类名
}>(), {
  separator: '/',
  separatorIcon: '',
})

provide('mBreadcrumb', {
  separator: () => props.separator,
  separatorIcon: () => props.separatorIcon,
})
</script>

<style lang="scss">
.m-breadcrumb {
  display: flex;
  align-items: center;
  font-size: var(--mosaic-font-size);
  color: var(--mosaic-text-regular);
  flex-wrap: wrap;
}
</style>
