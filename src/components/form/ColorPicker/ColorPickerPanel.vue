<template>
  <div :class="classes">
    <!-- 上部：SV 面板 + 右侧 Hue / Alpha 滑块 -->
    <div class="m-color-picker-panel__main">
      <div
        ref="svPanelRef"
        class="m-color-picker-panel__sv"
        :style="svStyle"
        @mousedown="handleSvDown"
      >
        <span class="m-color-picker-panel__sv-pointer" :style="svPointerStyle" />
      </div>

      <div class="m-color-picker-panel__sliders">
        <div
          ref="hueRef"
          class="m-color-picker-panel__hue-bar"
          @mousedown="handleHueDown"
        >
          <span class="m-color-picker-panel__hue-thumb" :style="hueThumbStyle" />
        </div>

        <div
          v-if="showAlpha"
          ref="alphaRef"
          class="m-color-picker-panel__alpha-bar"
          :style="alphaBarStyle"
          @mousedown="handleAlphaDown"
        >
          <span class="m-color-picker-panel__alpha-thumb" :style="alphaThumbStyle" />
        </div>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="m-color-picker-panel__input">
      <input
        ref="inputRef"
        class="m-color-picker-panel__input-inner"
        :value="inputValue"
        :disabled="effectiveDisabled"
        @input="handleInput"
        @keydown.enter="handleInputCommit"
        @blur="handleInputCommit"
      />
    </div>

    <!-- 预设颜色（predefine） -->
    <div v-if="predefine && predefine.length > 0" class="m-color-picker-panel__predefine">
      <span
        v-for="(color, idx) in predefine"
        :key="idx"
        class="m-color-picker-panel__predefine-item"
        :class="{ 'is-active': isPredefineActive(color) }"
        :style="{ backgroundColor: color }"
        @click="handlePredefineClick(color)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onUnmounted } from 'vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MColorPickerPanel' })

const props = withDefaults(defineProps<{
  modelValue?: string                 // 绑定值，hex 或 rgba 字符串
  showAlpha?: boolean                 // 是否显示 alpha 透明度滑块
  predefine?: string[]                // 预设颜色数组
  disabled?: boolean                  // 是否禁用
  colorFormat?: 'hex' | 'rgb'         // 输出格式（hex 时 show-alpha 仍输出 rgba）
}>(), {
  modelValue: '',
  showAlpha: false,
  predefine: () => [],
  disabled: false,
  colorFormat: 'hex',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  activeChange: [value: string]
}>()

const { effectiveDisabled } = useFormItem(props)

// ===== 内部状态：HSV + Alpha =====
const hue = ref(0)            // 0-360
const saturation = ref(100)   // 0-100
const value = ref(100)        // 0-100
const alpha = ref(1)          // 0-1

const svPanelRef = ref<HTMLElement | null>(null)
const hueRef = ref<HTMLElement | null>(null)
const alphaRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const inputValue = ref('')
const typing = ref(false)          // 用户正在输入框中编辑

// ===== 颜色转换工具 =====
function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  h = h % 360
  s = s / 100
  v = v / 100
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c
  let r = 0, g = 0, b = 0
  if (h < 60) { r = c; g = x; b = 0 }
  else if (h < 120) { r = x; g = c; b = 0 }
  else if (h < 180) { r = 0; g = c; b = x }
  else if (h < 240) { r = 0; g = x; b = c }
  else if (h < 300) { r = x; g = 0; b = c }
  else { r = c; g = 0; b = x }
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ]
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  const s = max === 0 ? 0 : (d / max) * 100
  const v = max * 100
  return [Math.round(h), Math.round(s), Math.round(v)]
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function hexToRgb(hex: string): [number, number, number] | null {
  let h = hex.replace('#', '').trim()
  if (h.length === 3) {
    h = h.split('').map(c => c + c).join('')
  }
  if (h.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(h)) return null
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

// 解析任意颜色字符串为 [r, g, b, a]
function parseColor(str: string): { r: number; g: number; b: number; a: number } | null {
  if (!str) return null
  str = str.trim()
  // hex8: #rrggbbaa
  let m = str.match(/^#([0-9a-fA-F]{8})$/)
  if (m) {
    const h = m[1]
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: parseInt(h.slice(6, 8), 16) / 255,
    }
  }
  // hex6 / hex3
  const rgb = hexToRgb(str)
  if (rgb) return { r: rgb[0], g: rgb[1], b: rgb[2], a: 1 }
  // rgba / rgb
  m = str.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i)
  if (m) {
    return {
      r: parseInt(m[1]),
      g: parseInt(m[2]),
      b: parseInt(m[3]),
      a: m[4] !== undefined ? Math.max(0, Math.min(1, parseFloat(m[4]))) : 1,
    }
  }
  return null
}

