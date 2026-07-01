<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Skeleton 骨架屏</h1>
    <p class="doc-page__desc">在需要等待加载内容的位置提供占位图形，提升用户体验。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>rows</code> 属性设置骨架屏行数，默认 3 行。</p>
        <DemoBlock :code="basicCode">
          <MSkeleton :rows="3" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="animated">
        <h2>动画效果</h2>
        <p class="doc-page__hint">设置 <code>animated</code> 属性开启/关闭动画效果（默认开启）。</p>
        <DemoBlock :code="animatedCode">
          <div>
            <MSkeleton :animated="true" :rows="3" />
            <MSkeleton :animated="false" :rows="3" class="animated__false"/>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="template">
        <h2>自定义骨架模板</h2>
        <p class="doc-page__hint">通过 <code>#template</code> 插槽自定义骨架屏布局，可使用 <code>MSkeletonItem</code> 组件；<code>loading</code> 为 false 时展示默认插槽的真实内容。</p>
        <DemoBlock :code="templateCode">
          <div>
            <MButton size="small" @click="templateLoading = !templateLoading">切换加载状态</MButton>
            <div style="margin-top: 12px;">
              <MSkeleton :loading="templateLoading">
                <template #template>
                  <div style="display: flex; gap: 12px; align-items: center;">
                    <MSkeletonItem variant="circle" />
                    <div style="flex: 1;">
                      <MSkeletonItem variant="text" style="width: 30%; margin-bottom: 8px;" />
                      <MSkeletonItem variant="text" style="width: 50%;" />
                    </div>
                  </div>
                </template>
                <div style="display: flex; gap: 12px; align-items: center;">
                  <MAvatar :size="40">U</MAvatar>
                  <div>
                    <p style="font-weight: 600;">用户名</p>
                    <p style="color: var(--mosaic-text-secondary); font-size: 13px;">这是用户的简介信息</p>
                  </div>
                </div>
              </MSkeleton>
            </div>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom-size">
        <h2>自定义宽高</h2>
        <p class="doc-page__hint">通过 <code>MSkeletonItem</code> 的 <code>width</code> 和 <code>height</code> 属性自定义骨架屏项的宽高，支持数字（px）或字符串（如 <code>'50%'</code>）。</p>
        <DemoBlock :code="customSizeCode">
          <div class="doc-skeleton-custom">
            <MSkeletonItem variant="text" width="70%" :height="40" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="type">
        <h2>不同类型</h2>
        <p class="doc-page__hint">通过 <code>type</code> 属性设置骨架屏类型，支持 text、circle、image、button、rect。</p>
        <DemoBlock :code="typeCode">
          <div class="doc-skeleton-types">
            <div class="doc-skeleton-type-item" style="width: 200px;">
              <MSkeleton type="text" :rows="2" />
              <span>text</span>
            </div>
            <div class="doc-skeleton-type-item">
              <MSkeleton type="circle" />
              <span>circle</span>
            </div>
            <div class="doc-skeleton-type-item">
              <MSkeleton type="button" />
              <span>button</span>
            </div>
            <div class="doc-skeleton-type-item" style="width: 200px;">
              <MSkeleton type="rect" />
              <span>rect</span>
            </div>
            <div class="doc-skeleton-type-item" style="width: 400px;">
              <MSkeleton type="image" />
              <span>image</span>
            </div>
          </div>
        </DemoBlock>
      </div>
    </div>

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

const templateLoading = ref(true)

const basicCode = `<MSkeleton :rows="3" />`

const typeCode = `<MSkeleton type="text" :rows="2" />
<MSkeleton type="circle" />
<MSkeleton type="button" />
<MSkeleton type="rect" />
<MSkeleton type="image" />`

const animatedCode = `<MSkeleton :animated="true" :rows="3" />
<MSkeleton :animated="false" :rows="3" />`

const templateCode = `<MSkeleton :loading="templateLoading">
  <template #template>
    <div style="display: flex; gap: 12px; align-items: center;">
      <MSkeletonItem variant="circle" />
      <div style="flex: 1;">
        <MSkeletonItem variant="text" style="width: 30%; margin-bottom: 8px;" />
        <MSkeletonItem variant="text" style="width: 50%;" />
      </div>
    </div>
  </template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <MAvatar :size="40">U</MAvatar>
    <div>
      <p style="font-weight: 600;">用户名</p>
      <p style="color: var(--mosaic-text-secondary); font-size: 13px;">这是用户的简介信息</p>
    </div>
  </div>
</MSkeleton>`

const customSizeCode = `<MSkeletonItem variant="text" width="70%" :height="40" />`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'animated', label: '动画效果' },
  { id: 'template', label: '自定义骨架模板' },
  { id: 'custom-size', label: '自定义宽高' },
  { id: 'type', label: '不同类型' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['animated', 'boolean', 'true', '是否开启动画'],
    ['count', 'number', '1', '渲染组数'],
    ['loading', 'boolean', 'true', '是否正在加载，加载中显示骨架屏'],
    ['rows', 'number', '3', '骨架屏行数（type 为 text 时生效）'],
    ['type', 'text | circle | image | button | rect', 'text', '骨架屏类型'],
  ],
  slots: [
    ['default', '真实内容，loading 为 false 时展示'],
    ['template', '自定义骨架屏布局，可放置 MSkeletonItem 组件'],
  ],
}
</script>

<style lang="scss" scoped>
.animated__false {
  margin-top: 24px;
}

.doc-skeleton-custom {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.doc-skeleton-types {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-start;
}

.doc-skeleton-type-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  span {
    font-size: 12px;
    color: var(--mosaic-text-secondary);
  }
}
</style>
