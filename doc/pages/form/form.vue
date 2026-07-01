<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Form 表单</h1>
    <p class="doc-page__desc">由 MForm 和 MFormItem 组成，支持数据绑定、校验规则、行内模式和尺寸控制。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础表单与校验</h2>
        <p class="doc-page__hint">MForm 通过 <code>model</code> 绑定数据对象，<code>rules</code> 定义校验规则。MFormItem 通过 <code>prop</code> 关联字段。不使用 footer 插槽时，传入 <code>submit</code> / <code>reset</code> 方法即可在右下角生成默认按钮。</p>
        <DemoBlock :code="basicCode">
          <MForm ref="formRef" :model="formModel" :rules="formRules" :submit="handleSubmit" :reset="handleReset" label-width="80px">
            <MFormItem label="用户名" prop="name">
              <MInput v-model="formModel.name" placeholder="请输入用户名" />
            </MFormItem>
            <MFormItem label="密码" prop="password">
              <MInput v-model="formModel.password" type="password" placeholder="请输入密码" />
            </MFormItem>
            <MFormItem label="备注" prop="remark" info="选填项，可用于记录补充信息">
              <MInput v-model="formModel.remark" placeholder="选填" />
            </MFormItem>
          </MForm>
        </DemoBlock>
      </div>

      <div class="doc-section" id="inline-label">
        <h2>行内表单与标签位置</h2>
        <p class="doc-page__hint">设置 <code>inline</code> 为行内表单，<code>label-position</code> 控制标签位置（left / right / top）。</p>
        <DemoBlock :code="inlineCode">
          <MForm :model="inlineModel" inline>
            <MFormItem label="姓名">
              <MInput v-model="inlineModel.name" placeholder="姓名" />
            </MFormItem>
            <MFormItem label="地区">
              <MInput v-model="inlineModel.region" placeholder="地区" />
            </MFormItem>
          </MForm>
          <MForm :model="topModel" label-position="top" style="margin-top: 16px;">
            <MFormItem label="活动名称">
              <MInput v-model="topModel.name" placeholder="活动名称" />
            </MFormItem>
          </MForm>
        </DemoBlock>
      </div>

      <div class="doc-section" id="item-rules">
        <h2>表单项自定义校验规则</h2>
        <p class="doc-page__hint">MFormItem 可通过 <code>rules</code> 属性单独传入校验规则，支持 <code>required</code>、<code>min</code> / <code>max</code>、<code>validator</code> 自定义校验函数等。与 MForm 的 <code>rules</code> 合并生效。</p>
        <DemoBlock :code="itemRulesCode">
          <MForm ref="itemRulesFormRef" :model="itemRulesModel" :submit="handleItemRulesSubmit" :reset="handleItemRulesReset" label-width="100px">
            <MFormItem label="昵称" prop="nickname" :rules="nicknameRules">
              <MInput v-model="itemRulesModel.nickname" placeholder="3-10 个字符" />
            </MFormItem>
            <MFormItem label="邮箱" prop="email" :rules="emailRules">
              <MInput v-model="itemRulesModel.email" placeholder="请输入邮箱" />
            </MFormItem>
            <MFormItem label="年龄" prop="age" :rules="ageRules">
              <MInputNumber v-model="itemRulesModel.age" :min="0" :max="150" />
            </MFormItem>
          </MForm>
        </DemoBlock>
      </div>

      <div class="doc-section" id="label-props">
        <h2>标签位置、宽度与后缀</h2>
        <p class="doc-page__hint"><code>label-position</code> 控制标签位置（left / right / top），<code>label-width</code> 设置标签宽度（设为 <code>auto</code> 自动按最长标签对齐），<code>label-suffix</code> 添加标签后缀。</p>
        <DemoBlock :code="labelPropsCode">
          <MForm :model="labelPropsModel" label-position="left" label-width="auto" label-suffix="：" :submit="handleLabelPropsSubmit" :reset="handleLabelPropsReset">
            <MFormItem label="活动名称" prop="name">
              <MInput v-model="labelPropsModel.name" placeholder="请输入活动名称" />
            </MFormItem>
            <MFormItem label="活动地点" prop="location">
              <MInput v-model="labelPropsModel.location" placeholder="请输入活动地点" />
            </MFormItem>
            <MFormItem label="活动负责人联系方式" prop="contact">
              <MInput v-model="labelPropsModel.contact" placeholder="请输入联系方式" />
            </MFormItem>
          </MForm>
        </DemoBlock>
      </div>

      <div class="doc-section" id="scroll-to-error">
        <h2>校验失败滚动定位</h2>
        <p class="doc-page__hint">设置 <code>scroll-to-error</code> 后，校验失败时自动平滑滚动到第一个错误表单项。</p>
        <DemoBlock :code="scrollToErrorCode">
          <MForm ref="scrollFormRef" :model="scrollModel" :rules="scrollRules" scroll-to-error :submit="handleScrollSubmit" :reset="handleScrollReset" label-width="100px">
            <MFormItem label="姓名" prop="name">
              <MInput v-model="scrollModel.name" placeholder="请输入姓名" />
            </MFormItem>
            <MFormItem label="年龄" prop="age">
              <MInputNumber v-model="scrollModel.age" />
            </MFormItem>
            <MFormItem label="地址" prop="address">
              <MInput v-model="scrollModel.address" placeholder="请输入地址" />
            </MFormItem>
            <MFormItem label="邮箱" prop="email">
              <MInput v-model="scrollModel.email" placeholder="请输入邮箱" />
            </MFormItem>
          </MForm>
        </DemoBlock>
      </div>

      <div class="doc-section" id="size-disabled">
        <h2>尺寸与禁用级联</h2>
        <p class="doc-page__hint">MForm 设置 <code>size</code> 可级联控制所有表单项的尺寸，设置 <code>disabled</code> 可级联禁用所有控件，设置 <code>readonly</code> 可级联只读所有控件。</p>
        <DemoBlock :code="sizeDisabledCode">
          <MForm :model="sizeModel" size="small" disabled label-width="80px">
            <MFormItem label="名称">
              <MInput v-model="sizeModel.name" />
            </MFormItem>
            <MFormItem label="数量">
              <MInputNumber v-model="sizeModel.count" />
            </MFormItem>
          </MForm>
          <MForm :model="readonlyModel" readonly label-width="80px" style="margin-top: 16px;">
            <MFormItem label="名称">
              <MInput v-model="readonlyModel.name" />
            </MFormItem>
            <MFormItem label="数量">
              <MInputNumber v-model="readonlyModel.count" />
            </MFormItem>
          </MForm>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MForm Props</h3>
    <ApiTable type="prop" :data="DATA.formProps" />

    <h3>MForm Methods</h3>
    <ApiTable type="prop" :data="DATA.formMethods" />

    <h3>MFormItem Props</h3>
    <ApiTable type="prop" :data="DATA.formItemProps" />

    <h3>MFormItem Events</h3>
    <ApiTable type="event" :data="DATA.formItemEvents" />

    <h3>Slots</h3>
    <ApiTable type="slot" :data="DATA.slots" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const formRef = ref()

