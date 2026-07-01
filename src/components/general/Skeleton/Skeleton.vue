<template>
  <template v-if="loading">
    <div :class="classes">
      <slot name="template" v-if="$slots.template" />
      <template v-else-if="type !== 'text'">
        <div :class="['m-skeleton__item', `m-skeleton__item--${type}`]">
          <svg v-if="type === 'image'" class="m-skeleton__image-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M967.6 816.6H56.4c-12.4 0-22.4-10-22.4-22.4V229.8c0-12.4 10-22.4 22.4-22.4h911.2c12.4 0 22.4 10 22.4 22.4v564.4c0 12.4-10 22.4-22.4 22.4zM78.8 771.8h866.4V252.2H78.8v519.6z" fill="currentColor" />
            <path d="M349.2 572.4c-35.4 0-64.2-28.8-64.2-64.2s28.8-64.2 64.2-64.2 64.2 28.8 64.2 64.2-28.8 64.2-64.2 64.2zm0-86.4c-12.2 0-22.2 10-22.2 22.2s10 22.2 22.2 22.2 22.2-10 22.2-22.2-10-22.2-22.2-22.2z" fill="currentColor" />
            <path d="M177.6 748.8c-5.6 0-11.2-2.2-15.6-6.4-9-8.6-9.2-22.8-0.6-31.8l182-189.6c8.6-9 22.8-9.2 31.8-0.6l112.8 108.2 242.8-254.4c8.6-9 22.8-9.2 31.8-0.6 9 8.6 9.2 22.8 0.6 31.8L506 675.2c-8.6 9-22.8 9.2-31.8 0.6l-112.8-108.2-168 175c-4.4 4.6-10.4 7-16.2 7-5.4 0-10.8-2-15-6z" fill="currentColor" />
          </svg>
        </div>
      </template>
      <template v-else>
        <div v-for="i in count * rows" :key="i" class="m-skeleton__item" :style="itemStyle(i)"></div>
      </template>
    </div>
  </template>
  <slot v-else />
</template>

<script setup lang="ts">
import { computed, provide, useSlots } from 'vue'

defineOptions({ name: 'MSkeleton' })

type SkeletonType = 'text' | 'circle' | 'image' | 'button' | 'rect'

const props = withDefaults(defineProps<{
  animated?: boolean     // 是否开启动画
  count?: number         // 渲染组数
  loading?: boolean      // 是否正在加载，加载中显示骨架屏
  rows?: number          // 骨架屏行数（type 为 text 时生效）
  type?: SkeletonType    // 骨架屏类型
}>(), {
  animated: true,
  count: 1,
  loading: true,
  rows: 3,
  type: 'text',
})

const slots = useSlots()

provide('skeleton', { loading: computed(() => props.loading) })

const classes = computed(() => [
  'm-skeleton',
  {
    'm-skeleton--animated': props.animated,
  },
])

function itemStyle(index: number) {
  const row = ((index - 1) % props.rows) + 1
  // 第一行宽度 40%
  if (row === 1) {
    return { width: '40%' }
  }
  // 最后一行宽度 60%
  if (row === props.rows) {
    return { width: '60%' }
  }
  return {}
}
</script>

<style lang="scss">
.m-skeleton {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  &--animated {
    .m-skeleton__item,
    .m-skeleton-item {
      background: linear-gradient(90deg, var(--mosaic-fill-color-light) 25%, #d9deea 37%, var(--mosaic-fill-color-light) 63%);
      background-size: 400% 100%;
      animation: m-skeleton-shimmer 1.2s ease infinite;
    }
  }

  &__item {
    height: 16px;
    border-radius: var(--mosaic-border-radius);
    background-color: var(--mosaic-fill-color-light);

    &--circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    &--image {
      height: 160px;
      width: 100%;
      border-radius: var(--mosaic-border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &--button {
      height: 32px;
      width: 80px;
      border-radius: var(--mosaic-border-radius);
    }

    &--rect {
      height: 80px;
      width: 100%;
      border-radius: var(--mosaic-border-radius);
    }
  }

  &__image-icon {
    width: 22%;
    height: 22%;
    color: var(--mosaic-text-placeholder);
  }
}

@keyframes m-skeleton-shimmer {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
