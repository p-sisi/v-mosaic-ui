<template>
  <component :is="tag" :class="classes" :style="rowStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'

defineOptions({ name: 'MRow' })

type RowType = 'flex' | undefined
type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between'
type RowAlign = 'top' | 'middle' | 'bottom'

const props = withDefaults(defineProps<{
  gutter?: number       // 栅格间隔
  type?: RowType        // 布局模式，flex 可用于灵活布局
  justify?: RowJustify  // flex 布局下的水平排列方式
  align?: RowAlign      // flex 布局下的垂直排列方式
  tag?: string          // 自定义元素标签
}>(), {
  gutter: 0,
  type: undefined,
  justify: 'start',
  align: 'top',
  tag: 'div',
})

provide('mRow', { gutter: computed(() => props.gutter) })

const classes = computed(() => [
  'm-row',
  {
    'm-row--flex': props.type === 'flex',
    [`m-row--justify-${props.justify}`]: props.type === 'flex' && props.justify,
    [`m-row--align-${props.align}`]: props.type === 'flex' && props.align,
  },
])

const rowStyle = computed(() => {
  if (props.gutter) {
    return {
      marginLeft: `-${props.gutter / 2}px`,
      marginRight: `-${props.gutter / 2}px`,
    }
  }
  return {}
})
</script>

<style lang="scss">
.m-row {
  display: block;
  box-sizing: border-box;

  &::after {
    content: '';
    display: table;
    clear: both;
  }

  &--flex {
    display: flex;

    &::after {
      display: none;
    }
  }

  &--justify-start {
    justify-content: flex-start;
  }

  &--justify-end {
    justify-content: flex-end;
  }

  &--justify-center {
    justify-content: center;
  }

  &--justify-space-around {
    justify-content: space-around;
  }

  &--justify-space-between {
    justify-content: space-between;
  }

  &--align-top {
    align-items: flex-start;
  }

  &--align-middle {
    align-items: center;
  }

  &--align-bottom {
    align-items: flex-end;
  }
}
</style>