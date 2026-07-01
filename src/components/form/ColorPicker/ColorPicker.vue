<template>
  <div :class="classes" ref="wrapperRef">
    <div
      class="m-color-picker__trigger"
      :class="{ 'is-open': popperVisible }"
      @click="handleTriggerClick"
    >
      <span class="m-color-picker__swatch" :style="swatchStyle">
        <span v-if="!innerValue" class="m-color-picker__swatch-empty">{{ emptyText }}</span>
      </span>
      <span v-if="clearable && innerValue && !effectiveDisabled" class="m-color-picker__clear" @click.stop="handleClear">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </span>
      <span v-else class="m-color-picker__arrow" :class="{ 'is-open': popperVisible }">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>

    <Teleport to="body">
      <Transition name="m-fade-in-linear">
        <div
          v-show="popperVisible"
          ref="popperRef"
          class="m-color-picker__popper"
          :class="popperClass"
          :style="popperStyle"
        >
          <MColorPickerPanel
            v-model="innerValue"
            :show-alpha="showAlpha"
            :predefine="predefine"
            :disabled="false"
            :color-format="colorFormat"
            @change="handlePanelChange"
            @active-change="handlePanelActiveChange"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { usePopper } from '../../../hooks/usePopper'
import { useZIndex } from '../../../hooks/useZIndex'
import { useFormItem } from '../../../hooks/useFormItem'
import MColorPickerPanel from './ColorPickerPanel.vue'

defineOptions({ name: 'MColorPicker' })

const props = withDefaults(defineProps<{
  modelValue?: string
  showAlpha?: boolean
  predefine?: string[]
  disabled?: boolean
  colorFormat?: 'hex' | 'rgb'
  size?: 'small' | 'default' | 'large'
  clearable?: boolean
  placement?: string
  popperClass?: string
  emptyText?: string
}>(), {
  modelValue: '',
  showAlpha: false,
  predefine: () => [],
  disabled: false,
  colorFormat: 'hex',
  size: 'default',
  clearable: false,
  placement: 'bottom-start',
  popperClass: '',
  emptyText: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  activeChange: [value: string]
  show: []
  hide: []
  clear: []
}>()

const { effectiveDisabled, effectiveSize } = useFormItem(props)
const { nextZIndex } = useZIndex()

const wrapperRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

const innerValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  innerValue.value = val
})

watch(innerValue, (val) => {
  if (val !== props.modelValue) {
    emit('update:modelValue', val)
  }
})

const { visible: popperVisible, show, hide, toggle } = usePopper(
  wrapperRef,
  popperRef,
  arrowRef,
  {
    placement: props.placement as any,
    offset: 6,
    trigger: 'manual',
  }
)

watch(popperVisible, (val) => {
  emit(val ? 'show' : 'hide')
})

// ===== 点击外部关闭 =====
function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node
  if (popperVisible.value) {
    if (wrapperRef.value?.contains(target) || popperRef.value?.contains(target)) {
      return
    }
    hide()
  }
}

watch(popperVisible, (val) => {
  if (val) {
    setTimeout(() => document.addEventListener('click', handleDocumentClick), 0)
  } else {
    document.removeEventListener('click', handleDocumentClick)
  }
})

// ===== 触发器交互 =====
function handleTriggerClick() {
  if (effectiveDisabled.value) return
  toggle()
}

function handleClear() {
  innerValue.value = ''
  emit('clear')
  emit('change', '')
}

function handlePanelChange(val: string) {
  emit('change', val)
}

function handlePanelActiveChange(val: string) {
  emit('activeChange', val)
  // 用户在面板中提交输入或选择预设后关闭
  hide()
}

// ===== 样式计算 =====
const swatchStyle = computed(() => {
  if (!innerValue.value) {
    return { backgroundColor: 'transparent' }
  }
  // 内层已有棋盘格背景，rgba 颜色会自然叠加显示透明度
  return { backgroundColor: innerValue.value }
})

const popperStyle = computed(() => ({
  zIndex: String(nextZIndex()),
}))

const classes = computed(() => [
  'm-color-picker',
  `m-color-picker--${effectiveSize.value}`,
  {
    'm-color-picker--disabled': effectiveDisabled.value,
  },
])
</script>

<style lang="scss">
.m-color-picker {
  display: inline-block;
  vertical-align: middle;

  &__trigger {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0 6px 0 4px;
    background-color: #fff;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    cursor: pointer;
    box-sizing: border-box;
    transition: border-color 0.2s;
    user-select: none;

    &:hover {
      border-color: var(--mosaic-primary);
    }

    &.is-open {
      border-color: var(--mosaic-primary);
    }
  }

  &__swatch {
    position: relative;
    display: inline-block;
    border: 1px solid var(--mosaic-border-color);
    border-radius: 2px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__swatch-empty {
    position: relative;
    z-index: 1;
    font-size: 10px;
    color: var(--mosaic-text-placeholder, #999);
    line-height: 1;
  }

  &__clear,
  &__arrow {
    display: inline-flex;
    align-items: center;
    color: var(--mosaic-text-placeholder, #999);
    transition: transform 0.2s, color 0.2s;
  }

  &__clear:hover {
    color: var(--mosaic-text-regular);
  }

  &__arrow.is-open {
    transform: rotate(180deg);
  }

  /* 尺寸 */
  &--small {
    .m-color-picker__trigger {
      height: 24px;
    }
    .m-color-picker__swatch {
      width: 16px;
      height: 16px;
    }
  }

  &--default {
    .m-color-picker__trigger {
      height: 32px;
    }
    .m-color-picker__swatch {
      width: 22px;
      height: 22px;
    }
  }

  &--large {
    .m-color-picker__trigger {
      height: 40px;
    }
    .m-color-picker__swatch {
      width: 28px;
      height: 28px;
    }
  }

  /* 禁用 */
  &--disabled {
    .m-color-picker__trigger {
      background-color: var(--mosaic-disabled-bg-color);
      border-color: var(--mosaic-border-color-lighter);
      cursor: not-allowed;

      &:hover {
        border-color: var(--mosaic-border-color-lighter);
      }
    }

    .m-color-picker__swatch {
      filter: grayscale(1) opacity(0.5);
    }

    .m-color-picker__arrow {
      color: var(--mosaic-disabled-text-color);
    }
  }

  /* 弹出层 */
  &__popper {
    position: absolute;
    padding: 4px;
    background-color: #fff;
    border-radius: var(--mosaic-border-radius);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);

    .m-color-picker-panel {
      border: none;
    }
  }
}
</style>
