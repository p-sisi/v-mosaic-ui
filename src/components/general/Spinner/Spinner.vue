<template>
  <span :class="classes" :style="customStyle" role="status">
    <template v-if="type === 'dots'">
      <span class="m-spinner__dot"></span>
      <span class="m-spinner__dot"></span>
      <span class="m-spinner__dot"></span>
      <span class="m-spinner__dot"></span>
      <span class="m-spinner__dot"></span>
    </template>
    <span v-else class="m-spinner__inner"></span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MSpinner' })

type SpinnerType = 'border' | 'growing' | 'dots'
type SpinnerSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  type?: SpinnerType   // 旋转器类型
  size?: SpinnerSize   // 旋转器尺寸
  color?: string       // 自定义颜色
  plain?: boolean      // 是否去除底部灰色背景（仅 border 类型）
}>(), {
  type: 'border',
  size: 'default',
  color: '',
  plain: false,
})

const classes = computed(() => [
  'm-spinner',
  `m-spinner--${props.type}`,
  {
    'm-spinner--small': props.size === 'small',
    'm-spinner--large': props.size === 'large',
    'm-spinner--plain': props.plain,
  },
])

const customStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style['--m-spinner-color'] = props.color
  }
  return style
})
</script>

<style lang="scss">
.m-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  vertical-align: middle;

  /* border spinner */
  &--border .m-spinner__inner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid var(--mosaic-border-color);
    border-top-color: var(--m-spinner-color, var(--mosaic-primary));
    border-radius: 50%;
    animation: m-spinner-rotate 0.6s linear infinite;
  }

  /* plain：去除灰色底色轨道 */
  &--border.m-spinner--plain .m-spinner__inner {
    border-color: transparent;
    border-top-color: var(--m-spinner-color, var(--mosaic-primary));
  }

  /* growing spinner */
  &--growing .m-spinner__inner {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: var(--m-spinner-color, var(--mosaic-primary));
    border-radius: 50%;
    animation: m-spinner-grow 0.75s ease-in-out infinite;
  }

  /* dots spinner */
  &--dots .m-spinner__dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: var(--m-spinner-color, var(--mosaic-primary));
    border-radius: 50%;
    animation: m-spinner-dot 1s ease-in-out infinite;

    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
    &:nth-child(4) { animation-delay: 0.45s; }
    &:nth-child(5) { animation-delay: 0.6s; }
  }

  &--small {
    &.m-spinner--border .m-spinner__inner {
      width: 14px;
      height: 14px;
      border-width: 2px;
    }

    &.m-spinner--growing .m-spinner__inner {
      width: 10px;
      height: 10px;
    }

    &.m-spinner--dots {
      gap: 3px;

      .m-spinner__dot {
        width: 5px;
        height: 5px;
      }
    }
  }

  &--large {
    &.m-spinner--border .m-spinner__inner {
      width: 32px;
      height: 32px;
      border-width: 3px;
    }

    &.m-spinner--growing .m-spinner__inner {
      width: 28px;
      height: 28px;
    }

    &.m-spinner--dots {
      gap: 8px;

      .m-spinner__dot {
        width: 14px;
        height: 14px;
      }
    }
  }
}

@keyframes m-spinner-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes m-spinner-grow {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes m-spinner-dot {
  0%, 80%, 100% {
    transform: scale(0.4);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
