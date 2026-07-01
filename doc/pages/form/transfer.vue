<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Transfer 穿梭框</h1>
    <p class="doc-page__desc">用于在两栏之间移动数据项。支持搜索过滤、自定义渲染、默认勾选与底部插槽。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint"><code>data</code> 为数据项数组（含 <code>key</code>/<code>label</code>），<code>v-model</code> 绑定右侧已选项的 key 数组。</p>
        <DemoBlock :code="basicCode">
          <MTransfer v-model="basicValue" :data="basicData" />
          <span class="demo-event-result">右侧值：{{ basicValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="filterable">
        <h2>可搜索</h2>
        <p class="doc-page__hint">设置 <code>filterable</code> 开启搜索，默认按 <code>label</code> 包含关键字匹配。可通过 <code>filter-method</code> 自定义搜索逻辑。</p>
        <DemoBlock :code="filterableCode">
          <MTransfer v-model="filterableValue" :data="basicData" filterable />
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用项</h2>
        <p class="doc-page__hint">数据项设置 <code>disabled: true</code> 后该项不可勾选与穿梭。</p>
        <DemoBlock :code="disabledCode">
          <MTransfer v-model="disabledValue" :data="disabledData" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="titles">
        <h2>自定义文案</h2>
        <p class="doc-page__hint">通过 <code>titles</code> 自定义两栏标题，<code>button-texts</code> 自定义中间按钮文案。</p>
        <DemoBlock :code="titlesCode">
          <MTransfer
            v-model="titlesValue"
            :data="basicData"
            :titles="['备选', '已选']"
            :button-texts="['移除', '添加']"
          />
        </DemoBlock>
      </div>

      <div class="doc-section" id="default-checked">
        <h2>默认勾选</h2>
        <p class="doc-page__hint">通过 <code>left-default-checked</code> 与 <code>right-default-checked</code> 设置初始化时即勾选的项。</p>
        <DemoBlock :code="defaultCheckedCode">
          <MTransfer
            v-model="defaultCheckedValue"
            :data="basicData"
            :left-default-checked="[3]"
            :right-default-checked="[2]"
          />
        </DemoBlock>
      </div>

      <div class="doc-section" id="render">
        <h2>自定义数据项渲染</h2>
        <p class="doc-page__hint">通过 <code>render-content</code> 渲染函数或默认 scoped slot 自定义数据项内容。</p>
        <DemoBlock :code="renderCode">
          <MTransfer v-model="renderValue" :data="renderData" :render-content="renderContent" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="footer">
        <h2>底部插槽</h2>
        <p class="doc-page__hint">通过 <code>left-footer</code> 与 <code>right-footer</code> 具名插槽自定义两栏底部内容。</p>
        <DemoBlock :code="footerCode">
          <MTransfer v-model="footerValue" :data="basicData">
            <template #left-footer>
              <span class="demo-footer-text">共 {{ basicData.length }} 项</span>
            </template>
            <template #right-footer>
              <span class="demo-footer-text">已选 {{ footerValue.length }} 项</span>
            </template>
          </MTransfer>
        </DemoBlock>
      </div>

      <div class="doc-section" id="height">
        <h2>固定高度</h2>
        <p class="doc-page__hint">通过 <code>height</code> 设置穿梭框高度，左右两栏高度一致且固定，内容超出后滚动。</p>
        <DemoBlock :code="heightCode">
          <MTransfer v-model="heightValue" :data="heightData" :height="240" />
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
import { ref, h } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

interface Item { key: number; label: string; disabled?: boolean }

const generateData = (count: number, prefix = '选项'): Item[] => {
  return Array.from({ length: count }, (_, i) => ({
    key: i + 1,
    label: `${prefix} ${i + 1}`,
  }))
}

const basicData = generateData(10)
const basicValue = ref<number[]>([1])

const filterableValue = ref<number[]>([])

const disabledData: Item[] = [
  { key: 1, label: '可用 A' },
  { key: 2, label: '禁用 B', disabled: true },
  { key: 3, label: '可用 C' },
  { key: 4, label: '禁用 D', disabled: true },
  { key: 5, label: '可用 E' },
]
const disabledValue = ref<number[]>([])

const titlesValue = ref<number[]>([])
const defaultCheckedValue = ref<number[]>([2])
const renderValue = ref<number[]>([])

const renderData: Item[] = [
  { key: 1, label: 'Vue' },
  { key: 2, label: 'React' },
  { key: 3, label: 'Angular' },
  { key: 4, label: 'Svelte' },
]
function renderContent(_h: any, option: Item) {
  return h('span', { style: 'color: var(--mosaic-primary); font-weight: 600;' }, `★ ${option.label}`)
}

const footerValue = ref<number[]>([])

const heightData = generateData(20)
const heightValue = ref<number[]>([1, 2, 3])

const basicCode = `<MTransfer v-model="value" :data="data" />`

const filterableCode = `<MTransfer v-model="value" :data="data" filterable />`

const disabledCode = `<MTransfer v-model="value" :data="data" />
<!-- data: [{ key: 1, label: '可用 A' }, { key: 2, label: '禁用 B', disabled: true }, ...] -->`

const titlesCode = `<MTransfer
  v-model="value"
  :data="data"
  :titles="['备选', '已选']"
  :button-texts="['移除', '添加']"
/>`

const defaultCheckedCode = `<MTransfer
  v-model="value"
  :data="data"
  :left-default-checked="[3]"
  :right-default-checked="[2]"
/>`

const renderCode = `<MTransfer v-model="value" :data="data" :render-content="renderContent" />

<script setup>
import { h } from 'vue'
function renderContent(h, option) {
  return h('span', { style: 'color: var(--mosaic-primary);' }, \`★ \${option.label}\`)
}
<` + `/script>`

const footerCode = `<MTransfer v-model="value" :data="data">
  <template #left-footer>共 {{ data.length }} 项</template>
  <template #right-footer>已选 {{ value.length }} 项</template>
</MTransfer>`

const heightCode = `<MTransfer v-model="value" :data="data" :height="240" />`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'filterable', label: '可搜索' },
  { id: 'disabled', label: '禁用项' },
  { id: 'titles', label: '自定义文案' },
  { id: 'default-checked', label: '默认勾选' },
  { id: 'render', label: '自定义渲染' },
  { id: 'footer', label: '底部插槽' },
  { id: 'height', label: '固定高度' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'array', '[]', '右侧已选项的 key 数组（v-model）'],
    ['data', 'array', '[]', '数据项数组，每项含 key/label/disabled'],
    ['filterable', 'boolean', 'false', '是否可搜索'],
    ['filterMethod', 'function', '—', '自定义搜索方法，接收 (query, item)，返回 boolean'],
    ['titles', '[string, string]', "['列表 1', '列表 2']", '两栏标题'],
    ['buttonTexts', '[string, string]', '[]', '中间按钮文案，为空时显示箭头'],
    ['renderContent', 'function', '—', '自定义数据项渲染函数，接收 (h, option)'],
    ['format', 'object', '—', '顶部勾选状态文案 { noChecked, hasChecked }'],
    ['leftDefaultChecked', 'array', '[]', '初始化时左侧勾选的项'],
    ['rightDefaultChecked', 'array', '[]', '初始化时右侧勾选的项'],
    ['props', 'object', "{ key:'key', label:'label', disabled:'disabled' }", '字段映射配置'],
    ['size', 'small | default | large', 'default', '尺寸'],
    ['height', 'string | number', '—', '穿梭框高度，设置后左右面板固定高度，内容超出滚动'],
  ],
  events: [
    ['update:modelValue', 'value: array', '右侧值变化时触发'],
    ['change', 'value, direction, movedKeys', '穿梭时触发'],
    ['left-check-change', 'value: array', '左侧勾选变化时触发'],
    ['right-check-change', 'value: array', '右侧勾选变化时触发'],
  ],
  slots: [
    ['default', '自定义数据项内容，scoped slot 接收 { option }'],
    ['left-footer', '左侧栏底部内容'],
    ['right-footer', '右侧栏底部内容'],
  ],
}
</script>

<style scoped lang="scss">
.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}
.demo-footer-text {
  font-size: 12px;
  color: var(--mosaic-text-secondary);
}
</style>
