<template>
  <div class="m-avatar-group" :style="groupStyle">
    <component
      :is="vnode"
      v-for="(vnode, i) in displayChildren"
      :key="i"
    />
    <MAvatar
      v-if="exceedCount > 0"
      :size="size"
      :shape="shape"
      class="m-avatar--counter"
    >
      <slot name="exceed">+{{ exceedCount }}</slot>
    </MAvatar>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, Comment } from 'vue'
import MAvatar from '../Avatar/Avatar.vue'

defineOptions({ name: 'MAvatarGroup' })

type AvatarSize = number | 'large' | 'default' | 'small'
type AvatarShape = 'circle' | 'square'

const props = withDefaults(defineProps<{
  max?: number              // 最大显示头像数，超出显示 +N
  size?: AvatarSize         // 头像尺寸
  shape?: AvatarShape       // 头像形状
  spacing?: number          // 头像之间的重叠间距(px)，负值重叠
}>(), {
  max: undefined,
  size: 'default',
  shape: 'circle',
  spacing: -8,
})

const slots = useSlots()

const children = computed(() => {
  const vnodes = slots.default?.() ?? []
  return vnodes.filter(v => v.type !== Comment)
})

const displayChildren = computed(() => {
  if (typeof props.max === 'number' && children.value.length > props.max) {
    return children.value.slice(0, props.max)
  }
  return children.value
})

const exceedCount = computed(() => {
  if (typeof props.max === 'number') {
    return Math.max(0, children.value.length - props.max)
  }
  return 0
})

const groupStyle = computed(() => ({
  '--m-avatar-spacing': `${props.spacing}px`,
}))
</script>

<style lang="scss">
.m-avatar-group {
  display: inline-flex;
  align-items: center;

  .m-avatar {
    border: 2px solid var(--mosaic-fill-color-blank, #fff);
    margin-left: var(--m-avatar-spacing, -8px);

    &:first-child {
      margin-left: 0;
    }
  }

  .m-avatar--counter {
    z-index: 1;
    background-color: var(--mosaic-fill-color-light);
    color: var(--mosaic-text-regular);
    font-size: 0.35em;
  }
}
</style>
