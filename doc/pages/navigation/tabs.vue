<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Tabs 标签页</h1>
    <p class="doc-page__desc">分隔内容上有关联但属于不同类别的数据集合，支持多种风格和交互。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MTabs</code> 和 <code>MTabPane</code> 组合，通过 <code>v-model</code> 绑定当前激活的标签。</p>
        <DemoBlock :code="basicCode">
          <MTabs v-model="activeTab">
            <MTabPane label="用户管理" name="user">用户管理内容</MTabPane>
            <MTabPane label="配置管理" name="config">配置管理内容</MTabPane>
            <MTabPane label="角色管理" name="role">角色管理内容</MTabPane>
          </MTabs>
        </DemoBlock>
      </div>

      <div class="doc-section" id="type">
        <h2>卡片风格</h2>
        <p class="doc-page__hint">通过 <code>type="card"</code> 属性设置标签为卡片风格，卡片头部带灰色背景。</p>
        <DemoBlock :code="typeCode">
          <MTabs v-model="activeCard" type="card">
            <MTabPane label="用户管理" name="user">卡片风格</MTabPane>
            <MTabPane label="配置管理" name="config">配置管理内容</MTabPane>
            <MTabPane label="角色管理" name="role">角色管理内容</MTabPane>
          </MTabs>
        </DemoBlock>
      </div>

      <div class="doc-section" id="closable">
        <h2>可关闭</h2>
        <p class="doc-page__hint">设置 <code>closable</code> 允许关闭标签页。</p>
        <DemoBlock :code="closableCode">
          <MTabs v-model="activeClosable" closable>
            <MTabPane label="标签一" name="1">内容一</MTabPane>
            <MTabPane label="标签二" name="2">内容二</MTabPane>
            <MTabPane label="标签三" name="3">内容三</MTabPane>
          </MTabs>
        </DemoBlock>
      </div>

      <div class="doc-section" id="segment">
        <h2>滑块类型</h2>
        <p class="doc-page__hint">设置 <code>type="segment"</code>，整条背景为浅灰色，中间有白色矩形滑块滑动到当前选中标签。</p>
        <DemoBlock :code="segmentCode">
          <MTabs v-model="activeSegment" type="segment">
            <MTabPane label="用户管理" name="user">滑块类型 - 用户管理</MTabPane>
            <MTabPane label="配置管理" name="config">滑块类型 - 配置管理</MTabPane>
            <MTabPane label="角色管理" name="role">滑块类型 - 角色管理</MTabPane>
          </MTabs>
        </DemoBlock>
      </div>

      <div class="doc-section" id="center">
        <h2>标签居中</h2>
        <p class="doc-page__hint">设置 <code>center</code> 属性，标签水平居中容器。</p>
        <DemoBlock :code="centerCode">
          <MTabs v-model="activeCenter" center>
            <MTabPane label="用户管理" name="user">居中标签 - 用户管理</MTabPane>
            <MTabPane label="配置管理" name="config">居中标签 - 配置管理</MTabPane>
            <MTabPane label="角色管理" name="role">居中标签 - 角色管理</MTabPane>
          </MTabs>
        </DemoBlock>
      </div>

      <div class="doc-section" id="before-leave">
        <h2>切换前拦截</h2>
        <p class="doc-page__hint">通过 <code>before-leave</code> 钩子在切换前执行回调，返回 <code>false</code> 可阻止切换。</p>
        <DemoBlock :code="beforeLeaveCode">
          <MTabs v-model="activeBeforeLeave" :before-leave="handleBeforeLeave">
            <MTabPane label="用户管理" name="user">切换前拦截 - 用户管理</MTabPane>
            <MTabPane label="配置管理" name="config">切换前拦截 - 配置管理</MTabPane>
            <MTabPane label="角色管理" name="role">切换前拦截 - 角色管理</MTabPane>
          </MTabs>
        </DemoBlock>
      </div>

      <div class="doc-section" id="trigger">
        <h2>悬停触发</h2>
        <p class="doc-page__hint">通过 <code>trigger="hover"</code> 切换为鼠标悬停触发标签页切换，默认为 <code>click</code>。</p>
        <DemoBlock :code="triggerCode">
          <MTabs v-model="activeTrigger" trigger="hover">
            <MTabPane label="用户管理" name="user">悬停触发 - 用户管理</MTabPane>
            <MTabPane label="配置管理" name="config">悬停触发 - 配置管理</MTabPane>
            <MTabPane label="角色管理" name="role">悬停触发 - 角色管理</MTabPane>
          </MTabs>
        </DemoBlock>
      </div>

      <div class="doc-section" id="addable">
        <h2>可新增标签</h2>
        <p class="doc-page__hint">设置 <code>addable</code> 显示新增按钮（仅 <code>card</code> 类型生效），点击触发 <code>tab-add</code> 回调。</p>
        <DemoBlock :code="addableCode">
          <MTabs v-model="activeAddable" type="card" addable @tab-add="handleAdd">
            <MTabPane v-for="tab in addableTabs" :key="tab.name" :label="tab.label" :name="tab.name">
              {{ tab.content }}
            </MTabPane>
          </MTabs>
        </DemoBlock>
      </div>

      <div class="doc-section" id="position">
        <h2>标签位置</h2>
        <p class="doc-page__hint">通过 <code>tab-position</code> 设置标签位置。</p>
        <DemoBlock :code="positionCode">
          <MTabs v-model="activePosition" tab-position="left">
            <MTabPane label="用户管理" name="user">左侧标签一</MTabPane>
            <MTabPane label="配置管理" name="config">左侧标签二</MTabPane>
          </MTabs>
          <MTabs v-model="activePosition" tab-position="right">
            <MTabPane label="用户管理" name="user">右侧标签一</MTabPane>
            <MTabPane label="配置管理" name="config">右侧标签二</MTabPane>
          </MTabs>
        </DemoBlock>
      </div>

      <div class="doc-section" id="color">
        <h2>自定义颜色</h2>
        <p class="doc-page__hint">通过 <code>color</code> 属性自定义选中态颜色（文字、滑条、卡片边框），通过 <code>card-color</code> 属性自定义卡片头部背景颜色（card / segment 类型生效）。</p>
        <DemoBlock :code="colorCode">
          <MTabs v-model="activeColor1" color="#13ce66">
            <MTabPane label="用户管理" name="user">绿色主题</MTabPane>
            <MTabPane label="配置管理" name="config">配置管理内容</MTabPane>
            <MTabPane label="角色管理" name="role">角色管理内容</MTabPane>
          </MTabs>
          <MTabs v-model="activeColor2" color="#ff4949" type="card" card-color="#fdf2f2">
            <MTabPane label="用户管理" name="user">红色卡片</MTabPane>
            <MTabPane label="配置管理" name="config">配置管理内容</MTabPane>
          </MTabs>
          <MTabs v-model="activeColor3" type="segment" card-color="#e6f6ec">
            <MTabPane label="用户管理" name="user">自定义头部背景</MTabPane>
            <MTabPane label="配置管理" name="config">配置管理</MTabPane>
            <MTabPane label="角色管理" name="role">角色管理</MTabPane>
          </MTabs>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MTabs Props</h3>
    <ApiTable type="prop" :data="DATA.tabsProps" />
    <h3>MTabPane Props</h3>
    <ApiTable type="prop" :data="DATA.tabPaneProps" />
    <h3>MTabs Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const activeTab = ref('user')
