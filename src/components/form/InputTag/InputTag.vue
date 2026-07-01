<template>
  <div :class="classes" ref="wrapperRef">
    <div class="m-input-tag__container" ref="containerRef">
      <TransitionGroup
        v-if="!collapseTags"
        name="m-input-tag-pop"
        tag="div"
        class="m-input-tag__tags"
      >
        <span
          v-for="(tag, index) in innerTags"
          :key="tag + '::' + index"
          class="m-input-tag__tag-wrapper"
          :draggable="draggable"
          @dragstart="handleDragStart($event, index)"
          @dragover.prevent="handleDragOver($event, index)"
          @dragenter.prevent="handleDragEnter($event, index)"
          @dragend="handleDragEnd"
          @drop.prevent="handleDrop($event, index)"
        >
          <slot name="tag" :tag="tag" :index="index">
            <MTag
              :type="tagType"
              :effect="tagEffect"
              :size="tagSize"
              :closable="!effectiveDisabled && clearable"
              @close="removeTag(index)"
            >
              {{ tag }}
            </MTag>
          </slot>
        </span>
      </TransitionGroup>

      <!-- collapse-tags 模式：单行，超出折叠 -->
      <template v-else>
        <div class="m-input-tag__tags m-input-tag__tags--collapse" ref="collapseTagsRef">
          <span
            v-for="(tag, index) in innerTags.slice(0, visibleCount)"
            :key="tag + '::' + index"
            class="m-input-tag__tag-wrapper"
            :draggable="draggable"
            @dragstart="handleDragStart($event, index)"
            @dragover.prevent="handleDragOver($event, index)"
            @dragenter.prevent="handleDragEnter($event, index)"
            @dragend="handleDragEnd"
            @drop.prevent="handleDrop($event, index)"
          >
            <Transition name="m-input-tag-pop" appear>
              <slot name="tag" :tag="tag" :index="index">
                <MTag
                  :type="tagType"
                  :effect="tagEffect"
                  :size="tagSize"
                  :closable="!effectiveDisabled && clearable"
                  @close="removeTag(index)"
                >
                  {{ tag }}
                </MTag>
              </slot>
            </Transition>
          </span>
        </div>
        <MPopover
          v-if="overflowCount > 0"
          trigger="hover"
          placement="top"
          :width="'auto'"
          :visible-arrow="true"
          popper-class="m-input-tag__overflow-popover"
        >
          <template #default>
            <span class="m-input-tag__overflow">+{{ overflowCount }}</span>
          </template>
          <template #content>
            <div class="m-input-tag__overflow-list">
              <MTag
                v-for="(tag, index) in overflowTags"
                :key="tag"
                :type="tagType"
                :effect="tagEffect"
                :size="tagSize"
                :closable="!effectiveDisabled && clearable"
                @close="removeTag(visibleCount + index)"
              >
                {{ tag }}
              </MTag>
            </div>
          </template>
        </MPopover>
      </template>

      <input
        ref="inputRef"
        class="m-input-tag__input"
        :value="inputValue"
        :placeholder="innerTags.length === 0 ? placeholder : ''"
        :disabled="effectiveDisabled || atMax"
        @keydown.enter.prevent="commitTag"
        @keydown.delete="handleBackspace"
        @keydown="handleKeydown"
        @input="handleInput"
        @focus="focused = true"
        @blur="handleBlur"
      />
    </div>

    <!-- 隐藏测量层：始终渲染所有标签用于测量宽度 -->
    <div v-if="collapseTags" class="m-input-tag__measure" ref="measureRef" aria-hidden="true">
      <span
        v-for="(tag, index) in innerTags"
        :key="'measure-' + index"
        class="m-input-tag__tag-wrapper"
      >
        <slot name="tag" :tag="tag" :index="index">
          <MTag
            :type="tagType"
            :effect="tagEffect"
            :size="tagSize"
            :closable="!effectiveDisabled && clearable"
          >
            {{ tag }}
          </MTag>
        </slot>
      </span>
      <span class="m-input-tag__overflow">+99</span>
    </div>

    <span
      v-if="clearable && innerTags.length > 0 && !effectiveDisabled"
      class="m-input-tag__clear"
      @click="handleClearAll"
      @mousedown.prevent
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import MTag from '../../general/Tag/Tag.vue'
import MPopover from '../../feedback/Popover/Popover.vue'
import { useFormItem } from '../../../hooks/useFormItem'

