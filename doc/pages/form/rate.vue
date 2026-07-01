<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Rate 评分</h1>
    <p class="doc-page__desc">评分组件，支持半选、自定义星星数量、辅助文字、分数显示和尺寸。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>v-model</code> 绑定评分值，默认 5 颗星。点击已选中的分值可重置为 0。</p>
        <DemoBlock :code="basicCode">
          <MRate v-model="basicValue" />
          <span class="demo-event-result">评分: {{ basicValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size">
        <h2>尺寸</h2>
        <p class="doc-page__hint">通过 <code>size</code> 属性设置星星大小（像素），默认 14。</p>
        <DemoBlock :code="sizeCode">
          <div class="doc-demo-group">
            <div>
              <MRate v-model="sizeValue1" :size="12" />
            </div>
            <div>
              <MRate v-model="sizeValue2" :size="18" />
            </div>
            <div>
              <MRate v-model="sizeValue3" :size="24" />
            </div>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="half-text-score">
        <h2>半选、辅助文字与分数</h2>
        <p class="doc-page__hint">设置 <code>allow-half</code> 允许半选，<code>show-text</code> 显示辅助文字，<code>show-score</code> 显示当前分值。</p>
        <DemoBlock :code="halfTextCode">
          <div class="doc-demo-group">
            <div>
              <MRate v-model="halfValue" allow-half />
              <span class="demo-event-result">{{ halfValue }}</span>
            </div>
            <div>
              <MRate v-model="textValue" show-text />
            </div>
            <div>
              <MRate v-model="scoreValue" show-score />
            </div>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="custom">
        <h2>自定义颜色与数量</h2>
        <p class="doc-page__hint">通过 <code>colors</code> 自定义星星颜色，<code>max</code> 设置星星数量。</p>
        <DemoBlock :code="customCode">
          <div class="doc-demo-group">
            <div>
              <MRate v-model="customValue" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" />
            </div>
            <div>
              <MRate v-model="maxValue" :max="10" />
            </div>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="disabled">
        <h2>禁用</h2>
        <p class="doc-page__hint">设置 <code>disabled</code> 禁用评分，只读不可操作。</p>
        <DemoBlock :code="disabledCode">
          <div class="doc-demo-group">
            <div>
              <MRate v-model="disabledValue1" disabled />
            </div>
            <div>
              <MRate v-model="disabledValue2" disabled allow-half show-score />
            </div>
          </div>
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
const sizeValue1 = ref(3)
const sizeValue2 = ref(4)
const sizeValue3 = ref(5)
const halfValue = ref(3.5)
const textValue = ref(3)
const scoreValue = ref(4)
const customValue = ref(3)
const maxValue = ref(5)
const disabledValue1 = ref(3)
const disabledValue2 = ref(3.5)

const basicCode = `<MRate v-model="value" />

<script setup>
const value = ref(0)
<` + `/script>`

const sizeCode = `<MRate v-model="v1" :size="12" />
<MRate v-model="v2" :size="18" />
<MRate v-model="v3" :size="24" />`

const halfTextCode = `<!-- 半选 -->
<MRate v-model="halfValue" allow-half />

<!-- 辅助文字 -->
<MRate v-model="textValue" show-text />

<!-- 分数显示 -->
<MRate v-model="scoreValue" show-score />`

const customCode = `<!-- 自定义颜色 [低, 中, 高] -->
<MRate v-model="customValue" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" />

<!-- 自定义星星数量 -->
<MRate v-model="maxValue" :max="10" />`

const disabledCode = `<MRate v-model="v1" disabled />

<!-- 禁用 + 半选 + 分数 -->
<MRate v-model="v2" disabled allow-half show-score />`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'size', label: '尺寸' },
  { id: 'half-text-score', label: '半选、文字与分数' },
  { id: 'custom', label: '自定义颜色与数量' },
  { id: 'disabled', label: '禁用' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['modelValue', 'number', '0', '绑定值（v-model）'],
    ['max', 'number', '5', '最大分值（星星数量）'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['allowHalf', 'boolean', 'false', '是否允许半选'],
    ['showScore', 'boolean', 'false', '是否显示当前分值'],
    ['showText', 'boolean', 'false', '是否显示辅助文字'],
    ['textColor', 'string', '#e6a23c', '辅助文字颜色'],
    ['texts', 'string[]', '[极差, 失望, 一般, 满意, 惊喜]', '辅助文字数组'],
    ['colors', 'string[]', '[#c0c4cc, #e6a23c, #a78bfa]', '星星颜色数组，[低, 中, 高]'],
    ['scoreTemplate', 'string', '{value}', '分数显示模板'],
    ['size', 'number', '14', '星星大小（像素）'],
  ],
  events: [
    ['change', 'value', '评分变更时触发'],
  ],
}
</script>

<style scoped lang="scss">
.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}
</style>
