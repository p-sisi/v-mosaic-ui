<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Input 输入框</h1>
    <p class="doc-page__desc">通过鼠标或键盘输入内容，支持 v-model 双向绑定、多种尺寸和状态。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>v-model</code> 绑定输入值。</p>
        <DemoBlock code='<MInput v-model="inputValue" placeholder="请输入内容" />'>
          <MInput v-model="inputValue" placeholder="请输入内容" />
          <span class="demo-event-result">值: {{ inputValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="clearable">
        <h2>可清除</h2>
        <p class="doc-page__hint">设置 <code>clearable</code> 属性，输入框右侧出现清除按钮，点击可一键清空内容并触发 <code>clear</code> 事件。</p>
        <DemoBlock code='<MInput v-model="clearableValue" placeholder="可清除" clearable
  @clear="handleClear" />'>
          <MInput v-model="clearableValue" placeholder="可清除" clearable @clear="handleClear" />
          <span class="demo-event-result">{{ clearMsg }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 属性设置预设大小，也可通过 <code>width</code> 自定义宽度。</p>
        <DemoBlock code='<MInput placeholder="Small" size="small" />
<MInput placeholder="Default" />
<MInput placeholder="Large" size="large" />

<!-- 自定义宽度 -->
<MInput placeholder="宽度 100%" width="100%" />
<MInput placeholder="宽度 200px" width="200px" />'>
          <div class="doc-demo-group">
              <MInput placeholder="Small" size="small" />
              <MInput placeholder="Default" />
              <MInput placeholder="Large" size="large" />
          </div>
          <div class="doc-demo-group">
              <MInput placeholder="宽度 100%" width="100%" />
              <MInput placeholder="宽度 200px" width="200px" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用状态</h2>
        <p class="doc-page__hint">设置 <code>disabled</code> 属性禁用输入框。</p>
        <DemoBlock code='<MInput placeholder="禁用状态" disabled />'>
          <MInput placeholder="禁用状态" disabled />
        </DemoBlock>
      </div>

      <div class="doc-section" id="password">
        <h2>密码框</h2>
        <p class="doc-page__hint">设置 <code>type="password"</code> 启用密码输入框，输入内容被掩码遮挡。输入框右侧自动出现显隐切换图标，点击可在密文与明文之间切换。</p>
        <DemoBlock :code="passwordCode">
          <MInput v-model="passwordValue" type="password" placeholder="请输入密码" clearable />
        </DemoBlock>
      </div>

      <div class="doc-section" id="textarea">
        <h2>文本域</h2>
        <p class="doc-page__hint">设置 <code>type="textarea"</code> 即可切换为文本域输入框，通过 <code>rows</code> 设置默认行数。</p>
        <DemoBlock code='<MInput v-model="textareaValue" type="textarea" placeholder="请输入内容" :rows="4" />'>
          <MInput v-model="textareaValue" type="textarea" placeholder="请输入内容" :rows="4" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="textarea-autosize">
        <h2>自适应高度</h2>
        <p class="doc-page__hint">设置 <code>autosize</code> 可使文本域根据内容自动调整高度，且 hover 到边框时底部可手动拉伸。默认为 <code>false</code>（固定高度，不可拉伸）。通过 <code>autosize="{ minRows, maxRows }"</code> 或单独的 <code>min-rows</code> / <code>max-rows</code> 属性限制行数范围。</p>
        <DemoBlock :code="textareaAutosizeCode">
          <div class="doc-demo-group">
            <MInput v-model="autosizeValue" type="textarea" placeholder="自适应高度，hover 边框可拉伸" autosize />
            <MInput v-model="autosizeMinMaxValue" type="textarea" placeholder="最小2行，最大4行" :autosize="{ minRows: 2, maxRows: 4 }" />
            <MInput v-model="minMaxRowsValue" type="textarea" placeholder="minRows 3 / maxRows 5" :min-rows="3" :max-rows="5" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="word-count">
        <h2>字数限制与统计</h2>
        <p class="doc-page__hint"><code>max</code> / <code>min</code> 设置最大/最小字数限制。<code>show-word-limit</code> 和 <code>show-word</code> 在输入框内部末尾分别显示剩余字数和已输入字符数；<code>show-word-limit-outside</code> 和 <code>show-word-outside</code> 则显示在输入框外部下方。超出 max 或不足 min 时字数自动变红。</p>
        <DemoBlock :code="wordCountCode">
          <div class="doc-demo-group">
            <MInput v-model="maxMinValue" placeholder="min 5 / max 20" :min="5" :max="20" show-word-limit />
            <MInput v-model="maxMinWordValue" placeholder="min 5 / max 20" :min="5" :max="20" show-word />
          </div>
          <div class="doc-demo-group">
            <MInput v-model="maxMinOutsideLimitValue" placeholder="min 5 / max 20" :min="5" :max="20" show-word-limit-outside />
            <MInput v-model="maxMinOutsideWordValue" placeholder="min 5 / max 20" :min="5" :max="20" show-word-outside />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="prepend-append">
        <h2>前置与后置内容</h2>
        <p class="doc-page__hint">通过 <code>#prepend</code> 插槽在输入框前面添加内容，<code>#append</code> 插槽在输入框后面添加内容。</p>
        <DemoBlock :code="prependAppendCode">
          <MInput v-model="prependValue" placeholder="请输入内容">
            <template #prepend>Http://</template>
          </MInput>
          <MInput v-model="prependSelectValue" placeholder="请输入网址">
            <template #prepend>
              <MSelect v-model="prependProtocol" size="small" class="doc-prepend-select">
                <MOption value="http://" label="http://" />
                <MOption value="https://" label="https://" />
                <MOption value="ftp://" label="ftp://" />
              </MSelect>
            </template>
          </MInput>
          <MInput v-model="appendValue" placeholder="请输入内容">
            <template #append>.com</template>
          </MInput>
          <MInput v-model="bothValue" placeholder="请输入内容">
            <template #prepend>Http://</template>
            <template #append>.com</template>
          </MInput>
        </DemoBlock>
      </div>

      <div class="doc-section" id="event-focus-blur">
        <h2>聚焦与失焦</h2>
        <p class="doc-page__hint">通过 <code>@focus</code> 和 <code>@blur</code> 监听输入框的聚焦和失焦事件。</p>
        <DemoBlock :code="focusBlurCode">
          <MInput placeholder="试试聚焦和失焦" @focus="handleFocus" @blur="handleBlur" />
          <span class="demo-event-result">{{ focusMsg }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="event-input-change">
        <h2>输入与变更</h2>
        <p class="doc-page__hint"><code>@input</code> 在每次输入时触发，<code>@change</code> 在值变更并失焦后触发。</p>
        <DemoBlock :code="inputChangeCode">
          <MInput v-model="eventValue" placeholder="输入内容" @input="handleInput" @change="handleChange" />
          <span class="demo-event-result">input: {{ inputCount }} 次 | change: {{ changeCount }} 次</span>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="Data.props"/>

    <h3>Events</h3>
    <ApiTable type="event" :data="Data.events"/>

    <h3>Slots</h3>
    <ApiTable type="slot" :data="Data.slots"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const inputValue = ref('')
const textareaValue = ref('')
const autosizeValue = ref('')
const autosizeMinMaxValue = ref('')
const minMaxRowsValue = ref('')
const clearableValue = ref('可清除的内容')
const clearMsg = ref('')  // 清除事件的提示信息
const passwordValue = ref('')

function handleClear() {
  clearMsg.value = 'clear 事件已触发'
  setTimeout(() => { clearMsg.value = '' }, 1500)
}

const focusMsg = ref('等待操作...')
function handleFocus() {
  focusMsg.value = '输入框已聚焦'
}
function handleBlur() {
  focusMsg.value = '输入框已失焦'
}

const eventValue = ref('')
const inputCount = ref(0)   // input 事件触发计数
const changeCount = ref(0)  // change 事件触发计数
function handleInput() { inputCount.value++ }
function handleChange() { changeCount.value++ }

const maxMinValue = ref('')
const maxMinWordValue = ref('')
const maxMinOutsideLimitValue = ref('')
const maxMinOutsideWordValue = ref('')

const prependValue = ref('')
const appendValue = ref('')
const bothValue = ref('')
const prependSelectValue = ref('')
const prependProtocol = ref('https://')

const prependAppendCode = `<MInput v-model="val1" placeholder="请输入内容">
  <template #prepend>Http://</template>
</MInput>

<MInput v-model="val2" placeholder="请输入网址">
  <template #prepend>
    <MSelect v-model="protocol" size="small">
      <MOption value="http://" label="http://" />
      <MOption value="https://" label="https://" />
      <MOption value="ftp://" label="ftp://" />
    </MSelect>
  </template>
</MInput>

<MInput v-model="val3" placeholder="请输入内容">
  <template #append>.com</template>
</MInput>

<MInput v-model="val4" placeholder="请输入内容">
  <template #prepend>Http://</template>
  <template #append>.com</template>
</MInput>`

const passwordCode = `<MInput v-model="value" type="password" placeholder="请输入密码" clearable />`

const prependSelectCode = `<MInput v-model="urlValue" placeholder="请输入网址">
  <template #prepend>
    <select v-model="protocol">
      <option value="http://">http://</option>
      <option value="https://">https://</option>
      <option value="ftp://">ftp://</option>
    </select>
  </template>
</MInput>`

const textareaAutosizeCode = `<!-- 自适应高度，无行数限制 -->
<MInput v-model="val" type="textarea" placeholder="自适应高度" autosize />

<!-- 自适应高度，限制行数范围 -->
<MInput v-model="val" type="textarea" placeholder="最小2行，最大4行"
  :autosize="{ minRows: 2, maxRows: 4 }" />

<!-- 通过 minRows / maxRows 单独限制 -->
<MInput v-model="val" type="textarea" placeholder="minRows 3 / maxRows 5"
  :min-rows="3" :max-rows="5" />`

const wordCountCode = `<div style="display: flex; gap: 12px;">
  <MInput v-model="val1" placeholder="min 5 / max 20" :min="5" :max="20" show-word-limit />
  <MInput v-model="val2" placeholder="min 5 / max 20" :min="5" :max="20" show-word />
</div>

<div style="display: flex; gap: 12px;">
  <MInput v-model="val3" placeholder="min 5 / max 20" :min="5" :max="20" show-word-limit-outside />
  <MInput v-model="val4" placeholder="min 5 / max 20" :min="5" :max="20" show-word-outside />
</div>`

const focusBlurCode = `<MInput placeholder="试试聚焦和失焦"
  @focus="handleFocus"
  @blur="handleBlur" />
<p>{{ focusMsg }}</p>

<script setup>
const focusMsg = ref('等待操作...')
function handleFocus(e) {
  focusMsg.value = '输入框已聚焦'
}
function handleBlur(e) {
  focusMsg.value = '输入框已失焦'
}
<` + `/script>`

const inputChangeCode = `<MInput v-model="eventValue" placeholder="输入内容"
  @input="handleInput"
  @change="handleChange" />
<p>input 事件触发次数: {{ inputCount }}</p>
<p>change 事件触发次数: {{ changeCount }}</p>

<script setup>
const eventValue = ref('')
const inputCount = ref(0)
const changeCount = ref(0)
function handleInput(v) { inputCount.value++ }
function handleChange(v) { changeCount.value++ }
<` + `/script>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'clearable', label: '可清除' },
  { id: 'size', label: '尺寸' },
  { id: 'disabled', label: '禁用状态' },
  { id: 'password', label: '密码框' },
  { id: 'textarea', label: '文本域' },
  { id: 'textarea-autosize', label: '自适应高度' },
  { id: 'word-count', label: '字数限制与统计' },
  { id: 'prepend-append', label: '前置与后置内容' },
  { id: 'event-focus-blur', label: '聚焦与失焦' },
  { id: 'event-input-change', label: '输入与变更' },
  { id: 'api', label: 'API' },
]

const Data = {
  props: [
    ['modelValue', 'string | number', '', '绑定值（v-model）'],
    ['type', 'text | password | number | email | tel | url | textarea', 'text', '输入框类型，textarea 为文本域'],
    ['size', 'small | default | large', 'default', '输入框预设尺寸'],
    ['width', 'string', '—', '自定义宽度，如 \"100%\"、\"200px\"'],
    ['placeholder', 'string', '', '占位文本'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['clearable', 'boolean', 'false', '是否可清除'],
    ['maxlength', 'number', '—', '最大输入长度（原生属性，兼容保留）'], 
    ['max', 'number', '—', '最大字数限制'],
    ['min', 'number', '—', '最小字数限制'],
    ['rows', 'number', '2', 'textarea 默认行数（仅文本域生效）'],
    ['autosize', 'boolean | { minRows?: number, maxRows?: number }', 'false', '自适应高度，为 true 时高度随内容自动调整；为对象时可指定 minRows/maxRows'],
    ['minRows', 'number', '—', 'textarea 最小行数（仅文本域生效）'],
    ['maxRows', 'number', '—', 'textarea 最大行数（仅文本域生效）'],
    ['show-word-limit', 'boolean', 'false', '在输入框内部末尾显示剩余字数，如 \"3 / 20\"'],
    ['show-word', 'boolean', 'false', '在输入框内部末尾显示已输入字符数'],
    ['show-word-limit-outside', 'boolean', 'false', '将剩余字数显示在输入框外部末尾下方'],
    ['show-word-outside', 'boolean', 'false', '将已输入字符数显示在输入框外部末尾下方'],
  ],
  events: [
    ['focus', '--', '聚焦时触发'],
    ['blur', '--', '失焦时触发'],
    ['input', '--', '输入内容时触发'],
    ['change', '--', '内容变更时触发'],
  ],
  slots: [
    ['prepend', '前置内容'],
    ['append', '后置内容'],
  ]
}
</script>

<style scoped lang="scss">
.demo-block__preview .m-input {
  max-width: 240px;
}

.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}

.doc-prepend-select {
  :deep(.m-select__trigger) {
    border: none;
    background: transparent;
    min-width: 70px;
  }
}
</style>