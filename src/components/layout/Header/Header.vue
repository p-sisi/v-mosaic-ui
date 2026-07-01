<template>
  <header class="m-header" :style="{ height }">
    <slot />
  </header>
</template>

<script setup lang="ts">
defineOptions({ name: 'MHeader' })

withDefaults(defineProps<{
  height?: string  // 头部高度
}>(), {
  height: '60px',
})
</script>

<style lang="scss">
.m-header {
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>