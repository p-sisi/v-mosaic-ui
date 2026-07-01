<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>ColorPicker 颜色选择器</h1>
    <p class="doc-page__desc">用于颜色选择，点击触发器弹出颜色面板，支持 HSV 选色、透明度、预设色等。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">通过 <code>v-model</code> 绑定颜色值。点击色块触发器打开颜色面板。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MColorPicker v-model="basicValue" />
          </div>
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ basicValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="show-alpha">
        <h2>透明度</h2>
        <p class="doc-page__hint">设置 <code>show-alpha</code> 启用透明度滑块，输出 rgba 格式，触发器色块以棋盘格展示透明度。</p>
        <DemoBlock :code="showAlphaCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MColorPicker v-model="alphaValue" show-alpha />
          </div>
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ alphaValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="predefine">
        <h2>预设颜色</h2>
        <p class="doc-page__hint">通过 <code>predefine</code> 传入预设颜色数组，点击可快速选择。</p>
        <DemoBlock :code="predefineCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MColorPicker v-model="predefineValue" :predefine="predefineColors" />
          </div>
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ predefineValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 设置触发器尺寸，可选 <code>small</code> / <code>default</code> / <code>large</code>。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group" style="align-items: center;">
            <MColorPicker v-model="sizeValue" size="small" />
            <MColorPicker v-model="sizeValue" size="default" />
            <MColorPicker v-model="sizeValue" size="large" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="clearable">
        <h2>可清空</h2>
        <p class="doc-page__hint">设置 <code>clearable</code> 显示清空按钮，点击清除当前颜色。</p>
        <DemoBlock :code="clearableCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MColorPicker v-model="clearableValue" clearable />
          </div>
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ clearableValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用</h2>
        <p class="doc-page__hint">设置 <code>disabled</code> 禁用颜色选择器。</p>
        <DemoBlock :code="disabledCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MColorPicker v-model="disabledValue" disabled />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="all">
        <h2>完整功能</h2>
        <p class="doc-page__hint">同时启用 <code>show-alpha</code> 与 <code>predefine</code>。</p>
        <DemoBlock :code="allCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MColorPicker
              v-model="allValue"
              show-alpha
              :predefine="predefineColors"
              clearable
            />
          </div>
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ allValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="panel">
        <h2>ColorPickerPanel 面板</h2>
        <p class="doc-page__hint">若需要直接使用颜色面板（不依赖气泡触发器），可使用 <code>MColorPickerPanel</code> 组件。</p>
        <DemoBlock :code="panelCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MColorPickerPanel v-model="panelValue" show-alpha :predefine="predefineColors" />
          </div>
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ panelValue }}</p>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>ColorPicker Props</h3>
    <ApiTable type="prop" :data="DATA.props" />
    <h3>ColorPicker Events</h3>
    <ApiTable type="event" :data="DATA.events" />

    <h3>ColorPickerPanel Props</h3>
    <ApiTable type="prop" :data="PANEL_DATA.props" />
    <h3>ColorPickerPanel Events</h3>
    <ApiTable type="event" :data="PANEL_DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicValue = ref('#a78bfa')
const alphaValue = ref('rgba(167, 139, 250, 0.5)')
const predefineValue = ref('#ff0000')
const sizeValue = ref('#1e90ff')
const clearableValue = ref('#90ee90')
const disabledValue = ref('#a78bfa')
const allValue = ref('rgba(255, 0, 0, 0.5)')
const panelValue = ref('#a78bfa')

const predefineColors = [
  '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1',
  '#1e90ff', '#c71585', '#ff450080', '#ff8c0080',
  '#000000', '#666666', '#999999', '#cccccc', '#ffffff',
]

const basicCode = `<MColorPicker v-model="value" />`

const showAlphaCode = `<MColorPicker v-model="value" show-alpha />`

const predefineCode = `<MColorPicker
  v-model="value"
  :predefine="['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1']"
/>`

const sizeCode = `<MColorPicker v-model="value" size="small" />
<MColorPicker v-model="value" size="default" />
<MColorPicker v-model="value" size="large" />`

const clearableCode = `<MColorPicker v-model="value" clearable />`

const disabledCode = `<MColorPicker v-model="value" disabled />`

const allCode = `<MColorPicker
  v-model="value"
  show-alpha
  :predefine="['#ff4500', '#ff8c00', '#ffd700', '#90ee90']"
  clearable
/>`

const panelCode = `<MColorPickerPanel v-model="value" show-alpha :predefine="predefineColors" />`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'show-alpha', label: '透明度' },
  { id: 'predefine', label: '预设颜色' },
  { id: 'size', label: '尺寸' },
  { id: 'clearable', label: '可清空' },
  { id: 'disabled', label: '禁用' },
  { id: 'all', label: '完整功能' },
  { id: 'panel', label: 'ColorPickerPanel' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'string', '—', '绑定值，hex 或 rgba 字符串（v-model）'],
    ['showAlpha', 'boolean', 'false', '是否显示透明度滑块'],
    ['predefine', 'string[]', '[]', '预设颜色数组'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['colorFormat', 'hex | rgb', 'hex', '输出格式（show-alpha 时始终输出 rgba）'],
    ['size', 'small | default | large', 'default', '触发器尺寸'],
    ['clearable', 'boolean', 'false', '是否显示清空按钮'],
    ['placement', 'string', 'bottom-start', '弹出层位置'],
    ['popperClass', 'string', '—', '弹出层自定义类名'],
  ],
  events: [
    ['change', 'value', '颜色变化时触发'],
    ['activeChange', 'value', '面板提交输入或点击预设色时触发'],
    ['show', '—', '弹出层显示时触发'],
    ['hide', '—', '弹出层隐藏时触发'],
    ['clear', '—', '点击清空按钮时触发'],
  ],
}

const PANEL_DATA = {
  props: [
    ['modelValue', 'string', '—', '绑定值，hex 或 rgba 字符串（v-model）'],
    ['showAlpha', 'boolean', 'false', '是否显示透明度滑块'],
    ['predefine', 'string[]', '[]', '预设颜色数组'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['colorFormat', 'hex | rgb', 'hex', '输出格式（show-alpha 时始终输出 rgba）'],
  ],
  events: [
    ['change', 'value', '颜色变化时触发'],
    ['activeChange', 'value', '输入框提交或点击预设色时触发'],
  ],
}
</script>
