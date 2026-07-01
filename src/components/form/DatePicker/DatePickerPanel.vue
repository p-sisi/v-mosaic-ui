<template>
  <div :class="classes" :style="panelVars">
    <div class="m-date-picker-panel__calendar">
      <!-- 头部导航 -->
      <div class="m-date-picker-panel__header">
        <button
          class="m-date-picker-panel__icon-btn"
          type="button"
          :disabled="effectiveDisabled"
          @click="goPrevYear"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          v-if="viewMode === 'day'"
          class="m-date-picker-panel__icon-btn"
          type="button"
          :disabled="effectiveDisabled"
          @click="goPrevMonth"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div class="m-date-picker-panel__header-label">
          <span v-if="viewMode === 'day'" class="m-date-picker-panel__label-item" @click="viewMode = 'month'">
            {{ viewMonth + 1 }} 月
          </span>
          <span class="m-date-picker-panel__label-item" @click="viewMode = 'year'">
            {{ viewYearLabel }}
          </span>
        </div>

        <button
          v-if="viewMode === 'day'"
          class="m-date-picker-panel__icon-btn"
          type="button"
          :disabled="effectiveDisabled"
          @click="goNextMonth"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <button
          class="m-date-picker-panel__icon-btn"
          type="button"
          :disabled="effectiveDisabled"
          @click="goNextYear"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- 日视图 -->
      <div v-if="viewMode === 'day'" class="m-date-picker-panel__body">
        <div class="m-date-picker-panel__weekdays">
          <span
            v-for="(w, i) in weekdays"
            :key="i"
            class="m-date-picker-panel__weekday"
          >{{ w }}</span>
        </div>
        <div class="m-date-picker-panel__dates" @mouseleave="handleDatesLeave">
          <span
            v-for="(cell, i) in dateCells"
            :key="i"
            class="m-date-picker-panel__date"
            :class="{
              'is-prev': cell.type === 'prev',
              'is-next': cell.type === 'next',
              'is-today': cell.isToday,
              'is-selected': cell.isSelected,
              'is-disabled': cell.isDisabled,
              'is-week-hover': isWeekType && cell.weekKey === hoveredWeekKey && !cell.isSelected,
            }"
            @click="handleDateClick(cell)"
            @mouseenter="handleDateEnter(cell)"
          >{{ cell.day }}</span>
        </div>
      </div>

      <!-- 月视图 -->
      <div v-else-if="viewMode === 'month'" class="m-date-picker-panel__body">
        <div class="m-date-picker-panel__months">
          <span
            v-for="m in 12"
            :key="m"
            class="m-date-picker-panel__month"
            :class="{
              'is-selected': isMonthSelected(m - 1),
            }"
            @click="handleMonthClick(m - 1)"
          >{{ m }} 月</span>
        </div>
      </div>

      <!-- 年视图 -->
      <div v-else class="m-date-picker-panel__body">
        <div class="m-date-picker-panel__years">
          <span
            v-for="y in yearList"
            :key="y"
            class="m-date-picker-panel__year"
            :class="{
              'is-selected': isYearSelected(y),
            }"
            @click="handleYearClick(y)"
          >{{ y }}</span>
        </div>
      </div>

      <!-- 非日期时间类型的底部插槽 -->
      <div v-if="type !== 'datetime' && $slots.footer" class="m-date-picker-panel__footer">
        <slot name="footer" />
      </div>
    </div>

    <!-- 时间选择（datetime 类型）：置于日期右侧 -->
    <div v-if="type === 'datetime'" class="m-date-picker-panel__time">
      <div class="m-date-picker-panel__time-labels">
        <span>时</span>
        <span>分</span>
        <span>秒</span>
      </div>
      <div class="m-date-picker-panel__time-wheel-row">
        <div
          class="m-date-picker-panel__time-wheel-container"
          ref="hourWheelRef"
          @scroll="handleWheelScroll('hour', $event)"
        >
          <div class="m-date-picker-panel__time-wheel-list">
            <div
              v-for="h in 24"
              :key="h"
              class="m-date-picker-panel__time-wheel-item"
              :class="{ 'is-active': hour === h - 1 }"
              @click="handleWheelItemClick('hour', h - 1)"
            >{{ pad(h - 1) }}</div>
          </div>
        </div>

        <div
          class="m-date-picker-panel__time-wheel-container"
          ref="minuteWheelRef"
          @scroll="handleWheelScroll('minute', $event)"
        >
          <div class="m-date-picker-panel__time-wheel-list">
            <div
              v-for="m in 60"
              :key="m"
              class="m-date-picker-panel__time-wheel-item"
              :class="{ 'is-active': minute === m - 1 }"
              @click="handleWheelItemClick('minute', m - 1)"
            >{{ pad(m - 1) }}</div>
          </div>
        </div>

        <div
          class="m-date-picker-panel__time-wheel-container"
          ref="secondWheelRef"
          @scroll="handleWheelScroll('second', $event)"
        >
          <div class="m-date-picker-panel__time-wheel-list">
            <div
              v-for="s in 60"
              :key="s"
              class="m-date-picker-panel__time-wheel-item"
              :class="{ 'is-active': second === s - 1 }"
              @click="handleWheelItemClick('second', s - 1)"
            >{{ pad(s - 1) }}</div>
          </div>
        </div>
      </div>

      <div class="m-date-picker-panel__footer">
        <slot name="footer">
          <button
            class="m-date-picker-panel__now-btn"
            type="button"
            :disabled="effectiveDisabled"
            @click="setNow"
          >此刻</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MDatePickerPanel' })

