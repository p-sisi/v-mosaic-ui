<template>
  <div :class="classes" ref="wrapperRef">
    <div
      class="m-time-picker__trigger"
      :class="{
        'is-open': popperVisible,
        'is-empty': !hasValue,
        'is-focused': focused,
        'is-hover': hovered,
      }"
      @click="handleTriggerClick"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <span class="m-time-picker__prefix">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      </span>

      <input
        ref="inputRef"
        class="m-time-picker__input"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="effectiveDisabled"
        :readonly="!editable || isRange"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @keydown.enter="handleInputCommit"
      />

      <span
        v-if="clearable && hasValue && !effectiveDisabled && (hovered || focused)"
        class="m-time-picker__clear"
        @mousedown.prevent.stop="handleClear"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </span>
      <span v-else class="m-time-picker__suffix" :class="{ 'is-open': popperVisible }">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>

    <Teleport to="body">
      <Transition name="m-fade-in-linear">
        <div
          v-show="popperVisible"
          ref="popperRef"
          class="m-time-picker__popper"
          :class="popperClass"
          :style="[popperStyle, panelVars]"
        >
          <!-- 单组滚轮 -->
          <div v-if="!isRange" class="m-time-picker__panel">
            <div class="m-time-picker__time-labels">
              <span>时</span>
              <span>分</span>
              <span>秒</span>
            </div>
            <div class="m-time-picker__time-wheel-row">
              <div
                class="m-time-picker__time-wheel-container"
                ref="hourWheelRef"
                @scroll="handleWheelScroll('start', 'hour', $event)"
              >
                <div class="m-time-picker__time-wheel-list">
                  <div
                    v-for="h in 24"
                    :key="h"
                    class="m-time-picker__time-wheel-item"
                    :class="{ 'is-active': startHour === h - 1 }"
                    @click="handleWheelItemClick('start', 'hour', h - 1)"
                  >{{ pad(h - 1) }}</div>
                </div>
              </div>
              <div
                class="m-time-picker__time-wheel-container"
                ref="minuteWheelRef"
                @scroll="handleWheelScroll('start', 'minute', $event)"
              >
                <div class="m-time-picker__time-wheel-list">
                  <div
                    v-for="m in 60"
                    :key="m"
                    class="m-time-picker__time-wheel-item"
                    :class="{ 'is-active': startMinute === m - 1 }"
                    @click="handleWheelItemClick('start', 'minute', m - 1)"
                  >{{ pad(m - 1) }}</div>
                </div>
              </div>
              <div
                class="m-time-picker__time-wheel-container"
                ref="secondWheelRef"
                @scroll="handleWheelScroll('start', 'second', $event)"
              >
                <div class="m-time-picker__time-wheel-list">
                  <div
                    v-for="s in 60"
                    :key="s"
                    class="m-time-picker__time-wheel-item"
                    :class="{ 'is-active': startSecond === s - 1 }"
                    @click="handleWheelItemClick('start', 'second', s - 1)"
                  >{{ pad(s - 1) }}</div>
                </div>
              </div>
            </div>

            <div class="m-time-picker__footer">
              <slot name="footer">
                <button
                  class="m-time-picker__now-btn"
                  type="button"
                  :disabled="effectiveDisabled"
                  @click="setNow"
                >此刻</button>
              </slot>
            </div>
          </div>

          <!-- 两组滚轮并排（isRange） -->
          <div v-else class="m-time-picker__panel m-time-picker__panel--range">
            <div class="m-time-picker__range-group">
              <div class="m-time-picker__range-label">开始</div>
              <div class="m-time-picker__time-labels">
                <span>时</span>
                <span>分</span>
                <span>秒</span>
              </div>
              <div class="m-time-picker__time-wheel-row">
                <div
                  class="m-time-picker__time-wheel-container"
                  ref="startHourWheelRef"
                  @scroll="handleWheelScroll('start', 'hour', $event)"
                >
                  <div class="m-time-picker__time-wheel-list">
                    <div
                      v-for="h in 24"
                      :key="h"
                      class="m-time-picker__time-wheel-item"
                      :class="{ 'is-active': startHour === h - 1 }"
                      @click="handleWheelItemClick('start', 'hour', h - 1)"
                    >{{ pad(h - 1) }}</div>
                  </div>
                </div>
                <div
                  class="m-time-picker__time-wheel-container"
                  ref="startMinuteWheelRef"
                  @scroll="handleWheelScroll('start', 'minute', $event)"
                >
                  <div class="m-time-picker__time-wheel-list">
                    <div
                      v-for="m in 60"
                      :key="m"
                      class="m-time-picker__time-wheel-item"
                      :class="{ 'is-active': startMinute === m - 1 }"
                      @click="handleWheelItemClick('start', 'minute', m - 1)"
                    >{{ pad(m - 1) }}</div>
                  </div>
                </div>
                <div
                  class="m-time-picker__time-wheel-container"
                  ref="startSecondWheelRef"
                  @scroll="handleWheelScroll('start', 'second', $event)"
                >
                  <div class="m-time-picker__time-wheel-list">
                    <div
                      v-for="s in 60"
                      :key="s"
                      class="m-time-picker__time-wheel-item"
                      :class="{ 'is-active': startSecond === s - 1 }"
                      @click="handleWheelItemClick('start', 'second', s - 1)"
                    >{{ pad(s - 1) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="m-time-picker__range-sep">~</div>

            <div class="m-time-picker__range-group">
              <div class="m-time-picker__range-label">结束</div>
              <div class="m-time-picker__time-labels">
                <span>时</span>
                <span>分</span>
                <span>秒</span>
              </div>
              <div class="m-time-picker__time-wheel-row">
                <div
                  class="m-time-picker__time-wheel-container"
                  ref="endHourWheelRef"
                  @scroll="handleWheelScroll('end', 'hour', $event)"
                >
                  <div class="m-time-picker__time-wheel-list">
                    <div
                      v-for="h in 24"
                      :key="h"
                      class="m-time-picker__time-wheel-item"
                      :class="{ 'is-active': endHour === h - 1 }"
                      @click="handleWheelItemClick('end', 'hour', h - 1)"
                    >{{ pad(h - 1) }}</div>
                  </div>
                </div>
                <div
                  class="m-time-picker__time-wheel-container"
                  ref="endMinuteWheelRef"
                  @scroll="handleWheelScroll('end', 'minute', $event)"
                >
                  <div class="m-time-picker__time-wheel-list">
                    <div
                      v-for="m in 60"
                      :key="m"
                      class="m-time-picker__time-wheel-item"
                      :class="{ 'is-active': endMinute === m - 1 }"
                      @click="handleWheelItemClick('end', 'minute', m - 1)"
                    >{{ pad(m - 1) }}</div>
                  </div>
                </div>
                <div
                  class="m-time-picker__time-wheel-container"
                  ref="endSecondWheelRef"
                  @scroll="handleWheelScroll('end', 'second', $event)"
                >
                  <div class="m-time-picker__time-wheel-list">
                    <div
                      v-for="s in 60"
                      :key="s"
                      class="m-time-picker__time-wheel-item"
                      :class="{ 'is-active': endSecond === s - 1 }"
                      @click="handleWheelItemClick('end', 'second', s - 1)"
                    >{{ pad(s - 1) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { usePopper } from '../../../hooks/usePopper'
import { useZIndex } from '../../../hooks/useZIndex'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MTimePicker' })

const props = withDefaults(defineProps<{
  modelValue?: string | string[]
  size?: 'small' | 'default' | 'large'
  disabled?: boolean
  clearable?: boolean
  editable?: boolean
  placeholder?: string
  valueFormat?: string
  placement?: string
  popperClass?: string
  isRange?: boolean
}>(), {
  modelValue: '',
  size: 'default',
  disabled: false,
  clearable: false,
  editable: true,
  placeholder: '请选择时间',
  valueFormat: '',
  placement: 'bottom-start',
  popperClass: '',
  isRange: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
  change: [value: string | string[]]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  show: []
  hide: []
  clear: []
}>()

const { effectiveDisabled, effectiveSize } = useFormItem(props)
const { nextZIndex } = useZIndex()

const wrapperRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

// 单组滚轮 refs（!isRange 用）
const hourWheelRef = ref<HTMLElement | null>(null)
const minuteWheelRef = ref<HTMLElement | null>(null)
const secondWheelRef = ref<HTMLElement | null>(null)
// 范围模式两组 refs
const startHourWheelRef = ref<HTMLElement | null>(null)
const startMinuteWheelRef = ref<HTMLElement | null>(null)
const startSecondWheelRef = ref<HTMLElement | null>(null)
const endHourWheelRef = ref<HTMLElement | null>(null)
const endMinuteWheelRef = ref<HTMLElement | null>(null)
const endSecondWheelRef = ref<HTMLElement | null>(null)

let isSyncingWheels = false

const focused = ref(false)
const hovered = ref(false)
const typing = ref(false)
const inputBuffer = ref('')

// 单组时间状态（!isRange 用 start* 表示）
const startHour = ref(0)
const startMinute = ref(0)
const startSecond = ref(0)
// 范围结束组
const endHour = ref(0)
const endMinute = ref(0)
const endSecond = ref(0)

// ===== 尺寸配置 =====
const sizeConfig = computed(() => {
  switch (effectiveSize.value) {
    case 'small': return { cellH: 24, wheelW: 44 }
    case 'large': return { cellH: 32, wheelW: 52 }
    default: return { cellH: 28, wheelW: 48 }
  }
})
const wheelItemHeight = computed(() => sizeConfig.value.cellH)

const panelVars = computed(() => ({
  '--mtp-cell-h': `${sizeConfig.value.cellH}px`,
  '--mtp-wheel-h': `${sizeConfig.value.cellH * 5}px`,
  '--mtp-wheel-item-h': `${sizeConfig.value.cellH}px`,
  '--mtp-wheel-pad': `${sizeConfig.value.cellH * 2}px`,
  '--mtp-wheel-w': `${sizeConfig.value.wheelW}px`,
}))

const popperStyle = computed(() => ({
  zIndex: String(nextZIndex()),
}))

const classes = computed(() => [
  'm-time-picker',
  `m-time-picker--${effectiveSize.value}`,
  {
    'm-time-picker--disabled': effectiveDisabled.value,
  },
])

// ===== 工具函数 =====
function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function formatByPattern(h: number, m: number, s: number, fmt: string): string {
  const map: Record<string, string> = {
    'HH': pad(h),
    'mm': pad(m),
    'ss': pad(s),
    'H': String(h),
    'm': String(m),
    's': String(s),
  }
  return fmt.replace(/HH|mm|ss|H|m|s/g, (mt) => map[mt])
}

function formatValue(h: number, m: number, s: number): string {
  if (props.valueFormat) return formatByPattern(h, m, s, props.valueFormat)
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

function parseTime(val: string): { h: number; m: number; s: number } | null {
  if (!val) return null
  const parts = val.split(':').map((p) => parseInt(p, 10))
  if (parts.length < 2 || parts.some(isNaN)) return null
  const h = Math.max(0, Math.min(23, parts[0]))
  const m = Math.max(0, Math.min(59, parts[1]))
  const s = parts.length >= 3 ? Math.max(0, Math.min(59, parts[2])) : 0
  return { h, m, s }
}

// ===== 显示值 =====
const isRange = computed(() => props.isRange)

const hasValue = computed(() => {
  if (isRange.value) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  }
  return !!props.modelValue
})

const displayValue = computed(() => {
  if (typing.value) return inputBuffer.value
  if (isRange.value) {
    const arr = Array.isArray(props.modelValue) ? props.modelValue : []
    if (!arr || arr.length === 0) return ''
    if (arr.length === 1) return arr[0]
    return `${arr[0]} ~ ${arr[1]}`
  }
  if (!props.modelValue) return ''
  const parsed = parseTime(props.modelValue as string)
  if (!parsed) return props.modelValue as string
  return formatValue(parsed.h, parsed.m, parsed.s)
})

// ===== modelValue 同步 =====
watch(() => props.modelValue, (val) => {
  if (isRange.value) {
    const arr = Array.isArray(val) ? val : []
    if (arr[0]) {
      const p = parseTime(arr[0])
      if (p) { startHour.value = p.h; startMinute.value = p.m; startSecond.value = p.s }
    }
    if (arr[1]) {
      const p = parseTime(arr[1])
      if (p) { endHour.value = p.h; endMinute.value = p.m; endSecond.value = p.s }
    }
    nextTick(syncWheels)
    return
  }
  const parsed = parseTime((val as string) || '')
  if (parsed) {
    startHour.value = parsed.h
    startMinute.value = parsed.m
    startSecond.value = parsed.s
  }
  nextTick(syncWheels)
}, { immediate: true })

// ===== 滚轮逻辑 =====
type Group = 'start' | 'end'
type Field = 'hour' | 'minute' | 'second'

function getTimeValue(group: Group, field: Field): number {
  const isStart = group === 'start'
  if (field === 'hour') return isStart ? startHour.value : endHour.value
  if (field === 'minute') return isStart ? startMinute.value : endMinute.value
  return isStart ? startSecond.value : endSecond.value
}

function setTimeValue(group: Group, field: Field, n: number) {
  const isStart = group === 'start'
  if (field === 'hour') (isStart ? startHour : endHour).value = n
  else if (field === 'minute') (isStart ? startMinute : endMinute).value = n
  else (isStart ? startSecond : endSecond).value = n
}

function getWheelRef(group: Group, field: Field): typeof hourWheelRef {
  if (!isRange.value) {
    // 单组模式：忽略 group，使用 hourWheelRef/minuteWheelRef/secondWheelRef
    if (field === 'hour') return hourWheelRef
    if (field === 'minute') return minuteWheelRef
    return secondWheelRef
  }
  if (group === 'start') {
    if (field === 'hour') return startHourWheelRef
    if (field === 'minute') return startMinuteWheelRef
    return startSecondWheelRef
  }
  if (field === 'hour') return endHourWheelRef
  if (field === 'minute') return endMinuteWheelRef
  return endSecondWheelRef
}

let wheelScrollTimer: ReturnType<typeof setTimeout> | null = null

function handleWheelScroll(group: Group, field: Field, event: Event) {
  if (isSyncingWheels) return
  const target = event.target as HTMLElement
  if (wheelScrollTimer) clearTimeout(wheelScrollTimer)
  wheelScrollTimer = setTimeout(() => {
    const itemH = wheelItemHeight.value
    const idx = Math.round(target.scrollTop / itemH)
    const max = field === 'hour' ? 23 : 59
    const clamped = Math.max(0, Math.min(max, idx))
    if (getTimeValue(group, field) !== clamped) {
      setTimeValue(group, field, clamped)
      emitValue()
    }
    const exactTop = clamped * itemH
    if (Math.abs(target.scrollTop - exactTop) > 1) {
      isSyncingWheels = true
      target.scrollTop = exactTop
      nextTick(() => { isSyncingWheels = false })
    }
  }, 80)
}

function handleWheelItemClick(group: Group, field: Field, value: number) {
  if (effectiveDisabled.value) return
  setTimeValue(group, field, value)
  emitValue()
  scrollToWheel(group, field)
}

function scrollToWheel(group: Group, field: Field) {
  const el = getWheelRef(group, field).value
  if (!el) return
  const itemH = wheelItemHeight.value
  const targetTop = getTimeValue(group, field) * itemH
  if (Math.abs(el.scrollTop - targetTop) < 1) return
  isSyncingWheels = true
  el.scrollTop = targetTop
  nextTick(() => { isSyncingWheels = false })
}

function syncWheels() {
  nextTick(() => {
    if (isRange.value) {
      scrollToWheel('start', 'hour')
      scrollToWheel('start', 'minute')
      scrollToWheel('start', 'second')
      scrollToWheel('end', 'hour')
      scrollToWheel('end', 'minute')
      scrollToWheel('end', 'second')
    } else {
      scrollToWheel('start', 'hour')
      scrollToWheel('start', 'minute')
      scrollToWheel('start', 'second')
    }
  })
}

onMounted(() => {
  syncWheels()
})

watch(wheelItemHeight, () => {
  syncWheels()
})

function setNow() {
  if (effectiveDisabled.value) return
  const d = new Date()
  startHour.value = d.getHours()
  startMinute.value = d.getMinutes()
  startSecond.value = d.getSeconds()
  emitValue()
  syncWheels()
}

// ===== 输出 =====
function emitValue() {
  if (isRange.value) {
    const out = [
      formatValue(startHour.value, startMinute.value, startSecond.value),
      formatValue(endHour.value, endMinute.value, endSecond.value),
    ]
    emit('update:modelValue', out)
    emit('change', out)
    return
  }
  const out = formatValue(startHour.value, startMinute.value, startSecond.value)
  emit('update:modelValue', out)
  emit('change', out)
}

// ===== Popper =====
const { visible: popperVisible, show, hide, toggle } = usePopper(
  wrapperRef,
  popperRef,
  arrowRef,
  {
    placement: props.placement as any,
    offset: 6,
    trigger: 'manual',
  }
)

watch(popperVisible, (val) => {
  emit(val ? 'show' : 'hide')
  if (val) {
    nextTick(syncWheels)
  }
})

function handleTriggerClick() {
  if (effectiveDisabled.value) return
  if (!focused.value) {
    inputRef.value?.focus()
  }
  toggle()
}

function handleFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  focused.value = false
  if (typing.value) {
    typing.value = false
    handleInputCommit()
  }
  emit('blur', event)
}

function handleInput(event: Event) {
  if (!props.editable || isRange.value) return
  const target = event.target as HTMLInputElement
  inputBuffer.value = target.value
  typing.value = true
}

function handleInputCommit() {
  typing.value = false
  if (isRange.value) return
  const parsed = parseTime(inputBuffer.value)
  if (parsed) {
    startHour.value = parsed.h
    startMinute.value = parsed.m
    startSecond.value = parsed.s
    emitValue()
    syncWheels()
  } else {
    inputBuffer.value = ''
  }
}

function handleClear() {
  startHour.value = 0
  startMinute.value = 0
  startSecond.value = 0
  endHour.value = 0
  endMinute.value = 0
  endSecond.value = 0
  inputBuffer.value = ''
  typing.value = false
  const out = isRange.value ? [] : ''
  emit('update:modelValue', out as any)
  emit('change', out as any)
  emit('clear')
}

// ===== 点击外部关闭 =====
function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node
  if (popperVisible.value) {
    if (wrapperRef.value?.contains(target) || popperRef.value?.contains(target)) {
      return
    }
    hide()
  }
}

watch(popperVisible, (val) => {
  if (val) {
    setTimeout(() => document.addEventListener('click', handleDocumentClick), 0)
  } else {
    document.removeEventListener('click', handleDocumentClick)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  if (wheelScrollTimer) clearTimeout(wheelScrollTimer)
})

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => {
    inputRef.value?.blur()
    hide()
  },
})
</script>

<style lang="scss">
.m-time-picker {
  display: inline-block;
  vertical-align: middle;

  &__trigger {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0 8px;
    background-color: #fff;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    cursor: pointer;
    box-sizing: border-box;
    transition: border-color 0.2s;
    user-select: none;

    &:hover {
      border-color: var(--mosaic-primary);
    }

    &.is-open,
    &.is-focused {
      border-color: var(--mosaic-primary);
    }

    &.is-empty {
      cursor: text;
    }
  }

  &__prefix,
  &__suffix,
  &__clear {
    display: inline-flex;
    align-items: center;
    color: var(--mosaic-text-placeholder);
    flex-shrink: 0;
    transition: color 0.2s, transform 0.2s;
  }

  &__prefix {
    color: var(--mosaic-text-secondary);
  }

  &__suffix.is-open {
    transform: rotate(180deg);
    color: var(--mosaic-primary);
  }

  &__clear {
    cursor: pointer;
    color: var(--mosaic-text-placeholder);

    &:hover {
      color: var(--mosaic-text-regular);
    }
  }

  &__input {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: none;
    outline: none;
    background: none;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
    cursor: inherit;
    padding: 0;

    &::placeholder {
      color: var(--mosaic-text-placeholder);
    }

    &:disabled {
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;
    }
  }

  /* 尺寸 */
  &--small {
    .m-time-picker__trigger {
      height: 24px;
    }
  }

  &--default {
    .m-time-picker__trigger {
      height: 32px;
    }
  }

  &--large {
    .m-time-picker__trigger {
      height: 40px;
    }
  }

  /* 禁用 */
  &--disabled {
    .m-time-picker__trigger {
      background-color: var(--mosaic-disabled-bg-color);
      border-color: var(--mosaic-disabled-border-color);
      cursor: not-allowed;

      &:hover {
        border-color: var(--mosaic-disabled-border-color);
      }
    }

    .m-time-picker__prefix,
    .m-time-picker__suffix {
      color: var(--mosaic-disabled-text-color);
    }
  }

  /* 弹出层 */
  &__popper {
    position: absolute;
    padding: 4px;
    background-color: #fff;
    border-radius: var(--mosaic-border-radius);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  }

  &__panel {
    padding: 8px 12px 10px;
  }

  &__panel--range {
    display: flex;
    align-items: stretch;
    gap: 12px;
  }

  &__range-group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__range-label {
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-secondary);
    margin-bottom: 4px;
  }

  &__range-sep {
    display: flex;
    align-items: center;
    color: var(--mosaic-text-placeholder);
    padding: 0 4px;
  }

  &__time-labels {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 4px;

    span {
      width: var(--mtp-wheel-w);
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
      height: var(--mtp-cell-h);
      transform: translateY(-50%);
      background-color: var(--mosaic-fill-color-light);
      border-radius: 4px;
      pointer-events: none;
      z-index: 0;
    }
  }

  &__time-wheel-container {
    width: var(--mtp-wheel-w);
    height: var(--mtp-wheel-h);
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
    padding: var(--mtp-wheel-pad) 0;
  }

  &__time-wheel-item {
    height: var(--mtp-wheel-item-h);
    line-height: var(--mtp-wheel-item-h);
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
}
</style>
