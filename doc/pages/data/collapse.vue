<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Collapse 折叠面板</h1>
    <p class="doc-page__desc">通过折叠面板收纳内容区域，支持手风琴和禁用模式。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MCollapse</code> 和 <code>MCollapseItem</code> 组合，通过 <code>v-model</code> 绑定展开项。</p>
        <DemoBlock :code="basicCode">
          <MCollapse v-model="activeNames">
            <MCollapseItem title="一致性 Consistency" name="1">
              与现实生活一致：与现实生活的流程、逻辑保持一致。
            </MCollapseItem>
            <MCollapseItem title="反馈 Feedback" name="2">
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作。
            </MCollapseItem>
            <MCollapseItem title="效率 Efficiency" name="3">
              简化流程：设计简洁直观的操作流程。
            </MCollapseItem>
          </MCollapse>
        </DemoBlock>
      </div>

      <div class="doc-section" id="accordion">
        <h2>手风琴与禁用</h2>
        <p class="doc-page__hint">设置 <code>accordion</code> 只展开一个面板，<code>disabled</code> 禁用某项。</p>
        <DemoBlock :code="accordionCode">
          <MCollapse v-model="accordionActive" accordion>
            <MCollapseItem title="面板一" name="1">面板一内容</MCollapseItem>
            <MCollapseItem title="面板二" name="2">面板二内容</MCollapseItem>
            <MCollapseItem title="面板三（禁用）" name="3" disabled>面板三内容</MCollapseItem>
          </MCollapse>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MCollapse Props</h3>
    <ApiTable type="prop" :data="DATA.collapseProps" />
    <h3>MCollapseItem Props</h3>
    <ApiTable type="prop" :data="DATA.collapseItemProps" />
    <h3>MCollapse Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const activeNames = ref(['1'])
const accordionActive = ref('1')

const basicCode = `<MCollapse v-model="activeNames">
  <MCollapseItem title="一致性 Consistency" name="1">
    与现实生活一致：与现实生活的流程、逻辑保持一致。
  </MCollapseItem>
  <MCollapseItem title="反馈 Feedback" name="2">
    控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作。
  </MCollapseItem>
  <MCollapseItem title="效率 Efficiency" name="3">
    简化流程：设计简洁直观的操作流程。
  </MCollapseItem>
</MCollapse>

<script setup>
const activeNames = ref(['1'])
<` + `/script>`

const accordionCode = `<MCollapse v-model="accordionActive" accordion>
  <MCollapseItem title="面板一" name="1">面板一内容</MCollapseItem>
  <MCollapseItem title="面板二" name="2">面板二内容</MCollapseItem>
  <MCollapseItem title="面板三（禁用）" name="3" disabled>面板三内容</MCollapseItem>
</MCollapse>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'accordion', label: '手风琴与禁用' },
  { id: 'api', label: 'API' },
]

const DATA = {
  collapseProps: [
    ['modelValue', 'string | string[]', '—', '当前展开项（v-model）'],
    ['accordion', 'boolean', 'false', '是否手风琴模式'],
  ],
  collapseItemProps: [
    ['title', 'string', '—', '面板标题'],
    ['name', 'string | number', '—', '唯一标识'],
    ['disabled', 'boolean', 'false', '是否禁用'],
  ],
  events: [
    ['change', 'string | string[]', '展开项变化时触发'],
  ],
}
</script>
