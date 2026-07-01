<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Radio 单选框</h1>
    <p class="doc-page__desc">在一组备选项中进行单选，包含 MRadio、MRadioGroup 和 MRadioButton 三个组件。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">单独使用时通过 <code>v-model</code> 绑定选中值，<code>label</code> 为必填属性。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group">
            <MRadio v-model="radioValue" label="1">选项一</MRadio>
            <MRadio v-model="radioValue" label="2">选项二</MRadio>
            <MRadio v-model="radioValue" label="3">选项三</MRadio>
          </div>
          <span class="demo-event-result">选中: {{ radioValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="group">
        <h2>单选框组</h2>
        <p class="doc-page__hint">MRadioGroup 配合 MRadio 使用，<code>v-model</code> 绑定选中项 label。</p>
        <DemoBlock :code="groupCode">
          <MRadioGroup v-model="groupValue">
            <MRadio label="Vue">Vue</MRadio>
            <MRadio label="React">React</MRadio>
            <MRadio label="Angular">Angular</MRadio>
          </MRadioGroup>
        </DemoBlock>
      </div>

      <div class="doc-section" id="vertical">
        <h2>垂直排列</h2>
        <p class="doc-page__hint">设置 <code>vertical</code> 属性使选项垂直排列。</p>
        <DemoBlock :code="verticalCode">
          <MRadioGroup v-model="verticalValue" vertical>
            <MRadio label="x">垂直选项一</MRadio>
            <MRadio label="y">垂直选项二</MRadio>
            <MRadio label="z">垂直选项三</MRadio>
          </MRadioGroup>
        </DemoBlock>
      </div>

      <div class="doc-section" id="border">
        <h2>边框样式</h2>
        <p class="doc-page__hint">设置 <code>border</code> 属性显示边框。</p>
        <DemoBlock :code="borderCode">
          <MRadioGroup v-model="borderGroupValue">
            <MRadio label="A" border>选项 A</MRadio>
            <MRadio label="B" border>选项 B</MRadio>
          </MRadioGroup>
        </DemoBlock>
      </div>

      <div class="doc-section" id="button-style">
        <h2>按钮样式</h2>
        <p class="doc-page__hint">在 MRadioGroup 中使用 MRadioButton，呈现按钮组风格。</p>
        <DemoBlock :code="buttonCode">
          <MRadioGroup v-model="btnGroupValue">
            <MRadioButton label="A">A</MRadioButton>
            <MRadioButton label="B">B</MRadioButton>
            <MRadioButton label="C">C</MRadioButton>
          </MRadioGroup>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 属性设置尺寸（<code>small</code> / <code>default</code> / <code>large</code>），MRadioGroup、MRadio、MRadioButton 均支持。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group">
            <MRadioGroup v-model="sizeValue" size="small">
              <MRadio label="A">小号</MRadio>
              <MRadio label="B">B</MRadio>
            </MRadioGroup>
          </div>
          <div class="doc-demo-group">
            <MRadioGroup v-model="sizeValue">
              <MRadio label="A">默认</MRadio>
              <MRadio label="B">B</MRadio>
            </MRadioGroup>
          </div>
          <div class="doc-demo-group">
            <MRadioGroup v-model="sizeValue" size="large">
              <MRadio label="A">大号</MRadio>
              <MRadio label="B">B</MRadio>
            </MRadioGroup>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用状态</h2>
        <p class="doc-page__hint">设置 <code>disabled</code> 禁用单选框，MRadioGroup 设置后禁用整组。</p>
        <DemoBlock :code="disabledCode">
          <div class="doc-demo-group">
            <MRadio v-model="disabledValue" label="1" disabled>禁用</MRadio>
            <MRadio v-model="disabledValue" label="2">可用</MRadio>
          </div>
          <div class="doc-demo-group">
            <MRadioGroup v-model="disabledGroupValue" disabled>
              <MRadio label="A">A</MRadio>
              <MRadio label="B">B</MRadio>
            </MRadioGroup>
          </div>
          <div class="doc-demo-group">
            <MRadioGroup v-model="disabledBtnValue" disabled>
              <MRadioButton label="A">A</MRadioButton>
              <MRadioButton label="B">B</MRadioButton>
            </MRadioGroup>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="color">
        <h2>选中颜色</h2>
        <p class="doc-page__hint">通过 <code>color</code> 属性自定义选中时的颜色，MRadioGroup、MRadio、MRadioButton 均支持。</p>
        <DemoBlock :code="colorCode">
          <div class="doc-demo-group">
            <MRadioGroup v-model="colorValue" color="#67c23a">
              <MRadio label="A">绿色</MRadio>
              <MRadio label="B">B</MRadio>
            </MRadioGroup>
          </div>
          <div class="doc-demo-group">
            <MRadioGroup v-model="colorValue2" color="#f56c6c">
              <MRadio label="A" border>红色边框</MRadio>
              <MRadio label="B" border>B</MRadio>
            </MRadioGroup>
          </div>
          <div class="doc-demo-group">
            <MRadioGroup v-model="colorValue3" color="#e6a23c">
              <MRadioButton label="A">橙色按钮</MRadioButton>
              <MRadioButton label="B">B</MRadioButton>
            </MRadioGroup>
          </div>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MRadio Props</h3>
    <ApiTable type="prop" :data="DATA.radioProps" />

    <h3>MRadioGroup Props</h3>
    <ApiTable type="prop" :data="DATA.groupProps" />

    <h3>MRadioButton Props</h3>
    <ApiTable type="prop" :data="DATA.buttonProps" />

    <h3>Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const radioValue = ref('1')
const groupValue = ref('Vue')
const borderGroupValue = ref('A')
const verticalValue = ref('x')
const btnGroupValue = ref('A')
const sizeValue = ref('A')
const disabledValue = ref('1')
const disabledGroupValue = ref('A')
const disabledBtnValue = ref('A')
const colorValue = ref('A')
const colorValue2 = ref('A')
const colorValue3 = ref('A')

const basicCode = `<MRadio v-model="radioValue" label="1">选项一</MRadio>
<MRadio v-model="radioValue" label="2">选项二</MRadio>
<MRadio v-model="radioValue" label="3">选项三</MRadio>

<script setup>
const radioValue = ref('1')
<` + `/script>`

const groupCode = `<MRadioGroup v-model="groupValue">
  <MRadio label="Vue">Vue</MRadio>
  <MRadio label="React">React</MRadio>
  <MRadio label="Angular">Angular</MRadio>
</MRadioGroup>`

const verticalCode = `<MRadioGroup v-model="verticalValue" vertical>
  <MRadio label="x">垂直选项一</MRadio>
  <MRadio label="y">垂直选项二</MRadio>
  <MRadio label="z">垂直选项三</MRadio>
</MRadioGroup>`

const borderCode = `<MRadioGroup v-model="borderGroupValue">
  <MRadio label="A" border>选项 A</MRadio>
  <MRadio label="B" border>选项 B</MRadio>
</MRadioGroup>`

const buttonCode = `<MRadioGroup v-model="btnGroupValue">
  <MRadioButton label="A">A</MRadioButton>
  <MRadioButton label="B">B</MRadioButton>
  <MRadioButton label="C">C</MRadioButton>
</MRadioGroup>`

const sizeCode = `<MRadioGroup v-model="sizeValue" size="small">
  <MRadio label="A">小号</MRadio>
  <MRadio label="B">B</MRadio>
</MRadioGroup>
<MRadioGroup v-model="sizeValue">
  <MRadio label="A">默认</MRadio>
  <MRadio label="B">B</MRadio>
</MRadioGroup>
<MRadioGroup v-model="sizeValue" size="large">
  <MRadio label="A">大号</MRadio>
  <MRadio label="B">B</MRadio>
</MRadioGroup>`

const disabledCode = `<!-- 单个禁用 -->
<MRadio v-model="val" label="1" disabled>禁用</MRadio>
<MRadio v-model="val" label="2">可用</MRadio>

<!-- 整组禁用 -->
<MRadioGroup v-model="groupVal" disabled>
  <MRadio label="A">A</MRadio>
  <MRadio label="B">B</MRadio>
</MRadioGroup>

<!-- 按钮组禁用 -->
<MRadioGroup v-model="btnVal" disabled>
  <MRadioButton label="A">A</MRadioButton>
  <MRadioButton label="B">B</MRadioButton>
</MRadioGroup>`

const colorCode = `<!-- 绿色 -->
<MRadioGroup v-model="val1" color="#67c23a">
  <MRadio label="A">绿色</MRadio>
  <MRadio label="B">B</MRadio>
</MRadioGroup>

<!-- 红色边框 -->
<MRadioGroup v-model="val2" color="#f56c6c">
  <MRadio label="A" border>红色边框</MRadio>
  <MRadio label="B" border>B</MRadio>
</MRadioGroup>

<!-- 橙色按钮 -->
<MRadioGroup v-model="val3" color="#e6a23c">
  <MRadioButton label="A">橙色按钮</MRadioButton>
  <MRadioButton label="B">B</MRadioButton>
</MRadioGroup>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'group', label: '单选框组' },
  { id: 'vertical', label: '垂直排列' },
  { id: 'border', label: '边框样式' },
  { id: 'button-style', label: '按钮样式' },
  { id: 'size', label: '尺寸' },
  { id: 'disabled', label: '禁用状态' },
  { id: 'color', label: '选中颜色' },
  { id: 'api', label: 'API' },
]

const DATA = {
  radioProps: [
    ['modelValue', 'string | number | boolean', '—', '绑定值（v-model）'],
    ['label', 'string | number | boolean', '—', '单选框的值，必填'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['border', 'boolean', 'false', '是否显示边框'],
    ['size', 'small | default | large', 'default', '尺寸'],
    ['name', 'string', '—', '原生 name 属性'],
    ['color', 'string', '—', '选中时的颜色'],
  ],
  groupProps: [
    ['modelValue', 'string | number | boolean', '—', '绑定值，选中项的 label'],
    ['disabled', 'boolean', 'false', '是否禁用所有单选框'],
    ['size', 'small | default | large', 'default', '单选框组尺寸'],
    ['vertical', 'boolean', 'false', '是否垂直排列'],
    ['fill', 'string', '#a78bfa', '选中按钮类型的填充色'],
    ['textColor', 'string', '#fff', '选中按钮类型的文字颜色'],
    ['color', 'string', '—', '选中时的颜色'],
  ],
  buttonProps: [
    ['label', 'string | number | boolean', '—', '单选按钮的值，必填'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['size', 'small | default | large', 'default', '单选按钮尺寸'],
    ['name', 'string', '—', '原生 name 属性'],
    ['color', 'string', '—', '选中时的颜色'],
  ],
  events: [
    ['change', 'value', '选中项变更时触发（MRadio / MRadioGroup / MRadioButton 均支持）'],
  ],
}
</script>

<style scoped lang="scss">
.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}
</style>
