<template>
  <div :class="classes" ref="wrapperRef">
    <div
      class="m-cascader__trigger"
      :class="{ 'm-cascader__trigger--active': panelVisible }"
      @click="handleTriggerClick"
    >
      <!-- 多选模式：tags + 可选输入框 -->
      <template v-if="isMultiple">
        <div class="m-cascader__tags" ref="tagsContainerRef" v-if="multiSelected.length > 0">
          <span
            v-for="tag in visibleTags"
            :key="tag.key"
            class="m-cascader__tag"
          >
            <span class="m-cascader__tag-text">{{ tag.label }}</span>
            <span
              v-if="!effectiveDisabled"
              class="m-cascader__tag-close"
              @click.stop="removeTag(tag)"
            >&times;</span>
          </span>
          <template v-if="collapsedCount > 0">
            <MTooltip
              v-if="collapseTagsTooltip"
              :content="collapsedTooltipContent"
              placement="top"
              :show-after="300"
            >
              <span class="m-cascader__tag m-cascader__tag--collapse">
                +{{ collapsedCount }}
              </span>
            </MTooltip>
            <span v-else class="m-cascader__tag m-cascader__tag--collapse">
              +{{ collapsedCount }}
            </span>
          </template>
        </div>
        <!-- 测量层：用于动态计算可视区域可容纳的 tag 数量 -->
        <div
          v-if="collapseTags && maxCollapseTags === undefined && multiSelected.length > 0"
          class="m-cascader__tags-measure"
          ref="measureRef"
        >
          <span v-for="tag in allTags" :key="tag.key" class="m-cascader__tag">
            <span class="m-cascader__tag-text">{{ tag.label }}</span>
            <span class="m-cascader__tag-close">&times;</span>
          </span>
          <span class="m-cascader__tag m-cascader__tag--collapse">+0</span>
        </div>
        <input
          v-if="filterable"
          ref="inputRef"
          class="m-cascader__input m-cascader__input--inline"
          :value="searchKeyword"
          :placeholder="multiSelected.length === 0 ? placeholder : ''"
          :disabled="effectiveDisabled"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleSearchInput"
        />
        <span v-else-if="multiSelected.length === 0" class="m-cascader__placeholder">{{ placeholder }}</span>
      </template>

      <!-- 单选模式 -->
      <template v-else>
        <input
          ref="inputRef"
          class="m-cascader__input"
          :value="inputDisplayValue"
          :placeholder="inputPlaceholder"
          :disabled="effectiveDisabled"
          :readonly="!filterable || !panelVisible"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleSearchInput"
        />
      </template>

      <span class="m-cascader__suffix">
        <span
          v-if="clearable && hasValue && !effectiveDisabled"
          class="m-cascader__clear"
          @click.stop="handleClear"
        >
          &times;
        </span>
        <span v-else class="m-cascader__arrow" :class="{ 'm-cascader__arrow--up': panelVisible }">
          <svg viewBox="0 0 12 12" width="12" height="12"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </span>
    </div>
    <Teleport to="body">
      <div
        v-show="panelVisible"
        ref="popperRef"
        class="m-cascader__panel"
        :class="popperClass"
        :style="panelStyle"
      >
        <!-- 过滤建议面板 -->
        <div v-if="filterable && searchKeyword" class="m-cascader__suggestion">
          <div v-if="suggestions.length === 0" class="m-cascader__suggestion-empty">无匹配项</div>
          <div
            v-for="suggestion in suggestions"
            :key="suggestion.key"
            class="m-cascader__suggestion-item"
            :class="{
              'm-cascader__suggestion-item--checked': isSuggestionChecked(suggestion),
              'm-cascader__suggestion-item--disabled': suggestion.node.disabled,
            }"
            @click="handleSuggestionClick(suggestion)"
          >
            <span v-if="isMultiple" class="m-cascader__checkbox" :class="{ 'is-checked': isSuggestionChecked(suggestion) }">
              <svg v-if="isSuggestionChecked(suggestion)" viewBox="0 0 12 12" width="12" height="12"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span class="m-cascader__suggestion-label" v-html="suggestion.highlighted"></span>
          </div>
        </div>

        <!-- 级联面板 -->
        <template v-else>
          <div
            v-for="(menu, menuIndex) in menus"
            :key="menuIndex"
            class="m-cascader__menu"
          >
            <div
              v-for="item in menu"
              :key="item.value"
              :class="[
                'm-cascader__item',
                {
                  'm-cascader__item--active': isInActivePath(item, menuIndex),
                  'm-cascader__item--selected': !isMultiple && isInSelectedPath(item, menuIndex),
                  'm-cascader__item--disabled': item.disabled,
                  'm-cascader__item--has-children': hasChildren(item),
                },
              ]"
              @click="handleItemClick(item, menuIndex)"
              @mouseenter="handleItemHover(item, menuIndex)"
            >
              <span
                v-if="isMultiple"
                class="m-cascader__checkbox"
                :class="{
                  'is-checked': isItemChecked(item, menuIndex),
                  'is-indeterminate': isItemIndeterminate(item, menuIndex),
                }"
              >
                <svg v-if="isItemChecked(item, menuIndex)" viewBox="0 0 12 12" width="12" height="12"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span v-else-if="isItemIndeterminate(item, menuIndex)" class="m-cascader__checkbox-indeterminate"></span>
              </span>
              <span class="m-cascader__item-label">
                <slot :data="item">{{ item.label }}</slot>
              </span>
              <span v-if="hasChildren(item)" class="m-cascader__item-arrow">
                <svg viewBox="0 0 12 12" width="10" height="10"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <span v-else-if="!isMultiple" class="m-cascader__item-check">
                <svg v-if="isInSelectedPath(item, menuIndex)" viewBox="0 0 12 12" width="12" height="12"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </div>
          </div>
        </template>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { usePopper } from '../../../hooks/usePopper'
