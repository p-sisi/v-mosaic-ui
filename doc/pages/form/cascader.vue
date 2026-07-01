<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Cascader 级联选择器</h1>
    <p class="doc-page__desc">从一组关联的数据集合中进行选择，支持多层级联展开、多选、过滤等。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">通过 <code>options</code> 设置数据源，<code>v-model</code> 绑定选中值路径数组。面板宽度会随展开层级自然展开。</p>
        <DemoBlock :code="basicCode">
          <MCascader v-model="basicValue" :options="options" @change="handleChange" />
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ basicValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="default-value">
        <h2>默认选中</h2>
        <p class="doc-page__hint">通过 <code>v-model</code> 设置默认选中的路径数组。</p>
        <DemoBlock :code="defaultValueCode">
          <MCascader v-model="defaultValue" :options="options" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="show-all-levels">
        <h2>仅显示最后一级</h2>
        <p class="doc-page__hint"><code>show-all-levels</code> 默认为 <code>true</code>，显示完整路径。设置为 <code>false</code> 时仅显示最后一级数据。</p>
        <DemoBlock :code="showAllLevelsCode">
          <MCascader v-model="showAllLevelsValue" :options="options" :show-all-levels="false" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="hover">
        <h2>悬停展开</h2>
        <p class="doc-page__hint">通过 <code>:cascader-props="{ expandTrigger: 'hover' }"</code> 设置鼠标悬停时展开下一级。</p>
        <DemoBlock :code="hoverCode">
          <MCascader v-model="hoverValue" :options="options" :cascader-props="{ expandTrigger: 'hover' }" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="check-strictly">
        <h2>选择任意一级</h2>
        <p class="doc-page__hint">通过 <code>:cascader-props="{ checkStrictly: true }"</code> 允许选择任意一级，不限制只能选叶子节点。</p>
        <DemoBlock :code="checkStrictlyCode">
          <MCascader v-model="strictlyValue" :options="options" :cascader-props="{ checkStrictly: true }" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="multiple">
        <h2>多选</h2>
        <p class="doc-page__hint">设置 <code>multiple</code> 属性启用多选，每项前出现 checkbox。所有选中的标签默认全部显示。</p>
        <DemoBlock :code="multipleCode">
          <MCascader v-model="multipleValue" :options="options" multiple />
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ multipleValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="collapse-tags">
        <h2>折叠标签</h2>
        <p class="doc-page__hint">多选时设置 <code>collapse-tags</code> 折叠选中标签。默认根据可视区域自动折叠，超出的标签显示为 <code>+N</code>；<code>collapse-tags-tooltip</code> 默认开启，悬停可查看全部已选；也可通过 <code>max-collapse-tags</code> 固定显示数量。</p>
        <DemoBlock :code="collapseTagsCode">
          <div class="doc-demo-group" style="flex-direction: column; gap: 12px; align-items: stretch;">
            <MCascader v-model="collapseValue" :options="options" multiple collapse-tags />
            <MCascader v-model="collapseValue" :options="options" multiple collapse-tags :max-collapse-tags="2" />
            <MCascader v-model="collapseValue" :options="options" multiple collapse-tags :collapse-tags-tooltip="false" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="filterable">
        <h2>过滤搜索</h2>
        <p class="doc-page__hint">添加 <code>filterable</code> 启用过滤，输入关键字会匹配所有节点的标签及其父节点的标签。可通过 <code>filter-method</code> 自定义搜索逻辑。</p>
        <DemoBlock :code="filterableCode">
          <div class="doc-demo-group" style="flex-direction: column; gap: 12px; align-items: stretch;">
            <MCascader v-model="filterableValue" :options="options" filterable />
            <MCascader
              v-model="filterMethodValue"
              :options="options"
              filterable
              :filter-method="customFilter"
            />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom-content">
        <h2>自定义节点内容</h2>
        <p class="doc-page__hint">通过默认插槽自定义节点内容，插槽接收 <code>{ data }</code> 参数（当前节点数据）。</p>
        <DemoBlock :code="customContentCode">
          <MCascader v-model="customValue" :options="options">
            <template #default="{ data }">
              <span style="display: inline-flex; align-items: center; gap: 4px;">
                <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--mosaic-primary); display: inline-block;"></span>
                {{ data.label }}
              </span>
            </template>
          </MCascader>
        </DemoBlock>
      </div>

      <div class="doc-section" id="clearable">
        <h2>可清空</h2>
        <p class="doc-page__hint">设置 <code>clearable</code> 属性，选中后显示清除按钮。</p>
        <DemoBlock :code="clearableCode">
          <MCascader v-model="clearableValue" :options="options" clearable />
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用</h2>
        <p class="doc-page__hint">设置 <code>disabled</code> 属性禁用整个组件，或在选项中设置 <code>disabled: true</code> 禁用单个选项。</p>
        <DemoBlock :code="disabledCode">
          <div class="doc-demo-group" style="flex-direction: column; gap: 12px; align-items: stretch;">
            <MCascader v-model="disabledValue" :options="options" disabled />
            <MCascader v-model="optionDisabledValue" :options="optionsWithDisabled" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="separator">
        <h2>自定义分隔符</h2>
        <p class="doc-page__hint">通过 <code>separator</code> 属性自定义路径分隔符。</p>
        <DemoBlock :code="separatorCode">
          <MCascader v-model="separatorValue" :options="options" separator=" > " />
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>不同尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 属性设置尺寸。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group" style="flex-direction: column; gap: 12px; align-items: stretch;">
            <MCascader v-model="sizeValue" :options="options" size="small" />
            <MCascader v-model="sizeValue" :options="options" />
            <MCascader v-model="sizeValue" :options="options" size="large" />
          </div>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />
    <h3>cascaderProps 配置</h3>
    <ApiTable type="prop" :data="DATA.configProps" />
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

