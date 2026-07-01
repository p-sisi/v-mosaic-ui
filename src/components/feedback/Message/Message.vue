<template>
  <Transition name="m-fade-in" @after-leave="handleDestroy">
    <div :class="classes" :style="styles" v-show="visible" @mouseenter="clearTimer" @mouseleave="startTimer">
      <span v-if="!dangerouslyUseHTMLString && type" class="m-message__icon">
        <svg v-if="type === 'success'" viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.3 0 19.9 5 25.9 13.3l71.2 98.8 157.2-218c6-8.4 15.7-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/></svg>
        <svg v-else-if="type === 'warning'" viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/></svg>
        <svg v-else-if="type === 'error'" viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 358.5c-1.2-1.5-1.9-3.4-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 463.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130.1 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/></svg>
        <svg v-else viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/></svg>
      </span>
      <div v-if="!dangerouslyUseHTMLString" class="m-message__content">{{ message }}</div>
      <div v-else class="m-message__content" v-html="message"></div>
      <span v-if="showClose" class="m-message__close" @click="handleClose">
        <svg viewBox="0 0 1024 1024" width="12" height="12"><path fill="currentColor" d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg>
      </span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'MMessage' })

type MessageType = 'success' | 'warning' | 'info' | 'error'

const props = withDefaults(defineProps<{
  message?: string                   // 消息文本
  type?: MessageType                 // 消息类型
  showClose?: boolean                // 是否显示关闭按钮
  center?: boolean                   // 文字是否居中
  dangerouslyUseHTMLString?: boolean // 是否将 message 作为 HTML 片段处理
  closeHandler?: () => void             // 关闭时的回调
  duration?: number                  // 显示时间(ms)，设为 0 则不会自动关闭
  offset?: number                    // 距离顶部的偏移量
  id?: string                        // 消息唯一标识
}>(), {
  message: '',
  type: 'info',
  showClose: false,
  center: false,
  dangerouslyUseHTMLString: false,
  closeHandler: undefined,
  duration: 3000,
  offset: 20,
  id: '',
})

const emit = defineEmits<{
  close: []
  destroy: []
}>()

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const classes = computed(() => [
  'm-message',
  `m-message--${props.type}`,
  {
    'm-message--center': props.center,
    'm-message--closable': props.showClose,
  },
])

const styles = computed(() => ({
  top: `${props.offset}px`,
}))

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

onMounted(() => {
  visible.value = true
  startTimer()
})

onUnmounted(() => {
  clearTimer()
})
</script>

<style lang="scss">
.m-message {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  max-width: 380px;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-radius: 4px;
  box-shadow: var(--mosaic-box-shadow-light);
  font-size: var(--mosaic-font-size);
  line-height: 1.4;
  box-sizing: border-box;
  z-index: var(--mosaic-z-index-popper);
  pointer-events: all;
  transition: opacity var(--mosaic-transition-duration-fast) ease, transform var(--mosaic-transition-duration-fast) ease;

  &--center {
    justify-content: center;
  }

  &--success {
    background-color: #f0f9eb;
    border: 1px solid #e1f3d8;

    .m-message__icon {
      color: var(--mosaic-success);
    }
  }

  &--warning {
    background-color: #fdf6ec;
    border: 1px solid #faecd8;

    .m-message__icon {
      color: var(--mosaic-warning);
    }
  }

  &--error {
    background-color: #fef0f0;
    border: 1px solid #fde2e2;

    .m-message__icon {
      color: var(--mosaic-danger);
    }
  }

  &--info {
    background-color: #f4f4f5;
    border: 1px solid #e9e9eb;

    .m-message__icon {
      color: var(--mosaic-info);
    }
  }

  &__icon {
    flex-shrink: 0;
    margin-right: 8px;
    display: flex;
    align-items: center;
  }

  &__content {
    flex: 1;
    min-width: 0;
    color: var(--mosaic-text-primary);
    word-break: break-word;
  }

  &__close {
    flex-shrink: 0;
    margin-left: 12px;
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

/* m-fade-in transition */
.m-fade-in {
  &-enter-active {
    transition: opacity var(--mosaic-transition-duration-fast) ease, transform var(--mosaic-transition-duration-fast) ease;
  }
  &-leave-active {
    transition: opacity var(--mosaic-transition-duration-fast) ease, transform var(--mosaic-transition-duration-fast) ease;
  }
  &-enter-from {
    opacity: 0;
    transform: translateX(-50%) translateY(-100%);
  }
  &-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-100%);
  }
}
</style>