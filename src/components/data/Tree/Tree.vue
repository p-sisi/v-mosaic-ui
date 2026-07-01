<template>
  <div :class="classes">
    <div
      v-for="node in visibleNodes"
      :key="getNodeKey(node)"
      class="m-tree-node"
      :style="{ paddingLeft: `${node._level * indent}px` }"
      @click.stop="handleNodeClick(node)"
      @contextmenu.stop="handleNodeContextmenu(node, $event)"
    >
      <span
        class="m-tree-node__expand"
        :class="{ 'm-tree-node__expand--expanded': isExpanded(node), 'm-tree-node__expand--leaf': isLeaf(node) }"
        @click.stop="handleExpandClick(node)"
      >
        &#9654;
      </span>
      <span
        v-if="showCheckbox"
        class="m-tree-node__checkbox"
        :class="{
          'm-tree-node__checkbox--checked': isChecked(node),
          'm-tree-node__checkbox--indeterminate': isIndeterminate(node),
          'm-tree-node__checkbox--disabled': isDisabled(node),
        }"
        @click.stop="handleCheckboxClick(node)"
      >
        <svg v-if="isChecked(node)" class="m-tree-node__checkbox-icon" viewBox="0 0 1024 1024" width="12" height="12"><path fill="currentColor" d="M369.8 818.1L122.9 571.2c-24.9-24.9-24.9-65.2 0-90.2s65.2-24.9 90.2 0l156.7 156.7 442.4-442.4c24.9-24.9 65.2-24.9 90.2 0s24.9 65.2 0 90.2L369.8 818.1z"/></svg>
        <span v-else-if="isIndeterminate(node)" class="m-tree-node__checkbox-dash"></span>
      </span>
      <span
        class="m-tree-node__content"
        :class="{
          'm-tree-node__content--highlight': highlightCurrent && isCurrentNode(node),
          'm-tree-node__content--disabled': isDisabled(node),
        }"
        @click="handleNodeContentClick(node)"
      >
        <slot :node="node" :data="node.data">
          {{ getNodeLabel(node) }}
        </slot>
      </span>
    </div>
    <div v-if="!data || data.length === 0" class="m-tree__empty">
      {{ emptyText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, provide } from 'vue'

defineOptions({ name: 'MTree' })

interface TreeNode {
  data: any
  _level: number
  _expanded: boolean
  _checked: boolean
  _indeterminate: boolean
  _childNodes: TreeNode[]
  _parent: TreeNode | null
  _loading: boolean
  _loaded: boolean
  _visible: boolean
  isLeaf?: boolean
}

const props = withDefaults(defineProps<{
  data?: any[]                                  // 树形数据
  emptyText?: string                            // 内容为空时展示的文本
  nodeKey?: string                              // 每个树节点唯一标识的属性名
  props?: object                                // 配置选项
  renderAfterExpand?: boolean                   // 是否在节点展开之后才渲染子节点
  lazy?: boolean                                // 是否懒加载子节点
  load?: Function                               // 懒加载函数
  highlightCurrent?: boolean                    // 是否高亮当前选中节点
  defaultExpandAll?: boolean                    // 是否默认展开所有节点
  defaultExpandedKeys?: any[]                   // 默认展开的节点 key 数组
  defaultCheckedKeys?: any[]                    // 默认勾选的节点 key 数组
  currentNodeKey?: string | number              // 当前选中节点 key
  filterNodeMethod?: Function                   // 节点过滤函数
  accordion?: boolean                           // 是否每次只展开一个同级节点
  indent?: number                               // 相邻级节点间的水平缩进
  expandOnClickNode?: boolean                   // 是否在点击节点时展开/收起
  checkOnClickNode?: boolean                    // 是否在点击节点时勾选
  showCheckbox?: boolean                        // 是否显示复选框
  checkStrictly?: boolean                       // 父子节点不关联
  draggable?: boolean                           // 是否可拖拽
  allowDrop?: Function                          // 拖拽时判定目标节点能否放置
  allowDrag?: Function                          // 拖拽时判定节点能否被拖拽
}>(), {
  data: () => [],
  emptyText: '暂无数据',
  nodeKey: '',
  props: () => ({
    label: 'label',
    children: 'children',
    isDisabled: 'disabled',
    isLeaf: 'isLeaf',
  }),
  renderAfterExpand: true,
  lazy: false,
  load: undefined,
  highlightCurrent: false,
  defaultExpandAll: false,
  defaultExpandedKeys: () => [],
  defaultCheckedKeys: () => [],
  currentNodeKey: '',
  filterNodeMethod: undefined,
  accordion: false,
  indent: 16,
  expandOnClickNode: true,
  checkOnClickNode: false,
  showCheckbox: false,
  checkStrictly: false,
  draggable: false,
  allowDrop: undefined,
  allowDrag: undefined,
})

const emit = defineEmits<{
  nodeClick: [data: any, node: TreeNode, instance: any]
  nodeContextmenu: [event: MouseEvent, data: any, node: TreeNode, instance: any]
  nodeExpand: [data: any, node: TreeNode, instance: any]
  nodeCollapse: [data: any, node: TreeNode, instance: any]
  check: [data: any, checkedInfo: any]
  checkChange: [data: any, checked: boolean, indeterminate: boolean]
  currentChange: [data: any, node: TreeNode]
  nodeDragStart: [node: TreeNode, event: DragEvent]
  nodeDragEnd: [draggingNode: TreeNode, dropNode: TreeNode, dropType: string, event: DragEvent]
  nodeDragOver: [draggingNode: TreeNode, dropNode: TreeNode, event: DragEvent]
  nodeDragLeave: [draggingNode: TreeNode, dropNode: TreeNode, event: DragEvent]
  nodeDrop: [draggingNode: TreeNode, dropNode: TreeNode, dropType: string, event: DragEvent]
  filter: [query: string]
}>()

const showCheckbox = computed(() => props.showCheckbox)
const expandedKeys = ref<Set<any>>(new Set())
const checkedKeys = ref<Set<any>>(new Set())
const currentKey = ref<string | number>(props.currentNodeKey)

const propsConfig = computed(() => ({
  label: 'label',
  children: 'children',
  isDisabled: 'disabled',
  isLeaf: 'isLeaf',
  ...props.props,
}))

const classes = computed(() => [
  'm-tree',
  {
    'm-tree--highlight-current': props.highlightCurrent,
  },
])

const buildNodes = (data: any[], level: number = 0, parent: TreeNode | null = null): TreeNode[] => {
  if (!data) return []
  return data.map(item => {
    const key = props.nodeKey ? item[props.nodeKey] : item
    const children = item[propsConfig.value.children] || []
    const isLeafNode = propsConfig.value.isLeaf
      ? !!item[propsConfig.value.isLeaf]
      : (props.lazy ? false : children.length === 0)
    const node: TreeNode = {
      data: item,
      _level: level,
      _expanded: props.defaultExpandAll || (props.defaultExpandedKeys && props.defaultExpandedKeys.includes(key)),
      _checked: props.defaultCheckedKeys && props.defaultCheckedKeys.includes(key),
      _indeterminate: false,
      _childNodes: [],
      _parent: parent,
      _loading: false,
      _loaded: !props.lazy || children.length > 0,
      _visible: true,
      isLeaf: isLeafNode,
    }
    node._childNodes = buildNodes(children, level + 1, node)
    return node
  })
}

const allNodes = ref<TreeNode[]>(buildNodes(props.data))

const flattenNodes = (nodes: TreeNode[], result: TreeNode[] = []): TreeNode[] => {
  for (const node of nodes) {
    if (node._visible === false) continue
    result.push(node)
    if (node._expanded && node._childNodes.length > 0) {
      flattenNodes(node._childNodes, result)
    }
  }
  return result
}

const visibleNodes = computed(() => flattenNodes(allNodes.value))

watch(() => props.currentNodeKey, (key) => {
  currentKey.value = key
})

const getNodeKey = (node: TreeNode) => {
  return props.nodeKey ? node.data[props.nodeKey] : node.data
}

const getNodeLabel = (node: TreeNode) => {
  const labelKey = propsConfig.value.label
  if (typeof labelKey === 'function') {
    return (labelKey as Function)(node.data)
  }
  return node.data[labelKey as string]
}

const isExpanded = (node: TreeNode) => node._expanded

const isLeaf = (node: TreeNode) => {
  if (node.isLeaf) return true
  return node._childNodes.length === 0 && !(props.lazy && !node._loaded)
}

const isChecked = (node: TreeNode) => node._checked

const isIndeterminate = (node: TreeNode) => node._indeterminate

const isDisabled = (node: TreeNode) => {
  const disabledKey = propsConfig.value.isDisabled
  return disabledKey ? !!node.data[disabledKey] : false
}

const isCurrentNode = (node: TreeNode) => {
  const key = getNodeKey(node)
  return currentKey.value === key
}

const toLoadNode = (node: TreeNode) => ({
  level: node._level,
  data: node.data,
  label: getNodeLabel(node),
  isLeaf: node.isLeaf,
})

const handleExpandClick = (node: TreeNode) => {
  if (isLeaf(node)) return
  if (props.lazy && !node._loaded) {
    node._loading = true
    props.load?.(toLoadNode(node), (children: any[]) => {
      node._loaded = true
      node._loading = false
      node._childNodes = buildNodes(children, node._level + 1, node)
      // Re-evaluate leaf status after loading
      node.isLeaf = node._childNodes.length === 0
      node._expanded = true
      emit('nodeExpand', node.data, node, null)
    })
    return
  }
  if (props.accordion && node._parent) {
    node._parent._childNodes.forEach(sibling => {
      if (sibling !== node) sibling._expanded = false
    })
  }
  node._expanded = !node._expanded
  if (node._expanded) {
    emit('nodeExpand', node.data, node, null)
  } else {
    emit('nodeCollapse', node.data, node, null)
  }
}

const handleNodeClick = (node: TreeNode) => {
  if (props.expandOnClickNode && !isLeaf(node)) {
    handleExpandClick(node)
  }
  if (props.checkOnClickNode && !isDisabled(node)) {
    handleCheck(node, null)
  }
  if (props.highlightCurrent) {
    currentKey.value = getNodeKey(node)
    emit('currentChange', node.data, node)
  }
  emit('nodeClick', node.data, node, null)
}

const handleNodeContentClick = (node: TreeNode) => {
  if (props.expandOnClickNode && !isLeaf(node)) {
    handleExpandClick(node)
  }
}

const handleNodeContextmenu = (node: TreeNode, event: MouseEvent) => {
  emit('nodeContextmenu', event, node.data, node, null)
}

const handleCheck = (node: TreeNode, event: Event | null) => {
  const checked = event ? (event.target as HTMLInputElement).checked : !node._checked
  node._checked = checked
  node._indeterminate = false
  // 向下传播
  if (!props.checkStrictly) {
    const updateChildren = (n: TreeNode, val: boolean) => {
      n._checked = val
      n._indeterminate = false
      n._childNodes.forEach(child => updateChildren(child, val))
    }
    updateChildren(node, checked)
    // 向上传播
    const updateParent = (n: TreeNode) => {
      const parent = n._parent
      if (!parent || parent._childNodes.length === 0) return
      const checkedCount = parent._childNodes.filter(c => c._checked).length
      const indeterminateCount = parent._childNodes.filter(c => c._indeterminate).length
      if (checkedCount === parent._childNodes.length) {
        parent._checked = true
        parent._indeterminate = false
      } else if (checkedCount === 0 && indeterminateCount === 0) {
        parent._checked = false
        parent._indeterminate = false
      } else {
        parent._checked = false
        parent._indeterminate = true
      }
      updateParent(parent)
    }
    updateParent(node)
  }
  emit('check', node.data, { checked, node })
  emit('checkChange', node.data, checked, node._indeterminate)
}

const handleCheckboxClick = (node: TreeNode) => {
  if (isDisabled(node)) return
  handleCheck(node, null)
}

// 懒加载根节点
const doLazyRootLoad = () => {
  if (props.lazy && props.load && allNodes.value.length === 0) {
    props.load?.({ level: 0, data: null, label: '', isLeaf: false }, (children: any[]) => {
      allNodes.value = buildNodes(children, 0, null)
    })
  }
}

doLazyRootLoad()

watch(() => props.data, (newData) => {
  allNodes.value = buildNodes(newData)
  if (props.lazy && props.load && newData.length === 0) {
    doLazyRootLoad()
  }
}, { deep: true })

provide('mTree', { indent: computed(() => props.indent) })

// ===== 命令式 API =====
function walkAll(nodes: TreeNode[], fn: (node: TreeNode) => void) {
  for (const node of nodes) {
    fn(node)
    if (node._childNodes.length) walkAll(node._childNodes, fn)
  }
}

function getCheckedKeys(leafOnly: boolean = false): any[] {
  const keys: any[] = []
  walkAll(allNodes.value, (node) => {
    if (!node._checked) return
    if (leafOnly && !isLeaf(node)) return
    keys.push(getNodeKey(node))
  })
  return keys
}

function setCheckedKeys(keys: any[]): void {
  const keySet = new Set(keys.map(k => k))
  walkAll(allNodes.value, (node) => {
    const k = getNodeKey(node)
    const checked = keySet.has(k)
    node._checked = checked
    node._indeterminate = false
  })
  // 触发响应式更新
  allNodes.value = [...allNodes.value]
}

function filter(keyword: string): void {
  const kw = (keyword || '').trim()
  if (!kw) {
    walkAll(allNodes.value, (node) => { node._visible = true })
    allNodes.value = [...allNodes.value]
    emit('filter', kw)
    return
  }
  // 自底向上标记可见性：自身匹配则可见且父链可见、子树全可见；否则若有可见子则可见
  const markVisible = (nodes: TreeNode[]): boolean => {
    let anyVisible = false
    for (const node of nodes) {
      const selfMatch = props.filterNodeMethod
        ? !!props.filterNodeMethod(kw, node.data, node)
        : String(getNodeLabel(node)).toLowerCase().includes(kw.toLowerCase())
      const childVisible = node._childNodes.length ? markVisible(node._childNodes) : false
      const visible = selfMatch || childVisible
      node._visible = visible
      // 自身匹配时展开以显示匹配的子节点
      if (childVisible && !selfMatch) node._expanded = true
      if (visible) anyVisible = true
      // 自身匹配时，所有子树也显示
      if (selfMatch) {
        walkAll(node._childNodes, (c) => { c._visible = true })
      }
    }
    return anyVisible
  }
  markVisible(allNodes.value)
  allNodes.value = [...allNodes.value]
  emit('filter', kw)
}

defineExpose({
  getCheckedKeys,
  setCheckedKeys,
  filter,
})
</script>

<style lang="scss">
.m-tree {
  font-size: 14px;
  color: var(--mosaic-text-primary);

  &__empty {
    padding: 20px;
    text-align: center;
    color: var(--mosaic-text-placeholder);
    font-size: var(--mosaic-font-size);
  }
}

.m-tree-node {
  display: flex;
  align-items: center;
  padding: 4px 0;
  cursor: pointer;
  outline: none;
  white-space: nowrap;

  &__expand {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    font-size: 12px;
    color: var(--mosaic-text-secondary);
    transition: transform var(--mosaic-transition-duration-fast) ease;
    transform: rotate(0deg);
    cursor: pointer;
    flex-shrink: 0;

    &--expanded {
      transform: rotate(90deg);
    }

    &--leaf {
      color: transparent;
      cursor: default;
    }
  }

  &__checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin: 0 6px 0 0;
    border: 1px solid var(--mosaic-border-color);
    border-radius: 2px;
    background-color: #fff;
    cursor: pointer;
    flex-shrink: 0;
    transition: background-color var(--mosaic-transition-duration-fast) ease, border-color var(--mosaic-transition-duration-fast) ease;
    box-sizing: border-box;

    &--checked {
      background-color: var(--mosaic-primary);
      border-color: var(--mosaic-primary);
      color: #fff;
    }

    &--indeterminate {
      background-color: var(--mosaic-primary);
      border-color: var(--mosaic-primary);
    }

    &--disabled {
      background-color: var(--mosaic-fill-color-light);
      border-color: var(--mosaic-border-color-light);
      cursor: not-allowed;

      &.m-tree-node__checkbox--checked {
        background-color: var(--mosaic-disabled-bg-color, #f0f0f0);
        border-color: var(--mosaic-border-color-light);
        color: var(--mosaic-text-placeholder);
      }
    }
  }

  &__checkbox-icon {
    color: #fff;
  }

  &__checkbox-dash {
    display: block;
    width: 8px;
    height: 2px;
    background-color: #fff;
    border-radius: 1px;
  }

  &__content {
    padding: 0 4px;
    font-size: 14px;
    line-height: 1.6;
    border-radius: var(--mosaic-border-radius);
    transition: background-color var(--mosaic-transition-duration-fast) ease;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      background-color: var(--mosaic-fill-color-light);
    }

    &--highlight {
      background-color: var(--mosaic-primary);
      color: #fff;
      font-weight: bold;

      &:hover {
        background-color: var(--mosaic-primary);
      }
    }

    &--disabled {
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;
    }
  }
}
</style>