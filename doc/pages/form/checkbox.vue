<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Checkbox 复选框</h1>
    <p class="doc-page__desc">一组备选项中进行多选，包含 MCheckbox、MCheckboxGroup 和 MCheckboxButton 三个组件。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">单独使用 <code>v-model</code> 绑定布尔值，或使用 <code>label</code> 在组中使用。</p>
        <DemoBlock :code="basicCode">
          <MCheckbox v-model="checked">点我选中</MCheckbox>
          <span class="demo-event-result">选中: {{ checked }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="checked-value">
        <h2>自定义选中值</h2>
        <p class="doc-page__hint">通过 <code>checked-value</code> 和 <code>unchecked-value</code> 指定选中与未选中时绑定的值，<code>v-model</code> 将接收该值而非布尔值。</p>
        <DemoBlock :code="checkedValueCode">
          <MCheckbox v-model="customValue" checked-value="yes" unchecked-value="no">是否同意</MCheckbox>
          <span class="demo-event-result">值: {{ customValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="group">
        <h2>复选框组</h2>
        <p class="doc-page__hint">MCheckboxGroup 配合 MCheckbox 使用，<code>v-model</code> 绑定选中项 label 数组。</p>
        <DemoBlock :code="groupCode">
          <span class="demo-event-result">我喜欢：</span>
          <MCheckboxGroup v-model="groupValue">
            <MCheckbox label="吃饭">吃饭</MCheckbox>
            <MCheckbox label="睡觉">睡觉</MCheckbox>
            <MCheckbox label="吃宵夜">吃宵夜</MCheckbox>
            <MCheckbox label="睡大觉">睡大觉</MCheckbox>
          </MCheckboxGroup>
          <span class="demo-event-result">选中: {{ groupValue }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="border">
        <h2>边框样式</h2>
        <p class="doc-page__hint">设置 <code>border</code> 属性显示边框样式，通过 <code>size</code> 属性控制尺寸（<code>small</code> / <code>default</code> / <code>large</code>）。</p>
        <DemoBlock :code="borderCode">
          <div class="doc-demo-group">
            <MCheckbox v-model="borderChecked" border size="small">小号边框</MCheckbox>
          </div>
          <div class="doc-demo-group">
            <MCheckbox v-model="borderChecked" border>默认边框</MCheckbox>
          </div>
          <div class="doc-demo-group">
            <MCheckbox v-model="borderChecked" border size="large">大号边框</MCheckbox>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="indeterminate">
        <h2>不确定状态</h2>
        <p class="doc-page__hint"><code>indeterminate</code> 表示部分选中，常用于全选场景：全部选中为全选态，选中 1~3 个为不确定态，未选为空态。</p>
        <DemoBlock :code="indeterminateCode">
          <MCheckbox
            :model-value="isAllChecked"
            :indeterminate="isIndeterminate"
            @change="handleCheckAll"
          >全选</MCheckbox>
          <MCheckboxGroup v-model="checkedCities">
            <MCheckbox v-for="city in allOptions" :key="city" :label="city">{{ city }}</MCheckbox>
          </MCheckboxGroup>
        </DemoBlock>
      </div>

      <div class="doc-section" id="button-style">
        <h2>按钮样式</h2>
        <p class="doc-page__hint">在 MCheckboxGroup 中使用 MCheckboxButton 替代 MCheckbox，呈现按钮组风格。</p>
        <DemoBlock :code="buttonCode">
          <MCheckboxGroup v-model="btnGroupValue">
            <MCheckboxButton label="A">A</MCheckboxButton>
            <MCheckboxButton label="B">B</MCheckboxButton>
            <MCheckboxButton label="C">C</MCheckboxButton>
            <MCheckboxButton label="D">D</MCheckboxButton>
          </MCheckboxGroup>
        </DemoBlock>
      </div>

      <div class="doc-section" id="min-max">
        <h2>数量限制</h2>
        <p class="doc-page__hint">通过 <code>min</code>/<code>max</code> 限制选中数量：达到 <code>max</code> 后未选项自动禁用，达到 <code>min</code> 后已选项不可取消。复选框组与按钮样式均支持。</p>
        <DemoBlock :code="minMaxCode">
          <div class="doc-demo-group">
            <MCheckboxGroup v-model="minMaxValue" :max="2">
              <MCheckbox label="北京">北京</MCheckbox>
              <MCheckbox label="上海">上海</MCheckbox>
              <MCheckbox label="广州">广州</MCheckbox>
              <MCheckbox label="深圳">深圳</MCheckbox>
            </MCheckboxGroup>
          </div>
          <div class="doc-demo-group">
            <MCheckboxGroup v-model="minMaxBtnValue" :min="1" :max="2">
              <MCheckboxButton label="A">A</MCheckboxButton>
              <MCheckboxButton label="B">B</MCheckboxButton>
              <MCheckboxButton label="C">C</MCheckboxButton>
              <MCheckboxButton label="D">D</MCheckboxButton>
            </MCheckboxGroup>
          </div>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MCheckbox Props</h3>
    <ApiTable type="prop" :data="DATA.checkboxProps" />

    <h3>MCheckboxGroup Props</h3>
    <ApiTable type="prop" :data="DATA.groupProps" />

    <h3>MCheckboxButton Props</h3>
    <ApiTable type="prop" :data="DATA.buttonProps" />

    <h3>Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const checked = ref(false)
const customValue = ref('no')
const groupValue = ref(['吃饭'])
const borderChecked = ref(true)
const btnGroupValue = ref(['A'])
const minMaxValue = ref([])
const minMaxBtnValue = ref([])

const allOptions = ['北京', '上海', '广州', '深圳']
const checkedCities = ref([])
const isAllChecked = computed(() => checkedCities.value.length === allOptions.length && allOptions.length > 0)
const isIndeterminate = computed(() => checkedCities.value.length > 0 && checkedCities.value.length < allOptions.length)
function handleCheckAll(val: boolean) {
  checkedCities.value = val ? [...allOptions] : []
}

const basicCode = `<MCheckbox v-model="checked">点我选中</MCheckbox>

<script setup>
const checked = ref(false)
<` + `/script>`

const checkedValueCode = `<MCheckbox
  v-model="value"
  checked-value="yes"
  unchecked-value="no"
>是否同意</MCheckbox>

<script setup>
const value = ref('no')
<` + `/script>`

const groupCode = `<MCheckboxGroup v-model="groupValue">
  <MCheckbox label="吃饭">吃饭</MCheckbox>
  <MCheckbox label="睡觉">睡觉</MCheckbox>
  <MCheckbox label="吃宵夜">吃宵夜</MCheckbox>
  <MCheckbox label="睡大觉">睡大觉</MCheckbox>
</MCheckboxGroup>

<script setup>
const groupValue = ref(['Vue'])
<` + `/script>`

const borderCode = `<MCheckbox v-model="borderChecked" border>边框复选框</MCheckbox>
<MCheckbox v-model="borderChecked" border size="small">小号边框</MCheckbox>
<MCheckbox v-model="borderChecked" border size="large">大号边框</MCheckbox>`

const indeterminateCode = `<MCheckbox
  :model-value="isAllChecked"
  :indeterminate="isIndeterminate"
  @change="handleCheckAll"
>全选</MCheckbox>
<MCheckboxGroup v-model="checkedCities">
  <MCheckbox v-for="city in allOptions" :key="city" :label="city">{{ city }}</MCheckbox>
</MCheckboxGroup>

<script setup>
import { ref, computed } from 'vue'
const allOptions = ['北京', '上海', '广州', '深圳']
const checkedCities = ref([])
const isAllChecked = computed(() => checkedCities.value.length === allOptions.length)
const isIndeterminate = computed(() => checkedCities.value.length > 0 && checkedCities.value.length < allOptions.length)
function handleCheckAll(val) {
  checkedCities.value = val ? [...allOptions] : []
}
<` + `/script>`

const buttonCode = `<MCheckboxGroup v-model="btnGroupValue">
  <MCheckboxButton label="A">A</MCheckboxButton>
  <MCheckboxButton label="B">B</MCheckboxButton>
  <MCheckboxButton label="C">C</MCheckboxButton>
  <MCheckboxButton label="D">D</MCheckboxButton>
</MCheckboxGroup>`

const minMaxCode = `<!-- 复选框组：最多 2 项 -->
<MCheckboxGroup v-model="val1" :max="2">
  <MCheckbox label="北京">北京</MCheckbox>
  <MCheckbox label="上海">上海</MCheckbox>
  <MCheckbox label="广州">广州</MCheckbox>
  <MCheckbox label="深圳">深圳</MCheckbox>
</MCheckboxGroup>

<!-- 按钮样式：最少 1 项，最多 2 项 -->
<MCheckboxGroup v-model="val2" :min="1" :max="2">
  <MCheckboxButton label="A">A</MCheckboxButton>
  <MCheckboxButton label="B">B</MCheckboxButton>
  <MCheckboxButton label="C">C</MCheckboxButton>
  <MCheckboxButton label="D">D</MCheckboxButton>
</MCheckboxGroup>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'checked-value', label: '自定义选中值' },
  { id: 'group', label: '复选框组' },
  { id: 'border', label: '边框样式' },
  { id: 'indeterminate', label: '不确定状态' },
  { id: 'button-style', label: '按钮样式' },
  { id: 'min-max', label: '数量限制' },
  { id: 'api', label: 'API' },
]

const DATA = {
  checkboxProps: [
    ['modelValue', 'boolean | (string | number | boolean)[]', '—', '绑定值（v-model）'],
    ['label', 'string | number | boolean', '—', '复选框的值，在 group 中使用'],
    ['checkedValue', 'string | number', '—', '选中时的值'],
    ['uncheckedValue', 'string | number', '—', '未选中时的值'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['border', 'boolean', 'false', '是否显示边框'],
    ['size', 'small | default | large', 'default', '尺寸'],
    ['name', 'string', '—', '原生 name 属性'],
    ['checked', 'boolean', 'false', '是否选中（初始值）'],
    ['indeterminate', 'boolean', 'false', '是否为不确定状态'],
  ],
  groupProps: [
    ['modelValue', 'any[]', '[]', '绑定值，选中项的 label 数组'],
    ['disabled', 'boolean', 'false', '是否禁用所有复选框'],
    ['min', 'number', '—', '最少选中个数'],
    ['max', 'number', '—', '最多选中个数'],
    ['size', 'small | default | large', 'default', '复选框组尺寸'],
    ['fill', 'string', '#a78bfa', '选中按钮类型的填充色'],
    ['textColor', 'string', '#fff', '选中按钮类型的文字颜色'],
  ],
  buttonProps: [
    ['label', 'string | number | boolean', '—', '复选框按钮的值，在 checkbox-group 中使用'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['name', 'string', '—', '原生 name 属性'],
  ],
  events: [
    ['change', 'value', '值变更时触发（MCheckbox / MCheckboxGroup / MCheckboxButton 均支持）'],
  ],
}
</script>

<style scoped lang="scss">
.demo-event-result {
  color: var(--mosaic-text-secondary);
  font-size: 14px;
}
</style>
