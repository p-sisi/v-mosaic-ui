<template>
  <div :class="classes" ref="wrapperRef">
    <div
      class="m-date-picker__trigger"
      :class="{ 'is-open': popperVisible, 'is-empty': !hasValue, 'is-focused': focused, 'is-hover': hovered }"
      @click="handleTriggerClick"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <span class="m-date-picker__prefix">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </span>

      <input
        ref="inputRef"
        class="m-date-picker__input"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="effectiveDisabled"
        :readonly="!editable || isMulti || isRange"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @keydown.enter="handleInputCommit"
      />

      <span
        v-if="clearable && hasValue && !effectiveDisabled && (hovered || focused)"
        class="m-date-picker__clear"
        @mousedown.prevent.stop="handleClear"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </span>
      <span v-else class="m-date-picker__suffix" :class="{ 'is-open': popperVisible }">
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
          class="m-date-picker__popper"
          :class="popperClass"
          :style="popperStyle"
        >
          <MDatePickerPanel
            v-if="!isRange"
            v-model="innerValue"
            :type="type"
            :size="effectiveSize"
            :disabled="false"
            :disabled-date="disabledDate"
            :first-day-of-week="firstDayOfWeek"
            :value-format="valueFormat"
            @change="handlePanelChange"
            @select="handlePanelSelect"
          >
            <template v-if="$slots.footer" #footer>
              <slot name="footer" />
            </template>
          </MDatePickerPanel>
          <MDateRangePickerPanel
            v-else
            v-model="rangeValue"
            :size="effectiveSize"
            :disabled-date="disabledDate"
            :first-day-of-week="firstDayOfWeek"
            :value-format="valueFormat"
            @change="handleRangeChange"
            @select="handleRangeSelect"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { usePopper } from '../../../hooks/usePopper'
import { useZIndex } from '../../../hooks/useZIndex'
import { useFormItem } from '../../../hooks/useFormItem'
import MDatePickerPanel from './DatePickerPanel.vue'
import MDateRangePickerPanel from './DateRangePickerPanel.vue'

defineOptions({ name: 'MDatePicker' })

type DatePickerType = 'date' | 'datetime' | 'month' | 'year' | 'week' | 'weeks' | 'months' | 'years' | 'range'

const props = withDefaults(defineProps<{
  modelValue?: string | Date | string[] | string[][]
  type?: DatePickerType
  disabled?: boolean
  size?: 'small' | 'default' | 'large'
  clearable?: boolean
  editable?: boolean
  placeholder?: string
  format?: string               // 输入框显示格式
  valueFormat?: string          // 绑定值输出格式
  disabledDate?: (date: Date) => boolean
  firstDayOfWeek?: number
  placement?: string
  popperClass?: string
}>(), {
  modelValue: '',
  type: 'date',
  disabled: false,
  size: 'default',
  clearable: false,
  editable: true,
  placeholder: '请选择日期',
  format: '',
  valueFormat: '',
  disabledDate: () => false,
  firstDayOfWeek: 1,
  placement: 'bottom-start',
  popperClass: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[] | string[][]]
  change: [value: string | string[] | string[][]]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
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

const innerValue = ref<string | string[] | string[][]>(cloneModelValue(props.modelValue))
const focused = ref(false)
const hovered = ref(false)
const typing = ref(false)
const inputBuffer = ref('')

const isMulti = computed(() => ['week', 'weeks', 'months', 'years'].includes(props.type as string))
const isRange = computed(() => props.type === 'range')

// range 模式专用值
const rangeValue = ref<string[]>(Array.isArray(props.modelValue) ? [...(props.modelValue as string[])] : [])

function handleRangeChange(val: string[]) {
  emit('change', val)
}
function handleRangeSelect(val: string[]) {
  // 选完区间后关闭
  hide()
}

function cloneModelValue(val: string | Date | string[] | string[][]): string | string[] | string[][] {
  if (Array.isArray(val)) return val.slice()
  return val as string
}

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
})

