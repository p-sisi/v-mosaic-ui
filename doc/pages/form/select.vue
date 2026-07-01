<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Select 选择器</h1>
    <p class="doc-page__desc">下拉选择器，通过 MSelect 包裹 MOption / MOptionGroup 使用。支持 v-model 双向绑定、可清空、禁用、尺寸、自定义选项颜色与分组、多选及标签折叠。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>v-model</code> 绑定选中值，<code>MOption</code> 的 <code>value</code> 为选项值（必填），<code>label</code> 为显示文本（默认取 value）。</p>
        <DemoBlock :code="basicCode">
          <MSelect v-model="basicValue" placeholder="请选择框架">
            <MOption value="vue" label="Vue" />
            <MOption value="react" label="React" />
            <MOption value="angular" label="Angular" />
            <MOption value="svelte" label="Svelte" />
          </MSelect>
          <span class="demo-event-result">当前值：{{ basicValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled-option">
        <h2>禁用选项</h2>
        <p class="doc-page__hint">为 <code>MOption</code> 设置 <code>disabled</code> 可禁用单个选项，禁用项不可点击。</p>
        <DemoBlock :code="disabledOptionCode">
          <MSelect v-model="disabledOptionValue" placeholder="请选择">
            <MOption value="a" label="可用选项 A" />
            <MOption value="b" label="禁用选项 B" disabled />
            <MOption value="c" label="可用选项 C" />
          </MSelect>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用选择器</h2>
        <p class="doc-page__hint">为 <code>MSelect</code> 设置 <code>disabled</code> 可禁用整个选择器。</p>
        <DemoBlock :code="disabledCode">
          <MSelect v-model="disabledValue" disabled placeholder="禁用状态">
            <MOption value="a" label="选项 A" />
            <MOption value="b" label="选项 B" />
          </MSelect>
        </DemoBlock>
      </div>

      <div class="doc-section" id="clearable">
        <h2>可清空</h2>
        <p class="doc-page__hint">设置 <code>clearable</code> 后，选择器有值时 hover 会出现清除按钮，点击可清空并触发 <code>clear</code> 事件。</p>
        <DemoBlock :code="clearableCode">
          <MSelect v-model="clearableValue" clearable placeholder="请选择" @clear="handleClear">
            <MOption value="beijing" label="北京" />
            <MOption value="shanghai" label="上海" />
            <MOption value="shenzhen" label="深圳" />
          </MSelect>
          <span class="demo-event-result">{{ clearMsg }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 设置尺寸，可选 <code>small</code> / <code>default</code> / <code>large</code>。通过 <code>width</code> 设置自定义宽度。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group">
            <MSelect v-model="sizeValue" size="small" placeholder="Small">
              <MOption value="a" label="选项 A" />
              <MOption value="b" label="选项 B" />
            </MSelect>
          </div>
          <div class="doc-demo-group">
            <MSelect v-model="sizeValue" size="default" placeholder="Default">
              <MOption value="a" label="选项 A" />
              <MOption value="b" label="选项 B" />
            </MSelect>
          </div>
          <div class="doc-demo-group">
            <MSelect v-model="sizeValue" size="large" placeholder="Large">
              <MOption value="a" label="选项 A" />
              <MOption value="b" label="选项 B" />
            </MSelect>
          </div>
          <div class="doc-demo-group">
            <MSelect v-model="widthValue" :width="300" placeholder="自定义宽度：300px">
              <MOption value="a" label="选项 A" />
              <MOption value="b" label="选项 B" />
            </MSelect>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="color">
        <h2>自定义选项颜色</h2>
        <p class="doc-page__hint">通过 <code>color</code> 设置选项背景颜色，<code>activeColor</code> 设置选中时的文字与勾选颜色。</p>
        <DemoBlock :code="colorCode">
          <MSelect v-model="colorValue" placeholder="请选择">
            <MOption value="vue" label="Vue" color="#f0f9eb" active-color="#67c23a" />
            <MOption value="react" label="React" color="#fdf6ec" active-color="#e6a23c" />
            <MOption value="angular" label="Angular" color="#fef0f0" active-color="#f56c6c" />
          </MSelect>
        </DemoBlock>
      </div>

      <div class="doc-section" id="group">
        <h2>选项分组</h2>
        <p class="doc-page__hint">使用 <code>MOptionGroup</code> 对选项进行分组，<code>label</code> 为分组标题，可对整个分组设置 <code>disabled</code>。</p>
        <DemoBlock :code="groupCode">
          <MSelect v-model="groupValue" placeholder="请选择城市">
            <MOptionGroup label="热门城市">
              <MOption value="beijing" label="北京" />
              <MOption value="shanghai" label="上海" />
            </MOptionGroup>
            <MOptionGroup label="其他城市">
              <MOption value="shenzhen" label="深圳" />
              <MOption value="guangzhou" label="广州" />
            </MOptionGroup>
          </MSelect>
        </DemoBlock>
      </div>

      <div class="doc-section" id="placeholder">
        <h2>占位文本</h2>
        <p class="doc-page__hint">通过 <code>placeholder</code> 自定义未选中时的占位文本。</p>
        <DemoBlock :code="placeholderCode">
          <MSelect v-model="placeholderValue" placeholder="请选择你的爱好">
            <MOption value="music" label="音乐" />
            <MOption value="sport" label="运动" />
            <MOption value="reading" label="阅读" />
          </MSelect>
        </DemoBlock>
      </div>

      <div class="doc-section" id="width">
        <h2>自定义宽度</h2>
        <p class="doc-page__hint">默认宽度为 <code>200px</code>，通过 <code>width</code> 属性可控制选择器宽度，支持数字（px）或字符串。</p>
        <DemoBlock :code="widthCode">
          <div class="doc-demo-group">
            <MSelect v-model="widthValue" :width="120" placeholder="120px">
              <MOption value="a" label="选项 A" />
              <MOption value="b" label="选项 B" />
            </MSelect>
            <MSelect v-model="widthValue" width="100%" placeholder="100%">
              <MOption value="a" label="选项 A" />
              <MOption value="b" label="选项 B" />
            </MSelect>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="multiple">
        <h2>多选</h2>
        <p class="doc-page__hint">设置 <code>multiple</code> 启用多选，<code>v-model</code> 为选中值组成的数组，选中值以 Tag 形式展现，点击 Tag 关闭按钮可移除。</p>
        <DemoBlock :code="multipleCode">
          <MSelect v-model="multipleValue" multiple placeholder="请选择">
            <MOption value="vue" label="Vue" />
            <MOption value="react" label="React" />
            <MOption value="angular" label="Angular" />
            <MOption value="svelte" label="Svelte" />
            <MOption value="solid" label="Solid" />
          </MSelect>
          <span class="demo-event-result">当前值：{{ multipleValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="collapse-tags">
        <h2>折叠标签</h2>
        <p class="doc-page__hint">设置 <code>collapse-tags</code> 后，选中值会尽量平铺；仅当下拉框无法再容纳一个标签时，才将多出的标签折叠为 <code>+N</code>。可通过 <code>max-collapse-tags</code> 固定显示数量，未设置时按可视区域动态计算。</p>
        <DemoBlock :code="collapseTagsCode">
          <MSelect v-model="collapseValue" multiple collapse-tags placeholder="请选择">
            <MOption value="vue" label="Vue" />
            <MOption value="react" label="React" />
            <MOption value="angular" label="Angular" />
            <MOption value="svelte" label="Svelte" />
            <MOption value="solid" label="Solid" />
          </MSelect>
        </DemoBlock>
      </div>

      <div class="doc-section" id="collapse-tags-tooltip">
        <h2>折叠标签提示</h2>
        <p class="doc-page__hint">设置 <code>collapse-tags-tooltip</code> 后，鼠标悬停 <code>+N</code> 文字可显示具体所选值的提示。</p>
        <DemoBlock :code="collapseTagsTooltipCode">
          <MSelect
            v-model="tooltipValue"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="请选择"
          >
            <MOption value="vue" label="Vue" />
            <MOption value="react" label="React" />
            <MOption value="angular" label="Angular" />
            <MOption value="svelte" label="Svelte" />
            <MOption value="solid" label="Solid" />
          </MSelect>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MSelect Props</h3>
    <ApiTable type="prop" :data="DATA.selectProps" />

    <h3>MSelect Events</h3>
    <ApiTable type="event" :data="DATA.selectEvents" />

    <h3>MOption Props</h3>
    <ApiTable type="prop" :data="DATA.optionProps" />

    <h3>MOptionGroup Props</h3>
    <ApiTable type="prop" :data="DATA.groupProps" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicValue = ref('')
const disabledOptionValue = ref('')
const disabledValue = ref('a')
const clearableValue = ref('beijing')
const sizeValue = ref('')
const colorValue = ref('')
const groupValue = ref('')
const placeholderValue = ref('')
const widthValue = ref('')
const multipleValue = ref<string[]>([])
const collapseValue = ref<string[]>(['vue', 'react', 'angular'])
const tooltipValue = ref<string[]>(['vue', 'react', 'angular', 'svelte'])

const clearMsg = ref('')
function handleClear() {
  clearMsg.value = 'clear 事件已触发'
  setTimeout(() => { clearMsg.value = '' }, 1500)
}

const basicCode = `<MSelect v-model="value" placeholder="请选择框架">
  <MOption value="vue" label="Vue" />
  <MOption value="react" label="React" />
  <MOption value="angular" label="Angular" />
  <MOption value="svelte" label="Svelte" />
</MSelect>`

const disabledOptionCode = `<MSelect v-model="value" placeholder="请选择">
  <MOption value="a" label="可用选项 A" />
  <MOption value="b" label="禁用选项 B" disabled />
  <MOption value="c" label="可用选项 C" />
</MSelect>`

const disabledCode = `<MSelect v-model="value" disabled placeholder="禁用状态">
  <MOption value="a" label="选项 A" />
  <MOption value="b" label="选项 B" />
</MSelect>`

const clearableCode = `<MSelect v-model="value" clearable placeholder="请选择" @clear="handleClear">
  <MOption value="beijing" label="北京" />
  <MOption value="shanghai" label="上海" />
  <MOption value="shenzhen" label="深圳" />
</MSelect>`

const sizeCode = `<MSelect v-model="value" size="small" placeholder="Small">
  <MOption value="a" label="选项 A" />
  <MOption value="b" label="选项 B" />
</MSelect>
<MSelect v-model="value" size="default" placeholder="Default">
  <MOption value="a" label="选项 A" />
  <MOption value="b" label="选项 B" />
</MSelect>
<MSelect v-model="value" size="large" placeholder="Large">
  <MOption value="a" label="选项 A" />
  <MOption value="b" label="选项 B" />
</MSelect>`

const colorCode = `<MSelect v-model="value" placeholder="请选择">
  <MOption value="vue" label="Vue" color="#f0f9eb" active-color="#67c23a" />
  <MOption value="react" label="React" color="#fdf6ec" active-color="#e6a23c" />
  <MOption value="angular" label="Angular" color="#fef0f0" active-color="#f56c6c" />
</MSelect>`

const groupCode = `<MSelect v-model="value" placeholder="请选择城市">
  <MOptionGroup label="热门城市">
    <MOption value="beijing" label="北京" />
    <MOption value="shanghai" label="上海" />
  </MOptionGroup>
  <MOptionGroup label="其他城市">
    <MOption value="shenzhen" label="深圳" />
    <MOption value="guangzhou" label="广州" />
  </MOptionGroup>
</MSelect>`

const placeholderCode = `<MSelect v-model="value" placeholder="请选择你的爱好">
  <MOption value="music" label="音乐" />
  <MOption value="sport" label="运动" />
  <MOption value="reading" label="阅读" />
</MSelect>`

const widthCode = `<MSelect v-model="value" :width="120" placeholder="120px">
  <MOption value="a" label="选项 A" />
  <MOption value="b" label="选项 B" />
</MSelect>
<MSelect v-model="value" :width="300" placeholder="300px">
  <MOption value="a" label="选项 A" />
  <MOption value="b" label="选项 B" />
</MSelect>
<MSelect v-model="value" width="100%" placeholder="100%">
  <MOption value="a" label="选项 A" />
  <MOption value="b" label="选项 B" />
</MSelect>`

const multipleCode = `<MSelect v-model="value" multiple placeholder="请选择">
  <MOption value="vue" label="Vue" />
  <MOption value="react" label="React" />
  <MOption value="angular" label="Angular" />
  <MOption value="svelte" label="Svelte" />
  <MOption value="solid" label="Solid" />
</MSelect>`

const collapseTagsCode = `<MSelect v-model="value" multiple collapse-tags placeholder="请选择">
  <MOption value="vue" label="Vue" />
  <MOption value="react" label="React" />
  <MOption value="angular" label="Angular" />
  <MOption value="svelte" label="Svelte" />
  <MOption value="solid" label="Solid" />
</MSelect>`

const collapseTagsTooltipCode = `<MSelect
  v-model="value"
  multiple
  collapse-tags
  collapse-tags-tooltip
  placeholder="请选择"
>
  <MOption value="vue" label="Vue" />
  <MOption value="react" label="React" />
  <MOption value="angular" label="Angular" />
  <MOption value="svelte" label="Svelte" />
  <MOption value="solid" label="Solid" />
</MSelect>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'disabled-option', label: '禁用选项' },
  { id: 'disabled', label: '禁用选择器' },
  { id: 'clearable', label: '可清空' },
  { id: 'size', label: '尺寸' },
  { id: 'color', label: '自定义颜色' },
  { id: 'group', label: '选项分组' },
  { id: 'placeholder', label: '占位文本' },
  { id: 'width', label: '自定义宽度' },
  { id: 'multiple', label: '多选' },
  { id: 'collapse-tags', label: '折叠标签' },
  { id: 'collapse-tags-tooltip', label: '折叠标签提示' },
  { id: 'api', label: 'API' },
]

const DATA = {
  selectProps: [
    ['modelValue', 'string | number | (string | number)[]', '', '绑定值（v-model），多选时为数组'],
    ['size', 'small | default | large', 'default', '尺寸'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['clearable', 'boolean', 'false', '是否可清空'],
    ['placeholder', 'string', '请选择', '占位文本'],
    ['placement', 'string', 'bottom-start', '弹出层位置'],
    ['popperClass', 'string', '', '弹出层自定义类名'],
    ['width', 'string | number', '200', '选择器宽度，数字按 px 计'],
    ['multiple', 'boolean', 'false', '是否多选，开启后 v-model 为数组'],
    ['collapseTags', 'boolean', 'false', '多选时是否折叠标签，超出可视区域的部分以 +N 呈现'],
    ['collapseTagsTooltip', 'boolean', 'false', '折叠标签时是否启用 tooltip 显示所选值'],
    ['maxCollapseTags', 'number', '—', '折叠时显示的最大标签数，不设置则按可视区域动态计算'],
  ],
  selectEvents: [
    ['update:modelValue', 'value: string | number | (string | number)[]', '值变化时触发'],
    ['change', 'value: string | number | (string | number)[]', '值变化时触发'],
    ['focus', 'event', '聚焦时触发'],
    ['blur', 'event', '失焦时触发'],
    ['clear', '—', '点击清除按钮时触发'],
    ['remove-tag', 'value: string | number', '多选时移除标签时触发'],
    ['show', '—', '下拉显示时触发'],
    ['hide', '—', '下拉隐藏时触发'],
  ],
  optionProps: [
    ['value', 'string | number', '—', '选项的值，必填'],
    ['label', 'string | number', '—', '选项的标签，默认取 value'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['color', 'string', '—', '选项背景颜色'],
    ['activeColor', 'string', '—', '选中时的文字与勾选颜色'],
  ],
  groupProps: [
    ['label', 'string', '—', '分组标签，必填'],
    ['disabled', 'boolean', 'false', '是否禁用整个分组'],
  ],
}
</script>

<style scoped lang="scss">
.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}
</style>
