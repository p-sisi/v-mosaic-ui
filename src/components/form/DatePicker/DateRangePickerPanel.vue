<template>
  <div :class="classes" :style="panelVars">
    <div class="m-date-range-panel__calendars">
      <!-- 左日历 -->
      <div class="m-date-range-panel__calendar">
        <div class="m-date-range-panel__header">
          <button class="m-date-range-panel__icon-btn" type="button" @click="goPrevYear">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 19l-7-7 7-7M19 19l-7-7 7-7" /></svg>
          </button>
          <button class="m-date-range-panel__icon-btn" type="button" @click="goPrevMonth">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div class="m-date-range-panel__header-label">
            <span>{{ leftYearLabel }}</span>
            <span>{{ leftMonth + 1 }} 月</span>
          </div>
        </div>
        <div class="m-date-range-panel__body">
          <div class="m-date-range-panel__weekdays">
            <span v-for="(w, i) in weekdays" :key="i" class="m-date-range-panel__weekday">{{ w }}</span>
          </div>
          <div class="m-date-range-panel__dates" @mouseleave="handleDatesLeave">
            <span
              v-for="(cell, i) in leftCells"
              :key="i"
              class="m-date-range-panel__date"
              :class="cellClass(cell)"
              @click="handleDateClick(cell)"
              @mouseenter="handleDateEnter(cell)"
            >{{ cell.day }}</span>
          </div>
        </div>
      </div>

      <!-- 右日历 -->
      <div class="m-date-range-panel__calendar">
        <div class="m-date-range-panel__header">
          <div class="m-date-range-panel__header-label">
            <span>{{ rightYearLabel }}</span>
            <span>{{ rightMonth + 1 }} 月</span>
          </div>
          <button class="m-date-range-panel__icon-btn" type="button" @click="goNextMonth">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
          <button class="m-date-range-panel__icon-btn" type="button" @click="goNextYear">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </button>
        </div>
        <div class="m-date-range-panel__body">
          <div class="m-date-range-panel__weekdays">
            <span v-for="(w, i) in weekdays" :key="i" class="m-date-range-panel__weekday">{{ w }}</span>
          </div>
          <div class="m-date-range-panel__dates" @mouseleave="handleDatesLeave">
            <span
              v-for="(cell, i) in rightCells"
              :key="i"
              class="m-date-range-panel__date"
              :class="cellClass(cell)"
              @click="handleDateClick(cell)"
              @mouseenter="handleDateEnter(cell)"
            >{{ cell.day }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MDateRangePickerPanel' })

const props = withDefaults(defineProps<{
  modelValue?: string[]
  valueFormat?: string
  disabledDate?: (date: Date) => boolean
  firstDayOfWeek?: number
  size?: 'small' | 'default' | 'large'
}>(), {
  modelValue: () => [],
  valueFormat: '',
  disabledDate: () => false,
  firstDayOfWeek: 1,
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  change: [value: string[]]
  select: [value: string[]]
}>()

const { effectiveSize } = useFormItem(props)

// ===== 工具函数 =====
function pad(n: number): string {
  return String(n).padStart(2, '0')
}
function cloneDate(d: Date): Date {
  return new Date(d.getTime())
}
function formatDateOnly(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
function formatByPattern(d: Date, fmt: string): string {
  const map: Record<string, string> = {
    'YYYY': String(d.getFullYear()),
    'MM': pad(d.getMonth() + 1),
    'DD': pad(d.getDate()),
  }
  return fmt.replace(/YYYY|MM|DD/g, (m) => map[m])
}
function formatValue(d: Date): string {
  if (props.valueFormat) return formatByPattern(d, props.valueFormat)
  return formatDateOnly(d)
}
function parseValue(val: string): Date | null {
  if (!val) return null
  const d = new Date(val)
  return isNaN(d.getTime()) ? null : d
}
function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}
function dateLt(a: Date, b: Date): boolean {
  return formatDateOnly(a) < formatDateOnly(b)
}

// ===== 尺寸 =====
const sizeConfig = computed(() => {
  switch (effectiveSize.value) {
    case 'small': return { width: 256, cellH: 24 }
    case 'large': return { width: 336, cellH: 32 }
    default: return { width: 296, cellH: 28 }
  }
})
const panelVars = computed(() => ({
  '--mdrp-width': `${sizeConfig.value.width}px`,
  '--mdrp-cell-h': `${sizeConfig.value.cellH}px`,
}))

// ===== 状态 =====
const today = new Date()
const leftViewDate = ref(new Date())
const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
const hoverDate = ref<Date | null>(null)
const selecting = ref<'start' | 'end'>('start')

const leftMonth = computed(() => leftViewDate.value.getMonth())
const leftYear = computed(() => leftViewDate.value.getFullYear())
const rightViewDate = computed(() => {
  const d = cloneDate(leftViewDate.value)
  d.setMonth(d.getMonth() + 1)
  return d
})
const rightMonth = computed(() => rightViewDate.value.getMonth())
const rightYear = computed(() => rightViewDate.value.getFullYear())
const leftYearLabel = computed(() => `${leftYear.value} 年`)
const rightYearLabel = computed(() => `${rightYear.value} 年`)

// ===== 导航 =====
function goPrevYear() {
  const d = cloneDate(leftViewDate.value)
  d.setFullYear(d.getFullYear() - 1)
  leftViewDate.value = d
}
function goNextYear() {
  const d = cloneDate(leftViewDate.value)
  d.setFullYear(d.getFullYear() + 1)
  leftViewDate.value = d
}
function goPrevMonth() {
  const d = cloneDate(leftViewDate.value)
  d.setMonth(d.getMonth() - 1)
  leftViewDate.value = d
}
function goNextMonth() {
  const d = cloneDate(leftViewDate.value)
  d.setMonth(d.getMonth() + 1)
  leftViewDate.value = d
}

// ===== 星期表头 =====
const weekdayLabels = ['日', '一', '二', '三', '四', '五', '六']
const weekdays = computed(() => {
  const offset = props.firstDayOfWeek % 7
  return [...weekdayLabels.slice(offset), ...weekdayLabels.slice(0, offset)]
})

// ===== 日期网格 =====
interface DateCell {
  day: number
  type: 'prev' | 'current' | 'next'
  date: Date
  isToday: boolean
  isDisabled: boolean
}

function buildCells(viewDate: Date): DateCell[] {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const firstDayWeek = firstOfMonth.getDay()
  const offset = (firstDayWeek - props.firstDayOfWeek + 7) % 7
  const start = new Date(year, month, 1 - offset)
  const cells: DateCell[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    const isCurrent = d.getMonth() === month
    cells.push({
      day: d.getDate(),
      type: isCurrent ? 'current' : (dateLt(d, firstOfMonth) ? 'prev' : 'next'),
      date: d,
      isToday: isSameDay(d, today),
      isDisabled: props.disabledDate(d),
    })
  }
  return cells
}

const leftCells = computed<DateCell[]>(() => buildCells(leftViewDate.value))
const rightCells = computed<DateCell[]>(() => buildCells(rightViewDate.value))

// ===== 区间判定 =====
function isRangeStart(d: Date): boolean {
  return !!startDate.value && isSameDay(d, startDate.value)
}
function isRangeEnd(d: Date): boolean {
  return !!endDate.value && isSameDay(d, endDate.value)
}
function isInRange(d: Date): boolean {
  if (!startDate.value) return false
  const end = endDate.value || hoverDate.value
  if (!end) return false
  const s = startDate.value
  if (dateLt(d, s) && dateLt(d, end)) return false
  if (dateLt(s, d) && dateLt(end, d)) return false
  // d between min(s,end) and max(s,end)
  const min = dateLt(s, end) ? s : end
  const max = dateLt(s, end) ? end : s
  const ds = formatDateOnly(d)
  return ds >= formatDateOnly(min) && ds <= formatDateOnly(max)
}

function cellClass(cell: DateCell) {
  return {
    'is-prev': cell.type === 'prev',
    'is-next': cell.type === 'next',
    'is-today': cell.isToday,
    'is-disabled': cell.isDisabled,
    'is-range-start': isRangeStart(cell.date),
    'is-range-end': isRangeEnd(cell.date),
    'is-in-range': isInRange(cell.date) && !isRangeStart(cell.date) && !isRangeEnd(cell.date),
  }
}

// ===== 交互 =====
function handleDateClick(cell: DateCell) {
  if (cell.isDisabled) return
  const d = cell.date
  if (selecting.value === 'start' || (selecting.value === 'end' && startDate.value && dateLt(d, startDate.value))) {
    startDate.value = cloneDate(d)
    endDate.value = null
    hoverDate.value = null
    selecting.value = 'end'
    emit('update:modelValue', partialValue())
    emit('change', partialValue())
    return
  }
  // selecting end, d >= start
  endDate.value = cloneDate(d)
  selecting.value = 'start'
  const out = [formatValue(startDate.value!), formatValue(endDate.value!)]
  emit('update:modelValue', out)
  emit('change', out)
  emit('select', out)
}

function partialValue(): string[] {
  if (!startDate.value) return []
  return [formatValue(startDate.value)]
}

function handleDateEnter(cell: DateCell) {
  if (cell.isDisabled) return
  if (selecting.value === 'end' && startDate.value) {
    hoverDate.value = cloneDate(cell.date)
  }
}
function handleDatesLeave() {
  hoverDate.value = null
}

// ===== modelValue 同步 =====
watch(() => props.modelValue, (val) => {
  if (!Array.isArray(val) || val.length === 0) {
    startDate.value = null
    endDate.value = null
    selecting.value = 'start'
    return
  }
  const s = parseValue(val[0])
  const e = val[1] ? parseValue(val[1]) : null
  if (s) {
    startDate.value = s
    if (e && !dateLt(e, s)) {
      endDate.value = e
      selecting.value = 'start'
    } else {
      endDate.value = null
      selecting.value = 'end'
    }
    // 同步视图月份到起始月
    leftViewDate.value = new Date(s.getFullYear(), s.getMonth(), 1)
  }
}, { immediate: true })

const classes = computed(() => [
  'm-date-range-panel',
  `m-date-range-panel--${effectiveSize.value}`,
])
</script>

<style lang="scss">
.m-date-range-panel {
  width: calc(var(--mdrp-width) * 2 + 12px);
  box-sizing: border-box;

  &__calendars {
    display: flex;
    gap: 12px;
  }

  &__calendar {
    width: var(--mdrp-width);
    box-sizing: border-box;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    min-height: 24px;
  }

  &__icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    background: none;
    color: var(--mosaic-text-regular);
    cursor: pointer;
    border-radius: 4px;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      color: var(--mosaic-primary);
      background-color: var(--mosaic-fill-color-light);
    }
  }

  &__header-label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: var(--mosaic-font-size-lg);
    font-weight: 600;
    color: var(--mosaic-text-primary);
  }

  &__body {
    margin-top: 4px;
  }

  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 4px;
  }

  &__weekday {
    text-align: center;
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-secondary);
    padding: 6px 0;
  }

  &__dates {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  &__date {
    text-align: center;
    height: var(--mdrp-cell-h);
    line-height: var(--mdrp-cell-h);
    border-radius: 4px;
    cursor: pointer;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
    transition: background-color 0.2s, color 0.2s;
    position: relative;

    &:hover:not(.is-disabled):not(.is-range-start):not(.is-range-end) {
      background-color: var(--mosaic-fill-color-light);
    }

    &.is-prev,
    &.is-next {
      color: var(--mosaic-text-placeholder);
    }

    &.is-today {
      font-weight: 600;
      color: var(--mosaic-primary);
    }

    &.is-in-range {
      background-color: rgba(167, 139, 250, 0.12);
      border-radius: 0;
      color: var(--mosaic-primary);
    }

    &.is-range-start,
    &.is-range-end {
      background-color: var(--mosaic-primary);
      color: #fff;

      &.is-today {
        color: #fff;
      }
    }

    &.is-disabled {
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }
  }
}
</style>
