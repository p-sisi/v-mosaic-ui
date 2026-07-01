<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>InputTag 标签式输入框</h1>
    <p class="doc-page__desc">通过回车键将输入内容生成标签，支持折叠展示、拖拽排序、最大数量限制、自定义标签样式等。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">通过 <code>v-model</code> 绑定字符串数组。在输入框中输入内容后按回车键即可生成标签，标签带有进入动画。按退格键可删除最后一个标签。</p>
        <DemoBlock :code="basicCode">
          <MInputTag v-model="basicValue" placeholder="输入后回车生成标签" />
          <p class="demo-event-result">当前标签：{{ basicValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="max">
        <h2>最大数量限制</h2>
        <p class="doc-page__hint">通过 <code>max</code> 设置最大可输入标签数，达到上限后输入框自动禁用。</p>
        <DemoBlock :code="maxCode">
          <MInputTag v-model="maxValue" :max="3" placeholder="最多 3 个标签" />
          <p class="demo-event-result">当前标签：{{ maxValue }}（{{ maxValue.length }}/3）</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="collapse">
        <h2>折叠标签</h2>
        <p class="doc-page__hint">设置 <code>collapse-tags</code> 后，超出输入框宽度的标签自动折叠为 <code>+N</code>，鼠标 hover 到 <code>+N</code> 上时以气泡展示剩余标签。默认为 <code>false</code>，标签可换行展示。</p>
        <DemoBlock :code="collapseCode">
          <MInputTag v-model="collapseValue" collapse-tags placeholder="输入后回车" />
          <p class="demo-event-result">当前标签：{{ collapseValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="clearable">
        <h2>可清空</h2>
        <p class="doc-page__hint">设置 <code>clearable</code> 后，标签右侧出现关闭按钮可单独删除，输入框右侧出现一键清空按钮。</p>
        <DemoBlock :code="clearableCode">
          <MInputTag v-model="clearableValue" clearable placeholder="输入后回车" />
          <p class="demo-event-result">当前标签：{{ clearableValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用</h2>
        <p class="doc-page__hint">设置 <code>disabled</code> 禁用整个标签输入框。</p>
        <DemoBlock :code="disabledCode">
          <MInputTag v-model="disabledValue" disabled placeholder="禁用状态" />
        </DemoBlock>
      </div>

      <div class="doc-section" id="draggable">
        <h2>拖拽排序</h2>
        <p class="doc-page__hint">设置 <code>draggable</code> 后，可以自由拖拽已输入的标签调整顺序。</p>
        <DemoBlock :code="draggableCode">
          <MInputTag v-model="draggableValue" draggable clearable placeholder="输入后回车，可拖拽排序" />
          <p class="demo-event-result">当前顺序：{{ draggableValue }}</p>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 设置尺寸，可选 <code>small</code> / <code>default</code> / <code>large</code>。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group">
            <MInputTag v-model="sizeValue" size="small" placeholder="Small" />
          </div>
          <div class="doc-demo-group">
            <MInputTag v-model="sizeValue" size="default" placeholder="Default" />
          </div>
          <div class="doc-demo-group">
            <MInputTag v-model="sizeValue" size="large" placeholder="Large" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="tag-style">
        <h2>标签样式</h2>
        <p class="doc-page__hint">通过 <code>tag-type</code> 控制标签颜色（primary / success / warning / danger / info），<code>tag-effect</code> 控制标签风格（light / dark / plain）。</p>
        <DemoBlock :code="tagStyleCode">
          <div class="doc-demo-group">
            <MInputTag v-model="typeValue" tag-type="primary" placeholder="primary" />
          </div>
          <div class="doc-demo-group">
            <MInputTag v-model="typeValue2" tag-type="success" placeholder="success" />
          </div>
          <div class="doc-demo-group">
            <MInputTag v-model="typeValue3" tag-type="danger" placeholder="danger" />
          </div>
          <div class="doc-demo-group">
            <MInputTag v-model="effectLight" tag-type="primary" tag-effect="light" placeholder="light" />
          </div>
          <div class="doc-demo-group">
            <MInputTag v-model="effectDark" tag-type="primary" tag-effect="dark" placeholder="dark" />
          </div>
          <div class="doc-demo-group">
            <MInputTag v-model="effectPlain" tag-type="primary" tag-effect="plain" placeholder="plain" />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="tag-slot">
        <h2>自定义标签</h2>
        <p class="doc-page__hint">通过 <code>#tag</code> 插槽自定义标签展示样式，插槽提供 <code>tag</code> 和 <code>index</code> 两个参数。</p>
        <DemoBlock :code="tagSlotCode">
          <MInputTag v-model="slotValue" clearable placeholder="输入后回车">
            <template #tag="{ tag, index }">
              <span class="doc-custom-tag">
                <span class="doc-custom-tag__index">{{ index + 1 }}</span>
                {{ tag }}
                <span class="doc-custom-tag__close" @click="removeSlotTag(index)">&times;</span>
              </span>
            </template>
          </MInputTag>
        </DemoBlock>
      </div>

      <div class="doc-section" id="trigger">
        <h2>触发方式</h2>
        <p class="doc-page__hint">通过 <code>trigger</code> 设置生成标签的触发方式，可选 <code>enter</code>（回车）、<code>space</code>（空格）、<code>comma</code>（逗号）。</p>
        <DemoBlock :code="triggerCode">
          <MInputTag v-model="triggerValue" trigger="comma" placeholder="输入后按逗号生成标签" />
          <p class="demo-event-result">当前标签：{{ triggerValue }}</p>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />
    <h3>Events</h3>
    <ApiTable type="event" :data="DATA.events" />
    <h3>Slots</h3>
    <ApiTable type="slot" :data="DATA.slots" />
    <h3>Methods</h3>
    <ApiTable type="prop" :data="DATA.methods" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const basicValue = ref<string[]>(['Vue', 'React'])
const maxValue = ref<string[]>(['苹果', '香蕉'])
const collapseValue = ref<string[]>(['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'C++', 'Swift'])
const clearableValue = ref<string[]>(['标签一', '标签二', '标签三'])
const disabledValue = ref<string[]>(['不可编辑'])
const draggableValue = ref<string[]>(['第一', '第二', '第三', '第四'])
const sizeValue = ref<string[]>(['标签'])
const typeValue = ref<string[]>(['Primary'])
const typeValue2 = ref<string[]>(['Success'])
const typeValue3 = ref<string[]>(['Danger'])
const effectLight = ref<string[]>(['Light'])
const effectDark = ref<string[]>(['Dark'])
const effectPlain = ref<string[]>(['Plain'])
const slotValue = ref<string[]>(['自定义A', '自定义B'])
const triggerValue = ref<string[]>(['逗号', '触发'])

function removeSlotTag(index: number) {
  slotValue.value.splice(index, 1)
}

const basicCode = `<MInputTag v-model="value" placeholder="输入后回车生成标签" />`

const maxCode = `<MInputTag v-model="value" :max="3" placeholder="最多 3 个标签" />`

const collapseCode = `<MInputTag v-model="value" collapse-tags placeholder="输入后回车" />`

const clearableCode = `<MInputTag v-model="value" clearable placeholder="输入后回车" />`

const disabledCode = `<MInputTag v-model="value" disabled placeholder="禁用状态" />`

const draggableCode = `<MInputTag v-model="value" draggable clearable placeholder="输入后回车，可拖拽排序" />`

const sizeCode = `<MInputTag v-model="value" size="small" placeholder="Small" />
<MInputTag v-model="value" size="default" placeholder="Default" />
<MInputTag v-model="value" size="large" placeholder="Large" />`

const tagStyleCode = `<MInputTag v-model="val1" tag-type="primary" placeholder="primary" />
<MInputTag v-model="val2" tag-type="success" placeholder="success" />
<MInputTag v-model="val3" tag-type="danger" placeholder="danger" />

<MInputTag v-model="val4" tag-type="primary" tag-effect="light" placeholder="light" />
<MInputTag v-model="val5" tag-type="primary" tag-effect="dark" placeholder="dark" />
<MInputTag v-model="val6" tag-type="primary" tag-effect="plain" placeholder="plain" />`

const tagSlotCode = `<MInputTag v-model="value" clearable placeholder="输入后回车">
  <template #tag="{ tag, index }">
    <span class="custom-tag">
      <span class="custom-tag__index">{{ index + 1 }}</span>
      {{ tag }}
      <span class="custom-tag__close" @click="removeTag(index)">&times;</span>
    </span>
  </template>
</MInputTag>`

const triggerCode = `<MInputTag v-model="value" trigger="comma" placeholder="输入后按逗号生成标签" />`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'max', label: '最大数量限制' },
  { id: 'collapse', label: '折叠标签' },
  { id: 'clearable', label: '可清空' },
  { id: 'disabled', label: '禁用' },
  { id: 'draggable', label: '拖拽排序' },
  { id: 'size', label: '尺寸' },
  { id: 'tag-style', label: '标签样式' },
  { id: 'tag-slot', label: '自定义标签' },
  { id: 'trigger', label: '触发方式' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'string[]', '[]', '绑定值（v-model），字符串数组'],
    ['max', 'number', '0', '最大可输入标签数，0 表示不限制，达到上限后禁用输入'],
    ['collapseTags', 'boolean', 'false', '是否折叠超出宽度的标签，显示 +N，hover 展示剩余'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['clearable', 'boolean', 'false', '是否可清空（显示单标签关闭 + 一键清空按钮）'],
    ['draggable', 'boolean', 'false', '是否可拖拽排序标签'],
    ['size', 'small | default | large', 'default', '尺寸'],
    ['tagType', 'default | primary | success | warning | danger | info', 'primary', '标签颜色类型'],
    ['tagEffect', 'light | dark | plain', 'light', '标签风格'],
    ['trigger', 'enter | space | comma', 'enter', '生成标签的触发方式'],
    ['placeholder', 'string', '请输入后回车', '占位提示文本'],
    ['allowDuplicate', 'boolean', 'false', '是否允许重复标签'],
  ],
  events: [
    ['update:modelValue', 'value: string[]', '值变化时触发'],
    ['change', 'value: string[]', '值变化时触发'],
    ['add', 'tag: string', '添加标签时触发'],
    ['remove', 'tag: string', '删除标签时触发'],
    ['clear', '—', '一键清空时触发'],
  ],
  slots: [
    ['tag', '自定义标签展示，参数：{ tag: string, index: number }'],
  ],
  methods: [
    ['focus', '—', '聚焦输入框'],
    ['blur', '—', '失焦输入框'],
  ],
}
</script>

<style scoped lang="scss">
.demo-block__preview .m-input-tag {
  max-width: 360px;
}

.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}

.doc-custom-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0 8px;
  background: linear-gradient(135deg, #a78bfa, #7c3aed);
  color: #fff;
  border-radius: 12px;
  font-size: 12px;
  cursor: default;

  &__index {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    font-size: 10px;
  }

  &__close {
    cursor: pointer;
    margin-left: 2px;
    font-size: 14px;
    line-height: 1;

    &:hover {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>