import { useZIndex } from '../../../hooks/useZIndex'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MCascader' })

interface CascaderOption {
  value: string | number
  label: string
  disabled?: boolean
  children?: CascaderOption[]
}

/** filter-method 接收的节点：在原始选项基础上附带路径信息 */
interface FilterNode extends CascaderOption {
  path: CascaderOption[]        // 从根到当前节点的完整路径
  pathLabels: string[]          // 从根到当前节点的所有 label
  text: string                  // 完整路径文本（label 用 separator 拼接）
}

interface CascaderConfig {
  expandTrigger?: 'click' | 'hover'
  checkStrictly?: boolean
  emitPath?: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: any                              // 选中值（单选：路径数组或末值；多选：路径数组数组或末值数组）
  options?: CascaderOption[]                    // 可选项数据源
  cascaderProps?: CascaderConfig                // 配置项
  placeholder?: string                          // 占位文本
  disabled?: boolean                            // 是否禁用
  clearable?: boolean                           // 是否可清空
  size?: 'small' | 'default' | 'large'         // 尺寸
  separator?: string                            // 路径分隔符
  placement?: string                            // 弹出位置
  popperClass?: string                          // 弹出层自定义类名
  showAllLevels?: boolean                       // 是否显示完整路径，默认 true
  multiple?: boolean                            // 是否多选
  collapseTags?: boolean                        // 是否折叠 tag
  maxCollapseTags?: number                      // 折叠时显示的最大 tag 数量，不设置则按可视区域自动折叠
  collapseTagsTooltip?: boolean                 // 折叠 tag 时是否显示 tooltip
  filterable?: boolean                          // 是否可过滤
  filterMethod?: (node: FilterNode, keyword: string) => boolean  // 自定义过滤方法，node 含 path/pathLabels/text
}>(), {
  modelValue: () => [],
  options: () => [],
  cascaderProps: () => ({}),
  placeholder: '请选择',
  disabled: false,
  clearable: false,
  size: 'default',
  separator: ' / ',
  placement: 'bottom-start',
  popperClass: '',
  showAllLevels: true,
  multiple: false,
  collapseTags: false,
  maxCollapseTags: undefined,
  collapseTagsTooltip: true,
  filterable: false,
  filterMethod: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  change: [value: any, path: any]
  expand: [value: (string | number)[]]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
  'remove-tag': [value: any]
}>()

const { effectiveSize, effectiveDisabled } = useFormItem(props)

const wrapperRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

