<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Link 链接</h1>
    <p class="doc-page__desc">文字超链接，支持多种类型、下划线和禁用状态。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>type</code> 属性设置链接颜色风格。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group">
            <MLink>默认链接</MLink>
            <MLink type="primary">主要链接</MLink>
            <MLink type="success">成功链接</MLink>
            <MLink type="warning">警告链接</MLink>
            <MLink type="danger">危险链接</MLink>
            <MLink type="info">信息链接</MLink>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled-underline">
        <h2>禁用与下划线</h2>
        <p class="doc-page__hint"><code>disabled</code> 禁用链接，<code>underline</code> 控制下划线（默认显示）。</p>
        <DemoBlock :code="disabledUnderlineCode">
          <div class="doc-demo-group">
            <MLink type="primary">有下划线</MLink>
            <MLink type="primary" :underline="false">无下划线</MLink>
            <MLink type="primary" disabled>禁用状态</MLink>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom-color">
        <h2>自定义颜色</h2>
        <p class="doc-page__hint">通过 <code>color</code> 属性可自定义链接颜色，优先级高于 <code>type</code>。</p>
        <DemoBlock :code="customColorCode">
          <div class="doc-demo-group">
            <MLink color="#9c27b0">紫色链接</MLink>
            <MLink color="#ff5722">橙色链接</MLink>
            <MLink color="#00bcd4">青色链接</MLink>
            <MLink color="#3f51b5" :underline="false">蓝色无下划线</MLink>
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
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicCode = `<MLink>默认链接</MLink>
<MLink type="primary">主要链接</MLink>
<MLink type="success">成功链接</MLink>
<MLink type="warning">警告链接</MLink>
<MLink type="danger">危险链接</MLink>
<MLink type="info">信息链接</MLink>`

const disabledUnderlineCode = `<MLink type="primary">有下划线</MLink>
<MLink type="primary" :underline="false">无下划线</MLink>
<MLink type="primary" disabled>禁用状态</MLink>`

const customColorCode = `<MLink color="#9c27b0">紫色链接</MLink>
<MLink color="#ff5722">橙色链接</MLink>
<MLink color="#00bcd4">青色链接</MLink>
<MLink color="#3f51b5" :underline="false">蓝色无下划线</MLink>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'disabled-underline', label: '禁用与下划线' },
  { id: 'custom-color', label: '自定义颜色' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['type', 'default | primary | success | warning | danger | info', 'default', '链接类型'],
    ['underline', 'boolean', 'true', '是否显示下划线'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['href', 'string', "''", '链接地址'],
    ['color', 'string', "''", '自定义链接颜色，优先级高于 type'],
  ],
  events: [
    ['click', 'MouseEvent', '链接点击事件，禁用状态下不触发'],
  ],
  slots: [
    ['default', '链接文字内容'],
  ],
}
</script>
