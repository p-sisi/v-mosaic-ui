<template>
  <aside class="m-aside" :style="{ width }">
    <slot />
  </aside>
</template>

<script setup lang="ts">
defineOptions({ name: 'MAside' })

withDefaults(defineProps<{
  width?: string  // 侧边栏宽度
}>(), {
  width: '300px',
})
</script>

<style lang="scss">
.m-aside {
  flex-shrink: 0;
  box-sizing: border-box;
  overflow: auto;
}
</style>