<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Text 文本</h1>
    <p class="doc-page__desc">用于展示文本内容，支持类型颜色、自定义颜色、省略截断和渐变效果。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>type</code> 属性控制文本类型颜色。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group">
            <MText type="default">Default 默认</MText>
            <MText type="primary">Primary 主要</MText>
            <MText type="success">Success 成功</MText>
            <MText type="info">Info 信息</MText>
            <MText type="warning">Warning 警告</MText>
            <MText type="danger">Danger 危险</MText>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="color">
        <h2>自定义颜色</h2>
        <p class="doc-page__hint">通过 <code>color</code> 属性控制文本颜色，通过 <code>:gradient="{ from, to }"</code> 使文字呈现渐变效果。</p>
        <DemoBlock :code="colorCode">
          <div class="doc-demo-group" style="flex-direction: column; align-items: flex-start; gap: 8px;">
            <div class="doc-demo-group">
              <MText color="#13ce66">自定义绿色</MText>
              <MText color="#ff4949">自定义红色</MText>
              <MText color="#1e90ff">自定义蓝色</MText>
            </div>
            <MText :gradient="{ from: 'rgb(85, 85, 85)', to: 'rgb(170, 170, 170)' }" style="font-size: 20px; font-weight: 600;">灰色渐变文字</MText>
            <MText :gradient="{ from: '#a78bfa', to: '#7c3aed' }" style="font-size: 20px; font-weight: 600;">紫色渐变文字</MText>
            <MText :gradient="{ from: '#13ce66', to: '#1e90ff' }" style="font-size: 20px; font-weight: 600;">绿蓝渐变文字</MText>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="ellipsis">
        <h2>省略</h2>
        <p class="doc-page__hint">设置 <code>truncated</code> 属性单行省略，通过 <code>line-clamp</code> 属性控制多行截断的行数。</p>
        <DemoBlock :code="ellipsisCode">
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="width: 300px; border: 1px dashed #ddd; padding: 8px;">
              <MText truncated>这是一段很长的文本内容，设置了 truncated 属性后超出容器宽度会显示省略号。</MText>
            </div>
            <div style="width: 300px; border: 1px dashed #ddd; padding: 8px;">
              <MText :line-clamp="2">这是一段很长的文本内容，使用 line-clamp 属性可以控制多行截断。这里是第二行的内容，超出两行后将会显示省略号。继续补充更多文本内容来确保超出两行。</MText>
            </div>
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

const basicCode = `<MText type="default">Default 默认</MText>
<MText type="primary">Primary 主要</MText>
<MText type="success">Success 成功</MText>
<MText type="info">Info 信息</MText>
<MText type="warning">Warning 警告</MText>
<MText type="danger">Danger 危险</MText>`

const colorCode = `<MText color="#13ce66">自定义绿色</MText>
<MText color="#ff4949">自定义红色</MText>
<MText color="#1e90ff">自定义蓝色</MText>

<MText :gradient="{ from: 'rgb(85, 85, 85)', to: 'rgb(170, 170, 170)' }" style="font-size: 20px; font-weight: 600;">灰色渐变文字</MText>
<MText :gradient="{ from: '#a78bfa', to: '#7c3aed' }" style="font-size: 20px; font-weight: 600;">紫色渐变文字</MText>`

const ellipsisCode = `<!-- 单行省略 -->
<MText truncated>这是一段很长的文本内容，设置了 truncated 属性后超出容器宽度会显示省略号。</MText>

<!-- 多行省略 -->
<MText :line-clamp="2">这是一段很长的文本内容，使用 line-clamp 属性可以控制多行截断。</MText>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'color', label: '自定义颜色' },
  { id: 'ellipsis', label: '省略' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['type', 'default | primary | success | info | warning | danger', 'default', '文本类型'],
    ['color', 'string', '—', '自定义文本颜色'],
    ['truncated', 'boolean', 'false', '单行省略，超出宽度显示省略符'],
    ['lineClamp', 'number', '0', '多行省略行数，0 表示不限制'],
    ['gradient', '{ from: string, to: string }', '—', '渐变文字效果'],
  ],
}
</script>
