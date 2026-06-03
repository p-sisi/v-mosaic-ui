<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Button 按钮</h1>
    <p class="doc-page__desc">常用的操作按钮，支持多种类型、尺寸和状态。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>type</code> 属性来定义按钮风格。</p>
        <DemoBlock code='<MButton>Default</MButton>
<MButton type="primary">Primary</MButton>
<MButton type="success">Success</MButton>
<MButton type="warning">Warning</MButton>
<MButton type="danger">Danger</MButton>
<MButton type="info">Info</MButton>'>
          <MButton>Default</MButton>
          <MButton type="primary">Primary</MButton>
          <MButton type="success">Success</MButton>
          <MButton type="warning">Warning</MButton>
          <MButton type="danger">Danger</MButton>
          <MButton type="info">Info</MButton>
        </DemoBlock>
      </div>

      <div class="doc-section" id="plain">
        <h2>朴素按钮</h2>
        <p class="doc-page__hint">设置 <code>plain</code> 属性使按钮变为朴素风格，背景色更浅，文字和边框跟随 type 颜色。</p>
        <p class="doc-page__hint">设置 <code>no-border</code> 属性使按钮变为无边框朴素风格，仅保留文字颜色。</p>
        <p class="doc-page__hint">设置 <code>dash</code> 属性使有边框的按钮变为虚线风格。</p>
        <DemoBlock code='<MButton plain>Default</MButton>
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
<MButton dash>透明无背景</MButton>'>
          <div class="demo-text-row">
            <MButton plain>Default</MButton>
            <MButton type="primary" plain>Primary</MButton>
            <MButton type="success" plain>Success</MButton>
            <MButton type="warning" plain>Warning</MButton>
            <MButton type="danger" plain>Danger</MButton>
            <MButton type="info" plain>Info</MButton>
          </div>
          <div class="demo-text-row">
            <MButton plain no-border>Default</MButton>
            <MButton type="primary" plain no-border>Primary</MButton>
            <MButton type="success" plain no-border>Success</MButton>
            <MButton type="warning" plain no-border>Warning</MButton>
            <MButton type="danger" plain no-border>Danger</MButton>
            <MButton type="info" plain no-border>Info</MButton>
          </div>
          <div class="demo-text-row">
            <MButton plain dash>虚线按钮</MButton>
            <MButton type="primary" plain dash>Primary</MButton>
            <MButton type="success" plain dash>Success</MButton>
            <MButton type="warning" plain dash>Warning</MButton>
            <MButton type="danger" plain dash>Danger</MButton>
            <MButton type="info" plain dash>Info</MButton>
          </div>
          <div class="demo-text-row">
            <MButton>普通透明</MButton>
            <MButton dash>透明无背景</MButton>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 属性设置预设尺寸，也可通过 <code>width</code> 和 <code>height</code> 自定义任意宽高。</p>
        <DemoBlock code='<MButton size="small">Small</MButton>
<MButton>Default</MButton>
<MButton size="large">Large</MButton>

<!-- 自定义宽高 -->
<MButton width="160px" height="48px">160x48</MButton>'>
          <div class="demo-size-group">
            <div class="demo-size-row">
              <MButton size="small">Small</MButton>
              <MButton>Default</MButton>
              <MButton size="large">Large</MButton>
              <MButton width="160px" height="48px">160 x 48</MButton>
            </div>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="round">
        <h2>圆角与圆形按钮</h2>
        <p class="doc-page__hint">设置 <code>round</code> 属性为圆角按钮，设置 <code>circle</code> 属性为圆形按钮（宽高相等）。</p>
        <DemoBlock code='<MButton round>Round</MButton>
<MButton type="primary" round>Primary</MButton>

<!-- 圆形按钮 -->
<MButton circle>+</MButton>
<MButton type="primary" circle>+</MButton>'>
          <MButton round>Round</MButton>
          <MButton type="primary" round>Primary</MButton>
          <MButton circle>+</MButton>
          <MButton type="primary" circle>+</MButton>
        </DemoBlock>
      </div>

      <div class="doc-section" id="text">
        <h2>文本按钮</h2>
        <p class="doc-page__hint">设置 <code>text</code> 属性使按钮变为文本风格，没有边框和背景，仅显示文字。设置 <code>text-plain</code> 属性为文本朴素风格，hover 时显示浅灰背景。可与 <code>type</code> 等组合使用。</p>
        <DemoBlock code='<MButton text>Default</MButton>
<MButton type="primary" text>Primary</MButton>

