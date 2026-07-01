<template>
  <div style="display: none;"></div>
</template>

<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, reactive, useSlots } from 'vue'

defineOptions({ name: 'MTableColumn' })

type ColumnType = 'selection' | 'index' | 'expand' | 'default'
type ColumnAlign = 'left' | 'center' | 'right'

const props = withDefaults(defineProps<{
  type?: ColumnType                          // 列类型
  index?: number | Function                  // data-index 或者自定义索引函数
  label?: string                             // 列标题文本
  className?: string                         // 列内容 className
  labelClassName?: string                    // 列标题 className
  property?: string                          // 列字段名称（旧版兼容）
  prop?: string                              // 列字段名称
  width?: string | number                    // 列宽度
  minWidth?: string | number                 // 列最小宽度
  renderHeader?: Function                    // 自定义表头渲染函数
  sortable?: boolean | string                // 是否可排序
  sortMethod?: Function                      // 自定义排序方法
  resizable?: boolean                        // 是否可拖拽调整列宽
  formatter?: Function                       // 格式化内容函数
  selectable?: Function                      // 仅对 type=selection 有效，控制是否可勾选
  align?: ColumnAlign                        // 对齐方式
  headerAlign?: ColumnAlign                  // 表头对齐方式
  showOverflowTooltip?: boolean              // 当内容过长是否显示 tooltip
  fixed?: boolean | string                   // 列是否固定
  filters?: any[]                            // 数据过滤选项
  filterMethod?: Function                    // 数据过滤方法
  filterMultiple?: boolean                   // 过滤是否支持多选
  filteredValue?: any[]                      // 选中的过滤项
}>(), {
  type: 'default',
  index: undefined,
  label: '',
  className: '',
  labelClassName: '',
  property: '',
  prop: '',
  width: undefined,
  minWidth: undefined,
  renderHeader: undefined,
  sortable: false,
  sortMethod: undefined,
  resizable: true,
  formatter: undefined,
  selectable: undefined,
  align: 'left',
  headerAlign: undefined,
  showOverflowTooltip: false,
  fixed: false,
  filters: undefined,
  filterMethod: undefined,
  filterMultiple: true,
  filteredValue: undefined,
})

const mTable = inject<{ addColumn: (col: any) => void; removeColumn: (colId: string) => void }>('mTable', {
  addColumn: () => {},
  removeColumn: () => {},
})

const slots = useSlots()

const columnId = `col_${Math.random().toString(36).slice(2, 9)}`

// 使用 getters 确保响应式追踪（比 reactive+computed 更可靠）
const columnConfig = reactive({
  id: columnId,
  get type() { return props.type },
  get index() { return props.index },
  get label() { return props.label },
  get className() { return props.className },
  get labelClassName() { return props.labelClassName },
  get property() { return props.property },
  get prop() { return props.prop },
  get width() { return props.width },
  get minWidth() { return props.minWidth },
  get renderHeader() { return props.renderHeader },
  get sortable() { return props.sortable },
  get sortMethod() { return props.sortMethod },
  get resizable() { return props.resizable },
  get formatter() { return props.formatter },
  get selectable() { return props.selectable },
  get align() { return props.align },
  get headerAlign() { return props.headerAlign },
  get showOverflowTooltip() { return props.showOverflowTooltip },
  get fixed() { return props.fixed },
  get filters() { return props.filters },
  get filterMethod() { return props.filterMethod },
  get filterMultiple() { return props.filterMultiple },
  get filteredValue() { return props.filteredValue },
  // 插槽渲染函数：默认插槽自定义列内容，header 插槽自定义表头
  get slotDefault() { return slots.default },
  get slotHeader() { return slots.header },
})

onMounted(() => {
  mTable.addColumn(columnConfig)
})

onBeforeUnmount(() => {
  mTable.removeColumn(columnId)
})
</script>
