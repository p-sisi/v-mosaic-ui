<template>
  <li :class="classes">
    <div class="m-timeline-item__tail"></div>
    <div class="m-timeline-item__node" :style="nodeStyle">
      <slot name="dot"></slot>
    </div>
    <div class="m-timeline-item__wrapper">
      <div v-if="timestamp && placement === 'top'" class="m-timeline-item__timestamp m-timeline-item__timestamp--top">
        {{ timestamp }}
      </div>
      <div class="m-timeline-item__content">
        <slot />
      </div>
      <div v-if="timestamp && placement === 'bottom'" class="m-timeline-item__timestamp m-timeline-item__timestamp--bottom">
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MTimelineItem' })

type TimelineItemType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | ''
type TimelineItemPlacement = 'top' | 'bottom'
type TimelineItemSize = 'normal' | 'large'

const props = withDefaults(defineProps<{
  timestamp?: string                // 时间戳文本
  placement?: TimelineItemPlacement // 时间戳位置
  type?: TimelineItemType           // 节点类型颜色
  color?: string                    // 节点自定义颜色
  size?: TimelineItemSize           // 节点尺寸
  hollow?: boolean                  // 节点是否空心
}>(), {
  timestamp: '',
  placement: 'bottom',
  type: '',
  color: '',
  size: 'normal',
  hollow: false,
})

const typeColorMap: Record<string, string> = {
  primary: 'var(--mosaic-primary)',
  success: 'var(--mosaic-success)',
  warning: 'var(--mosaic-warning)',
  danger: 'var(--mosaic-danger)',
  info: 'var(--mosaic-info)',
}

const classes = computed(() => [
  'm-timeline-item',
  {
    [`m-timeline-item--${props.type}`]: !!props.type,
    'm-timeline-item--large': props.size === 'large',
    'm-timeline-item--hollow': props.hollow,
  },
])

const nodeStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style.backgroundColor = props.hollow ? 'transparent' : props.color
    style.borderColor = props.color
  } else if (props.type && typeColorMap[props.type]) {
    const color = typeColorMap[props.type]
    style.backgroundColor = props.hollow ? 'transparent' : color
    style.borderColor = color
  }
  return style
})
</script>
