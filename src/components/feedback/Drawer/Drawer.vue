<template>
  <Teleport to="body" v-if="appendToBody">
    <Transition :name="transitionName" @after-enter="onOpened" @after-leave="onClosed">
      <div v-show="modelValue" class="m-drawer__wrapper" :style="{ zIndex }" @click.self="onWrapperClick">
        <div ref="drawerRef" :class="classes" :style="drawerStyle">
          <header v-if="withHeader" class="m-drawer__header">
            <span class="m-drawer__title">{{ title }}</span>
            <button v-if="showClose" class="m-drawer__close" @click="handleClose">
              <svg viewBox="0 0 1024 1024" width="14" height="14"><path fill="currentColor" d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg>
            </button>
          </header>
          <div class="m-drawer__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
    <div v-if="modal && modelValue" class="m-drawer__overlay" :style="{ zIndex: zIndex - 1 }" @click="onOverlayClick"></div>
  </Teleport>
  <template v-else>
    <Transition :name="transitionName" @after-enter="onOpened" @after-leave="onClosed">
      <div v-show="modelValue" class="m-drawer__wrapper" :style="{ zIndex }" @click.self="onWrapperClick">
        <div ref="drawerRef" :class="classes" :style="drawerStyle">
          <header v-if="withHeader" class="m-drawer__header">
            <span class="m-drawer__title">{{ title }}</span>
            <button v-if="showClose" class="m-drawer__close" @click="handleClose">
              <svg viewBox="0 0 1024 1024" width="14" height="14"><path fill="currentColor" d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg>
            </button>
          </header>
          <div class="m-drawer__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
    <div v-if="modal && modelValue" class="m-drawer__overlay" :style="{ zIndex: zIndex - 1 }" @click="onOverlayClick"></div>
  </template>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { usePopup } from '../../../hooks/usePopup'

defineOptions({ name: 'MDrawer' })

type DrawerDirection = 'ltr' | 'rtl' | 'ttb' | 'btt'

const props = withDefaults(defineProps<{
  modelValue?: boolean               // 是否显示 Drawer（v-model）
  title?: string                     // Drawer 标题
  size?: string | number             // Drawer 窗体大小，横向为宽度，纵向为高度
  direction?: DrawerDirection        // Drawer 打开的方向
  appendToBody?: boolean             // Drawer 是否插入至 body 元素
  modal?: boolean                    // 是否需要遮罩层
  lockScroll?: boolean               // 是否在 Drawer 出现时将 body 滚动锁定
  closeOnClickModal?: boolean        // 是否可以通过点击 modal 关闭 Drawer
  closeOnPressEscape?: boolean       // 是否可以通过按下 ESC 关闭 Drawer
  showClose?: boolean                // 是否显示关闭按钮
  withHeader?: boolean               // 是否显示页眉
  wrapperClosable?: boolean          // 点击遮罩层是否可以关闭 Drawer
  beforeClose?: () => boolean | Promise<boolean>  // 关闭前的回调，返回 false 可阻止关闭
  destroyOnClose?: boolean           // 关闭时销毁 Drawer 中的子元素
}>(), {
  modelValue: false,
  title: '',
  size: '30%',
  direction: 'rtl',
  appendToBody: false,
  modal: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  withHeader: true,
  wrapperClosable: true,
  destroyOnClose: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  opened: []
  close: []
  closed: []
}>()

const drawerRef = ref<HTMLElement | null>(null)

const visible = ref(props.modelValue)

const { zIndex, close: popupClose, onModalClick } = usePopup(visible, {
  modal: props.modal,
  closeOnClickModal: props.closeOnClickModal && props.wrapperClosable,
  closeOnPressEscape: props.closeOnPressEscape,
  lockScroll: props.lockScroll,
  beforeClose: props.beforeClose,
})

watch(visible, (val) => {
  emit('update:modelValue', val)
  if (val) emit('open')
  else emit('close')
})

watch(() => props.modelValue, (val) => {
  visible.value = val
})

const transitionName = computed(() => `m-drawer-${props.direction}`)

const classes = computed(() => [
  'm-drawer',
  `m-drawer--${props.direction}`,
])

const drawerStyle = computed(() => {
  const sizeVal = typeof props.size === 'number' ? `${props.size}px` : props.size
  const style: Record<string, string> = {}
  if (props.direction === 'ltr' || props.direction === 'rtl') {
    style.width = sizeVal
  } else {
    style.height = sizeVal
  }
  return style
})

function handleClose() {
  popupClose()
}

function onWrapperClick() {
  if (props.wrapperClosable) popupClose()
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
.m-drawer {
  position: absolute;
  background: #fff;
  box-shadow: var(--mosaic-box-shadow-base);
  display: flex;
  flex-direction: column;

  &__overlay {
    position: fixed;
    inset: 0;
    background-color: var(--mosaic-overlay-color);
    z-index: 2999;
  }

  &__wrapper {
    position: fixed;
    inset: 0;
    overflow: hidden;
    z-index: var(--mosaic-z-index-overlay);
  }

  /* Direction positioning */
  &--ltr {
    left: 0;
    top: 0;
    bottom: 0;
  }

  &--rtl {
    right: 0;
    top: 0;
    bottom: 0;
  }

  &--ttb {
    top: 0;
    left: 0;
    right: 0;
  }

  &--btt {
    bottom: 0;
    left: 0;
    right: 0;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--mosaic-border-color);
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
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    color: var(--mosaic-text-regular);
    font-size: var(--mosaic-font-size);
  }
}

/* Transitions */
.m-drawer-ltr {
  &-enter-active,
  &-leave-active {
    transition: transform var(--mosaic-transition-duration) ease;
  }
  &-enter-from,
  &-leave-to {
    transform: translateX(-100%);
  }
}

.m-drawer-rtl {
  &-enter-active,
  &-leave-active {
    transition: transform var(--mosaic-transition-duration) ease;
  }
  &-enter-from,
  &-leave-to {
    transform: translateX(100%);
  }
}

.m-drawer-ttb {
  &-enter-active,
  &-leave-active {
    transition: transform var(--mosaic-transition-duration) ease;
  }
  &-enter-from,
  &-leave-to {
    transform: translateY(-100%);
  }
}

.m-drawer-btt {
  &-enter-active,
  &-leave-active {
    transition: transform var(--mosaic-transition-duration) ease;
  }
  &-enter-from,
  &-leave-to {
    transform: translateY(100%);
  }
}
</style>