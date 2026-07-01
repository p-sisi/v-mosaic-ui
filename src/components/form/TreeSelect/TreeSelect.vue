<template>
  <div :class="classes" ref="wrapperRef">
    <div
      class="m-tree-select__trigger"
      :class="{
        'is-open': popperVisible,
        'is-empty': !hasValue,
        'is-focused': focused,
        'is-hover': hovered,
      }"
      @click="handleTriggerClick"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <span v-if="!hasValue" class="m-tree-select__placeholder">{{ placeholder }}</span>
      <span v-else class="m-tree-select__display">{{ displayLabel }}</span>

      <span
        v-if="clearable && hasValue && !effectiveDisabled && (hovered || focused)"
        class="m-tree-select__clear"
        @mousedown.prevent.stop="handleClear"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </span>
      <span v-else class="m-tree-select__suffix" :class="{ 'is-open': popperVisible }">
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
          class="m-tree-select__popper"
          :class="popperClass"
          :style="popperStyle"
        >
          <div v-if="filterable" class="m-tree-select__filter">
            <input
              ref="filterInputRef"
              v-model="filterQuery"
              class="m-tree-select__filter-input"
              type="text"
              placeholder="请输入关键字搜索"
              @input="handleFilterInput"
            />
          </div>
          <div class="m-tree-select__tree-wrap">
            <MTree
              ref="treeRef"
              :data="data"
              :node-key="nodeKey"
              :props="treeProps"
              :show-checkbox="showCheckbox || multiple"
              :check-strictly="checkStrictly"
              :default-expand-all="defaultExpandAll"
              :default-checked-keys="defaultCheckedKeys"
              :filter-node-method="resolvedFilterNodeMethod"
              :highlight-current="!multiple && !showCheckbox"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
              @check="handleCheck"
            >
              <template v-if="$slots.default" #default="scope">
                <slot v-bind="scope" />
              </template>
            </MTree>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import MTree from '../../data/Tree/Tree.vue'
import { usePopper } from '../../../hooks/usePopper'
import { useZIndex } from '../../../hooks/useZIndex'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MTreeSelect' })

const props = withDefaults(defineProps<{
  modelValue?: any
  data?: any[]
  multiple?: boolean
  showCheckbox?: boolean
  checkStrictly?: boolean
  disabled?: boolean
  size?: 'small' | 'default' | 'large'
  clearable?: boolean
  placeholder?: string
  filterable?: boolean
  filterMethod?: (query: string, data: any) => boolean
  filterNodeMethod?: (query: string, data: any, node: any) => boolean
  nodeKey?: string
  treeProps?: { label?: string; children?: string; isDisabled?: string; isLeaf?: string }
  placement?: string
  popperClass?: string
  defaultExpandAll?: boolean
}>(), {
  modelValue: '',
  data: () => [],
  multiple: false,
  showCheckbox: false,
  checkStrictly: false,
  disabled: false,
  size: 'default',
  clearable: false,
  placeholder: '请选择',
  filterable: false,
  nodeKey: 'key',
  treeProps: () => ({}),
  placement: 'bottom-start',
  popperClass: '',
  defaultExpandAll: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  change: [value: any]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
  show: []
  hide: []
}>()

const { effectiveDisabled, effectiveSize } = useFormItem(props)
const { nextZIndex } = useZIndex()

const wrapperRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)
const treeRef = ref<any>(null)
const filterInputRef = ref<HTMLInputElement | null>(null)
const filterQuery = ref('')

const focused = ref(false)
const hovered = ref(false)

const isCheckboxMode = computed(() => props.multiple || props.showCheckbox)

// MTree props 映射
const treeProps = computed(() => ({
  label: props.treeProps.label || 'label',
  children: props.treeProps.children || 'children',
  isDisabled: props.treeProps.isDisabled || 'disabled',
  isLeaf: props.treeProps.isLeaf || 'isLeaf',
}))

// 默认勾选 keys（用于初始化 MTree checkbox）
const defaultCheckedKeys = computed<any[]>(() => {
  if (!isCheckboxMode.value) return []
  return Array.isArray(props.modelValue) ? [...props.modelValue] : []
})

// resolvedFilterNodeMethod：优先用 filterNodeMethod，其次用 filterMethod 包装
const resolvedFilterNodeMethod = computed<any>(() => {
  if (props.filterNodeMethod) return props.filterNodeMethod
  if (props.filterMethod) {
    return (query: string, data: any) => props.filterMethod!(query, data)
  }
  return undefined
})

// ===== 值/显示 =====
const hasValue = computed(() => {
  if (isCheckboxMode.value) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  }
  return props.modelValue !== '' && props.modelValue !== undefined && props.modelValue !== null
})

// 在 data 中查找节点
function findNode(nodes: any[], key: any): any | null {
  for (const n of nodes) {
    const k = n[props.nodeKey]
    if (k === key) return n
    const children = n[treeProps.value.children]
    if (children && children.length) {
      const found = findNode(children, key)
      if (found) return found
    }
  }
  return null
}

function getLabel(item: any): string {
  const labelKey = treeProps.value.label
  if (typeof labelKey === 'function') return labelKey(item)
  return item[labelKey]
}

