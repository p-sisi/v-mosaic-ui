<template>
  <div :class="classes">
    <div class="m-calendar__header">
      <button class="m-calendar__button m-calendar__button--prev" @click="prevMonth">&lt;</button>
      <span class="m-calendar__title">{{ titleText }}</span>
      <button class="m-calendar__button m-calendar__button--next" @click="nextMonth">&gt;</button>
    </div>
    <div class="m-calendar__body">
      <table class="m-calendar__table">
        <thead>
          <tr>
            <th v-for="day in weekDays" :key="day" class="m-calendar__week-header">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, weekIndex) in dateRows" :key="weekIndex">
            <td
              v-for="(cell, cellIndex) in week"
              :key="cellIndex"
              :class="cellClasses(cell)"
              @click="handleDateClick(cell)"
            >
              <slot name="date-cell" :data="cell">
                <span class="m-calendar__day-text">{{ cell.day }}</span>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

defineOptions({ name: 'MCalendar' })

const props = withDefaults(defineProps<{
  modelValue?: Date                          // 绑定日期
  range?: Date[]                             // 日期范围
  firstDayOfWeek?: number                    // 周起始日（1-7，1 为周一）
}>(), {
  modelValue: () => new Date(),
  range: undefined,
  firstDayOfWeek: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: Date]
}>()

const currentYear = ref(props.modelValue ? props.modelValue.getFullYear() : new Date().getFullYear())
const currentMonth = ref(props.modelValue ? props.modelValue.getMonth() : new Date().getMonth())

watch(() => props.modelValue, (val) => {
  if (val) {
    currentYear.value = val.getFullYear()
    currentMonth.value = val.getMonth()
  }
})

const dayNames = ['日', '一', '二', '三', '四', '五', '六']

const weekDays = computed(() => {
  const days = [...dayNames]
  const offset = props.firstDayOfWeek % 7
  const before = days.splice(0, offset)
  return [...days, ...before]
})

const titleText = computed(() => {
  return `${currentYear.value}年${currentMonth.value + 1}月`
})

interface DateCell {
  day: number
  month: number
  year: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isInRange: boolean
}

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()

const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

const dateRows = computed(() => {
  const rows: DateCell[][] = []
  const year = currentYear.value
  const month = currentMonth.value
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = (getFirstDayOfMonth(year, month) - props.firstDayOfWeek % 7 + 7) % 7
  const daysInPrevMonth = month > 0 ? getDaysInMonth(year, month - 1) : getDaysInMonth(year - 1, 11)
  const today = new Date()
  const selectedDate = props.modelValue

  let day = 1
  let nextMonthDay = 1
  let prevMonthDay = daysInPrevMonth - firstDay + 1

  for (let i = 0; i < 6; i++) {
    const row: DateCell[] = []
    for (let j = 0; j < 7; j++) {
      const cellIndex = i * 7 + j
      if (cellIndex < firstDay) {
        const prevMonth = month > 0 ? month - 1 : 11
        const prevYear = month > 0 ? year : year - 1
        row.push({
          day: prevMonthDay++,
          month: prevMonth,
          year: prevYear,
          isCurrentMonth: false,
          isToday: prevYear === today.getFullYear() && prevMonth === today.getMonth() && prevMonthDay - 1 === today.getDate(),
          isSelected: false,
          isInRange: false,
        })
      } else if (day > daysInMonth) {
        const nextMonth = month < 11 ? month + 1 : 0
        const nextYear = month < 11 ? year : year + 1
        row.push({
          day: nextMonthDay++,
          month: nextMonth,
          year: nextYear,
          isCurrentMonth: false,
          isToday: nextYear === today.getFullYear() && nextMonth === today.getMonth() && nextMonthDay - 1 === today.getDate(),
          isSelected: false,
          isInRange: false,
        })
      } else {
        const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate()
        const isSelected = selectedDate && year === selectedDate.getFullYear() && month === selectedDate.getMonth() && day === selectedDate.getDate()
        let isInRange = false
        if (props.range && props.range.length === 2) {
          const cellDate = new Date(year, month, day)
          const start = props.range[0] < props.range[1] ? props.range[0] : props.range[1]
          const end = props.range[0] < props.range[1] ? props.range[1] : props.range[0]
          isInRange = cellDate >= start && cellDate <= end
        }
        row.push({
          day: day++,
          month,
          year,
          isCurrentMonth: true,
          isToday,
          isSelected,
          isInRange,
        })
      }
    }
    rows.push(row)
    if (day > daysInMonth && rows.length >= 4) break
  }
  return rows
})

const classes = computed(() => ['m-calendar'])

const cellClasses = (cell: DateCell) => [
  'm-calendar__day-cell',
  {
    'm-calendar__day-cell--other-month': !cell.isCurrentMonth,
    'm-calendar__day-cell--today': cell.isToday,
    'm-calendar__day-cell--selected': cell.isSelected,
    'm-calendar__day-cell--in-range': cell.isInRange,
  },
]

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const handleDateClick = (cell: DateCell) => {
  const date = new Date(cell.year, cell.month, cell.day)
  currentYear.value = cell.year
  currentMonth.value = cell.month
  emit('update:modelValue', date)
}
</script>

<style lang="scss">
.m-calendar {
  border: 1px solid var(--mosaic-border-color);
  border-radius: var(--mosaic-border-radius);
  background-color: #fff;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    border-bottom: 1px solid var(--mosaic-border-color);
  }

  &__title {
    font-size: var(--mosaic-font-size-lg);
    font-weight: 600;
    color: var(--mosaic-text-primary);
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    background: var(--mosaic-fill-color-light);
    border-radius: var(--mosaic-border-radius);
    cursor: pointer;
    font-size: 14px;
    color: var(--mosaic-text-regular);
    transition: background-color var(--mosaic-transition-duration-fast) ease;

    &:hover {
      background-color: var(--mosaic-primary);
      color: #fff;
    }
  }

  &__body {
    padding: 12px;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  &__week-header {
    padding: 8px 0;
    font-size: var(--mosaic-font-size-sm);
    font-weight: 600;
    color: var(--mosaic-text-secondary);
    text-align: center;
  }

  &__day-cell {
    text-align: center;
    padding: 4px;
    cursor: pointer;

    &:not(.m-calendar__day-cell--selected):hover .m-calendar__day-text {
      background-color: var(--mosaic-fill-color-light);
    }

    &--other-month .m-calendar__day-text {
      color: var(--mosaic-text-placeholder);
    }

    &--today .m-calendar__day-text {
      color: var(--mosaic-primary);
      font-weight: 700;
    }

    &--selected .m-calendar__day-text {
      background-color: var(--mosaic-primary);
      color: #fff;
    }

    &--in-range {
      background-color: var(--mosaic-fill-color-light);

      .m-calendar__day-text {
        background-color: rgba(167, 139, 250, 0.2);
        color: var(--mosaic-primary);
      }
    }
  }

  &__day-text {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
  }
}
</style>