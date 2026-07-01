<template>
  <section :class="classes">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

defineOptions({ name: 'MContainer' })

type ContainerDirection = 'horizontal' | 'vertical'

const props = withDefaults(defineProps<{
  direction?: ContainerDirection  // 子元素的布局方向，horizontal 或 vertical
}>(), {
  direction: undefined,
})

const slots = useSlots()

const computedDirection = computed(() => {
  if (props.direction) return props.direction
  // Auto-detect: if has aside child, use horizontal
  if (slots.default) {
    const children = slots.default()
    const hasAside = children.some(
      (vnode) => vnode.type && (vnode.type as any).name === 'MAside'
    )
    return hasAside ? 'horizontal' : 'vertical'
  }
  return 'vertical'
})

const classes = computed(() => [
  'm-container',
  `m-container--${computedDirection.value}`,
])
</script>

<style lang="scss">
.m-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;

  &--horizontal {
    flex-direction: row;
  }
}
</style>