<template>
  <Transition name="m-notification-fade" @after-leave="handleDestroy">
    <div :class="classes" :style="styles" v-show="visible" @mouseenter="clearTimer" @mouseleave="startTimer" @click="handleClick">
      <span v-if="type" class="m-notification__icon">
        <svg v-if="type === 'success'" viewBox="0 0 1024 1024" width="20" height="20"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.3 0 19.9 5 25.9 13.3l71.2 98.8 157.2-218c6-8.4 15.7-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/></svg>
        <svg v-else-if="type === 'warning'" viewBox="0 0 1024 1024" width="20" height="20"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/></svg>
        <svg v-else-if="type === 'error'" viewBox="0 0 1024 1024" width="20" height="20"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 358.5c-1.2-1.5-1.9-3.4-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 463.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130.1 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/></svg>
        <svg v-else viewBox="0 0 1024 1024" width="20" height="20"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/></svg>
      </span>
      <div class="m-notification__content">
        <div v-if="title" class="m-notification__title">{{ title }}</div>
        <div v-if="!dangerouslyUseHTMLString" class="m-notification__message">{{ message }}</div>
        <div v-else class="m-notification__message" v-html="message"></div>
      </div>
      <span v-if="showClose" class="m-notification__close" @click.stop="handleClose">
        <svg viewBox="0 0 1024 1024" width="14" height="14"><path fill="currentColor" d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg>
      </span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'MNotification' })

type NotificationType = 'success' | 'warning' | 'info' | 'error'
type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

const props = withDefaults(defineProps<{
  title?: string                     // 标题
  message?: string                   // 消息内容
  type?: NotificationType            // 通知类型
  dangerouslyUseHTMLString?: boolean // 是否将 message 作为 HTML 片段处理
  position?: NotificationPosition    // 显示位置
  customClass?: string               // 自定义类名
  offset?: number                    // 偏移量
  showClose?: boolean                // 是否显示关闭按钮
  duration?: number                  // 显示时间(ms)，设为 0 则不会自动关闭
  clickHandler?: () => void             // 点击通知时的回调
  closeHandler?: () => void             // 关闭时的回调
  id?: string                        // 通知唯一标识
}>(), {
  title: '',
  message: '',
  type: 'info',
  dangerouslyUseHTMLString: false,
  position: 'top-right',
  customClass: '',
  offset: 0,
  showClose: true,
  duration: 4500,
  clickHandler: undefined,
  closeHandler: undefined,
  id: '',
})

const emit = defineEmits<{
  close: []
  destroy: []
}>()

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const classes = computed(() => [
  'm-notification',
  `m-notification--${props.position}`,
  `m-notification--${props.type}`,
  props.customClass,
])

const styles = computed(() => {
  const style: Record<string, string | number> = {}
  // Offset will be applied via the service by managing vertical stacking
  if (props.position.startsWith('top')) {
    style.top = `${props.offset}px`
  } else {
    style.bottom = `${props.offset}px`
  }
  return style
})

function startTimer() {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      handleClose()
    }, props.duration)
  }
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function handleClose() {
  visible.value = false
  emit('close')
  props.closeHandler?.()
}

function handleDestroy() {
  emit('destroy')
}

function handleClick() {
  props.clickHandler?.()
}

onMounted(() => {
  visible.value = true
  startTimer()
})

onUnmounted(() => {
  clearTimer()
})
</script>

<style lang="scss">
.m-notification {
  position: fixed;
  width: 330px;
  padding: 14px 26px 14px 16px;
  display: flex;
  align-items: flex-start;
  border-radius: 4px;
  box-shadow: var(--mosaic-box-shadow-light);
  background: #fff;
  z-index: var(--mosaic-z-index-overlay);
  pointer-events: all;
  transition: opacity var(--mosaic-transition-duration-fast) ease, transform var(--mosaic-transition-duration-fast) ease;
  box-sizing: border-box;

  /* Position */
  &--top-right {
    right: 16px;
  }

  &--top-left {
    left: 16px;
  }

  &--bottom-right {
    right: 16px;
  }

  &--bottom-left {
    left: 16px;
  }

  &__icon {
    flex-shrink: 0;
    margin-right: 12px;
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  &--success .m-notification__icon {
    color: var(--mosaic-success);
  }

  &--warning .m-notification__icon {
    color: var(--mosaic-warning);
  }

  &--error .m-notification__icon {
    color: var(--mosaic-danger);
  }

  &--info .m-notification__icon {
    color: var(--mosaic-info);
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: var(--mosaic-font-size);
    font-weight: 600;
    color: var(--mosaic-text-primary);
    line-height: 1.4;
    margin-bottom: 6px;
  }

  &__message {
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-regular);
    line-height: 1.5;
    word-break: break-word;
  }

  &__close {
    flex-shrink: 0;
    margin-left: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: var(--mosaic-text-secondary);
    transition: color var(--mosaic-transition-duration-fast);

    &:hover {
      color: var(--mosaic-text-primary);
    }
  }
}

/* Transition */
.m-notification-fade {
  &-enter-active {
    transition: opacity var(--mosaic-transition-duration-fast) ease, transform var(--mosaic-transition-duration-fast) ease;
  }
  &-leave-active {
    transition: opacity var(--mosaic-transition-duration-fast) ease, transform var(--mosaic-transition-duration-fast) ease;
  }
}

.m-notification--top-right.m-notification-fade {
  &-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }
  &-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
}

.m-notification--top-left.m-notification-fade {
  &-enter-from {
    opacity: 0;
    transform: translateX(-100%);
  }
  &-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
}

.m-notification--bottom-right.m-notification-fade {
  &-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }
  &-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
}

.m-notification--bottom-left.m-notification-fade {
  &-enter-from {
    opacity: 0;
    transform: translateX(-100%);
  }
  &-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
}
</style>