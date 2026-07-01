<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>PageHeader 页头</h1>
    <p class="doc-page__desc">用于页面顶部区域，展示页面标题和返回操作。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MPageHeader</code> 显示页面标题，点击返回区域触发 <code>back</code> 事件。</p>
        <DemoBlock :code="basicCode">
          <MPageHeader title="页面标题" @back="handleBack" />
          <span class="demo-event-result" v-if="backMsg">{{ backMsg }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom">
        <h2>自定义内容</h2>
        <p class="doc-page__hint">通过 <code>content</code> 属性或 <code>#content</code> 插槽自定义内容区域。</p>
        <DemoBlock :code="customCode">
          <MPageHeader title="页面标题" content="页面描述内容" @back="handleBack" />
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

const backMsg = ref('')
function handleBack() {
  backMsg.value = 'back 事件已触发'
  setTimeout(() => { backMsg.value = '' }, 1500)
}

const basicCode = `<MPageHeader title="页面标题" @back="handleBack" />

<script setup>
function handleBack() {
  console.log('back')
}
<` + `/script>`

const customCode = `<MPageHeader title="页面标题" content="页面描述内容" @back="handleBack" />`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'custom', label: '自定义内容' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['title', 'string', '—', '标题'],
    ['content', 'string', '—', '内容'],
  ],
  events: [
    ['back', '—', '点击返回区域时触发'],
  ],
  slots: [
    ['title', '标题区域'],
    ['content', '内容区域'],
  ],
}
</script>
