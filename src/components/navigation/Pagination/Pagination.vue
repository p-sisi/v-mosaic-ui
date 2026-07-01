<template>
  <div v-if="!hideOnSinglePage || total > internalPageSize" :class="classes">
    <template v-for="segment in layoutSegments" :key="segment">
      <!-- 总条数 -->
      <span v-if="segment === 'total'" class="m-pagination__total">
        共 {{ total }} 条
      </span>
      <!-- 上一页按钮 -->
      <button
        v-if="segment === 'prev'"
        class="m-pagination__btn m-pagination__prev"
        :class="{ 'm-pagination__btn--disabled': internalCurrentPage <= 1 || disabled }"
        :disabled="internalCurrentPage <= 1 || disabled"
        @click="handlePrev"
      >
        {{ prevText || '&lt;' }}
      </button>

      <!-- 页码 -->
      <ul v-if="segment === 'pager'" class="m-pagination__pager">
        <li
          v-for="page in pagerList"
          :key="page"
          :class="[
            'm-pagination__number',
            {
              'm-pagination__number--active': page === internalCurrentPage,
              'm-pagination__number--disabled': disabled,
            },
          ]"
          @click="handlePageClick(page)"
        >
          {{ page }}
        </li>
      </ul>

      <!-- 下一页按钮 -->
      <button
        v-if="segment === 'next'"
        class="m-pagination__btn m-pagination__next"
        :class="{ 'm-pagination__btn--disabled': internalCurrentPage >= internalPageCount || disabled }"
        :disabled="internalCurrentPage >= internalPageCount || disabled"
        @click="handleNext"
      >
        {{ nextText || '&gt;' }}
      </button>

      <!-- 每页条数选择器 -->
      <select
        v-if="segment === 'sizes'"
        class="m-pagination__sizes"
        :disabled="disabled"
        :value="internalPageSize"
        @change="handleSizeChange"
      >
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }} 条/页
        </option>
      </select>

      <!-- 跳转输入 -->
      <span v-if="segment === 'jumper'" class="m-pagination__jumper">
        前往
        <input
          class="m-pagination__jumper-input"
          type="number"
          :min="1"
          :max="internalPageCount"
          :disabled="disabled"
          :value="internalCurrentPage"
          @change="handleJumperChange"
        />
        页
      </span>

      <!-- 右对齐占位 -->
      <span v-if="segment === '->'" class="m-pagination__rightward" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

defineOptions({ name: 'MPagination' })

const props = withDefaults(defineProps<{
  small?: boolean              // 是否使用小型分页样式
  pageSize?: number            // 每页条数
  total?: number               // 总条数
  pageCount?: number           // 总页数（替代 total 计算方式）
  pagerCount?: number          // 页码按钮的数量（大于等于 5 的奇数）
  currentPage?: number         // 当前页数，支持 v-model
  layout?: string              // 组件布局，子组件名用逗号分隔
  pageSizes?: number[]         // 每页条数选择器的选项
  prevText?: string            // 替代图标显示的上一页文字
  nextText?: string            // 替代图标显示的下一页文字
  background?: boolean         // 是否为按钮添加背景色
  text?: boolean               // 页码是否为纯文字（无边框无背景）
  disabled?: boolean           // 是否禁用
  hideOnSinglePage?: boolean   // 只有一页时是否隐藏
}>(), {
  small: false,
  pageSize: 10,
  total: 0,
  pageCount: 0,
  pagerCount: 7,
  currentPage: 1,
  layout: '->, total, prev, pager, next, jumper',
  pageSizes: () => [10, 20, 30, 40, 50, 100],
  prevText: '',
  nextText: '',
  background: false,
  text: false,
  disabled: false,
  hideOnSinglePage: false,
})

