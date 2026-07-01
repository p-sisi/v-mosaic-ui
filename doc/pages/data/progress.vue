<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Progress 进度条</h1>
    <p class="doc-page__desc">展示操作或任务的当前进度，支持线型、环形和仪表盘三种形式。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>线型进度条</h2>
        <p class="doc-page__hint">通过 <code>percentage</code> 设置进度百分比，<code>status</code> 设置状态。</p>
        <DemoBlock :code="basicCode">
          <MProgress :percentage="50" />
          <MProgress :percentage="100" status="success" />
          <MProgress :percentage="80" status="warning" />
          <MProgress :percentage="30" status="exception" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="circle">
        <h2>环形进度条</h2>
        <p class="doc-page__hint">设置 <code>type="circle"</code> 为环形，<code>type="dashboard"</code> 为仪表盘形。</p>
        <DemoBlock :code="circleCode">
          <div class="doc-demo-group" style="flex-direction: row; align-items: center;">
            <MProgress type="circle" :percentage="75" />
            <MProgress type="dashboard" :percentage="60" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="stroke-color">
        <h2>宽度与自定义颜色</h2>
        <p class="doc-page__hint">通过 <code>stroke-width</code> 控制进度条宽度，<code>color</code> 自定义进度条颜色。</p>
        <DemoBlock :code="strokeColorCode">
          <MProgress :percentage="70" :stroke-width="20" color="#ff4949" />
          <MProgress :percentage="50" :stroke-width="10" color="#13ce66" />
          <MProgress type="circle" :percentage="80" :stroke-width="10" color="#ff4949" />
          <MProgress type="dashboard" :percentage="65" :stroke-width="8" color="#13ce66" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="color-stops">
        <h2>分段颜色</h2>
        <p class="doc-page__hint"><code>color</code> 支持传入 <code>{ color, percentage }</code> 数组，按百分比阈值切换颜色。</p>
        <DemoBlock :code="colorStopsCode">
          <MProgress :percentage="colorStopsValue" :color="colorStops" :stroke-width="18" />
          <div class="doc-demo-row">
            <input type="range" min="0" max="100" v-model.number="colorStopsValue" />
            <span class="demo-event-result">{{ colorStopsValue }}%</span>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="text-inside">
        <h2>文字内嵌</h2>
        <p class="doc-page__hint">设置 <code>text-inside</code> 将文字显示在进度条内部（仅 line 类型）。</p>
        <DemoBlock :code="textInsideCode">
          <MProgress :percentage="60" :text-inside="true" :stroke-width="22" />
          <MProgress :percentage="85" :text-inside="true" :stroke-width="22" status="success" />
          <MProgress :percentage="40" :text-inside="true" :stroke-width="22" status="exception" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="striped">
        <h2>条纹进度条</h2>
        <p class="doc-page__hint">设置 <code>striped</code> 显示斜条纹，配合 <code>striped-flow</code> 开启流动动画。</p>
        <DemoBlock :code="stripedCode">
          <MProgress :percentage="65" striped :stroke-width="18" />
          <MProgress :percentage="65" striped striped-flow :stroke-width="18" />
          <MProgress :percentage="80" striped striped-flow :stroke-width="18" status="success" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="slot">
        <h2>自定义内容</h2>
        <p class="doc-page__hint">通过默认插槽自定义进度条文字内容，scoped slot 接收 <code>{ percentage }</code>；不传时默认显示百分比。</p>
        <DemoBlock :code="slotCode">
          <MProgress :percentage="70">
            <span style="color: var(--mosaic-primary); font-weight: 600;">{{ 70 }} 分</span>
          </MProgress>
          <MProgress :percentage="percentage" type="circle">
            <template #default="{ percentage: p }">
              <span style="font-size: 16px; color: var(--mosaic-primary);">{{ p }}<small style="font-size: 12px;">%</small></span>
            </template>
          </MProgress>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />
    <h3>Slots</h3>
    <ApiTable type="slot" :data="DATA.slots" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const percentage = ref(72)

const colorStops = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]
const colorStopsValue = ref(35)

const basicCode = `<MProgress :percentage="50" />
<MProgress :percentage="100" status="success" />
<MProgress :percentage="80" status="warning" />
<MProgress :percentage="30" status="exception" />`

const circleCode = `<MProgress type="circle" :percentage="75" />
<MProgress type="dashboard" :percentage="60" />`

const strokeColorCode = `<MProgress :percentage="70" :stroke-width="20" color="#ff4949" />
<MProgress :percentage="50" :stroke-width="10" color="#13ce66" />
<MProgress type="circle" :percentage="80" :stroke-width="10" color="#ff4949" />
<MProgress type="dashboard" :percentage="65" :stroke-width="8" color="#13ce66" />`

const colorStopsCode = `<MProgress :percentage="35" :color="colors" :stroke-width="18" />

<script setup>
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]
<` + `/script>`

const textInsideCode = `<MProgress :percentage="60" :text-inside="true" :stroke-width="22" />
<MProgress :percentage="85" :text-inside="true" :stroke-width="22" status="success" />
<MProgress :percentage="40" :text-inside="true" :stroke-width="22" status="exception" />`

const stripedCode = `<MProgress :percentage="65" striped :stroke-width="18" />
<MProgress :percentage="65" striped striped-flow :stroke-width="18" />
<MProgress :percentage="80" striped striped-flow :stroke-width="18" status="success" />`

const slotCode = `<MProgress :percentage="70">
  <span style="color: var(--mosaic-primary);">{{ 70 }} 分</span>
</MProgress>

<MProgress :percentage="72" type="circle">
  <template #default="{ percentage }">
    <span style="color: var(--mosaic-primary);">{{ percentage }}<small>%</small></span>
  </template>
</MProgress>`

const anchors = [
  { id: 'basic', label: '线型进度条' },
  { id: 'circle', label: '环形进度条' },
  { id: 'stroke-color', label: '宽度与自定义颜色' },
  { id: 'color-stops', label: '分段颜色' },
  { id: 'text-inside', label: '文字内嵌' },
  { id: 'striped', label: '条纹进度条' },
  { id: 'slot', label: '自定义内容' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['percentage', 'number', '0', '百分比（0-100）'],
    ['type', 'line | circle | dashboard', 'line', '进度条类型'],
    ['status', 'success | warning | exception', '—', '进度条状态'],
    ['strokeWidth', 'number', '6', '进度条宽度（px）'],
    ['textInside', 'boolean', 'false', '文字是否显示在进度条内部（仅 line 类型）'],
    ['color', 'string | string[] | { color, percentage }[] | Function', '—', '进度条颜色，支持色值字符串、字符串数组、分段颜色数组或函数'],
    ['showText', 'boolean', 'true', '是否显示文字'],
    ['width', 'number', '126', '环形进度条画布宽度（仅 circle/dashboard）'],
    ['striped', 'boolean', 'false', '是否显示斜条纹（仅 line 类型）'],
    ['stripedFlow', 'boolean', 'false', '条纹是否流动动画（需配合 striped）'],
  ],
  slots: [
    ['default', '自定义进度条文字内容，scoped slot 接收 { percentage }'],
  ],
}
</script>
