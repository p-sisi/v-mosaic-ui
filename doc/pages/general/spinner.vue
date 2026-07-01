<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Spinner 旋转器</h1>
    <p class="doc-page__desc">用于页面或区块的加载中状态，支持不同类型、尺寸和颜色。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">默认为 border 类型旋转器；<code>type="dots"</code> 为小球依次跳动；<code>plain</code> 去除 border 类型的灰色底色轨道。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group">
            <MSpinner />
            <MSpinner type="growing" />
            <MSpinner type="dots" />
            <MSpinner plain />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 属性设置尺寸，支持 small、default、large。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group">
            <MSpinner size="small" />
            <MSpinner />
            <MSpinner size="large" />
            <MSpinner type="growing" size="small" />
            <MSpinner type="growing" />
            <MSpinner type="growing" size="large" />
          </div>
          <div class="doc-demo-group">
            <MSpinner type="dots" size="small" />
            <MSpinner type="dots" />
            <MSpinner type="dots" size="large" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom-color">
        <h2>自定义颜色</h2>
        <p class="doc-page__hint">使用 <code>color</code> 属性自定义旋转器颜色。</p>
        <DemoBlock :code="customColorCode">
          <div class="doc-demo-group">
            <MSpinner color="#67c23a" />
            <MSpinner color="#e6a23c" />
            <MSpinner type="growing" color="#f56c6c" />
            <MSpinner type="growing" color="#a78bfa" />
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
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicCode = `<MSpinner />
<MSpinner type="growing" />
<MSpinner type="dots" />
<MSpinner plain />`

const sizeCode = `<MSpinner size="small" />
<MSpinner />
<MSpinner size="large" />
<MSpinner type="growing" size="small" />
<MSpinner type="growing" />
<MSpinner type="growing" size="large" />
<MSpinner type="dots" size="small" />
<MSpinner type="dots" />
<MSpinner type="dots" size="large" />`

const customColorCode = `<MSpinner color="#67c23a" />
<MSpinner color="#e6a23c" />
<MSpinner type="growing" color="#f56c6c" />
<MSpinner type="growing" color="#a78bfa" />`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'size', label: '尺寸' },
  { id: 'custom-color', label: '自定义颜色' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['type', 'border | growing | dots', 'border', '旋转器类型'],
    ['size', 'small | default | large', 'default', '旋转器尺寸'],
    ['color', 'string', "''", '自定义颜色'],
    ['plain', 'boolean', 'false', '是否去除灰色底色轨道（仅 border 类型）'],
  ],
}
</script>