<template>
  <ul :class="classes">
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'

defineOptions({ name: 'MTimeline' })

type TimelinePosition = 'left' | 'right' | 'alternating'

const props = withDefaults(defineProps<{
  reverse?: boolean                       // 是否倒序排列时间轴节点
  position?: TimelinePosition             // 内容位置
}>(), {
  reverse: false,
  position: 'left',
})

provide('mTimeline', {
  reverse: computed(() => props.reverse),
  position: computed(() => props.position),
})

const classes = computed(() => [
  'm-timeline',
  `m-timeline--${props.position}`,
  {
    'm-timeline--reverse': props.reverse,
  },
])
</script>

<style lang="scss">
.m-timeline {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;

  &--reverse {
    flex-direction: column-reverse;
  }

  /* Base item */
  .m-timeline-item {
    position: relative;
    padding-bottom: 20px;
    list-style: none;

    &:last-child {
      padding-bottom: 0;

      .m-timeline-item__tail {
        display: none;
      }
    }
  }
}

.m-timeline-item {
  &__tail {
    position: absolute;
    top: 14px;
    bottom: -6px;
    width: 2px;
    background-color: var(--mosaic-border-color-light);
  }

  &__node {
    position: absolute;
    top: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--mosaic-border-color-light);
    border: 2px solid var(--mosaic-border-color-light);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    box-sizing: border-box;
  }

  /* --- Node type colors --- */
  &--primary &__node {
    background-color: var(--mosaic-primary);
    border-color: var(--mosaic-primary);
  }
  &--success &__node {
    background-color: var(--mosaic-success);
    border-color: var(--mosaic-success);
  }
  &--warning &__node {
    background-color: var(--mosaic-warning);
    border-color: var(--mosaic-warning);
  }
  &--danger &__node {
    background-color: var(--mosaic-danger);
    border-color: var(--mosaic-danger);
  }
  &--info &__node {
    background-color: var(--mosaic-info);
    border-color: var(--mosaic-info);
  }

  &--large &__node {
    width: 16px;
    height: 16px;
  }

  &--hollow &__node {
    background-color: transparent;
  }

  &__wrapper {
    position: relative;
    top: -2px;
  }

  &__content {
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
    line-height: 1.6;
  }

  &__timestamp {
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-secondary);
    line-height: 1.4;

    &--top {
      margin-bottom: 4px;
    }

    &--bottom {
      margin-top: 4px;
    }
  }
}

/* --- Left mode (default) --- */
.m-timeline--left .m-timeline-item,
.m-timeline--alternating .m-timeline-item:nth-child(odd) {
  padding-left: 20px;
  padding-right: 0;
}

.m-timeline--left .m-timeline-item__tail,
.m-timeline--alternating .m-timeline-item:nth-child(odd) .m-timeline-item__tail {
  left: 4px;
  right: auto;
}

.m-timeline--left .m-timeline-item__node,
.m-timeline--alternating .m-timeline-item:nth-child(odd) .m-timeline-item__node {
  left: 0;
  right: auto;
}

.m-timeline--left .m-timeline-item__wrapper,
.m-timeline--alternating .m-timeline-item:nth-child(odd) .m-timeline-item__wrapper {
  padding-left: 12px;
  padding-right: 0;
  text-align: left;
}

/* --- Right mode --- */
.m-timeline--right .m-timeline-item,
.m-timeline--alternating .m-timeline-item:nth-child(even) {
  padding-right: 20px;
  padding-left: 0;
}

.m-timeline--right .m-timeline-item__tail,
.m-timeline--alternating .m-timeline-item:nth-child(even) .m-timeline-item__tail {
  right: 4px;
  left: auto;
}

.m-timeline--right .m-timeline-item__node,
.m-timeline--alternating .m-timeline-item:nth-child(even) .m-timeline-item__node {
  right: 0;
  left: auto;
}

.m-timeline--right .m-timeline-item__wrapper,
.m-timeline--alternating .m-timeline-item:nth-child(even) .m-timeline-item__wrapper {
  padding-right: 12px;
  padding-left: 0;
  text-align: right;
}
</style>
