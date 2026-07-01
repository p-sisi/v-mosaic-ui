<template>
  <Transition name="m-message-box-fade" @after-leave="onClosed">
    <div v-show="visible" class="m-message-box__wrapper" :style="{ zIndex }" @click.self="onWrapperClick">
      <div ref="messageBoxRef" class="m-message-box">
        <div class="m-message-box__header">
          <span class="m-message-box__title">{{ title }}</span>
          <button v-if="showClose" class="m-message-box__close" @click="handleAction('close')">
            <svg viewBox="0 0 1024 1024" width="14" height="14"><path fill="currentColor" d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg>
          </button>
        </div>
        <div class="m-message-box__content">
          <div class="m-message-box__message">
            <div v-if="!dangerouslyUseHTMLString">{{ message }}</div>
            <div v-else v-html="message"></div>
          </div>
          <div v-if="showInput" class="m-message-box__input">
            <input
              v-model="inputValue"
              class="m-message-box__input-inner"
              :placeholder="inputPlaceholder"
              @keyup.enter="handleAction('confirm')"
            />
            <div v-if="inputErrorMessage && showInputError" class="m-message-box__input-error">{{ inputErrorMessage }}</div>
          </div>
        </div>
        <div class="m-message-box__actions">
          <button
            v-if="showCancelButton"
            class="m-message-box__btn m-message-box__btn--cancel"
            :class="cancelButtonClass"
            @click="handleAction('cancel')"
          >
            {{ cancelButtonText }}
          </button>
          <button
            v-if="showConfirmButton"
            class="m-message-box__btn m-message-box__btn--confirm"
            :class="confirmButtonClass"
            @click="handleAction('confirm')"
          >
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
  <div v-if="visible" class="m-message-box__overlay" :style="{ zIndex: zIndex - 1 }" @click="onOverlayClick"></div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useZIndex } from '../../../hooks/useZIndex'
import { useFocusTrap } from '../../../hooks/useFocusTrap'
import { useLockScroll } from '../../../hooks/useLockScroll'

defineOptions({ name: 'MMessageBox' })

type MessageBoxType = 'success' | 'warning' | 'info' | 'error'

const props = withDefaults(defineProps<{
  type?: MessageBoxType                   // 消息类型
  title?: string                          // 标题
  message?: string                        // 消息内容
  confirmButtonText?: string              // 确认按钮文本
  cancelButtonText?: string               // 取消按钮文本
  showConfirmButton?: boolean             // 是否显示确认按钮
  showCancelButton?: boolean              // 是否显示取消按钮
  closeOnClickModal?: boolean             // 点击遮罩层是否关闭
  closeOnPressEscape?: boolean            // 按 ESC 是否关闭
  showClose?: boolean                     // 是否显示关闭按钮
  showInput?: boolean                     // 是否显示输入框
  inputPlaceholder?: string               // 输入框占位符
  inputPattern?: RegExp                   // 输入框正则校验
  inputValidator?: (value: string) => boolean | string  // 输入框校验函数
  inputErrorMessage?: string              // 输入框校验失败提示
  confirmButtonClass?: string             // 确认按钮自定义类名
  cancelButtonClass?: string              // 取消按钮自定义类名
  callback?: (action: string) => void     // 操作回调
  beforeClose?: (action: string, done: () => void) => void  // 关闭前回调
  dangerouslyUseHTMLString?: boolean      // 是否将 message 作为 HTML 片段处理
  distinguishCancelAndClose?: boolean     // 是否区分取消和关闭
}>(), {
  type: 'info',
  title: '',
  message: '',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  showInput: false,
  inputPlaceholder: '',
  inputPattern: undefined,
  inputValidator: undefined,
  inputErrorMessage: '',
  confirmButtonClass: '',
  cancelButtonClass: '',
  callback: undefined,
  beforeClose: undefined,
  dangerouslyUseHTMLString: false,
  distinguishCancelAndClose: false,
})

const emit = defineEmits<{
  action: [action: string]
}>()

const messageBoxRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const inputValue = ref('')
const showInputError = ref(false)

const { nextZIndex } = useZIndex()
const zIndex = ref(0)

let focusTrap: ReturnType<typeof useFocusTrap> | null = null
const { lock, unlock } = useLockScroll()