const activeCard = ref('user')
const activeClosable = ref('1')
const activePosition = ref('user')
const activeColor1 = ref('user')
const activeColor2 = ref('user')
const activeColor3 = ref('user')
const activeSegment = ref('user')
const activeCenter = ref('user')
const activeBeforeLeave = ref('user')
const activeTrigger = ref('user')
const activeAddable = ref('1')

// before-leave 回调
function handleBeforeLeave(newName: string, oldName: string) {
  if (newName === 'config') {
    return confirm('确定要切换到「配置管理」吗？')
  }
  return true
}

// addable 可新增
const addableTabs = ref([
  { label: '标签一', name: '1', content: '可新增标签 - 标签一' },
  { label: '标签二', name: '2', content: '可新增标签 - 标签二' },
])
function handleAdd() {
  const next = String(addableTabs.value.length + 1)
  addableTabs.value.push({
    label: `标签${next}`,
    name: next,
    content: `可新增标签 - 标签${next}`,
  })
}

const basicCode = `<MTabs v-model="activeTab">
  <MTabPane label="用户管理" name="user">用户管理内容</MTabPane>
  <MTabPane label="配置管理" name="config">配置管理内容</MTabPane>
  <MTabPane label="角色管理" name="role">角色管理内容</MTabPane>
</MTabs>

<script setup>
const activeTab = ref('user')
<` + `/script>`

