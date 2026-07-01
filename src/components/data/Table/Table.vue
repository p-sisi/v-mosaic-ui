<template>
  <div :class="classes" :style="rootStyle">
    <div class="m-table__hidden-slot"><slot /></div>
    <div v-if="showHeader" class="m-table__header-wrapper" ref="headerWrapperRef">
      <table class="m-table__header" :style="tableStyle">
        <colgroup>
          <col v-for="col in columns" :key="col.id" :style="colStyle(col)" />
        </colgroup>
        <thead>
          <tr>
            <th
              v-for="(col, colIndex) in columns"
              :key="col.id"
              :class="thClasses(col)"
              :style="cellFixedStyle(col)"
              @click="handleHeaderClick(col)"
            >
              <div class="m-table__header-cell">
                <template v-if="col.type === 'selection'">
                  <input type="checkbox" :checked="isAllSelected" :indeterminate.prop="isIndeterminate" @change="handleSelectAll" class="m-table__checkbox" />
                </template>
                <template v-else-if="col.slotHeader">
                  <component :is="() => col.slotHeader({ column: col, $index: colIndex })" />
                </template>
                <template v-else-if="col.renderHeader">
                  <component :is="col.renderHeader" :column="col" />
                </template>
                <template v-else>
                  {{ col.label }}
                </template>
                <span v-if="col.sortable" class="m-table__sort-icon" @click.stop="handleSort(col)">
                  <span class="m-table__sort-caret m-table__sort-caret--ascending" :class="{ active: sortProp === col.prop && sortOrder === 'ascending' }">&#9650;</span>
                  <span class="m-table__sort-caret m-table__sort-caret--descending" :class="{ active: sortProp === col.prop && sortOrder === 'descending' }">&#9660;</span>
                </span>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="m-table__body-wrapper" :style="bodyStyle" ref="bodyWrapperRef" @scroll="handleBodyScroll">
      <table class="m-table__body" :style="tableStyle">
        <colgroup>
          <col v-for="col in columns" :key="col.id" :style="colStyle(col)" />
        </colgroup>
        <tbody>
          <tr
            v-for="(row, rowIndex) in data"
            :key="rowKey ? row[rowKey] : rowIndex"
            :class="rowClasses(row, rowIndex)"
            :style="rowStyles(row, rowIndex)"
            @click="handleRowClick(row, rowIndex, $event)"
            @dblclick="handleRowDblclick(row, rowIndex, $event)"
            @contextmenu="handleRowContextmenu(row, rowIndex, $event)"
            @mouseenter="handleCellMouseEnter(row, rowIndex, $event)"
            @mouseleave="handleCellMouseLeave(row, rowIndex, $event)"
          >
            <td
              v-for="col in columns"
              :key="col.id"
              :class="tdClasses(col)"
              :style="cellFixedStyle(col)"
              @click="handleCellClick(row, col, rowIndex, $event)"
              @dblclick="handleCellDblclick(row, col, rowIndex, $event)"
            >
              <template v-if="col.type === 'selection'">
                <input type="checkbox" :checked="isSelected(row)" :disabled="col.selectable ? !col.selectable(row) : false" @change="handleSelect(row, $event)" class="m-table__checkbox" />
              </template>
              <template v-else-if="col.type === 'index'">
                {{ typeof col.index === 'function' ? col.index(rowIndex) : rowIndex + 1 }}
              </template>
              <template v-else-if="col.type === 'expand'">
                <slot name="expand" :row="row" :index="rowIndex" />
              </template>
              <template v-else>
                <template v-if="col.slotDefault">
                  <component :is="() => col.slotDefault({ row, column: col, $index: rowIndex })" />
                </template>
                <m-tooltip
                  v-else-if="col.showOverflowTooltip"
                  :content="String(getCellValue(row, col))"
                  placement="top"
                  effect="dark"
                  :show-after="300"
                >
                  <div class="m-table__cell-content m-table__cell-content--ellipsis">
                    {{ col.formatter ? col.formatter(row, col, getCellValue(row, col), rowIndex) : getCellValue(row, col) }}
                  </div>
                </m-tooltip>
                <div v-else class="m-table__cell-content">
                  {{ col.formatter ? col.formatter(row, col, getCellValue(row, col), rowIndex) : getCellValue(row, col) }}
                </div>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!data || data.length === 0" class="m-table__empty-block">
      <span class="m-table__empty-text">{{ emptyText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, reactive, nextTick, type Ref } from 'vue'
import { MTooltip } from '../../feedback/Tooltip'

defineOptions({ name: 'MTable' })

type TableSize = 'large' | 'default' | 'small'

const props = withDefaults(defineProps<{
  data?: any[]                              // 表格数据
  height?: string | number                  // 表格高度，设置后固定表头
  maxHeight?: string | number               // 表格最大高度
  stripe?: boolean                          // 是否显示斑马纹
  border?: boolean                          // 是否带有纵向边框
  size?: TableSize                          // 表格尺寸
  fit?: boolean                             // 列的宽度是否自撑开
  showHeader?: boolean                      // 是否显示表头
  highlightCurrentRow?: boolean             // 是否要高亮当前行
  currentRowKey?: string | number           // 当前行的 key
  rowClassName?: Function | string          // 行的 className 回调
  rowStyle?: Function | string              // 行的 style 回调
  defaultExpandAll?: boolean                // 是否默认展开所有行
  emptyText?: string                        // 空数据时显示的文本
}>(), {
  data: () => [],
  height: '',
  maxHeight: '',
  stripe: false,
  border: false,
  size: 'default',
  fit: true,
  showHeader: true,
  highlightCurrentRow: false,
  currentRowKey: '',
  rowClassName: '',
  rowStyle: '',
  defaultExpandAll: false,
  emptyText: '暂无数据',
})

const emit = defineEmits([
  'select',
  'selectAll',
  'selectionChange',
  'cellMouseEnter',
  'cellMouseLeave',
  'cellClick',
  'cellDblclick',
  'rowClick',
  'rowContextmenu',
  'rowDblclick',
  'headerClick',
  'sortChange',
  'currentChange',
])

const columns = reactive<any[]>([])
const selection = ref<any[]>([])
const sortProp = ref('')
const sortOrder = ref('')
const currentRow = ref<any>(null)
const headerWrapperRef = ref<HTMLElement | null>(null)
const bodyWrapperRef = ref<HTMLElement | null>(null)
const rowKey = computed(() => typeof props.currentRowKey === 'string' ? props.currentRowKey : '')

const classes = computed(() => [
  'm-table',
  `m-table--${props.size}`,
  {
    'm-table--stripe': props.stripe,
    'm-table--border': props.border,
    'm-table--fit': props.fit,
    'm-table--highlight-current-row': props.highlightCurrentRow,
    'm-table--fixed-height': !!(props.height || props.maxHeight),
  },
])

const tableStyle = computed(() => {
  const style: Record<string, string> = {}
  const cols = columns
  // 所有列都有明确宽度时按宽度求和，允许横向溢出（固定列才有意义）
  if (cols.length > 0 && cols.every(c => c.width !== undefined && c.width !== '')) {
    style.width = `${cols.reduce((s, c) => s + parseWidth(c), 0)}px`
  } else if (props.fit) {
    style.width = '100%'
  }
  return style
})

const toSize = (val: string | number | undefined) => {
  if (val === undefined || val === '' ) return ''
  if (typeof val === 'number') return `${val}px`
  // 纯数字字符串补单位，其余（如 "240px"/"30vh"）原样使用
  return /^\d+$/.test(val.trim()) ? `${val.trim()}px` : val
}

const rootStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.height) {
    style.height = toSize(props.height)
  }
  if (props.maxHeight) {
    style.maxHeight = toSize(props.maxHeight)
  }
  return style
})

