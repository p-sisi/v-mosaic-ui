<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>AvatarGroup 头像组</h1>
    <p class="doc-page__desc">头像组合展示，支持重叠排列、最大数量限制和自定义间距。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">将多个 <code>MAvatar</code> 放入 <code>MAvatarGroup</code> 中即可组合展示，默认重叠排列。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group">
            <MAvatarGroup>
              <MAvatar src="https://picsum.photos/100/100?random=1" />
              <MAvatar src="https://picsum.photos/100/100?random=2" />
              <MAvatar src="https://picsum.photos/100/100?random=3" />
              <MAvatar src="https://picsum.photos/100/100?random=4" />
            </MAvatarGroup>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="max">
        <h2>最大数量</h2>
        <p class="doc-page__hint">通过 <code>max</code> 属性限制最多显示的头像数，超出部分以 +N 形式展示。</p>
        <DemoBlock :code="maxCode">
          <div class="doc-demo-group">
            <MAvatarGroup :max="3">
              <MAvatar src="https://picsum.photos/100/100?random=1" />
              <MAvatar src="https://picsum.photos/100/100?random=2" />
              <MAvatar src="https://picsum.photos/100/100?random=3" />
              <MAvatar src="https://picsum.photos/100/100?random=4" />
              <MAvatar src="https://picsum.photos/100/100?random=5" />
              <MAvatar src="https://picsum.photos/100/100?random=6" />
            </MAvatarGroup>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size-shape">
        <h2>尺寸与形状</h2>
        <p class="doc-page__hint">通过 <code>size</code> 和 <code>shape</code> 属性统一设置头像组的尺寸和形状。</p>
        <DemoBlock :code="sizeShapeCode">
          <div class="doc-demo-group">
            <MAvatarGroup size="small">
              <MAvatar>A</MAvatar>
              <MAvatar>B</MAvatar>
              <MAvatar>C</MAvatar>
            </MAvatarGroup>
            <MAvatarGroup size="large" shape="square">
              <MAvatar>A</MAvatar>
              <MAvatar>B</MAvatar>
              <MAvatar>C</MAvatar>
            </MAvatarGroup>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="exceed-slot">
        <h2>自定义超出内容</h2>
        <p class="doc-page__hint">通过 <code>#exceed</code> 插槽自定义超出最大数量后的显示内容，不使用插槽时默认显示超出数量。</p>
        <DemoBlock :code="exceedSlotCode">
          <div class="doc-demo-group">
            <MAvatarGroup :max="3">
              <MAvatar src="https://picsum.photos/100/100?random=1" />
              <MAvatar src="https://picsum.photos/100/100?random=2" />
              <MAvatar src="https://picsum.photos/100/100?random=3" />
              <MAvatar src="https://picsum.photos/100/100?random=4" />
              <MAvatar src="https://picsum.photos/100/100?random=5" />
              <template #exceed>更多</template>
            </MAvatarGroup>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="spacing">
        <h2>自定义间距</h2>
        <p class="doc-page__hint">通过 <code>spacing</code> 属性设置头像之间的间距，负值重叠，正值分离。</p>
        <DemoBlock :code="spacingCode">
          <div class="doc-demo-group">
            <MAvatarGroup :spacing="-16">
              <MAvatar>1</MAvatar>
              <MAvatar>2</MAvatar>
              <MAvatar>3</MAvatar>
            </MAvatarGroup>
            <MAvatarGroup :spacing="8">
              <MAvatar>1</MAvatar>
              <MAvatar>2</MAvatar>
              <MAvatar>3</MAvatar>
            </MAvatarGroup>
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

const basicCode = `<MAvatarGroup>
  <MAvatar src="https://picsum.photos/100/100?random=1" />
  <MAvatar src="https://picsum.photos/100/100?random=2" />
  <MAvatar src="https://picsum.photos/100/100?random=3" />
  <MAvatar src="https://picsum.photos/100/100?random=4" />
</MAvatarGroup>`

const maxCode = `<MAvatarGroup :max="3">
  <MAvatar src="..." />
  <MAvatar src="..." />
  <MAvatar src="..." />
  <MAvatar src="..." />
  <MAvatar src="..." />
  <MAvatar src="..." />
</MAvatarGroup>`

const sizeShapeCode = `<MAvatarGroup size="small">
  <MAvatar>A</MAvatar>
  <MAvatar>B</MAvatar>
  <MAvatar>C</MAvatar>
</MAvatarGroup>
<MAvatarGroup size="large" shape="square">
  <MAvatar>A</MAvatar>
  <MAvatar>B</MAvatar>
  <MAvatar>C</MAvatar>
</MAvatarGroup>`

const spacingCode = `<MAvatarGroup :spacing="-16">
  <MAvatar>1</MAvatar>
  <MAvatar>2</MAvatar>
  <MAvatar>3</MAvatar>
</MAvatarGroup>
<MAvatarGroup :spacing="8">
  <MAvatar>1</MAvatar>
  <MAvatar>2</MAvatar>
  <MAvatar>3</MAvatar>
</MAvatarGroup>`

const exceedSlotCode = `<MAvatarGroup :max="3">
  <MAvatar src="..." />
  <MAvatar src="..." />
  <MAvatar src="..." />
  <MAvatar src="..." />
  <MAvatar src="..." />
  <template #exceed>更多</template>
</MAvatarGroup>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'max', label: '最大数量' },
  { id: 'size-shape', label: '尺寸与形状' },
  { id: 'exceed-slot', label: '自定义超出内容' },
  { id: 'spacing', label: '自定义间距' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['max', 'number', '—', '最大显示头像数，超出显示 +N'],
    ['size', 'number | large | default | small', 'default', '头像尺寸'],
    ['shape', 'circle | square', 'circle', '头像形状'],
    ['spacing', 'number', '-8', '头像间距(px)，负值重叠，正值分离'],
  ],
  slots: [
    ['default', '头像组内容，放置 MAvatar 组件'],
    ['exceed', '自定义超出最大数量后的显示内容，默认显示超出数量'],
  ],
}
</script>
