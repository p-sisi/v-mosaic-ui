<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Empty 空状态</h1>
    <p class="doc-page__desc">空状态时的占位提示，支持自定义描述、图片和操作。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <DemoBlock :code="basicCode">
          <MEmpty />
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom-image">
        <h2>自定义图片与大小</h2>
        <p class="doc-page__hint">使用 <code>image</code> 属性设置自定义图片地址，<code>imageSize</code> 属性设置图片大小。</p>
        <DemoBlock :code="customImageCode">
          <MEmpty description="自定义图片" image="https://picsum.photos/200" :image-size="100" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom-desc">
        <h2>自定义描述</h2>
        <p class="doc-page__hint">使用 <code>description</code> 属性设置主标题提示文案，<code>subDescription</code> 属性设置次级提示文案。</p>
        <DemoBlock :code="customDescCode">
          <MEmpty description="暂无数据" sub-description="试试刷新页面或调整筛选条件" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="with-actions">
        <h2>底部操作</h2>
        <p class="doc-page__hint">通过默认插槽添加底部操作按钮。</p>
        <DemoBlock :code="withActionsCode">
          <MEmpty description="暂无内容" sub-description="试试刷新页面或调整筛选条件">
            <MButton type="primary" size="small">创建内容</MButton>
          </MEmpty>
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

const basicCode = `<MEmpty />`

const customDescCode = `<MEmpty description="暂无数据" sub-description="试试刷新页面或调整筛选条件" />`

const customImageCode = `<MEmpty
  description="自定义图片"
  image="https://picsum.photos/200"
  :image-size="100"
/>`

const withActionsCode = `<MEmpty description="暂无内容" sub-description="试试刷新页面或调整筛选条件">
  <MButton type="primary" size="small">创建内容</MButton>
</MEmpty>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'custom-image', label: '自定义图片与大小' },
  { id: 'custom-desc', label: '自定义描述' },
  { id: 'with-actions', label: '底部操作' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['description', 'string', "''", '主标题提示文案'],
    ['subDescription', 'string', "''", '次级提示文案'],
    ['image', 'string', "''", '自定义图片地址'],
    ['imageSize', 'number', '—', '图片大小（像素）'],
  ],
  slots: [
    ['default', '底部操作区域内容'],
  ],
}
</script>