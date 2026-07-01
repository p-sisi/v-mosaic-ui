<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>InputNumber 数字输入框</h1>
    <p class="doc-page__desc">仅允许输入数字值，支持步长、精度、范围限制、单位、格式化和增减控制按钮。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>v-model</code> 绑定数值，默认显示增减按钮。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group">
            <MInputNumber v-model="basicValue" />
            <span class="demo-event-result">值: {{ basicValue }}</span>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="step">
        <h2>步长</h2>
        <p class="doc-page__hint">通过 <code>step</code> 属性设置每次增减的步长。设置 <code>step-strictly</code> 后，输入值只能是步长的倍数。</p>
        <DemoBlock :code="stepCode">
          <div class="doc-demo-group">
            <MInputNumber v-model="stepValue" :step="2" />
            <MInputNumber v-model="stepDecimalValue" :step="0.1" />
          </div>
          <div class="doc-demo-group">
            <MInputNumber v-model="stepStrictlyValue" :step="2" step-strictly />
            <span class="demo-event-result">严格步进值: {{ stepStrictlyValue }}（只能输入 2 的倍数）</span>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="min-max-precision">
        <h2>范围与精度</h2>
        <p class="doc-page__hint">通过 <code>min</code>、<code>max</code> 限制范围，<code>precision</code> 设置精度。</p>
        <DemoBlock :code="minMaxPrecisionCode">
          <div class="doc-demo-group">
            <span class="demo-event-result">最大值 10，最小值 1：</span>
            <MInputNumber v-model="rangeValue" :min="1" :max="10" />
          </div>
          <div class="doc-demo-group">
            <span class="demo-event-result">精度 2 位小数：</span>
            <MInputNumber v-model="precisionValue" :precision="2" :step="0.1" :max="10" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="controls">
        <h2>控制按钮</h2>
        <p class="doc-page__hint">通过 <code>controls-position="right"</code> 将按钮移至右侧纵向排列；通过 <code>trigger</code> 属性设置按钮展示时机（<code>always</code> 始终展示、<code>hover</code> 悬浮展示）；设置 <code>:controls="false"</code> 隐藏增减按钮。</p>
        <DemoBlock :code="controlsCode">
          <div class="doc-demo-group">
            <MInputNumber v-model="controlsRightValue" controls-position="right" />
            <MInputNumber v-model="noControlsValue" :controls="false" />
          </div>
          <div class="doc-demo-group">
            <MInputNumber v-model="triggerAlwaysValue" trigger="always" />
            <MInputNumber v-model="triggerHoverValue" trigger="hover" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size-width">
        <h2>尺寸与宽度</h2>
        <p class="doc-page__hint">通过 <code>size</code> 切换尺寸，通过 <code>width</code> 自定义宽度（数字为 px，字符串可为百分比等）。</p>
        <DemoBlock :code="sizeWidthCode">
          <div class="doc-demo-group">
            <MInputNumber v-model="smallValue" size="small" />
            <MInputNumber v-model="defaultValue" />
            <MInputNumber v-model="largeValue" size="large" />
          </div>
          <div class="doc-demo-group">
            <MInputNumber v-model="widthValue1" :width="80" />
            <MInputNumber v-model="widthValue3" width="50%" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="unit">
        <h2>单位</h2>
        <p class="doc-page__hint">通过 <code>unit</code> 属性设置单位文本，默认展示在输入框后面。设置 <code>prepend-unit</code> 后单位展示在输入框前面。</p>
        <DemoBlock :code="unitCode">
          <div class="doc-demo-group">
            <MInputNumber v-model="unitValue" unit="元" :controls="false" />
            <MInputNumber v-model="unitPrependValue" unit="¥" prepend-unit :controls="false" />
            <MInputNumber v-model="unitKgValue" unit="kg" :controls="false" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="combination">
        <h2>组合型</h2>
        <p class="doc-page__hint">通过两个 <code>MInputNumber</code> 组合实现范围输入，配合 <code>allow-undefined-value</code> 允许清空，<code>trigger="hover"</code> 让控制按钮悬浮时展示。</p>
        <DemoBlock :code="combinationCode">
          <div class="demo-combination">
            <MInputNumber
              v-model="comboMin"
              placeholder="最小值"
              allow-undefined-value
              unit="元"
              controls-position="left"
              trigger="hover"
              :width="140"
            />
            <span class="demo-combination__split">-</span>
            <MInputNumber
              v-model="comboMax"
              placeholder="最大值"
              allow-undefined-value
              unit="元"
              controls-position="left"
              trigger="hover"
              :width="140"
            />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="color">
        <h2>聚焦颜色</h2>
        <p class="doc-page__hint">输入框聚焦时外边框变色，通过 <code>color</code> 属性自定义聚焦边框颜色。点击输入框查看效果。</p>
        <DemoBlock :code="colorCode">
          <div class="doc-demo-group">
            <MInputNumber v-model="colorValue1" color="#67c23a" />
            <MInputNumber v-model="colorValue2" color="#f56c6c" />
            <MInputNumber v-model="colorValue3" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="formatter">
        <h2>格式化</h2>
        <p class="doc-page__hint">通过 <code>formatter</code> 函数自定义显示格式（不影响实际值），聚焦时显示原始值便于编辑。</p>
        <DemoBlock :code="formatterCode">
          <div class="doc-demo-group">
            <MInputNumber v-model="formatterValue" :formatter="currencyFormatter" />
            <span class="demo-event-result">值: {{ formatterValue }}</span>
          </div>
          <div class="doc-demo-group">
            <MInputNumber v-model="formatterValue2" :formatter="percentFormatter" />
            <span class="demo-event-result">值: {{ formatterValue2 }}</span>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用状态</h2>
        <p class="doc-page__hint">设置 <code>disabled</code> 禁用数字输入框。</p>
        <DemoBlock :code="disabledCode">
          <MInputNumber v-model="disabledValue" disabled />
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />

    <h3>Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicValue = ref(0)
