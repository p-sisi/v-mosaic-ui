<template>
  <Teleport to="body" v-if="appendToBody">
    <Transition :name="transitionName" @after-enter="onOpened" @after-leave="onClosed">
      <div v-if="modelValue" class="m-dialog__wrapper" :style="{ zIndex }" @click.self="onWrapperClick">
        <div
          ref="dialogRef"
          :class="classes"
          :style="dialogStyle"
          @mousedown="onDragStart"
        >
          <div class="m-dialog__header" :class="{ 'm-dialog__header--no-divider': noDivider }">
            <span class="m-dialog__title">
              <slot name="title">{{ title }}</slot>
            </span>
            <button v-if="showClose" class="m-dialog__close" @click="handleClose">
              <svg viewBox="0 0 1024 1024" width="14" height="14"><path fill="currentColor" d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg>
            </button>
          </div>
          <div class="m-dialog__body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="m-dialog__footer" :class="{ 'm-dialog__footer--no-divider': noDivider }">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
    <div v-if="modal && modelValue" class="m-dialog__overlay" :style="{ zIndex: zIndex - 1 }" @click="onOverlayClick"></div>
  </Teleport>
  <template v-else>
    <Transition :name="transitionName" @after-enter="onOpened" @after-leave="onClosed">
      <div v-if="modelValue" class="m-dialog__wrapper" :style="{ zIndex }" @click.self="onWrapperClick">
        <div
          ref="dialogRef"
          :class="classes"
          :style="dialogStyle"
          @mousedown="onDragStart"
        >
          <div class="m-dialog__header" :class="{ 'm-dialog__header--no-divider': noDivider }">
            <span class="m-dialog__title">
              <slot name="title">{{ title }}</slot>
            </span>
            <button v-if="showClose" class="m-dialog__close" @click="handleClose">
              <svg viewBox="0 0 1024 1024" width="14" height="14"><path fill="currentColor" d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg>
            </button>
          </div>
          <div class="m-dialog__body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="m-dialog__footer" :class="{ 'm-dialog__footer--no-divider': noDivider }">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
    <div v-if="modal && modelValue" class="m-dialog__overlay" :style="{ zIndex: zIndex - 1 }" @click="onOverlayClick"></div>
  </template>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { usePopup } from '../../../hooks/usePopup'
import { useFocusTrap } from '../../../hooks/useFocusTrap'

defineOptions({ name: 'MDialog' })

