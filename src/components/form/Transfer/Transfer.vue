<template>
  <div :class="classes" :style="rootStyle">
    <TransferPanel
      ref="leftPanelRef"
      :data="leftData"
      :title="titles[0]"
      :filterable="filterable"
      :filter-method="filterMethod"
      :placeholder="filterPlaceholder"
      :checked="leftChecked"
      :props="itemProps"
      :render-content="renderContent"
      :format="format"
      :default-checked="leftDefaultChecked"
      @update:checked="v => onPanelCheck('left', v)"
    >
      <template #default="scope">
        <slot v-bind="scope" />
      </template>
      <template v-if="$slots['left-footer']" #footer>
        <slot name="left-footer" />
      </template>
    </TransferPanel>

    <div class="m-transfer__buttons">
      <button
        type="button"
        class="m-transfer__button"
        :class="{ 'is-disabled': rightChecked.length === 0 }"
        :disabled="rightChecked.length === 0"
        @click="moveTo('left')"
      >
        <svg v-if="!buttonTexts.length" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg>
        <span v-else>{{ buttonTexts[0] }}</span>
      </button>
      <button
        type="button"
        class="m-transfer__button"
        :class="{ 'is-disabled': leftChecked.length === 0 }"
        :disabled="leftChecked.length === 0"
        @click="moveTo('right')"
      >
        <svg v-if="!buttonTexts.length" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
        <span v-else>{{ buttonTexts[1] }}</span>
      </button>
    </div>

    <TransferPanel
      ref="rightPanelRef"
      :data="rightData"
      :title="titles[1]"
      :filterable="filterable"
      :filter-method="filterMethod"
      :placeholder="filterPlaceholder"
      :checked="rightChecked"
      :props="itemProps"
      :render-content="renderContent"
      :format="format"
      :default-checked="rightDefaultChecked"
      @update:checked="v => onPanelCheck('right', v)"
    >
      <template #default="scope">
        <slot v-bind="scope" />
      </template>
      <template v-if="$slots['right-footer']" #footer>
        <slot name="right-footer" />
      </template>
    </TransferPanel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h as hFn } from 'vue'
import TransferPanel from './TransferPanel.vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MTransfer' })

type TransferItem = Record<string, any>

const props = withDefaults(defineProps<{
  modelValue?: any[]
  data?: TransferItem[]
  filterable?: boolean
  filterMethod?: (query: string, item: TransferItem) => boolean
  titles?: [string, string]
  buttonTexts?: [string, string]
  renderContent?: (h: typeof hFn, option: TransferItem) => any
  format?: { noChecked: string; hasChecked: string }
  filterPlaceholder?: string
  leftDefaultChecked?: any[]
  rightDefaultChecked?: any[]
  props?: { key: string; label: string; disabled: string }
  size?: 'small' | 'default' | 'large'
  height?: string | number
}>(), {
  modelValue: () => [],
  data: () => [],
  filterable: false,
  titles: () => ['列表 1', '列表 2'],
  buttonTexts: () => [],
  filterPlaceholder: '请输入搜索内容',
  leftDefaultChecked: () => [],
  rightDefaultChecked: () => [],
  props: () => ({ key: 'key', label: 'label', disabled: 'disabled' }),
  size: 'default',
  height: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: any[]]
  change: [value: any[], direction: 'left' | 'right', movedKeys: any[]]
  'left-check-change': [value: any[]]
  'right-check-change': [value: any[]]
}>()

const { effectiveSize } = useFormItem(props)

const itemProps = computed(() => ({
  key: props.props.key || 'key',
  label: props.props.label || 'label',
  disabled: props.props.disabled || 'disabled',
}))

const keyValue = (item: TransferItem) => item[itemProps.value.key]
const labelValue = (item: TransferItem) => item[itemProps.value.label]
const isDisabled = (item: TransferItem) => !!item[itemProps.value.disabled]

// modelValue 是右侧 keys
const rightKeys = computed<any[]>(() => {
  const arr = Array.isArray(props.modelValue) ? props.modelValue : []
  return arr
})

const leftData = computed<TransferItem[]>(() => {
  const rightSet = new Set(rightKeys.value.map(String))
  return props.data.filter(item => !rightSet.has(String(keyValue(item))))
})

const rightData = computed<TransferItem[]>(() => {
  const rightSet = new Set(rightKeys.value.map(String))
  return props.data.filter(item => rightSet.has(String(keyValue(item))))
})

const leftChecked = ref<any[]>([])
const rightChecked = ref<any[]>([])

function onPanelCheck(side: 'left' | 'right', val: any[]) {
  if (side === 'left') {
    leftChecked.value = val
    emit('left-check-change', val)
  } else {
    rightChecked.value = val
    emit('right-check-change', val)
  }
}

function moveTo(direction: 'left' | 'right') {
  // direction='right': 左勾选移到右；direction='left': 右勾选移到左
  if (direction === 'right') {
    if (leftChecked.value.length === 0) return
    const moved = [...leftChecked.value]
    const next = [...rightKeys.value, ...moved]
    emit('update:modelValue', next)
    emit('change', next, 'right', moved)
    leftChecked.value = []
  } else {
    if (rightChecked.value.length === 0) return
    const movedSet = new Set(rightChecked.value.map(String))
    const next = rightKeys.value.filter(k => !movedSet.has(String(k)))
    const moved = rightChecked.value
    emit('update:modelValue', next)
    emit('change', next, 'left', moved)
    rightChecked.value = []
  }
}

const classes = computed(() => [
  'm-transfer',
  `m-transfer--${effectiveSize.value}`,
])

const rootStyle = computed(() => {
  const h = props.height
  if (h === '' || h === undefined || h === null) return {}
  const px = typeof h === 'number' ? `${h}px` : h
  return { '--m-transfer-height': px }
})
</script>

<style lang="scss">
.m-transfer {
  display: flex;
  align-items: stretch;
  gap: 12px;

  &__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    align-self: center;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 32px;
    padding: 0 8px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    background-color: #fff;
    color: var(--mosaic-text-regular);
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(.is-disabled) {
      color: var(--mosaic-primary);
      border-color: var(--mosaic-primary);
    }

    &.is-disabled {
      color: var(--mosaic-disabled-text-color);
      border-color: var(--mosaic-disabled-border-color);
      cursor: not-allowed;
    }
  }
}
</style>