// ===== 输出值计算 =====
const outputValue = computed(() => {
  const [r, g, b] = hsvToRgb(hue.value, saturation.value, value.value)
  if (props.showAlpha || props.colorFormat === 'rgb') {
    return `rgba(${r}, ${g}, ${b}, ${alpha.value})`
  }
  return rgbToHex(r, g, b)
})

// ===== 样式计算 =====
const currentRgb = computed(() => {
  return hsvToRgb(hue.value, 100, 100) // 纯色相对应的 RGB，用于 SV 面板背景
})

const svStyle = computed(() => ({
  backgroundColor: `rgb(${currentRgb.value[0]}, ${currentRgb.value[1]}, ${currentRgb.value[2]})`,
}))

const svPointerStyle = computed(() => ({
  left: `${saturation.value}%`,
  top: `${100 - value.value}%`,
}))

const hueThumbStyle = computed(() => ({
  top: `${(hue.value / 360) * 100}%`,
}))

const alphaThumbStyle = computed(() => ({
  top: `${(1 - alpha.value) * 100}%`,
}))

const alphaBarStyle = computed(() => {
  const [r, g, b] = hsvToRgb(hue.value, saturation.value, value.value)
  const from = `rgba(${r}, ${g}, ${b}, 1)`
  const to = `rgba(${r}, ${g}, ${b}, 0)`
  return {
    background: `linear-gradient(to bottom, ${from}, ${to})`,
  }
})

const classes = computed(() => [
  'm-color-picker-panel',
  {
    'm-color-picker-panel--disabled': effectiveDisabled.value,
  },
])

// ===== 同步 modelValue -> 内部状态 =====
function syncFromModelValue() {
  const parsed = parseColor(props.modelValue)
  if (!parsed) {
    // 无效值时保持默认或清空
    inputValue.value = props.modelValue || ''
    return
  }
  const [h, s, v] = rgbToHsv(parsed.r, parsed.g, parsed.b)
  hue.value = h
  saturation.value = s
  value.value = v
  alpha.value = parsed.a
  inputValue.value = formatInputDisplay()
}

function formatInputDisplay(): string {
  const [r, g, b] = hsvToRgb(hue.value, saturation.value, value.value)
  if (props.showAlpha) {
    // hex8 形式便于编辑
    const a = Math.round(alpha.value * 255).toString(16).padStart(2, '0')
    return `${rgbToHex(r, g, b)}${a}`
  }
  return rgbToHex(r, g, b)
}

watch(() => props.modelValue, () => {
  syncFromModelValue()
}, { immediate: true })

watch([hue, saturation, value, alpha], () => {
  // 用户正在输入框编辑时不覆盖其文本
  if (!typing.value) {
    inputValue.value = formatInputDisplay()
  }
  const out = outputValue.value
  emit('update:modelValue', out)
  emit('change', out)
})

// ===== 输入框处理 =====
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
  typing.value = true
  // 实时尝试解析，有效则同步面板
  const parsed = parseColor(target.value)
  if (parsed) {
    const [h, s, v] = rgbToHsv(parsed.r, parsed.g, parsed.b)
    hue.value = h
    saturation.value = s
    value.value = v
    alpha.value = parsed.a
  }
}