defineOptions({ name: 'MInputTag' })

type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
type TagEffect = 'light' | 'dark' | 'plain'
type InputSize = 'small' | 'default' | 'large'

const props = withDefaults(defineProps<{
  modelValue?: string[]
  max?: number
  collapseTags?: boolean
  disabled?: boolean
  clearable?: boolean
  draggable?: boolean
  size?: InputSize
  tagType?: TagType
  tagEffect?: TagEffect
  placeholder?: string
  trigger?: 'enter' | 'space' | 'comma'
  allowDuplicate?: boolean
}>(), {
  modelValue: () => [],
  max: 0,
  collapseTags: false,
  disabled: false,
  clearable: false,
  draggable: false,
  size: 'default',
  tagType: 'primary',
  tagEffect: 'light',
  placeholder: '请输入后回车',
  trigger: 'enter',
  allowDuplicate: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  change: [value: string[]]
  add: [tag: string]
  remove: [tag: string]
  clear: []
}>()

const { effectiveDisabled, effectiveSize } = useFormItem(props)

const wrapperRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const collapseTagsRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const measureRef = ref<HTMLElement | null>(null)

const innerTags = ref<string[]>([...props.modelValue])
const inputValue = ref('')
const focused = ref(false)
const visibleCount = ref(0)

const atMax = computed(() => props.max > 0 && innerTags.value.length >= props.max)
const overflowCount = computed(() => innerTags.value.length - visibleCount.value)
const overflowTags = computed(() => innerTags.value.slice(visibleCount.value))

const tagSize = computed<'small' | 'default' | 'large'>(() => {
  if (effectiveSize.value === 'small') return 'small'
  if (effectiveSize.value === 'large') return 'large'
  return 'default'
})

const classes = computed(() => [
  'm-input-tag',
  `m-input-tag--${effectiveSize.value}`,
  {
    'm-input-tag--disabled': effectiveDisabled.value,
    'm-input-tag--focused': focused.value,
    'm-input-tag--collapse': props.collapseTags,
    'm-input-tag--dragging': isDragging.value,
  },
])

// ===== modelValue 同步 =====
watch(() => props.modelValue, (val) => {
  if (Array.isArray(val) && JSON.stringify(val) !== JSON.stringify(innerTags.value)) {
    innerTags.value = [...val]
    nextTick(measureOverflow)
  }
})

watch(innerTags, (val) => {
  emit('update:modelValue', [...val])
  emit('change', [...val])
  nextTick(measureOverflow)
}, { deep: true })

// ===== 输入与提交 =====
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  let val = target.value
  if (props.trigger === 'comma') {
    if (val.endsWith(',')) {
      const tag = val.slice(0, -1).trim()
      if (tag) commitTagValue(tag)
      target.value = ''
      inputValue.value = ''
      return
    }
  }
  if (props.trigger === 'space') {
    if (val.endsWith(' ')) {
      const tag = val.slice(0, -1).trim()
      if (tag) commitTagValue(tag)
      target.value = ''
      inputValue.value = ''
      return
    }
  }
  inputValue.value = val
}

function handleKeydown(event: KeyboardEvent) {
  if (props.trigger === 'space' && event.code === 'Space' && !inputValue.value.trim()) {
    // allow default space when empty
    return
  }
  if (props.trigger === 'space' && event.code === 'Space') {
    event.preventDefault()
    const tag = inputValue.value.trim()
    if (tag) commitTagValue(tag)
    return
  }
}

