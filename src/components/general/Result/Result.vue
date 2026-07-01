<template>
  <div :class="classes">
    <div class="m-result__icon">
      <slot name="icon">
        <svg v-if="type === 'success'" class="m-result__icon-svg m-result__icon-svg--success" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7L468.3 602.9c-4.7 4.7-12.3 4.7-17 0l-132.8-132.8c-4.7-4.7-4.7-12.3 0-17l17-17c4.7-4.7 12.3-4.7 17 0l107.3 107.3 211.7-211.7c4.7-4.7 12.3-4.7 17 0l17 17c4.7 4.8 4.7 12.3 0 17z" fill="currentColor" />
        </svg>
        <svg v-else-if="type === 'warning'" class="m-result__icon-svg m-result__icon-svg--warning" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z" fill="currentColor" />
        </svg>
        <svg v-else-if="type === 'danger'" class="m-result__icon-svg m-result__icon-svg--danger" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 574.4l-17 17c-4.7 4.7-12.3 4.7-17 0L512 527l-131.4 128.4c-4.7 4.7-12.3 4.7-17 0l-17-17c-4.7-4.7-4.7-12.3 0-17L479 512 346.6 385.6c-4.7-4.7-4.7-12.3 0-17l17-17c4.7-4.7 12.3-4.7 17 0L512 479l131.4-127.4c4.7-4.7 12.3-4.7 17 0l17 17c4.7 4.7 4.7 12.3 0 17L545 512l132.4 126.4c4.7 4.7 4.7 12.3 0 17z" fill="currentColor" />
        </svg>
        <svg v-else class="m-result__icon-svg m-result__icon-svg--info" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 592c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v200zm-32-288c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z" fill="currentColor" />
        </svg>
      </slot>
    </div>
    <div v-if="title" class="m-result__title">{{ title }}</div>
    <div v-if="subTitle" class="m-result__subtitle">{{ subTitle }}</div>
    <div v-if="$slots.extra" class="m-result__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MResult' })

type ResultType = 'success' | 'warning' | 'danger' | 'info'

const props = withDefaults(defineProps<{
  type?: ResultType   // 结果类型，决定图标颜色
  title?: string      // 标题
  subTitle?: string   // 副标题
}>(), {
  type: 'info',
  title: '',
  subTitle: '',
})

const classes = computed(() => [
  'm-result',
  `m-result--${props.type}`,
])
</script>

<style lang="scss">
.m-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 30px;

  &__icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
  }

  &__icon-svg {
    width: 100%;
    height: 100%;

    &--success {
      color: var(--mosaic-success);
    }

    &--warning {
      color: var(--mosaic-warning);
    }

    &--danger {
      color: var(--mosaic-danger);
    }

    &--info {
      color: var(--mosaic-info);
    }
  }

  &__title {
    font-size: var(--mosaic-font-size-lg);
    color: var(--mosaic-text-primary);
    font-weight: 600;
    margin-bottom: 8px;
  }

  &__subtitle {
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-secondary);
    margin-bottom: 24px;
  }

  &__extra {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
