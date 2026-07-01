<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Message 消息提示</h1>
    <p class="doc-page__desc">常用于主动操作后的反馈提示，轻量级全局通知。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基本类型</h2>
        <p class="doc-page__hint">调用 <code>MMessage</code> 方法显示消息，支持 <code>success</code>、<code>warning</code>、<code>info</code>、<code>error</code> 类型。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group" style="flex-direction: row;">
            <MButton @click="openMessage('success')">成功</MButton>
            <MButton @click="openMessage('warning')">警告</MButton>
            <MButton @click="openMessage('info')">信息</MButton>
            <MButton @click="openMessage('error')">错误</MButton>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="duration">
        <h2>时长与偏移</h2>
        <p class="doc-page__hint">通过 <code>duration</code> 设置显示时间（0 则不自动关闭），<code>offset</code> 设置偏移距离。</p>
        <DemoBlock :code="durationCode">
          <MButton @click="openDuration">不自动关闭</MButton>
          <MButton @click="openOffset">偏移 50px</MButton>
        </DemoBlock>
      </div>

      <div class="doc-section" id="closable">
        <h2>可关闭</h2>
        <p class="doc-page__hint">设置 <code>showClose</code> 显示关闭按钮。</p>
        <DemoBlock code='<script setup>
import { MMessage } from "@pang/mosaic-ui"
MMessage({ message: "可关闭的消息", showClose: true })
<` + `/script>'>
          <MButton @click="openClosable">可关闭消息</MButton>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MMessage Options</h3>
    <ApiTable type="prop" :data="DATA.props" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MMessage } from '@/components/feedback/Message'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

function openMessage(type: string) {
  const messages: Record<string, string> = {
    success: '这是一条成功消息',
    warning: '这是一条警告消息',
    info: '这是一条信息消息',
    error: '这是一条错误消息',
  }
  MMessage[type as 'success' | 'warning' | 'info' | 'error']({ message: messages[type] })
}

function openDuration() {
  MMessage({ message: '不会自动关闭', duration: 0, showClose: true })
}

function openOffset() {
  MMessage({ message: '偏移 50px', offset: 50 })
}

function openClosable() {
  MMessage({ message: '可关闭的消息', showClose: true })
}

const basicCode = `import { MMessage } from "@pang/mosaic-ui"

MMessage.success({ message: "这是一条成功消息" })
MMessage.warning({ message: "这是一条警告消息" })
MMessage.info({ message: "这是一条信息消息" })
MMessage.error({ message: "这是一条错误消息" })`

const durationCode = `MMessage({ message: "不会自动关闭", duration: 0, showClose: true })
MMessage({ message: "偏移 50px", offset: 50 })`

const anchors = [
  { id: 'basic', label: '基本类型' },
  { id: 'duration', label: '时长与偏移' },
  { id: 'closable', label: '可关闭' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['message', 'string | VNode', '—', '消息文字'],
    ['type', 'success | warning | info | error', 'info', '消息类型'],
    ['duration', 'number', '3000', '显示时间（ms），0 则不自动关闭'],
    ['showClose', 'boolean', 'false', '是否显示关闭按钮'],
    ['center', 'boolean', 'false', '文字是否居中'],
    ['offset', 'number', '0', '距离顶部的偏移距离（px）'],
  ],
}
</script>