const bodyStyle = computed(() => {
  const style: Record<string, string> = { overflowX: 'auto' }
  // 有数据时让表身占满剩余高度并滚动；无数据时不占位，空状态块自行展示
  if ((props.height || props.maxHeight) && props.data && props.data.length > 0) {
    style.flex = '1'
    style.overflowY = 'auto'
  }
  return style
})

const parseWidth = (col: any) => {
  const w = col.width
  if (w === undefined || w === '') return 0
  if (typeof w === 'number') return w
  const n = parseFloat(String(w))
  return isNaN(n) ? 0 : n
}

const getFixedSide = (col: any): 'left' | 'right' | null => {
  const f = col.fixed
  if (f === true || f === 'left') return 'left'
  if (f === 'right') return 'right'
  return null
}

// 左侧固定列的累积偏移
const leftFixedOffsets = computed(() => {
  const map: Record<string, number> = {}
  let acc = 0
  for (const col of columns) {
    if (getFixedSide(col) === 'left') {
      map[col.id] = acc
      acc += parseWidth(col)
    }
  }
  return map
})

// 右侧固定列的累积偏移（从右往左累加）
const rightFixedOffsets = computed(() => {
  const map: Record<string, number> = {}
  let acc = 0
  for (let i = columns.length - 1; i >= 0; i--) {
    const col = columns[i]
    if (getFixedSide(col) === 'right') {
      map[col.id] = acc
      acc += parseWidth(col)
    }
  }
  return map
})

