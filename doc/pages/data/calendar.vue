<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Calendar 日历</h1>
    <p class="doc-page__desc">按照日历形式展示数据或日期，支持自定义起始星期。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MCalendar</code> 展示日历，通过 <code>v-model</code> 绑定当前日期。</p>
        <DemoBlock :code="basicCode">
          <MCalendar v-model="currentDate" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="first-day">
        <h2>自定义起始日</h2>
        <p class="doc-page__hint">通过 <code>first-day-of-week</code> 设置每周起始日，0 为周日，1 为周一。</p>
        <DemoBlock :code="firstDayCode">
          <MCalendar v-model="currentDate" :first-day-of-week="1" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="slot">
        <h2>自定义日期内容</h2>
        <p class="doc-page__hint">通过 <code>#date-cell</code> 插槽自定义日期单元格的展示内容，参数为 <code>{ data }</code>。</p>
        <DemoBlock :code="slotCode">
          <MCalendar v-model="currentDate">
            <template #date-cell="{ data }">
              <div :class="['m-calendar__day-text', { 'custom-day--holiday': isHoliday(data) }]">
                {{ data.day }}
                <span v-if="isHoliday(data)" class="custom-day__badge">假</span>
              </div>
            </template>
          </MCalendar>
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

const currentDate = ref(new Date())

const holidays = ['1', '15', '22']
function isHoliday(data: any) {
  return data.isCurrentMonth && holidays.includes(String(data.day))
}

const basicCode = `<MCalendar v-model="currentDate" />

<script setup>
const currentDate = ref(new Date())
<` + `/script>`

const firstDayCode = `<MCalendar v-model="currentDate" :first-day-of-week="1" />`

const slotCode = `<MCalendar v-model="currentDate">
  <template #date-cell="{ data }">
    <div :class="['m-calendar__day-text', { 'custom-day--holiday': isHoliday(data) }]">
      {{ data.day }}
      <span v-if="isHoliday(data)" class="custom-day__badge">假</span>
    </div>
  </template>
</MCalendar>

<script setup>
const holidays = ['1', '15', '22']
function isHoliday(data) {
  return data.isCurrentMonth && holidays.includes(String(data.day))
}
<` + `/script>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'first-day', label: '自定义起始日' },
  { id: 'slot', label: '自定义日期内容' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'Date', '—', '绑定日期（v-model）'],
    ['firstDayOfWeek', 'number', '0', '每周起始日，0=周日，1=周一'],
    ['range', '[Date, Date]', '—', '日期范围'],
  ],
  events: [
    ['change', 'Date', '选中日期变化时触发'],
    ['select', 'Date', '点击日期时触发'],
  ],
  slots: [
    ['date-cell', '自定义日期单元格内容，参数为 { data: { day, month, year, isCurrentMonth, isToday, isSelected, isInRange } }'],
  ],
}
</script>

<style scoped lang="scss">
.custom-day {
  &--holiday {
    position: relative;
    color: var(--mosaic-danger) !important;
  }

  &__badge {
    position: absolute;
    top: -2px;
    right: -2px;
    font-size: 10px;
    line-height: 1;
    color: #fff;
    background-color: var(--mosaic-danger);
    border-radius: 50%;
    width: 14px;
    height: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
