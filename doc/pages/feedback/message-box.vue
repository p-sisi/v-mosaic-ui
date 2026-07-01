<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>MessageBox 消息弹框</h1>
    <p class="doc-page__desc">模拟系统的消息提示框，支持 Alert、Confirm、Prompt 三种模式。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>Alert 提示</h2>
        <p class="doc-page__hint">调用 <code>MMessageBox.alert</code> 弹出提示框。</p>
        <DemoBlock :code="alertCode">
          <MButton @click="openAlert">Alert 提示</MButton>
        </DemoBlock>
      </div>

      <div class="doc-section" id="confirm">
        <h2>Confirm 确认</h2>
        <p class="doc-page__hint">调用 <code>MMessageBox.confirm</code> 弹出确认框，返回 Promise。</p>
        <DemoBlock :code="confirmCode">
          <MButton @click="openConfirm">Confirm 确认</MButton>
        </DemoBlock>
      </div>

      <div class="doc-section" id="prompt">
        <h2>Prompt 输入</h2>
        <p class="doc-page__hint">调用 <code>MMessageBox.prompt</code> 弹出输入框，返回 Promise 包含输入值。</p>
        <DemoBlock :code="promptCode">
          <MButton @click="openPrompt">Prompt 输入</MButton>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MMessageBox Options</h3>
    <ApiTable type="prop" :data="DATA.props" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MMessageBox } from '@/components/feedback/MessageBox'
import { MMessage } from '@/components/feedback/Message'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

function openAlert() {
  MMessageBox.alert('这是一段提示内容', '提示')
}

function openConfirm() {
  MMessageBox.confirm('确定要删除吗？', '确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    MMessage.success({ message: '已确认删除' })
  }).catch(() => {
    MMessage.info({ message: '已取消' })
  })
}

function openPrompt() {
  MMessageBox.prompt('请输入邮箱', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(({ value }: { value?: string }) => {
    MMessage.success({ message: `输入值: ${value}` })
  }).catch(() => {
    MMessage.info({ message: '已取消' })
  })
}

const alertCode = `import { MMessageBox } from "@pang/mosaic-ui"

MMessageBox.alert("这是一段提示内容", "提示")`

const confirmCode = `MMessageBox.confirm("确定要删除吗？", "确认", {
  confirmButtonText: "确定",
  cancelButtonText: "取消",
  type: "warning",
}).then(() => {
  MMessage.success({ message: "已确认删除" })
}).catch(() => {
  MMessage.info({ message: "已取消" })
})`

const promptCode = `MMessageBox.prompt("请输入邮箱", "提示", {
  confirmButtonText: "确定",
  cancelButtonText: "取消",
}).then(({ value }) => {
  MMessage.success({ message: "输入值: " + value })
}).catch(() => {
  MMessage.info({ message: "已取消" })
})`

const anchors = [
  { id: 'basic', label: 'Alert 提示' },
  { id: 'confirm', label: 'Confirm 确认' },
  { id: 'prompt', label: 'Prompt 输入' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['title', 'string', '—', '弹框标题'],
    ['message', 'string | VNode', '—', '弹框内容'],
    ['type', 'success | warning | info | error', 'info', '消息类型'],
    ['confirmButtonText', 'string', '确定', '确认按钮文案'],
    ['cancelButtonText', 'string', '取消', '取消按钮文案'],
    ['showCancelButton', 'boolean', 'false (alert) / true (confirm)', '是否显示取消按钮'],
    ['closeOnClickModal', 'boolean', 'true (alert) / false (confirm)', '点击遮罩是否关闭'],
    ['inputPlaceholder', 'string', '—', 'Prompt 输入框占位文本'],
    ['inputValidator', 'Function', '—', 'Prompt 输入验证函数'],
  ],
}
</script>