function onEscape(e: KeyboardEvent) {
  if (props.closeOnPressEscape && e.key === 'Escape' && visible.value) {
    handleAction('close')
  }
}

onMounted(() => {
  zIndex.value = nextZIndex()
  visible.value = true
  lock()
  document.addEventListener('keydown', onEscape)
  nextTick(() => {
    if (messageBoxRef.value) {
      focusTrap = useFocusTrap(messageBoxRef)
      focusTrap.activate()
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', onEscape)
  unlock()
  if (focusTrap) {
    focusTrap.deactivate()
    focusTrap = null
  }
})

function handleAction(action: string) {
  if (action === 'confirm' && props.showInput) {
    // Validate input
    let valid = true
    if (props.inputPattern) {
      valid = props.inputPattern.test(inputValue.value)
    }
    if (props.inputValidator) {
      const result = props.inputValidator(inputValue.value)
      if (typeof result === 'string') {
        valid = false
      } else {
        valid = result
      }
    }
    if (!valid) {
      showInputError.value = true
      return
    }
  }

  const actualAction = action === 'close' && !props.distinguishCancelAndClose ? 'cancel' : action

  if (props.beforeClose) {
    props.beforeClose(actualAction, () => {
      close()
      emit('action', actualAction)
    })
  } else {
    close()
    emit('action', actualAction)
  }
}

function close() {
  visible.value = false
  unlock()
}

function onWrapperClick() {
  // Empty
}

function onOverlayClick() {
  if (props.closeOnClickModal) {
    handleAction('close')
  }
}

function onClosed() {
  // Cleanup handled in onUnmounted
}
</script>

<style lang="scss">
.m-message-box {
  background: #fff;
  border-radius: var(--mosaic-border-radius);
  box-shadow: var(--mosaic-box-shadow-base);
  width: 420px;
  max-width: 90vw;
  padding: 0;
  display: flex;
  flex-direction: column;

  &__overlay {
    position: fixed;
    inset: 0;
    background-color: var(--mosaic-overlay-color);
  }

  &__wrapper {
    position: fixed;
    inset: 0;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: var(--mosaic-z-index-overlay);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px 10px;
  }

  &__title {
    font-size: var(--mosaic-font-size-lg);
    font-weight: 600;
    color: var(--mosaic-text-primary);
    line-height: 1.4;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--mosaic-text-regular);
    border-radius: 4px;
    transition: background-color var(--mosaic-transition-duration-fast), color var(--mosaic-transition-duration-fast);

    &:hover {
      background-color: var(--mosaic-fill-color-light);
      color: var(--mosaic-text-primary);
    }
  }

  &__content {
    padding: 10px 20px 20px;
    color: var(--mosaic-text-regular);
    font-size: var(--mosaic-font-size);
    line-height: 1.5;
  }

  &__input {
    margin-top: 16px;
  }

  &__input-inner {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: 4px;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
    outline: none;
    box-sizing: border-box;
    transition: border-color var(--mosaic-transition-duration-fast);

    &:focus {
      border-color: var(--mosaic-primary);
    }
  }

  &__input-error {
    margin-top: 4px;
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-danger);
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    padding: 12px 20px 16px;
    gap: 10px;
  }

  &__btn {
    padding: 8px 20px;
    border-radius: 4px;
    font-size: var(--mosaic-font-size);
    cursor: pointer;
    border: 1px solid var(--mosaic-border-color);
    transition: background-color var(--mosaic-transition-duration-fast), border-color var(--mosaic-transition-duration-fast), color var(--mosaic-transition-duration-fast);

    &--cancel {
      background: #fff;
      color: var(--mosaic-text-regular);

      &:hover {
        color: var(--mosaic-primary);
        border-color: var(--mosaic-primary);
      }
    }

    &--confirm {
      background: var(--mosaic-primary);
      color: #fff;
      border-color: var(--mosaic-primary);

      &:hover {
        opacity: 0.85;
      }
    }
  }
}

/* Transition */
.m-message-box-fade {
  &-enter-active {
    transition: opacity var(--mosaic-transition-duration) ease;
  }
  &-leave-active {
    transition: opacity var(--mosaic-transition-duration-fast) ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>