const panelVisible = ref(false)
const activePath = ref<CascaderOption[]>([])             // 当前展开路径
const selectedOptions = ref<CascaderOption[]>([])        // 单选选中路径
const multiSelected = ref<CascaderOption[][]>([])        // 多选选中路径集合
const searchKeyword = ref('')

const config = computed<CascaderConfig & { multiple?: boolean }>(() => ({
  expandTrigger: 'click',
  checkStrictly: false,
  emitPath: true,
  ...props.cascaderProps,
}))

const isMultiple = computed(() => props.multiple || !!config.value.multiple)

const { visible, updatePosition } = usePopper(
  wrapperRef,
  popperRef,
  arrowRef,
  {
    placement: props.placement as any,
    offset: 6,
    trigger: 'manual',
  }
)

const { nextZIndex } = useZIndex()

const panelStyle = computed(() => {
  const style: Record<string, string> = {
    zIndex: String(nextZIndex()),
  }
  // 面板宽度由级联菜单内容撑开，不与触发器宽度绑定
  return style
})

const classes = computed(() => [
  'm-cascader',
  `m-cascader--${effectiveSize.value}`,
  {
    'm-cascader--disabled': effectiveDisabled.value,
    'm-cascader--multiple': isMultiple.value,
    'm-cascader--filterable': props.filterable,
  },
])

const hasValue = computed(() => {
  if (isMultiple.value) return multiSelected.value.length > 0
  return selectedOptions.value.length > 0
})

// ===== 显示文本 =====
function formatPathLabel(path: CascaderOption[]): string {
  if (path.length === 0) return ''
  if (props.showAllLevels) {
    return path.map(o => o.label).join(props.separator)
  }
  return path[path.length - 1].label
}

const displayLabel = computed(() => formatPathLabel(selectedOptions.value))

const inputDisplayValue = computed(() => {
  if (!props.filterable) return displayLabel.value
  // filterable 时：打开面板且正在输入，显示搜索词；否则显示已选标签
  if (panelVisible.value && searchKeyword.value) return searchKeyword.value
  return displayLabel.value
})

const inputPlaceholder = computed(() => {
  if (!props.filterable) return displayLabel.value || props.placeholder
  // filterable：打开面板时 placeholder 为已选标签，否则为 placeholder
  if (panelVisible.value) return displayLabel.value || props.placeholder
  return displayLabel.value || props.placeholder
})

// ===== 多选 tags =====
interface TagItem { key: string; label: string; path: CascaderOption[] }

const allTags = computed<TagItem[]>(() =>
  multiSelected.value.map((path, idx) => ({
    key: `${idx}-${path.map(o => o.value).join('.')}`,
    label: formatPathLabel(path),
    path,
  }))
)

// 动态计算的最大可显示 tag 数（当 collapseTags 且未设 maxCollapseTags 时生效）
const dynamicMaxTags = ref(Infinity)
const tagsContainerRef = ref<HTMLElement | null>(null)
const measureRef = ref<HTMLElement | null>(null)

const effectiveMaxTags = computed(() => {
  if (!props.collapseTags) return Infinity
  if (props.maxCollapseTags !== undefined) return props.maxCollapseTags
  return dynamicMaxTags.value
})

const visibleTags = computed<TagItem[]>(() => {
  if (effectiveMaxTags.value === Infinity) return allTags.value
  return allTags.value.slice(0, effectiveMaxTags.value)
})

const collapsedCount = computed(() => {
  return Math.max(0, allTags.value.length - effectiveMaxTags.value)
})

const collapsedTooltipContent = computed(() =>
  allTags.value.slice(effectiveMaxTags.value).map(t => t.label).join('；')
)

// 根据容器可视区域计算能容纳的 tag 数量
function calcMaxTags() {
  if (!props.collapseTags || props.maxCollapseTags !== undefined) return
  if (!measureRef.value || !tagsContainerRef.value) return
  const containerWidth = tagsContainerRef.value.clientWidth
  const measureEls = measureRef.value.querySelectorAll<HTMLElement>('.m-cascader__tag')
  if (measureEls.length === 0) {
    dynamicMaxTags.value = Infinity
    return
  }
  const gap = 4
  const collapseTagWidth = measureEls[measureEls.length - 1].offsetWidth + gap
  // 预留 +N 折叠标签的空间（只要不是全部能放下）
  let totalWidth = 0
  let count = 0
  for (let i = 0; i < measureEls.length - 1; i++) {
    const tagWidth = measureEls[i].offsetWidth + gap
    if (totalWidth + tagWidth + collapseTagWidth > containerWidth && i < measureEls.length - 2) {
      break
    }
    totalWidth += tagWidth
    count++
  }
  dynamicMaxTags.value = Math.max(1, count)
}

