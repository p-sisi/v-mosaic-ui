<template>
  <div v-if="direction === 'horizontal'" :class="classes">
    <div v-if="$slots.default" :class="['m-divider__text', `m-divider__text--${contentPosition}`]">
      <slot />
    </div>
  </div>
  <span v-else :class="classes" />
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

defineOptions({ name: 'MDivider' })

type DividerDirection = 'horizontal' | 'vertical'
type ContentPosition = 'left' | 'center' | 'right'

const props = withDefaults(defineProps<{
  direction?: DividerDirection      // 分割线方向
  contentPosition?: ContentPosition // 文本内容位置
  dashed?: boolean                  // 是否为虚线
}>(), {
  direction: 'horizontal',
  contentPosition: 'center',
  dashed: false,
})

const slots = useSlots()

const classes = computed(() => [
  'm-divider',
  `m-divider--${props.direction}`,
  {
    'm-divider--dashed': props.dashed,
    'm-divider--with-text': !!slots.default,
    'm-divider--content-left': !!slots.default && props.contentPosition === 'left',
    'm-divider--content-right': !!slots.default && props.contentPosition === 'right',
  },
])
</script>

<style lang="scss">
.m-divider {
  --m-divider-text-color: var(--mosaic-text-regular);
  --m-divider-border-color: var(--mosaic-border-color);

  &--horizontal {
    display: flex;
    align-items: center;
    margin: 16px 0;
    border-top: 1px solid var(--m-divider-border-color);
    position: relative;

    &.m-divider--dashed {
      border-top-style: dashed;
    }

    &.m-divider--with-text {
      border-top: none;

      &::before,
      &::after {
        content: '';
        flex: 1;
        border-top: 1px solid var(--m-divider-border-color);
      }
    }

    &.m-divider--dashed.m-divider--with-text {
      &::before,
      &::after {
        border-top-style: dashed;
      }
    }

    &.m-divider--content-left.m-divider--with-text::before {
      flex: 0 0 5%;
      min-width: 20px;
    }

    &.m-divider--content-right.m-divider--with-text::after {
      flex: 0 0 5%;
      min-width: 20px;
    }
  }

  &__text {
    font-size: var(--mosaic-font-size);
    color: var(--m-divider-text-color);
    padding: 0 16px;
    white-space: nowrap;
  }

  &--vertical {
    display: inline-block;
    width: 1px;
    height: 0.9em;
    margin: 0 8px;
    border-left: 1px solid var(--m-divider-border-color);
    vertical-align: middle;

    &.m-divider--dashed {
      border-left-style: dashed;
    }
  }
}
</style>
