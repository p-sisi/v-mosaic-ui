<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Table 表格</h1>
    <p class="doc-page__desc">用于展示多条结构类似的数据，支持排序、条纹、边框等特性。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MTable</code> 和 <code>MTableColumn</code> 组合展示数据表格。</p>
        <DemoBlock :code="basicCode">
          <MTable :data="tableData" style="width: 100%;">
            <MTableColumn prop="name" label="姓名" />
            <MTableColumn prop="age" label="年龄" />
            <MTableColumn prop="address" label="地址" />
          </MTable>
        </DemoBlock>
      </div>

      <div class="doc-section" id="style">
        <h2>条纹与边框</h2>
        <p class="doc-page__hint">设置 <code>stripe</code> 显示斑马纹，<code>border</code> 显示纵向边框。</p>
        <DemoBlock :code="styleCode">
          <MTable :data="tableData" stripe border style="width: 100%;">
            <MTableColumn prop="name" label="姓名" />
            <MTableColumn prop="age" label="年龄" />
            <MTableColumn prop="address" label="地址" />
          </MTable>
        </DemoBlock>
      </div>

      <div class="doc-section" id="sortable">
        <h2>排序</h2>
        <p class="doc-page__hint">设置 <code>sortable</code> 启用列排序，点击表头排序图标在升序/降序间切换。</p>
        <DemoBlock :code="sortableCode">
          <MTable :data="tableData" style="width: 100%;">
            <MTableColumn prop="name" label="姓名" />
            <MTableColumn prop="age" label="年龄" sortable />
            <MTableColumn prop="address" label="地址" />
          </MTable>
        </DemoBlock>
      </div>

      <div class="doc-section" id="fixed-column">
        <h2>固定列</h2>
        <p class="doc-page__hint">列设置 <code>fixed</code> 固定：布尔值 <code>true</code> 等同 <code>left</code>，也可传 <code>left</code> 或 <code>right</code>。横向滚动时固定列保持可见。</p>
        <DemoBlock :code="fixedColumnCode">
          <MTable :data="fixedColumnData" style="width: 100%;">
            <MTableColumn prop="date" label="日期" width="120" fixed />
            <MTableColumn prop="name" label="姓名" width="120" />
            <MTableColumn prop="province" label="省份" width="120" />
            <MTableColumn prop="city" label="市区" width="120" />
            <MTableColumn prop="address" label="地址" width="300" />
            <MTableColumn prop="zip" label="邮编" width="120" />
            <MTableColumn prop="action" label="操作" width="120" fixed="right" />
          </MTable>
        </DemoBlock>
      </div>

      <div class="doc-section" id="selection">
        <h2>多选</h2>
        <p class="doc-page__hint">添加一列 <code>type="selection"</code> 即可启用多选；通过 <code>selectable</code> 函数控制某些行不可勾选。</p>
        <DemoBlock :code="selectionCode">
          <MTable :data="selectionData" style="width: 100%;" @selection-change="handleSelectionChange">
            <MTableColumn type="selection" :selectable="selectable" width="48" />
            <MTableColumn prop="name" label="姓名" />
            <MTableColumn prop="age" label="年龄" />
            <MTableColumn prop="address" label="地址" />
          </MTable>
          <span class="demo-event-result">已选 {{ selectionRows.length }} 项：{{ selectionRows.map(r => r.name).join('、') }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom">
        <h2>自定义列内容与表头</h2>
        <p class="doc-page__hint">通过 <code>MTableColumn</code> 的默认插槽自定义列内容，scoped slot 接收 <code>{ row, column, $index }</code>；<code>#header</code> 插槽自定义表头，可组合其他组件使用。</p>
        <DemoBlock :code="customCode">
          <MTable :data="customData" style="width: 100%;">
            <MTableColumn prop="name" label="姓名" width="120" />
            <MTableColumn prop="status" width="140">
              <template #header>
                <span style="color: var(--mosaic-primary);">状态 ⭐</span>
              </template>
              <template #default="{ row }">
                <MTag :type="row.status === 'active' ? 'success' : 'info'" size="small">
                  {{ row.status === 'active' ? '启用' : '禁用' }}
                </MTag>
              </template>
            </MTableColumn>
            <MTableColumn prop="address" label="地址" />
            <MTableColumn label="操作" width="160">
              <template #default="{ row, $index }">
                <MButton size="small" @click="handleEdit(row, $index)">编辑</MButton>
                <MButton size="small" type="danger" plain style="margin-left: 8px;" @click="handleRemove(row, $index)">删除</MButton>
              </template>
            </MTableColumn>
          </MTable>
        </DemoBlock>
      </div>

      <div class="doc-section" id="overflow">
        <h2>超出省略</h2>
        <p class="doc-page__hint">设置 <code>show-overflow-tooltip</code>，当内容超出列宽时单行显示并出现省略号，hover 时通过气泡展示完整内容。</p>
        <DemoBlock :code="overflowCode">
          <MTable :data="overflowData" style="width: 100%;">
            <MTableColumn prop="name" label="姓名" width="120" />
            <MTableColumn prop="intro" label="简介" show-overflow-tooltip />
          </MTable>
        </DemoBlock>
      </div>

      <div class="doc-section" id="fixed-header">
        <h2>固定表头</h2>
        <p class="doc-page__hint">设置 <code>height</code>（或 <code>maxHeight</code>）即可实现固定表头，表身超出高度时独立滚动，无需额外代码。</p>
        <DemoBlock :code="fixedHeaderCode">
          <MTable :data="fixedHeaderData" height="240" style="width: 100%;">
            <MTableColumn prop="name" label="姓名" width="120" />
            <MTableColumn prop="age" label="年龄" width="100" />
            <MTableColumn prop="address" label="地址" />
          </MTable>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MTable Props</h3>
    <ApiTable type="prop" :data="DATA.tableProps" />
    <h3>MTableColumn Props</h3>
    <ApiTable type="prop" :data="DATA.tableColumnProps" />
    <h3>MTableColumn Slots</h3>
    <ApiTable type="slot" :data="DATA.tableColumnSlots" />
    <h3>MTable Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const tableData = ref([
  { name: '张三', age: 28, address: '北京市朝阳区' },
  { name: '李四', age: 32, address: '上海市浦东新区' },
  { name: '王五', age: 24, address: '广州市天河区' },
])

const overflowData = ref([
  { name: '张三', intro: '资深前端工程师，负责团队架构设计与开源组件库维护，长期关注工程化与性能优化。' },
  { name: '李四', intro: '后端开发工程师，专注于高并发分布式系统设计与中间件研发。' },
  { name: '王五', intro: '产品经理，关注用户体验与数据驱动决策。' },
])

const fixedHeaderData = ref([
  { name: '张三', age: 28, address: '北京市朝阳区建国路 88 号' },
  { name: '李四', age: 32, address: '上海市浦东新区世纪大道 100 号' },
  { name: '王五', age: 24, address: '广州市天河区体育西路 191 号' },
  { name: '赵六', age: 45, address: '深圳市南山区科技园南路 16 号' },
  { name: '孙七', age: 36, address: '杭州市西湖区文三路 478 号' },
  { name: '周八', age: 29, address: '成都市武侯区天府大道 1700 号' },
  { name: '吴九', age: 41, address: '武汉市江汉区解放大道 690 号' },
  { name: '郑十', age: 33, address: '南京市鼓楼区中山北路 30 号' },
])

const basicCode = `<MTable :data="tableData" style="width: 100%;">
  <MTableColumn prop="name" label="姓名" />
  <MTableColumn prop="age" label="年龄" />
  <MTableColumn prop="address" label="地址" />
</MTable>

<script setup>
const tableData = ref([
  { name: '张三', age: 28, address: '北京市朝阳区' },
  { name: '李四', age: 32, address: '上海市浦东新区' },
  { name: '王五', age: 24, address: '广州市天河区' },
])
<` + `/script>`

const styleCode = `<MTable :data="tableData" stripe border style="width: 100%;">
  <MTableColumn prop="name" label="姓名" />
  <MTableColumn prop="age" label="年龄" />
  <MTableColumn prop="address" label="地址" />
</MTable>`

const sortableCode = `<MTable :data="tableData" style="width: 100%;">
  <MTableColumn prop="name" label="姓名" />
  <MTableColumn prop="age" label="年龄" sortable />
  <MTableColumn prop="address" label="地址" />
</MTable>`

const fixedColumnData = ref([
  { date: '2026-01-01', name: '张三', province: '北京', city: '朝阳区', address: '建国路 88 号', zip: '100022', action: '编辑' },
  { date: '2026-01-02', name: '李四', province: '上海', city: '浦东新区', address: '世纪大道 100 号', zip: '200120', action: '编辑' },
  { date: '2026-01-03', name: '王五', province: '广东', city: '天河区', address: '体育西路 191 号', zip: '510620', action: '编辑' },
])

const selectionData = ref([
  { name: '张三', age: 28, address: '北京市朝阳区', disabled: false },
  { name: '李四', age: 32, address: '上海市浦东新区', disabled: true },
  { name: '王五', age: 24, address: '广州市天河区', disabled: false },
])
const selectionRows = ref<any[]>([])
const selectable = (row: any) => !row.disabled
function handleSelectionChange(val: any[]) {
  selectionRows.value = val
}

const customData = ref([
  { name: '张三', status: 'active', address: '北京市朝阳区' },
  { name: '李四', status: 'inactive', address: '上海市浦东新区' },
  { name: '王五', status: 'active', address: '广州市天河区' },
])
function handleEdit(row: any, index: number) {
  // eslint-disable-next-line no-alert
  alert(`编辑第 ${index + 1} 行：${row.name}`)
}
function handleRemove(row: any, index: number) {
  customData.value.splice(index, 1)
}

const fixedColumnCode = `<MTable :data="data" style="width: 100%;">
  <MTableColumn prop="date" label="日期" width="120" fixed />
  <MTableColumn prop="name" label="姓名" width="120" />
  <MTableColumn prop="province" label="省份" width="120" />
  <MTableColumn prop="city" label="市区" width="120" />
  <MTableColumn prop="address" label="地址" width="300" />
  <MTableColumn prop="zip" label="邮编" width="120" />
  <MTableColumn prop="action" label="操作" width="120" fixed="right" />
</MTable>`

const selectionCode = `<MTable :data="data" @selection-change="handleSelectionChange">
  <MTableColumn type="selection" :selectable="selectable" width="48" />
  <MTableColumn prop="name" label="姓名" />
  <MTableColumn prop="age" label="年龄" />
  <MTableColumn prop="address" label="地址" />
</MTable>

<script setup>
const selectionRows = ref([])
const selectable = (row) => !row.disabled
function handleSelectionChange(val) {
  selectionRows.value = val
}
<` + `/script>`

const customCode = `<MTable :data="data" style="width: 100%;">
  <MTableColumn prop="name" label="姓名" width="120" />
  <MTableColumn prop="status" width="140">
    <template #header>
      <span style="color: var(--mosaic-primary);">状态 ⭐</span>
    </template>
    <template #default="{ row }">
      <MTag :type="row.status === 'active' ? 'success' : 'info'" size="small">
        {{ row.status === 'active' ? '启用' : '禁用' }}
      </MTag>
    </template>
  </MTableColumn>
  <MTableColumn prop="address" label="地址" />
  <MTableColumn label="操作" width="160">
    <template #default="{ row, $index }">
      <MButton size="small" @click="handleEdit(row, $index)">编辑</MButton>
      <MButton size="small" type="danger" plain @click="handleRemove(row, $index)">删除</MButton>
    </template>
  </MTableColumn>
</MTable>`

const overflowCode = `<MTable :data="overflowData" style="width: 100%;">
  <MTableColumn prop="name" label="姓名" width="120" />
  <MTableColumn prop="intro" label="简介" show-overflow-tooltip />
</MTable>

<script setup>
const overflowData = ref([
  { name: '张三', intro: '资深前端工程师，负责团队架构设计与开源组件库维护，长期关注工程化与性能优化。' },
  { name: '李四', intro: '后端开发工程师，专注于高并发分布式系统设计与中间件研发。' },
  { name: '王五', intro: '产品经理，关注用户体验与数据驱动决策。' },
])
<` + `/script>`

const fixedHeaderCode = `<MTable :data="fixedHeaderData" height="240" style="width: 100%;">
  <MTableColumn prop="name" label="姓名" width="120" />
  <MTableColumn prop="age" label="年龄" width="100" />
  <MTableColumn prop="address" label="地址" />
</MTable>

<script setup>
const fixedHeaderData = ref([
  { name: '张三', age: 28, address: '北京市朝阳区建国路 88 号' },
  { name: '李四', age: 32, address: '上海市浦东新区世纪大道 100 号' },
  { name: '王五', age: 24, address: '广州市天河区体育西路 191 号' },
  { name: '赵六', age: 45, address: '深圳市南山区科技园南路 16 号' },
  { name: '孙七', age: 36, address: '杭州市西湖区文三路 478 号' },
  { name: '周八', age: 29, address: '成都市武侯区天府大道 1700 号' },
  { name: '吴九', age: 41, address: '武汉市江汉区解放大道 690 号' },
  { name: '郑十', age: 33, address: '南京市鼓楼区中山北路 30 号' },
])
<` + `/script>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'style', label: '条纹与边框' },
  { id: 'sortable', label: '排序' },
  { id: 'fixed-column', label: '固定列' },
  { id: 'selection', label: '多选' },
  { id: 'custom', label: '自定义列内容' },
  { id: 'overflow', label: '超出省略' },
  { id: 'fixed-header', label: '固定表头' },
  { id: 'api', label: 'API' },
]

const DATA = {
  tableProps: [
    ['data', 'object[]', '—', '表格数据'],
    ['stripe', 'boolean', 'false', '是否为斑马纹表格'],
    ['border', 'boolean', 'false', '是否带有纵向边框'],
    ['height', 'string | number', '—', '表格高度，超出后显示滚动条'],
    ['maxHeight', 'string | number', '—', '表格最大高度'],
    ['rowClassName', 'Function | string', '—', '行 className 的回调'],
    ['defaultSort', 'object', '—', '默认排序，如 { prop: "age", order: "ascending" }'],
  ],
  tableColumnProps: [
    ['type', 'selection | index | expand', '—', '列类型，selection 启用多选'],
    ['prop', 'string', '—', '对应数据字段名'],
    ['label', 'string', '—', '列标题'],
    ['width', 'string', '—', '列宽度'],
    ['minWidth', 'string', '—', '列最小宽度'],
    ['fixed', 'boolean | left | right', 'false', '列是否固定'],
    ['sortable', 'boolean | custom', 'false', '是否可排序，custom 为远程排序'],
    ['align', 'left | center | right', 'left', '对齐方式'],
    ['selectable', 'Function', '—', '仅 type=selection 有效，返回 false 则该行不可勾选'],
    ['showOverflowTooltip', 'boolean', 'false', '内容超出列宽时单行省略，hover 显示完整内容的 tooltip'],
  ],
  tableColumnSlots: [
    ['default', '自定义列内容，scoped slot 接收 { row, column, $index }'],
    ['header', '自定义表头内容，scoped slot 接收 { column, $index }'],
  ],
  events: [
    ['sort-change', '{ column, prop, order }', '排序变化时触发'],
    ['row-click', 'row, column, event', '行被点击时触发'],
    ['selection-change', 'selection', '选择项变化时触发'],
  ],
}
</script>
