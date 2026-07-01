<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Backtop 回到顶部</h1>
    <p class="doc-page__desc">用于页面滚动过长时快速返回顶部，支持自定义滚动容器。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MBacktop</code> 组件，页面滚动超过指定距离后显示回到顶部按钮。</p>
        <DemoBlock :code="basicCode">
          <div class="demo-backtop-scroll" ref="scrollContainer">
            <p v-for="i in 20" :key="i" style="padding: 8px 0;">滚动内容第 {{ i }} 行</p>
            <MBacktop target=".demo-backtop-scroll" :visibility-height="100" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom">
        <h2>自定义样式</h2>
        <p class="doc-page__hint">通过插槽自定义回到顶部按钮的样式。</p>
        <DemoBlock code='<MBacktop :right="50" :bottom="50">
  <div style="width: 40px; height: 40px; border-radius: 50%; background: #a78bfa; color: #fff; display: flex; align-items: center; justify-content: center;">UP</div>
</MBacktop>'>
          <div class="demo-backtop-scroll" style="height: 150px;">
            <p v-for="i in 20" :key="i" style="padding: 8px 0;">滚动内容第 {{ i }} 行</p>
            <MBacktop target=".demo-backtop-scroll" :visibility-height="100">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: #a78bfa; color: #fff; display: flex; align-items: center; justify-content: center;">UP</div>
            </MBacktop>
          </div>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />
    <h3>Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const scrollContainer = ref<HTMLElement | null>(null)

const basicCode = `<MBacktop :visibility-height="100" />
<!-- 或指定滚动容器 -->
<MBacktop target=".scroll-container" :visibility-height="100" />`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'custom', label: '自定义样式' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['target', 'string', '—', '触发滚动的事件对象（CSS 选择器）'],
    ['visibilityHeight', 'number', '200', '滚动高度达到此值后显示'],
    ['right', 'number', '40', '距离右侧距离（px）'],
    ['bottom', 'number', '40', '距离底部距离（px）'],
  ],
  events: [
    ['click', 'Event', '点击按钮时触发'],
  ],
}
</script>

<style lang="scss">
.demo-backtop-scroll {
  height: 200px;
  overflow-y: auto;
  border: 1px solid var(--mosaic-border-color);
  border-radius: 4px;
  padding: 12px;
  position: relative;
}
</style>