interface CascaderOption {
  value: string | number
  label: string
  disabled?: boolean
  children?: CascaderOption[]
}

const options: CascaderOption[] = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [
          { value: 'haishu', label: '海曙区' },
          { value: 'jiangbei', label: '江北区' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'gulou', label: '鼓楼区' },
        ],
      },
      {
        value: 'suzhou',
        label: '苏州',
        children: [
          { value: 'gusu', label: '姑苏区' },
          { value: 'wuzhong', label: '吴中区' },
        ],
      },
    ],
  },
]

const optionsWithDisabled: CascaderOption[] = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        disabled: true,
        children: [
          { value: 'xihu', label: '西湖区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [
          { value: 'haishu', label: '海曙区' },
        ],
      },
    ],
  },
]

const basicValue = ref<(string | number)[]>([])
const defaultValue = ref(['zhejiang', 'hangzhou', 'xihu'])
const showAllLevelsValue = ref<(string | number)[]>([])
const hoverValue = ref<(string | number)[]>([])
const strictlyValue = ref<(string | number)[]>([])
const multipleValue = ref<(string | number)[][]>([])
const collapseValue = ref<(string | number)[][]>([
  ['zhejiang', 'hangzhou', 'xihu'],
  ['zhejiang', 'hangzhou', 'binjiang'],
  ['jiangsu', 'nanjing', 'xuanwu'],
])
const filterableValue = ref<(string | number)[]>([])
const filterMethodValue = ref<(string | number)[]>([])
const customValue = ref<(string | number)[]>([])
const clearableValue = ref(['jiangsu', 'nanjing', 'xuanwu'])
const disabledValue = ref(['zhejiang', 'hangzhou', 'xihu'])
const optionDisabledValue = ref<(string | number)[]>([])
const separatorValue = ref<(string | number)[]>([])
const sizeValue = ref<(string | number)[]>([])

function handleChange(value: any, path: any) {
  console.log('change', value, path)
}

function customFilter(node: any, keyword: string): boolean {
  // node 包含 pathLabels（所有层级 label）和 text（完整路径文本）
  // 这里自定义：只匹配完整路径文本中包含关键字的叶子节点
  return node.text.includes(keyword)
}

const basicCode = `<MCascader v-model="value" :options="options" />

<script setup>
const value = ref([])
const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
        ],
      },
    ],
  },
]
<` + `/script>`

const defaultValueCode = `<MCascader v-model="value" :options="options" />

<script setup>
const value = ref(['zhejiang', 'hangzhou', 'xihu'])
<` + `/script>`

const showAllLevelsCode = `<MCascader v-model="value" :options="options" :show-all-levels="false" />`

const hoverCode = `<MCascader v-model="value" :options="options" :cascader-props="{ expandTrigger: 'hover' }" />`

const checkStrictlyCode = `<MCascader v-model="value" :options="options" :cascader-props="{ checkStrictly: true }" />`

const multipleCode = `<MCascader v-model="value" :options="options" multiple />`

const collapseTagsCode = `<!-- 默认：按可视区域自动折叠，tooltip 默认开启 -->
<MCascader v-model="value" :options="options" multiple collapse-tags />

<!-- 固定显示 2 个 -->
<MCascader v-model="value" :options="options" multiple collapse-tags :max-collapse-tags="2" />

<!-- 关闭 tooltip -->
<MCascader v-model="value" :options="options" multiple collapse-tags :collapse-tags-tooltip="false" />`

