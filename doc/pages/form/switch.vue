<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Switch 开关</h1>
    <p class="doc-page__desc">表示两种状态之间的切换，支持自定义值、文字、颜色、尺寸、形状和加载状态。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>v-model</code> 绑定布尔值，默认打开值为 <code>true</code>，关闭值为 <code>false</code>。</p>
        <DemoBlock :code="basicCode">
          <MSwitch v-model="basicValue" />
          <span class="demo-event-result">状态: {{ basicValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom-value">
        <h2>自定义值</h2>
        <p class="doc-page__hint">通过 <code>active-value</code> / <code>inactive-value</code> 自定义开关的值，可为字符串或数字。</p>
        <DemoBlock :code="customValueCode">
          <MSwitch v-model="customValue" active-value="我是开启" inactive-value="我是关闭" />
          <span class="demo-event-result">值: {{ customValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="text">
        <h2>文字描述</h2>
        <p class="doc-page__hint"><code>active-text</code> / <code>inactive-text</code> 显示开关两侧的描述文字。</p>
        <DemoBlock :code="textCode">
          <MSwitch v-model="textValue" active-text="开启" inactive-text="关闭" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="inline-prompt">
        <h2>文字内嵌</h2>
        <p class="doc-page__hint">设置 <code>inline-prompt</code> 后，文字描述显示在开关内部，开关宽度随内容自适应，文字水平垂直居中。</p>
        <DemoBlock :code="inlinePromptCode">
          <div class="doc-demo-group">
            <MSwitch v-model="inlineValue1" inline-prompt active-text="开" inactive-text="关" />
            <MSwitch v-model="inlineValue2" inline-prompt active-text="启用" inactive-text="停用" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="color">
        <h2>自定义颜色</h2>
        <p class="doc-page__hint"><code>active-color</code> / <code>inactive-color</code> 自定义打开/关闭时的背景色，文字描述时选中侧文字颜色跟随自定义颜色。</p>
        <DemoBlock :code="colorCode">
          <div class="doc-demo-group">
            <MSwitch v-model="colorValue1" active-color="#13ce66" inactive-color="#ff4949" />
            <MSwitch v-model="colorValue2" active-color="#a78bfa" inactive-color="#909399" />
          </div>
          <div class="doc-demo-group">
            <MSwitch v-model="colorValue3" active-text="开启" inactive-text="关闭" active-color="#13ce66" inactive-color="#ff4949" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 属性设置尺寸（<code>small</code> / <code>default</code> / <code>large</code>）。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group">
            <MSwitch v-model="sizeValue1" size="small" />
            <MSwitch v-model="sizeValue2" />
            <MSwitch v-model="sizeValue3" size="large" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="round">
        <h2>方形开关</h2>
        <p class="doc-page__hint"><code>round</code> 默认为 <code>true</code>，设置为 <code>false</code> 时开关变为带小圆角的方形。</p>
        <DemoBlock :code="roundCode">
          <div class="doc-demo-group">
            <MSwitch v-model="roundValue1" :round="false" />
            <MSwitch v-model="roundValue2" :round="false" active-text="开" inactive-text="关" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="content-slot">
        <h2>自定义内容</h2>
        <p class="doc-page__hint">通过 <code>content</code> 插槽自定义开关圆点内的内容，插槽作用域提供 <code>checked</code> 属性。</p>
        <DemoBlock :code="contentSlotCode">
          <div class="doc-demo-group">
            <MSwitch v-model="contentValue1">
              <template #content="{ checked }">
                <span style="font-size: 11px;">{{ checked ? '✓' : '✕' }}</span>
              </template>
            </MSwitch>
            <MSwitch v-model="contentValue2" size="large">
              <template #content="{ checked }">
                <span style="font-size: 12px;">{{ checked ? 'ON' : 'OFF' }}</span>
              </template>
            </MSwitch>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="width">
        <h2>自定义宽度</h2>
        <p class="doc-page__hint"><code>width</code> 属性设置开关宽度（像素），文字描述时建议加宽。</p>
        <DemoBlock :code="widthCode">
          <div class="doc-demo-group">
            <MSwitch v-model="widthValue1" :width="60" active-text="开" inactive-text="关" />
            <MSwitch v-model="widthValue2" :width="80" active-text="启用" inactive-text="停用" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="loading-disabled">
        <h2>加载与禁用</h2>
        <p class="doc-page__hint"><code>loading</code> 显示加载状态，<code>disabled</code> 禁用开关。</p>
        <DemoBlock :code="loadingCode">
          <div class="doc-demo-group">
            <MSwitch v-model="loadingValue" :loading="loadingLoading" @click="handleLoading" />
            <MSwitch v-model="loadingValue2" loading />
            <MSwitch v-model="disabledValue1" disabled />
            <MSwitch v-model="disabledValue2" disabled />
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

const basicValue = ref(false)
const customValue = ref('我是开启')
const textValue = ref(true)
const inlineValue1 = ref(true)
const inlineValue2 = ref(false)
const colorValue1 = ref(true)
const colorValue2 = ref(false)
const colorValue3 = ref(true)
const sizeValue1 = ref(true)
const sizeValue2 = ref(true)
const sizeValue3 = ref(true)
const roundValue1 = ref(true)
const roundValue2 = ref(false)
const contentValue1 = ref(true)
const contentValue2 = ref(false)
const widthValue1 = ref(true)
const widthValue2 = ref(false)
const loadingValue = ref(true)
const loadingLoading = ref(false)
const loadingValue2 = ref(true)
const disabledValue1 = ref(true)
const disabledValue2 = ref(false)

function handleLoading() {
  loadingLoading.value = true
  setTimeout(() => { loadingLoading.value = false }, 2000)
}

const basicCode = `<MSwitch v-model="value" />

<script setup>
const value = ref(false)
<` + `/script>`

const customValueCode = `<MSwitch v-model="value" active-value="我是开启" inactive-value="我是关闭" />

<script setup>
const value = ref('on')
<` + `/script>`

const textCode = `<MSwitch v-model="v" active-text="开启" inactive-text="关闭" />`

const inlinePromptCode = `<MSwitch v-model="v1" inline-prompt active-text="开" inactive-text="关" />
<MSwitch v-model="v2" inline-prompt active-text="启用" inactive-text="停用" />`

const colorCode = `<!-- 无文字，仅颜色自定义 -->
<MSwitch v-model="v1" active-color="#13ce66" inactive-color="#ff4949" />
<MSwitch v-model="v2" active-color="#a78bfa" inactive-color="#909399" />

<!-- 有文字，文字颜色跟随自定义颜色 -->
<MSwitch v-model="v3" active-text="开启" inactive-text="关闭" active-color="#13ce66" inactive-color="#ff4949" />`

const sizeCode = `<MSwitch v-model="v1" size="small" />
<MSwitch v-model="v2" />
<MSwitch v-model="v3" size="large" />`

const roundCode = `<MSwitch v-model="v1" :round="false" />
<MSwitch v-model="v2" :round="false" active-text="开" inactive-text="关" />`

const contentSlotCode = `<MSwitch v-model="v1">
  <template #content="{ checked }">
    {{ checked ? '✓' : '✕' }}
  </template>
</MSwitch>

<MSwitch v-model="v2" size="large">
  <template #content="{ checked }">
    {{ checked ? 'ON' : 'OFF' }}
  </template>
</MSwitch>`

const widthCode = `<MSwitch v-model="v1" :width="60" active-text="开" inactive-text="关" />
<MSwitch v-model="v2" :width="80" active-text="启用" inactive-text="停用" />`

const loadingCode = `<!-- 点击触发加载 -->
<MSwitch v-model="loadingValue" :loading="loadingLoading" @click="handleLoading" />

<!-- 常驻加载态 -->
<MSwitch v-model="v" loading />

<!-- 禁用 -->
<MSwitch v-model="v1" disabled />
<MSwitch v-model="v2" disabled />

<script setup>
const loadingValue = ref(true)
const loadingLoading = ref(false)
function handleLoading() {
  loadingLoading.value = true
  setTimeout(() => { loadingLoading.value = false }, 2000)
}
<` + `/script>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'custom-value', label: '自定义值' },
  { id: 'text', label: '文字描述' },
  { id: 'inline-prompt', label: '文字内嵌' },
  { id: 'color', label: '自定义颜色' },
  { id: 'size', label: '尺寸' },
  { id: 'round', label: '方形开关' },
  { id: 'content-slot', label: '自定义内容' },
  { id: 'width', label: '自定义宽度' },
  { id: 'loading-disabled', label: '加载与禁用' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'boolean | string | number', 'false', '绑定值（v-model）'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['width', 'number', '—', '开关宽度（像素），不设置则随尺寸自适应'],
    ['activeText', 'string', '—', '打开时的文字描述'],
    ['inactiveText', 'string', '—', '关闭时的文字描述'],
    ['activeValue', 'boolean | string | number', 'true', '打开时的值'],
    ['inactiveValue', 'boolean | string | number', 'false', '关闭时的值'],
    ['activeColor', 'string', '—', '打开时的背景色'],
    ['inactiveColor', 'string', '—', '关闭时的背景色'],
    ['inlinePrompt', 'boolean', 'false', '文字是否显示在开关内部'],
    ['size', 'small | default | large', 'default', '开关尺寸'],
    ['round', 'boolean', 'true', '是否为圆角，false 时为方形带小圆角'],
    ['loading', 'boolean', 'false', '是否显示加载状态'],
    ['validateEvent', 'boolean', 'true', '是否触发表单校验'],
  ],
  slots: [
    ['content', '自定义圆点内的内容，作用域参数 { checked }'],
  ],
  events: [
    ['change', 'value', '值变更时触发'],
  ],
}
</script>

<style scoped lang="scss">
.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}
</style>
