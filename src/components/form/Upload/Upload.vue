<template>
  <div :class="classes">
    <!-- 拖拽上传区域 -->
    <div
      v-if="drag"
      class="m-upload__drag"
      :class="{ 'm-upload__drag--over': isDragover, 'm-upload__drag--disabled': effectiveDisabled }"
      @drop.prevent="handleDrop"
      @dragover.prevent="isDragover = true"
      @dragleave.prevent="isDragover = false"
      @click="handleClick"
    >
      <slot name="trigger">
        <span class="m-upload__drag-icon">📁</span>
        <p class="m-upload__drag-text">将文件拖到此处，或<em>点击上传</em></p>
      </slot>
    </div>

    <!-- 普通上传触发器 -->
    <div v-else class="m-upload__trigger" @click="handleClick">
      <slot name="trigger">
        <button class="m-upload__button" :disabled="effectiveDisabled">点击上传</button>
      </slot>
    </div>

    <!-- 提示文字 -->
    <div v-if="$slots.tip" class="m-upload__tip">
      <slot name="tip" />
    </div>

    <!-- 文件列表 -->
    <ul v-if="showFileList && fileList.length > 0" class="m-upload__file-list">
      <li v-for="file in fileList" :key="file.uid" class="m-upload__file">
        <slot name="preview" :file="file">
          <span class="m-upload__file-name" :class="{ 'm-upload__file-name--error': file.status === 'error' }">
            📄 {{ file.name }}
          </span>
          <span v-if="file.status === 'uploading'" class="m-upload__file-progress">
            <span class="m-upload__file-progress-bar" :style="{ width: file.progress + '%' }"></span>
          </span>
          <span class="m-upload__file-status">
            <span v-if="file.status === 'success'" class="m-upload__file-success">✓</span>
            <span v-else-if="file.status === 'error'" class="m-upload__file-error">✗</span>
            <span v-else-if="file.status === 'uploading'" class="m-upload__file-uploading">{{ file.progress }}%</span>
          </span>
          <span class="m-upload__file-actions">
            <span class="m-upload__file-delete" @click="handleRemove(file)">✕</span>
          </span>
        </slot>
      </li>
    </ul>

    <!-- 隐藏的 input -->
    <input
      ref="inputRef"
      type="file"
      class="m-upload__input"
      :accept="accept"
      :multiple="multiple"
      :disabled="effectiveDisabled"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MUpload' })

type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'
type ListType = 'text' | 'picture' | 'picture-card'

interface UploadFile {
  uid: number
  name: string
  size: number
  status: UploadStatus
  progress: number
  raw?: File
  response?: any
  url?: string
}

let uid = 0

const props = withDefaults(defineProps<{
  action?: string                          // 上传的地址
  headers?: Record<string, string>         // 请求头
  multiple?: boolean                       // 是否支持多选
  data?: Record<string, any>               // 上传附加数据
  name?: string                            // 上传文件字段名
  drag?: boolean                           // 是否启用拖拽上传
  listType?: ListType                      // 文件列表类型
  withCredentials?: boolean                // 是否携带 cookie
  showFileList?: boolean                   // 是否显示文件列表
  accept?: string                          // 接受的文件类型
  autoUpload?: boolean                     // 是否自动上传
  disabled?: boolean                       // 是否禁用
  limit?: number                           // 最大上传数量
  httpRequest?: (options: any) => any      // 自定义上传实现
  beforeUpload?: (file: File, fileList: UploadFile[]) => boolean | Promise<boolean>  // 上传前钩子，返回 false 终止上传
  onExceed?: (files: File[], fileList: UploadFile[]) => void  // 超出数量限制时的钩子
  onChange?: (file: UploadFile, fileList: UploadFile[]) => void  // 文件状态变更钩子
}>(), {
  action: '',
  headers: () => ({}),
  multiple: false,
  data: () => ({}),
  name: 'file',
  drag: false,
  listType: 'text',
  withCredentials: false,
  showFileList: true,
  accept: '',
  autoUpload: true,
  disabled: false,
  limit: 0,
})