type DatePickerType = 'date' | 'datetime' | 'month' | 'year' | 'week' | 'weeks' | 'months' | 'years'

const props = withDefaults(defineProps<{
  modelValue?: string | Date | string[] | string[][]
  type?: DatePickerType
  disabled?: boolean
  disabledDate?: (date: Date) => boolean
  firstDayOfWeek?: number        // 1-7, 1=周一
  valueFormat?: string           // 输出格式，默认 ISO 字符串
  size?: 'small' | 'default' | 'large'
}>(), {
  modelValue: '',
  type: 'date',
  disabled: false,
  disabledDate: () => false,
  firstDayOfWeek: 1,
  valueFormat: '',
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[] | string[][]]
  change: [value: string | string[] | string[][]]
  select: [value: string | string[] | string[][]]
}>()

const { effectiveDisabled, effectiveSize } = useFormItem(props)

// ===== 内部状态 =====
const isMulti = computed(() => ['week', 'weeks', 'months', 'years'].includes(props.type as string))
const isWeekType = computed(() => props.type === 'week' || props.type === 'weeks')
const innerDate = ref<Date>(parseValue(props.modelValue as string | Date) || new Date())
const innerValues = ref<(string | string[])[]>(parseMultiModelValue(props.modelValue))
const viewDate = ref<Date>(new Date(innerDate.value))
const viewMode = ref<'day' | 'month' | 'year'>(
  (props.type === 'year' || props.type === 'years') ? 'year'
  : (props.type === 'month' || props.type === 'months') ? 'month'
  : 'day'
)
const hoveredWeekKey = ref('')

const hour = ref(innerDate.value.getHours())
const minute = ref(innerDate.value.getMinutes())
const second = ref(innerDate.value.getSeconds())

const hourWheelRef = ref<HTMLElement | null>(null)
const minuteWheelRef = ref<HTMLElement | null>(null)
const secondWheelRef = ref<HTMLElement | null>(null)

let isSyncingWheels = false

// ===== 尺寸配置 =====
const sizeConfig = computed(() => {
  switch (effectiveSize.value) {
    case 'small': return { width: 256, cellH: 24, monthH: 38, wheelW: 44 }
    case 'large': return { width: 336, cellH: 32, monthH: 50, wheelW: 52 }
    default: return { width: 296, cellH: 28, monthH: 44, wheelW: 48 }
  }
})
const wheelItemHeight = computed(() => sizeConfig.value.cellH)

const panelVars = computed(() => ({
  '--mdp-width': `${sizeConfig.value.width}px`,
  '--mdp-cell-h': `${sizeConfig.value.cellH}px`,
  '--mdp-month-h': `${sizeConfig.value.monthH}px`,
  '--mdp-wheel-h': `${sizeConfig.value.cellH * 5}px`,
  '--mdp-wheel-item-h': `${sizeConfig.value.cellH}px`,
  '--mdp-wheel-pad': `${sizeConfig.value.cellH * 2}px`,
  '--mdp-wheel-w': `${sizeConfig.value.wheelW}px`,
}))

