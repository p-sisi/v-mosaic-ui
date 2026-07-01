<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Button 按钮</h1>
    <p class="doc-page__desc">常用的操作按钮，支持多种类型、尺寸和状态。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>type</code> 属性来定义按钮风格。</p>
        <DemoBlock 
code='<MButton>Default</MButton>
<MButton type="primary">Primary</MButton>
<MButton type="success">Success</MButton>
<MButton type="warning">Warning</MButton>
<MButton type="danger">Danger</MButton>
<MButton type="info">Info</MButton>'>
          <div class="doc-demo-group">
            <MButton>Default</MButton>
            <MButton type="primary">Primary</MButton>
            <MButton type="success">Success</MButton>
            <MButton type="warning">Warning</MButton>
            <MButton type="danger">Danger</MButton>
            <MButton type="info">Info</MButton>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="plain">
        <h2>朴素按钮</h2>
        <p class="doc-page__hint">设置 <code>plain</code> 属性使按钮变为朴素风格，背景色更浅，文字和边框跟随 type 颜色。</p>
        <p class="doc-page__hint">设置 <code>no-border</code> 属性使按钮变为无边框朴素风格，仅保留文字颜色。</p>
        <p class="doc-page__hint">设置 <code>dash</code> 属性使有边框的按钮变为虚线风格。</p>
        <DemoBlock 
code='<MButton plain>Default</MButton>
<MButton type="primary" plain>Primary</MButton>
<MButton type="success" plain>Success</MButton>
<MButton type="warning" plain>Warning</MButton>
<MButton type="danger" plain>Danger</MButton>
<MButton type="info" plain>Info</MButton>

<!-- 无边框朴素按钮 -->
<MButton plain no-border>Default</MButton>
<MButton type="primary" plain no-border>Primary</MButton>
<MButton type="success" plain no-border>Success</MButton>
<MButton type="warning" plain no-border>Warning</MButton>
<MButton type="danger" plain no-border>Danger</MButton>
<MButton type="info" plain no-border>Info</MButton>

<!-- 虚线朴素按钮 -->
<MButton plain dash>Default</MButton>
<MButton type="primary" plain dash>Primary</MButton>
<MButton type="success" plain dash>Success</MButton>
<MButton type="warning" plain dash>Warning</MButton>
<MButton type="danger" plain dash>Danger</MButton>
<MButton type="info" plain dash>Info</MButton>

<MButton>普通透明</MButton>
<MButton dash>透明无背景</MButton> '>
          <div class="doc-demo-group">
            <MButton plain>Default</MButton>
            <MButton type="primary" plain>Primary</MButton>
            <MButton type="success" plain>Success</MButton>
            <MButton type="warning" plain>Warning</MButton>
            <MButton type="danger" plain>Danger</MButton>
            <MButton type="info" plain>Info</MButton>
          </div>
          <div class="doc-demo-group">
            <MButton plain no-border>Default</MButton>
            <MButton type="primary" plain no-border>Primary</MButton>
            <MButton type="success" plain no-border>Success</MButton>
            <MButton type="warning" plain no-border>Warning</MButton>
            <MButton type="danger" plain no-border>Danger</MButton>
            <MButton type="info" plain no-border>Info</MButton>
          </div>
          <div class="doc-demo-group">
            <MButton plain dash>虚线按钮</MButton>
            <MButton type="primary" plain dash>Primary</MButton>
            <MButton type="success" plain dash>Success</MButton>
            <MButton type="warning" plain dash>Warning</MButton>
            <MButton type="danger" plain dash>Danger</MButton>
            <MButton type="info" plain dash>Info</MButton>
          </div>
          <div class="doc-demo-group">
            <MButton>普通透明</MButton>
            <MButton dash>透明无背景</MButton>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 属性设置预设尺寸，也可通过 <code>width</code> 和 <code>height</code> 自定义任意宽高。</p>
        <DemoBlock 
code='<MButton size="small">Small</MButton>
<MButton>Default</MButton>
<MButton size="large">Large</MButton>

<!-- 自定义宽高 -->
<MButton width="160px" height="48px">160 x 48</MButton>'>
          <div class="doc-demo-group">
            <MButton size="small">Small</MButton>
            <MButton>Default</MButton>
            <MButton size="large">Large</MButton>
            <MButton width="160px" height="48px">160 x 48</MButton>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="round">
        <h2>圆角与圆形按钮</h2>
        <p class="doc-page__hint">设置 <code>round</code> 属性为圆角按钮，设置 <code>circle</code> 属性为圆形按钮（宽高相等）。</p>
        <DemoBlock 
code='<MButton round>Round</MButton>
<MButton type="primary" round>Primary</MButton>

<!-- 圆形按钮 -->
<MButton circle>+</MButton>
<MButton type="primary" circle>+</MButton>'>
          <div class="doc-demo-group">
            <MButton round>Round</MButton>
            <MButton type="primary" round>Primary</MButton>
            <MButton circle>+</MButton>
            <MButton type="primary" circle>+</MButton>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="text">
        <h2>文本按钮</h2>
        <p class="doc-page__hint">设置 <code>text</code> 属性使按钮变为文本风格，没有边框和背景，仅显示文字。设置 <code>text-plain</code> 属性为文本朴素风格，hover 时显示浅灰背景。可与 <code>type</code> 等组合使用。</p>
        <DemoBlock 
