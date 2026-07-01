<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Popconfirm 气泡确认框</h1>
    <p class="doc-page__desc">弹出气泡式确认框，轻量级的二次确认交互。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MPopconfirm</code> 在点击元素时弹出确认框，点击确认或取消按钮触发对应回调。</p>
        <DemoBlock :code="basicCode">
          <MPopconfirm title="确定删除此项吗？" @confirm="handleConfirm" @cancel="handleCancel">
            <MButton type="danger">删除</MButton>
          </MPopconfirm>
          <span class="demo-event-result" v-if="popMsg">{{ popMsg }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="confirm">
        <h2>确认与取消</h2>
        <p class="doc-page__hint">通过 <code>confirm-button-text</code> 和 <code>cancel-button-text</code> 自定义按钮文案。</p>
        <DemoBlock :code="confirmCode">
          <MPopconfirm title="确定提交吗？" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleConfirm">
            <MButton type="primary">提交</MButton>
          </MPopconfirm>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />
    <h3>Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const popMsg = ref('')
function handleConfirm() {
  popMsg.value = '已确认'
  setTimeout(() => { popMsg.value = '' }, 1500)
}
function handleCancel() {
  popMsg.value = '已取消'
  setTimeout(() => { popMsg.value = '' }, 1500)
}

const basicCode = `<MPopconfirm title="确定删除此项吗？" @confirm="handleConfirm" @cancel="handleCancel">
  <MButton type="danger">删除</MButton>
</MPopconfirm>

<script setup>
function handleConfirm() { console.log('confirm') }
function handleCancel() { console.log('cancel') }
<` + `/script>`

const confirmCode = `<MPopconfirm title="确定提交吗？"
  confirm-button-text="确定"
  cancel-button-text="取消"
  @confirm="handleConfirm">
  <MButton type="primary">提交</MButton>
</MPopconfirm>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'confirm', label: '确认与取消' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['title', 'string', '—', '确认框标题'],
    ['confirmButtonText', 'string', '确定', '确认按钮文案'],
    ['cancelButtonText', 'string', '取消', '取消按钮文案'],
    ['confirmButtonType', 'string', 'primary', '确认按钮类型'],
    ['cancelButtonType', 'string', 'text', '取消按钮类型'],
    ['placement', 'top | bottom | left | right', 'top', '弹出位置'],
  ],
  events: [
    ['confirm', '—', '点击确认按钮时触发'],
    ['cancel', '—', '点击取消按钮时触发'],
  ],
}
</script>