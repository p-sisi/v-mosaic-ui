<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Drawer 抽屉</h1>
    <p class="doc-page__desc">从屏幕边缘滑出的浮层面板，用于承载附加操作或内容。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MDrawer</code> 从右侧弹出抽屉面板，通过 <code>v-model</code> 控制显示。</p>
        <DemoBlock :code="basicCode">
          <MButton @click="rightVisible = true">右侧抽屉</MButton>
          <MDrawer v-model="rightVisible" title="右侧抽屉">
            抽屉面板内容区域
          </MDrawer>
        </DemoBlock>
      </div>

      <div class="doc-section" id="direction">
        <h2>不同方向</h2>
        <p class="doc-page__hint">通过 <code>direction</code> 设置抽屉弹出方向，可选 <code>rtl</code>、<code>ltr</code>、<code>ttb</code>、<code>btt</code>。</p>
        <DemoBlock :code="directionCode">
          <div class="doc-demo-group" style="flex-direction: row;">
            <MButton @click="leftVisible = true">左侧</MButton>
            <MButton @click="topVisible = true">上方</MButton>
            <MButton @click="bottomVisible = true">下方</MButton>
          </div>
          <MDrawer v-model="leftVisible" title="左侧抽屉" direction="ltr">左侧内容</MDrawer>
          <MDrawer v-model="topVisible" title="上方抽屉" direction="ttb">上方内容</MDrawer>
          <MDrawer v-model="bottomVisible" title="下方抽屉" direction="btt">下方内容</MDrawer>
        </DemoBlock>
      </div>

      <div class="doc-section" id="header">
        <h2>自定义头部</h2>
        <p class="doc-page__hint">使用 <code>#header</code> 插槽自定义头部内容，<code>with-header</code> 控制是否显示头部。</p>
        <DemoBlock code='<MDrawer v-model="visible" title="自定义头部">
  <template #header>
    <span style="color: #a78bfa;">自定义标题</span>
  </template>
  内容区域
</MDrawer>'>
          <MButton @click="headerVisible = true">自定义头部</MButton>
          <MDrawer v-model="headerVisible" title="自定义头部">
            <template #header>
              <span style="color: #a78bfa;">自定义标题</span>
            </template>
            内容区域
          </MDrawer>
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

const rightVisible = ref(false)
const leftVisible = ref(false)
const topVisible = ref(false)
const bottomVisible = ref(false)
const headerVisible = ref(false)

const basicCode = `<MButton @click="rightVisible = true">右侧抽屉</MButton>

<MDrawer v-model="rightVisible" title="右侧抽屉">
  抽屉面板内容区域
</MDrawer>`

const directionCode = `<MDrawer v-model="leftVisible" title="左侧抽屉" direction="ltr">左侧内容</MDrawer>
<MDrawer v-model="topVisible" title="上方抽屉" direction="ttb">上方内容</MDrawer>
<MDrawer v-model="bottomVisible" title="下方抽屉" direction="btt">下方内容</MDrawer>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'direction', label: '不同方向' },
  { id: 'header', label: '自定义头部' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'boolean', 'false', '是否显示（v-model）'],
    ['title', 'string', '—', '标题'],
    ['direction', 'rtl | ltr | ttb | btt', 'rtl', '打开方向'],
    ['size', 'string | number', '30%', '抽屉尺寸'],
    ['modal', 'boolean', 'true', '是否需要遮罩层'],
    ['closeOnClickModal', 'boolean', 'true', '是否点击遮罩层关闭'],
    ['withHeader', 'boolean', 'true', '是否显示头部'],
    ['destroyOnClose', 'boolean', 'false', '关闭时是否销毁内容'],
  ],
  events: [
    ['open', '—', '抽屉打开时触发'],
    ['close', '—', '抽屉关闭时触发'],
  ],
  slots: [
    ['default', '抽屉内容'],
    ['header', '头部内容'],
    ['footer', '底部内容'],
  ],
}
</script>