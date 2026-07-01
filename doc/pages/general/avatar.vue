<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Avatar 头像</h1>
    <p class="doc-page__desc">用图片或文字展示用户或事物信息，支持不同尺寸和形状。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">支持图片（<code>src</code>）和文字（默认插槽）两种展示方式。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group">
            <MAvatar src="https://picsum.photos/100" />
            <MAvatar>U</MAvatar>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="shape-size">
        <h2>形状和尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 和 <code>shape</code> 属性设置头像尺寸和形状。</p>
        <DemoBlock :code="shapeSizeCode">
          <div class="doc-demo-group">
            <MAvatar size="small">S</MAvatar>
            <MAvatar>M</MAvatar>
            <MAvatar size="large">L</MAvatar>
          </div>
          <div class="doc-demo-group">
            <MAvatar shape="square" size="small">S</MAvatar>
            <MAvatar shape="square">M</MAvatar>
            <MAvatar shape="square" size="large">L</MAvatar>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="mask">
        <h2>蒙层</h2>
        <p class="doc-page__hint">通过 <code>#mask</code> 插槽在头像上添加蒙层，插槽内容显示在蒙层之上。</p>
        <DemoBlock :code="maskCode">
          <div class="doc-demo-group">
            <MAvatar :size="50" src="https://picsum.photos/100/100?random=10">
              <template #mask>
                <span style="font-size: 14px;">已注销</span>
              </template>
            </MAvatar>
            <MAvatar :size="50" src="https://picsum.photos/100/100?random=11">
              <template #mask>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </template>
            </MAvatar>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="fallback">
        <h2>图片加载失败</h2>
        <p class="doc-page__hint">当图片加载失败时，自动切换为插槽内容。</p>
        <DemoBlock :code="fallbackCode">
          <div class="doc-demo-group">
            <MAvatar src="https://error-url">error</MAvatar>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="fit">
        <h2>图片填充方式</h2>
        <p class="doc-page__hint">通过 <code>fit</code> 属性设置图片填充方式，仅在传入 <code>src</code> 时生效。支持 fill、contain、cover、none、scale-down。</p>
        <DemoBlock :code="fitCode">
          <div class="doc-demo-group">
            <div class="doc-avatar-fit-item">
              <MAvatar :size="80" src="https://picsum.photos/300/200" fit="fill" shape="square" />
              <span>fill</span>
            </div>
            <div class="doc-avatar-fit-item">
              <MAvatar :size="80" src="https://picsum.photos/300/200" fit="contain" shape="square" />
              <span>contain</span>
            </div>
            <div class="doc-avatar-fit-item">
              <MAvatar :size="80" src="https://picsum.photos/300/200" fit="cover" shape="square" />
              <span>cover</span>
            </div>
          </div>
          <div class="doc-demo-group">
            <div class="doc-avatar-fit-item">
              <MAvatar :size="80" src="https://picsum.photos/300/200" fit="none" shape="square" />
              <span>none</span>
            </div>
            <div class="doc-avatar-fit-item">
              <MAvatar :size="80" src="https://picsum.photos/300/200" fit="scale-down" shape="square" />
              <span>scale-down</span>
            </div>
          </div>
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

const basicCode = `<MAvatar src="https://picsum.photos/100" />
<MAvatar>U</MAvatar>`

const shapeSizeCode = `<MAvatar size="small">S</MAvatar>
<MAvatar>M</MAvatar>
<MAvatar size="large">L</MAvatar>

<MAvatar shape="square" size="small">S</MAvatar>
<MAvatar shape="square">M</MAvatar>
<MAvatar shape="square" size="large">L</MAvatar>`

const fitCode = `<MAvatar :size="80" src="https://picsum.photos/300/200" fit="fill" shape="square" />
<MAvatar :size="80" src="https://picsum.photos/300/200" fit="contain" shape="square" />
<MAvatar :size="80" src="https://picsum.photos/300/200" fit="cover" shape="square" />
<MAvatar :size="80" src="https://picsum.photos/300/200" fit="none" shape="square" />
<MAvatar :size="80" src="https://picsum.photos/300/200" fit="scale-down" shape="square" />`

const fallbackCode = `<MAvatar src="https://error-url">U</MAvatar>`

const maskCode = `<MAvatar :size="60" src="https://picsum.photos/100/100?random=10">
  <template #mask>
    <span style="font-size: 14px;">已注销</span>
  </template>
</MAvatar>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'shape-size', label: '形状和尺寸' },
  { id: 'fit', label: '图片填充方式' },
  { id: 'fallback', label: '图片加载失败' },
  { id: 'mask', label: '蒙层' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['size', 'number | large | default | small', 'default', '头像尺寸，数字为像素'],
    ['shape', 'circle | square', 'circle', '头像形状'],
    ['src', 'string', "''", '图片资源地址'],
    ['alt', 'string', "''", '图片替代文本'],
    ['srcSet', 'string', "''", '图片 srcset 属性'],
    ['fit', 'cover | contain | fill | none | scale-down', 'cover', '图片填充模式'],
  ],
  events: [
    ['error', 'Event', '图片加载失败事件'],
  ],
  slots: [
    ['default', '头像内容，可放入文字等'],
    ['mask', '蒙层内容，显示在头像上方的半透明遮罩中'],
  ],
}
</script>

<style scoped lang="scss">
.doc-avatar-fit-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  span {
    font-size: 12px;
    color: var(--mosaic-text-secondary);
  }
}
</style>