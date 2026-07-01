<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Divider 分割线</h1>
    <p class="doc-page__desc">区隔内容的分割线，支持水平/垂直方向、文字位置和虚线样式。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">默认为水平分割线，可在分割线中加入文字。</p>
        <DemoBlock :code="basicCode">
          <div>
            <p>一段内容</p>
            <MDivider />
            <p>另一段内容</p>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="text-position">
        <h2>设置文字位置</h2>
        <p class="doc-page__hint">使用 <code>contentPosition</code> 属性设置文字位置，支持 left、center、right。</p>
        <DemoBlock :code="textPositionCode">
          <div>
            <MDivider content-position="left">靠左</MDivider>
            <MDivider>居中</MDivider>
            <MDivider content-position="right">靠右</MDivider>
          </div>
        </DemoBlock>
      </div>
      
      <div class="doc-section" id="vertical">
        <h2>垂直分割</h2>
        <p class="doc-page__hint">设置 <code>direction="vertical"</code> 显示垂直分割线。</p>
        <DemoBlock :code="dashedVerticalCode">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>文字</span>
              <MDivider direction="vertical" />
              <span>文字</span>
              <MDivider direction="vertical" />
              <span>文字</span>
            </div>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="dashed">
        <h2>虚线</h2>
        <p class="doc-page__hint">设置 <code>dashed</code> 属性显示虚线。</p>
        <DemoBlock :code="dashedVerticalCode">
          <div>
            <MDivider dashed>虚线分割</MDivider>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>文字</span>
              <MDivider dashed direction="vertical" />
              <span>文字</span>
              <MDivider dashed direction="vertical" />
              <span>文字</span>
            </div>
          </div>
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
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicCode = `<p>一段内容</p>
<MDivider />
<p>另一段内容</p>`

const textPositionCode = `<MDivider content-position="left">靠左</MDivider>
<MDivider>居中</MDivider>
<MDivider content-position="right">靠右</MDivider>`

const dashedVerticalCode = `<MDivider dashed>虚线分割</MDivider>

<div style="display: flex; align-items: center; gap: 8px;">
  <span>文字</span>
  <MDivider direction="vertical" />
  <span>文字</span>
  <MDivider direction="vertical" />
  <span>文字</span>
</div>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'text-position', label: '设置文字位置' },
  { id: 'vertical', label: '垂直分割' },
  { id: 'dashed', label: '虚线' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['direction', 'horizontal | vertical', 'horizontal', '分割线方向'],
    ['contentPosition', 'left | center | right', 'center', '文字内容位置'],
    ['dashed', 'boolean', 'false', '是否为虚线'],
  ],
  slots: [
    ['default', '分割线文字内容'],
  ],
}
</script>