code='<MButton text>Default</MButton>
<MButton type="primary" text>Primary</MButton>

<!-- 文本朴素按钮 -->
<MButton text-plain>Default</MButton>
<MButton type="primary" text-plain>Primary</MButton>
<MButton type="success" text-plain>Success</MButton>
<MButton type="warning" text-plain>Warning</MButton>
<MButton type="danger" text-plain>Danger</MButton>
<MButton type="info" text-plain>Info</MButton>'>
          <div class="doc-demo-group">
            <MButton text>长得很文本</MButton>
            <MButton type="primary" text>Primary</MButton>
          </div>
          <div class="doc-demo-group">
            <MButton text-plain>hover有背景</MButton>
            <MButton type="primary" text-plain>Primary</MButton>
            <MButton type="success" text-plain>Success</MButton>
            <MButton type="warning" text-plain>Warning</MButton>
            <MButton type="danger" text-plain>Danger</MButton>
            <MButton type="info" text-plain>Info</MButton>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用与加载</h2>
        <p class="doc-page__hint"><code>disabled</code> 禁用按钮交互，<code>loading</code> 显示加载状态。</p>
        <DemoBlock 
code='<MButton disabled>Disabled</MButton>
<MButton :loading="loadingLoading" @click="handleLoading">Loading</MButton>'>
          <div class="doc-demo-group">
            <MButton disabled>点不动我的</MButton>
            <MButton :loading="loadingLoading" @click="handleLoading">点我就加载</MButton>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="event-click">
        <h2>点击事件</h2>
        <p class="doc-page__hint">通过 <code>@click</code> 监听按钮点击事件，回调参数为原生 MouseEvent。禁用或加载状态下不会触发。</p>
        <DemoBlock :code="eventClickCode">
          <div class="doc-demo-group">
            <MButton type="primary" @click="handleClick">点我试试</MButton>
            <p>点击次数: {{ clickCount }}</p>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="slot-default">
        <h2>自定义</h2>
        <p class="doc-page__hint">默认插槽 <code>default</code> 可放入任意内容，如图标 + 文本的组合。</p>
        <DemoBlock code='<MButton type="primary">
  <span style="margin-right: 6px;">&#10003;</span> 确认提交
</MButton>

<!-- 自定义颜色 -->
<MButton color="#429fff" type="primary">我是蓝色的</MButton>'>
          <div class="doc-demo-group">
            <MButton type="primary">
              <span style="margin-right: 6px;">&#10003;</span> 确认提交
            </MButton>
            <MButton color="#429fff" type="primary">我是蓝色的</MButton>
          </div>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />

    <h3>Events</h3>
    <ApiTable type="event" :data="DATA.events"
    />

    <h3>Slots</h3>
    <ApiTable type="slot" :data="DATA.slots"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const clickCount = ref(0)  // 点击事件示例的计数器
const loadingLoading = ref(false)  // 加载按钮示例的 loading 状态

const eventClickCode = `<MButton type="primary" @click="handleClick">点击我</MButton>
<p>点击次数: {{ clickCount }}</p>

<script setup>
const clickCount = ref(0)
function handleClick(e) {
  clickCount.value++
  console.log(e)
}
<` + `/script>`

function handleClick() {
  clickCount.value++
}

function handleLoading() {
  loadingLoading.value = true
  setTimeout(() => {
    loadingLoading.value = false
  }, 3000)
}

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'plain', label: '朴素按钮' },
  { id: 'size', label: '尺寸' },
  { id: 'round', label: '圆角与圆形按钮' },
  { id: 'text', label: '文本按钮' },
  { id: 'disabled', label: '禁用与加载' },
  { id: 'event-click', label: '点击事件' },
  { id: 'slot-default', label: '自定义内容' },
  { id: 'api', label: 'API' },
]
const DATA = {
  props: [
    ['type', 'default | primary | success | warning | danger | info', 'default', '按钮类型'],
    ['size', 'small | default | large', 'default', '按钮预设尺寸'],
    ['width', 'string', '—', '自定义宽度，如 \"100px\"、\"50%\"、\"100%\"'],
    ['height', 'string', '—', '自定义高度，如 \"40px\"'],
    ['round', 'boolean', 'false', '是否为圆角按钮'],
    ['circle', 'boolean', 'false', '是否为圆形按钮（宽高相等）'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['loading', 'boolean', 'false', '是否加载中'],
    ['plain', 'boolean', 'false', '是否为朴素按钮'],
    ['noBorder', 'boolean', 'false', '朴素按钮是否去除边框'],
    ['text', 'boolean', 'false', '是否为文本按钮'],
    ['color', 'string', '—', '自定义按钮颜色，覆盖 type 颜色，如 \"#8a2be2\"'],
    ['textPlain', 'boolean', 'false', '是否为文本朴素按钮（仅文字，hover 显示浅灰背景）'],
    ['dash', 'boolean', 'false', '是否为虚线按钮（边框变为虚线）'],
  ],
  events: [
    ['click', 'MouseEvent', '按钮点击事件，禁用或加载状态下不触发'],
  ],
  slots:[
    ['default', '按钮内容，支持任意 HTML 或组件'],
  ]
}
</script>

<style lang="scss">
.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}

.demo-size-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-size-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.demo-text-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-text-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
</style>