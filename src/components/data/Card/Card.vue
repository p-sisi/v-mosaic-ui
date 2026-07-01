<template>
  <div :class="classes">
    <div v-if="header || $slots.header" class="m-card__header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="m-card__body" :style="bodyStyle">
      <slot name="content">
        <slot />
      </slot>
    </div>
    <div v-if="$slots.footer" class="m-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue'

defineOptions({ name: 'MCard' })

type CardShadow = 'always' | 'hover' | 'never'

const props = withDefaults(defineProps<{
  header?: string                   // 卡片标题，也可通过 slot 自定义
  bodyStyle?: StyleValue            // 卡片内容区样式
  shadow?: CardShadow               // 卡片阴影显示时机
}>(), {
  header: '',
  bodyStyle: () => ({ padding: '20px' }),
  shadow: 'always',
})

const classes = computed(() => [
  'm-card',
  {
    'm-card--shadow-always': props.shadow === 'always',
    'm-card--shadow-hover': props.shadow === 'hover',
    'm-card--shadow-never': props.shadow === 'never',
  },
])
</script>

<style lang="scss">
.m-card {
  border-radius: 4px;
  border: 1px solid var(--mosaic-border-color-lighter);
  background-color: var(--mosaic-fill-color-blank);
  color: var(--mosaic-text-primary);
  overflow: hidden;
  transition: box-shadow var(--mosaic-transition-duration-fast) ease;

  &--shadow-always {
    box-shadow: var(--mosaic-box-shadow-light);
  }

  &--shadow-hover {
    box-shadow: none;

    &:hover {
      box-shadow: var(--mosaic-box-shadow-base);
    }
  }

  &--shadow-never {
    box-shadow: none;
  }

  &__header {
    padding: 12px 20px;
    border-bottom: 1px solid var(--mosaic-border-color-lighter);
    font-size: var(--mosaic-font-size);
    font-weight: 600;
    color: var(--mosaic-text-primary);
  }

  &__body {
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-regular);
  }

  &__footer {
    padding: 12px 20px;
    border-top: 1px solid var(--mosaic-border-color-lighter);
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-regular);
  }
}
</style>