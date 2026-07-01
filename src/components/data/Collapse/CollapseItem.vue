<template>
  <div :class="classes">
    <div class="m-collapse-item__header" :class="{ 'm-collapse-item__header--disabled': disabled }" @click="handleClick">
      <span class="m-collapse-item__title">{{ title }}</span>
      <svg
        class="m-collapse-item__arrow"
        :class="{ 'm-collapse-item__arrow--active': isActive }"
        viewBox="0 0 24 24"
        width="14"
        height="14"
      >
        <path d="M10 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div class="m-collapse-item__wrapper" :class="{ 'm-collapse-item__wrapper--active': isActive }">
      <div class="m-collapse-item__content">
        <div class="m-collapse-item__content-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

defineOptions({ name: 'MCollapseItem' })

const props = withDefaults(defineProps<{
  title?: string                              // 面板标题
  name?: string | number                      // 面板唯一标识
  disabled?: boolean                          // 是否禁用
}>(), {
  title: '',
  name: '',
  disabled: false,
})

const mCollapse = inject<{
  activeNames: { value: any[] }
  accordion: { value: boolean }
  handleItemClick: (name: string | number) => void
}>('mCollapse', {
  activeNames: { value: [] },
  accordion: { value: false },
  handleItemClick: () => {},
})

const isActive = computed(() => mCollapse.activeNames.value.includes(props.name))

const classes = computed(() => [
  'm-collapse-item',
  {
    'm-collapse-item--active': isActive.value,
  },
])

const handleClick = () => {
  if (props.disabled) return
  mCollapse.handleItemClick(props.name)
}
</script>

<style lang="scss">
.m-collapse-item {
  border-bottom: 1px solid var(--mosaic-border-color);

  &:last-child {
    border-bottom: none;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    font-size: var(--mosaic-font-size);
    font-weight: 600;
    color: var(--mosaic-text-primary);
    cursor: pointer;
    transition: color var(--mosaic-transition-duration-fast) ease;
    line-height: 1.6;

    &:hover {
      color: var(--mosaic-primary);
    }

    &--disabled {
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;

      &:hover {
        color: var(--mosaic-disabled-text-color);
      }
    }
  }

  &__title {
    flex: 1;
  }

  &__arrow {
    color: var(--mosaic-text-secondary);
    transition: transform var(--mosaic-transition-duration) ease;
    transform: rotate(0deg);
    flex-shrink: 0;

    &--active {
      transform: rotate(90deg);
    }
  }

  &__wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--mosaic-transition-duration) ease;

    &--active {
      grid-template-rows: 1fr;
    }
  }

  &__content {
    overflow: hidden;
    min-height: 0;
  }

  &__content-body {
    padding: 12px 0;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-regular);
    line-height: 1.6;
  }
}
</style>
