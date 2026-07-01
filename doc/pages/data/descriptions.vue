<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Descriptions 描述列表</h1>
    <p class="doc-page__desc">列表形式展示多个描述字段，支持边框、列数和方向配置。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MDescriptions</code> 和 <code>MDescriptionsItem</code> 组合展示描述信息。</p>
        <DemoBlock :code="basicCode">
          <MDescriptions title="用户信息">
            <MDescriptionsItem label="用户名">张三</MDescriptionsItem>
            <MDescriptionsItem label="手机号">138****8888</MDescriptionsItem>
            <MDescriptionsItem label="居住地">苏州市</MDescriptionsItem>
            <MDescriptionsItem label="备注">江苏省苏州市工业园区</MDescriptionsItem>
          </MDescriptions>
        </DemoBlock>
      </div>

      <div class="doc-section" id="bordered">
        <h2>带边框与列数</h2>
        <p class="doc-page__hint">设置 <code>bordered</code> 显示边框，<code>:column</code> 控制每行显示列数。</p>
        <DemoBlock :code="borderedCode">
          <MDescriptions title="用户信息" bordered :column="2">
            <MDescriptionsItem label="用户名">张三</MDescriptionsItem>
            <MDescriptionsItem label="手机号">138****8888</MDescriptionsItem>
            <MDescriptionsItem label="居住地">苏州市</MDescriptionsItem>
            <MDescriptionsItem label="备注">江苏省苏州市工业园区</MDescriptionsItem>
          </MDescriptions>
        </DemoBlock>
      </div>

      <div class="doc-section" id="direction">
        <h2>列表方向</h2>
        <p class="doc-page__hint">通过 <code>direction</code> 设置标签和内容的排列方向。</p>
        <DemoBlock :code="directionCode">
          <MDescriptions title="用户信息" bordered :column="2" direction="vertical">
            <MDescriptionsItem label="用户名">张三</MDescriptionsItem>
            <MDescriptionsItem label="手机号">138****8888</MDescriptionsItem>
            <MDescriptionsItem label="居住地">苏州市</MDescriptionsItem>
            <MDescriptionsItem label="备注">工业园区</MDescriptionsItem>
          </MDescriptions>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MDescriptions Props</h3>
    <ApiTable type="prop" :data="DATA.descriptionsProps" />
    <h3>MDescriptionsItem Props</h3>
    <ApiTable type="prop" :data="DATA.descriptionsItemProps" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicCode = `<MDescriptions title="用户信息">
  <MDescriptionsItem label="用户名">张三</MDescriptionsItem>
  <MDescriptionsItem label="手机号">138****8888</MDescriptionsItem>
  <MDescriptionsItem label="居住地">苏州市</MDescriptionsItem>
  <MDescriptionsItem label="备注">江苏省苏州市工业园区</MDescriptionsItem>
</MDescriptions>`

const borderedCode = `<MDescriptions title="用户信息" bordered :column="2">
  <MDescriptionsItem label="用户名">张三</MDescriptionsItem>
  <MDescriptionsItem label="手机号">138****8888</MDescriptionsItem>
  <MDescriptionsItem label="居住地">苏州市</MDescriptionsItem>
  <MDescriptionsItem label="备注">江苏省苏州市工业园区</MDescriptionsItem>
</MDescriptions>`

const directionCode = `<MDescriptions title="用户信息" bordered :column="2" direction="vertical">
  <MDescriptionsItem label="用户名">张三</MDescriptionsItem>
  <MDescriptionsItem label="手机号">138****8888</MDescriptionsItem>
  <MDescriptionsItem label="居住地">苏州市</MDescriptionsItem>
  <MDescriptionsItem label="备注">工业园区</MDescriptionsItem>
</MDescriptions>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'bordered', label: '带边框与列数' },
  { id: 'direction', label: '列表方向' },
  { id: 'api', label: 'API' },
]

const DATA = {
  descriptionsProps: [
    ['title', 'string', '—', '标题'],
    ['bordered', 'boolean', 'false', '是否带边框'],
    ['column', 'number', '3', '每行显示列数'],
    ['direction', 'horizontal | vertical', 'horizontal', '标签和内容的排列方向'],
    ['size', 'large | default | small', 'default', '列表尺寸'],
  ],
  descriptionsItemProps: [
    ['label', 'string', '—', '标签文本'],
    ['span', 'number', '1', '列数跨度'],
  ],
}
</script>