const lastLeftFixedId = computed(() => {
  let id: string | null = null
  for (const col of columns) {
    if (getFixedSide(col) === 'left') id = col.id
  }
  return id
})

const firstRightFixedId = computed(() => {
  for (const col of columns) {
    if (getFixedSide(col) === 'right') return col.id
  }
  return null
})

const cellFixedStyle = (col: any) => {
  const side = getFixedSide(col)
  const style: Record<string, string> = {}
  if (side === 'left') {
    style.position = 'sticky'
    style.left = `${leftFixedOffsets.value[col.id] || 0}px`
    style.zIndex = '2'
  } else if (side === 'right') {
    style.position = 'sticky'
    style.right = `${rightFixedOffsets.value[col.id] || 0}px`
    style.zIndex = '2'
  }
  return style
}

const fixedCellClass = (col: any) => {
  const side = getFixedSide(col)
  const cls: string[] = []
  if (side === 'left') {
    cls.push('m-table__fixed-cell', 'm-table__fixed-cell--left')
    if (col.id === lastLeftFixedId.value) cls.push('m-table__fixed-cell--left-last')
  } else if (side === 'right') {
    cls.push('m-table__fixed-cell', 'm-table__fixed-cell--right')
    if (col.id === firstRightFixedId.value) cls.push('m-table__fixed-cell--right-first')
  }
  return cls
}

const handleBodyScroll = () => {
  if (headerWrapperRef.value && bodyWrapperRef.value) {
    headerWrapperRef.value.scrollLeft = bodyWrapperRef.value.scrollLeft
  }
}

const colStyle = (col: any) => {
  const style: Record<string, string> = {}
  if (col.width) {
    style.width = toSize(col.width)
  }
  if (col.minWidth) {
    style.minWidth = toSize(col.minWidth)
  }
  return style
}

const selectionColumn = computed(() => columns.find(c => c.type === 'selection'))

const isRowSelectable = (row: any) => {
  const col = selectionColumn.value
  if (col && typeof col.selectable === 'function') return col.selectable(row)
  return true
}

const selectableData = computed(() => (props.data || []).filter(isRowSelectable))

const isAllSelected = computed(() => {
  if (selectableData.value.length === 0) return false
  return selectableData.value.every(row => selection.value.includes(row))
})

const isIndeterminate = computed(() => {
  const selectable = selectableData.value
  if (selectable.length === 0) return false
  const selectedCount = selectable.filter(row => selection.value.includes(row)).length
  return selectedCount > 0 && selectedCount < selectable.length
})

const isSelected = (row: any) => selection.value.includes(row)

const getCellValue = (row: any, col: any) => {
  const prop = col.prop || col.property
  if (!prop) return ''
  return prop.split('.').reduce((acc: any, key: string) => acc?.[key], row) ?? ''
}

