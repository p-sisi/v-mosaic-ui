<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />

    <h1>Upload 上传</h1>
    <p class="doc-page__desc">文件上传组件，支持拖拽上传、文件列表、数量限制和自定义上传实现。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>基础上传</h2>
        <p class="doc-page__hint">通过 <code>action</code> 设置上传地址，默认自动上传并显示文件列表。</p>
        <DemoBlock :code="basicCode">
          <MUpload action="/api/upload">
            <template #tip>
              <span>只能上传 jpg/png 文件，且不超过 500kb</span>
            </template>
          </MUpload>
        </DemoBlock>
      </div>

      <div class="doc-section" id="drag">
        <h2>拖拽上传</h2>
        <p class="doc-page__hint">设置 <code>drag</code> 启用拖拽上传区域。</p>
        <DemoBlock :code="dragCode">
          <MUpload action="/api/upload" drag>
            <template #tip>
              <span>只能上传 jpg/png 文件，且不超过 500kb</span>
            </template>
          </MUpload>
        </DemoBlock>
      </div>

      <div class="doc-section" id="limit-disabled">
        <h2>限制与禁用</h2>
        <p class="doc-page__hint"><code>limit</code> 设置最大上传数量，超出触发 <code>exceed</code> 事件。<code>disabled</code> 禁用上传。设置 <code>auto-upload</code> 为 <code>false</code> 时需手动调用 <code>submit</code> 方法。</p>
        <DemoBlock :code="limitDisabledCode">
          <div class="doc-demo-group">
            <MUpload action="/api/upload" :limit="3">
              <template #tip>
                <span>最多上传 3 个文件</span>
              </template>
            </MUpload>
            <MUpload action="/api/upload" disabled />
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="exceed-replace">
        <h2>超出限制自动替换</h2>
        <p class="doc-page__hint">设置 <code>limit</code> 和 <code>on-exceed</code> 钩子，当超出限制时自动替换已有文件。</p>
        <DemoBlock :code="exceedReplaceCode">
          <MUpload action="/api/upload" :limit="1" :on-exceed="handleExceed">
            <template #tip>
              <span>最多上传 1 个文件，选择新文件会自动替换旧文件</span>
            </template>
          </MUpload>
        </DemoBlock>
      </div>

      <div class="doc-section" id="before-upload">
        <h2>上传前校验格式与大小</h2>
        <p class="doc-page__hint">通过 <code>before-upload</code> 钩子限制文件格式和大小，返回 <code>false</code> 终止上传。</p>
        <DemoBlock :code="beforeUploadCode">
          <MUpload action="/api/upload" :before-upload="handleBeforeUpload">
            <template #tip>
              <span>只能上传 jpg/png 文件，且不超过 500KB</span>
            </template>
          </MUpload>
        </DemoBlock>
      </div>

      <div class="doc-section" id="on-change">
        <h2>通过 on-change 控制文件列表</h2>
        <p class="doc-page__hint">通过 <code>on-change</code> 钩子监控文件状态变更，对文件列表进行自定义控制。</p>
        <DemoBlock :code="onChangeCode">
          <MUpload action="/api/upload" :on-change="handleOnChange" :auto-upload="false">
            <template #tip>
              <span>手动上传模式，on-change 记录文件状态变更日志</span>
            </template>
          </MUpload>
          <div v-if="changeLog.length" class="doc-demo-log">
            <div v-for="(log, i) in changeLog" :key="i">{{ log }}</div>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="preview-slot">
        <h2>自定义文件预览样式</h2>
        <p class="doc-page__hint">通过 <code>preview</code> 插槽自定义选中/上传文件的展示样式，插槽提供 <code>file</code> 作用域参数。</p>
        <DemoBlock :code="previewSlotCode">
          <MUpload action="/api/upload" :auto-upload="false">
            <template #preview="{ file }">
              <div class="custom-preview">
                <span class="custom-preview__icon">📎</span>
                <span class="custom-preview__name">{{ file.name }}</span>
                <span class="custom-preview__size">{{ (file.size / 1024).toFixed(1) }}KB</span>
                <span v-if="file.status === 'success'" class="custom-preview__badge custom-preview__badge--success">已上传</span>
                <span v-else-if="file.status === 'error'" class="custom-preview__badge custom-preview__badge--error">失败</span>
                <span v-else-if="file.status === 'uploading'" class="custom-preview__badge custom-preview__badge--uploading">{{ file.progress }}%</span>
                <span v-else class="custom-preview__badge">待上传</span>
                <span class="custom-preview__remove" @click="file.status = 'error'">移除</span>
              </div>
            </template>
          </MUpload>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>Props</h3>
    <ApiTable type="prop" :data="DATA.props" />

    <h3>Events</h3>
    <ApiTable type="event" :data="DATA.events" />

    <h3>Methods</h3>
    <ApiTable type="prop" :data="DATA.methods" />

    <h3>Slots</h3>
    <ApiTable type="slot" :data="DATA.slots" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

