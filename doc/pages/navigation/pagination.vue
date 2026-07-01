<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Pagination 分页</h1>
    <p class="doc-page__desc">当数据量过多时，使用分页分解数据，支持多种布局和配置。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">通过 <code>v-model:current-page</code> 和 <code>page-count</code> 控制分页。</p>
        <DemoBlock :code="basicCode">
          <MPagination  :current-page="currentPage" :page-size="10" :total="100"/>
        </DemoBlock>
      </div>

      <div class="doc-section" id="style">
        <h2>样式</h2>
        <p class="doc-page__hint">设置 <code>background</code> 为按钮添加背景色；设置 <code>text</code> 页码只显示数字，无背景色无边框，激活态以主色文字加粗区分。</p>
        <DemoBlock :code="styleCode">
          <div class="doc-demo-group">
            <MPagination background layout="prev, pager, next" :total="100" />
          </div>
          <div class="doc-demo-group">
            <MPagination text layout="prev, pager, next" :total="100" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">设置 <code>small</code> 使用小型分页。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group">
            <MPagination layout="prev, pager, next" :total="100" />
          </div>
          <div class="doc-demo-group">
            <MPagination small layout="prev, pager, next" :total="100" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="layout">
        <h2>自定义布局与页数</h2>
        <p class="doc-page__hint">通过 <code>layout</code> 自定义分页布局，<code>page-sizes</code> 设置可选页数。</p>
        <DemoBlock :code="layoutCode">
          <MPagination
            v-model:current-page="currentPage2"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          />
          <span class="demo-event-result">页码: {{ currentPage2 }}, 每页: {{ pageSize }}</span>
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

const currentPage = ref(1)
const currentPage2 = ref(1)
const pageSize = ref(10)

const basicCode = `<MPagination v-model:current-page="currentPage" :page-size="10" :total="100" />

<script setup>
const currentPage = ref(1)
<` + `/script>`

const layoutCode = `<MPagination
  v-model:current-page="currentPage2"
  v-model:page-size="pageSize"
  :page-sizes="[10, 20, 50, 100]"
  layout="total, sizes, prev, pager, next, jumper"
  :total="400"
/>

<script setup>
const currentPage2 = ref(1)
const pageSize = ref(10)
<` + `/script>`

const textCode = `<MPagination text layout="prev, pager, next" :total="100" />`

const styleCode = `<MPagination background layout="prev, pager, next" :total="100" />
<MPagination text layout="prev, pager, next" :total="100" />`

const sizeCode = `<MPagination layout="prev, pager, next" :total="100" />
<MPagination small layout="prev, pager, next" :total="100" />`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'style', label: '样式' },
  { id: 'size', label: '尺寸' },
  { id: 'layout', label: '自定义布局与页数' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['total', 'number', '0', '总条目数'],
    ['pageSize', 'number', '10', '每页显示条目个数'],
    ['currentPage', 'number', '1', '当前页数（v-model）'],
    ['pageCount', 'number', '—', '总页数，与 total 二选一'],
    ['pageSizes', 'number[]', '[10, 20, 30, 40, 50, 100]', '每页显示个数选择器的选项'],
    ['layout', 'string', 'prev, pager, next, jumper', '组件布局，子组件名用逗号分隔'],
    ['background', 'boolean', 'false', '是否为分页按钮添加背景色'],
    ['text', 'boolean', 'false', '页码是否为纯文字（无边框无背景）'],
    ['small', 'boolean', 'false', '是否使用小型分页'],
  ],
  events: [
    ['current-change', 'number', 'currentPage 改变时触发'],
    ['size-change', 'number', 'pageSize 改变时触发'],
    ['prev-click', 'number', '点击上一页按钮时触发'],
    ['next-click', 'number', '点击下一页按钮时触发'],
  ],
}
</script>
