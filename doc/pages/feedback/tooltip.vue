<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Tooltip 文字提示</h1>
    <p class="doc-page__desc">用于鼠标悬停时展示提示信息，轻量级弹出层。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MTooltip</code> 包裹元素，通过 <code>content</code> 设置提示内容。</p>
        <DemoBlock code='<MTooltip content="Top 提示文字" placement="top">
  <MButton>上方</MButton>
</MTooltip>
<MTooltip content="Bottom 提示文字" placement="bottom">
  <MButton>下方</MButton>
</MTooltip>'>
          <div class="doc-demo-group" style="flex-direction: row;">
            <MTooltip content="Top 提示文字" placement="top">
              <MButton>上方</MButton>
            </MTooltip>
            <MTooltip content="Bottom 提示文字" placement="bottom">
              <MButton>下方</MButton>
            </MTooltip>
            <MTooltip content="Left 提示文字" placement="left">
              <MButton>左侧</MButton>
            </MTooltip>
            <MTooltip content="Right 提示文字" placement="right">
              <MButton>右侧</MButton>
            </MTooltip>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="effect">
        <h2>主题与位置</h2>
        <p class="doc-page__hint">通过 <code>effect</code> 设置主题风格，<code>placement</code> 设置弹出位置。</p>
        <DemoBlock :code="effectCode">
          <div class="doc-demo-group" style="flex-direction: row;">
            <MTooltip content="Dark 主题" effect="dark">
              <MButton>Dark</MButton>
            </MTooltip>
            <MTooltip content="Light 主题" effect="light">
              <MButton>Light</MButton>
            </MTooltip>
          </div>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const effectCode = `<MTooltip content="Dark 主题" effect="dark">
  <MButton>Dark</MButton>
</MTooltip>

<MTooltip content="Light 主题" effect="light">
  <MButton>Light</MButton>
</MTooltip>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'effect', label: '主题与位置' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['content', 'string', '—', '提示文字'],
    ['placement', 'top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end', 'bottom', '出现位置'],
    ['effect', 'dark | light', 'dark', '主题风格'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['showAfter', 'number', '0', '延迟显示（ms）'],
    ['hideAfter', 'number', '0', '延迟隐藏（ms）'],
  ],
}
</script>