// ===== 菜单 =====
const menus = computed<CascaderOption[][]>(() => {
  const result: CascaderOption[][] = [props.options]
  for (const active of activePath.value) {
    if (active.children && active.children.length > 0) {
      result.push(active.children)
    } else {
      break
    }
  }
  return result
})

function hasChildren(item: CascaderOption): boolean {
  return !!(item.children && item.children.length > 0)
}

function isInActivePath(item: CascaderOption, menuIndex: number): boolean {
  return activePath.value[menuIndex]?.value === item.value
}

function isInSelectedPath(item: CascaderOption, menuIndex: number): boolean {
  return selectedOptions.value[menuIndex]?.value === item.value
}

// ===== 路径查找 =====
function findPathByValue(options: CascaderOption[], target: (string | number)[], depth: number = 0): CascaderOption[] | null {
  if (depth >= target.length) return []
  for (const opt of options) {
    if (opt.value === target[depth]) {
      if (depth === target.length - 1) {
        return [opt]
      }
      if (opt.children) {
        const subPath = findPathByValue(opt.children, target, depth + 1)
        if (subPath) return [opt, ...subPath]
      }
    }
  }
  return null
}

function syncFromModelValue() {
  if (isMultiple.value) {
    if (Array.isArray(props.modelValue)) {
      multiSelected.value = props.modelValue
        .map((item: any) => {
          if (Array.isArray(item)) {
            return findPathByValue(props.options, item)
          }
          // emitPath=false：item 是末值，需找到完整路径
          return findPathByValue(props.options, [item])
        })
        .filter(Boolean) as CascaderOption[][]
    } else {
      multiSelected.value = []
    }
  } else {
    if (props.modelValue && (Array.isArray(props.modelValue) ? props.modelValue.length > 0 : props.modelValue !== undefined && props.modelValue !== null)) {
      const target = Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
      const path = findPathByValue(props.options, target)
      if (path) {
        selectedOptions.value = path
        activePath.value = path.slice(0, -1)
      } else {
        selectedOptions.value = []
        activePath.value = []
      }
    } else {
      selectedOptions.value = []
      activePath.value = []
    }
  }
}

watch(() => props.modelValue, () => {
  syncFromModelValue()
}, { immediate: true, deep: true })

watch(() => props.options, () => {
  syncFromModelValue()
}, { deep: true })

watch(() => props.multiple, () => {
  syncFromModelValue()
})

// ===== 多选选中判断 =====
function isPathEqual(a: CascaderOption[], b: CascaderOption[]): boolean {
  if (a.length !== b.length) return false
  return a.every((o, i) => o.value === b[i].value)
}

function isItemChecked(item: CascaderOption, menuIndex: number): boolean {
  if (!isMultiple.value) return false
  const itemPath = [...activePath.value.slice(0, menuIndex), item]
  if (config.value.checkStrictly) {
    return multiSelected.value.some(selected => isPathEqual(selected, itemPath))
  }
  if (!hasChildren(item)) {
    return multiSelected.value.some(selected => isPathEqual(selected, itemPath))
  }
  // 非叶子节点：所有叶子全部选中才算选中
  const leaves = collectLeaves(item).filter(leaf => !leaf.node.disabled)
  if (leaves.length === 0) return false
  return leaves.every(leaf => {
    const leafPath = [...itemPath, ...leaf.path]
    return multiSelected.value.some(selected => isPathEqual(selected, leafPath))
  })
}