const stepValue = ref(0)
const stepDecimalValue = ref(0)
const stepStrictlyValue = ref(0)
const rangeValue = ref(1)
const precisionValue = ref(1)
const controlsRightValue = ref(0)
const noControlsValue = ref(0)
const smallValue = ref(0)
const defaultValue = ref(0)
const largeValue = ref(0)
const disabledValue = ref(0)
const formatterValue = ref(1000)
const formatterValue2 = ref(75)
const triggerAlwaysValue = ref(0)
const triggerHoverValue = ref(0)
const unitValue = ref(100)
const unitPrependValue = ref(200)
const unitKgValue = ref(50)
const widthValue1 = ref(0)
const widthValue3 = ref(0)
const colorValue1 = ref(0)
const colorValue2 = ref(0)
const colorValue3 = ref(0)
const comboMin = ref<number | undefined>(undefined)
const comboMax = ref<number | undefined>(undefined)

const currencyFormatter = (val: number) => `¥ ${val.toLocaleString()}`
const percentFormatter = (val: number) => `${val}%`

const basicCode = `<MInputNumber v-model="value" />
<p>值: {{ value }}</p>

<script setup>
const value = ref(0)
<` + `/script>`

const stepCode = `<!-- 步长 2 -->
<MInputNumber v-model="val1" :step="2" />

<!-- 步长 0.1 -->
<MInputNumber v-model="val2" :step="0.1" />

<!-- 严格步进，只能输入 2 的倍数 -->
<MInputNumber v-model="val3" :step="2" step-strictly />`

const minMaxPrecisionCode = `<!-- 范围 1-10 -->
<MInputNumber v-model="val1" :min="1" :max="10" />

<!-- 精度 2 位小数 -->
<MInputNumber v-model="val2" :precision="2" :step="0.1" :max="10" />`

const controlsCode = `<!-- 按钮在右侧 -->
<MInputNumber v-model="val1" controls-position="right" />

<!-- 隐藏控制按钮 -->
<MInputNumber v-model="val2" :controls="false" />

<!-- 始终展示按钮 -->
<MInputNumber v-model="val3" trigger="always" />

<!-- 悬浮展示按钮 -->
<MInputNumber v-model="val4" trigger="hover" />`