const filterableCode = `<!-- 默认过滤：匹配节点及其祖先 label 是否包含关键字 -->
<MCascader v-model="value" :options="options" filterable />

<!-- 自定义过滤逻辑 -->
<MCascader
  v-model="value"
  :options="options"
  filterable
  :filter-method="filterMethod"
/>

<script setup>
// 第一个参数 node 含 path/pathLabels/text，第二个为关键字 keyword，返回布尔值
function filterMethod(node, keyword) {
  // node.text 为完整路径文本，如 "浙江 / 杭州 / 西湖区"
  return node.text.includes(keyword)
}
<` + `/script>`

const customContentCode = `<MCascader v-model="value" :options="options">
  <template #default="{ data }">
    <span>{{ data.label }}</span>
  </template>
</MCascader>`

const clearableCode = `<MCascader v-model="value" :options="options" clearable />`

const disabledCode = `<!-- 组件禁用 -->
<MCascader v-model="value" :options="options" disabled />

<!-- 选项禁用 -->
<MCascader v-model="value" :options="optionsWithDisabled" />

<script setup>
const optionsWithDisabled = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        disabled: true,
        children: [{ value: 'xihu', label: '西湖区' }],
      },
    ],
  },
]
<` + `/script>`

const separatorCode = `<MCascader v-model="value" :options="options" separator=" > " />`

const sizeCode = `<MCascader v-model="value" :options="options" size="small" />
<MCascader v-model="value" :options="options" />
<MCascader v-model="value" :options="options" size="large" />`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'default-value', label: '默认选中' },
  { id: 'show-all-levels', label: '仅显示最后一级' },
  { id: 'hover', label: '悬停展开' },
  { id: 'check-strictly', label: '选择任意一级' },
  { id: 'multiple', label: '多选' },
  { id: 'collapse-tags', label: '折叠标签' },
  { id: 'filterable', label: '过滤搜索' },
  { id: 'custom-content', label: '自定义节点内容' },
  { id: 'clearable', label: '可清空' },
  { id: 'disabled', label: '禁用' },
  { id: 'separator', label: '自定义分隔符' },
  { id: 'size', label: '不同尺寸' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'Array | Array[]', '[]', '选中值（v-model）；单选为路径数组，多选为路径数组的数组'],
    ['options', 'CascaderOption[]', '[]', '可选项数据源'],
    ['cascaderProps', 'CascaderConfig', '{}', '配置项，见下方配置'],
    ['placeholder', 'string', '请选择', '占位文本'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['clearable', 'boolean', 'false', '是否可清空'],
    ['size', 'small | default | large', 'default', '尺寸'],
    ['separator', 'string', ' / ', '路径分隔符'],
    ['showAllLevels', 'boolean', 'true', '是否显示完整路径，false 时仅显示最后一级'],
    ['multiple', 'boolean', 'false', '是否多选'],
    ['collapseTags', 'boolean', 'false', '多选时是否折叠标签'],
    ['maxCollapseTags', 'number', '—', '折叠时显示的最大 tag 数量，不设置则按可视区域自动折叠'],
    ['collapseTagsTooltip', 'boolean', 'true', '折叠标签时是否显示 tooltip 查看全部'],
    ['filterable', 'boolean', 'false', '是否可过滤搜索'],
    ['filterMethod', '(node: FilterNode, keyword: string) => boolean', '—', '自定义过滤方法，node 含 path/pathLabels/text'],
    ['placement', 'string', 'bottom-start', '弹出层位置'],
    ['popperClass', 'string', '—', '弹出层自定义类名'],
  ],
  configProps: [
    ['expandTrigger', 'click | hover', 'click', '展开触发方式'],
    ['checkStrictly', 'boolean', 'false', '是否允许选择任意一级'],
    ['emitPath', 'boolean', 'true', '是否返回完整路径'],
  ],
  events: [
    ['change', 'value, path', '选中值变化时触发'],
    ['expand', 'value', '展开层级变化时触发'],
    ['focus', 'event', '获得焦点时触发'],
    ['blur', 'event', '失去焦点时触发'],
    ['clear', '—', '清空时触发'],
    ['remove-tag', 'value', '多选时移除标签时触发'],
  ],
  slots: [
    ['default', '自定义节点内容，插槽 prop: { data }（当前节点数据）'],
  ],
}
</script>