<!-- 文本朴素按钮 -->
<MButton text-plain>Default</MButton>
<MButton type="primary" text-plain>Primary</MButton>
<MButton type="success" text-plain>Success</MButton>
<MButton type="warning" text-plain>Warning</MButton>
<MButton type="danger" text-plain>Danger</MButton>
<MButton type="info" text-plain>Info</MButton>'>
          <div class="demo-text-group">
            <div class="demo-text-row">
              <MButton text>长得很文本</MButton>
              <MButton type="primary" text>Primary</MButton>
            </div>
            <div class="demo-text-row">
              <MButton text-plain>hover有背景</MButton>
              <MButton type="primary" text-plain>Primary</MButton>
              <MButton type="success" text-plain>Success</MButton>
              <MButton type="warning" text-plain>Warning</MButton>
              <MButton type="danger" text-plain>Danger</MButton>
              <MButton type="info" text-plain>Info</MButton>
            </div>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用与加载</h2>
        <p class="doc-page__hint"><code>disabled</code> 禁用按钮交互，<code>loading</code> 显示加载状态。</p>
        <DemoBlock code='<MButton disabled>Disabled</MButton>
<MButton :loading="loadingLoading" @click="handleLoading">Loading</MButton>'>
          <MButton disabled>点不动我的</MButton>
          <MButton :loading="loadingLoading" @click="handleLoading">点我就加载</MButton>
        </DemoBlock>
      </div>

      <div class="doc-section" id="event-click">
        <h2>点击事件</h2>
        <p class="doc-page__hint">通过 <code>@click</code> 监听按钮点击事件，回调参数为原生 MouseEvent。禁用或加载状态下不会触发。</p>
        <DemoBlock code='<MButton type="primary" @click="handleClick">点击我</MButton>
<p>点击次数: {{ clickCount }}</p>

<script setup>
const clickCount = ref(0)
function handleClick(e) {
  clickCount++
  console.log(e)
}
</script>'>
          <MButton type="primary" @click="handleClick">点击我</MButton>
          <span class="demo-event-result">点击次数: {{ clickCount }}</span>
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
          <MButton type="primary">
            <span style="margin-right: 6px;">&#10003;</span> 确认提交
          </MButton>
          <MButton color="#429fff" type="primary">我是蓝色的</MButton>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <table class="doc-table">
      <thead>
        <tr><th>属性</th><th>类型</th><th>默认值</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>type</td><td>'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'</td><td>'default'</td><td>按钮类型</td></tr>
        <tr><td>size</td><td>'small' | 'default' | 'large'</td><td>'default'</td><td>按钮预设尺寸</td></tr>
        <tr><td>width</td><td>string</td><td>—</td><td>自定义宽度，如 "100px"、"50%"、"100%"</td></tr>
        <tr><td>height</td><td>string</td><td>—</td><td>自定义高度，如 "40px"</td></tr>
        <tr><td>round</td><td>boolean</td><td>false</td><td>是否为圆角按钮</td></tr>
        <tr><td>circle</td><td>boolean</td><td>false</td><td>是否为圆形按钮（宽高相等）</td></tr>
        <tr><td>disabled</td><td>boolean</td><td>false</td><td>是否禁用</td></tr>
        <tr><td>loading</td><td>boolean</td><td>false</td><td>是否加载中</td></tr>
        <tr><td>plain</td><td>boolean</td><td>false</td><td>是否为朴素按钮</td></tr>
        <tr><td>noBorder</td><td>boolean</td><td>false</td><td>朴素按钮是否去除边框</td></tr>
        <tr><td>text</td><td>boolean</td><td>false</td><td>是否为文本按钮</td></tr>
        <tr><td>color</td><td>string</td><td>—</td><td>自定义按钮颜色，覆盖 type 颜色，如 "#8a2be2"</td></tr>
        <tr><td>textPlain</td><td>boolean</td><td>false</td><td>是否为文本朴素按钮（仅文字，hover 显示浅灰背景）</td></tr>
        <tr><td>dash</td><td>boolean</td><td>false</td><td>是否为虚线按钮（边框变为虚线）</td></tr>
      </tbody>
    </table>

    <h3>Events</h3>
    <table class="doc-table">
      <thead>
        <tr><th>事件</th><th>参数</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>click</td><td>MouseEvent</td><td>按钮点击事件，禁用或加载状态下不触发</td></tr>
      </tbody>
    </table>

    <h3>Slots</h3>
    <table class="doc-table">
      <thead>
        <tr><th>插槽</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>default</td><td>按钮内容，支持任意 HTML 或组件</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'

const clickCount = ref(0)  // 点击事件示例的计数器
const loadingLoading = ref(false)  // 加载按钮示例的 loading 状态

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
</script>

<style>
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