const sizeWidthCode = `<!-- 尺寸 -->
<MInputNumber v-model="val1" size="small" />
<MInputNumber v-model="val2" />
<MInputNumber v-model="val3" size="large" />

<!-- 宽度：数字(px) -->
<MInputNumber v-model="val4" :width="80" />

<!-- 宽度：字符串 -->
<MInputNumber v-model="val5" width="50%" />`

const unitCode = `<!-- 单位在后面 -->
<MInputNumber v-model="val1" unit="元" :controls="false" />

<!-- 单位在前面 -->
<MInputNumber v-model="val2" unit="¥" prepend-unit :controls="false" />

<!-- 千克 -->
<MInputNumber v-model="val3" unit="kg" :controls="false" />`

const combinationCode = `<MInputNumber
  v-model="min"
  placeholder="最小值"
  allow-undefined-value
  unit="元"
  controls-position="left"
  trigger="hover"
  :width="140"
/>
<span class="split">-</span>
<MInputNumber
  v-model="max"
  placeholder="最大值"
  allow-undefined-value
  unit="元"
  controls-position="left"
  trigger="hover"
  :width="140"
/>`

const disabledCode = `<MInputNumber v-model="val" disabled />`

const colorCode = `<!-- 自定义聚焦颜色 -->
<MInputNumber v-model="val1" color="#67c23a" />
<MInputNumber v-model="val2" color="#f56c6c" />

<!-- 默认主题色 -->
<MInputNumber v-model="val3" />`

const formatterCode = `<!-- 货币格式 -->
<MInputNumber v-model="val1" :formatter="v => '¥ ' + v.toLocaleString()" />

<!-- 百分比格式 -->
<MInputNumber v-model="val2" :formatter="v => v + '%'" />`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'step', label: '步长' },
  { id: 'min-max-precision', label: '范围与精度' },
  { id: 'controls', label: '控制按钮' },
  { id: 'size-width', label: '尺寸与宽度' },
  { id: 'unit', label: '单位' },
  { id: 'combination', label: '组合型' },
  { id: 'color', label: '聚焦颜色' },
  { id: 'formatter', label: '格式化' },
  { id: 'disabled', label: '禁用状态' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'number | string', '0', '绑定值（v-model）'],
    ['min', 'number', '-Infinity', '最小值'],
    ['max', 'number', 'Infinity', '最大值'],
    ['step', 'number', '1', '步长'],
    ['stepStrictly', 'boolean', 'false', '是否严格步进，只能输入步长的倍数'],
    ['precision', 'number', '—', '精度（小数点后位数）'],
    ['size', 'small | default | large', 'default', '尺寸'],
    ['width', 'string | number', '—', '输入框宽度，数字为 px'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['controls', 'boolean', 'true', '是否显示增减按钮'],
    ['controlsPosition', 'left | right', '—', '控制按钮位置，设为 left/right 时按钮在对应侧纵向排列'],
    ['trigger', 'always | hover', 'always', '控制按钮展示时机，hover 悬浮时展示'],
    ['placeholder', 'string', '', '占位文本'],
    ['formatter', '(value: number) => string', '—', '自定义显示格式化函数，不影响实际绑定值'],
    ['unit', 'string', "''", '输入框单位文本'],
    ['prependUnit', 'boolean', 'false', '单位是否展示在输入框前面'],
    ['allowUndefinedValue', 'boolean', 'false', '是否允许清空为 undefined'],
    ['color', 'string', '—', '聚焦时边框颜色，默认为主题色'],
  ],
  events: [
    ['change', 'currentValue, oldValue', '值变更时触发'],
    ['focus', 'FocusEvent', '获焦时触发'],
    ['blur', 'FocusEvent', '失焦时触发'],
  ],
}
</script>

<style scoped lang="scss">
.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}

.demo-combination {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &__split {
    color: var(--mosaic-text-secondary);
    font-size: 14px;
  }
}
</style>