// ===== 值格式化 =====
function parseValue(val: string | Date): Date | null {
  if (!val) return null
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val
  const d = new Date(val)
  return isNaN(d.getTime()) ? null : d
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
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

function formatDateDisplay(d: Date): string {
  if (props.format) return formatByPattern(d, props.format)
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

// 多选值展示
function formatMultiDisplay(val: string[] | string[][]): string {
  if (!val || val.length === 0) return ''
  if (props.type === 'week') {
    const pair = val as string[]
    return pair.length === 2 ? `${pair[0]} ~ ${pair[1]}` : ''
  }
  if (props.type === 'weeks') {
    return (val as string[][]).map((r) => `${r[0]} ~ ${r[1]}`).join(', ')
  }
  return (val as string[]).join(', ')
}

// ===== 显示值 =====
const hasValue = computed(() => {
  if (isRange.value) return rangeValue.value.length > 0
  if (isMulti.value) return Array.isArray(innerValue.value) && innerValue.value.length > 0
  return !!innerValue.value
})

const displayValue = computed(() => {
  if (typing.value) return inputBuffer.value
  if (isRange.value) {
    const arr = rangeValue.value
    if (!arr || arr.length === 0) return ''
    if (arr.length === 1) return arr[0]
    return `${arr[0]} ~ ${arr[1]}`
  }
  if (isMulti.value) {
    return formatMultiDisplay(innerValue.value as string[] | string[][])
  }
  const s = innerValue.value as string
  if (!s) return ''
  const d = parseValue(s)
  if (!d) return s
  return formatDateDisplay(d)
})

// ===== modelValue 同步 =====
watch(() => props.modelValue, (val) => {
  if (isRange.value) {
    const arr = Array.isArray(val) ? [...(val as string[])] : []
    if (JSON.stringify(arr) !== JSON.stringify(rangeValue.value)) {
      rangeValue.value = arr
    }
    return
  }
  if (isMulti.value) {
    const arr = Array.isArray(val) ? val.slice() : []
    if (JSON.stringify(arr) !== JSON.stringify(innerValue.value)) {
      innerValue.value = arr as string[] | string[][]
    }
    return
  }
  const s = val as string
  if (s !== innerValue.value) {
    innerValue.value = s
  }
})

watch(innerValue, (val) => {
  if (isRange.value) return
  if (isMulti.value) {
    emit('update:modelValue', val as string[] | string[][])
    return
  }
  emit('update:modelValue', val as string)
})

watch(rangeValue, (val) => {
  if (!isRange.value) return
  emit('update:modelValue', [...val])
})

// ===== 交互 =====
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
  if (!props.editable || isMulti.value || isRange.value) return
  const target = event.target as HTMLInputElement
  inputBuffer.value = target.value
  typing.value = true
}

function handleInputCommit() {
  typing.value = false
  if (isMulti.value || isRange.value) return
  const parsed = parseValue(inputBuffer.value)
  if (parsed) {
    innerValue.value = `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}`
    emit('change', innerValue.value as string)
  } else {
    inputBuffer.value = ''
  }
}

function handleClear() {
  if (isRange.value) {
    rangeValue.value = []
    inputBuffer.value = ''
    typing.value = false
    emit('clear')
    emit('change', [])
    return
  }
  if (isMulti.value) {
    innerValue.value = []
    inputBuffer.value = ''
    typing.value = false
    emit('clear')
    emit('change', [])
    return
  }
  innerValue.value = ''
  inputBuffer.value = ''
  typing.value = false
  emit('clear')
  emit('change', '')
}

function handlePanelChange(val: string | string[] | string[][]) {
  emit('change', val)
}

function handlePanelSelect() {
  // 单选类型选中后关闭；datetime 需选时间，weeks/months/years 需多选，不关闭
  if (['date', 'month', 'year', 'week'].includes(props.type)) {
    hide()
  }
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

// ===== 样式 =====
const popperStyle = computed(() => ({
  zIndex: String(nextZIndex()),
}))

const classes = computed(() => [
  'm-date-picker',
  `m-date-picker--${effectiveSize.value}`,
  {
    'm-date-picker--disabled': effectiveDisabled.value,
  },
])
</script>

<style lang="scss">
.m-date-picker {
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
    .m-date-picker__trigger {
      height: 24px;
    }
  }

  &--default {
    .m-date-picker__trigger {
      height: 32px;
    }
  }

  &--large {
    .m-date-picker__trigger {
      height: 40px;
    }
  }

  /* 禁用 */
  &--disabled {
    .m-date-picker__trigger {
      background-color: var(--mosaic-disabled-bg-color);
      border-color: var(--mosaic-disabled-border-color);
      cursor: not-allowed;

      &:hover {
        border-color: var(--mosaic-disabled-border-color);
      }
    }

    .m-date-picker__prefix,
    .m-date-picker__suffix {
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

    .m-date-picker-panel {
      border: none;
    }
  }
}
</style>