const props = withDefaults(defineProps<{
  modelValue?: boolean               // 是否显示 Dialog（v-model）
  title?: string                     // Dialog 标题
  width?: string | number            // Dialog 宽度
  fullscreen?: boolean               // 是否全屏
  top?: string                       // Dialog CSS 中的 top 值
  modal?: boolean                    // 是否需要遮罩层
  appendToBody?: boolean             // Dialog 是否插入至 body 元素
  lockScroll?: boolean               // 是否在 Dialog 出现时将 body 滚动锁定
  closeOnClickModal?: boolean        // 是否可以通过点击 modal 关闭 Dialog
  closeOnPressEscape?: boolean       // 是否可以通过按下 ESC 关闭 Dialog
  showClose?: boolean                // 是否显示关闭按钮
  draggable?: boolean                // 是否可拖拽
  center?: boolean                   // 是否对头部和底部居中排列
  destroyOnClose?: boolean           // 关闭时销毁 Dialog 中的子元素
  noDivider?: boolean                // 是否隐藏标题下与底部上的分隔线
  beforeClose?: () => boolean | Promise<boolean>  // 关闭前的回调，返回 false 可阻止关闭
}>(), {
  modelValue: false,
  title: '',
  width: '50%',
  fullscreen: false,
  top: '',
  modal: true,
  appendToBody: false,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  draggable: false,
  center: false,
  destroyOnClose: false,
  noDivider: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  opened: []
  close: []
  closed: []
}>()

const dialogRef = ref<HTMLElement | null>(null)

const visible = ref(props.modelValue)

const { zIndex, close: popupClose, onModalClick } = usePopup(visible, {
  modal: props.modal,
  closeOnClickModal: props.closeOnClickModal,
  closeOnPressEscape: props.closeOnPressEscape,
  lockScroll: props.lockScroll,
  beforeClose: props.beforeClose,
})

let focusTrap: ReturnType<typeof useFocusTrap> | null = null

watch(visible, (val) => {
  emit('update:modelValue', val)
  if (val) {
    emit('open')
    nextTick(() => {
      if (dialogRef.value) {
        focusTrap = useFocusTrap(dialogRef)
        focusTrap.activate()
      }
    })
  } else {
    emit('close')
    if (focusTrap) {
      focusTrap.deactivate()
      focusTrap = null
    }
  }
})

watch(() => props.modelValue, (val) => {
  visible.value = val
})

const classes = computed(() => [
  'm-dialog',
  {
    'm-dialog--fullscreen': props.fullscreen,
    'm-dialog--center': props.center,
    'm-dialog--draggable': props.draggable,
  },
])

const transitionName = computed(() => props.fullscreen ? 'm-dialog-slide' : 'm-dialog-fade')

const dialogStyle = computed(() => {
  const style: Record<string, string> = {}
  if (!props.fullscreen) {
    if (typeof props.width === 'number') {
      style.width = `${props.width}px`
    } else {
      style.width = props.width
    }
    if (props.top) {
      style.marginTop = props.top
    }
  }
  return style
})

// Drag support
const dragOffset = ref({ x: 0, y: 0 })
const isDragging = ref(false)

function onDragStart(e: MouseEvent) {
  if (!props.draggable) return
  // Only drag from header area
  const target = e.target as HTMLElement
  if (!target.closest('.m-dialog__header')) return
  isDragging.value = true
  const dialogEl = dialogRef.value!
  const rect = dialogEl.getBoundingClientRect()
  dragOffset.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
}

function onDragMove(e: MouseEvent) {
  if (!isDragging.value || !dialogRef.value) return
  const left = e.clientX - dragOffset.value.x
  const top = e.clientY - dragOffset.value.y
  dialogRef.value.style.marginLeft = `${left}px`
  dialogRef.value.style.marginTop = `${top}px`
}

function onDragEnd() {
  isDragging.value = false
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
}

onUnmounted(() => {
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
})

function handleClose() {
  popupClose()
}

function onWrapperClick() {
  // Empty - wrapper click is handled by overlay
}

function onOverlayClick() {
  onModalClick()
}

function onOpened() {
  emit('opened')
}

function onClosed() {
  emit('closed')
}
</script>

<style lang="scss">
.m-dialog {
  position: relative;
  margin: auto;
  background: #fff;
  border-radius: var(--mosaic-border-radius);
  box-shadow: var(--mosaic-box-shadow-base);
  width: 50%;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 30vh);
  overflow: hidden;

  &__overlay {
    position: fixed;
    inset: 0;
    background-color: var(--mosaic-overlay-color);
    z-index: 2999;
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

  &--fullscreen {
    width: 100% !important;
    height: 100% !important;
    margin-top: 0 !important;
    margin-left: 0 !important;
    max-height: 100%;
    border-radius: 0;
  }

  &--draggable {
    cursor: default;

    .m-dialog__header {
      cursor: move;
    }
  }

  &--center {
    .m-dialog__header {
      justify-content: center;
    }

    .m-dialog__footer {
      justify-content: center;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--mosaic-border-color);

    &--no-divider {
      border-bottom: none;
    }
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

  &__body {
    padding: 20px;
    color: var(--mosaic-text-regular);
    font-size: var(--mosaic-font-size);
    overflow-y: auto;
    flex: 1;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    padding: 12px 20px;
    border-top: 1px solid var(--mosaic-border-color);

    &--no-divider {
      border-top: none;
    }
  }
}

/* Normal dialog: fade only */
.m-dialog-fade {
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

/* Fullscreen dialog: slide from top-left */
.m-dialog-slide {
  &-enter-active {
    transition: opacity var(--mosaic-transition-duration) ease, transform var(--mosaic-transition-duration) ease;
  }
  &-leave-active {
    transition: opacity var(--mosaic-transition-duration-fast) ease, transform var(--mosaic-transition-duration-fast) ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translate(-100%, -100%);
  }
}
</style>