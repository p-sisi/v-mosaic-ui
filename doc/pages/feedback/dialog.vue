<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Dialog 对话框</h1>
    <p class="doc-page__desc">在保留当前页面状态的情况下，告知用户并承载相关操作。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MDialog</code> 弹出对话框，通过 <code>v-model</code> 控制显示/隐藏。</p>
        <DemoBlock :code="basicCode">
          <MButton @click="basicVisible = true">打开对话框</MButton>
          <MDialog v-model="basicVisible" title="提示" width="30%">
            这是一段对话框内容
            <template #footer>
              <MButton @click="basicVisible = false">取消</MButton>
              <MButton type="primary" @click="basicVisible = false">确定</MButton>
            </template>
          </MDialog>
        </DemoBlock>
      </div>

      <div class="doc-section" id="fullscreen">
        <h2>全屏与模态</h2>
        <p class="doc-page__hint">设置 <code>fullscreen</code> 全屏显示，<code>modal</code> 控制遮罩层。</p>
        <DemoBlock :code="fullscreenCode">
          <MButton @click="fullscreenVisible = true">全屏对话框</MButton>
          <MDialog v-model="fullscreenVisible" title="全屏" fullscreen>
            全屏内容区域
            <template #footer>
              <MButton @click="fullscreenVisible = false">关闭</MButton>
            </template>
          </MDialog>
        </DemoBlock>
      </div>

      <div class="doc-section" id="draggable">
        <h2>可拖拽</h2>
        <p class="doc-page__hint">设置 <code>draggable</code> 允许拖动对话框头部移动位置。</p>
        <DemoBlock :code="draggableCode">
          <MButton @click="draggableVisible = true">可拖拽对话框</MButton>
          <MDialog v-model="draggableVisible" title="可拖拽" draggable width="40%">
            可拖拽移动的对话框内容
            <template #footer>
              <MButton @click="draggableVisible = false">关闭</MButton>
            </template>
          </MDialog>
        </DemoBlock>
      </div>

      <div class="doc-section" id="no-divider">
        <h2>无分隔线与插槽</h2>
        <p class="doc-page__hint">设置 <code>no-divider</code> 去掉标题下与底部上的横线；可通过 <code>#title</code>、<code>#default</code>、<code>#footer</code> 插槽自定义内容。</p>
        <DemoBlock :code="noDividerCode">
          <MButton @click="noDividerVisible = true">无分隔线对话框</MButton>
          <MDialog v-model="noDividerVisible" width="30%" no-divider>
            <template #title>自定义标题</template>
            这是一段没有分隔线的对话框内容
            <template #footer>
              <MButton @click="noDividerVisible = false">取消</MButton>
              <MButton type="primary" @click="noDividerVisible = false">确定</MButton>
            </template>
          </MDialog>
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

const basicVisible = ref(false)
const fullscreenVisible = ref(false)
const draggableVisible = ref(false)
const noDividerVisible = ref(false)

const basicCode = `<MButton @click="basicVisible = true">打开对话框</MButton>

<MDialog v-model="basicVisible" title="提示" width="30%">
  这是一段对话框内容
  <template #footer>
    <MButton @click="basicVisible = false">取消</MButton>
    <MButton type="primary" @click="basicVisible = false">确定</MButton>
  </template>
</MDialog>

<script setup>
const basicVisible = ref(false)
<` + `/script>`

const fullscreenCode = `<MDialog v-model="visible" title="全屏" fullscreen>
  全屏内容区域
  <template #footer>
    <MButton @click="visible = false">关闭</MButton>
  </template>
</MDialog>`

const draggableCode = `<MDialog v-model="visible" title="可拖拽" draggable width="40%">
  可拖拽移动的对话框内容
  <template #footer>
    <MButton @click="visible = false">关闭</MButton>
  </template>
</MDialog>`

const noDividerCode = `<MDialog v-model="visible" width="30%" no-divider>
  <template #title>自定义标题</template>
  这是一段没有分隔线的对话框内容
  <template #footer>
    <MButton @click="visible = false">取消</MButton>
    <MButton type="primary" @click="visible = false">确定</MButton>
  </template>
</MDialog>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'fullscreen', label: '全屏与模态' },
  { id: 'draggable', label: '可拖拽' },
  { id: 'no-divider', label: '无分隔线与插槽' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'boolean', 'false', '是否显示（v-model）'],
    ['title', 'string', '—', '对话框标题'],
    ['width', 'string | number', '50%', '对话框宽度，可传百分比或像素值'],
    ['fullscreen', 'boolean', 'false', '是否全屏'],
    ['modal', 'boolean', 'true', '是否需要遮罩层'],
    ['draggable', 'boolean', 'false', '是否可拖拽'],
    ['noDivider', 'boolean', 'false', '是否隐藏标题下与底部上的分隔线'],
    ['top', 'string', '—', '对话框离顶部的距离，默认垂直居中'],
    ['closeOnClickModal', 'boolean', 'true', '是否点击遮罩层关闭'],
    ['closeOnPressEscape', 'boolean', 'true', '是否按 ESC 关闭'],
    ['destroyOnClose', 'boolean', 'false', '关闭时是否销毁内容'],
  ],
  events: [
    ['open', '—', '对话框打开时触发'],
    ['close', '—', '对话框关闭时触发'],
    ['closed', '—', '对话框关闭动画结束时触发'],
  ],
  slots: [
    ['default', '对话框内容'],
    ['title', '标题区域'],
    ['footer', '底部操作区'],
  ],
}
</script>