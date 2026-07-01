<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Popover 弹出框</h1>
    <p class="doc-page__desc">点击或悬停元素时弹出气泡卡片，可承载标题和丰富内容。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MPopover</code> 包裹触发元素，通过 <code>trigger</code> 设置触发方式。</p>
        <DemoBlock :code="basicCode">
          <MPopover content="这是一段弹出框内容">
            <MButton>悬停触发</MButton>
          </MPopover>
          <MPopover trigger="click" content="点击触发的弹出框">
            <MButton>点击触发</MButton>
          </MPopover>
        </DemoBlock>
      </div>

      <div class="doc-section" id="title">
        <h2>带标题与内容</h2>
        <p class="doc-page__hint">通过 <code>title</code> 属性设置标题，<code>content</code> 设置内容，也可使用插槽。</p>
        <DemoBlock :code="titleCode">
          <MPopover title="标题" content="这是一段弹出框内容" trigger="click">
            <MButton>带标题</MButton>
          </MPopover>
          <MPopover trigger="click">
            <template #content>
              <div>这是一段自定义内容</div>
            </template>
            <MButton>插槽自定义</MButton>
          </MPopover>
        </DemoBlock>
      </div>

      <div class="doc-section" id="placement">
        <h2>弹出位置</h2>
        <p class="doc-page__hint">通过 <code>placement</code> 属性设置弹出框位置，支持 top/bottom/left/right 及其偏移。</p>
        <DemoBlock :code="placementCode">
          <div class="doc-demo-group" style="flex-direction: row;">
            <MPopover content="top" placement="top">
              <MButton>上</MButton>
            </MPopover>
            <MPopover content="bottom" placement="bottom">
              <MButton>下</MButton>
            </MPopover>
            <MPopover content="left" placement="left">
              <MButton>左</MButton>
            </MPopover>
            <MPopover content="right" placement="right">
              <MButton>右</MButton>
            </MPopover>
          </div>
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

const basicCode = `<MPopover content="这是一段弹出框内容">
  <MButton>悬停触发</MButton>
</MPopover>

<MPopover trigger="click" content="点击触发的弹出框">
  <MButton>点击触发</MButton>
</MPopover>`

const titleCode = `<MPopover title="标题" content="这是一段弹出框内容" trigger="click">
  <MButton>带标题</MButton>
</MPopover>

<MPopover trigger="click">
  <template #content>
    <div>这是一段自定义内容</div>
  </template>
  <MButton>插槽自定义</MButton>
</MPopover>`

const placementCode = `<MPopover content="top" placement="top">
  <MButton>上</MButton>
</MPopover>
<MPopover content="bottom" placement="bottom">
  <MButton>下</MButton>
</MPopover>
<MPopover content="left" placement="left">
  <MButton>左</MButton>
</MPopover>
<MPopover content="right" placement="right">
  <MButton>右</MButton>
</MPopover>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'title', label: '带标题与内容' },
  { id: 'placement', label: '弹出位置' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['trigger', 'hover | click | focus', 'hover', '触发方式'],
    ['title', 'string', '—', '弹出框标题'],
    ['content', 'string', '—', '弹出框内容'],
    ['placement', 'top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end', 'bottom', '弹出位置'],
    ['width', 'string | number', '—', '弹出框宽度'],
    ['visible', 'boolean', '—', '是否显示（v-model）'],
  ],
  events: [
    ['show', '—', '弹出框显示时触发'],
    ['hide', '—', '弹出框隐藏时触发'],
  ],
  slots: [
    ['default', '触发元素'],
    ['content', '弹出框内容'],
    ['title', '弹出框标题（未实现为 slot，建议用 title prop）'],
  ],
}
</script>