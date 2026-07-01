<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Slider 滑块</h1>
    <p class="doc-page__desc">通过拖动滑块在指定范围内选择值，支持范围选择、步长、断点、输入框、标记、垂直模式与自定义圆点。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>v-model</code> 绑定数值，默认范围 0~100。通过 <code>show-tooltip</code> 控制拖动时是否显示气泡。设置 <code>range</code> 启用范围选择，<code>v-model</code> 绑定数组。</p>
        <DemoBlock :code="basicCode">
          <div class="doc-demo-group">
            <MSlider v-model="basicValue" />
          </div>
          <div class="doc-demo-group">
            <MSlider v-model="noTooltipValue" :show-tooltip="false" />
          </div>
          <div class="doc-demo-group">
            <MSlider v-model="rangeValue" range :max="10" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用</h2>
        <p class="doc-page__hint">设置 <code>disabled</code> 禁用滑块，滑块颜色透明度降低以展示禁用样式。</p>
        <DemoBlock :code="disabledCode">
          <div class="doc-demo-group">
            <MSlider v-model="disabledValue1" disabled />
            <MSlider v-model="disabledValue2" disabled color="#13ce66" />
            <MSlider v-model="disabledRangeValue" range disabled :max="10" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="step">
        <h2>步长与断点</h2>
        <p class="doc-page__hint"><code>step</code> 设置滑块每次步进的长度。同时设置 <code>show-stops</code> 时，会在步进位置显示断点。</p>
        <DemoBlock :code="stepCode">
          <div class="doc-demo-group">
            <MSlider v-model="stepValue" :step="10" />
          </div>
          <div>
            <MSlider v-model="stopsValue" :step="10" show-stops />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="show-input">
        <h2>显示输入框</h2>
        <p class="doc-page__hint">设置 <code>show-input</code>，滑块右侧会出现一个数字输入框，可直接控制滑块的进度。</p>
        <DemoBlock :code="showInputCode">
          <MSlider v-model="showInputValue" show-input />
        </DemoBlock>
      </div>

      <div class="doc-section" id="marks">
        <h2>标记</h2>
        <p class="doc-page__hint">通过 <code>marks</code> 属性在滑块下方显示刻度标记，键为位置，值为文本。每个标记位置会在滑块上自动显示断点。</p>
        <DemoBlock :code="marksCode">
          <MSlider v-model="marksValue" :marks="marksData" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="color">
        <h2>自定义颜色</h2>
        <p class="doc-page__hint">通过 <code>color</code> 属性自定义滑块已滑动区域与圆点边框的颜色。</p>
        <DemoBlock :code="colorCode">
          <div class="doc-demo-group">
            <MSlider v-model="colorValue1" color="#13ce66" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="vertical">
        <h2>垂直模式</h2>
        <p class="doc-page__hint">设置 <code>vertical</code> 启用垂直模式，<code>height</code> 控制滑块高度。</p>
        <DemoBlock :code="verticalCode">
          <div class="doc-demo-group doc-demo-group--vertical">
            <MSlider v-model="verticalValue" vertical height="150px" />
            <MSlider v-model="verticalRangeValue" vertical range height="150px" :max="10" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="reverse">
        <h2>反向滑动</h2>
        <p class="doc-page__hint">设置 <code>reverse</code> 属性后，值的方向反转：水平模式下最小值在右侧，垂直模式下最小值在顶部。</p>
        <DemoBlock :code="reverseCode">
          <div class="doc-demo-group">
            <MSlider v-model="reverseValue2" reverse :marks="{ 0: '0', 50: '50', 100: '100' }" />
          </div>
          <div class="doc-demo-group doc-demo-group--vertical">
            <MSlider v-model="reverseValue3" reverse vertical height="150px" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="thumb">
        <h2>自定义圆点</h2>
        <p class="doc-page__hint">通过 <code>thumb</code> 插槽自定义滑块圆点内的内容，作用域参数为 <code>value</code>（当前值）。有插槽时会覆盖原有圆点样式。</p>
        <DemoBlock :code="thumbCode">
          <div class="doc-demo-group">
            <MSlider v-model="thumbValue1">
              <template #thumb="{ value }">
                <span class="slider-thumb-text">{{ value }}</span>
              </template>
            </MSlider>
            <MSlider v-model="thumbValue2" color="#a78bfa">
              <template #thumb="{ value }">
                <span class="slider-thumb-icon">{{ value >= 50 ? '🔥' : '💧' }}</span>
              </template>
            </MSlider>
          </div>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />

    <h3>Slots</h3>
    <ApiTable type="slot" :data="DATA.slots" />

    <h3>Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicValue = ref(30)
