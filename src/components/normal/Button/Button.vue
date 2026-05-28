<template>
  <button :class="classes" :style="customStyle" :disabled="disabled || loading" @click="handleClick">
    <span v-if="loading" class="m-button__loading">...</span>
    <span class="m-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MButton' })

type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
type ButtonSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  type?: ButtonType       // 按钮类型，决定颜色风格
  size?: ButtonSize       // 按钮尺寸
  width?: string          // 自定义宽度，如 "100px"、"50%"
  height?: string         // 自定义高度，如 "40px"
  plain?: boolean         // 是否为朴素按钮（背景透明）
  round?: boolean         // 是否为圆角按钮
  disabled?: boolean      // 是否禁用
  loading?: boolean       // 是否显示加载状态
}>(), {
  type: 'default',
  size: 'default',
  width: '',
  height: '',
  plain: false,
  round: false,
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const classes = computed(() => [
  'm-button',
  `m-button--${props.type}`,
  `m-button--${props.size}`,
  {
    'm-button--plain': props.plain,
    'm-button--round': props.round,
    'm-button--disabled': props.disabled,
    'm-button--loading': props.loading,
  },
])

const customStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) style.width = props.width
  if (props.height) style.height = props.height
  return style
})

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<style>
.m-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  height: 32px;
  padding: 8px 16px;
  font-size: var(--mosaic-font-size);
  border: 1px solid var(--mosaic-border-color);
  border-radius: var(--mosaic-border-radius);
  background-color: #fff;
  color: var(--mosaic-text-regular);
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  user-select: none;
}

.m-button:hover {
  background-color: rgba(167, 139, 250, 0.08);
}

.m-button--primary {
  color: #fff;
  background-color: var(--mosaic-primary);
  border-color: var(--mosaic-primary);
}
.m-button--primary:hover {
  background-color: rgba(167, 139, 250, 0.85);
  border-color: rgba(167, 139, 250, 0.85);
}

.m-button--success {
  color: #fff;
  background-color: var(--mosaic-success);
  border-color: var(--mosaic-success);
}
.m-button--success:hover {
  background-color: rgba(103, 194, 58, 0.85);
  border-color: rgba(103, 194, 58, 0.85);
}

.m-button--warning {
  color: #fff;
  background-color: var(--mosaic-warning);
  border-color: var(--mosaic-warning);
}
.m-button--warning:hover {
  background-color: rgba(230, 162, 60, 0.85);
  border-color: rgba(230, 162, 60, 0.85);
}

.m-button--danger {
  color: #fff;
  background-color: var(--mosaic-danger);
  border-color: var(--mosaic-danger);
}
.m-button--danger:hover {
  background-color: rgba(245, 108, 108, 0.85);
  border-color: rgba(245, 108, 108, 0.85);
}

.m-button--info {
  color: #fff;
  background-color: var(--mosaic-info);
  border-color: var(--mosaic-info);
}
.m-button--info:hover {
  background-color: rgba(144, 147, 153, 0.85);
  border-color: rgba(144, 147, 153, 0.85);
}

.m-button--small {
  height: 24px;
  padding: 4px 12px;
  font-size: var(--mosaic-font-size-sm);
}

.m-button--large {
  height: 40px;
  padding: 12px 20px;
  font-size: var(--mosaic-font-size-lg);
}

.m-button--round {
  border-radius: 20px;
}

.m-button--plain {
  background-color: transparent;
}

.m-button--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.m-button--loading {
  cursor: wait;
}
</style>