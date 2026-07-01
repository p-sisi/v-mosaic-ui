<template>
  <!-- 有过渡动画 -->
  <transition
    v-if="!disableTransitions"
    name="m-tag-zoom"
    @after-leave="handleAfterLeave"
  >
    <span v-if="visible" :class="classes" :style="customStyle" @click="handleClick">
      <template v-if="editable">
        <input
          ref="inputRef"
          v-model="inputValue"
          class="m-tag__input"
          :placeholder="placeholder"
          @keydown.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
      </template>
      <template v-else>
        <span class="m-tag__content">
          <slot />
        </span>
        <span v-if="closable" class="m-tag__close" @click.stop="handleClose">
          <svg class="m-tag__close-icon" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L12 12M12 2L2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>
        </span>
      </template>
    </span>
  </transition>

  <!-- 无过渡动画 -->
  <span v-else-if="visible" :class="classes" :style="customStyle" @click="handleClick">
    <template v-if="editable">
      <input
        ref="inputRef"
        v-model="inputValue"
        class="m-tag__input"
        :placeholder="placeholder"
        @keydown.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
    </template>
    <template v-else>
      <span class="m-tag__content">
        <slot />
      </span>
      <span v-if="closable" class="m-tag__close" @click.stop="handleClose">
        <svg class="m-tag__close-icon" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L12 12M12 2L2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>
      </span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'MTag' })

type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
type TagSize = 'small' | 'default' | 'large'
type TagEffect = 'dark' | 'light' | 'plain'

const props = withDefaults(defineProps<{
  type?: TagType                // 标签类型，决定颜色风格
  closable?: boolean            // 是否可关闭
  disableTransitions?: boolean  // 是否禁用过渡动画
  noBorder?: boolean            // 是否无描边，可与 dark/light/plain 共用
  color?: string                // 自定义标签颜色
  size?: TagSize                // 标签尺寸
  effect?: TagEffect            // 标签风格，dark/轻色/朴素
  round?: boolean               // 是否为圆角样式
  editable?: boolean            // 是否为输入式标签
  placeholder?: string          // 输入式标签的占位文本
}>(), {
  type: 'default',
  closable: false,
  disableTransitions: false,
  noBorder: false,
  color: '',
  size: 'default',
  effect: 'light',
  round: false,
  editable: false,
  placeholder: '新标签',
})

const emit = defineEmits<{
  close: []
  click: [event: MouseEvent]
  confirm: [value: string]
}>()

const visible = ref(true)
const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const classes = computed(() => [
  'm-tag',
  `m-tag--${props.type}`,
  `m-tag--${props.size}`,
  `m-tag--${props.effect}`,
  {
    'm-tag--no-border': props.noBorder,
    'm-tag--closable': props.closable,
    'm-tag--round': props.round,
    'm-tag--editable': props.editable,
  },
])

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace(/^#/, '')
  const full = m.length === 3
    ? m.split('').map(c => c + c).join('')
    : m
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  }
}

const customStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    const rgb = hexToRgb(props.color)
    if (props.effect === 'dark') {
      style.backgroundColor = props.color
      style.borderColor = props.color
      style.color = '#fff'
    } else if (props.effect === 'plain') {
      style.backgroundColor = 'transparent'
      style.borderColor = props.color
      style.color = props.color
    } else {
      if (rgb) {
        style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`
        style.borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`
      } else {
        style.backgroundColor = props.color
        style.borderColor = props.color
      }
      style.color = props.color
    }
  }
  return style
})

function handleClose() {
  if (props.disableTransitions) {
    emit('close')
  } else {
    visible.value = false
  }
}

function handleAfterLeave() {
  emit('close')
}

function handleClick(event: MouseEvent) {
  emit('click', event)
}

function handleInputConfirm() {
  const value = inputValue.value.trim()
  if (value) {
    emit('confirm', value)
    inputValue.value = ''
  }
}
</script>

<style lang="scss">
.m-tag-zoom-enter-active,
.m-tag-zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: center center;
}

.m-tag-zoom-enter-from,
.m-tag-zoom-leave-to {
  opacity: 0;
  transform: scale(0.6) translateX(-10px);
}