// 半选状态：子节点中部分被选中
function isItemIndeterminate(item: CascaderOption, menuIndex: number): boolean {
  if (!isMultiple.value) return false
  if (!hasChildren(item)) return false
  if (isItemChecked(item, menuIndex)) return false
  const itemPath = [...activePath.value.slice(0, menuIndex), item]
  // 检查该节点的所有叶子是否部分被选中
  const leaves = collectLeaves(item)
  const checkedCount = leaves.filter(leaf => {
    const leafPath = [...itemPath, ...leaf.path]
    return multiSelected.value.some(selected => isPathEqual(selected, leafPath))
  }).length
  return checkedCount > 0 && checkedCount < leaves.length
}

interface LeafInfo { node: CascaderOption; path: CascaderOption[] }

function collectLeaves(node: CascaderOption, ancestors: CascaderOption[] = []): LeafInfo[] {
  const result: LeafInfo[] = []
  if (!node.children || node.children.length === 0) {
    result.push({ node, path: [] })
    return result
  }
  for (const child of node.children) {
    const sub = collectLeaves(child, [...ancestors, node])
    for (const leaf of sub) {
      leaf.path = [child, ...leaf.path]
      result.push(leaf)
    }
  }
  return result
}

// ===== 过滤建议 =====
interface SuggestionItem {
  key: string
  node: CascaderOption
  path: CascaderOption[]
  pathLabels: string[]
  highlighted: string
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function highlight(text: string, keyword: string): string {
  const escaped = escapeHtml(text)
  if (!keyword) return escaped
  const lowerText = text.toLowerCase()
  const lowerKw = keyword.toLowerCase()
  const idx = lowerText.indexOf(lowerKw)
  if (idx === -1) return escaped
  const before = escapeHtml(text.slice(0, idx))
  const match = escapeHtml(text.slice(idx, idx + keyword.length))
  const after = escapeHtml(text.slice(idx + keyword.length))
  return `${before}<b class="m-cascader__highlight">${match}</b>${after}`
}

function flattenOptions(options: CascaderOption[], ancestors: CascaderOption[] = [], result: { node: CascaderOption; path: CascaderOption[]; pathLabels: string[] }[] = []) {
  for (const opt of options) {
    const newPath = [...ancestors, opt]
    result.push({
      node: opt,
      path: newPath,
      pathLabels: newPath.map(o => o.label),
    })
    if (opt.children && opt.children.length > 0) {
      flattenOptions(opt.children, newPath, result)
    }
  }
  return result
}

const suggestions = computed<SuggestionItem[]>(() => {
  if (!props.filterable || !searchKeyword.value) return []
  const all = flattenOptions(props.options)
  // 只保留可选节点：叶子节点，或 checkStrictly 时的任意节点
  const candidates = all.filter(item => {
    if (item.node.disabled) return false
    if (config.value.checkStrictly) return true
    return !hasChildren(item.node)
  })
  const kw = searchKeyword.value
  return candidates
    .filter(item => {
      const filterNode: FilterNode = {
        ...item.node,
        path: item.path,
        pathLabels: item.pathLabels,
        text: item.pathLabels.join(props.separator),
      }
      if (props.filterMethod) return props.filterMethod(filterNode, kw)
      // 默认：节点 label 或任一祖先 label 包含关键字
      return item.pathLabels.some(label => label.toLowerCase().includes(kw.toLowerCase()))
    })
    .map(item => {
      const labelToHighlight = props.showAllLevels
        ? item.pathLabels.join(props.separator)
        : item.node.label
      return {
        key: item.path.map(o => o.value).join('.'),
        node: item.node,
        path: item.path,
        pathLabels: item.pathLabels,
        highlighted: highlight(labelToHighlight, kw),
      }
    })
})

function isSuggestionChecked(suggestion: SuggestionItem): boolean {
  if (!isMultiple.value) {
    return isPathEqual(selectedOptions.value, suggestion.path)
  }
  return multiSelected.value.some(selected => isPathEqual(selected, suggestion.path))
}

function handleSuggestionClick(suggestion: SuggestionItem) {
  if (suggestion.node.disabled) return
  if (isMultiple.value) {
    toggleMultiSelect(suggestion.path)
  } else {
    selectedOptions.value = suggestion.path.slice()
    activePath.value = suggestion.path.slice(0, -1)
    emitSelect()
    closePanel()
  }
  searchKeyword.value = ''
}

// ===== 选中逻辑 =====
function emitSelect() {
  const valuePath = selectedOptions.value.map(o => o.value)
  const emitValue = config.value.emitPath ? valuePath : (valuePath[valuePath.length - 1] as any)
  emit('update:modelValue', emitValue)
  emit('change', emitValue, selectedOptions.value.slice())
}

function toggleMultiSelect(path: CascaderOption[]) {
  const existIdx = multiSelected.value.findIndex(selected => isPathEqual(selected, path))
  if (existIdx >= 0) {
    const removed = multiSelected.value.splice(existIdx, 1)[0]
    emitMultiChange()
    emit('remove-tag', config.value.emitPath ? removed.map(o => o.value) : removed[removed.length - 1].value)
  } else {
    multiSelected.value.push(path.slice())
    emitMultiChange()
  }
}

// 切换父节点下所有叶子节点的选中状态：全选则取消全部，否则选中全部未选中的
function toggleParentSelect(parentPath: CascaderOption[], parentNode: CascaderOption) {
  const leaves = collectLeaves(parentNode).filter(leaf => !leaf.node.disabled)
  if (leaves.length === 0) return
  const leafPaths = leaves.map(leaf => [...parentPath, ...leaf.path])
  const allChecked = leafPaths.every(lp => multiSelected.value.some(s => isPathEqual(s, lp)))
  if (allChecked) {
    leafPaths.forEach(lp => {
      const idx = multiSelected.value.findIndex(s => isPathEqual(s, lp))
      if (idx >= 0) multiSelected.value.splice(idx, 1)
    })
  } else {
    leafPaths.forEach(lp => {
      if (!multiSelected.value.some(s => isPathEqual(s, lp))) {
        multiSelected.value.push(lp.slice())
      }
    })
  }
  emitMultiChange()
}

// 展开到第一个叶子节点的路径，让用户能看到深层选中状态
function expandToFirstLeaf(itemPath: CascaderOption[], item: CascaderOption) {
  let current = item
  const path = [...itemPath]
  while (current.children && current.children.length > 0) {
    current = current.children[0]
    path.push(current)
  }
  activePath.value = path
  emit('expand', activePath.value.map(o => o.value))
}

function emitMultiChange() {
  const emitValue = config.value.emitPath
    ? multiSelected.value.map(path => path.map(o => o.value))
    : multiSelected.value.map(path => path[path.length - 1].value)
  emit('update:modelValue', emitValue)
  emit('change', emitValue, multiSelected.value.map(p => p.slice()))
}

function handleItemClick(item: CascaderOption, menuIndex: number) {
  if (item.disabled) return

  // 更新 activePath 到当前层级
  activePath.value = activePath.value.slice(0, menuIndex)
  activePath.value[menuIndex] = item
  emit('expand', activePath.value.map(o => o.value))

  const isLeaf = !hasChildren(item)
  const itemPath = activePath.value.slice(0, menuIndex + 1)

  if (isMultiple.value) {
    if (config.value.checkStrictly) {
      // checkStrictly：任意节点可单独切换，不联动子级
      toggleMultiSelect(itemPath)
    } else if (isLeaf) {
      // 叶子节点切换
      toggleMultiSelect(itemPath)
    } else {
      // 非叶子节点：切换其下所有叶子节点的选中状态，并展开到第一个叶子
      toggleParentSelect(itemPath, item)
      expandToFirstLeaf(itemPath, item)
    }
    return
  }

  // 单选
  if (isLeaf || config.value.checkStrictly) {
    selectedOptions.value = itemPath.slice()
    emitSelect()
    if (isLeaf) {
      closePanel()
    }
  }
}

function handleItemHover(item: CascaderOption, menuIndex: number) {
  if (config.value.expandTrigger !== 'hover') return
  if (item.disabled) return
  if (!hasChildren(item) && !config.value.checkStrictly) return

  activePath.value = activePath.value.slice(0, menuIndex)
  activePath.value[menuIndex] = item
  emit('expand', activePath.value.map(o => o.value))
}

// ===== 面板开关 =====
function openPanel() {
  panelVisible.value = true
  visible.value = true
  updatePosition()
  if (isMultiple.value) {
    // 多选展开路径保持当前 activePath
    if (activePath.value.length === 0 && multiSelected.value.length > 0) {
      activePath.value = multiSelected.value[0].slice(0, -1)
    }
  } else {
    if (selectedOptions.value.length > 0) {
      activePath.value = selectedOptions.value.slice(0, -1)
    } else {
      activePath.value = []
    }
  }
  if (props.filterable) {
    setTimeout(() => inputRef.value?.focus(), 0)
  }
}

function closePanel() {
  panelVisible.value = false
  visible.value = false
  searchKeyword.value = ''
}

function handleTriggerClick() {
  if (effectiveDisabled.value) return
  if (panelVisible.value) {
    closePanel()
  } else {
    openPanel()
  }
}

function handleSearchInput(event: Event) {
  if (!props.filterable) return
  const target = event.target as HTMLInputElement
  searchKeyword.value = target.value
  if (!panelVisible.value) {
    openPanel()
  }
}

function removeTag(tag: TagItem) {
  if (effectiveDisabled.value) return
  const idx = multiSelected.value.findIndex(selected => isPathEqual(selected, tag.path))
  if (idx >= 0) {
    const removed = multiSelected.value.splice(idx, 1)[0]
    emitMultiChange()
    emit('remove-tag', config.value.emitPath ? removed.map(o => o.value) : removed[removed.length - 1].value)
  }
}

function handleClear() {
  if (isMultiple.value) {
    multiSelected.value = []
  } else {
    selectedOptions.value = []
    activePath.value = []
  }
  searchKeyword.value = ''
  emit('update:modelValue', isMultiple.value ? [] : (config.value.emitPath ? [] : ''))
  emit('change', isMultiple.value ? [] : (config.value.emitPath ? [] : ''), isMultiple.value ? [] : [])
  emit('clear')
  closePanel()
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  // 延迟以允许点击建议项
  setTimeout(() => {
    if (!wrapperRef.value?.contains(document.activeElement) && !popperRef.value?.contains(document.activeElement)) {
      emit('blur', event)
    }
  }, 150)
}

// 点击外部关闭
function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (
    wrapperRef.value && !wrapperRef.value.contains(target) &&
    popperRef.value && !popperRef.value.contains(target)
  ) {
    closePanel()
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  if (typeof ResizeObserver !== 'undefined' && tagsContainerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      calcMaxTags()
    })
    resizeObserver.observe(tagsContainerRef.value)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  resizeObserver?.disconnect()
  resizeObserver = null
})

