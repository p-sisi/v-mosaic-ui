<template>
  <main class="m-main">
    <slot />
  </main>
</template>

<script setup lang="ts">
defineOptions({ name: 'MMain' })
</script>

<style lang="scss">
.m-main {
  flex: 1;
  box-sizing: border-box;
  padding: 20px;
  overflow: auto;
}
</style>