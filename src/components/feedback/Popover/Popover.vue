<template>
  <div class="m-popover__reference" ref="referenceRef" v-bind="triggerEvents">
    <slot />
  </div>
  <Teleport to="body">
    <Transition :name="transition" @after-enter="handleAfterEnter" @after-leave="handleAfterLeave">
      <div
        v-show="popperVisible"
        ref="popperRef"
        class="m-popover m-popper"
        :class="[popperClass, { 'm-popover--dark': dark }]"
        :style="popperStyle"
        @mouseenter="onPopperMouseEnter"
        @mouseleave="onPopperMouseLeave"
      >
        <div v-if="title" class="m-popover__title">{{ title }}</div>
        <div class="m-popover__content">
          <slot name="content">
            <template v-if="content">{{ content }}</template>
          </slot>
        </div>
        <div v-if="visibleArrow" ref="arrowRef" class="m-popper__arrow"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { usePopper } from '../../../hooks/usePopper'
import { useZIndex } from '../../../hooks/useZIndex'

defineOptions({ name: 'MPopover' })

type PopoverTrigger = 'click' | 'focus' | 'hover' | 'manual'

const props = withDefaults(defineProps<{
  modelValue?: boolean              // 是否显示弹出层（v-model）
  trigger?: PopoverTrigger          // 触发方式
  title?: string                    // 弹出层标题
  content?: string                  // 弹出层内容
  width?: number | string           // 弹出层宽度
  placement?: string                // 弹出层位置
  visibleArrow?: boolean            // 是否显示箭头
  offset?: number                   // 弹出层偏移量
  transition?: string               // 过渡动画名称
  popperClass?: string              // 弹出层自定义类名
  showAfter?: number                // 延迟显示(ms)
  hideAfter?: number                // 延迟隐藏(ms)
  enterable?: boolean               // 鼠标是否可进入弹出层
  disabled?: boolean                // 是否禁用
  dark?: boolean                    // 是否使用深色主题
}>(), {
  modelValue: false,
  trigger: 'click',
  title: '',
  content: '',
  width: 150,
  placement: 'right',
  visibleArrow: true,
  offset: 0,
  transition: 'm-fade-in-linear',
  popperClass: '',
  showAfter: 0,
  hideAfter: 0,
  enterable: true,
  disabled: false,
  dark: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  show: []
  hide: []
  afterEnter: []
  afterLeave: []
}>()

const referenceRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

const { visible: popperVisible, show, hide, toggle, onReferenceMouseEnter, onReferenceMouseLeave, onPopperMouseEnter, onPopperMouseLeave } = usePopper(referenceRef, popperRef, arrowRef, {
  placement: props.placement as any,
  offset: props.offset,
  showArrow: props.visibleArrow,
  trigger: props.trigger,
  showAfter: props.showAfter,
  hideAfter: props.hideAfter,
  popperClass: props.popperClass,
  disabled: props.disabled,
  enterable: props.enterable,
  autoDismiss: 3000,
})

const { nextZIndex } = useZIndex()

watch(popperVisible, (val) => {
  emit('update:modelValue', val)
  if (val) emit('show')
  else emit('hide')
})

watch(() => props.modelValue, (val) => {
  if (val) show()
  else hide()
})

const popperStyle = computed(() => {
  const style: Record<string, string> = {
    zIndex: String(nextZIndex()),
  }
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  return style
})

const triggerEvents = computed(() => {
  const events: Record<string, (...args: any[]) => void> = {}
  if (props.trigger === 'hover') {
    events.onMouseenter = onReferenceMouseEnter
    events.onMouseleave = onReferenceMouseLeave
  } else if (props.trigger === 'click') {
    events.onClick = toggle
  } else if (props.trigger === 'focus') {
    events.onFocus = show
    events.onBlur = hide
  }
  return events
})

function handleAfterEnter() {
  emit('afterEnter')
}

function handleAfterLeave() {
  emit('afterLeave')
}
</script>

<style lang="scss">
.m-popover {
  padding: 12px 16px;
  min-width: 120px;

  &__reference {
    display: inline-block;
  }

  &.m-popover--dark {
    background-color: var(--mosaic-text-primary);
    color: #fff;
    border: none;

    .m-popover__title {
      color: #fff;
    }

    .m-popover__content {
      color: rgba(255, 255, 255, 0.85);
    }

    .m-popper__arrow {
      background: var(--mosaic-text-primary);
    }
  }

  &__title {
    font-size: var(--mosaic-font-size);
    font-weight: 600;
    color: var(--mosaic-text-primary);
    margin-bottom: 8px;
    line-height: 1.4;
  }

  &__content {
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-regular);
    line-height: 1.5;
  }
}
</style>
