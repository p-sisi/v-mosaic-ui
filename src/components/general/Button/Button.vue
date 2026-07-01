<template>
  <button :class="classes" :style="customStyle" :disabled="disabled || loading" @click="handleClick">
    <span v-if="loading" class="m-button__loading"></span>
    <span class="m-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { buttonGroupKey } from '../ButtonGroup/constants'

defineOptions({ name: 'MButton' })

type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
type ButtonSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  type?: ButtonType       // 按钮类型，决定颜色风格
  size?: ButtonSize       // 按钮尺寸
  width?: string          // 自定义宽度，如 "100px"、"50%"
  height?: string         // 自定义高度，如 "40px"
  round?: boolean         // 是否为圆角按钮
  circle?: boolean        // 是否为圆形按钮（宽高相等，完全圆形）
  disabled?: boolean      // 是否禁用
  loading?: boolean       // 是否显示加载状态
  plain?: boolean         // 是否为朴素按钮（浅色背景，文字和边框跟随 type 颜色）
  noBorder?: boolean      // 是否去除朴素按钮的边框
  text?: boolean          // 是否为文本按钮（无边框无背景，仅文字）
  color?: string          // 自定义按钮颜色，如 "#8a2be2"，覆盖 type 颜色
  textPlain?: boolean     // 是否为文本朴素按钮（仅文字，hover 显示 #ecedeb 背景）
  dash?: boolean          // 是否为虚线按钮（边框变为虚线）
}>(), {
  type: 'default',
  size: undefined,
  width: '',
  height: '',
  round: false,
  circle: false,
  disabled: false,
  loading: false,
  plain: false,
  noBorder: false,
  text: false,
  color: '',
  textPlain: false,
  dash: false,
})

const buttonGroup = inject(buttonGroupKey, undefined)

const mergedSize = computed(() => props.size ?? buttonGroup?.size ?? 'default')

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const classes = computed(() => [
  'm-button',
  `m-button--${props.type}`,
  {
    'm-button--small': mergedSize.value === 'small',
    'm-button--large': mergedSize.value === 'large',
    'm-button--round': props.round,
    'm-button--circle': props.circle,
    'm-button--disabled': props.disabled,
    'm-button--loading': props.loading,
    'm-button--plain': props.plain,
    'm-button--no-border': props.noBorder,
    'm-button--text': props.text,
    'm-button--custom-color': props.color,
    'm-button--text-plain': props.textPlain,
    'm-button--dash': props.dash,
  },
])

const customStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) style.width = props.width
  if (props.height) style.height = props.height
  if (props.color) style['--m-button-color'] = props.color
  return style
})

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<style lang="scss">
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

  &--default:not(.m-button--disabled):not(.m-button--loading):hover {
    color: var(--mosaic-primary);
    border-color: var(--mosaic-primary);
    background-color: rgba(167, 139, 250, 0.08);
  }

  &--primary {
    color: #fff;
    background-color: var(--mosaic-primary);
    border-color: var(--mosaic-primary);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: #fff;
      background-color: rgba(167, 139, 250, 0.85);
      border-color: rgba(167, 139, 250, 0.85);
    }
  }

  &--success {
    color: #fff;
    background-color: var(--mosaic-success);
    border-color: var(--mosaic-success);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: #fff;
      background-color: rgba(103, 194, 58, 0.85);
      border-color: rgba(103, 194, 58, 0.85);
    }
  }

  &--warning {
    color: #fff;
    background-color: var(--mosaic-warning);
    border-color: var(--mosaic-warning);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: #fff;
      background-color: rgba(230, 162, 60, 0.85);
      border-color: rgba(230, 162, 60, 0.85);
    }
  }

  &--danger {
    color: #fff;
    background-color: var(--mosaic-danger);
    border-color: var(--mosaic-danger);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: #fff;
      background-color: rgba(245, 108, 108, 0.85);
      border-color: rgba(245, 108, 108, 0.85);
    }
  }

  &--info {
    color: #fff;
    background-color: var(--mosaic-info);
    border-color: var(--mosaic-info);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: #fff;
      background-color: rgba(144, 147, 153, 0.85);
      border-color: rgba(144, 147, 153, 0.85);
    }
  }

  &--default.m-button--plain {
    color: var(--mosaic-text-regular);
    background-color: #f5f5f5;
    border-color: var(--mosaic-border-color);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--mosaic-text-regular);
      background-color: rgba(144, 147, 153, 0.1);
      border-color: rgba(144, 147, 153, 0.5);
    }
  }

  &--primary.m-button--plain {
    color: var(--mosaic-primary);
    background-color: rgba(167, 139, 250, 0.1);
    border-color: rgba(167, 139, 250, 0.5);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--mosaic-primary);
      background-color: rgba(167, 139, 250, 0.2);
      border-color: var(--mosaic-primary);
    }
  }

  &--success.m-button--plain {
    color: var(--mosaic-success);
    background-color: rgba(103, 194, 58, 0.1);
    border-color: rgba(103, 194, 58, 0.5);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--mosaic-success);
      background-color: rgba(103, 194, 58, 0.2);
      border-color: var(--mosaic-success);
    }
  }

  &--warning.m-button--plain {
    color: var(--mosaic-warning);
    background-color: rgba(230, 162, 60, 0.1);
    border-color: rgba(230, 162, 60, 0.5);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--mosaic-warning);
      background-color: rgba(230, 162, 60, 0.2);
      border-color: var(--mosaic-warning);
    }
  }

  &--danger.m-button--plain {
    color: var(--mosaic-danger);
    background-color: rgba(245, 108, 108, 0.1);
    border-color: rgba(245, 108, 108, 0.5);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--mosaic-danger);
      background-color: rgba(245, 108, 108, 0.2);
      border-color: var(--mosaic-danger);
    }
  }

  &--info.m-button--plain {
    color: var(--mosaic-info);
    background-color: rgba(144, 147, 153, 0.1);
    border-color: rgba(144, 147, 153, 0.5);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--mosaic-info);
      background-color: rgba(144, 147, 153, 0.2);
      border-color: var(--mosaic-info);
    }
  }

  &--no-border.m-button--plain {
    border-color: transparent;

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      border-color: transparent;
    }
  }

  /* 通用 noBorder（不依赖 plain） */
  &.m-button--no-border {
    border-color: transparent;

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      border-color: transparent;
    }
  }

  &--text {
    border-color: transparent;
    background-color: transparent;

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      border-color: transparent;
      background-color: transparent;
    }
  }

  &--default.m-button--text {
    color: var(--mosaic-text-regular);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--mosaic-primary);
    }
  }

  &--primary.m-button--text {
    color: var(--mosaic-primary);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: rgba(167, 139, 250, 0.7);
    }
  }

  &--success.m-button--text {
    color: var(--mosaic-success);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: rgba(103, 194, 58, 0.7);
    }
  }

  &--warning.m-button--text {
    color: var(--mosaic-warning);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: rgba(230, 162, 60, 0.7);
    }
  }

  &--danger.m-button--text {
    color: var(--mosaic-danger);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: rgba(245, 108, 108, 0.7);
    }
  }

  &--info.m-button--text {
    color: var(--mosaic-info);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: rgba(144, 147, 153, 0.7);
    }
  }

  &--small {
    height: 24px;
    padding: 4px 12px;
    font-size: var(--mosaic-font-size-sm);
  }

  &--large {
    height: 40px;
    padding: 12px 20px;
    font-size: var(--mosaic-font-size-lg);
  }

  &--round {
    border-radius: 20px;
  }

  &--circle {
    border-radius: 50%;
    padding: 0;
    aspect-ratio: 1;
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--loading {
    cursor: default;
  }

  /* === 自定义颜色 (color prop) === */

  /* 实心按钮（非 default 类型） */
  &--custom-color:not(.m-button--default):not(.m-button--plain):not(.m-button--text) {
    background-color: var(--m-button-color);
    border-color: var(--m-button-color);
    color: #fff;

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      background-color: var(--m-button-color);
      border-color: var(--m-button-color);
      color: #fff;
      filter: brightness(1.1);
    }
  }

  /* default 类型自定义颜色 */
  &--default.m-button--custom-color:not(.m-button--plain):not(.m-button--text) {
    background-color: #fff;
    border-color: var(--m-button-color);
    color: var(--m-button-color);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      background-color: color-mix(in srgb, var(--m-button-color) 8%, white);
      border-color: var(--m-button-color);
      color: var(--m-button-color);
    }
  }

  /* 朴素按钮自定义颜色 */
  &--custom-color.m-button--plain {
    background-color: color-mix(in srgb, var(--m-button-color) 10%, white);
    border-color: color-mix(in srgb, var(--m-button-color) 50%, white);
    color: var(--m-button-color);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      background-color: color-mix(in srgb, var(--m-button-color) 20%, white);
      border-color: var(--m-button-color);
      color: var(--m-button-color);
    }
  }

  /* 无边框朴素自定义颜色 */
  &--custom-color.m-button--plain.m-button--no-border {
    border-color: transparent;

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      border-color: transparent;
    }
  }

  /* 自定义颜色通用 noBorder */
  &.m-button--custom-color.m-button--no-border {
    border-color: transparent;

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      border-color: transparent;
    }
  }

  /* 文本按钮自定义颜色 */
  &--custom-color.m-button--text {
    color: var(--m-button-color);
    border-color: transparent;
    background-color: transparent;

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--m-button-color);
      border-color: transparent;
      background-color: transparent;
      opacity: 0.7;
    }
  }

  /* === 文本朴素按钮 (text-plain prop) === */
  &--text-plain {
    border-color: transparent;
    background-color: transparent;

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      background-color: #ecedeb;
      border-color: transparent;
    }
  }

  &--default.m-button--text-plain {
    color: var(--mosaic-text-regular);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--mosaic-text-regular);
    }
  }

  &--primary.m-button--text-plain {
    color: var(--mosaic-primary);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--mosaic-primary);
    }
  }

  &--success.m-button--text-plain {
    color: var(--mosaic-success);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--mosaic-success);
    }
  }

  &--warning.m-button--text-plain {
    color: var(--mosaic-warning);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--mosaic-warning);
    }
  }

  &--danger.m-button--text-plain {
    color: var(--mosaic-danger);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--mosaic-danger);
    }
  }

  &--info.m-button--text-plain {
    color: var(--mosaic-info);

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--mosaic-info);
    }
  }

  /* 自定义颜色文本朴素按钮 */
  &--custom-color.m-button--text-plain {
    color: var(--m-button-color);
    border-color: transparent;
    background-color: transparent;

    &:not(.m-button--disabled):not(.m-button--loading):hover {
      color: var(--m-button-color);
      background-color: #ecedeb;
      border-color: transparent;
    }
  }

  /* === 虚线按钮 (dash prop) === */
  &--dash {
    border-style: dashed;
  }

  &__loading {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    margin-right: 6px;
    animation: m-button-spin 0.6s linear infinite;
  }
}

@keyframes m-button-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>