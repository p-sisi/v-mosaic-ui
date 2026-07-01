<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Scrollbar 滚动条</h1>
    <p class="doc-page__desc">自定义滚动条，替代浏览器原生滚动条，支持最大高度和原生模式。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MScrollbar</code> 包裹内容区域，自动替换原生滚动条。</p>
        <DemoBlock :code="basicCode">
          <MScrollbar :max-height="120">
            <p v-for="i in 20" :key="i">这是第 {{ i }} 行内容</p>
          </MScrollbar>
        </DemoBlock>
      </div>

      <div class="doc-section" id="max-height">
        <h2>最大高度</h2>
        <p class="doc-page__hint">通过 <code>maxHeight</code> 属性设置容器最大高度，支持数字（px）或字符串。</p>
        <DemoBlock :code="maxHeightCode">
          <MScrollbar :max-height="80">
            <p v-for="i in 10" :key="i">内容行 {{ i }}</p>
          </MScrollbar>
        </DemoBlock>
      </div>

      <div class="doc-section" id="native">
        <h2>原生模式</h2>
        <p class="doc-page__hint">设置 <code>native</code> 属性使用浏览器原生滚动条。</p>
        <DemoBlock :code="nativeCode">
          <MScrollbar :max-height="100" native>
            <p v-for="i in 10" :key="i">原生滚动 {{ i }}</p>
          </MScrollbar>
        </DemoBlock>
      </div>

      <div class="doc-section" id="trigger">
        <h2>触发方式</h2>
        <p class="doc-page__hint">通过 <code>trigger</code> 属性设置滚动条触发方式：<code>hover</code>（默认）悬浮显示，<code>none</code> 始终显示。</p>
        <DemoBlock :code="triggerCode">
          <div class="doc-scrollbar-trigger">
            <div>
              <p class="doc-scrollbar-trigger__label">trigger="hover"</p>
              <MScrollbar :max-height="100" trigger="hover">
                <p v-for="i in 10" :key="i">悬浮显示 {{ i }}</p>
              </MScrollbar>
            </div>
            <div>
              <p class="doc-scrollbar-trigger__label">trigger="none"</p>
              <MScrollbar :max-height="100" trigger="none">
                <p v-for="i in 10" :key="i">始终显示 {{ i }}</p>
              </MScrollbar>
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

const basicCode = `<MScrollbar :max-height="120">
  <p v-for="i in 20" :key="i">这是第 {{ i }} 行内容</p>
</MScrollbar>`

const maxHeightCode = `<MScrollbar :max-height="80">
  <p v-for="i in 10" :key="i">内容行 {{ i }}</p>
</MScrollbar>`

const nativeCode = `<MScrollbar :max-height="100" native>
  <p v-for="i in 10" :key="i">原生滚动 {{ i }}</p>
</MScrollbar>`

const triggerCode = `<MScrollbar :max-height="100" trigger="hover">
  <p v-for="i in 10" :key="i">悬浮显示 {{ i }}</p>
</MScrollbar>
<MScrollbar :max-height="100" trigger="none">
  <p v-for="i in 10" :key="i">始终显示 {{ i }}</p>
</MScrollbar>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'max-height', label: '最大高度' },
  { id: 'native', label: '原生模式' },
  { id: 'trigger', label: '触发方式' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['native', 'boolean', 'false', '是否使用原生滚动条'],
    ['maxHeight', 'number | string', '—', '最大高度'],
    ['trigger', 'none | hover', 'hover', '滚动条触发方式，none 始终显示，hover 悬浮显示'],
    ['minSize', 'number', '20', '滚动条最小尺寸（像素）'],
  ],
  slots: [
    ['default', '滚动区域内容'],
  ],
}
</script>

<style lang="scss" scoped>
.doc-scrollbar-trigger {
  display: flex;
  gap: 24px;

  &__label {
    font-size: 12px;
    color: var(--mosaic-text-secondary);
    margin-bottom: 8px;
  }
}
</style>