<template>
  <div class="m-transfer-panel">
    <div class="m-transfer-panel__header">
      <MCheckbox
        :model-value="allChecked"
        :indeterminate="indeterminate"
        :disabled="enabledCount === 0"
        @update:model-value="toggleAll"
      />
      <span class="m-transfer-panel__title">{{ title }}</span>
      <span class="m-transfer-panel__count">{{ checkedCount }} / {{ data.length }}</span>
    </div>

    <div v-if="filterable" class="m-transfer-panel__filter">
      <input
        v-model="query"
        class="m-transfer-panel__filter-input"
        type="text"
        :placeholder="placeholder"
      />
    </div>

    <div class="m-transfer-panel__body">
      <ul v-if="filteredData.length" class="m-transfer-panel__list">
        <li
          v-for="item in filteredData"
          :key="getKey(item)"
          class="m-transfer-panel__item"
          :class="{ 'is-disabled': isDisabledItem(item) }"
        >
          <MCheckbox
            :model-value="isChecked(item)"
            :disabled="isDisabledItem(item)"
            @update:model-value="v => toggleItem(item, v)"
          >
            <span class="m-transfer-panel__item-label">
              <template v-if="renderContent">
                <RenderCell :render="() => renderContent($h, item)" />
              </template>
              <slot v-else :option="item">{{ getLabel(item) }}</slot>
            </span>
          </MCheckbox>
        </li>
      </ul>
      <div v-else class="m-transfer-panel__empty">无数据</div>
    </div>

    <div v-if="$slots.footer" class="m-transfer-panel__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, h as hFn } from 'vue'
import MCheckbox from '../Checkbox/Checkbox.vue'

defineOptions({ name: 'MTransferPanel' })

const props = withDefaults(defineProps<{
  data: any[]
  title: string
  filterable: boolean
  filterMethod?: (query: string, item: any) => boolean
  placeholder: string
  checked: any[]
  props: { key: string; label: string; disabled: string }
  renderContent?: (h: typeof hFn, option: any) => any
  format?: { noChecked: string; hasChecked: string }
  defaultChecked?: any[]
}>(), {
  filterable: false,
  placeholder: '请输入搜索内容',
  checked: () => [],
  defaultChecked: () => [],
})

const emit = defineEmits<{
  'update:checked': [value: any[]]
}>()

// 提供 h 函数给 renderContent 模板使用
const $h = hFn

const query = ref('')

function getKey(item: any) {
  return item[props.props.key]
}
function getLabel(item: any) {
  return item[props.props.label]
}
function isDisabledItem(item: any) {
  return !!item[props.props.disabled]
}

// 内部勾选 keys（用 String 统一比较）
const checkedSet = computed(() => new Set(props.checked.map(String)))

function isChecked(item: any) {
  return checkedSet.value.has(String(getKey(item)))
}

const enabledItems = computed(() => props.data.filter(i => !isDisabledItem(i)))
const enabledCount = computed(() => enabledItems.value.length)

const allChecked = computed(() => {
  if (enabledCount.value === 0) return false
  return enabledItems.value.every(i => isChecked(i))
})
const indeterminate = computed(() => {
  const c = enabledItems.value.filter(i => isChecked(i)).length
  return c > 0 && c < enabledCount.value
})
const checkedCount = computed(() => {
  return props.data.filter(i => isChecked(i)).length
})

function toggleAll(val: boolean) {
  let next: any[]
  if (val) {
    // 勾选所有可用项
    const set = new Set(props.checked.map(String))
    enabledItems.value.forEach(i => set.add(String(getKey(i))))
    next = [...set].map(s => s)
  } else {
    // 取消所有可用项
    const disabledSet = new Set(props.data.filter(isDisabledItem).map(i => String(getKey(i))))
    next = props.checked.filter(k => disabledSet.has(String(k)))
  }
  emit('update:checked', next)
}

function toggleItem(item: any, val: boolean) {
  if (isDisabledItem(item)) return
  const k = String(getKey(item))
  const current = new Set(props.checked.map(String))
  if (val) current.add(k)
  else current.delete(k)
  emit('update:checked', [...current])
}

const filteredData = computed(() => {
  if (!props.filterable || !query.value) return props.data
  const q = query.value
  if (props.filterMethod) {
    return props.data.filter(item => props.filterMethod!(q, item))
  }
  return props.data.filter(item => String(getLabel(item)).includes(q))
})

// 渲染 renderContent 的小组件
const RenderCell = defineComponent({
  props: { render: { type: Function, required: true } },
  setup(p) {
    return () => p.render()
  },
})
</script>

<style lang="scss">
.m-transfer-panel {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: var(--m-transfer-height, auto);
  max-height: 100%;
  border: 1px solid var(--mosaic-border-color);
  border-radius: var(--mosaic-border-radius);
  background-color: #fff;
  box-sizing: border-box;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-bottom: 1px solid var(--mosaic-border-color-lighter);
    background-color: var(--mosaic-fill-color-light);
  }

  &__title {
    flex: 1;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
    font-weight: 500;
  }

  &__count {
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-secondary);
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

  &__body {
    flex: 1;
    overflow-y: auto;
    min-height: 120px;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 4px 0;
  }

  &__item {
    padding: 4px 12px;
    transition: background-color 0.2s;

    &:hover:not(.is-disabled) {
      background-color: var(--mosaic-fill-color-light);
    }

    &.is-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__item-label {
    display: inline-flex;
    align-items: center;
  }

  &__empty {
    padding: 24px 0;
    text-align: center;
    color: var(--mosaic-text-placeholder);
    font-size: var(--mosaic-font-size-sm);
  }

  &__footer {
    border-top: 1px solid var(--mosaic-border-color-lighter);
    padding: 6px 12px;
  }
}
</style>
