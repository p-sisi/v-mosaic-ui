<template>
  <li :class="classes">
    <div class="m-option-group__label">{{ label }}</div>
    <ul class="m-option-group__list">
      <slot />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MOptionGroup' })

const props = withDefaults(defineProps<{
  label: string                   // 分组标签，必填
  disabled?: boolean              // 是否禁用整个分组
}>(), {
  disabled: false,
})

const classes = computed(() => [
  'm-option-group',
  {
    'm-option-group--disabled': props.disabled,
  },
])
</script>

<style lang="scss">
.m-option-group {
  list-style: none;
  margin: 0;
  padding: 0;

  &__label {
    padding: 8px 16px 0;
    height: 28px;
    line-height: 28px;
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-secondary);
    font-weight: bold;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &--disabled &__label {
    color: var(--mosaic-disabled-text-color);
  }
}
</style>