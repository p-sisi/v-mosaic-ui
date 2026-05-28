<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Input 输入框</h1>
    <p class="doc-page__desc">通过鼠标或键盘输入内容，支持 v-model 双向绑定、多种尺寸和状态。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>v-model</code> 绑定输入值。</p>
        <DemoBlock code='<MInput v-model="inputValue" placeholder="请输入内容" />'>
          <MInput v-model="inputValue" placeholder="请输入内容" />
          <span class="demo-event-result">值: {{ inputValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="clearable">
        <h2>可清除</h2>
        <p class="doc-page__hint">设置 <code>clearable</code> 属性，输入框右侧出现清除按钮，点击可一键清空内容并触发 <code>clear</code> 事件。</p>
        <DemoBlock code='<MInput v-model="clearableValue" placeholder="可清除" clearable
  @clear="handleClear" />'>
          <MInput v-model="clearableValue" placeholder="可清除" clearable @clear="handleClear" />
          <span class="demo-event-result">{{ clearMsg }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 属性设置预设大小，也可通过 <code>width</code> 自定义宽度。</p>
        <DemoBlock code='<MInput placeholder="Small" size="small" />
<MInput placeholder="Default" />
<MInput placeholder="Large" size="large" />

<!-- 自定义宽度 -->
<MInput placeholder="宽度 100%" width="100%" />
<MInput placeholder="宽度 200px" width="200px" />'>
          <div class="demo-size-group">
            <div class="demo-size-row">
              <MInput placeholder="Small" size="small" />
              <MInput placeholder="Default" />
              <MInput placeholder="Large" size="large" />
            </div>
            <div class="demo-size-row">
              <MInput placeholder="宽度 100%" width="100%" />
              <MInput placeholder="宽度 200px" width="200px" />
            </div>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用状态</h2>
        <p class="doc-page__hint">设置 <code>disabled</code> 属性禁用输入框。</p>
        <DemoBlock code='<MInput placeholder="禁用状态" disabled />'>
          <MInput placeholder="禁用状态" disabled />
        </DemoBlock>
      </div>

      <div class="doc-section" id="event-focus-blur">
        <h2>聚焦与失焦</h2>
        <p class="doc-page__hint">通过 <code>@focus</code> 和 <code>@blur</code> 监听输入框的聚焦和失焦事件。</p>
        <DemoBlock :code="focusBlurCode">
          <MInput placeholder="试试聚焦和失焦" @focus="handleFocus" @blur="handleBlur" />
          <span class="demo-event-result">{{ focusMsg }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="event-input-change">
        <h2>输入与变更</h2>
        <p class="doc-page__hint"><code>@input</code> 在每次输入时触发，<code>@change</code> 在值变更并失焦后触发。</p>
        <DemoBlock :code="inputChangeCode">
          <MInput v-model="eventValue" placeholder="输入内容" @input="handleInput" @change="handleChange" />
          <span class="demo-event-result">input: {{ inputCount }} 次 | change: {{ changeCount }} 次</span>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <table class="doc-table">
      <thead>
        <tr><th>属性</th><th>类型</th><th>默认值</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>modelValue</td><td>string | number</td><td>''</td><td>绑定值（v-model）</td></tr>
        <tr><td>type</td><td>'text' | 'password' | 'number' | 'email' | 'tel' | 'url'</td><td>'text'</td><td>输入框类型</td></tr>
        <tr><td>size</td><td>'small' | 'default' | 'large'</td><td>'default'</td><td>输入框预设尺寸</td></tr>
        <tr><td>width</td><td>string</td><td>—</td><td>自定义宽度，如 "100%"、"200px"</td></tr>
        <tr><td>placeholder</td><td>string</td><td>''</td><td>占位文本</td></tr>
        <tr><td>disabled</td><td>boolean</td><td>false</td><td>是否禁用</td></tr>
        <tr><td>clearable</td><td>boolean</td><td>false</td><td>是否可清除</td></tr>
        <tr><td>maxlength</td><td>number</td><td>—</td><td>最大输入长度</td></tr>
      </tbody>
    </table>

    <h3>Events</h3>
    <table class="doc-table">
      <thead>
        <tr><th>事件</th><th>参数</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>update:modelValue</td><td>string | number</td><td>输入值变化时触发，用于 v-model 双向绑定</td></tr>
        <tr><td>input</td><td>string | number</td><td>每次输入时触发</td></tr>
        <tr><td>change</td><td>string | number</td><td>值变更并失焦后触发</td></tr>
        <tr><td>focus</td><td>FocusEvent</td><td>输入框聚焦时触发</td></tr>
        <tr><td>blur</td><td>FocusEvent</td><td>输入框失焦时触发</td></tr>
        <tr><td>clear</td><td>—</td><td>点击清除按钮时触发</td></tr>
      </tbody>
    </table>

    <h3>Slots</h3>
    <table class="doc-table">
      <thead>
        <tr><th>插槽</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>—</td><td>MInput 暂无自定义插槽</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'

// 基础用法示例
const inputValue = ref('')

// 可清除示例
const clearableValue = ref('可清除的内容')
const clearMsg = ref('')  // 清除事件的提示信息
function handleClear() {
  clearMsg.value = 'clear 事件已触发'
  setTimeout(() => { clearMsg.value = '' }, 1500)
}

// 聚焦/失焦示例
const focusMsg = ref('等待操作...')
function handleFocus() {
  focusMsg.value = '输入框已聚焦'
}
function handleBlur() {
  focusMsg.value = '输入框已失焦'
}

// input/change 事件示例
const eventValue = ref('')
const inputCount = ref(0)   // input 事件触发计数
const changeCount = ref(0)  // change 事件触发计数
function handleInput() { inputCount.value++ }
function handleChange() { changeCount.value++ }

// 事件示例的代码文本（含 <script> 标签，需通过变量绑定避免模板解析冲突）
const focusBlurCode = `<MInput placeholder="试试聚焦和失焦"
  @focus="handleFocus"
  @blur="handleBlur" />
<p>{{ focusMsg }}</p>

<script setup>
const focusMsg = ref('等待操作...')
function handleFocus(e) {
  focusMsg = '输入框已聚焦'
}
function handleBlur(e) {
  focusMsg = '输入框已失焦'
}
<` + `/script>`

const inputChangeCode = `<MInput v-model="eventValue" placeholder="输入内容"
  @input="handleInput"
  @change="handleChange" />
<p>input 事件触发次数: {{ inputCount }}</p>
<p>change 事件触发次数: {{ changeCount }}</p>

<script setup>
const eventValue = ref('')
const inputCount = ref(0)
const changeCount = ref(0)
function handleInput(v) { inputCount++ }
function handleChange(v) { changeCount++ }
<` + `/script>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'clearable', label: '可清除' },
  { id: 'size', label: '尺寸' },
  { id: 'disabled', label: '禁用状态' },
  { id: 'event-focus-blur', label: '聚焦与失焦' },
  { id: 'event-input-change', label: '输入与变更' },
  { id: 'api', label: 'API' },
]
</script>

<style>
.demo-block__preview .m-input {
  max-width: 240px;
}

.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}

.demo-size-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-size-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
</style>