// on-change 日志
const changeLog = ref<string[]>([])
function handleOnChange(file: any, fileList: any[]) {
  const time = new Date().toLocaleTimeString()
  changeLog.value.unshift(`[${time}] ${file.name} 状态: ${file.status}，列表共 ${fileList.length} 个文件`)
}

// on-exceed 自动替换
function handleExceed(files: File[], fileList: any[]) {
  console.log('超出限制', files, fileList)
}

// before-upload 校验格式和大小
function handleBeforeUpload(file: File): boolean {
  const isJpgOrPng = ['image/jpeg', 'image/png'].includes(file.type)
  if (!isJpgOrPng) {
    console.error('只能上传 JPG/PNG 格式的文件')
    return false
  }
  const isLt500K = file.size / 1024 < 500
  if (!isLt500K) {
    console.error('文件大小不能超过 500KB')
    return false
  }
  return true
}

const basicCode = `<MUpload action="/api/upload">
  <template #tip>
    <span>只能上传 jpg/png 文件，且不超过 500kb</span>
  </template>
</MUpload>`

const dragCode = `<MUpload action="/api/upload" drag>
  <template #tip>
    <span>只能上传 jpg/png 文件，且不超过 500kb</span>
  </template>
</MUpload>`

const limitDisabledCode = `<!-- 数量限制 -->
<MUpload action="/api/upload" :limit="3">
  <template #tip>
    <span>最多上传 3 个文件</span>
  </template>
</MUpload>

<!-- 禁用 -->
<MUpload action="/api/upload" disabled />`

const exceedReplaceCode = `<MUpload
  action="/api/upload"
  :limit="1"
  :on-exceed="handleExceed"
>
  <template #tip>
    <span>最多上传 1 个文件，选择新文件会自动替换旧文件</span>
  </template>
</MUpload>

<script setup>
function handleExceed(files, fileList) {
  console.log('超出限制', files, fileList)
}
<` + `/script>`

const beforeUploadCode = `<MUpload
  action="/api/upload"
  :before-upload="handleBeforeUpload"
>
  <template #tip>
    <span>只能上传 jpg/png 文件，且不超过 500KB</span>
  </template>
</MUpload>

<script setup>
function handleBeforeUpload(file) {
  const isJpgOrPng = ['image/jpeg', 'image/png'].includes(file.type)
  if (!isJpgOrPng) {
    console.error('只能上传 JPG/PNG 格式的文件')
    return false
  }
  const isLt500K = file.size / 1024 < 500
  if (!isLt500K) {
    console.error('文件大小不能超过 500KB')
    return false
  }
  return true
}
<` + `/script>`

const onChangeCode = `<MUpload
  action="/api/upload"
  :on-change="handleOnChange"
  :auto-upload="false"
>
  <template #tip>
    <span>手动上传模式，on-change 记录文件状态变更日志</span>
  </template>
</MUpload>

<script setup>
const changeLog = ref([])
function handleOnChange(file, fileList) {
  const time = new Date().toLocaleTimeString()
  changeLog.value.unshift(\`[\${time}] \${file.name} 状态: \${file.status}，列表共 \${fileList.length} 个文件\`)
}
<` + `/script>`

