<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Tag 标签</h1>
    <p class="doc-page__desc">用于标记和分类，支持多种类型、尺寸、风格和可关闭。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>type</code> 属性设置标签颜色风格。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group">
            <MTag>默认</MTag>
            <MTag type="primary">主要</MTag>
            <MTag type="success">成功</MTag>
            <MTag type="warning">警告</MTag>
            <MTag type="danger">危险</MTag>
            <MTag type="info">信息</MTag>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="closable">
        <h2>可关闭</h2>
        <p class="doc-page__hint">设置 <code>closable</code> 属性使标签可关闭，点击关闭按钮后标签带动画消失。</p>
        <DemoBlock :code="closableCode">
          <div class="doc-demo-group">
            <MTag
              v-for="tag in closeTags"
              :key="tag"
              closable
              @close="removeCloseTag(tag)"
            >
              {{ tag }}
            </MTag>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>不同尺寸</h2>
        <p class="doc-page__hint"><code>size</code> 属性设置尺寸。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group">
            <MTag size="small">小号</MTag>
            <MTag>默认</MTag>
            <MTag size="large">大号</MTag>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom-color">
        <h2>自定义颜色</h2>
        <p class="doc-page__hint">使用 <code>color</code> 属性自定义标签颜色。</p>
        <DemoBlock :code="customColorCode">
          <div class="doc-demo-group">
            <MTag color="#72034e" effect="dark">这个颜色好丑</MTag>
            <MTag color="#72034e" effect="light">这样看其实还好</MTag>
            <MTag color="#72034e" effect="plain">这样就更好了</MTag>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="editable">
        <h2>输入式标签</h2>
        <p class="doc-page__hint">设置 <code>editable</code> 属性显示输入式标签，输入内容后按回车键添加新标签。</p>
        <DemoBlock :code="editableCode">
          <div class="doc-demo-group">
            <MTag
              v-for="tag in dynamicTags"
              :key="tag"
              closable
              @close="removeDynamicTag(tag)"
            >
              {{ tag }}
            </MTag>
            <MTag editable placeholder="+ 添加标签" @confirm="addDynamicTag" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="effect">
        <h2>不同风格</h2>
        <p class="doc-page__hint"><code>effect</code> 属性设置标签风格：dark（深色）、light（浅色）、plain（朴素）。设置 <code>no-border</code> 属性去除描边，可与三种风格共用。</p>
        <DemoBlock :code="effectCode">
          <div class="doc-demo-group">
            <MTag effect="dark">Dark 默认</MTag>
            <MTag type="primary" effect="dark">Dark 主要</MTag>
            <MTag type="success" effect="dark">Dark 成功</MTag>
          </div>
          <div class="doc-demo-group">
            <MTag type="primary" effect="light">light 主要</MTag>
            <MTag type="success" effect="light">light 成功</MTag>
            <MTag type="danger" effect="light">light 危险</MTag>
          </div>
          <div class="doc-demo-group">
            <MTag type="primary" effect="plain">Plain 主要</MTag>
            <MTag type="success" effect="plain">Plain 成功</MTag>
            <MTag type="danger" effect="plain">Plain 危险</MTag>
          </div>
          <div class="doc-demo-group">
            <MTag type="primary" no-border>无描边 light</MTag>
            <MTag type="primary" effect="dark" no-border>无描边 dark</MTag>
            <MTag type="primary" effect="plain" no-border>无描边 plain</MTag>
          </div>
          <div class="doc-demo-group">
            <MTag type="primary" round>圆角</MTag>
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
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const closeTags = ref(['可关闭', '主要', '危险'])

function removeCloseTag(tag: string) {
  closeTags.value = closeTags.value.filter(t => t !== tag)
}

const dynamicTags = ref(['标签一', '标签二', '标签三'])

function removeDynamicTag(tag: string) {
  dynamicTags.value = dynamicTags.value.filter(t => t !== tag)
}