function commitTag() {
  const tag = inputValue.value.trim()
  if (!tag) return
  commitTagValue(tag)
}

function commitTagValue(tag: string) {
  if (effectiveDisabled.value) return
  if (atMax.value) return
  if (!props.allowDuplicate && innerTags.value.includes(tag)) {
    inputValue.value = ''
    if (inputRef.value) inputRef.value.value = ''
    return
  }
  innerTags.value.push(tag)
  emit('add', tag)
  inputValue.value = ''
  if (inputRef.value) inputRef.value.value = ''
  nextTick(() => {
    inputRef.value?.focus()
    measureOverflow()
  })
}

function removeTag(index: number) {
  if (effectiveDisabled.value) return
  if (index < 0 || index >= innerTags.value.length) return
  const [removed] = innerTags.value.splice(index, 1)
  emit('remove', removed)
  nextTick(measureOverflow)
}

function handleBackspace() {
  if (inputValue.value === '' && innerTags.value.length > 0) {
    removeTag(innerTags.value.length - 1)
  }
}

function handleBlur() {
  focused.value = false
  // 失焦时如果输入框有内容，自动提交
  if (inputValue.value.trim()) {
    commitTag()
  }
}

function handleClearAll() {
  innerTags.value = []
  emit('clear')
  nextTick(measureOverflow)
}

// ===== 折叠测量 =====
function measureOverflow() {
  if (!props.collapseTags) {
    visibleCount.value = innerTags.value.length
    return
  }
  const measureEl = measureRef.value
  const container = containerRef.value
  if (!measureEl || !container) {
    visibleCount.value = innerTags.value.length
    return
  }

  // 从隐藏测量层获取每个标签的真实宽度
  const tagEls = measureEl.querySelectorAll('.m-input-tag__tag-wrapper')
  const indicatorEl = measureEl.querySelector('.m-input-tag__overflow') as HTMLElement | null
  if (tagEls.length === 0) {
    visibleCount.value = 0
    return
  }

  const containerWidth = container.clientWidth
  const gap = 4
  const inputMinWidth = 60

  // 收集每个标签宽度
  const tagWidths: number[] = []
  for (let i = 0; i < tagEls.length; i++) {
    tagWidths.push((tagEls[i] as HTMLElement).offsetWidth)
  }
  const indicatorWidth = indicatorEl ? indicatorEl.offsetWidth : 50

  // 先检查：不需要折叠指示器时，所有标签是否放得下
  // 布局: [tags...] gap input，input 至少占 inputMinWidth
  const allTagsWidth = tagWidths.reduce((sum, w) => sum + w + gap, 0)
  if (allTagsWidth + gap + inputMinWidth <= containerWidth) {
    visibleCount.value = innerTags.value.length
    return
  }

  // 需要折叠指示器，布局: [visible tags...] gap [+N] gap input
  const availableForTags = containerWidth - indicatorWidth - inputMinWidth - gap * 2

  let total = 0
  let count = 0
  for (let i = 0; i < tagWidths.length; i++) {
    const w = tagWidths[i] + (i > 0 ? gap : 0)
    if (total + w > availableForTags) {
      break
    }
    total += w
    count++
  }

  visibleCount.value = Math.max(0, count)
}

