<template>
  <div :class="classes" :style="gridStyle">
    <div class="m-descriptions__hidden-slot"><slot /></div>
    <div v-if="title || extra || $slots.title || $slots.extra" class="m-descriptions__header">
      <div class="m-descriptions__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="m-descriptions__extra">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </div>
    <div class="m-descriptions__body">
      <table v-if="bordered" class="m-descriptions__table m-descriptions__table--border">
        <tbody>
          <template v-for="(row, rowIndex) in rows" :key="rowIndex">
            <tr v-if="direction === 'horizontal'">
              <template v-for="(cell, cellIndex) in row" :key="cellIndex">
                <th class="m-descriptions__label" :class="[cell.labelClassName, `m-descriptions__label--${size}`]" :style="cell.labelStyle">
                  {{ cell.label }}{{ colon ? '：' : '' }}
                </th>
                <td class="m-descriptions__content" :class="[cell.contentClassName, `m-descriptions__content--${size}`, `m-descriptions__content--${cell.align}`]" :style="cell.contentStyle" :colspan="cell.span > 1 ? cell.span * 2 - 1 : 1">
                  <CellRenderer :render="cell.renderSlot" />
                </td>
              </template>
            </tr>
            <template v-else>
              <tr>
                <th v-for="(cell, cellIndex) in row" :key="cellIndex" class="m-descriptions__label" :class="[cell.labelClassName, `m-descriptions__label--${size}`]" :style="cell.labelStyle">
                  {{ cell.label }}{{ colon ? '：' : '' }}
                </th>
              </tr>
              <tr>
                <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="m-descriptions__content" :class="[cell.contentClassName, `m-descriptions__content--${size}`, `m-descriptions__content--${cell.align}`]" :style="cell.contentStyle" :colspan="cell.span > 1 ? cell.span : 1">
                  <CellRenderer :render="cell.renderSlot" />
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
      <div v-else class="m-descriptions__grid">
        <template v-for="(row, rowIndex) in rows" :key="rowIndex">
          <template v-if="direction === 'horizontal'">
            <template v-for="(cell, cellIndex) in row" :key="cellIndex">
              <div class="m-descriptions__grid-label" :class="[cell.labelClassName, `m-descriptions__grid-label--${size}`]" :style="{ ...cell.labelStyle, gridColumn: 'span 1' }">
                {{ cell.label }}{{ colon ? '：' : '' }}
              </div>
              <div class="m-descriptions__grid-content" :class="[cell.contentClassName, `m-descriptions__grid-content--${size}`, `m-descriptions__grid-content--${cell.align}`]" :style="{ ...cell.contentStyle, gridColumn: `span ${cell.span * 2 - 1}` }">
                <CellRenderer :render="cell.renderSlot" />
              </div>
            </template>
          </template>
          <template v-else>
            <template v-for="(cell, cellIndex) in row" :key="cellIndex">
              <div class="m-descriptions__grid-label m-descriptions__grid-label--full" :class="[cell.labelClassName, `m-descriptions__grid-label--${size}`]" :style="cell.labelStyle">
                {{ cell.label }}{{ colon ? '：' : '' }}
              </div>
              <div class="m-descriptions__grid-content m-descriptions__grid-content--full" :class="[cell.contentClassName, `m-descriptions__grid-content--${size}`, `m-descriptions__grid-content--${cell.align}`]" :style="{ ...cell.contentStyle, gridColumn: `span ${cell.span * 2}` }">
                <CellRenderer :render="cell.renderSlot" />
              </div>
            </template>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, h, defineComponent } from 'vue'

defineOptions({ name: 'MDescriptions' })

const CellRenderer = defineComponent({
  name: 'MDescriptionsCellRenderer',
  props: { render: { type: Function, default: null } },
  setup(props) {
    return () => props.render ? props.render() : null
  },
})

type DescriptionsSize = 'large' | 'default' | 'small'
type DescriptionsDirection = 'horizontal' | 'vertical'