const previewSlotCode = `<MUpload action="/api/upload" :auto-upload="false">
  <template #preview="{ file }">
    <div class="custom-preview">
      <span class="custom-preview__icon">📎</span>
      <span class="custom-preview__name">{{ file.name }}</span>
      <span class="custom-preview__size">{{ (file.size / 1024).toFixed(1) }}KB</span>
      <span v-if="file.status === 'success'" class="custom-preview__badge custom-preview__badge--success">已上传</span>
      <span v-else-if="file.status === 'error'" class="custom-preview__badge custom-preview__badge--error">失败</span>
      <span v-else-if="file.status === 'uploading'" class="custom-preview__badge custom-preview__badge--uploading">{{ file.progress }}%</span>
      <span v-else class="custom-preview__badge">待上传</span>
      <span class="custom-preview__remove">移除</span>
    </div>
  </template>
</MUpload>`

const anchors = [
  { id: 'basic', label: '基础上传' },
  { id: 'drag', label: '拖拽上传' },
  { id: 'limit-disabled', label: '限制与禁用' },
  { id: 'exceed-replace', label: '超出限制自动替换' },
  { id: 'before-upload', label: '上传前校验' },
  { id: 'on-change', label: 'on-change 控制' },
  { id: 'preview-slot', label: '自定义预览样式' },
  { id: 'api', label: 'API' },
]

const DATA = {
  props: [
    ['action', 'string', '', '上传的地址'],
    ['headers', 'Record<string, string>', '{}', '请求头'],
    ['multiple', 'boolean', 'false', '是否支持多选'],
    ['data', 'Record<string, any>', '{}', '上传附加数据'],
    ['name', 'string', 'file', '上传文件字段名'],
    ['drag', 'boolean', 'false', '是否启用拖拽上传'],
    ['listType', 'text | picture | picture-card', 'text', '文件列表类型'],
    ['withCredentials', 'boolean', 'false', '是否携带 cookie'],
    ['showFileList', 'boolean', 'true', '是否显示文件列表'],
    ['accept', 'string', '', '接受的文件类型'],
    ['autoUpload', 'boolean', 'true', '是否自动上传'],
    ['disabled', 'boolean', 'false', '是否禁用'],
    ['limit', 'number', '0', '最大上传数量（0 表示不限制）'],
    ['httpRequest', '(options: any) => any', '—', '自定义上传实现'],
    ['beforeUpload', '(file: File, fileList) => boolean | Promise<boolean>', '—', '上传前钩子，返回 false 终止上传'],
    ['onExceed', '(files: File[], fileList) => void', '—', '超出数量限制时的钩子，未设置时自动替换已有文件'],
    ['onChange', '(file, fileList) => void', '—', '文件状态变更钩子，可用于控制文件列表'],
  ],
  events: [
    ['change', 'file, fileList', '文件状态变更时触发'],
    ['success', 'response, file, fileList', '上传成功时触发'],
    ['error', 'error, file, fileList', '上传失败时触发'],
    ['progress', 'event, file, fileList', '上传进度变更时触发'],
    ['remove', 'file, fileList', '文件移除时触发'],
    ['exceed', 'files, fileList', '文件超出数量限制时触发'],
  ],
  methods: [
    ['submit', '—', '手动提交上传（autoUpload 为 false 时使用）'],
    ['clearFiles', '—', '清空文件列表'],
  ],
  slots: [
    ['trigger', '触发上传的内容（按钮或自定义区域）'],
    ['tip', '提示说明文字'],
    ['preview', '自定义文件预览样式，提供 file 作用域参数'],
  ],
}
</script>

<style scoped lang="scss">
.doc-demo-log {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f5f7fa;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  max-height: 120px;
  overflow-y: auto;
  line-height: 1.6;
}
.custom-preview {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 8px;
  font-size: 13px;

  &__icon {
    font-size: 16px;
  }
  &__name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__size {
    color: #999;
    font-size: 12px;
  }
  &__badge {
    padding: 1px 6px;
    border-radius: 10px;
    font-size: 11px;
    background: #f0f0f0;
    color: #666;

    &--success {
      background: #e1f3d8;
      color: #67c23a;
    }
    &--error {
      background: #fde2e2;
      color: #f56c6c;
    }
    &--uploading {
      background: #e6e6ff;
      color: #a78bfa;
    }
  }
  &__remove {
    color: #999;
    cursor: pointer;

    &:hover {
      color: #f56c6c;
    }
  }
}
</style>