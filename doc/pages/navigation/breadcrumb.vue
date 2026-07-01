<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Breadcrumb 面包屑</h1>
    <p class="doc-page__desc">显示当前页面的路径，快速返回导航层级。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MBreadcrumb</code> 和 <code>MBreadcrumbItem</code> 组合展示路径层级。</p>
        <DemoBlock code='<MBreadcrumb>
  <MBreadcrumbItem>首页</MBreadcrumbItem>
  <MBreadcrumbItem>活动管理</MBreadcrumbItem>
  <MBreadcrumbItem>活动列表</MBreadcrumbItem>
  <MBreadcrumbItem>活动详情</MBreadcrumbItem>
</MBreadcrumb>'>
          <MBreadcrumb>
            <MBreadcrumbItem>首页</MBreadcrumbItem>
            <MBreadcrumbItem>活动管理</MBreadcrumbItem>
            <MBreadcrumbItem>活动列表</MBreadcrumbItem>
            <MBreadcrumbItem>活动详情</MBreadcrumbItem>
          </MBreadcrumb>
        </DemoBlock>
      </div>

      <div class="doc-section" id="separator">
        <h2>自定义分隔符</h2>
        <p class="doc-page__hint">通过 <code>separator</code> 属性设置分隔符，也可在 <code>MBreadcrumbItem</code> 中使用 <code>#separator</code> 插槽自定义分隔符内容。</p>
        <DemoBlock :code="separatorCode">
          <p style="margin-bottom: 8px; font-size: 13px; color: #666;">属性设置分隔符</p>
          <MBreadcrumb separator=">">
            <MBreadcrumbItem>首页</MBreadcrumbItem>
            <MBreadcrumbItem>活动管理</MBreadcrumbItem>
            <MBreadcrumbItem>活动列表</MBreadcrumbItem>
          </MBreadcrumb>
          <p style="margin: 16px 0 8px; font-size: 13px; color: #666;">插槽自定义分隔符</p>
          <MBreadcrumb>
            <MBreadcrumbItem>首页<template #separator>→</template></MBreadcrumbItem>
            <MBreadcrumbItem>活动管理<template #separator>→</template></MBreadcrumbItem>
            <MBreadcrumbItem>活动列表<template #separator>→</template></MBreadcrumbItem>
          </MBreadcrumb>
        </DemoBlock>
      </div>

      <div class="doc-section" id="router">
        <h2>路由跳转</h2>
        <p class="doc-page__hint">为 <code>MBreadcrumbItem</code> 设置 <code>to</code> 属性即可作为 <code>router-link</code> 使用。</p>
        <DemoBlock code='<MBreadcrumb>
  <MBreadcrumbItem :to="{ path: &quot;/&quot; }">首页</MBreadcrumbItem>
  <MBreadcrumbItem>活动管理</MBreadcrumbItem>
  <MBreadcrumbItem>活动详情</MBreadcrumbItem>
</MBreadcrumb>'>
          <MBreadcrumb>
            <MBreadcrumbItem :to="{ path: '/' }">首页</MBreadcrumbItem>
            <MBreadcrumbItem>活动管理</MBreadcrumbItem>
            <MBreadcrumbItem>活动详情</MBreadcrumbItem>
          </MBreadcrumb>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MBreadcrumb Props</h3>
    <ApiTable type="prop" :data="DATA.breadcrumbProps" />
    <h3>MBreadcrumbItem Props</h3>
    <ApiTable type="prop" :data="DATA.breadcrumbItemProps" />
    <h3>MBreadcrumbItem Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const separatorCode = `<!-- 属性设置分隔符 -->
<MBreadcrumb separator=">">
  <MBreadcrumbItem>首页</MBreadcrumbItem>
  <MBreadcrumbItem>活动管理</MBreadcrumbItem>
  <MBreadcrumbItem>活动列表</MBreadcrumbItem>
</MBreadcrumb>

<!-- 插槽自定义分隔符 -->
<MBreadcrumb>
  <MBreadcrumbItem>首页<template #separator>→</template></MBreadcrumbItem>
  <MBreadcrumbItem>活动管理<template #separator>→</template></MBreadcrumbItem>
  <MBreadcrumbItem>活动列表<template #separator>→</template></MBreadcrumbItem>
</MBreadcrumb>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'separator', label: '自定义分隔符' },
  { id: 'router', label: '路由跳转' },
  { id: 'api', label: 'API' },
]

const DATA = {
  breadcrumbProps: [
    ['separator', 'string', '/', '分隔符'],
  ],
  breadcrumbItemProps: [
    ['to', 'string | RouteLocationRaw', '—', '路由跳转对象，同 router-link 的 to'],
    ['replace', 'boolean', 'false', '是否替换当前历史记录'],
  ],
  events: [
    ['click', 'MouseEvent | RouteLocationRaw', '点击时触发，to 存在时参数为路由对象'],
  ],
}
</script>