const props = withDefaults(defineProps<{
  title?: string                              // 描述列表标题
  size?: DescriptionsSize                     // 列表尺寸
  bordered?: boolean                          // 是否带有边框
  column?: number                             // 一行显示的数量
  direction?: DescriptionsDirection           // 排列方向
  extra?: string                              // 操作区文本
  colon?: boolean                             // 是否显示冒号
  labelClassName?: string                     // 自定义标签类名
  contentClassName?: string                   // 自定义内容类名
  labelStyle?: object | string                // 自定义标签样式
  contentStyle?: object | string              // 自定义内容样式
}>(), {
  title: '',
  size: 'default',
  bordered: false,
  column: 3,
  direction: 'horizontal',
  extra: '',
  colon: true,
  labelClassName: '',
  contentClassName: '',
  labelStyle: () => ({}),
  contentStyle: () => ({}),
})

const items = reactive<any[]>([])

const addItem = (item: any) => {
  items.push(item)
}

const removeItem = (itemId: string) => {
  const idx = items.findIndex(i => i.id === itemId)
  if (idx > -1) items.splice(idx, 1)
}

interface RowCell {
  label: string
  span: number
  align: string
  labelClassName: string
  contentClassName: string
  labelStyle: any
  contentStyle: any
  renderSlot: any
}

const rows = computed(() => {
  const result: RowCell[][] = []
  let currentRow: RowCell[] = []
  let remaining = props.column

  for (const item of items) {
    const span = Math.min(item.span || 1, props.column)
    if (span > remaining) {
      result.push(currentRow)
      currentRow = []
      remaining = props.column
    }
    currentRow.push({
      label: item.label,
      span: span,
      align: item.align || 'left',
      labelClassName: item.labelClassName || props.labelClassName,
      contentClassName: item.contentClassName || props.contentClassName,
      labelStyle: item.labelStyle || props.labelStyle,
      contentStyle: item.contentStyle || props.contentStyle,
      renderSlot: item.renderSlot,
    })
    remaining -= span
    if (remaining <= 0) {
      result.push(currentRow)
      currentRow = []
      remaining = props.column
    }
  }
  if (currentRow.length > 0) {
    result.push(currentRow)
  }
  return result
})

const classes = computed(() => [
  'm-descriptions',
  `m-descriptions--${props.size}`,
])

const gridStyle = computed(() => ({
  '--mosaic-descriptions-columns': String(props.column * 2),
}))

provide('mDescriptions', {
  border: computed(() => props.bordered),
  column: computed(() => props.column),
  direction: computed(() => props.direction),
  size: computed(() => props.size),
  colon: computed(() => props.colon),
  addItem,
  removeItem,
})
</script>

<style lang="scss">
.m-descriptions {
  font-size: var(--mosaic-font-size);
  color: var(--mosaic-text-primary);

  &__hidden-slot {
    display: none;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__title {
    font-size: var(--mosaic-font-size-lg);
    font-weight: 700;
    color: var(--mosaic-text-primary);
  }

  &__extra {
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-regular);
  }

  &__body {
    width: 100%;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;

    &--border {
      border: 1px solid var(--mosaic-border-color);

      .m-descriptions__label,
      .m-descriptions__content {
        border: 1px solid var(--mosaic-border-color);
        padding: 8px 10px;
      }
    }
  }

  &__label {
    font-weight: 600;
    color: var(--mosaic-text-primary);
    text-align: left;
    background-color: var(--mosaic-fill-color-light);
    padding: 8px 10px;
    vertical-align: top;

    &--large {
      padding: 12px 14px;
    }

    &--small {
      padding: 4px 8px;
      font-size: var(--mosaic-font-size-sm);
    }
  }

  &__content {
    color: var(--mosaic-text-regular);
    text-align: left;
    padding: 8px 10px;
    vertical-align: top;

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }

    &--large {
      padding: 12px 14px;
    }

    &--small {
      padding: 4px 8px;
      font-size: var(--mosaic-font-size-sm);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(var(--mosaic-descriptions-columns, 6), 1fr);
    gap: 0;
  }

  &__grid-label {
    font-weight: 600;
    color: var(--mosaic-text-primary);
    background-color: var(--mosaic-fill-color-light);
    padding: 8px 10px;
    text-align: left;

    &--large {
      padding: 12px 14px;
    }

    &--small {
      padding: 4px 8px;
      font-size: var(--mosaic-font-size-sm);
    }
  }

  &__grid-content {
    color: var(--mosaic-text-regular);
    padding: 8px 10px;
    text-align: left;

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }

    &--large {
      padding: 12px 14px;
    }

    &--small {
      padding: 4px 8px;
      font-size: var(--mosaic-font-size-sm);
    }
  }
}
</style>