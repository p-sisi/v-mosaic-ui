<template>
  <div class="m-popconfirm__reference" ref="referenceRef" v-bind="triggerEvents">
    <slot />
  </div>
  <Teleport to="body">
    <Transition name="m-fade-in-linear">
      <div
        v-show="popperVisible"
        ref="popperRef"
        class="m-popconfirm m-popper"
        :style="popperStyle"
        @mouseenter="onPopperMouseEnter"
        @mouseleave="onPopperMouseLeave"
      >
        <div class="m-popconfirm__main">
          <span style="flex-shrink: 0; margin-right: 8px; margin-top: 1px;">
            <svg viewBox="0 0 1024 1024" width="16" height="16"><path fill="#e6a23c" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/></svg>
          </span>
          <span class="m-popconfirm__message">{{ title }}</span>
        </div>
        <div class="m-popconfirm__action">
          <button
            class="m-popconfirm__btn m-popconfirm__btn--cancel"
            :class="`m-popconfirm__btn--${cancelButtonType}`"
            @click="handleCancel"
          >
            {{ cancelButtonText }}
          </button>
          <button
            class="m-popconfirm__btn m-popconfirm__btn--confirm"
            :class="`m-popconfirm__btn--${confirmButtonType}`"
            @click="handleConfirm"
          >
            {{ confirmButtonText }}
          </button>
        </div>
        <div ref="arrowRef" class="m-popper__arrow"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { usePopper } from '../../../hooks/usePopper'
import { useZIndex } from '../../../hooks/useZIndex'

defineOptions({ name: 'MPopconfirm' })

type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'

const props = withDefaults(defineProps<{
  title?: string                          // 确认框标题文本
  confirmButtonText?: string              // 确认按钮文本
  cancelButtonText?: string               // 取消按钮文本
  confirmButtonType?: ButtonType          // 确认按钮类型
  cancelButtonType?: ButtonType           // 取消按钮类型
  width?: number | string                 // 弹出层宽度
}>(), {
  title: '',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  confirmButtonType: 'primary',
  cancelButtonType: 'default',
  width: 150,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const referenceRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

const { visible: popperVisible, show, hide, onReferenceMouseEnter, onReferenceMouseLeave, onPopperMouseEnter, onPopperMouseLeave } = usePopper(referenceRef, popperRef, arrowRef, {
  placement: 'top',
  trigger: 'click',
  offset: 8,
  showArrow: true,
})

const { nextZIndex } = useZIndex()

const popperStyle = computed(() => {
  const style: Record<string, string> = {
    zIndex: String(nextZIndex()),
  }
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  return style
})

const triggerEvents = computed(() => ({
  onClick: () => show(),
}))

function handleConfirm() {
  hide()
  emit('confirm')
}

function handleCancel() {
  hide()
  emit('cancel')
}
</script>

<style lang="scss">
.m-popconfirm {
  padding: 12px 16px;
  min-width: 120px;

  &__reference {
    display: inline-block;
  }

  &__main {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  &__message {
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
    line-height: 1.5;
  }

  &__action {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  &__btn {
    padding: 4px 12px;
    font-size: var(--mosaic-font-size-sm);
    border-radius: var(--mosaic-border-radius);
    cursor: pointer;
    transition: all var(--mosaic-transition-duration-fast);
    border: 1px solid var(--mosaic-border-color);
    background: var(--mosaic-fill-color-blank);
    color: var(--mosaic-text-regular);
    line-height: 1.5;

    &--default {
      background-color: var(--mosaic-fill-color-blank);
      color: var(--mosaic-text-regular);
      border-color: var(--mosaic-border-color);

      &:hover {
        color: var(--mosaic-primary);
        border-color: var(--mosaic-primary);
      }
    }

    &--primary {
      background-color: var(--mosaic-primary);
      color: #fff;
      border-color: var(--mosaic-primary);

      &:hover {
        background-color: rgba(167, 139, 250, 0.85);
      }
    }

    &--success {
      background-color: var(--mosaic-success);
      color: #fff;
      border-color: var(--mosaic-success);
    }

    &--warning {
      background-color: var(--mosaic-warning);
      color: #fff;
      border-color: var(--mosaic-warning);
    }

    &--danger {
      background-color: var(--mosaic-danger);
      color: #fff;
      border-color: var(--mosaic-danger);
    }

    &--info {
      background-color: var(--mosaic-info);
      color: #fff;
      border-color: var(--mosaic-info);
    }
  }
}
</style>