const rowClasses = (row: any, rowIndex: number) => {
  const cls: any[] = [
    'm-table__row',
    {
      'm-table__row--stripe': props.stripe && rowIndex % 2 === 1,
      'm-table__row--highlight-current-row': props.highlightCurrentRow && currentRow.value === row,
    },
  ]
  if (typeof props.rowClassName === 'function') {
    cls.push(props.rowClassName({ row, rowIndex }))
  } else if (typeof props.rowClassName === 'string') {
    cls.push(props.rowClassName)
  }
  return cls
}

const rowStyles = (row: any, rowIndex: number) => {
  if (typeof props.rowStyle === 'function') {
    return props.rowStyle({ row, rowIndex })
  }
  if (typeof props.rowStyle === 'string') {
    return props.rowStyle
  }
  return {}
}

const thClasses = (col: any) => [
  'm-table__header-cell-wrapper',
  `m-table__header-cell--${col.headerAlign || col.align || 'left'}`,
  {
    'm-table__header-cell--sortable': col.sortable,
  },
  ...fixedCellClass(col),
]

const tdClasses = (col: any) => [
  'm-table__body-cell',
  `m-table__body-cell--${col.align || 'left'}`,
  ...fixedCellClass(col),
]

const handleHeaderClick = (col: any) => {
  emit('headerClick', col)
}

const handleSort = (col: any) => {
  const prop = col.prop || col.property
  if (sortProp.value === prop) {
    sortOrder.value = sortOrder.value === 'ascending' ? 'descending' : sortOrder.value === 'descending' ? '' : 'ascending'
  } else {
    sortOrder.value = 'ascending'
    sortProp.value = prop
  }
  emit('sortChange', col, prop, sortOrder.value)
}

const handleSelectAll = () => {
  if (isAllSelected.value) {
    selection.value = []
  } else {
    selection.value = [...selectableData.value]
  }
  emit('selectAll', selection.value)
  emit('selectionChange', selection.value)
}

const handleSelect = (row: any, event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  if (checked) {
    selection.value.push(row)
  } else {
    const idx = selection.value.indexOf(row)
    if (idx > -1) selection.value.splice(idx, 1)
  }
  emit('select', selection.value, row)
  emit('selectionChange', selection.value)
}

const handleRowClick = (row: any, rowIndex: number, event: MouseEvent) => {
  if (props.highlightCurrentRow) {
    const oldRow = currentRow.value
    currentRow.value = row
    emit('currentChange', row, oldRow)
  }
  emit('rowClick', row, event)
}

const handleRowDblclick = (row: any, rowIndex: number, event: MouseEvent) => {
  emit('rowDblclick', row, event)
}

const handleRowContextmenu = (row: any, rowIndex: number, event: MouseEvent) => {
  emit('rowContextmenu', row, event)
}

const handleCellMouseEnter = (row: any, rowIndex: number, event: MouseEvent) => {
  emit('cellMouseEnter', row, null, null, event)
}

const handleCellMouseLeave = (row: any, rowIndex: number, event: MouseEvent) => {
  emit('cellMouseLeave', row, null, null, event)
}

const handleCellClick = (row: any, col: any, rowIndex: number, event: MouseEvent) => {
  emit('cellClick', row, col, null, event)
}

const handleCellDblclick = (row: any, col: any, rowIndex: number, event: MouseEvent) => {
  emit('cellDblclick', row, col, null, event)
}

const addColumn = (col: any) => {
  columns.push(col)
}

const removeColumn = (colId: string) => {
  const idx = columns.findIndex(c => c.id === colId)
  if (idx > -1) columns.splice(idx, 1)
}

provide('mTable', {
  data: computed(() => props.data),
  size: computed(() => props.size),
  border: computed(() => props.border),
  fit: computed(() => props.fit),
  addColumn,
  removeColumn,
})
</script>