const typeCode = `<MTabs v-model="activeCard" type="card">
  <MTabPane label="用户管理" name="user">卡片风格</MTabPane>
  <MTabPane label="配置管理" name="config">配置管理内容</MTabPane>
  <MTabPane label="角色管理" name="role">角色管理内容</MTabPane>
</MTabs>`

const closableCode = `<MTabs v-model="activeClosable" closable>
  <MTabPane label="标签一" name="1">内容一</MTabPane>
  <MTabPane label="标签二" name="2">内容二</MTabPane>
  <MTabPane label="标签三" name="3">内容三</MTabPane>
</MTabs>

<MTabs v-model="activePosition" tab-position="left">
  <MTabPane label="用户管理" name="user">左侧标签</MTabPane>
  <MTabPane label="配置管理" name="config">配置管理</MTabPane>
</MTabs>`
const positionCode = `<MTabs v-model="activePosition" tab-position="left">
  <MTabPane label="用户管理" name="user">左侧标签一</MTabPane>
  <MTabPane label="配置管理" name="config">左侧标签二</MTabPane>
</MTabs>
<MTabs v-model="activePosition" tab-position="right">
  <MTabPane label="用户管理" name="user">右侧标签一</MTabPane>
  <MTabPane label="配置管理" name="config">右侧标签二</MTabPane>
</MTabs>`

const colorCode = `<MTabs v-model="v1" color="#13ce66">
  <MTabPane label="用户管理" name="user">绿色主题</MTabPane>
  <MTabPane label="配置管理" name="config">配置管理内容</MTabPane>
  <MTabPane label="角色管理" name="role">角色管理内容</MTabPane>
</MTabs>

<MTabs v-model="v2" color="#ff4949" type="card" card-color="#fdf2f2">
  <MTabPane label="用户管理" name="user">红色卡片</MTabPane>
  <MTabPane label="配置管理" name="config">配置管理内容</MTabPane>
</MTabs>

<MTabs v-model="v3" type="segment" card-color="#e6f6ec">
  <MTabPane label="用户管理" name="user">自定义头部背景</MTabPane>
  <MTabPane label="配置管理" name="config">配置管理</MTabPane>
  <MTabPane label="角色管理" name="role">角色管理</MTabPane>
</MTabs>`

const segmentCode = `<MTabs v-model="activeSegment" type="segment">
  <MTabPane label="用户管理" name="user">滑块类型 - 用户管理</MTabPane>
  <MTabPane label="配置管理" name="config">滑块类型 - 配置管理</MTabPane>
  <MTabPane label="角色管理" name="role">滑块类型 - 角色管理</MTabPane>
</MTabs>`

const centerCode = `<MTabs v-model="activeCenter" center>
  <MTabPane label="用户管理" name="user">居中标签 - 用户管理</MTabPane>
  <MTabPane label="配置管理" name="config">居中标签 - 配置管理</MTabPane>
  <MTabPane label="角色管理" name="role">居中标签 - 角色管理</MTabPane>
</MTabs>`

