<template>
  <div class="m-button-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { buttonGroupKey } from './constants'

defineOptions({ name: 'MButtonGroup' })

type ButtonSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  size?: ButtonSize       // 按钮组大小
}>(), {
  size: 'default',
})

provide(buttonGroupKey, {
  size: props.size,
})
</script>

<style lang="scss">
.m-button-group {
  display: inline-flex;

  .m-button {
    border-radius: 0;

    & + .m-button {
      border-left-color: rgba(0, 0, 0, 0.1);
    }

    &:first-child {
      border-top-left-radius: var(--mosaic-border-radius);
      border-bottom-left-radius: var(--mosaic-border-radius);
    }

    &:last-child {
      border-top-right-radius: var(--mosaic-border-radius);
      border-bottom-right-radius: var(--mosaic-border-radius);
    }

    &:not(:first-child):not(:last-child) {
      border-radius: 0;
      border-left: none;
    }

    &:first-child:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-child:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
    }
  }
}
</style>