function handleInputCommit() {
  typing.value = false
  const parsed = parseColor(inputValue.value)
  if (parsed) {
    const [h, s, v] = rgbToHsv(parsed.r, parsed.g, parsed.b)
    hue.value = h
    saturation.value = s
    value.value = v
    alpha.value = parsed.a
    emit('activeChange', outputValue.value)
  } else {
    // 无效输入恢复为当前面板对应值
    inputValue.value = formatInputDisplay()
  }
}

// ===== SV 面板拖拽 =====
let svDragging = false

function updateSvFromEvent(event: MouseEvent) {
  if (!svPanelRef.value) return
  const rect = svPanelRef.value.getBoundingClientRect()
  let x = (event.clientX - rect.left) / rect.width
  let y = (event.clientY - rect.top) / rect.height
  x = Math.max(0, Math.min(1, x))
  y = Math.max(0, Math.min(1, y))
  saturation.value = Math.round(x * 100)
  value.value = Math.round((1 - y) * 100)
}

function handleSvDown(event: MouseEvent) {
  if (effectiveDisabled.value) return
  svDragging = true
  updateSvFromEvent(event)
  window.addEventListener('mousemove', handleSvMove)
  window.addEventListener('mouseup', handleDragEnd)
}

function handleSvMove(event: MouseEvent) {
  if (!svDragging) return
  updateSvFromEvent(event)
}

// ===== Hue 滑块拖拽 =====
let hueDragging = false

function updateHueFromEvent(event: MouseEvent) {
  if (!hueRef.value) return
  const rect = hueRef.value.getBoundingClientRect()
  let y = (event.clientY - rect.top) / rect.height
  y = Math.max(0, Math.min(1, y))
  hue.value = Math.round(y * 360)
}

function handleHueDown(event: MouseEvent) {
  if (effectiveDisabled.value) return
  hueDragging = true
  updateHueFromEvent(event)
  window.addEventListener('mousemove', handleHueMove)
  window.addEventListener('mouseup', handleDragEnd)
}

function handleHueMove(event: MouseEvent) {
  if (!hueDragging) return
  updateHueFromEvent(event)
}

// ===== Alpha 滑块拖拽 =====
let alphaDragging = false

function updateAlphaFromEvent(event: MouseEvent) {
  if (!alphaRef.value) return
  const rect = alphaRef.value.getBoundingClientRect()
  let y = (event.clientY - rect.top) / rect.height
  y = Math.max(0, Math.min(1, y))
  // 顶部 = 不透明 (alpha=1)，底部 = 透明 (alpha=0)
  alpha.value = Math.round((1 - y) * 100) / 100
}

function handleAlphaDown(event: MouseEvent) {
  if (effectiveDisabled.value) return
  alphaDragging = true
  updateAlphaFromEvent(event)
  window.addEventListener('mousemove', handleAlphaMove)
  window.addEventListener('mouseup', handleDragEnd)
}

function handleAlphaMove(event: MouseEvent) {
  if (!alphaDragging) return
  updateAlphaFromEvent(event)
}

function handleDragEnd() {
  svDragging = false
  hueDragging = false
  alphaDragging = false
  window.removeEventListener('mousemove', handleSvMove)
  window.removeEventListener('mousemove', handleHueMove)
  window.removeEventListener('mousemove', handleAlphaMove)
  window.removeEventListener('mouseup', handleDragEnd)
}

// ===== 预设颜色 =====
function isPredefineActive(color: string): boolean {
  const parsed = parseColor(color)
  if (!parsed) return false
  return outputValue.value.toLowerCase() === (props.showAlpha
    ? `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${parsed.a})`
    : rgbToHex(parsed.r, parsed.g, parsed.b)).toLowerCase()
}

function handlePredefineClick(color: string) {
  if (effectiveDisabled.value) return
  const parsed = parseColor(color)
  if (!parsed) return
  const [h, s, v] = rgbToHsv(parsed.r, parsed.g, parsed.b)
  hue.value = h
  saturation.value = s
  value.value = v
  alpha.value = parsed.a
  emit('activeChange', outputValue.value)
}

