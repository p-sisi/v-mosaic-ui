<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>DatePicker 日期选择器</h1>
    <p class="doc-page__desc">用于选择日期或日期时间，点击输入框触发器弹出日期面板，支持日/月/年/周视图、多选与时间选择。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">通过 <code>v-model</code> 绑定日期值。点击输入框弹出日期面板，选择日期后自动关闭。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePicker v-model="basicValue" />
          </div>
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ basicValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="datetime">
        <h2>日期时间</h2>
        <p class="doc-page__hint">设置 <code>type="datetime"</code> 启用时间选择，时间滚轮置于日期右侧，底部有"此刻"快捷按钮。</p>
        <DemoBlock :code="datetimeCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePicker v-model="datetimeValue" type="datetime" />
          </div>
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ datetimeValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="types">
        <h2>选择类型</h2>
        <p class="doc-page__hint">通过 <code>type</code> 切换单选类型：<code>month</code> 月份、<code>year</code> 年份、<code>week</code> 周。</p>
        <DemoBlock :code="monthCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePicker v-model="monthValue" type="month" />
            <span style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ monthValue }}</span>
          </div>
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePicker v-model="yearValue" type="year" />
            <span style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ yearValue }}</span>
          </div>
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePicker v-model="weekValue" type="week" />
            <span style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ weekValue }}</span>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="multi">
        <h2>多选</h2>
        <p class="doc-page__hint">使用复数类型 <code>weeks</code> / <code>months</code> / <code>years</code> 进入多选模式，点击切换选中，可重复选择。</p>

        <h3 style="margin: 16px 0 8px; font-size: 15px;">多选 - 周</h3>
        <DemoBlock :code="weeksCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePicker v-model="weeksValue" type="weeks" clearable />
            <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ weeksValue }}</p>
          </div>
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePicker v-model="monthsValue" type="months" clearable />
            <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ monthsValue }}</p>
          </div>
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePicker v-model="yearsValue" type="years" clearable />
            <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ yearsValue }}</p>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="footer-slot">
        <h2>自定义底部快捷</h2>
        <p class="doc-page__hint">通过 <code>#footer</code> 插槽自定义面板底部的快捷操作（默认为"此刻"按钮）。</p>
        <DemoBlock :code="footerCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePicker v-model="footerValue" type="datetime">
              <template #footer>
                <button class="doc-quick-btn" @click="setQuick('today')">今天</button>
                <button class="doc-quick-btn" @click="setQuick('yesterday')">昨天</button>
                <button class="doc-quick-btn" @click="setQuick('now')">此刻</button>
              </template>
            </MDatePicker>
          </div>
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ footerValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 设置触发器与日期面板尺寸，可选 <code>small</code> / <code>default</code> / <code>large</code>。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group">
            <MDatePicker v-model="sizeValue" size="small" />
          </div>
          <div class="doc-demo-group">
            <MDatePicker v-model="sizeValue" size="default" />
          </div>
          <div class="doc-demo-group">
            <MDatePicker v-model="sizeValue" size="large" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="clearable">
        <h2>可清空</h2>
        <p class="doc-page__hint">设置 <code>clearable</code> 后，hover 到选择器或聚焦时显示清空按钮，点击清除当前日期。</p>
        <DemoBlock :code="clearableCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePicker v-model="clearableValue" clearable />
          </div>
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ clearableValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled-date">
        <h2>禁用日期</h2>
        <p class="doc-page__hint">通过 <code>disabled-date</code> 函数禁用指定日期，返回 <code>true</code> 表示不可选。</p>
        <DemoBlock :code="disabledDateCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePicker v-model="disabledDateValue" :disabled-date="disabledDate" />
          </div>
          <p style="margin-top: 8px; font-size: 13px; color: #666;">已禁用今天之前的日期</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="format">
        <h2>自定义格式</h2>
        <p class="doc-page__hint">通过 <code>format</code> 设置输入框显示格式，<code>value-format</code> 设置绑定值输出格式。</p>
        <DemoBlock :code="formatCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePicker
              v-model="formatValue"
              format="YYYY年MM月DD日"
              value-format="YYYY/MM/DD"
            />
          </div>
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ formatValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用</h2>
        <p class="doc-page__hint">设置 <code>disabled</code> 禁用日期选择器。</p>
        <DemoBlock :code="disabledCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePicker v-model="disabledValue" disabled />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="panel">
        <h2>DatePickerPanel 面板</h2>
        <p class="doc-page__hint">若需要直接使用日期面板（不依赖气泡触发器），可使用 <code>MDatePickerPanel</code> 组件。</p>
        <DemoBlock :code="panelCode">
          <div class="doc-demo-group" style="align-items: flex-start;">
            <MDatePickerPanel v-model="panelValue" type="datetime" />
          </div>
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ panelValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="range">
        <h2>日期范围</h2>
        <p class="doc-page__hint">设置 <code>type="range"</code> 启用日期范围选择，<code>v-model</code> 绑定 <code>[start, end]</code> 字符串数组。弹层内双日历并排，两次点击选择开始与结束，hover 预览区间。</p>
        <DemoBlock :code="rangeCode">
          <MDatePicker v-model="rangeValue" type="range" />
          <p style="margin-top: 8px; font-size: 13px; color: #666;">当前值：{{ rangeValue }}</p>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>DatePicker Props</h3>
    <ApiTable type="prop" :data="DATA.props" />
    <h3>DatePicker Slots</h3>
    <ApiTable type="slot" :data="DATA.slots" />
    <h3>DatePicker Events</h3>
    <ApiTable type="event" :data="DATA.events" />

    <h3>DatePickerPanel Props</h3>
    <ApiTable type="prop" :data="PANEL_DATA.props" />
    <h3>DatePickerPanel Slots</h3>
    <ApiTable type="slot" :data="PANEL_DATA.slots" />
    <h3>DatePickerPanel Events</h3>
    <ApiTable type="event" :data="PANEL_DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicValue = ref('2026-06-15')