function addDynamicTag(value: string) {
  if (dynamicTags.value.includes(value)) return
  dynamicTags.value.push(value)
}

const basicCode = `<MTag>默认</MTag>
<MTag type="primary">主要</MTag>
<MTag type="success">成功</MTag>
<MTag type="warning">警告</MTag>
<MTag type="danger">危险</MTag>
<MTag type="info">信息</MTag>`

const closableCode = `<MTag
  v-for="tag in tags"
  :key="tag"
  closable
  @close="tags = tags.filter(t => t !== tag)"
>
  {{ tag }}
</MTag>`

const editableCode = `<MTag
  v-for="tag in dynamicTags"
  :key="tag"
  closable
  @close="removeDynamicTag(tag)"
>
  {{ tag }}
</MTag>
<MTag editable placeholder="+ 添加标签" @confirm="addDynamicTag" />

<!-- 父组件处理逻辑 -->
<script setup>
const dynamicTags = ref(['标签一', '标签二', '标签三'])

function removeDynamicTag(tag) {
  dynamicTags.value = dynamicTags.value.filter(t => t !== tag)
}

function addDynamicTag(value) {
  if (dynamicTags.value.includes(value)) return
  dynamicTags.value.push(value)
}
<\/script>`

const sizeCode = `<MTag size="small">小号</MTag>
<MTag>默认</MTag>
<MTag size="large">大号</MTag>`

const effectCode = `<MTag effect="dark">Dark 默认</MTag>
<MTag type="primary" effect="dark">Dark 主要</MTag>
<MTag type="success" effect="dark">Dark 成功</MTag>

<MTag type="primary" effect="light">light 主要</MTag>
<MTag type="success" effect="light">light 成功</MTag>
<MTag type="danger" effect="light">light 危险</MTag>

<MTag type="primary" effect="plain">Plain 主要</MTag>
<MTag type="success" effect="plain">Plain 成功</MTag>
<MTag type="danger" effect="plain">Plain 危险</MTag>

<!-- 无描边，可与 dark/light/plain 共用 -->
<MTag type="primary" no-border>无描边 light</MTag>
<MTag type="primary" effect="dark" no-border>无描边 dark</MTag>
<MTag type="primary" effect="plain" no-border>无描边 plain</MTag>`

const customColorCode = `<MTag color="#429fff" effect="dark">自定义深色</MTag>
<MTag color="#429fff" effect="light">自定义浅色</MTag>
<MTag color="#429fff" effect="plain">自定义朴素</MTag>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'closable', label: '可关闭' },
  { id: 'size', label: '不同尺寸' },
  { id: 'custom-color', label: '自定义颜色' },
  { id: 'editable', label: '输入式标签' },
  { id: 'effect', label: '不同风格' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['type', 'default | primary | success | warning | danger | info', 'default', '标签类型'],
    ['closable', 'boolean', 'false', '是否可关闭，关闭后标签带动画消失'],
    ['disableTransitions', 'boolean', 'false', '是否禁用过渡动画'],
    ['noBorder', 'boolean', 'false', '是否无描边，可与 dark/light/plain 共用'],
    ['color', 'string', "''", '自定义标签颜色'],
    ['size', 'small | default | large', 'default', '标签尺寸'],
    ['effect', 'dark | light | plain', 'light', '标签风格'],
    ['round', 'boolean', 'false', '是否为圆角样式（左右两端全圆角）'],
    ['editable', 'boolean', 'false', '是否为输入式标签'],
    ['placeholder', 'string', "'新标签'", '输入式标签的占位文本'],
  ],
  events: [
    ['close', '—', '标签关闭事件'],
    ['click', 'MouseEvent', '标签点击事件'],
    ['confirm', 'string', '输入式标签确认事件，回车或失焦时触发，返回输入值'],
  ],
  slots: [
    ['default', '标签内容'],
  ],
}
</script>