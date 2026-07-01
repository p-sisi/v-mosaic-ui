<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Badge 徽标</h1>
    <p class="doc-page__desc">出现在图标或文字右上角的徽标数字或小圆点。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>value</code> 属性设置徽标显示内容。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group">
            <MBadge :value="12">
              <MButton>这里可以是啥都行</MButton>
            </MBadge>
            <MBadge :value="3">
              <MButton type="primary">这个也行</MButton>
            </MBadge>
            <MBadge :value="6">
              <MAvatar>头像</MAvatar>
            </MBadge>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="max-dot">
        <h2>小圆点</h2>
        <p class="doc-page__hint"><code>isDot</code> 属性显示小圆点。</p>
        <DemoBlock :code="dotCode">
          <div class="doc-demo-group">
            <MBadge is-dot>
              <MButton type="primary">小圆点</MButton>
            </MBadge>
            <MBadge is-dot>
              <MAvatar>点</MAvatar>
            </MBadge>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="max-dot">
        <h2>最大值</h2>
        <p class="doc-page__hint"><code>max</code> 属性限制显示最大值，<code>isDot</code> 属性显示小圆点。</p>
        <DemoBlock :code="maxCode">
          <div class="doc-demo-group">
            <MBadge :value="200" :max="99">
              <MButton>有最大值99</MButton>
            </MBadge>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom-content">
        <h2>自定义内容</h2>
        <p class="doc-page__hint">通过 <code>content</code> 插槽可自定义徽标内容，无需传入 <code>value</code> 属性。</p>
        <DemoBlock :code="customContentCode">
          <div class="doc-demo-group">
            <MBadge type="danger">
              <template #content>Hot</template>
              <MButton>热门</MButton>
            </MBadge>
            <MBadge type="warning">
              <template #content>New</template>
              <MButton>动态</MButton>
            </MBadge>
            <MBadge>
              <template #content>🔥</template>
              <MButton>消息</MButton>
            </MBadge>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom-color">
        <h2>自定义颜色</h2>
        <p class="doc-page__hint">通过 <code>color</code> 属性可自定义徽标背景色，优先级高于 <code>type</code>。</p>
        <DemoBlock :code="customColorCode">
          <div class="doc-demo-group">
            <MBadge :value="3" color="#9c27b0">
              <MButton>紫色</MButton>
            </MBadge>
            <MBadge :value="6" color="#ff5722">
              <MButton>橙色</MButton>
            </MBadge>
            <MBadge is-dot color="#00bcd4">
              <MButton>青色小圆点</MButton>
            </MBadge>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="type-hidden">
        <h2>类型与隐藏</h2>
        <p class="doc-page__hint"><code>type</code> 属性设置徽标颜色风格。</p>
        <DemoBlock :code="typeHiddenCode">
          <div class="doc-demo-group">
            <MBadge :value="5" type="primary">
              <MButton>primary</MButton>
            </MBadge>
            <MBadge :value="5" type="success">
              <MButton>success</MButton>
            </MBadge>
            <MBadge :value="5" type="warning">
              <MButton>warning</MButton>
            </MBadge>
            <MBadge :value="5" type="danger">
              <MButton>danger</MButton>
            </MBadge>
            <MBadge :value="5" type="info">
              <MButton>info</MButton>
            </MBadge>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="max-dot">
        <h2>隐藏</h2>
        <p class="doc-page__hint"><code>hidden</code> 属性隐藏徽标。</p>
        <DemoBlock :code="hiddenCode">
          <div class="doc-demo-group">
            <MBadge :value="5" :hidden="badgeHidden">
              <MButton @click="badgeHidden = !badgeHidden">切换显隐状态</MButton>
            </MBadge>
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
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const badgeHidden = ref(false)

const basicCode = `<MBadge :value="12">
  <MButton>这里可以是啥都行</MButton>
</MBadge>
<MBadge :value="3">
  <MButton type="primary">这个也行</MButton>
</MBadge>
<MBadge :value="6">
  <MAvatar>头像</MAvatar>
</MBadge>`

const dotCode = `<MBadge is-dot>
  <MButton type="primary">小圆点</MButton>
</MBadge>
<MBadge is-dot>
  <MAvatar>点</MAvatar>
</MBadge>`

const maxCode = `<MBadge :value="200" :max="99">
  <MButton>有最大值99</MButton>
</MBadge>`

const customContentCode = `<MBadge type="danger">
  <template #content>Hot</template>
  <MButton>热门</MButton>
</MBadge>
<MBadge type="warning">
  <template #content>New</template>
  <MButton>动态</MButton>
</MBadge>
<MBadge>
  <template #content>🔥</template>
  <MButton>消息</MButton>
</MBadge>`

const customColorCode = `<MBadge :value="3" color="#9c27b0">
  <MButton>紫色</MButton>
</MBadge>
<MBadge :value="6" color="#ff5722">
  <MButton>橙色</MButton>
</MBadge>
<MBadge is-dot color="#00bcd4">
  <MButton>青色小圆点</MButton>
</MBadge>`

const typeHiddenCode = `<MBadge :value="5" type="primary">
  <MButton>primary</MButton>
</MBadge>
<MBadge :value="5" type="success">
  <MButton>success</MButton>
</MBadge>
<MBadge :value="5" type="warning">
  <MButton>warning</MButton>
</MBadge>
<MBadge :value="5" type="danger">
  <MButton>danger</MButton>
</MBadge>
<MBadge :value="5" type="info">
  <MButton>info</MButton>
</MBadge>`

const withAvatarCode = `<MBadge :value="6">
  <MAvatar>U</MAvatar>
</MBadge>
<MBadge is-dot>
  <MAvatar>U</MAvatar>
</MBadge>`

const hiddenCode = `<MBadge :value="5" :hidden="badgeHidden">
  <MButton @click="badgeHidden = !badgeHidden">切换显隐状态</MButton>
</MBadge>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'max-dot', label: '最大值与小圆点' },
  { id: 'custom-content', label: '自定义内容' },
  { id: 'custom-color', label: '自定义颜色' },
  { id: 'type-hidden', label: '类型与隐藏' },
  { id: 'with-avatar', label: '与头像配合' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['value', 'string | number', "''", '徽章显示的值'],
    ['max', 'number', '—', '最大值，超过显示 max+'],
    ['isDot', 'boolean', 'false', '是否为小圆点'],
    ['hidden', 'boolean', 'false', '是否隐藏徽章'],
    ['type', 'primary | success | warning | danger | info', 'primary', '徽章类型，决定颜色风格'],
    ['color', 'string', "''", '自定义徽标背景色，优先级高于 type'],
  ],
  slots: [
    ['default', '徽标所包裹的内容'],
    ['content', '自定义徽标内容体，无需传入 value 也可显示'],
  ],
}
</script>