const beforeLeaveCode = `<MTabs v-model="activeBeforeLeave" :before-leave="handleBeforeLeave">
  <MTabPane label="用户管理" name="user">切换前拦截 - 用户管理</MTabPane>
  <MTabPane label="配置管理" name="config">切换前拦截 - 配置管理</MTabPane>
  <MTabPane label="角色管理" name="role">切换前拦截 - 角色管理</MTabPane>
</MTabs>

<script setup>
function handleBeforeLeave(newName, oldName) {
  if (newName === 'config') {
    return confirm('确定要切换到「配置管理」吗？')
  }
  return true
}
<` + `/script>`

const triggerCode = `<MTabs v-model="activeTrigger" trigger="hover">
  <MTabPane label="用户管理" name="user">悬停触发 - 用户管理</MTabPane>
  <MTabPane label="配置管理" name="config">悬停触发 - 配置管理</MTabPane>
  <MTabPane label="角色管理" name="role">悬停触发 - 角色管理</MTabPane>
</MTabs>`

const addableCode = `<MTabs v-model="activeAddable" type="card" addable @tab-add="handleAdd">
  <MTabPane v-for="tab in addableTabs" :key="tab.name" :label="tab.label" :name="tab.name">
    {{ tab.content }}
  </MTabPane>
</MTabs>

<script setup>
const activeAddable = ref('1')
const addableTabs = ref([
  { label: '标签一', name: '1', content: '可新增标签 - 标签一' },
  { label: '标签二', name: '2', content: '可新增标签 - 标签二' },
])
function handleAdd() {
  const next = String(addableTabs.value.length + 1)
  addableTabs.value.push({
    label: \`标签\${next}\`,
    name: next,
    content: \`可新增标签 - 标签\${next}\`,
  })
}
<` + `/script>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'type', label: '卡片风格' },
  { id: 'segment', label: '滑块类型' },
  { id: 'center', label: '标签居中' },
  { id: 'before-leave', label: '切换前拦截' },
  { id: 'trigger', label: '悬停触发' },
  { id: 'addable', label: '可新增标签' },
  { id: 'closable', label: '可关闭' },
  { id: 'position', label: '标签位置' },
  { id: 'color', label: '自定义颜色' },
  { id: 'api', label: 'API' },
]

const DATA = {
  tabsProps: [
    ['modelValue', 'string | number', '—', '当前激活的标签名（v-model）'],
    ['type', 'line | card | segment', 'line', '标签风格类型，segment 为滑块类型'],
    ['closable', 'boolean', 'false', '是否可关闭'],
    ['addable', 'boolean', 'false', '是否可新增（仅 card 类型生效）'],
    ['editable', 'boolean', 'false', '是否同时可新增和关闭'],
    ['tabPosition', 'top | right | bottom | left', 'top', '标签位置'],
    ['beforeLeave', '(newName, oldName) => boolean | Promise<boolean>', '—', '切换标签前的钩子，返回 false 可阻止切换'],
    ['stretch', 'boolean', 'false', '标签是否自适应宽度'],
    ['color', 'string', '—', '选中态颜色（文字、滑条）'],
    ['cardColor', 'string', '—', '卡片头部背景颜色（card / segment 类型生效）'],
    ['center', 'boolean', 'false', '标签是否水平居中容器'],
    ['trigger', 'click | hover', 'click', '标签页触发方式'],
  ],
  tabPaneProps: [
    ['label', 'string', '—', '标签标题'],
    ['name', 'string | number', '—', '标签标识，对应 v-model 值'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['closable', 'boolean', 'false', '是否可关闭'],
  ],
  events: [
    ['tab-click', 'name, event', '标签被点击时触发'],
    ['tab-remove', 'name', '标签被移除时触发'],
    ['tab-add', '—', '点击新增按钮时触发'],
    ['edit', 'name, action', '新增或移除时触发，action 为 add / remove'],
  ],
}
</script>
