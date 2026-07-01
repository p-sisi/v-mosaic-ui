<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Notification 通知</h1>
    <p class="doc-page__desc">在页面右上角悬浮展示通知提醒，支持自定义位置和类型。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基本用法</h2>
        <p class="doc-page__hint">调用 <code>MNotification</code> 方法弹出通知，支持不同类型。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group" style="flex-direction: row;">
            <MButton @click="openNotify('success')">成功</MButton>
            <MButton @click="openNotify('warning')">警告</MButton>
            <MButton @click="openNotify('info')">信息</MButton>
            <MButton @click="openNotify('error')">错误</MButton>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="position">
        <h2>自定义位置</h2>
        <p class="doc-page__hint">通过 <code>position</code> 设置弹出位置，可选 <code>top-right</code>、<code>top-left</code>、<code>bottom-right</code>、<code>bottom-left</code>。</p>
        <DemoBlock :code="positionCode">
          <div class="doc-demo-group" style="flex-direction: row;">
            <MButton @click="openPosition('top-right')">右上角</MButton>
            <MButton @click="openPosition('bottom-right')">右下角</MButton>
            <MButton @click="openPosition('top-left')">左上角</MButton>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="title">
        <h2>带标题与持续时间</h2>
        <p class="doc-page__hint">设置 <code>title</code> 和 <code>duration</code> 自定义标题和持续时间。</p>
        <DemoBlock :code="titleCode">
          <MButton @click="openWithTitle">带标题通知</MButton>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MNotification Options</h3>
    <ApiTable type="prop" :data="DATA.props" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MNotification } from '@/components/feedback/Notification'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

function openNotify(type: string) {
  const titles: Record<string, string> = {
    success: '成功',
    warning: '警告',
    info: '信息',
    error: '错误',
  }
  MNotification[type as 'success' | 'warning' | 'info' | 'error']({ title: titles[type], message: `这是一条${titles[type]}通知` })
}

function openPosition(pos: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left') {
  MNotification({ title: '自定义位置', message: `位置: ${pos}`, position: pos })
}

function openWithTitle() {
  MNotification({ title: '标题', message: '这是一条带标题的通知', duration: 0 })
}

const basicCode = `import { MNotification } from "@pang/mosaic-ui"

MNotification.success({ title: "成功", message: "这是一条成功通知" })
MNotification.warning({ title: "警告", message: "这是一条警告通知" })
MNotification.info({ title: "信息", message: "这是一条信息通知" })
MNotification.error({ title: "错误", message: "这是一条错误通知" })`

const positionCode = `MNotification({ title: "自定义位置", message: "右上角", position: "top-right" })
MNotification({ title: "自定义位置", message: "右下角", position: "bottom-right" })
MNotification({ title: "自定义位置", message: "左上角", position: "top-left" })`

const titleCode = `MNotification({ title: "标题", message: "带标题通知", duration: 0 })`

const anchors = [
  { id: 'basic', label: '基本用法' },
  { id: 'position', label: '自定义位置' },
  { id: 'title', label: '带标题与持续时间' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['title', 'string', '—', '通知标题'],
    ['message', 'string | VNode', '—', '通知文字'],
    ['type', 'success | warning | info | error', '—', '通知类型'],
    ['duration', 'number', '4500', '显示时间（ms），0 则不自动关闭'],
    ['position', 'top-right | top-left | bottom-right | bottom-left', 'top-right', '弹出位置'],
    ['showClose', 'boolean', 'true', '是否显示关闭按钮'],
    ['offset', 'number', '0', '偏移距离（px）'],
  ],
}
</script>