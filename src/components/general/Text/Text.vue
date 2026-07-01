<template>
  <span :class="classes" :style="textStyle">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MText' })

type TextType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'

interface GradientOption {
  from: string
  to: string
}

const props = withDefaults(defineProps<{
  type?: TextType                                             // 文本类型
  color?: string                                              // 自定义文本颜色
  truncated?: boolean                                         // 单行省略
  lineClamp?: number                                          // 多行省略行数
  gradient?: GradientOption                                   // 渐变文字
}>(), {
  type: 'default',
  color: '',
  truncated: false,
  lineClamp: 0,
  gradient: () => ({ from: '', to: '' }),
})

const classes = computed(() => [
  'm-text',
  `m-text--${props.type}`,
  {
    'm-text--truncated': props.truncated,
    'm-text--line-clamp': props.lineClamp > 0,
  },
])

const textStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.color) {
    style.color = props.color
  }

  if (props.lineClamp > 0) {
    style['-webkit-line-clamp'] = String(props.lineClamp)
  }

  if (props.gradient.from && props.gradient.to) {
    style.background = `linear-gradient(to right, ${props.gradient.from}, ${props.gradient.to})`
    style['-webkit-background-clip'] = 'text'
    style['background-clip'] = 'text'
    style['-webkit-text-fill-color'] = 'transparent'
    style.color = 'transparent'
  }

  return style
})
</script>

<style lang="scss">
.m-text {
  font-size: var(--mosaic-font-size);
  color: var(--mosaic-text-regular);

  &--default {
    color: var(--mosaic-text-regular);
  }

  &--primary {
    color: var(--mosaic-primary);
  }

  &--success {
    color: var(--mosaic-success);
  }

  &--info {
    color: var(--mosaic-info);
  }

  &--warning {
    color: var(--mosaic-warning);
  }

  &--danger {
    color: var(--mosaic-danger);
  }

  &--truncated {
    display: block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &--line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
