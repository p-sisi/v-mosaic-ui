<template>
  <div v-if="loading" :class="classes" :style="customStyle">
    <svg v-if="variant === 'image'" class="m-skeleton-item__icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <path d="M967.6 816.6H56.4c-12.4 0-22.4-10-22.4-22.4V229.8c0-12.4 10-22.4 22.4-22.4h911.2c12.4 0 22.4 10 22.4 22.4v564.4c0 12.4-10 22.4-22.4 22.4zM78.8 771.8h866.4V252.2H78.8v519.6z" fill="currentColor" />
      <path d="M349.2 572.4c-35.4 0-64.2-28.8-64.2-64.2s28.8-64.2 64.2-64.2 64.2 28.8 64.2 64.2-28.8 64.2-64.2 64.2zm0-86.4c-12.2 0-22.2 10-22.2 22.2s10 22.2 22.2 22.2 22.2-10 22.2-22.2-10-22.2-22.2-22.2z" fill="currentColor" />
      <path d="M177.6 748.8c-5.6 0-11.2-2.2-15.6-6.4-9-8.6-9.2-22.8-0.6-31.8l182-189.6c8.6-9 22.8-9.2 31.8-0.6l112.8 108.2 242.8-254.4c8.6-9 22.8-9.2 31.8-0.6 9 8.6 9.2 22.8 0.6 31.8L506 675.2c-8.6 9-22.8 9.2-31.8 0.6l-112.8-108.2-168 175c-4.4 4.6-10.4 7-16.2 7-5.4 0-10.8-2-15-6z" fill="currentColor" />
    </svg>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { computed, inject, type ComputedRef } from 'vue'

defineOptions({ name: 'MSkeletonItem' })

type SkeletonVariant = 'text' | 'circle' | 'rect' | 'image'

const props = withDefaults(defineProps<{
  variant?: SkeletonVariant  // 骨架屏变体类型
  width?: string | number    // 自定义宽度
  height?: string | number   // 自定义高度
}>(), {
  variant: 'text',
  width: undefined,
  height: undefined,
})

const skeletonContext = inject<{ loading: ComputedRef<boolean> }>('skeleton', {
  loading: computed(() => true),
})

const loading = computed(() => skeletonContext.loading.value)

const classes = computed(() => [
  'm-skeleton-item',
  `m-skeleton-item--${props.variant}`,
])

function toSize(v: string | number | undefined) {
  if (v === undefined) return undefined
  return typeof v === 'number' ? `${v}px` : v
}

const customStyle = computed(() => {
  const style: Record<string, string> = {}
  const w = toSize(props.width)
  const h = toSize(props.height)
  if (w) style.width = w
  if (h) style.height = h
  return style
})
</script>

<style lang="scss">
.m-skeleton-item {
  background-color: var(--mosaic-fill-color-light);
  border-radius: var(--mosaic-border-radius);

  &--text {
    height: 16px;
    width: 100%;
    border-radius: var(--mosaic-border-radius);
  }

  &--circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  &--rect {
    height: 80px;
    width: 100%;
    border-radius: var(--mosaic-border-radius);
  }

  &--image {
    height: 160px;
    width: 100%;
    border-radius: var(--mosaic-border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 20%;
    height: 20%;
    color: var(--mosaic-text-placeholder);
  }
}
</style>
