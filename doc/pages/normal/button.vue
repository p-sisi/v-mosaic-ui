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

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 属性设置预设尺寸，也可通过 <code>width</code> 和 <code>height</code> 自定义任意宽高。</p>
        <DemoBlock code='<MButton size="small">Small</MButton>
<MButton>Default</MButton>
<MButton size="large">Large</MButton>

<!-- 自定义宽高 -->
<MButton width="160px" height="48px">160x48</MButton>
<MButton width="100%">全宽按钮</MButton>'>
          <div class="demo-size-group">
            <div class="demo-size-row">
              <MButton size="small">Small</MButton>
              <MButton>Default</MButton>
              <MButton size="large">Large</MButton>
            </div>
            <div class="demo-size-row">
              <MButton width="160px" height="48px">160 x 48</MButton>
              <MButton width="100%" height="40px">全宽按钮</MButton>
            </div>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="round">
        <h2>圆角按钮</h2>
        <p class="doc-page__hint">设置 <code>round</code> 属性为圆形按钮。</p>
        <DemoBlock code='<MButton round>Round</MButton>
<MButton type="primary" round>Primary Round</MButton>'>
          <MButton round>Round</MButton>
          <MButton type="primary" round>Primary Round</MButton>
        </DemoBlock>
      </div>

      <div class="doc-section" id="plain">
        <h2>朴素按钮</h2>
        <p class="doc-page__hint">设置 <code>plain</code> 属性为朴素风格按钮，背景透明。</p>
        <DemoBlock code='<MButton plain>Plain</MButton>
<MButton type="primary" plain>Primary Plain</MButton>'>
          <MButton plain>Plain</MButton>
          <MButton type="primary" plain>Primary Plain</MButton>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用与加载</h2>
        <p class="doc-page__hint"><code>disabled</code> 禁用按钮交互，<code>loading</code> 显示加载状态。</p>
        <DemoBlock code='<MButton disabled>Disabled</MButton>
<MButton loading>Loading</MButton>'>
          <MButton disabled>Disabled</MButton>
          <MButton loading>Loading</MButton>
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
        <h2>自定义内容</h2>
        <p class="doc-page__hint">默认插槽 <code>default</code> 可放入任意内容，如图标 + 文本的组合。</p>
        <DemoBlock code='<MButton type="primary">
  <span style="margin-right: 6px;">&#10003;</span> 确认提交
</MButton>
<MButton type="danger">
  <span style="margin-right: 6px;">&#10005;</span> 删除
</MButton>'>
          <MButton type="primary">
            <span style="margin-right: 6px;">&#10003;</span> 确认提交
          </MButton>
          <MButton type="danger">
            <span style="margin-right: 6px;">&#10005;</span> 删除
          </MButton>
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
        <tr><td>width</td><td>string</td><td>—</td><td>自定义宽度，如 "100px"、"50%"</td></tr>
        <tr><td>height</td><td>string</td><td>—</td><td>自定义高度，如 "40px"</td></tr>
        <tr><td>plain</td><td>boolean</td><td>false</td><td>是否为朴素按钮</td></tr>
        <tr><td>round</td><td>boolean</td><td>false</td><td>是否为圆角按钮</td></tr>
        <tr><td>disabled</td><td>boolean</td><td>false</td><td>是否禁用</td></tr>
        <tr><td>loading</td><td>boolean</td><td>false</td><td>是否加载中</td></tr>
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

function handleClick() {
  clickCount.value++
}

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'size', label: '尺寸' },
  { id: 'round', label: '圆角按钮' },
  { id: 'plain', label: '朴素按钮' },
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
</style>