const noTooltipValue = ref(60)
const rangeValue = ref([2, 8])
const disabledValue1 = ref(50)
const disabledValue2 = ref(70)
const disabledRangeValue = ref([2, 8])
const stepValue = ref(30)
const stopsValue = ref(40)
const showInputValue = ref(30)
const marksValue = ref(30)
const colorValue1 = ref(40)
const colorValue2 = ref(60)
const colorValue3 = ref(80)
const verticalValue = ref(50)
const verticalRangeValue = ref([2, 8])
const reverseValue1 = ref(30)
const reverseValue2 = ref(60)
const reverseValue3 = ref(50)
const thumbValue1 = ref(30)
const thumbValue2 = ref(70)

const marksData = {
  0: '0°C',
  25: '25°C',
  50: '50°C',
  75: '75°C',
  100: '100°C',
}

const basicCode = `<!-- 默认，拖动显示气泡 -->
<MSlider v-model="value" />

<!-- 不显示气泡 -->
<MSlider v-model="v" :show-tooltip="false" />

<!-- 范围选择 -->
<MSlider v-model="rangeValue" range :max="10" />

<script setup>
const value = ref(30)
const v = ref(60)
const rangeValue = ref([2, 8])
<` + `/script>`

const disabledCode = `<MSlider v-model="v1" disabled />
<MSlider v-model="v2" disabled color="#13ce66" />
<MSlider v-model="v3" range disabled :max="10" />`

const stepCode = `<!-- 步长 -->
<MSlider v-model="v1" :step="10" />

<!-- 步长 + 断点 -->
<MSlider v-model="v2" :step="10" show-stops />`

const showInputCode = `<MSlider v-model="v" show-input />`

const marksCode = `<MSlider v-model="v" :marks="{ 0: '0°C', 25: '25°C', 50: '50°C', 75: '75°C', 100: '100°C' }" />`

const colorCode = `<MSlider v-model="v1" color="#13ce66" />`

const verticalCode = `<MSlider v-model="v1" vertical height="150px" />
<MSlider v-model="v2" vertical range height="150px" :max="10" />`

const reverseCode = `<!-- 水平反向 -->
<MSlider v-model="v1" reverse />
<MSlider v-model="v2" reverse :marks="{ 0: '0', 50: '50', 100: '100' }" />

<!-- 垂直反向 -->
<MSlider v-model="v3" reverse vertical height="150px" />`

const thumbCode = `<MSlider v-model="v1">
  <template #thumb="{ value }">
    <span style="font-size: 11px;">{{ value }}</span>
  </template>
</MSlider>

<MSlider v-model="v2" color="#a78bfa">
  <template #thumb="{ value }">
    <span>{{ value >= 50 ? '🔥' : '💧' }}</span>
  </template>
</MSlider>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'disabled', label: '禁用' },
  { id: 'step', label: '步长与断点' },
  { id: 'show-input', label: '显示输入框' },
  { id: 'marks', label: '标记' },
  { id: 'color', label: '自定义颜色' },
  { id: 'vertical', label: '垂直模式' },
  { id: 'reverse', label: '反向滑动' },
  { id: 'thumb', label: '自定义圆点' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'number | number[]', '0', '绑定值（v-model），单个数字或范围数组'],
    ['min', 'number', '0', '最小值'],
    ['max', 'number', '100', '最大值'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['step', 'number', '1', '步长'],
    ['showInput', 'boolean', 'false', '是否显示输入框'],
    ['showInputControls', 'boolean', 'true', '输入框是否显示控制按钮'],
    ['showStops', 'boolean', 'false', '是否显示间断点'],
    ['showTooltip', 'boolean', 'true', '是否显示 tooltip'],
    ['range', 'boolean', 'false', '是否为范围选择'],
    ['vertical', 'boolean', 'false', '是否垂直模式'],
    ['height', 'string', '200px', '垂直模式时的高度'],
    ['marks', 'Record<number, string>', '—', '标记，键为位置，值为文本'],
    ['color', 'string', '—', '自定义滑块颜色（bar 与圆点边框）'],
    ['reverse', 'boolean', 'false', '是否反向滑动，反转值的方向'],
  ],
  slots: [
    ['thumb', '自定义圆点内容，作用域参数 { value }'],
  ],
  events: [
    ['change', 'number | number[]', '值变更时触发'],
    ['input', 'number | number[]', '拖动时触发'],
  ],
}
</script>

<style scoped lang="scss">
.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}

.doc-demo-group--vertical {
  align-items: flex-start;
  gap: 40px;
  padding: 12px 0;
}

.slider-thumb-text {
  font-size: 11px;
  color: var(--mosaic-text-regular);
  font-weight: 600;
}

.slider-thumb-icon {
  font-size: 12px;
}
</style>
