<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Row / Col 栅格布局</h1>
    <p class="doc-page__desc">通过 MRow 和 MCol 组件进行 24 分栏布局，支持间隔、Flex 对齐、偏移和响应式断点。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础栅格</h2>
        <p class="doc-page__hint">使用 <code>span</code> 属性指定列占据的栅格数，总共 24 栏。</p>
        <DemoBlock :code="basicCode">
          <MRow class="demo-row">
            <MCol :span="24"><div class="demo-col">24</div></MCol>
          </MRow>
          <MRow class="demo-row">
            <MCol :span="12"><div class="demo-col">12</div></MCol>
            <MCol :span="12"><div class="demo-col">12</div></MCol>
          </MRow>
          <MRow class="demo-row">
            <MCol :span="8"><div class="demo-col">8</div></MCol>
            <MCol :span="8"><div class="demo-col">8</div></MCol>
            <MCol :span="8"><div class="demo-col">8</div></MCol>
          </MRow>
        </DemoBlock>
      </div>

      <div class="doc-section" id="gutter-flex">
        <h2>间隔与 Flex 布局</h2>
        <p class="doc-page__hint">通过 <code>gutter</code> 设置列间隔。设置 <code>type="flex"</code> 启用 Flex 布局，配合 <code>justify</code> 和 <code>align</code> 控制对齐。</p>
        <DemoBlock :code="gutterFlexCode">
          <MRow :gutter="20" class="demo-row">
            <MCol :span="6"><div class="demo-col">6</div></MCol>
            <MCol :span="6"><div class="demo-col">6</div></MCol>
            <MCol :span="6"><div class="demo-col">6</div></MCol>
            <MCol :span="6"><div class="demo-col">6</div></MCol>
          </MRow>
          <MRow type="flex" justify="center" class="demo-row">
            <MCol :span="6"><div class="demo-col">center</div></MCol>
            <MCol :span="6"><div class="demo-col">center</div></MCol>
          </MRow>
          <MRow type="flex" justify="space-between" class="demo-row">
            <MCol :span="6"><div class="demo-col">start</div></MCol>
            <MCol :span="6"><div class="demo-col">end</div></MCol>
          </MRow>
        </DemoBlock>
      </div>

      <div class="doc-section" id="offset-push-pull">
        <h2>偏移、推拉</h2>
        <p class="doc-page__hint"><code>offset</code> 设置左侧间隔格数，<code>push</code> 向右移动，<code>pull</code> 向左移动。</p>
        <DemoBlock :code="offsetPushPullCode">
          <MRow class="demo-row">
            <MCol :span="6" :offset="6"><div class="demo-col">offset-6</div></MCol>
            <MCol :span="6" :offset="6"><div class="demo-col">offset-6</div></MCol>
          </MRow>
          <MRow class="demo-row">
            <MCol :span="6" :push="6"><div class="demo-col">push-6</div></MCol>
            <MCol :span="6" :pull="6"><div class="demo-col">pull-6</div></MCol>
          </MRow>
        </DemoBlock>
      </div>

      <div class="doc-section" id="responsive">
        <h2>响应式布局</h2>
        <p class="doc-page__hint">通过 <code>xs</code>、<code>sm</code>、<code>md</code>、<code>lg</code>、<code>xl</code> 属性设置不同断点下的栅格数，可传数字或对象。</p>
        <DemoBlock :code="responsiveCode">
          <MRow class="demo-row">
            <MCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4"><div class="demo-col">响应式</div></MCol>
            <MCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4"><div class="demo-col">响应式</div></MCol>
            <MCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4"><div class="demo-col">响应式</div></MCol>
            <MCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4"><div class="demo-col">响应式</div></MCol>
          </MRow>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MRow Props</h3>
    <ApiTable type="prop" :data="DATA.rowProps" />

    <h3>MCol Props</h3>
    <ApiTable type="prop" :data="DATA.colProps" />
  </div>
</template>

<script setup lang="ts">
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicCode = `<MRow>
  <MCol :span="24"><div>24</div></MCol>
</MRow>
<MRow>
  <MCol :span="12"><div>12</div></MCol>
  <MCol :span="12"><div>12</div></MCol>
</MRow>
<MRow>
  <MCol :span="8"><div>8</div></MCol>
  <MCol :span="8"><div>8</div></MCol>
  <MCol :span="8"><div>8</div></MCol>
</MRow>`

const gutterFlexCode = `<!-- 间隔 -->
<MRow :gutter="20">
  <MCol :span="6"><div>6</div></MCol>
  <MCol :span="6"><div>6</div></MCol>
  <MCol :span="6"><div>6</div></MCol>
  <MCol :span="6"><div>6</div></MCol>
</MRow>

<!-- Flex 居中 -->
<MRow type="flex" justify="center">
  <MCol :span="6"><div>center</div></MCol>
  <MCol :span="6"><div>center</div></MCol>
</MRow>

<!-- Flex 两端对齐 -->
<MRow type="flex" justify="space-between">
  <MCol :span="6"><div>start</div></MCol>
  <MCol :span="6"><div>end</div></MCol>
</MRow>`

const offsetPushPullCode = `<!-- 偏移 -->
<MRow>
  <MCol :span="6" :offset="6"><div>offset-6</div></MCol>
  <MCol :span="6" :offset="6"><div>offset-6</div></MCol>
</MRow>

<!-- 推拉 -->
<MRow>
  <MCol :span="6" :push="6"><div>push-6</div></MCol>
  <MCol :span="6" :pull="6"><div>pull-6</div></MCol>
</MRow>`

const responsiveCode = `<MRow>
  <MCol :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
    <div>响应式</div>
  </MCol>
  <!-- 更多列... -->
</MRow>`

const anchors = [
  { id: 'basic', label: '基础栅格' },
  { id: 'gutter-flex', label: '间隔与 Flex' },
  { id: 'offset-push-pull', label: '偏移、推拉' },
  { id: 'responsive', label: '响应式布局' },
  { id: 'api', label: 'API' },
]

const DATA = {
  rowProps: [
    ['gutter', 'number', '0', '栅格间隔'],
    ['type', 'flex', '—', '布局模式，设为 flex 可启用 Flex 布局'],
    ['justify', 'start | end | center | space-around | space-between', 'start', 'Flex 水平排列方式'],
    ['align', 'top | middle | bottom', 'top', 'Flex 垂直排列方式'],
    ['tag', 'string', 'div', '自定义元素标签'],
  ],
  colProps: [
    ['span', 'number', '24', '栅格占据的列数'],
    ['offset', 'number', '0', '栅格左侧的间隔格数'],
    ['push', 'number', '0', '栅格向右移动格数'],
    ['pull', 'number', '0', '栅格向左移动格数'],
    ['xs', 'number | { span?, offset?, push?, pull? }', '—', '<576px 响应式栅格'],
    ['sm', 'number | { span?, offset?, push?, pull? }', '—', '>=576px 响应式栅格'],
    ['md', 'number | { span?, offset?, push?, pull? }', '—', '>=768px 响应式栅格'],
    ['lg', 'number | { span?, offset?, push?, pull? }', '—', '>=992px 响应式栅格'],
    ['xl', 'number | { span?, offset?, push?, pull? }', '—', '>=1200px 响应式栅格'],
  ],
}
</script>

<style scoped lang="scss">
.demo-row {
  margin-bottom: 12px;
}

.demo-col {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  padding: 8px 0;
  border-radius: 4px;
  font-size: 13px;
}
</style>