const formModel = reactive({
  name: '',
  password: '',
  remark: '',
})

const formRules = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

function handleSubmit() {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      console.log('提交成功', formModel)
    }
  })
}

function handleReset() {
  formRef.value?.resetFields()
}

const inlineModel = reactive({ name: '', region: '' })
const topModel = reactive({ name: '' })
const sizeModel = reactive({ name: '', count: 0 })
const readonlyModel = reactive({ name: '只读内容', count: 10 })

const itemRulesFormRef = ref()
const itemRulesModel = reactive({ nickname: '', email: '', age: undefined })

const nicknameRules = [
  { required: true, message: '请输入昵称', trigger: 'blur' },
  { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
]

const emailRules = [
  { required: true, message: '请输入邮箱', trigger: 'blur' },
  {
    validator: (value: string, _rule: any, callback: (err?: string) => void) => {
      if (value && !/^[\w.-]+@[\w.-]+\.\w+$/.test(value)) {
        callback('邮箱格式不正确')
      } else {
        callback()
      }
    },
    trigger: 'blur',
  },
]

const ageRules = [
  { required: true, message: '请输入年龄', trigger: 'change' },
  {
    validator: (value: number, _rule: any, callback: (err?: string) => void) => {
      if (value != null && (value < 18 || value > 60)) {
        callback('年龄需在 18-60 之间')
      } else {
        callback()
      }
    },
    trigger: 'change',
  },
]

function handleItemRulesSubmit() {
  itemRulesFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      console.log('校验通过', itemRulesModel)
    }
  })
}

function handleItemRulesReset() {
  itemRulesFormRef.value?.resetFields()
}

const labelPropsModel = reactive({ name: '', location: '', contact: '' })

function handleLabelPropsSubmit() {
  console.log('提交', labelPropsModel)
}

function handleLabelPropsReset() {
  labelPropsModel.name = ''
  labelPropsModel.location = ''
  labelPropsModel.contact = ''
}

const scrollFormRef = ref()
const scrollModel = reactive({ name: '', age: undefined, address: '', email: '' })
const scrollRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'change' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
}

function handleScrollSubmit() {
  scrollFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      console.log('校验通过', scrollModel)
    }
  })
}

function handleScrollReset() {
  scrollFormRef.value?.resetFields()
}