// ===== 工具函数 =====
function parseValue(val: string | Date): Date | null {
  if (!val) return null
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val
  const d = new Date(val)
  return isNaN(d.getTime()) ? null : d
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function formatDate(d: Date): string {
  if (props.valueFormat) {
    return formatByPattern(d, props.valueFormat)
  }
  if (props.type === 'datetime') {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  }
  if (props.type === 'month') {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`
  }
  if (props.type === 'year') {
    return `${d.getFullYear()}`
  }
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function formatByPattern(d: Date, fmt: string): string {
  const map: Record<string, string> = {
    'YYYY': String(d.getFullYear()),
    'MM': pad(d.getMonth() + 1),
    'DD': pad(d.getDate()),
    'HH': pad(d.getHours()),
    'mm': pad(d.getMinutes()),
    'ss': pad(d.getSeconds()),
  }
  return fmt.replace(/YYYY|MM|DD|HH|mm|ss/g, (m) => map[m])
}

function cloneDate(d: Date): Date {
  return new Date(d.getTime())
}

function formatDateOnly(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

// ===== 多选值解析 =====
function parseMultiModelValue(val: unknown): (string | string[])[] {
  if (!Array.isArray(val)) return []
  if (props.type === 'week') {
    // 单选周：值为 [start, end] 扁平数组
    if (val.length >= 2 && typeof val[0] === 'string' && typeof val[1] === 'string') {
      return [[val[0] as string, val[1] as string]]
    }
    return []
  }
  return val.filter((v) => v !== null && v !== undefined && v !== '')
}

function arraysEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

// ===== 周计算 =====
function getWeekStart(date: Date): Date {
  const d = cloneDate(date)
  const day = d.getDay() // 0=周日
  const diff = (day - props.firstDayOfWeek + 7) % 7
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function getWeekRange(date: Date): [Date, Date] {
  const start = getWeekStart(date)
  const end = cloneDate(start)
  end.setDate(start.getDate() + 6)
  return [start, end]
}

function isWeekSelectedByDate(d: Date): boolean {
  const startStr = formatDateOnly(getWeekStart(d))
  return innerValues.value.some((v) => Array.isArray(v) && v[0] === startStr)
}

// ===== 多选输出 =====
function emitMulti() {
  let out: string[] | string[][]
  if (props.type === 'week') {
    out = (innerValues.value[0] as string[]) || []
  } else {
    out = [...innerValues.value] as string[] | string[][]
  }
  emit('update:modelValue', out as any)
  emit('change', out as any)
  emit('select', out as any)
}

function selectWeek(d: Date) {
  if (effectiveDisabled.value) return
  const range = getWeekRange(d)
  const startStr = formatDateOnly(range[0])
  const endStr = formatDateOnly(range[1])
  if (props.type === 'week') {
    // 单选：替换
    innerValues.value = [[startStr, endStr]]
  } else {
    // 多选：切换
    const idx = innerValues.value.findIndex((v) => Array.isArray(v) && v[0] === startStr)
    if (idx >= 0) innerValues.value.splice(idx, 1)
    else innerValues.value.push([startStr, endStr])
  }
  emitMulti()
}

function toggleMultiKey(key: string) {
  if (effectiveDisabled.value) return
  const idx = innerValues.value.indexOf(key)
  if (idx >= 0) innerValues.value.splice(idx, 1)
  else innerValues.value.push(key)
  emitMulti()
}

// ===== 导航 =====
const viewYear = computed(() => viewDate.value.getFullYear())
const viewMonth = computed(() => viewDate.value.getMonth())

const viewYearLabel = computed(() => {
  if (viewMode.value === 'year') {
    const start = Math.floor(viewYear.value / 10) * 10
    return `${start} - ${start + 9}`
  }
  return `${viewYear.value} 年`
})

function goPrevYear() {
  const d = cloneDate(viewDate.value)
  d.setFullYear(d.getFullYear() - 1)
  viewDate.value = d
}

function goNextYear() {
  const d = cloneDate(viewDate.value)
  d.setFullYear(d.getFullYear() + 1)
  viewDate.value = d
}

function goPrevMonth() {
  const d = cloneDate(viewDate.value)
  d.setMonth(d.getMonth() - 1)
  viewDate.value = d
}

function goNextMonth() {
  const d = cloneDate(viewDate.value)
  d.setMonth(d.getMonth() + 1)
  viewDate.value = d
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
  isSelected: boolean
  isDisabled: boolean
  weekKey: string
}

const today = new Date()

const dateCells = computed<DateCell[]>(() => {
  const year = viewYear.value
  const month = viewMonth.value
  const firstOfMonth = new Date(year, month, 1)
  const firstDayWeek = firstOfMonth.getDay() // 0=周日
  const offset = (firstDayWeek - props.firstDayOfWeek + 7) % 7
  const start = new Date(year, month, 1 - offset)

  const cells: DateCell[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    const isCurrent = d.getMonth() === month
    const weekStart = isWeekType.value ? getWeekStart(d) : null
    cells.push({
      day: d.getDate(),
      type: isCurrent ? 'current' : (d < firstOfMonth ? 'prev' : 'next'),
      date: d,
      isToday: isSameDay(d, today),
      isSelected: isWeekType.value
        ? (weekStart ? isWeekSelectedByDate(d) : false)
        : isSameDay(d, innerDate.value),
      isDisabled: props.disabledDate(d),
      weekKey: weekStart ? formatDateOnly(weekStart) : '',
    })
  }
  return cells
})

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

// ===== 月/年视图 =====
function isMonthSelected(m: number): boolean {
  if (props.type === 'months') {
    const key = `${viewYear.value}-${pad(m + 1)}`
    return innerValues.value.includes(key)
  }
  // 周类/年多选无"选中月"概念，导航视图不高亮
  if (['weeks', 'week', 'years'].includes(props.type as string)) return false
  return viewYear.value === innerDate.value.getFullYear() && m === innerDate.value.getMonth()
}

const yearList = computed(() => {
  const start = Math.floor(viewYear.value / 10) * 10
  const arr: number[] = []
  for (let i = 0; i < 10; i++) arr.push(start + i)
  return arr
})

function isYearSelected(y: number): boolean {
  if (props.type === 'years') {
    return innerValues.value.includes(String(y))
  }
  if (['months', 'weeks', 'week'].includes(props.type as string)) return false
  return y === innerDate.value.getFullYear()
}

// ===== 点击处理 =====
function handleDateClick(cell: DateCell) {
  if (effectiveDisabled.value || cell.isDisabled) return
  if (isWeekType.value) {
    selectWeek(cell.date)
    return
  }
  const d = cloneDate(cell.date)
  if (props.type === 'datetime') {
    d.setHours(hour.value, minute.value, second.value)
  }
  innerDate.value = d
  viewDate.value = cloneDate(d)
  emitValue()
  if (props.type === 'date') {
    emit('select', formatDate(d))
  }
}

function handleDateEnter(cell: DateCell) {
  if (isWeekType.value) {
    hoveredWeekKey.value = cell.weekKey
  }
}

function handleDatesLeave() {
  hoveredWeekKey.value = ''
}

function handleMonthClick(m: number) {
  if (effectiveDisabled.value) return
  if (props.type === 'months') {
    toggleMultiKey(`${viewYear.value}-${pad(m + 1)}`)
    return
  }
  const d = cloneDate(viewDate.value)
  d.setMonth(m)
  viewDate.value = cloneDate(d)
  innerDate.value = cloneDate(d)
  if (props.type === 'month') {
    emitValue()
    emit('select', formatDate(d))
  } else {
    viewMode.value = 'day'
  }
}

function handleYearClick(y: number) {
  if (effectiveDisabled.value) return
  if (props.type === 'years') {
    toggleMultiKey(String(y))
    return
  }
  const d = cloneDate(viewDate.value)
  d.setFullYear(y)
  viewDate.value = cloneDate(d)
  innerDate.value = cloneDate(d)
  if (props.type === 'year') {
    emitValue()
    emit('select', formatDate(d))
  } else {
    viewMode.value = 'month'
  }
}

// ===== 时间滚轮 =====
function getTimeValue(field: 'hour' | 'minute' | 'second'): number {
  return field === 'hour' ? hour.value : field === 'minute' ? minute.value : second.value
}

function setTimeValue(field: 'hour' | 'minute' | 'second', n: number) {
  if (field === 'hour') hour.value = n
  else if (field === 'minute') minute.value = n
  else second.value = n
}

function getWheelRef(field: 'hour' | 'minute' | 'second') {
  return field === 'hour' ? hourWheelRef : field === 'minute' ? minuteWheelRef : secondWheelRef
}

let wheelScrollTimer: ReturnType<typeof setTimeout> | null = null

function handleWheelScroll(field: 'hour' | 'minute' | 'second', event: Event) {
  if (isSyncingWheels) return
  const target = event.target as HTMLElement
  if (wheelScrollTimer) clearTimeout(wheelScrollTimer)
  wheelScrollTimer = setTimeout(() => {
    const itemH = wheelItemHeight.value
    const idx = Math.round(target.scrollTop / itemH)
    const max = field === 'hour' ? 23 : 59
    const clamped = Math.max(0, Math.min(max, idx))
    if (getTimeValue(field) !== clamped) {
      setTimeValue(field, clamped)
      syncTimeToDate()
    }
    const exactTop = clamped * itemH
    if (Math.abs(target.scrollTop - exactTop) > 1) {
      isSyncingWheels = true
      target.scrollTop = exactTop
      nextTick(() => { isSyncingWheels = false })
    }
  }, 80)
}

function handleWheelItemClick(field: 'hour' | 'minute' | 'second', value: number) {
  if (effectiveDisabled.value) return
  setTimeValue(field, value)
  syncTimeToDate()
  scrollToWheel(field)
}

function syncTimeToDate() {
  const d = cloneDate(innerDate.value)
  d.setHours(hour.value, minute.value, second.value)
  innerDate.value = d
  emitValue()
}

function scrollToWheel(field: 'hour' | 'minute' | 'second') {
  const el = getWheelRef(field).value
  if (!el) return
  const itemH = wheelItemHeight.value
  const targetTop = getTimeValue(field) * itemH
  if (Math.abs(el.scrollTop - targetTop) < 1) return
  isSyncingWheels = true
  el.scrollTop = targetTop
  nextTick(() => { isSyncingWheels = false })
}

function syncWheels() {
  if (props.type !== 'datetime') return
  nextTick(() => {
    scrollToWheel('hour')
    scrollToWheel('minute')
    scrollToWheel('second')
  })
}

onMounted(() => {
  syncWheels()
})

function setNow() {
  if (effectiveDisabled.value) return
  const d = new Date()
  innerDate.value = d
  viewDate.value = cloneDate(d)
  hour.value = d.getHours()
  minute.value = d.getMinutes()
  second.value = d.getSeconds()
  emitValue()
  syncWheels()
  emit('select', formatDate(d))
}

// ===== 输出 =====
function emitValue() {
  const out = formatDate(innerDate.value)
  emit('update:modelValue', out)
  emit('change', out)
}

// ===== 同步 modelValue =====
watch(() => props.modelValue, (val) => {
  if (isMulti.value) {
    const arr = parseMultiModelValue(val)
    if (!arraysEqual(arr, innerValues.value)) {
      innerValues.value = arr
    }
    return
  }
  const parsed = parseValue(val as string | Date)
  if (parsed && parsed.getTime() !== innerDate.value.getTime()) {
    innerDate.value = parsed
    viewDate.value = cloneDate(parsed)
    hour.value = parsed.getHours()
    minute.value = parsed.getMinutes()
    second.value = parsed.getSeconds()
    syncWheels()
  }
})

// 尺寸变化时重新对齐滚轮位置
watch(wheelItemHeight, () => {
  syncWheels()
})

// ===== 样式 =====
const classes = computed(() => [
  'm-date-picker-panel',
  `m-date-picker-panel--${props.type}`,
  `m-date-picker-panel--${effectiveSize.value}`,
  {
    'm-date-picker-panel--disabled': effectiveDisabled.value,
  },
])
</script>

<style lang="scss">
.m-date-picker-panel {
  width: var(--mdp-width);
  padding: 12px;
  background-color: #fff;
  border: 1px solid var(--mosaic-border-color);
  border-radius: var(--mosaic-border-radius);
  box-sizing: border-box;
  font-size: var(--mosaic-font-size);
  user-select: none;

  /* datetime：日期与时间左右排列 */
  &--datetime {
    width: auto;
    display: flex;
    align-items: stretch;
    gap: 0;
  }

  &__calendar {
    width: 100%;
    box-sizing: border-box;
  }

  /* datetime 模式下日历保持固定宽度，与右侧时间区并排 */
  &--datetime &__calendar {
    width: var(--mdp-width);
    flex-shrink: 0;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
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

    &:hover:not(:disabled) {
      color: var(--mosaic-primary);
      background-color: var(--mosaic-fill-color-light);
    }

    &:disabled {
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;
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

  &__label-item {
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;
    transition: color 0.2s;

    &:hover {
      color: var(--mosaic-primary);
    }
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
    height: var(--mdp-cell-h);
    line-height: var(--mdp-cell-h);
    border-radius: 4px;
    cursor: pointer;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
    transition: background-color 0.2s, color 0.2s;

    &:hover:not(.is-disabled):not(.is-selected) {
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

    &.is-selected {
      background-color: var(--mosaic-primary);
      color: #fff;

      &.is-today {
        color: #fff;
      }

      &:hover {
        background-color: var(--mosaic-primary-dark);
      }
    }

    &.is-week-hover {
      background-color: var(--mosaic-fill-color-light);
    }

    &.is-disabled {
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }
  }

  &__months,
  &__years {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    padding: 4px 0;
  }

  &__month,
  &__year {
    text-align: center;
    height: var(--mdp-month-h);
    line-height: var(--mdp-month-h);
    border-radius: 4px;
    cursor: pointer;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
    transition: background-color 0.2s, color 0.2s;

    &:hover:not(.is-selected) {
      background-color: var(--mosaic-fill-color-light);
    }

    &.is-selected {
      background-color: var(--mosaic-primary);
      color: #fff;

      &:hover {
        background-color: var(--mosaic-primary-dark);
      }
    }
  }

  /* 时间区（datetime 右侧） */
  &__time {
    display: flex;
    flex-direction: column;
    padding-left: 12px;
    margin-left: 12px;
    border-left: 1px solid var(--mosaic-border-color-lighter);
  }

  &__time-labels {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 4px;

    span {
      width: var(--mdp-wheel-w);
      text-align: center;
      font-size: var(--mosaic-font-size-sm);
      color: var(--mosaic-text-secondary);
    }
  }

  &__time-wheel-row {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 8px;

    // 中央选中高亮条
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: var(--mdp-cell-h);
      transform: translateY(-50%);
      background-color: var(--mosaic-fill-color-light);
      border-radius: 4px;
      pointer-events: none;
      z-index: 0;
    }
  }

  &__time-wheel-container {
    width: var(--mdp-wheel-w);
    height: var(--mdp-wheel-h);
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    position: relative;
    z-index: 1;
    border-radius: 4px;

    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    mask-image: linear-gradient(to bottom, transparent 0%, #000 36%, #000 64%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 36%, #000 64%, transparent 100%);
  }

  &__time-wheel-list {
    padding: var(--mdp-wheel-pad) 0;
  }

  &__time-wheel-item {
    height: var(--mdp-wheel-item-h);
    line-height: var(--mdp-wheel-item-h);
    text-align: center;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-regular);
    cursor: pointer;
    scroll-snap-align: center;
    transition: color 0.15s, font-weight 0.15s;

    &:hover {
      color: var(--mosaic-primary);
    }

    &.is-active {
      color: var(--mosaic-primary);
      font-weight: 600;
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--mosaic-border-color-lighter);
  }

  &__now-btn {
    height: 28px;
    padding: 0 12px;
    border: 1px solid var(--mosaic-primary);
    background-color: #fff;
    color: var(--mosaic-primary);
    border-radius: 4px;
    font-size: var(--mosaic-font-size-sm);
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    &:hover:not(:disabled) {
      background-color: var(--mosaic-primary);
      color: #fff;
    }

    &:disabled {
      border-color: var(--mosaic-disabled-border-color);
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;
    }
  }

  /* 周选择：整行高亮，禁用单格 hover */
  &--week,
  &--weeks {
    .m-date-picker-panel__date:hover:not(.is-disabled):not(.is-selected):not(.is-week-hover) {
      background-color: transparent;
    }
  }

  &--disabled {
    opacity: 0.6;

    .m-date-picker-panel__date,
    .m-date-picker-panel__month,
    .m-date-picker-panel__year,
    .m-date-picker-panel__label-item {
      cursor: not-allowed;
    }
  }
}
</style>