watch(() => allTags.value.length, () => {
  nextTick(() => calcMaxTags())
})

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<style lang="scss">
.m-cascader {
  display: inline-flex;
  position: relative;
  width: 100%;
  font-size: var(--mosaic-font-size);

  &__trigger {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(--mosaic-size-default);
    padding: 4px 12px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    background-color: #fff;
    cursor: pointer;
    transition: border-color 0.2s;
    box-sizing: border-box;
    flex-wrap: wrap;

    &:hover {
      border-color: var(--mosaic-text-secondary);
    }

    &--active {
      border-color: var(--mosaic-primary);
    }
  }

  &__input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: inherit;
    color: var(--mosaic-text-secondary);
    cursor: pointer;
    height: calc(var(--mosaic-size-default) - 8px);

    &::placeholder {
      color: var(--mosaic-text-placeholder);
    }

    &:disabled {
      cursor: not-allowed;
    }

    &--inline {
      flex: 1;
      min-width: 60px;
      width: auto;
    }
  }

  &__placeholder {
    color: var(--mosaic-text-placeholder);
    flex: 1;
  }

  &__suffix {
    display: inline-flex;
    align-items: center;
    margin-left: 8px;
    flex-shrink: 0;
    color: var(--mosaic-text-secondary);
  }

  &__arrow {
    display: inline-flex;
    align-items: center;
    transition: transform 0.2s;
    color: var(--mosaic-text-secondary);

    &--up {
      transform: rotate(180deg);
    }
  }

  &__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--mosaic-text-secondary);
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: var(--mosaic-text-primary);
    }
  }

  /* === Tags === */
  &__tags {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    gap: 4px;
    align-items: center;
    flex: 1;
    min-width: 0;
  }

  &__tags-measure {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    left: 0;
    top: 0;
    display: flex;
    gap: 4px;
    align-items: center;
    white-space: nowrap;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 6px;
    background-color: var(--mosaic-fill-color-light);
    border: 1px solid var(--mosaic-border-color-light);
    border-radius: var(--mosaic-border-radius);
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-secondary); 
    max-width: 100%;

    &-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 200px;
    }

    &-close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-left: 4px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      font-size: 14px;
      color: var(--mosaic-text-secondary);
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;

      &:hover {
        background-color: var(--mosaic-text-secondary);
        color: #fff;
      }
    }

    &--collapse {
      cursor: default;
      padding: 0 8px;
    }
  }

  /* === Size === */
  &--small &__trigger {
    min-height: var(--mosaic-size-small);
    padding: 2px 10px;
    font-size: var(--mosaic-font-size-sm);
  }

  &--large &__trigger {
    min-height: var(--mosaic-size-large);
    padding: 4px 14px;
    font-size: var(--mosaic-font-size);
  }

  /* === Disabled === */
  &--disabled &__trigger {
    background-color: var(--mosaic-disabled-bg-color);
    border-color: var(--mosaic-border-color);
    cursor: not-allowed;

    &:hover {
      border-color: var(--mosaic-border-color);
    }
  }

  &--disabled &__input,
  &--disabled &__placeholder {
    color: var(--mosaic-disabled-text-color);
    cursor: not-allowed;
  }

  /* === Panel === */
  &__panel {
    display: flex;
    background-color: #fff;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: max-content;
    max-width: 600px;
  }

  &__menu {
    min-width: 160px;
    max-height: 240px;
    overflow-y: auto;
    padding: 6px 0;
    border-right: 1px solid var(--mosaic-border-color-light);

    &:last-child {
      border-right: none;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: 34px;
    line-height: 34px;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-regular);
    cursor: pointer;
    transition: background-color 0.15s;
    white-space: nowrap;

    &:hover {
      background-color: var(--mosaic-fill-color-light);
    }

    &--active {
      color: var(--mosaic-primary);
      font-weight: 500;
      background-color: var(--mosaic-fill-color-light);
    }

    &--selected {
      color: var(--mosaic-primary);
      font-weight: 500;
    }

    &--disabled {
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }
  }

  &__item-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__item-arrow {
    margin-left: 8px;
    color: var(--mosaic-text-secondary);
    display: inline-flex;
    align-items: center;
  }

  &__item-check {
    margin-left: 8px;
    color: var(--mosaic-primary);
    display: inline-flex;
    align-items: center;
  }

  /* === Checkbox === */
  &__checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    margin-right: 8px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: 2px;
    background-color: #fff;
    color: #fff;
    flex-shrink: 0;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;

    &.is-checked {
      background-color: var(--mosaic-primary);
      border-color: var(--mosaic-primary);
      color: #fff;
    }

    &.is-indeterminate {
      border-color: var(--mosaic-primary);
    }
  }

  &__checkbox-indeterminate {
    display: block;
    width: 8px;
    height: 2px;
    background-color: var(--mosaic-primary);
  }

  /* === Suggestion === */
  &__suggestion {
    min-width: 100%;
    max-height: 264px;
    overflow-y: auto;
    padding: 6px 0;

    &-empty {
      padding: 16px;
      text-align: center;
      color: var(--mosaic-text-secondary);
      font-size: var(--mosaic-font-size-sm);
    }

    &-item {
      display: flex;
      align-items: center;
      padding: 0 12px;
      height: 34px;
      line-height: 34px;
      cursor: pointer;
      color: var(--mosaic-text-regular);
      font-size: var(--mosaic-font-size);
      transition: background-color 0.15s;
      white-space: nowrap;

      &:hover {
        background-color: var(--mosaic-fill-color-light);
      }

      &--checked {
        color: var(--mosaic-primary);
      }

      &--disabled {
        color: var(--mosaic-disabled-text-color);
        cursor: not-allowed;

        &:hover {
          background-color: transparent;
        }
      }
    }

    &-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__highlight {
    color: var(--mosaic-primary);
    font-weight: 500;
  }
}
</style>