const emit = defineEmits<{
  'update:fileList': [files: UploadFile[]]
  change: [file: UploadFile, fileList: UploadFile[]]
  success: [response: any, file: UploadFile, fileList: UploadFile[]]
  error: [error: any, file: UploadFile, fileList: UploadFile[]]
  progress: [event: any, file: UploadFile, fileList: UploadFile[]]
  remove: [file: UploadFile, fileList: UploadFile[]]
  exceed: [files: File[], fileList: UploadFile[]]
}>()

const { effectiveDisabled } = useFormItem(props)

const inputRef = ref<HTMLInputElement | null>(null)
const fileList = ref<UploadFile[]>([])
const isDragover = ref(false)

const classes = computed(() => [
  'm-upload',
  `m-upload--${props.listType}`,
  {
    'm-upload--disabled': effectiveDisabled.value,
    'm-upload--drag': props.drag,
  },
])

function handleClick() {
  if (effectiveDisabled.value) return
  inputRef.value?.click()
}

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files || files.length === 0) return

  uploadFiles(Array.from(files))

  // 重置 input
  target.value = ''
}

function handleDrop(event: DragEvent) {
  isDragover.value = false
  if (effectiveDisabled.value) return
  const files = event.dataTransfer?.files
  if (!files || files.length === 0) return
  uploadFiles(Array.from(files))
}

function uploadFiles(files: File[]) {
  if (props.limit > 0 && fileList.value.length + files.length > props.limit) {
    // 超出限制：优先调用 on-exceed 钩子，否则自动替换已有文件
    if (props.onExceed) {
      props.onExceed(files, fileList.value)
    } else {
      // 自动替换：清空已有文件，再上传新选中的文件
      fileList.value = []
    }
    emit('exceed', files, fileList.value)
    // 如果有 onExceed 自定义处理，不再继续；自动替换时继续走上传流程
    if (props.onExceed) return
  }

  files.forEach((raw) => {
    const file: UploadFile = {
      uid: ++uid,
      name: raw.name,
      size: raw.size,
      status: 'ready',
      progress: 0,
      raw,
    }
    fileList.value.push(file)
    emit('change', file, fileList.value)
    props.onChange?.(file, fileList.value)

    if (props.autoUpload) {
      upload(file)
    }
  })
}

function upload(file: UploadFile) {
  if (!props.action && !props.httpRequest) return

  // before-upload 钩子：返回 false 终止上传
  if (props.beforeUpload) {
    const result = props.beforeUpload(file.raw!, fileList.value)
    if (typeof result === 'boolean') {
      if (!result) {
        handleRemove(file)
        return
      }
      doUpload(file)
    } else {
      // Promise
      result.then((pass) => {
        if (!pass) {
          handleRemove(file)
        } else {
          doUpload(file)
        }
      })
    }
  } else {
    doUpload(file)
  }
}

function doUpload(file: UploadFile) {
  file.status = 'uploading'

  const request = props.httpRequest || defaultHttpRequest

  request({
    action: props.action,
    headers: props.headers,
    data: props.data,
    filename: props.name,
    file: file.raw,
    withCredentials: props.withCredentials,
    onProgress: (e: any) => {
      file.progress = Math.min(100, Math.round(e.loaded / e.total * 100) || 0)
      emit('progress', e, file, fileList.value)
    },
    onSuccess: (res: any) => {
      file.status = 'success'
      file.response = res
      emit('success', res, file, fileList.value)
      emit('change', file, fileList.value)
      props.onChange?.(file, fileList.value)
    },
    onError: (err: any) => {
      file.status = 'error'
      emit('error', err, file, fileList.value)
      emit('change', file, fileList.value)
      props.onChange?.(file, fileList.value)
    },
  })
}

