<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>TreeSelect 树形选择</h1>
    <p class="doc-page__desc">基于 MTree 的下拉树选择器，支持单选、多选勾选、check-strictly、禁用、关键字筛选与自定义节点内容。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础单选</h2>
        <p class="doc-page__hint"><code>v-model</code> 绑定选中节点的 key，点击节点即选中并关闭。</p>
        <DemoBlock :code="basicCode">
          <MTreeSelect v-model="basicValue" :data="treeData" placeholder="请选择节点" />
          <span class="demo-event-result">当前值：{{ basicValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="multiple">
        <h2>多选（勾选）</h2>
        <p class="doc-page__hint">设置 <code>multiple</code> 或 <code>show-checkbox</code> 启用勾选模式，<code>v-model</code> 为 key 数组。默认（<code>check-strictly=false</code>）仅取叶子节点的 key。</p>
        <DemoBlock :code="multipleCode">
          <MTreeSelect v-model="multipleValue" :data="treeData" multiple placeholder="请选择" />
          <span class="demo-event-result">当前值：{{ multipleValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="check-strictly">
        <h2>任意节点可选</h2>
        <p class="doc-page__hint">设置 <code>check-strictly</code> 后父子节点不关联，任意节点都可独立勾选，绑定值包含所有勾选项的 key。</p>
        <DemoBlock :code="checkStrictlyCode">
          <MTreeSelect v-model="strictlyValue" :data="treeData" multiple check-strictly />
          <span class="demo-event-result">当前值：{{ strictlyValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用节点</h2>
        <p class="doc-page__hint">数据项设置 <code>disabled: true</code> 后该项不可选。也可禁用整个选择器。</p>
        <DemoBlock :code="disabledCode">
          <MTreeSelect v-model="disabledValue" :data="disabledTreeData" placeholder="请选择" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="filterable">
        <h2>可搜索</h2>
        <p class="doc-page__hint">设置 <code>filterable</code> 开启关键字搜索，默认按 label 包含匹配。可通过 <code>filter-method</code> 自定义搜索逻辑。</p>
        <DemoBlock :code="filterableCode">
          <MTreeSelect v-model="filterableValue" :data="treeData" filterable placeholder="搜索节点" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="clearable">
        <h2>可清空</h2>
        <p class="doc-page__hint">设置 <code>clearable</code> 后有值时 hover 出现清除按钮。</p>
        <DemoBlock :code="clearableCode">
          <MTreeSelect v-model="clearableValue" :data="treeData" clearable placeholder="请选择" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="slot">
        <h2>自定义节点内容</h2>
        <p class="doc-page__hint">通过默认 scoped slot 自定义树节点渲染，接收 <code>{ node, data }</code>。</p>
        <DemoBlock :code="slotCode">
          <MTreeSelect v-model="slotValue" :data="treeData" placeholder="请选择">
            <template #default="{ data }">
              <span style="color: var(--mosaic-primary);">{{ data.label }}</span>
              <span v-if="data.children" style="font-size: 12px; color: var(--mosaic-text-placeholder);">（{{ data.children.length }}）</span>
            </template>
          </MTreeSelect>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />

    <h3>Events</h3>
    <ApiTable type="event" :data="DATA.events" />

    <h3>Slots</h3>
    <ApiTable type="slot" :data="DATA.slots" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

interface TreeNode {
  key: number | string
  label: string
  disabled?: boolean
  children?: TreeNode[]
}

const treeData: TreeNode[] = [
  {
    key: 1, label: '部门 A',
    children: [
      { key: 11, label: '研发组' },
      { key: 12, label: '测试组' },
      {
        key: 13, label: '产品组',
        children: [
          { key: 131, label: '产品经理' },
          { key: 132, label: '交互设计' },
        ],
      },
    ],
  },
  {
    key: 2, label: '部门 B',
    children: [
      { key: 21, label: '前端组' },
      { key: 22, label: '后端组' },
    ],
  },
  { key: 3, label: '部门 C' },
]

const disabledTreeData: TreeNode[] = [
  {
    key: 1, label: '可用分组',
    children: [
      { key: 11, label: '选项 1' },
      { key: 12, label: '禁用选项', disabled: true },
    ],
  },
  { key: 2, label: '独立选项' },
]

const basicValue = ref('')
const multipleValue = ref<number[]>([131, 132])
const strictlyValue = ref<number[]>([1, 21])
const disabledValue = ref('')
const filterableValue = ref('')
const clearableValue = ref<number>(11)
const slotValue = ref('')

const basicCode = `<MTreeSelect v-model="value" :data="data" placeholder="请选择节点" />`

const multipleCode = `<MTreeSelect v-model="value" :data="data" multiple />
<!-- check-strictly=false 时，v-model 仅含叶子节点 key -->`

const checkStrictlyCode = `<MTreeSelect v-model="value" :data="data" multiple check-strictly />
<!-- 任意节点都可选，v-model 含所有勾选项 key -->`

const disabledCode = `<MTreeSelect v-model="value" :data="data" placeholder="请选择" />
<!-- data: [{ key: 12, label: '禁用选项', disabled: true }, ...] -->`

const filterableCode = `<MTreeSelect v-model="value" :data="data" filterable placeholder="搜索节点" />`

const clearableCode = `<MTreeSelect v-model="value" :data="data" clearable placeholder="请选择" />`

const slotCode = `<MTreeSelect v-model="value" :data="data" placeholder="请选择">
  <template #default="{ data }">
    <span>{{ data.label }}</span>
    <span v-if="data.children">（{{ data.children.length }}）</span>
  </template>
</MTreeSelect>`

const anchors = [
  { id: 'basic', label: '基础单选' },
  { id: 'multiple', label: '多选勾选' },
  { id: 'check-strictly', label: '任意节点可选' },
  { id: 'disabled', label: '禁用节点' },
  { id: 'filterable', label: '可搜索' },
  { id: 'clearable', label: '可清空' },
  { id: 'slot', label: '自定义节点' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'any | any[]', '', '绑定值（v-model），单选为 key，多选为 key 数组'],
    ['data', 'array', '[]', '树形数据，每项含 key/label/children/disabled'],
    ['multiple', 'boolean', 'false', '是否多选（启用勾选模式）'],
    ['showCheckbox', 'boolean', 'false', '是否显示复选框'],
    ['checkStrictly', 'boolean', 'false', '父子节点不关联，任意节点可选'],
    ['disabled', 'boolean', 'false', '是否禁用整个选择器'],
    ['size', 'small | default | large', 'default', '尺寸'],
    ['clearable', 'boolean', 'false', '是否可清空'],
    ['placeholder', 'string', '请选择', '占位文本'],
    ['filterable', 'boolean', 'false', '是否可搜索'],
    ['filterMethod', 'function', '—', '自定义搜索方法 (query, data) => boolean'],
    ['filterNodeMethod', 'function', '—', '自定义节点筛选 (query, data, node) => boolean'],
    ['nodeKey', 'string', 'key', '节点唯一标识字段名'],
    ['treeProps', 'object', '{}', '字段映射 { label, children, isDisabled, isLeaf }'],
    ['defaultExpandAll', 'boolean', 'true', '是否默认展开全部节点'],
    ['placement', 'string', 'bottom-start', '弹出层位置'],
    ['popperClass', 'string', '', '弹出层自定义类名'],
  ],
  events: [
    ['update:modelValue', 'value', '值变化时触发'],
    ['change', 'value', '值变化时触发'],
    ['focus', 'event', '聚焦时触发'],
    ['blur', 'event', '失焦时触发'],
    ['clear', '—', '点击清除按钮时触发'],
    ['show', '—', '下拉显示时触发'],
    ['hide', '—', '下拉隐藏时触发'],
  ],
  slots: [
    ['default', '自定义树节点内容，scoped slot 接收 { node, data }'],
  ],
}
</script>

<style scoped lang="scss">
.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}
</style>
