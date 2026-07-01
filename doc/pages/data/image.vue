<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Image 图片</h1>
    <p class="doc-page__desc">图片容器，支持多种填充模式、懒加载、加载失败回退和图片预览。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>src</code> 指定图片地址，<code>fit</code> 控制填充模式。下图分别展示 fill / contain / cover / none / scale-down 五种效果。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group" style="flex-direction: row; flex-wrap: wrap; gap: 16px;">
            <div class="demo-fit-item">
              <MImage style="width: 160px; height: 120px;" :src="imgUrl" fit="fill" />
              <span>fill</span>
            </div>
            <div class="demo-fit-item">
              <MImage style="width: 160px; height: 120px;" :src="imgUrl" fit="contain" />
              <span>contain</span>
            </div>
            <div class="demo-fit-item">
              <MImage style="width: 160px; height: 120px;" :src="imgUrl" fit="cover" />
              <span>cover</span>
            </div>
            <div class="demo-fit-item">
              <MImage style="width: 160px; height: 120px;" :src="imgUrl" fit="none" />
              <span>none</span>
            </div>
            <div class="demo-fit-item">
              <MImage style="width: 160px; height: 120px;" :src="imgUrl" fit="scale-down" />
              <span>scale-down</span>
            </div>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="preview">
        <h2>图片预览</h2>
        <p class="doc-page__hint">通过 <code>previewSrcList</code> 设置可预览的图片列表，点击图片打开大图预览，支持左右切换与键盘操作。</p>
        <DemoBlock :code="previewCode">
          <div class="doc-demo-group" style="flex-direction: row; gap: 12px;">
            <MImage
              v-for="(src, i) in previewList"
              :key="i"
              style="width: 120px; height: 90px;"
              :src="src"
              fit="cover"
              :preview-src-list="previewList"
              :initial-index="i"
            />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="lazy">
        <h2>懒加载</h2>
        <p class="doc-page__hint">设置 <code>lazy</code> 属性启用懒加载，图片进入视口时才加载。</p>
        <DemoBlock :code="lazyCode">
          <div style="height: 200px; overflow-y: auto;">
            <MImage v-for="i in 3" :key="i" style="width: 200px; height: 120px; display: block; margin-bottom: 8px;" :src="imgUrl" fit="cover" lazy />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="error">
        <h2>加载失败</h2>
        <p class="doc-page__hint">图片加载失败时显示错误占位，可通过 <code>#error</code> 插槽自定义。</p>
        <DemoBlock code='<MImage style="width: 120px; height: 120px;" src="wrong-url.jpg" fit="cover" />'>
          <MImage style="width: 120px; height: 120px;" src="wrong-url.jpg" fit="cover" />
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />
    <h3>Events</h3>
    <ApiTable type="event" :data="DATA.events" />
    <h3>Slots</h3>
    <ApiTable type="slot" :data="DATA.slots" />
  </div>
</template>

<script setup lang="ts">
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const imgUrl = 'https://picsum.photos/seed/mosaic-img/300/200'

const previewList = [
  'https://picsum.photos/seed/mosaic-p1/600/400',
  'https://picsum.photos/seed/mosaic-p2/600/400',
  'https://picsum.photos/seed/mosaic-p3/600/400',
]

const basicCode = `<MImage style="width: 160px; height: 120px;" :src="imgUrl" fit="fill" />
<MImage style="width: 160px; height: 120px;" :src="imgUrl" fit="contain" />
<MImage style="width: 160px; height: 120px;" :src="imgUrl" fit="cover" />
<MImage style="width: 160px; height: 120px;" :src="imgUrl" fit="none" />
<MImage style="width: 160px; height: 120px;" :src="imgUrl" fit="scale-down" />`

const previewCode = `<MImage
  v-for="(src, i) in previewList"
  :key="i"
  style="width: 120px; height: 90px;"
  :src="src"
  fit="cover"
  :preview-src-list="previewList"
  :initial-index="i"
/>`

const lazyCode = `<MImage style="width: 200px; height: 120px;" :src="imgUrl" fit="cover" lazy />`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'preview', label: '图片预览' },
  { id: 'lazy', label: '懒加载' },
  { id: 'error', label: '加载失败' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['src', 'string', '—', '图片地址'],
    ['fit', 'fill | contain | cover | none | scale-down', 'fill', '图片填充模式'],
    ['alt', 'string', '—', '原生 alt 属性'],
    ['lazy', 'boolean', 'false', '是否启用懒加载'],
    ['previewSrcList', 'string[]', '—', '预览图片列表'],
    ['initialIndex', 'number', '0', '预览初始索引'],
    ['zindex', 'number', '2000', '预览层级'],
  ],
  events: [
    ['load', 'Event', '图片加载成功时触发'],
    ['error', 'Event', '图片加载失败时触发'],
  ],
  slots: [
    ['error', '加载失败时的占位内容'],
    ['placeholder', '图片加载中的占位内容'],
  ],
}
</script>

<style scoped lang="scss">
.demo-fit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--mosaic-text-secondary);
}
</style>
