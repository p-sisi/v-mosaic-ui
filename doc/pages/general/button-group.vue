<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>ButtonGroup 按钮组</h1>
    <p class="doc-page__desc">将多个按钮组合为一组，统一尺寸与排列。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MButtonGroup</code> 包裹多个按钮，自动合并圆角与边框。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group">
            <MButtonGroup>
              <MButton>按钮一</MButton>
              <MButton>按钮二</MButton>
              <MButton>按钮三</MButton>
            </MButtonGroup>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>统一尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 属性统一设置按钮组内所有按钮的尺寸。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group">
            <MButtonGroup size="small">
              <MButton>小号</MButton>
              <MButton>小号</MButton>
            </MButtonGroup>
            <MButtonGroup>
              <MButton>默认</MButton>
              <MButton>默认</MButton>
            </MButtonGroup>
            <MButtonGroup size="large">
              <MButton>大号</MButton>
              <MButton>大号</MButton>
            </MButtonGroup>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="with-type">
        <h2>不同类型按钮</h2>
        <p class="doc-page__hint">按钮组内的按钮可以设置不同的 type。</p>
        <DemoBlock :code="withTypeCode">
          <div class="doc-demo-group">
            <MButtonGroup>
              <MButton type="primary">主要</MButton>
              <MButton type="success">成功</MButton>
              <MButton type="danger">危险</MButton>
            </MButtonGroup>
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

const basicCode = `<MButtonGroup>
  <MButton>按钮一</MButton>
  <MButton>按钮二</MButton>
  <MButton>按钮三</MButton>
</MButtonGroup>`

const sizeCode = `<MButtonGroup size="small">
  <MButton>小号</MButton>
  <MButton>小号</MButton>
</MButtonGroup>
<MButtonGroup>
  <MButton>默认</MButton>
  <MButton>默认</MButton>
</MButtonGroup>
<MButtonGroup size="large">
  <MButton>大号</MButton>
  <MButton>大号</MButton>
</MButtonGroup>`

const withTypeCode = `<MButtonGroup>
  <MButton type="primary">主要</MButton>
  <MButton type="success">成功</MButton>
  <MButton type="danger">危险</MButton>
</MButtonGroup>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'size', label: '统一尺寸' },
  { id: 'with-type', label: '不同类型按钮' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['size', 'small | default | large', 'default', '按钮组统一尺寸，子按钮会继承此尺寸'],
  ],
  slots: [
    ['default', '按钮组内容，放入 MButton 组件'],
  ],
}
</script>