function defaultHttpRequest(options: any) {
  const xhr = new XMLHttpRequest()
  const formData = new FormData()

  if (options.data) {
    Object.keys(options.data).forEach((key) => {
      formData.append(key, options.data[key])
    })
  }
  formData.append(options.filename, options.file)

  xhr.upload.addEventListener('progress', (e) => {
    if (e.total > 0) {
      options.onProgress({ loaded: e.loaded, total: e.total })
    }
  })

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        options.onSuccess(JSON.parse(xhr.responseText))
      } catch {
        options.onSuccess(xhr.responseText)
      }
    } else {
      options.onError(new Error(`Upload failed with status ${xhr.status}`))
    }
  })

  xhr.addEventListener('error', () => {
    options.onError(new Error('Upload failed'))
  })

  xhr.open('POST', options.action, true)

  if (options.headers) {
    Object.keys(options.headers).forEach((key) => {
      xhr.setRequestHeader(key, options.headers[key])
    })
  }

  if (options.withCredentials) {
    xhr.withCredentials = true
  }

  xhr.send(formData)

  return {
    abort() { xhr.abort() },
  }
}

function handleRemove(file: UploadFile) {
  const index = fileList.value.indexOf(file)
  if (index > -1) {
    fileList.value.splice(index, 1)
    emit('remove', file, fileList.value)
  }
}

/** 手动提交上传（autoUpload 为 false 时使用） */
function submit() {
  fileList.value
    .filter((file) => file.status === 'ready')
    .forEach((file) => upload(file))
}

/** 清空文件列表 */
function clearFiles() {
  fileList.value = []
}

defineExpose({ submit, clearFiles, fileList })
</script>

<style lang="scss">
.m-upload {
  display: inline-block;
  width: 100%;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__input {
    display: none;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--mosaic-size-default);
    padding: 0 16px;
    font-size: var(--mosaic-font-size);
    color: #fff;
    background-color: var(--mosaic-primary);
    border: none;
    border-radius: var(--mosaic-border-radius);
    cursor: pointer;
    transition: background-color var(--mosaic-transition-duration-fast);

    &:hover {
      background-color: var(--mosaic-primary-light);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &__drag {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 30px;
    border: 1px dashed var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    cursor: pointer;
    transition: border-color var(--mosaic-transition-duration-fast);

    &:hover,
    &--over {
      border-color: var(--mosaic-primary);
    }

    &--disabled {
      cursor: not-allowed;
      background-color: var(--mosaic-disabled-bg-color);
    }

    &-icon {
      font-size: 48px;
      color: var(--mosaic-text-placeholder);
      margin-bottom: 8px;
    }

    &-text {
      color: var(--mosaic-text-regular);
      font-size: var(--mosaic-font-size);
      margin: 0;

      em {
        color: var(--mosaic-primary);
        font-style: normal;
      }
    }
  }

  &__tip {
    margin-top: 8px;
    color: var(--mosaic-text-secondary);
    font-size: var(--mosaic-font-size-sm);
  }

  &__file-list {
    list-style: none;
    padding: 0;
    margin: 8px 0 0;
  }

  &__file {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 8px;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-regular);
    border-radius: var(--mosaic-border-radius);
    transition: background-color var(--mosaic-transition-duration-fast);

    &:hover {
      background-color: var(--mosaic-fill-color-light);
    }

    &-name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &--error {
        color: var(--mosaic-danger);
      }
    }

    &-progress {
      width: 100px;
      height: 4px;
      margin: 0 8px;
      background-color: var(--mosaic-border-color-lighter);
      border-radius: 2px;
      overflow: hidden;

      &-bar {
        display: block;
        height: 100%;
        background-color: var(--mosaic-primary);
        border-radius: 2px;
        transition: width 0.3s;
      }
    }

    &-status {
      margin: 0 8px;
    }

    &-success {
      color: var(--mosaic-success);
    }

    &-error {
      color: var(--mosaic-danger);
    }

    &-uploading {
      color: var(--mosaic-primary);
      font-size: var(--mosaic-font-size-sm);
    }

    &-actions {
      display: flex;
      align-items: center;
    }

    &-delete {
      cursor: pointer;
      color: var(--mosaic-text-placeholder);
      transition: color var(--mosaic-transition-duration-fast);

      &:hover {
        color: var(--mosaic-danger);
      }
    }
  }
}
</style>
