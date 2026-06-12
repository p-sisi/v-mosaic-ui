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

      <div class="doc-section" id="textarea">
        <h2>文本域</h2>
        <p class="doc-page__hint">设置 <code>type="textarea"</code> 即可切换为文本域输入框，通过 <code>rows</code> 设置默认行数。</p>
        <DemoBlock code='<MInput v-model="textareaValue" type="textarea" placeholder="请输入内容" :rows="4" />'>
          <MInput v-model="textareaValue" type="textarea" placeholder="请输入内容" :rows="4" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="textarea-autosize">
        <h2>自适应高度</h2>
        <p class="doc-page__hint">设置 <code>autosize</code> 可使文本域根据内容自动调整高度。通过 <code>autosize="{ minRows, maxRows }"</code> 或单独的 <code>min-rows</code> / <code>max-rows</code> 属性限制行数范围。</p>
        <DemoBlock :code="textareaAutosizeCode">
          <div class="doc-demo-group">
            <MInput v-model="autosizeValue" type="textarea" placeholder="自适应高度" autosize />
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
    <table class="doc-table">
      <thead>
        <tr><th>属性</th><th>类型</th><th>默认值</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>modelValue</td><td>string | number</td><td>''</td><td>绑定值（v-model）</td></tr>
        <tr><td>type</td><td>'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'textarea'</td><td>'text'</td><td>输入框类型，textarea 为文本域</td></tr>
        <tr><td>size</td><td>'small' | 'default' | 'large'</td><td>'default'</td><td>输入框预设尺寸</td></tr>
        <tr><td>width</td><td>string</td><td>—</td><td>自定义宽度，如 "100%"、"200px"</td></tr>
        <tr><td>placeholder</td><td>string</td><td>''</td><td>占位文本</td></tr>
        <tr><td>disabled</td><td>boolean</td><td>false</td><td>是否禁用</td></tr>
        <tr><td>clearable</td><td>boolean</td><td>false</td><td>是否可清除</td></tr>
        <tr><td>maxlength</td><td>number</td><td>—</td><td>最大输入长度（原生属性，兼容保留）</td></tr>
        <tr><td>max</td><td>number</td><td>—</td><td>最大字数限制</td></tr>
        <tr><td>min</td><td>number</td><td>—</td><td>最小字数限制</td></tr>
        <tr><td>rows</td><td>number</td><td>2</td><td>textarea 默认行数（仅文本域生效）</td></tr>
        <tr><td>autosize</td><td>boolean | { minRows?: number, maxRows?: number }</td><td>false</td><td>自适应高度，为 true 时高度随内容自动调整；为对象时可指定 minRows/maxRows</td></tr>
        <tr><td>minRows</td><td>number</td><td>—</td><td>textarea 最小行数（仅文本域生效）</td></tr>
        <tr><td>maxRows</td><td>number</td><td>—</td><td>textarea 最大行数（仅文本域生效）</td></tr>
        <tr><td>show-word-limit</td><td>boolean</td><td>false</td><td>在输入框内部末尾显示剩余字数，如 "3 / 20"</td></tr>
        <tr><td>show-word</td><td>boolean</td><td>false</td><td>在输入框内部末尾显示已输入字符数</td></tr>
        <tr><td>show-word-limit-outside</td><td>boolean</td><td>false</td><td>将剩余字数显示在输入框外部末尾下方</td></tr>
        <tr><td>show-word-outside</td><td>boolean</td><td>false</td><td>将已输入字符数显示在输入框外部末尾下方</td></tr>
      </tbody>
    </table>

    <h3>Events</h3>
    <table class="doc-table">
      <thead>
        <tr><th>事件</th><th>参数</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>update:modelValue</td><td>string | number</td><td>输入值变化时触发，用于 v-model 双向绑定</td></tr>
        <tr><td>input</td><td>string | number</td><td>每次输入时触发</td></tr>
        <tr><td>change</td><td>string | number</td><td>值变更并失焦后触发</td></tr>
        <tr><td>focus</td><td>FocusEvent</td><td>输入框聚焦时触发</td></tr>
        <tr><td>blur</td><td>FocusEvent</td><td>输入框失焦时触发</td></tr>
        <tr><td>clear</td><td>—</td><td>点击清除按钮时触发</td></tr>
      </tbody>
    </table>

    <h3>Slots</h3>
    <table class="doc-table">
      <thead>
        <tr><th>插槽</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>prepend</td><td>输入框前置内容</td></tr>
        <tr><td>append</td><td>输入框后置内容</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'

const inputValue = ref('')
const textareaValue = ref('')
const autosizeValue = ref('')
const autosizeMinMaxValue = ref('')
const minMaxRowsValue = ref('')
const clearableValue = ref('可清除的内容')
const clearMsg = ref('')  // 清除事件的提示信息

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

const prependAppendCode = `<MInput v-model="val1" placeholder="请输入内容">
  <template #prepend>Http://</template>
</MInput>

<MInput v-model="val2" placeholder="请输入内容">
  <template #append>.com</template>
</MInput>

<MInput v-model="val3" placeholder="请输入内容">
  <template #prepend>Http://</template>
  <template #append>.com</template>
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
  focusMsg = '输入框已聚焦'
}
function handleBlur(e) {
  focusMsg = '输入框已失焦'
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
function handleInput(v) { inputCount++ }
function handleChange(v) { changeCount++ }
<` + `/script>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'clearable', label: '可清除' },
  { id: 'size', label: '尺寸' },
  { id: 'disabled', label: '禁用状态' },
  { id: 'textarea', label: '文本域' },
  { id: 'textarea-autosize', label: '自适应高度' },
  { id: 'word-count', label: '字数限制与统计' },
  { id: 'prepend-append', label: '前置与后置内容' },
  { id: 'event-focus-blur', label: '聚焦与失焦' },
  { id: 'event-input-change', label: '输入与变更' },
  { id: 'api', label: 'API' },
]
</script>

<style scoped lang="scss">
.demo-block__preview .m-input {
  max-width: 240px;
}

.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}
</style>