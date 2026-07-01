<template>
  <div class="m-tooltip__reference" ref="referenceRef" v-bind="triggerEvents" :tabindex="tabindex">
    <slot />
  </div>
  <Teleport to="body">
    <Transition :name="transition">
      <div
        v-show="popperVisible"
        ref="popperRef"
        class="m-tooltip__popper m-popper"
        :class="[`m-tooltip__popper--${effect}`, popperClass]"
        :style="popperStyle"
        @mouseenter="onPopperMouseEnter"
        @mouseleave="onPopperMouseLeave"
      >
        {{ content }}
        <div v-if="visibleArrow" ref="arrowRef" class="m-popper__arrow"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { usePopper } from '../../../hooks/usePopper'
import { useZIndex } from '../../../hooks/useZIndex'

defineOptions({ name: 'MTooltip' })

type TooltipEffect = 'dark' | 'light'

const props = withDefaults(defineProps<{
  modelValue?: boolean              // 是否显示（v-model）
  content?: string                  // 提示文本
  placement?: string                // 弹出位置
  effect?: TooltipEffect            // 主题样式，dark 深色背景，light 浅色背景
  offset?: number                   // 偏移量
  transition?: string               // 过渡动画名称
  showAfter?: number                // 延迟显示(ms)
  hideAfter?: number                // 延迟隐藏(ms)
  enterable?: boolean               // 鼠标是否可进入弹出层
  visibleArrow?: boolean            // 是否显示箭头
  popperClass?: string              // 弹出层自定义类名
  disabled?: boolean                // 是否禁用
  tabindex?: number                 // 触发元素 tabindex
}>(), {
  modelValue: false,
  content: '',
  placement: 'bottom',
  effect: 'dark',
  offset: 0,
  transition: 'm-fade-in-linear',
  showAfter: 0,
  hideAfter: 0,
  enterable: true,
  visibleArrow: true,
  popperClass: '',
  disabled: false,
  tabindex: 0,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const referenceRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

const { visible: popperVisible, show, hide, toggle, onReferenceMouseEnter, onReferenceMouseLeave, onPopperMouseEnter, onPopperMouseLeave } = usePopper(referenceRef, popperRef, arrowRef, {
  placement: props.placement as any,
  offset: props.offset,
  showArrow: props.visibleArrow,
  trigger: 'hover',
  showAfter: props.showAfter,
  hideAfter: props.hideAfter,
  disabled: props.disabled,
  enterable: props.enterable,
  autoDismiss: 3000,
})

const { nextZIndex } = useZIndex()

watch(popperVisible, (val) => {
  emit('update:modelValue', val)
})

watch(() => props.modelValue, (val) => {
  if (val) show()
  else hide()
})

const popperStyle = computed(() => ({
  zIndex: String(nextZIndex()),
}))

const triggerEvents = computed(() => ({
  onMouseenter: onReferenceMouseEnter,
  onMouseleave: onReferenceMouseLeave,
}))
</script>

<style lang="scss">
.m-tooltip {
  &__popper {
    padding: 6px 12px;
    font-size: var(--mosaic-font-size-sm);
    line-height: 1.4;
    max-width: 300px;
    word-wrap: break-word;

    &.m-tooltip__popper--dark {
      background-color: var(--mosaic-text-primary);
      color: #fff;
      border: none;

      .m-popper__arrow {
        background: var(--mosaic-text-primary);
      }
    }

    &.m-tooltip__popper--light {
      background-color: var(--mosaic-fill-color-blank);
      color: var(--mosaic-text-primary);
      border: 1px solid var(--mosaic-border-color-light);

      .m-popper__arrow {
        background: var(--mosaic-fill-color-blank);
      }
    }
  }

  &__reference {
    display: inline-block;
  }
}
</style>