let resizeObserver: ResizeObserver | null = null
onMounted(() => {
  nextTick(measureOverflow)
  if (containerRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => measureOverflow())
    resizeObserver.observe(containerRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

// ===== 拖拽排序 =====
const dragIndex = ref<number>(-1)
const isDragging = ref(false)

function handleDragStart(event: DragEvent, index: number) {
  if (!props.draggable || effectiveDisabled.value) {
    event.preventDefault()
    return
  }
  dragIndex.value = index
  isDragging.value = true
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
  }
}

function handleDragOver(event: DragEvent, index: number) {
  if (!props.draggable) return
  if (event.dataTransfer) event.dataTransfer.dropEffect = 'move'
}

function handleDragEnter(event: DragEvent, index: number) {
  if (!props.draggable) return
  if (dragIndex.value === -1 || dragIndex.value === index) return
  const tags = [...innerTags.value]
  const [moved] = tags.splice(dragIndex.value, 1)
  tags.splice(index, 0, moved)
  innerTags.value = tags
  dragIndex.value = index
}

function handleDrop(event: DragEvent, index: number) {
  if (!props.draggable) return
  event.preventDefault()
  dragIndex.value = -1
}

function handleDragEnd() {
  isDragging.value = false
  dragIndex.value = -1
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<style lang="scss">
.m-input-tag {
  display: inline-flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  border: 1px solid var(--mosaic-border-color);
  border-radius: var(--mosaic-border-radius);
  padding: 0 8px;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
  cursor: text;

  &:hover {
    border-color: var(--mosaic-primary);
  }

  &--focused {
    border-color: var(--mosaic-primary);
    box-shadow: 0 0 0 2px rgba(167, 139, 250, 0.2);
  }

  &__container {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    flex-wrap: wrap;
    gap: 4px;
    padding: 2px 0;
  }

  &--collapse &__container {
    flex-wrap: nowrap;
    overflow: hidden;
  }

  /* 隐藏测量层：用于测量标签真实宽度 */
  &__measure {
    position: absolute;
    top: -9999px;
    left: -9999px;
    visibility: hidden;
    pointer-events: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    z-index: -1;
  }

  &__tags {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;

    &--collapse {
      flex-wrap: nowrap;
      overflow: hidden;
      flex-shrink: 0;
    }
  }

  &__tag-wrapper {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;

    &[draggable="true"] {
      cursor: grab;
    }
  }

  &--dragging &__tag-wrapper {
    cursor: grabbing;
  }

  &__input {
    flex: 1;
    min-width: 60px;
    border: none;
    outline: none;
    background: transparent;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
    padding: 0;
    height: 100%;
    box-sizing: border-box;

    &::placeholder {
      color: var(--mosaic-text-placeholder);
    }

    &:disabled {
      cursor: not-allowed;
      color: var(--mosaic-text-placeholder);
    }
  }

  &__overflow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    padding: 0 8px;
    background-color: var(--mosaic-fill-color-light);
    border: 1px solid var(--mosaic-border-color-lighter);
    border-radius: 4px;
    color: var(--mosaic-text-regular);
    font-size: var(--mosaic-font-size-sm);
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.2s;

    &:hover {
      border-color: var(--mosaic-primary);
      color: var(--mosaic-primary);
    }
  }

  &__overflow-list {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    max-width: 280px;
  }

  &__clear {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: var(--mosaic-text-placeholder);
    flex-shrink: 0;
    margin-left: 4px;
    transition: color 0.2s;

    &:hover {
      color: var(--mosaic-text-primary);
    }
  }

  /* 尺寸 */
  &--small {
    min-height: 24px;

    .m-input-tag__input {
      font-size: var(--mosaic-font-size-sm);
    }
    .m-input-tag__container {
      padding: 1px 0;
    }
  }

  &--default {
    min-height: 32px;
  }

  &--large {
    min-height: 40px;

    .m-input-tag__input {
      font-size: var(--mosaic-font-size-lg);
    }
  }

  /* 禁用 */
  &--disabled {
    background-color: var(--mosaic-disabled-bg-color);
    border-color: var(--mosaic-disabled-border-color);
    cursor: not-allowed;

    &:hover {
      border-color: var(--mosaic-disabled-border-color);
    }

    .m-input-tag__input {
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;
    }
  }
}

/* 标签进出动画 */
.m-input-tag-pop-enter-active {
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: left center;
}

.m-input-tag-pop-leave-active {
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: absolute;
  transform-origin: left center;
}

.m-input-tag-pop-enter-from {
  opacity: 0;
  transform: scale(0.5) translateX(-8px);
}

.m-input-tag-pop-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