const displayLabel = computed(() => {
  if (!hasValue.value) return ''
  if (isCheckboxMode.value) {
    const arr = Array.isArray(props.modelValue) ? props.modelValue : []
    // 多选：取叶子 label（checkStrictly=false 时只显示叶子）
    const keys = arr
    const labels = keys.map(k => {
      const node = findNode(props.data, k)
      return node ? getLabel(node) : String(k)
    })
    return labels.join('，')
  }
  const node = findNode(props.data, props.modelValue)
  return node ? getLabel(node) : String(props.modelValue)
})

// ===== 交互 =====
function handleNodeClick(data: any, node: any) {
  if (isCheckboxMode.value) return
  if (node && node.isDisabled) return
  // 仅子节点可选（checkStrictly=false 时）—— 但单选场景，点击非叶子也允许选中
  const key = data[props.nodeKey]
  emit('update:modelValue', key)
  emit('change', key)
  hide()
}

function handleCheck(_data: any, _info: any) {
  if (!isCheckboxMode.value) return
  nextTick(() => {
    // checkStrictly=false 时只取叶子；true 时取全部
    const keys = treeRef.value?.getCheckedKeys?.(!props.checkStrictly) || []
    emit('update:modelValue', [...keys])
    emit('change', [...keys])
  })
}

function handleClear() {
  if (isCheckboxMode.value) {
    emit('update:modelValue', [])
    emit('change', [])
  } else {
    emit('update:modelValue', '')
    emit('change', '')
  }
  emit('clear')
}

function handleFilterInput() {
  treeRef.value?.filter?.(filterQuery.value)
}

// ===== Popper =====
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
  if (val) {
    nextTick(() => {
      // checkbox 模式同步勾选状态
      if (isCheckboxMode.value && treeRef.value?.setCheckedKeys) {
        const arr = Array.isArray(props.modelValue) ? props.modelValue : []
        treeRef.value.setCheckedKeys(arr)
      }
      if (props.filterable) {
        filterInputRef.value?.focus()
      }
    })
  } else {
    // 关闭时清空搜索
    filterQuery.value = ''
    focused.value = false
  }
})

function handleTriggerClick() {
  if (effectiveDisabled.value) return
  focused.value = true
  emit('focus', {} as FocusEvent)
  toggle()
}

// ===== 点击外部关闭 =====
function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node
  if (popperVisible.value) {
    if (wrapperRef.value?.contains(target) || popperRef.value?.contains(target)) {
      return
    }
    hide()
    emit('blur', {} as FocusEvent)
  }
}

watch(popperVisible, (val) => {
  if (val) {
    setTimeout(() => document.addEventListener('click', handleDocumentClick), 0)
  } else {
    document.removeEventListener('click', handleDocumentClick)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

const popperStyle = computed(() => ({
  zIndex: String(nextZIndex()),
}))

const classes = computed(() => [
  'm-tree-select',
  `m-tree-select--${effectiveSize.value}`,
  {
    'm-tree-select--disabled': effectiveDisabled.value,
  },
])
</script>

<style lang="scss">
.m-tree-select {
  display: inline-block;
  vertical-align: middle;

  &__trigger {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding: 0 8px;
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

    &.is-open,
    &.is-focused {
      border-color: var(--mosaic-primary);
    }
  }

  &__placeholder {
    flex: 1;
    color: var(--mosaic-text-placeholder);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__display {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
  }

  &__suffix,
  &__clear {
    display: inline-flex;
    align-items: center;
    color: var(--mosaic-text-placeholder);
    flex-shrink: 0;
    transition: color 0.2s, transform 0.2s;
  }

  &__suffix.is-open {
    transform: rotate(180deg);
    color: var(--mosaic-primary);
  }

  &__clear {
    cursor: pointer;
    color: var(--mosaic-text-placeholder);

    &:hover {
      color: var(--mosaic-text-regular);
    }
  }

  /* 尺寸 */
  &--small &__trigger {
    height: 24px;
    font-size: var(--mosaic-font-size-sm);
  }

  &--default &__trigger {
    height: 32px;
    min-width: 120px;
  }

  &--large &__trigger {
    height: 40px;
    font-size: var(--mosaic-font-size-lg);
  }

  /* 禁用 */
  &--disabled &__trigger {
    background-color: var(--mosaic-disabled-bg-color);
    border-color: var(--mosaic-disabled-border-color);
    cursor: not-allowed;

    &:hover {
      border-color: var(--mosaic-disabled-border-color);
    }
  }

  &--disabled &__display,
  &--disabled &__placeholder {
    color: var(--mosaic-disabled-text-color);
  }

  /* 弹出层 */
  &__popper {
    position: absolute;
    padding: 4px;
    background-color: #fff;
    border-radius: var(--mosaic-border-radius);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
    min-width: 220px;
    max-height: 320px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  &__filter {
    padding: 8px;
    border-bottom: 1px solid var(--mosaic-border-color-lighter);
  }

  &__filter-input {
    width: 100%;
    height: 28px;
    padding: 0 8px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: 4px;
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-primary);
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s;

    &:focus {
      border-color: var(--mosaic-primary);
    }
  }

  &__tree-wrap {
    overflow-y: auto;
    padding: 4px 8px;
    max-height: 260px;
  }
}
</style>