const emit = defineEmits<{
  'update:currentPage': [page: number]     // v-model 更新事件
  'update:pageSize': [size: number]        // 每页条数更新事件
  'current-change': [newPage: number, oldPage: number]  // 当前页改变时触发
  'size-change': [size: number]            // 每页条数改变时触发
  'prev-click': [page: number]             // 点击上一页时触发
  'next-click': [page: number]             // 点击下一页时触发
}>()

const internalCurrentPage = ref(props.currentPage)
const internalPageSize = ref(props.pageSize)

watch(() => props.currentPage, (val) => { internalCurrentPage.value = val })
watch(() => props.pageSize, (val) => { internalPageSize.value = val })

const internalPageCount = computed(() => {
  if (props.pageCount) return props.pageCount
  if (props.total) return Math.ceil(props.total / internalPageSize.value) || 1
  return 1
})

const layoutSegments = computed(() => {
  return props.layout.split(',').map((s) => s.trim())
})

const classes = computed(() => [
  'm-pagination',
  {
    'm-pagination--small': props.small,
    'm-pagination--background': props.background,
    'm-pagination--text': props.text,
    'm-pagination--disabled': props.disabled,
  },
])

const pagerList = computed(() => {
  const count = internalPageCount.value
  const pagerCount = props.pagerCount
  const current = internalCurrentPage.value

  if (count <= pagerCount) {
    return Array.from({ length: count }, (_, i) => i + 1)
  }

  const half = (pagerCount - 1) / 2
  const showPrevMore = current > half + 1
  const showNextMore = current < count - half

  const pages: (number | string)[] = []
  pages.push(1)

  if (showPrevMore) {
    pages.push('...')
  }

  let start: number
  let end: number

  if (showPrevMore && showNextMore) {
    // Both ellipsis: show pagerCount - 4 middle pages
    const middle = pagerCount - 4
    start = current - Math.floor(middle / 2)
    end = start + middle - 1
  } else if (showPrevMore && !showNextMore) {
    // Only prev more: show last (pagerCount - 3) pages before last
    start = count - (pagerCount - 3)
    end = count - 1
  } else if (!showPrevMore && showNextMore) {
    // Only next more: show first (pagerCount - 3) pages after 1
    start = 2
    end = pagerCount - 2
  } else {
    // Neither: show all middle pages
    start = 2
    end = count - 1
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (showNextMore) {
    pages.push('...')
  }

  pages.push(count)

  return pages
})

function handlePrev() {
  if (internalCurrentPage.value <= 1 || props.disabled) return
  const old = internalCurrentPage.value
  internalCurrentPage.value--
  emit('update:currentPage', internalCurrentPage.value)
  emit('current-change', internalCurrentPage.value, old)
  emit('prev-click', internalCurrentPage.value)
}

function handleNext() {
  if (internalCurrentPage.value >= internalPageCount.value || props.disabled) return
  const old = internalCurrentPage.value
  internalCurrentPage.value++
  emit('update:currentPage', internalCurrentPage.value)
  emit('current-change', internalCurrentPage.value, old)
  emit('next-click', internalCurrentPage.value)
}

function handlePageClick(page: number | string) {
  if (typeof page !== 'number' || props.disabled) return
  if (page === internalCurrentPage.value) return
  const old = internalCurrentPage.value
  internalCurrentPage.value = page
  emit('update:currentPage', page)
  emit('current-change', page, old)
}

function handleSizeChange(event: Event) {
  const size = Number((event.target as HTMLSelectElement).value)
  const old = internalPageSize.value
  internalPageSize.value = size
  emit('update:pageSize', size)
  emit('size-change', size)
  // Adjust current page to be within new range
  const newPageCount = Math.ceil(props.total / size) || 1
  if (internalCurrentPage.value > newPageCount) {
    internalCurrentPage.value = newPageCount
    emit('update:currentPage', newPageCount)
  }
}

function handleJumperChange(event: Event) {
  let page = Number((event.target as HTMLInputElement).value)
  if (page < 1) page = 1
  if (page > internalPageCount.value) page = internalPageCount.value
  if (page === internalCurrentPage.value) return
  const old = internalCurrentPage.value
  internalCurrentPage.value = page
  emit('update:currentPage', page)
  emit('current-change', page, old)
}
</script>

<style lang="scss">
.m-pagination {
  display: flex;
  align-items: center;
  font-size: var(--mosaic-font-size);
  color: var(--mosaic-text-primary);
  gap: 8px;
  flex-wrap: wrap;
  user-select: none;

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--background {
    .m-pagination__btn {
      background-color: var(--mosaic-fill-color-light);
      border-color: transparent;

      &:hover:not(.m-pagination__btn--disabled) {
        color: var(--mosaic-primary);
      }
    }

    .m-pagination__number {
      background-color: var(--mosaic-fill-color-light);
      border-color: transparent;

      &--active {
        background-color: var(--mosaic-primary);
        color: #fff;
      }
    }
  }

  &--small {
    .m-pagination__btn,
    .m-pagination__number {
      min-width: 24px;
      height: 22px;
      font-size: var(--mosaic-font-size-sm);
    }
  }

  &--text {
    .m-pagination__number {
      border-color: transparent;
      background-color: transparent;
      min-width: auto;
      padding: 0 6px;

      &:hover:not(.m-pagination__number--disabled):not(.m-pagination__number--active) {
        color: var(--mosaic-primary);
        border-color: transparent;
      }

      &--active {
        color: var(--mosaic-primary);
        background-color: transparent;
        border-color: transparent;
        font-weight: 600;
      }
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    height: 28px;
    padding: 0 4px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    background-color: #fff;
    color: var(--mosaic-text-primary);
    cursor: pointer;
    font-size: var(--mosaic-font-size);
    transition: all var(--mosaic-transition-duration-fast);
    outline: none;

    &:hover:not(.m-pagination__btn--disabled) {
      color: var(--mosaic-primary);
      border-color: var(--mosaic-primary);
    }

    &--disabled {
      color: var(--mosaic-text-placeholder);
      cursor: not-allowed;
    }
  }

  &__pager {
    display: inline-flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 4px;
  }

  &__number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    height: 28px;
    padding: 0 4px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    background-color: #fff;
    color: var(--mosaic-text-primary);
    cursor: pointer;
    font-size: var(--mosaic-font-size);
    transition: all var(--mosaic-transition-duration-fast);
    list-style: none;
    outline: none;

    &:hover:not(.m-pagination__number--disabled):not(.m-pagination__number--active) {
      color: var(--mosaic-primary);
      border-color: var(--mosaic-primary);
    }

    &--active {
      background-color: var(--mosaic-primary);
      border-color: var(--mosaic-primary);
      color: #fff;
    }

    &--disabled {
      cursor: not-allowed;
      color: var(--mosaic-text-placeholder);
    }
  }

  &__sizes {
    height: 28px;
    padding: 0 8px;
    border: 1px solid var(--mosaic-border-color);
    border-radius: var(--mosaic-border-radius);
    background-color: #fff;
    color: var(--mosaic-text-primary);
    font-size: var(--mosaic-font-size);
    cursor: pointer;
    outline: none;

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__jumper {
    display: inline-flex;
    align-items: center;
    color: var(--mosaic-text-regular);
    font-size: var(--mosaic-font-size);
    margin-left: 8px;

    &-input {
      width: 50px;
      height: 28px;
      padding: 0 8px;
      margin: 0 4px;
      border: 1px solid var(--mosaic-border-color);
      border-radius: var(--mosaic-border-radius);
      text-align: center;
      font-size: var(--mosaic-font-size);
      color: var(--mosaic-text-primary);
      outline: none;
      background-color: #fff;

      &:focus {
        border-color: var(--mosaic-primary);
      }
    }
  }

  &__total {
    color: var(--mosaic-text-regular);
    font-size: var(--mosaic-font-size);
  }

  &__rightward {
    flex: 1;
  }
}
</style>