const basicCode = `<MForm ref="formRef" :model="formModel" :rules="formRules" :submit="handleSubmit" :reset="handleReset" label-width="80px">
  <MFormItem label="用户名" prop="name">
    <MInput v-model="formModel.name" placeholder="请输入用户名" />
  </MFormItem>
  <MFormItem label="密码" prop="password">
    <MInput v-model="formModel.password" type="password" placeholder="请输入密码" />
  </MFormItem>
  <MFormItem label="备注" prop="remark" info="选填项，可用于记录补充信息">
    <MInput v-model="formModel.remark" placeholder="选填" />
  </MFormItem>
</MForm>

<script setup>
const formRef = ref()
const formModel = reactive({ name: '', password: '', remark: '' })
const formRules = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
function handleSubmit() {
  formRef.value?.validate((valid) => {
    if (valid) console.log('提交成功', formModel)
  })
}
function handleReset() {
  formRef.value?.resetFields()
}
<` + `/script>`

const inlineCode = `<!-- 行内表单 -->
<MForm :model="inlineModel" inline>
  <MFormItem label="姓名">
    <MInput v-model="inlineModel.name" placeholder="姓名" />
  </MFormItem>
  <MFormItem label="地区">
    <MInput v-model="inlineModel.region" placeholder="地区" />
  </MFormItem>
</MForm>

<!-- 标签在上 -->
<MForm :model="topModel" label-position="top">
  <MFormItem label="活动名称">
    <MInput v-model="topModel.name" placeholder="活动名称" />
  </MFormItem>
</MForm>`

const sizeDisabledCode = `<!-- 小尺寸 + 禁用级联 -->
<MForm :model="sizeModel" size="small" disabled label-width="80px">
  <MFormItem label="名称">
    <MInput v-model="sizeModel.name" />
  </MFormItem>
  <MFormItem label="数量">
    <MInputNumber v-model="sizeModel.count" />
  </MFormItem>
</MForm>

<!-- 只读级联 -->
<MForm :model="readonlyModel" readonly label-width="80px">
  <MFormItem label="名称">
    <MInput v-model="readonlyModel.name" />
  </MFormItem>
  <MFormItem label="数量">
    <MInputNumber v-model="readonlyModel.count" />
  </MFormItem>
</MForm>`

const itemRulesCode = `<MForm ref="itemRulesFormRef" :model="itemRulesModel" :submit="handleItemRulesSubmit" :reset="handleItemRulesReset" label-width="100px">
  <MFormItem label="昵称" prop="nickname" :rules="nicknameRules">
    <MInput v-model="itemRulesModel.nickname" placeholder="3-10 个字符" />
  </MFormItem>
  <MFormItem label="邮箱" prop="email" :rules="emailRules">
    <MInput v-model="itemRulesModel.email" placeholder="请输入邮箱" />
  </MFormItem>
  <MFormItem label="年龄" prop="age" :rules="ageRules">
    <MInputNumber v-model="itemRulesModel.age" :min="0" :max="150" />
  </MFormItem>
</MForm>

<script setup>
const itemRulesFormRef = ref()
const itemRulesModel = reactive({ nickname: '', email: '', age: undefined })

// required + min/max 长度校验
const nicknameRules = [
  { required: true, message: '请输入昵称', trigger: 'blur' },
  { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
]

// 自定义 validator 校验邮箱格式
const emailRules = [
  { required: true, message: '请输入邮箱', trigger: 'blur' },
  {
    validator: (value, _rule, callback) => {
      if (value && !/^[\\w.-]+@[\\w.-]+\\.\\w+$/.test(value)) {
        callback('邮箱格式不正确')
      } else {
        callback()
      }
    },
    trigger: 'blur',
  },
]

// 自定义 validator 校验年龄范围
const ageRules = [
  { required: true, message: '请输入年龄', trigger: 'change' },
  {
    validator: (value, _rule, callback) => {
      if (value != null && (value < 18 || value > 60)) {
        callback('年龄需在 18-60 之间')
      } else {
        callback()
      }
    },
    trigger: 'change',
  },
]

function handleItemRulesSubmit() {
  itemRulesFormRef.value?.validate((valid) => {
    if (valid) console.log('校验通过', itemRulesModel)
  })
}
function handleItemRulesReset() {
  itemRulesFormRef.value?.resetFields()
}
<` + `/script>`

const labelPropsCode = `<MForm :model="labelPropsModel" label-position="left" label-width="auto" label-suffix="：" :submit="handleLabelPropsSubmit" :reset="handleLabelPropsReset">
  <MFormItem label="活动名称" prop="name">
    <MInput v-model="labelPropsModel.name" placeholder="请输入活动名称" />
  </MFormItem>
  <MFormItem label="活动地点" prop="location">
    <MInput v-model="labelPropsModel.location" placeholder="请输入活动地点" />
  </MFormItem>
  <MFormItem label="活动负责人联系方式" prop="contact">
    <MInput v-model="labelPropsModel.contact" placeholder="请输入联系方式" />
  </MFormItem>
</MForm>`

