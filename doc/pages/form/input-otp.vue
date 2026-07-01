<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>InputOTP 验证码输入</h1>
    <p class="doc-page__desc">用于输入验证码或一次性密码，每个输入框仅可输入一个字符，支持自动跳转、粘贴、键盘导航。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">通过 <code>v-model</code> 绑定字符串值，<code>length</code> 设置输入框数量（默认 6）。</p>
        <DemoBlock :code="basicCode">
          <MInputOTP v-model="basicValue" />
          <p class="demo-event-result">当前值：{{ basicValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="length">
        <h2>自定义长度</h2>
        <p class="doc-page__hint">通过 <code>length</code> 自定义验证码长度。</p>
        <DemoBlock :code="lengthCode">
          <div class="doc-demo-group">
            <MInputOTP v-model="lengthValue8" :length="8" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="types">
        <h2>样式类型</h2>
        <p class="doc-page__hint">通过 <code>type</code> 切换样式：<code>outlined</code>（方框边框）、<code>filled</code>（填充背景）、<code>underlined</code>（下划线）。</p>
        <DemoBlock :code="typesCode">
          <div class="doc-demo-group">
            <MInputOTP v-model="outlinedValue" type="outlined" />
          </div>
          <div class="doc-demo-group" style="margin-top: 12px;">
            <MInputOTP v-model="filledValue" type="filled" />
          </div>
          <div class="doc-demo-group" style="margin-top: 12px;">
            <MInputOTP v-model="underlinedValue" type="underlined" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 设置尺寸，可选 <code>small</code> / <code>default</code> / <code>large</code>。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group">
            <MInputOTP v-model="sizeValue" size="small" />
          </div>
          <div class="doc-demo-group">
            <MInputOTP v-model="sizeValue" size="default" />
          </div>
          <div class="doc-demo-group">
            <MInputOTP v-model="sizeValue" size="large" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="mask">
        <h2>密码模式</h2>
        <p class="doc-page__hint">设置 <code>mask</code> 后输入内容以密文形式展示（圆点遮罩）。</p>
        <DemoBlock :code="maskCode">
          <MInputOTP v-model="maskValue" mask />
          <p class="demo-event-result">当前值：{{ maskValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="numeric">
        <h2>纯数字</h2>
        <p class="doc-page__hint">设置 <code>numeric</code> 后仅允许输入数字。</p>
        <DemoBlock :code="numericCode">
          <MInputOTP v-model="numericValue" numeric />
          <p class="demo-event-result">当前值：{{ numericValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="alphabetic">
        <h2>纯字母</h2>
        <p class="doc-page__hint">设置 <code>alphabetic</code> 后仅允许输入字母（a-z / A-Z）。</p>
        <DemoBlock :code="alphabeticCode">
          <MInputOTP v-model="alphabeticValue" alphabetic />
          <p class="demo-event-result">当前值：{{ alphabeticValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="uppercase">
        <h2>自动大写</h2>
        <p class="doc-page__hint">设置 <code>uppercase</code> 后，即使输入小写字母也会自动转为大写呈现。可与 <code>alphabetic</code> 组合使用。</p>
        <DemoBlock :code="uppercaseCode">
          <div class="doc-demo-group">
            <MInputOTP v-model="uppercaseValue" uppercase />
            <MInputOTP v-model="alphaUpperValue" alphabetic uppercase />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用</h2>
        <p class="doc-page__hint">设置 <code>disabled</code> 禁用验证码输入。</p>
        <DemoBlock :code="disabledCode">
          <MInputOTP v-model="disabledValue" disabled />
        </DemoBlock>
      </div>

      <div class="doc-section" id="events">
        <h2>完成事件</h2>
        <p class="doc-page__hint">当所有输入框填满时触发 <code>complete</code> 事件，返回完整验证码。</p>
        <DemoBlock :code="eventsCode">
          <MInputOTP v-model="eventsValue" @complete="handleComplete" />
          <p class="demo-event-result">{{ completeMsg }}</p>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />
    <h3>Events</h3>
    <ApiTable type="event" :data="DATA.events" />
    <h3>Methods</h3>
    <ApiTable type="prop" :data="DATA.methods" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicValue = ref('')
const lengthValue4 = ref('')
const lengthValue6 = ref('')
const lengthValue8 = ref('')
const outlinedValue = ref('')
const filledValue = ref('')
const underlinedValue = ref('')
const sizeValue = ref('')
const maskValue = ref('')
const numericValue = ref('')
const alphabeticValue = ref('')
const uppercaseValue = ref('')
const alphaUpperValue = ref('')
const disabledValue = ref('123456')
const eventsValue = ref('')

const completeMsg = ref('等待输入完成...')

function handleComplete(value: string) {
  completeMsg.value = `验证码已填满：${value}`
}

const basicCode = `<MInputOTP v-model="value" />`

const lengthCode = `<MInputOTP v-model="val8" :length="8" />`

const typesCode = `<MInputOTP v-model="val1" type="outlined" />
<MInputOTP v-model="val2" type="filled" />
<MInputOTP v-model="val3" type="underlined" />`

const sizeCode = `<MInputOTP v-model="value" size="small" />
<MInputOTP v-model="value" size="default" />
<MInputOTP v-model="value" size="large" />`

const maskCode = `<MInputOTP v-model="value" mask />`

const numericCode = `<MInputOTP v-model="value" numeric />`

const alphabeticCode = `<MInputOTP v-model="value" alphabetic />`

const uppercaseCode = `<MInputOTP v-model="val1" uppercase />
<MInputOTP v-model="val2" alphabetic uppercase />`

const disabledCode = `<MInputOTP v-model="value" disabled />`

const eventsCode = `<MInputOTP v-model="value" @complete="handleComplete" />

<script setup>
const completeMsg = ref('等待输入完成...')
function handleComplete(value) {
  completeMsg.value = \`验证码已填满：\${value}\`
}
<` + `/script>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'length', label: '自定义长度' },
  { id: 'types', label: '样式类型' },
  { id: 'size', label: '尺寸' },
  { id: 'mask', label: '密码模式' },
  { id: 'numeric', label: '纯数字' },
  { id: 'alphabetic', label: '纯字母' },
  { id: 'uppercase', label: '自动大写' },
  { id: 'disabled', label: '禁用' },
  { id: 'events', label: '完成事件' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'string', '', '绑定值（v-model）'],
    ['length', 'number', '6', '输入框数量'],
    ['type', 'outlined | filled | underlined', 'outlined', '样式类型'],
    ['size', 'small | default | large', 'default', '尺寸'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['mask', 'boolean', 'false', '是否以密文形式展示输入内容'],
    ['numeric', 'boolean', 'false', '是否仅允许输入数字'],
    ['alphabetic', 'boolean', 'false', '是否仅允许输入字母（a-z / A-Z）'],
    ['uppercase', 'boolean', 'false', '是否自动将小写字母转为大写'],
  ],
  events: [
    ['update:modelValue', 'value: string', '值变化时触发'],
    ['change', 'value: string', '值变化时触发'],
    ['complete', 'value: string', '所有输入框填满时触发'],
    ['focus', 'event, index', '输入框获焦时触发'],
    ['blur', 'event', '输入框失焦时触发'],
  ],
  methods: [
    ['focus', '—', '聚焦第一个输入框'],
    ['blur', '—', '失焦所有输入框'],
    ['clear', '—', '清空所有输入框'],
  ],
}
</script>

<style scoped lang="scss">
.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}
</style>
