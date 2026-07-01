<template>
  <footer class="m-footer" :style="height ? { height } : {}">
    <slot />
  </footer>
</template>

<script setup lang="ts">
defineOptions({ name: 'MFooter' })

withDefaults(defineProps<{
  height?: string  // 底部高度，设置后固定在底部不滚动；不设置则跟随内容滚动
}>(), {
  height: undefined,
})
</script>

<style lang="scss">
.m-footer {
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>