<style lang="scss">
.m-table {
  width: 100%;
  font-size: var(--mosaic-font-size);
  color: var(--mosaic-text-primary);
  position: relative;
  overflow: hidden;

  &__hidden-slot {
    display: none;
  }

  &--large {
    font-size: var(--mosaic-font-size-lg);
  }

  &--small {
    font-size: var(--mosaic-font-size-sm);
  }

  &--fixed-height {
    display: flex;
    flex-direction: column;
  }

  &__header-wrapper {
    overflow: hidden;
    flex-shrink: 0;
  }

  &__header {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  &__body-wrapper {
    overflow: hidden;
    position: relative;
  }

  &__body {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  &__header-cell-wrapper {
    padding: 12px 10px;
    text-align: left;
    font-weight: 600;
    color: var(--mosaic-text-primary);
    background-color: var(--mosaic-fill-color-light);
    border-bottom: 1px solid var(--mosaic-border-color);
    user-select: none;
  }

  &__header-cell--center {
    text-align: center;
  }

  &__header-cell--right {
    text-align: right;
  }

  &__header-cell--sortable {
    cursor: pointer;
  }

  &__header-cell {
    display: inline-flex;
    align-items: center;
    line-height: 1;
  }

  &__sort-icon {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    margin-left: 4px;
    cursor: pointer;
    font-size: 10px;
    line-height: 1;
  }

  &__sort-caret {
    opacity: 0.4;
    cursor: pointer;

    &.active {
      opacity: 1;
      color: var(--mosaic-primary);
    }
  }

  &__row {
    transition: background-color var(--mosaic-transition-duration-fast) ease;

    &:hover {
      background-color: var(--mosaic-fill-color-light);
    }

    &--stripe {
      background-color: var(--mosaic-fill-color-lighter);

      &:hover {
        background-color: var(--mosaic-fill-color-light);
      }
    }

    &--highlight-current-row {
      background-color: var(--mosaic-primary) !important;
      color: #fff;
    }
  }

  &__body-cell {
    padding: 12px 10px;
    text-align: left;
    border-bottom: 1px solid var(--mosaic-border-color-lighter);
    color: var(--mosaic-text-regular);

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }
  }

  &--border {
    border-left: 1px solid var(--mosaic-border-color);
    border-top: 1px solid var(--mosaic-border-color);
  }

  &--border &__header-cell-wrapper {
    border-right: 1px solid var(--mosaic-border-color);
    border-bottom: 1px solid var(--mosaic-border-color);
  }

  &--border &__body-cell {
    border-right: 1px solid var(--mosaic-border-color);
  }

  &__cell-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__cell-content--ellipsis {
    width: 100%;
  }

  // tooltip 触发元素在表格内需撑满单元格，省略号才能生效
  & .m-tooltip__reference {
    display: block;
    width: 100%;
  }

  &__checkbox {
    cursor: pointer;
    accent-color: var(--mosaic-primary);
  }

  &__empty-block {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
    padding: 20px;
    color: var(--mosaic-text-secondary);
  }

  &--fixed-height &__empty-block {
    flex: 1;
  }

  &__empty-text {
    font-size: var(--mosaic-font-size);
    line-height: 1;
  }

  /* 固定列：sticky 单元格需要不透明背景遮挡滚动内容 */
  &__fixed-cell {
    background-color: var(--mosaic-bg-color, #fff);
  }

  &__header-cell-wrapper.m-table__fixed-cell {
    background-color: var(--mosaic-fill-color-light);
  }

  &__row:hover &__fixed-cell {
    background-color: var(--mosaic-fill-color-light);
  }

  &__row--stripe &__fixed-cell {
    background-color: var(--mosaic-fill-color-lighter);
  }

  &__row--stripe:hover &__fixed-cell {
    background-color: var(--mosaic-fill-color-light);
  }

  &__row--highlight-current-row &__fixed-cell {
    background-color: var(--mosaic-primary);
    color: #fff;
  }

  &__fixed-cell--left-last {
    box-shadow: 4px 0 8px -4px rgba(0, 0, 0, 0.12);
  }

  &__fixed-cell--right-first {
    box-shadow: -4px 0 8px -4px rgba(0, 0, 0, 0.12);
  }
}
</style>