.m-tag {
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  padding: 0 8px;
  box-sizing: border-box;
  white-space: nowrap;
  line-height: 1;
  height: 24px;
  font-size: var(--mosaic-font-size-sm);
  border: 1px solid transparent;
  transition: all var(--mosaic-transition-duration-fast);

  /* === Size === */
  &--small {
    height: 20px;
    padding: 0 6px;
    font-size: 11px;
  }

  &--large {
    height: 32px;
    padding: 0 10px;
    font-size: var(--mosaic-font-size);
  }

  /* === Effect: light === */
  &--light {
    background-color: var(--mosaic-fill-color-light);
    border-color: var(--mosaic-border-color-lighter);
    color: var(--mosaic-text-regular);
  }

  &--default.m-tag--light {
    background-color: var(--mosaic-fill-color-light);
    border-color: var(--mosaic-border-color-lighter);
    color: var(--mosaic-text-regular);
  }

  &--primary.m-tag--light {
    background-color: rgba(167, 139, 250, 0.1);
    border-color: rgba(167, 139, 250, 0.2);
    color: var(--mosaic-primary);
  }

  &--success.m-tag--light {
    background-color: rgba(103, 194, 58, 0.1);
    border-color: rgba(103, 194, 58, 0.2);
    color: var(--mosaic-success);
  }

  &--warning.m-tag--light {
    background-color: rgba(230, 162, 60, 0.1);
    border-color: rgba(230, 162, 60, 0.2);
    color: var(--mosaic-warning);
  }

  &--danger.m-tag--light {
    background-color: rgba(245, 108, 108, 0.1);
    border-color: rgba(245, 108, 108, 0.2);
    color: var(--mosaic-danger);
  }

  &--info.m-tag--light {
    background-color: rgba(144, 147, 153, 0.1);
    border-color: rgba(144, 147, 153, 0.2);
    color: var(--mosaic-info);
  }

  /* === Effect: dark === */
  &--dark {
    color: #fff;
  }

  &--default.m-tag--dark {
    background-color: var(--mosaic-text-regular);
    border-color: var(--mosaic-text-regular);
    color: #fff;
  }

  &--primary.m-tag--dark {
    background-color: var(--mosaic-primary);
    border-color: var(--mosaic-primary);
    color: #fff;
  }

  &--success.m-tag--dark {
    background-color: var(--mosaic-success);
    border-color: var(--mosaic-success);
    color: #fff;
  }

  &--warning.m-tag--dark {
    background-color: var(--mosaic-warning);
    border-color: var(--mosaic-warning);
    color: #fff;
  }

  &--danger.m-tag--dark {
    background-color: var(--mosaic-danger);
    border-color: var(--mosaic-danger);
    color: #fff;
  }

  &--info.m-tag--dark {
    background-color: var(--mosaic-info);
    border-color: var(--mosaic-info);
    color: #fff;
  }

  /* === Effect: plain === */
  &--plain {
    background-color: transparent;
  }

  &--default.m-tag--plain {
    border-color: var(--mosaic-border-color);
    color: var(--mosaic-text-regular);
  }

  &--primary.m-tag--plain {
    border-color: rgba(167, 139, 250, 0.5);
    color: var(--mosaic-primary);
  }

  &--success.m-tag--plain {
    border-color: rgba(103, 194, 58, 0.5);
    color: var(--mosaic-success);
  }

  &--warning.m-tag--plain {
    border-color: rgba(230, 162, 60, 0.5);
    color: var(--mosaic-warning);
  }

  &--danger.m-tag--plain {
    border-color: rgba(245, 108, 108, 0.5);
    color: var(--mosaic-danger);
  }

  &--info.m-tag--plain {
    border-color: rgba(144, 147, 153, 0.5);
    color: var(--mosaic-info);
  }

  /* === No Border === */
  &--no-border {
    border-color: transparent !important;
  }

  /* === Round === */
  &--round {
    border-radius: 999px;
  }

  /* === Editable (输入式标签) === */
  &--editable {
    padding: 0;
    cursor: text;
  }

  &__input {
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    padding: 0 8px;
    height: 100%;
    width: 80px;
    box-sizing: border-box;
    line-height: 1;

    &::placeholder {
      color: var(--mosaic-text-placeholder, #c0c4cc);
    }
  }

  /* === Closable === */
  &__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    cursor: pointer;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    line-height: 1;
    transition: all var(--mosaic-transition-duration-fast);

    &-icon {
      width: 10px;
      height: 10px;
    }

    &:hover {
      color: var(--mosaic-text-primary);
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
