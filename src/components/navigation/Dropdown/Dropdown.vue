<template>
  <div
    ref="rootRef"
    class="m-dropdown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="splitButton">
      <div ref="triggerRef" class="m-dropdown__split-button">
        <button
          class="m-dropdown__main-button"
          :class="[`m-dropdown__main-button--${size}`, { 'm-dropdown__main-button--disabled': disabled }]"
          @click="handleMainClick"
        >
          <slot />
        </button>
        <button
          class="m-dropdown__caret-button"
          :class="{ 'm-dropdown__caret-button--disabled': disabled }"
          @click="handleCaretClick"
        >
          <span class="m-dropdown__caret-icon">&#9662;</span>
        </button>
      </div>
    </template>
    <template v-else>
      <div ref="triggerRef" class="m-dropdown__trigger" @click="handleTriggerClick">
        <slot />
      </div>
    </template>
    <Teleport to="body">
      <div
        v-show="visible"
        ref="popperRef"
        class="m-dropdown__popper"
        :style="popperStyle"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <slot name="dropdown" />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { usePopper } from '../../../hooks/usePopper'
import { useZIndex } from '../../../hooks/useZIndex'

defineOptions({ name: 'MDropdown' })

type DropdownSize = 'small' | 'default' | 'large'
type DropdownTrigger = 'hover' | 'click'

const props = withDefaults(defineProps<{
  modelValue?: boolean        // 是否显示下拉菜单，支持 v-model
  trigger?: DropdownTrigger   // 触发方式
  type?: string               // 按钮类型（splitButton 模式下）
  size?: DropdownSize         // 菜单尺寸
  splitButton?: boolean       // 是否为分裂式按钮
  hideOnClick?: boolean       // 点击菜单项后是否隐藏下拉菜单
  placement?: string          // 菜单弹出位置
  showTimeout?: number        // 展开下拉菜单的延迟（hover 模式下，毫秒）
  hideTimeout?: number        // 收起下拉菜单的延迟（hover 模式下，毫秒）
  disabled?: boolean          // 是否禁用
  color?: string              // 菜单项高亮颜色
}>(), {
  modelValue: false,
  trigger: 'hover',
  type: '',
  size: 'default',
  splitButton: false,
  hideOnClick: true,
  placement: 'bottom-end',
  showTimeout: 250,
  hideTimeout: 150,
  disabled: false,
  color: '',
})

const emit = defineEmits<{
  'update:modelValue': [visible: boolean]  // v-model 更新事件
  'visible-change': [visible: boolean]     // 下拉菜单显示/隐藏时触发
  'command': [command: string | number | object]  // 点击菜单项时触发
  'click': [event: MouseEvent]             // splitButton 主按钮点击时触发
}>()

const triggerRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const rootRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)
const visible = ref(props.modelValue)
const { nextZIndex } = useZIndex()

const popperStyle = computed(() => {
  const style: Record<string, string> = { zIndex: String(nextZIndex()) }
  if (props.color) {
    style['--m-dropdown-color'] = props.color
  }
  return style
})

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

watch(() => props.modelValue, (val) => {
  visible.value = val
})

watch(visible, (val) => {
  emit('update:modelValue', val)
  emit('visible-change', val)
  if (val) {
    nextTick(updatePopperPosition)
  }
})

provide('mDropdown', {
  dropdown: { visible },
  disabled: () => props.disabled,
  size: () => props.size,
  trigger: () => props.trigger,
  showTimeout: () => props.showTimeout,
  hideTimeout: () => props.hideTimeout,
  hideOnClick: () => props.hideOnClick,
  color: () => props.color,
  command: (cmd: string | number | object) => {
    emit('command', cmd)
    if (props.hideOnClick) {
      visible.value = false
    }
  },
})

function updatePopperPosition() {
  const referenceEl = triggerRef.value
  const popperEl = popperRef.value
  if (!referenceEl || !popperEl || !visible.value) return

  popperEl.style.position = 'absolute'
  popperEl.style.zIndex = String(nextZIndex())

  const rect = referenceEl.getBoundingClientRect()
  const popperRect = popperEl.getBoundingClientRect()

  let top = rect.bottom + window.scrollY
  let left = rect.right - popperRect.width + window.scrollX

  if (props.placement === 'bottom-start') {
    left = rect.left + window.scrollX
  } else if (props.placement === 'bottom') {
    left = rect.left + (rect.width - popperRect.width) / 2 + window.scrollX
  }

  popperEl.style.top = `${top}px`
  popperEl.style.left = `${left}px`
}

function showMenu() {
  if (props.disabled) return
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
  if (props.trigger === 'hover' && props.showTimeout > 0) {
    showTimer = setTimeout(() => { visible.value = true }, props.showTimeout)
  } else {
    visible.value = true
  }
}

function hideMenu() {
  if (showTimer) { clearTimeout(showTimer); showTimer = null }
  if (props.trigger === 'hover' && props.hideTimeout > 0) {
    hideTimer = setTimeout(() => { visible.value = false }, props.hideTimeout)
  } else {
    visible.value = false
  }
}

function handleMouseEnter() {
  if (props.trigger === 'hover') showMenu()
}

function handleMouseLeave() {
  if (props.trigger === 'hover') hideMenu()
}

function handleMainClick(event: MouseEvent) {
  if (props.disabled) return
  emit('click', event)
}

function handleTriggerClick() {
  if (props.disabled) return
  if (props.trigger === 'click') {
    visible.value = !visible.value
  }
}

function handleCaretClick() {
  if (props.disabled) return
  visible.value = !visible.value
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node
  if (
    (rootRef.value && rootRef.value.contains(target)) ||
    (popperRef.value && popperRef.value.contains(target))
  ) {
    return
  }
  visible.value = false
}

onMounted(() => {
  if (props.trigger === 'click') {
    document.addEventListener('click', handleDocumentClick)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
  if (showTimer) clearTimeout(showTimer)
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<style lang="scss">
.m-dropdown {
  display: inline-block;
  position: relative;
  color: var(--mosaic-text-regular);
  font-size: var(--mosaic-font-size);

  &__trigger {
    display: inline-flex;
    cursor: pointer;
  }

  &__popper {
    position: absolute;
    z-index: 2000;
  }

  &__split-button {
    display: inline-flex;
  }

  &__main-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    font-size: var(--mosaic-font-size);
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius) 0 0 var(--mosaic-border-radius);
    background-color: #fff;
    color: var(--mosaic-text-regular);
    cursor: pointer;
    transition: all var(--mosaic-transition-duration-fast);

    &:hover {
      color: var(--mosaic-primary);
      border-color: var(--mosaic-primary);
    }

    &--small {
      padding: 4px 12px;
      font-size: var(--mosaic-font-size-sm);
    }

    &--large {
      padding: 12px 20px;
      font-size: var(--mosaic-font-size-lg);
    }

    &--disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__caret-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 8px;
    font-size: var(--mosaic-font-size);
    border: 1px solid var(--mosaic-border-color);
    border-left: none;
    border-radius: 0 var(--mosaic-border-radius) var(--mosaic-border-radius) 0;
    background-color: #fff;
    color: var(--mosaic-text-regular);
    cursor: pointer;
    transition: all var(--mosaic-transition-duration-fast);

    &:hover {
      color: var(--mosaic-primary);
      border-color: var(--mosaic-primary);
    }

    &--disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__caret-icon {
    font-size: 12px;
    line-height: 1;
  }
}
</style>
