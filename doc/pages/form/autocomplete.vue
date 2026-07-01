<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Autocomplete 自动补全</h1>
    <p class="doc-page__desc">根据输入内容提供建议，支持防抖、键盘导航和自定义建议项。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">通过 <code>fetch-suggestions</code> 属性提供搜索方法，接收查询字符串和回调函数。建议项为 <code>{ value: string }</code> 格式的对象数组。</p>
        <DemoBlock :code="basicCode">
          <MAutocomplete
            v-model="basicValue"
            :fetch-suggestions="fetchSuggestions"
            placeholder="请输入内容"
          />
        </DemoBlock>
      </div>

      <div class="doc-section" id="debounce-disabled">
        <h2>防抖与禁用</h2>
        <p class="doc-page__hint">通过 <code>debounce</code> 设置搜索防抖延迟（默认 300ms），<code>disabled</code> 禁用输入。</p>
        <DemoBlock :code="debounceDisabledCode">
          <div class="doc-demo-group">
            <MAutocomplete
              v-model="debounceValue"
              :fetch-suggestions="fetchSuggestions"
              :debounce="500"
              placeholder="防抖 500ms"
            />
            <MAutocomplete
              v-model="disabledValue"
              :fetch-suggestions="fetchSuggestions"
              disabled
              placeholder="禁用状态"
            />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="keyboard">
        <h2>键盘导航</h2>
        <p class="doc-page__hint">建议列表弹出后，支持 <code>Up/Down</code> 切换高亮项，<code>Enter</code> 选中，<code>Esc</code> 关闭。设置 <code>trigger-on-focus</code> 可在聚焦时即触发搜索。</p>
        <DemoBlock :code="keyboardCode">
          <MAutocomplete
            v-model="keyboardValue"
            :fetch-suggestions="fetchSuggestions"
            trigger-on-focus
            placeholder="聚焦即搜索，支持键盘导航"
          />
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

const basicValue = ref('')
const debounceValue = ref('')
const disabledValue = ref('')
const keyboardValue = ref('')

const allSuggestions = [
  { value: 'Vue' },
  { value: 'Vue Router' },
  { value: 'Vuex' },
  { value: 'Vite' },
  { value: 'React' },
  { value: 'Redux' },
  { value: 'Angular' },
  { value: 'TypeScript' },
  { value: 'JavaScript' },
]

function fetchSuggestions(query: string, cb: (results: any[]) => void) {
  const results = query
    ? allSuggestions.filter(item => item.value.toLowerCase().includes(query.toLowerCase()))
    : allSuggestions
  cb(results)
}

const basicCode = `<MAutocomplete
  v-model="value"
  :fetch-suggestions="fetchSuggestions"
  placeholder="请输入内容"
/>

<script setup>
const value = ref('')
const allSuggestions = [
  { value: 'Vue' },
  { value: 'Vue Router' },
  { value: 'Vuex' },
  { value: 'Vite' },
  { value: 'React' },
  { value: 'Redux' },
  { value: 'Angular' },
  { value: 'TypeScript' },
  { value: 'JavaScript' },
]
function fetchSuggestions(query, cb) {
  const results = query
    ? allSuggestions.filter(item => item.value.toLowerCase().includes(query.toLowerCase()))
    : allSuggestions
  cb(results)
}
<` + `/script>`

const debounceDisabledCode = `<!-- 防抖 500ms -->
<MAutocomplete v-model="val1" :fetch-suggestions="fetchSuggestions"
  :debounce="500" placeholder="防抖 500ms" />

<!-- 禁用 -->
<MAutocomplete v-model="val2" :fetch-suggestions="fetchSuggestions"
  disabled placeholder="禁用状态" />`

const keyboardCode = `<!-- 聚焦即搜索 -->
<MAutocomplete v-model="value" :fetch-suggestions="fetchSuggestions"
  trigger-on-focus placeholder="聚焦即搜索，支持键盘导航" />`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'debounce-disabled', label: '防抖与禁用' },
  { id: 'keyboard', label: '键盘导航' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'string', '', '绑定值（v-model）'],
    ['fetchSuggestions', '(query: string, cb: (results: any[]) => void) => void', '—', '获取建议的方法，必填'],
    ['placeholder', 'string', '请输入', '占位文本'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['valueKey', 'string', 'value', '建议项中用于显示的键名'],
    ['debounce', 'number', '300', '搜索防抖延迟(ms)'],
    ['placement', 'string', 'bottom-start', '弹出层位置'],
    ['triggerOnFocus', 'boolean', 'true', '是否在聚焦时触发搜索'],
    ['selectWhenUnmatched', 'boolean', 'false', '是否在无匹配项时按回车也触发 select'],
    ['hideLoading', 'boolean', 'false', '是否隐藏加载状态'],
    ['popperClass', 'string', '—', '弹出层自定义类名'],
    ['highlightFirstItem', 'boolean', 'false', '是否默认高亮第一项'],
  ],
  events: [
    ['input', 'value', '输入时触发'],
    ['change', 'value', '值变更时触发'],
    ['select', 'item', '选中建议项时触发'],
    ['focus', 'FocusEvent', '获焦时触发'],
    ['blur', 'FocusEvent', '失焦时触发'],
    ['clear', '—', '点击清除按钮时触发'],
  ],
}
</script>
