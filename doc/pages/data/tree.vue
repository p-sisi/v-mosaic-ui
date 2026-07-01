<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Tree 树形控件</h1>
    <p class="doc-page__desc">用清晰的层级结构展示信息，可展开/折叠，支持复选和懒加载。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MTree</code> 并传入 <code>data</code> 展示树形结构。</p>
        <DemoBlock :code="basicCode">
          <MTree :data="treeData" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="checkbox">
        <h2>复选与手风琴</h2>
        <p class="doc-page__hint">设置 <code>show-checkbox</code> 显示复选框，<code>accordion</code> 手风琴模式只展开一个节点。</p>
        <DemoBlock :code="checkboxCode">
          <MTree :data="treeData" show-checkbox accordion />
        </DemoBlock>
      </div>

      <div class="doc-section" id="lazy">
        <h2>懒加载</h2>
        <p class="doc-page__hint">设置 <code>lazy</code> 启用懒加载，通过 <code>load</code> 回调动态加载子节点。</p>
        <DemoBlock :code="lazyCode">
          <MTree :props="lazyProps" :load="loadNode" lazy />
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

const treeData = ref([
  { label: '一级 1', children: [
    { label: '二级 1-1', children: [{ label: '三级 1-1-1' }] },
  ]},
  { label: '一级 2', children: [
    { label: '二级 2-1' },
    { label: '二级 2-2' },
  ]},
  { label: '一级 3', children: [
    { label: '二级 3-1' },
  ]},
])

const lazyProps = { label: 'name', children: 'zones', isLeaf: 'leaf' }

function loadNode(node: any, resolve: Function) {
  if (node.level === 0) {
    return resolve([{ name: '区域一' }, { name: '区域二' }])
  }
  if (node.level > 2) return resolve([])
  setTimeout(() => {
    resolve([{ name: `子节点 ${node.label}-${node.level}` } as any])
  }, 500)
}

const basicCode = `<MTree :data="treeData" />

<script setup>
const treeData = ref([
  { label: '一级 1', children: [
    { label: '二级 1-1', children: [{ label: '三级 1-1-1' }] },
  ]},
  { label: '一级 2', children: [
    { label: '二级 2-1' },
    { label: '二级 2-2' },
  ]},
  { label: '一级 3', children: [
    { label: '二级 3-1' },
  ]},
])
<` + `/script>`

const checkboxCode = `<MTree :data="treeData" show-checkbox accordion />`

const lazyCode = `<MTree :props="lazyProps" :load="loadNode" lazy />

<script setup>
const lazyProps = { label: 'name', children: 'zones', isLeaf: 'leaf' }
function loadNode(node, resolve) {
  if (node.level === 0) return resolve([{ name: '区域一' }, { name: '区域二' }])
  if (node.level > 2) return resolve([])
  setTimeout(() => {
    resolve([{ name: '子节点' + node.label + '-' + node.level }])
  }, 500)
}
<` + `/script>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'checkbox', label: '复选与手风琴' },
  { id: 'lazy', label: '懒加载' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['data', 'object[]', '—', '树形数据'],
    ['props', 'object', '—', '数据字段映射，如 { label, children, isLeaf }'],
    ['showCheckbox', 'boolean', 'false', '是否显示复选框'],
    ['accordion', 'boolean', 'false', '是否手风琴模式'],
    ['lazy', 'boolean', 'false', '是否懒加载子节点'],
    ['load', 'Function(node, resolve)', '—', '懒加载回调'],
    ['defaultExpandAll', 'boolean', 'false', '是否默认展开所有节点'],
    ['nodeKey', 'string', '—', '节点唯一标识字段'],
  ],
  events: [
    ['node-click', 'node, data, nodeComp', '节点被点击时触发'],
    ['check-change', 'node, checked, indeterminate', '复选框状态变化时触发'],
    ['node-expand', 'node, data, nodeComp', '节点展开时触发'],
    ['node-collapse', 'node, data, nodeComp', '节点收起时触发'],
  ],
}
</script>