const scrollToErrorCode = `<MForm ref="scrollFormRef" :model="scrollModel" :rules="scrollRules" scroll-to-error :submit="handleScrollSubmit" :reset="handleScrollReset" label-width="100px">
  <MFormItem label="姓名" prop="name">
    <MInput v-model="scrollModel.name" placeholder="请输入姓名" />
  </MFormItem>
  <MFormItem label="年龄" prop="age">
    <MInputNumber v-model="scrollModel.age" />
  </MFormItem>
  <MFormItem label="地址" prop="address">
    <MInput v-model="scrollModel.address" placeholder="请输入地址" />
  </MFormItem>
  <MFormItem label="邮箱" prop="email">
    <MInput v-model="scrollModel.email" placeholder="请输入邮箱" />
  </MFormItem>
</MForm>

<script setup>
const scrollFormRef = ref()
const scrollModel = reactive({ name: '', age: undefined, address: '', email: '' })
const scrollRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'change' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
}
function handleScrollSubmit() {
  scrollFormRef.value?.validate((valid) => {
    if (valid) console.log('校验通过', scrollModel)
  })
}
function handleScrollReset() {
  scrollFormRef.value?.resetFields()
}
<` + `/script>`

const anchors = [
  { id: 'basic', label: '基础表单与校验' },
  { id: 'inline-label', label: '行内表单与标签位置' },
  { id: 'item-rules', label: '表单项自定义校验规则' },
  { id: 'label-props', label: '标签位置、宽度与后缀' },
  { id: 'scroll-to-error', label: '校验失败滚动定位' },
  { id: 'size-disabled', label: '尺寸与禁用级联' },
  { id: 'api', label: 'API' },
]

const DATA = {
  formProps: [
    ['model', 'Record<string, any>', '—', '表单数据对象，必填'],
    ['rules', 'Record<string, any>', '—', '表单验证规则'],
    ['labelPosition', 'left | right | top', 'right', '表单项标签的位置，left / right 时需设置 label-width'],
    ['labelWidth', 'string | "auto"', '80px', '标签宽度，作为 Form 直接子元素的 form-item 会继承该值。设为 auto 时自动计算最大宽度'],
    ['labelSuffix', 'string', '', '标签的后缀文本'],
    ['inline', 'boolean', 'false', '是否为行内表单'],
    ['disabled', 'boolean', 'false', '是否禁用整个表单'],
    ['readonly', 'boolean', 'false', '是否只读整个表单'],
    ['size', 'small | default | large', 'default', '表单尺寸'],
    ['showMessage', 'boolean', 'true', '是否显示校验错误信息'],
    ['statusIcon', 'boolean', 'false', '是否显示校验状态图标'],
    ['validateOnRuleChange', 'boolean', 'true', '是否在 rules 改变后立即触发校验'],
    ['hideRequiredAsterisk', 'boolean', 'false', '是否隐藏必填标记星号'],
    ['scrollToError', 'boolean', 'false', '校验失败时是否滚动到第一个错误表单项'],
    ['submit', '() => void', '—', '提交按钮回调（footer 插槽未使用时显示默认提交按钮）'],
    ['reset', '() => void', '—', '重置按钮回调（footer 插槽未使用时显示默认重置按钮）'],
  ],
  formMethods: [
    ['validate', 'callback?', '校验所有字段，返回 Promise<boolean>'],
    ['resetFields', '—', '重置所有字段值和校验状态'],
    ['clearValidate', 'props?', '清除校验结果，可传指定字段'],
  ],
  formItemProps: [
    ['label', 'string', '—', '标签文本'],
    ['labelWidth', 'string', '—', '标签宽度'],
    ['prop', 'string', '—', '字段属性名，对应 model 中的键'],
    ['required', 'boolean', '—', '是否必填'],
    ['rules', 'object | any[]', '—', '校验规则'],
    ['error', 'string', '—', '错误信息'],
    ['validateStatus', 'validating | success | error', '—', '校验状态'],
    ['showMessage', 'boolean', 'true', '是否显示校验错误信息'],
    ['inlineMessage', 'string', '—', '行内错误信息'],
    ['size', 'small | default | large', '—', '表单项尺寸'],
    ['readonly', 'boolean', '—', '是否只读表单项'],
    ['info', 'string', '—', '标签提示信息，hover 图标时气泡展示'],
  ],
  formItemEvents: [
    ['update:validateStatus', 'status', '校验状态变更时触发'],
  ],
  slots: [
    ['default', 'MForm 表单项内容区域'],
    ['footer', 'MForm 底部内容，常用于放置提交/重置按钮'],
    ['— (default)', 'MFormItem 内容区域（表单控件）'],
  ],
}
</script>
