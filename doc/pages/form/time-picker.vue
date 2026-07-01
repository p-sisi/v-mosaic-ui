<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>TimePicker 时间选择器</h1>
    <p class="doc-page__desc">用于选择时间，支持滚轮选择、手动输入、可清空、尺寸与自定义底部快捷操作。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">通过 <code>v-model</code> 绑定字符串值，格式为 <code>HH:mm:ss</code>。点击触发器弹出滚轮选择面板。</p>
        <DemoBlock :code="basicCode">
          <MTimePicker v-model="basicValue" />
          <span class="demo-event-result">当前值：{{ basicValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="clearable">
        <h2>可清空</h2>
        <p class="doc-page__hint">设置 <code>clearable</code> 后，有值时 hover 触发器会出现清除按钮，点击可清空并触发 <code>clear</code> 事件。</p>
        <DemoBlock :code="clearableCode">
          <MTimePicker v-model="clearableValue" clearable @clear="handleClear" />
          <span class="demo-event-result">{{ clearMsg }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 设置尺寸，可选 <code>small</code> / <code>default</code> / <code>large</code>。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group">
            <MTimePicker v-model="sizeValue" size="small" />
          </div>
          <div class="doc-demo-group">
            <MTimePicker v-model="sizeValue" size="default" />
          </div>
          <div class="doc-demo-group">
            <MTimePicker v-model="sizeValue" size="large" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用</h2>
        <p class="doc-page__hint">设置 <code>disabled</code> 禁用时间选择器。</p>
        <DemoBlock :code="disabledCode">
          <MTimePicker v-model="disabledValue" disabled />
        </DemoBlock>
      </div>

      <div class="doc-section" id="footer">
        <h2>自定义底部快捷</h2>
        <p class="doc-page__hint">通过 <code>#footer</code> 插槽自定义面板底部内容，默认渲染"此刻"按钮。</p>
        <DemoBlock :code="footerCode">
          <MTimePicker v-model="footerValue">
            <template #footer>
              <button class="demo-footer-btn" type="button" @click="setMorning">早上 9:00</button>
              <button class="demo-footer-btn" type="button" @click="setNoon">中午 12:00</button>
              <button class="demo-footer-btn" type="button" @click="setNow">此刻</button>
            </template>
          </MTimePicker>
        </DemoBlock>
      </div>

      <div class="doc-section" id="format">
        <h2>自定义格式</h2>
        <p class="doc-page__hint">通过 <code>valueFormat</code> 设置绑定值输出格式，如 <code>HH:mm</code> 仅输出时与分。</p>
        <DemoBlock :code="formatCode">
          <MTimePicker v-model="formatValue" value-format="HH:mm" />
          <span class="demo-event-result">当前值：{{ formatValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="range">
        <h2>时间范围</h2>
        <p class="doc-page__hint">设置 <code>is-range</code> 启用时间范围选择，<code>v-model</code> 绑定 <code>[startTime, endTime]</code> 字符串数组。弹层内两组滚轮并排，分别选择开始与结束。</p>
        <DemoBlock :code="rangeCode">
          <MTimePicker v-model="rangeValue" is-range />
          <span class="demo-event-result">当前值：{{ rangeValue }}</span>
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

const basicValue = ref('')
const clearableValue = ref('09:30:00')
const sizeValue = ref('')
const disabledValue = ref('12:00:00')
const footerValue = ref('')
const formatValue = ref('')
const rangeValue = ref<string[]>([])

const clearMsg = ref('')

function handleClear() {
  clearMsg.value = 'clear 事件已触发'
  setTimeout(() => { clearMsg.value = '' }, 1500)
}

function setMorning() {
  footerValue.value = '09:00:00'
}
function setNoon() {
  footerValue.value = '12:00:00'
}
function setNow() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  footerValue.value = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const basicCode = `<MTimePicker v-model="value" />`

const clearableCode = `<MTimePicker v-model="value" clearable @clear="handleClear" />`

const sizeCode = `<MTimePicker v-model="value" size="small" />
<MTimePicker v-model="value" size="default" />
<MTimePicker v-model="value" size="large" />`

const disabledCode = `<MTimePicker v-model="value" disabled />`

const footerCode = `<MTimePicker v-model="value">
  <template #footer>
    <button @click="setMorning">早上 9:00</button>
    <button @click="setNoon">中午 12:00</button>
    <button @click="setNow">此刻</button>
  </template>
</MTimePicker>`

const formatCode = `<MTimePicker v-model="value" value-format="HH:mm" />`

const rangeCode = `<MTimePicker v-model="value" is-range />
<!-- v-model 为 ['09:00:00', '18:00:00'] 形式 -->`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'clearable', label: '可清空' },
  { id: 'size', label: '尺寸' },
  { id: 'disabled', label: '禁用' },
  { id: 'footer', label: '自定义底部快捷' },
  { id: 'format', label: '自定义格式' },
  { id: 'range', label: '时间范围' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'string', '', '绑定值（v-model），格式为 HH:mm:ss'],
    ['size', 'small | default | large', 'default', '尺寸'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['clearable', 'boolean', 'false', '是否可清空'],
    ['editable', 'boolean', 'true', '输入框是否可手动编辑'],
    ['placeholder', 'string', '请选择时间', '占位文本'],
    ['valueFormat', 'string', '', '输出格式，如 HH:mm'],
    ['placement', 'string', 'bottom-start', '弹出层位置'],
    ['popperClass', 'string', '', '弹出层自定义类名'],
  ],
  events: [
    ['update:modelValue', 'value: string', '值变化时触发'],
    ['change', 'value: string', '值变化时触发'],
    ['focus', 'event', '聚焦时触发'],
    ['blur', 'event', '失焦时触发'],
    ['clear', '—', '点击清除按钮时触发'],
    ['show', '—', '下拉显示时触发'],
    ['hide', '—', '下拉隐藏时触发'],
  ],
  slots: [
    ['footer', '面板底部内容，默认渲染"此刻"按钮'],
  ],
}
</script>

<style scoped lang="scss">
.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}

.demo-footer-btn {
  height: 28px;
  padding: 0 10px;
  border: 1px solid var(--mosaic-border-color);
  background-color: #fff;
  color: var(--mosaic-text-regular);
  border-radius: 4px;
  font-size: var(--mosaic-font-size-sm);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--mosaic-primary);
    color: var(--mosaic-primary);
  }
}
</style>
