<template>
  <li class="m-menu-item-group">
    <div v-if="title" class="m-menu-item-group__title" :style="titleStyle">
      {{ title }}
    </div>
    <ul class="m-menu-item-group__list">
      <slot />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, ref, type Ref } from 'vue'

defineOptions({ name: 'MMenuItemGroup' })

const props = withDefaults(defineProps<{
  title?: string   // 分组标题
}>(), {
  title: '',
})

const menu = inject<{
  activeIndex: Ref<string>;
  textColor: () => string;
  mode: () => string;
}>('mMenu', {
  activeIndex: ref(''),
  textColor: () => '',
  mode: () => 'vertical',
})

const titleStyle = computed(() => {
  const style: Record<string, string> = {}
  if (menu.textColor()) style.color = menu.textColor()
  return style
})
</script>

<style lang="scss">
.m-menu-item-group {
  list-style: none;
  padding: 0;
  margin: 0;

  &__title {
    padding: 8px 20px;
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-secondary);
    line-height: normal;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
