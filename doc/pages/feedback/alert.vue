<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Alert 警告</h1>
    <p class="doc-page__desc">用于页面中展示重要的提示信息，支持多种类型和关闭功能。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>类型变体</h2>
        <p class="doc-page__hint">点击按钮触发对应类型的 Alert 消息，可选 <code>success</code>、<code>warning</code>、<code>info</code>、<code>error</code>。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group" style="flex-direction: row;">
            <MButton type="success" @click="showAlert('success')">成功</MButton>
            <MButton type="warning" @click="showAlert('warning')">警告</MButton>
            <MButton type="info" @click="showAlert('info')">信息</MButton>
            <MButton type="danger" @click="showAlert('error')">错误</MButton>
          </div>
          <MAlert v-if="currentAlert" :key="currentAlert.key" :title="currentAlert.title" :type="currentAlert.type" show-icon closable />
        </DemoBlock>
      </div>

      <div class="doc-section" id="closable">
        <h2>可关闭与居中</h2>
        <p class="doc-page__hint">设置 <code>closable</code> 允许关闭，<code>center</code> 文字居中。</p>
        <DemoBlock :code="closableCode">
          <MAlert title="可关闭" type="success" closable />
          <MAlert title="文字居中" type="info" center closable />
        </DemoBlock>
      </div>

      <div class="doc-section" id="dark">
        <h2>深色模式</h2>
        <p class="doc-page__hint">设置 <code>effect="dark"</code> 使用深色背景的警告提示。</p>
        <DemoBlock code='<MAlert title="成功提示" type="success" effect="dark" />
<MAlert title="警告提示" type="warning" effect="dark" />
<MAlert title="信息提示" type="info" effect="dark" />'>
          <MAlert title="成功提示" type="success" effect="dark" />
          <MAlert title="警告提示" type="warning" effect="dark" />
          <MAlert title="信息提示" type="info" effect="dark" />
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

type AlertType = 'success' | 'warning' | 'info' | 'error'
const currentAlert = ref<{ key: number; type: AlertType; title: string } | null>(null)
let alertKey = 0

function showAlert(type: AlertType) {
  const titles: Record<AlertType, string> = {
    success: '成功提示',
    warning: '警告提示',
    info: '信息提示',
    error: '错误提示',
  }
  currentAlert.value = { key: ++alertKey, type, title: titles[type] }
}

const basicCode = `<MButton type="success" @click="showAlert('success')">成功</MButton>
<MButton type="warning" @click="showAlert('warning')">警告</MButton>
<MButton type="info" @click="showAlert('info')">信息</MButton>
<MButton type="danger" @click="showAlert('error')">错误</MButton>

<MAlert v-if="currentAlert" :key="currentAlert.key"
  :title="currentAlert.title" :type="currentAlert.type" show-icon closable />`

const closableCode = `<MAlert title="可关闭" type="success" closable />
<MAlert title="文字居中" type="info" center closable />`

const anchors = [
  { id: 'basic', label: '类型变体' },
  { id: 'closable', label: '可关闭与居中' },
  { id: 'dark', label: '深色模式' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['title', 'string', '—', '标题'],
    ['type', 'success | warning | info | error', 'info', '警告类型'],
    ['description', 'string', '—', '辅助性文字描述'],
    ['closable', 'boolean', 'false', '是否可关闭'],
    ['center', 'boolean', 'false', '文字是否居中'],
    ['effect', 'light | dark', 'light', '主题风格'],
  ],
  events: [
    ['close', '—', '关闭时触发'],
  ],
  slots: [
    ['default', '描述内容'],
    ['title', '标题内容'],
  ],
}
</script>