const datetimeValue = ref('2026-06-15 12:30:00')
const monthValue = ref('2026-06')
const yearValue = ref('2026')
const weekValue = ref<string[]>(['2026-06-15', '2026-06-21'])
const weeksValue = ref<string[][]>([['2026-06-15', '2026-06-21']])
const monthsValue = ref<string[]>(['2026-06', '2026-07'])
const yearsValue = ref<string[]>(['2026', '2027'])
const footerValue = ref('2026-06-15 12:30:00')
const sizeValue = ref('2026-06-15')
const clearableValue = ref('2026-06-15')
const disabledDateValue = ref('')
const formatValue = ref('2026/06/15')
const disabledValue = ref('2026-06-15')
const panelValue = ref('2026-06-15 12:30:00')
const rangeValue = ref<string[]>([])

function disabledDate(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date.getTime() < today.getTime()
}

function setQuick(type: 'today' | 'yesterday' | 'now') {
  const d = new Date()
  if (type === 'yesterday') d.setDate(d.getDate() - 1)
  if (type !== 'now') d.setHours(0, 0, 0, 0)
  const pad = (n: number) => String(n).padStart(2, '0')
  footerValue.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const basicCode = `<MDatePicker v-model="value" />`

const datetimeCode = `<MDatePicker v-model="value" type="datetime" />`

const monthCode = `<MDatePicker v-model="value" type="month" />`

const yearCode = `<MDatePicker v-model="value" type="year" />`

const weekCode = `<MDatePicker v-model="value" type="week" />`

const weeksCode = `<MDatePicker v-model="value" type="weeks" clearable />`

const monthsCode = `<MDatePicker v-model="value" type="months" clearable />`

const yearsCode = `<MDatePicker v-model="value" type="years" clearable />`

const footerCode = `<MDatePicker v-model="value" type="datetime">
  <template #footer>
    <button @click="setToday">今天</button>
    <button @click="setYesterday">昨天</button>
    <button @click="setNow">此刻</button>
  </template>
</MDatePicker>`

const sizeCode = `<MDatePicker v-model="value" size="small" />
<MDatePicker v-model="value" size="default" />
<MDatePicker v-model="value" size="large" />`

const clearableCode = `<MDatePicker v-model="value" clearable />`

const disabledDateCode = `<MDatePicker
  v-model="value"
  :disabled-date="(date) => date.getTime() < Date.now()"
/>`

const formatCode = `<MDatePicker
  v-model="value"
  format="YYYY年MM月DD日"
  value-format="YYYY/MM/DD"
/>`

const disabledCode = `<MDatePicker v-model="value" disabled />`

const panelCode = `<MDatePickerPanel v-model="value" type="datetime" />`

const rangeCode = `<MDatePicker v-model="value" type="range" />
<!-- v-model 为 ['2026-01-01', '2026-01-31'] 形式 -->`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'datetime', label: '日期时间' },
  { id: 'types', label: '选择类型' },
  { id: 'multi', label: '多选' },
  { id: 'footer-slot', label: '自定义底部快捷' },
  { id: 'size', label: '尺寸' },
  { id: 'clearable', label: '可清空' },
  { id: 'disabled-date', label: '禁用日期' },
  { id: 'format', label: '自定义格式' },
  { id: 'disabled', label: '禁用' },
  { id: 'panel', label: 'DatePickerPanel' },
  { id: 'range', label: '日期范围' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'string | Date | string[] | string[][]', '—', '绑定值（v-model，周/多选类型为数组）'],
    ['type', 'date | datetime | month | year | week | weeks | months | years', 'date', '选择类型（复数类型为多选）'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['size', 'small | default | large', 'default', '触发器与面板尺寸'],
    ['clearable', 'boolean', 'false', '是否显示清空按钮（hover 或聚焦时出现）'],
    ['editable', 'boolean', 'true', '输入框是否可手动编辑'],
    ['placeholder', 'string', '请选择日期', '占位提示文本'],
    ['format', 'string', '—', '输入框显示格式（YYYY/MM/DD/HH/mm/ss）'],
    ['valueFormat', 'string', '—', '绑定值输出格式'],
    ['disabledDate', '(date: Date) => boolean', '—', '禁用日期函数'],
    ['firstDayOfWeek', 'number', '1', '周起始日（1=周一，7=周日）'],
    ['placement', 'string', 'bottom-start', '弹出层位置'],
    ['popperClass', 'string', '—', '弹出层自定义类名'],
  ],
  slots: [
    ['footer', '—', '自定义面板底部快捷操作内容（默认为"此刻"按钮）'],
  ],
  events: [
    ['change', 'value', '值变化时触发'],
    ['focus', 'event', '输入框获焦时触发'],
    ['blur', 'event', '输入框失焦时触发'],
    ['show', '—', '弹出层显示时触发'],
    ['hide', '—', '弹出层隐藏时触发'],
    ['clear', '—', '点击清空按钮时触发'],
  ],
}

const PANEL_DATA = {
  props: [
    ['modelValue', 'string | Date | string[] | string[][]', '—', '绑定值（v-model，周/多选类型为数组）'],
    ['type', 'date | datetime | month | year | week | weeks | months | years', 'date', '选择类型（复数类型为多选）'],
    ['size', 'small | default | large', 'default', '面板尺寸'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['disabledDate', '(date: Date) => boolean', '—', '禁用日期函数'],
    ['firstDayOfWeek', 'number', '1', '周起始日（1=周一，7=周日）'],
    ['valueFormat', 'string', '—', '输出格式'],
  ],
  slots: [
    ['footer', '—', '自定义面板底部快捷操作内容（默认为"此刻"按钮）'],
  ],
  events: [
    ['change', 'value', '值变化时触发'],
    ['select', 'value', '选择日期/月份/年份/周时触发'],
  ],
}
</script>

<style scoped>
.doc-quick-btn {
  height: 28px;
  padding: 0 10px;
  border: 1px solid var(--mosaic-border-color);
  background: #fff;
  color: var(--mosaic-text-regular);
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.doc-quick-btn:hover {
  border-color: var(--mosaic-primary);
  color: var(--mosaic-primary);
}
</style>
