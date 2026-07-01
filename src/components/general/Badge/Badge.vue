<template>
  <div class="m-badge">
    <slot />
    <transition name="m-zoom-in-center">
      <sup
        v-show="!hidden && (content || isDot || $slots.content)"
        :class="classes"
        :style="style"
      >
        <slot name="content">{{ isDot ? '' : content }}</slot>
      </sup>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

defineOptions({ name: 'MBadge' })

type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

const props = withDefaults(defineProps<{
  value?: string | number    // 徽章显示的值
  max?: number               // 最大值，超过显示 max+
  isDot?: boolean            // 是否为小圆点
  hidden?: boolean           // 是否隐藏徽章
  type?: BadgeType           // 徽章类型，决定颜色风格
  color?: string             // 自定义徽章背景色
}>(), {
  value: '',
  max: undefined,
  isDot: false,
  hidden: false,
  type: 'primary',
  color: '',
})

const emit = defineEmits<{}>()

const slots = useSlots()

const content = computed(() => {
  if (props.isDot) return ''
  if (typeof props.value === 'number' && typeof props.max === 'number' && props.value > props.max) {
    return `${props.max}+`
  }
  return String(props.value)
})

const classes = computed(() => [
  'm-badge__content',
  `m-badge__content--${props.type}`,
  {
    'is-dot': props.isDot,
    'is-fixed': !!slots.default,
  },
])

const style = computed(() => {
  if (!props.color) return null
  return { backgroundColor: props.color } as Record<string, string>
})
</script>

<style lang="scss" scoped>
.m-badge {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
}

.m-badge__content {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-50%) translateX(50%);
  background-color: var(--mosaic-primary);
  color: #fff;
  font-size: var(--mosaic-font-size-sm);
  line-height: 18px;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 9px;
  white-space: nowrap;
  text-align: center;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.m-badge__content--primary {
  background-color: var(--mosaic-primary);
}

.m-badge__content--success {
  background-color: var(--mosaic-success);
}

.m-badge__content--warning {
  background-color: var(--mosaic-warning);
}

.m-badge__content--danger {
  background-color: var(--mosaic-danger);
}

.m-badge__content--info {
  background-color: var(--mosaic-info);
}

.m-badge__content.is-dot {
  width: 8px;
  height: 8px;
  min-width: 8px;
  padding: 0;
  border-radius: 50%;
}

.m-badge__content.is-fixed {
  transform: translateY(-50%) translateX(50%);
}

.m-badge__content.is-dot.is-fixed {
  transform: translateY(-50%) translateX(50%);
}
</style>
