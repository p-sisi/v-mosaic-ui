<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Steps 步骤条</h1>
    <p class="doc-page__desc">引导用户按照流程完成任务的分步导航条，支持点击步骤跳转、通过公共方法控制上一步/下一步。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础用法</h2>
        <p class="doc-page__hint">使用 <code>MSteps</code> 和 <code>MStep</code> 组合，通过 <code>v-model:active</code> 双向绑定当前步骤。点击任意步骤即可跳转。</p>
        <DemoBlock :code="basicCode">
          <MSteps v-model:active="activeStep" finish-status="success">
            <MStep title="步骤一" description="描述信息" />
            <MStep title="步骤二" description="描述信息" />
            <MStep title="步骤三" description="描述信息" />
            <MStep title="步骤四" description="描述信息" />
          </MSteps>
          <div class="doc-demo-group" style="margin-top: 12px;">
            <MButton size="small" @click="stepsRef?.prev()">上一步（方法）</MButton>
            <MButton size="small" @click="stepsRef?.next()">下一步（方法）</MButton>
            <span class="demo-event-result">当前步骤: {{ activeStep }}</span>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="click">
        <h2>点击跳转</h2>
        <p class="doc-page__hint">默认支持点击步骤跳转，设置 <code>disabled</code> 可禁用某个步骤的点击。</p>
        <DemoBlock :code="clickCode">
          <MSteps v-model:active="activeStep2" finish-status="success">
            <MStep title="填写信息" description="请填写基本信息" />
            <MStep title="验证身份" description="验证手机号" />
            <MStep title="设置密码" description="设置账号密码" disabled />
            <MStep title="完成注册" description="注册成功" />
          </MSteps>
          <span class="demo-event-result" style="margin-top: 12px; display: inline-block;">当前步骤: {{ activeStep2 }}</span>
        </DemoBlock>
      </div>

      <div class="doc-section" id="status">
        <h2>状态与竖向</h2>
        <p class="doc-page__hint">通过 <code>status</code> 设置步骤状态，设置 <code>direction="vertical"</code> 为竖向步骤条。</p>
        <DemoBlock :code="statusCode">
          <MSteps :active="1" finish-status="success">
            <MStep title="已完成" />
            <MStep title="进行中" status="process" />
            <MStep title="未开始" status="wait" />
          </MSteps>
          <MSteps direction="vertical" :active="1" style="margin-top: 16px;">
            <MStep title="步骤一" description="描述信息" />
            <MStep title="步骤二" description="描述信息" />
            <MStep title="步骤三" description="描述信息" />
          </MSteps>
        </DemoBlock>
      </div>

      <div class="doc-section" id="simple">
        <h2>简约风格</h2>
        <p class="doc-page__hint">设置 <code>simple</code> 属性使用简约风格的步骤条。</p>
        <DemoBlock code='<MSteps :active="1" simple>
  <MStep title="步骤一" />
  <MStep title="步骤二" />
  <MStep title="步骤三" />
</MSteps>'>
          <MSteps :active="1" simple>
            <MStep title="步骤一" />
            <MStep title="步骤二" />
            <MStep title="步骤三" />
          </MSteps>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MSteps Props</h3>
    <ApiTable type="prop" :data="DATA.stepsProps" />
    <h3>MSteps Methods</h3>
    <ApiTable type="method" :data="DATA.stepsMethods" />
    <h3>MStep Props</h3>
    <ApiTable type="prop" :data="DATA.stepProps" />
    <h3>MSteps Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const activeStep = ref(1)
const activeStep2 = ref(0)
const stepsRef = ref<any>(null)

const basicCode = `<MSteps v-model:active="activeStep" finish-status="success" ref="stepsRef">
  <MStep title="步骤一" description="描述信息" />
  <MStep title="步骤二" description="描述信息" />
  <MStep title="步骤三" description="描述信息" />
  <MStep title="步骤四" description="描述信息" />
</MSteps>

<MButton size="small" @click="stepsRef?.prev()">上一步</MButton>
<MButton size="small" @click="stepsRef?.next()">下一步</MButton>

<script setup>
const activeStep = ref(1)
const stepsRef = ref(null)
<` + `/script>`

const clickCode = `<MSteps v-model:active="activeStep" finish-status="success">
  <MStep title="填写信息" description="请填写基本信息" />
  <MStep title="验证身份" description="验证手机号" />
  <MStep title="设置密码" description="设置账号密码" disabled />
  <MStep title="完成注册" description="注册成功" />
</MSteps>`

const statusCode = `<!-- 不同状态 -->
<MSteps :active="1" finish-status="success">
  <MStep title="已完成" />
  <MStep title="进行中" status="process" />
  <MStep title="未开始" status="wait" />
</MSteps>

<!-- 竖向步骤条 -->
<MSteps direction="vertical" :active="1">
  <MStep title="步骤一" description="描述信息" />
  <MStep title="步骤二" description="描述信息" />
  <MStep title="步骤三" description="描述信息" />
</MSteps>`

const anchors = [
  { id: 'basic', label: '基础用法' },
  { id: 'click', label: '点击跳转' },
  { id: 'status', label: '状态与竖向' },
  { id: 'simple', label: '简约风格' },
  { id: 'api', label: 'API' },
]

const DATA = {
  stepsProps: [
    ['active', 'number', '0', '当前激活步骤（支持 v-model:active）'],
    ['direction', 'vertical | horizontal', 'horizontal', '显示方向'],
    ['finishStatus', 'wait | process | finish | error | success', 'finish', '已完成步骤的状态'],
    ['processStatus', 'wait | process | finish | error | success', 'process', '当前步骤的状态'],
    ['simple', 'boolean', 'false', '是否为简约风格'],
    ['space', 'number | string', '—', '步骤间距，默认自适应'],
  ],
  stepsMethods: [
    ['prev', '—', '跳到上一步'],
    ['next', '—', '跳到下一步'],
    ['setActive', 'index: number', '跳转到指定步骤'],
  ],
  stepProps: [
    ['title', 'string', '—', '标题'],
    ['description', 'string', '—', '描述'],
    ['status', 'wait | process | finish | error | success', '—', '当前步骤状态，如不设置则根据 steps 推断'],
    ['disabled', 'boolean', 'false', '是否禁用点击跳转'],
  ],
  events: [
    ['change', 'newIndex, oldIndex', '当前激活步骤改变时触发'],
  ],
}
</script>