onUnmounted(() => {
  window.removeEventListener('mousemove', handleSvMove)
  window.removeEventListener('mousemove', handleHueMove)
  window.removeEventListener('mousemove', handleAlphaMove)
  window.removeEventListener('mouseup', handleDragEnd)
})

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<style lang="scss">
.m-color-picker-panel {
  width: 320px;
  padding: 12px;
  background-color: #fff;
  border: 1px solid var(--mosaic-border-color);
  border-radius: var(--mosaic-border-radius);
  box-sizing: border-box;
  font-size: var(--mosaic-font-size);
  user-select: none;

  /* 上部主区域：SV 面板 + 右侧滑块 */
  &__main {
    display: flex;
    gap: 10px;
  }

  &__sliders {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 14px;
    flex-shrink: 0;
  }

  /* SV 面板 */
  &__sv {
    position: relative;
    flex: 1;
    height: 180px;
    border-radius: var(--mosaic-border-radius);
    cursor: crosshair;
    overflow: hidden;
    background-image:
      linear-gradient(to top, #000, transparent),
      linear-gradient(to right, #fff, transparent);
  }

  &__sv-pointer {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }

  /* Hue 滑块（垂直） */
  &__hue-bar {
    position: relative;
    flex: 1;
    width: 14px;
    height: 180px;
    border-radius: 7px;
    background: linear-gradient(
      to bottom,
      #f00 0%,
      #ff0 16.66%,
      #0f0 33.33%,
      #0ff 50%,
      #00f 66.66%,
      #f0f 83.33%,
      #f00 100%
    );
    cursor: pointer;
  }

  &__hue-thumb {
    position: absolute;
    left: 50%;
    width: 16px;
    height: 4px;
    border: 1px solid #fff;
    border-radius: 2px;
    background-color: #fff;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }

  /* 输入框 */
  &__input {
    margin-top: 12px;
  }

  &__input-inner {
    width: 100%;
    height: 28px;
    padding: 0 8px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-primary);
    background-color: #fff;
    box-sizing: border-box;
    outline: none;
    text-transform: lowercase;
    transition: border-color 0.2s;

    &:focus {
      border-color: var(--mosaic-primary);
    }

    &:disabled {
      background-color: var(--mosaic-disabled-bg-color);
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;
    }
  }

  /* Alpha 滑块（垂直） */
  &__alpha-bar {
    position: relative;
    flex: 1;
    width: 14px;
    height: 180px;
    border-radius: 7px;
    cursor: pointer;
    background-image:
      linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 8px 8px;
    background-position: 0 0, 0 4px, 4px -4px, -4px 0;
  }

  &__alpha-thumb {
    position: absolute;
    left: 50%;
    width: 16px;
    height: 4px;
    border: 1px solid #fff;
    border-radius: 2px;
    background-color: #fff;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }

  /* 预设颜色 */
  &__predefine {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--mosaic-border-color-lighter);
  }

  &__predefine-item {
    width: 20px;
    height: 20px;
    border-radius: var(--mosaic-border-radius);
    border: 1px solid var(--mosaic-border-color);
    cursor: pointer;
    transition: transform 0.15s;

    &:hover {
      transform: scale(1.15);
    }

    &.is-active {
      border-color: var(--mosaic-primary);
      box-shadow: 0 0 0 2px var(--mosaic-primary-light);
    }
  }

  /* 禁用 */
  &--disabled {
    .m-color-picker-panel__sv {
      cursor: not-allowed;
      filter: grayscale(1) opacity(0.5);
    }

    .m-color-picker-panel__hue-bar,
    .m-color-picker-panel__alpha-bar {
      cursor: not-allowed;
      filter: grayscale(1) opacity(0.5);
    }

    .m-color-picker-panel__predefine-item {
      cursor: not-allowed;
      filter: grayscale(1) opacity(0.5);

      &:hover {
        transform: none;
      }
    }
  }
}
</style>
