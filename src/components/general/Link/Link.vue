<template>
  <a
    :class="classes"
    :style="style"
    :href="disabled ? undefined : href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
    @click="handleClick"
  >
    <span class="m-link__text">
      <slot />
    </span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MLink' })

type LinkType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

const props = withDefaults(defineProps<{
  type?: LinkType          // 链接类型，决定颜色风格
  underline?: boolean     // 是否显示下划线
  disabled?: boolean       // 是否禁用
  href?: string            // 链接地址
  color?: string           // 自定义链接颜色
}>(), {
  type: 'default',
  underline: true,
  disabled: false,
  href: '',
  color: '',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const classes = computed(() => [
  'm-link',
  `m-link--${props.type}`,
  {
    'm-link--underline': props.underline,
    'm-link--disabled': props.disabled,
    'm-link--custom-color': !!props.color,
  },
])

const style = computed(() => {
  if (!props.color) return null
  return { color: props.color } as Record<string, string>
})

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<style lang="scss">
.m-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  font-size: var(--mosaic-font-size);
  color: var(--mosaic-text-regular);
  transition: color var(--mosaic-transition-duration-fast);
  outline: none;
  gap: 4px;

  &__text {
    line-height: 1;
  }

  &--default {
    &:hover {
      color: var(--mosaic-primary);
    }

    &.m-link--underline:hover {
      text-decoration: underline;
    }
  }

  &--primary {
    color: var(--mosaic-primary);

    &:hover {
      color: var(--mosaic-primary-dark);
    }

    &.m-link--underline:hover {
      text-decoration: underline;
    }
  }

  &--success {
    color: var(--mosaic-success);

    &:hover {
      color: #5daf34;
    }

    &.m-link--underline:hover {
      text-decoration: underline;
    }
  }

  &--warning {
    color: var(--mosaic-warning);

    &:hover {
      color: #cf8e24;
    }

    &.m-link--underline:hover {
      text-decoration: underline;
    }
  }

  &--danger {
    color: var(--mosaic-danger);

    &:hover {
      color: #dd5a5a;
    }

    &.m-link--underline:hover {
      text-decoration: underline;
    }
  }

  &--info {
    color: var(--mosaic-info);

    &:hover {
      color: #7e8c9e;
    }

    &.m-link--underline:hover {
      text-decoration: underline;
    }
  }

  &--disabled {
    color: var(--mosaic-disabled-text-color);
    cursor: not-allowed;

    &:hover {
      color: var(--mosaic-disabled-text-color);
    }

    &.m-link--underline:hover {
      text-decoration: none;
    }
  }

  &--custom-color:not(.m-link--disabled) {
    &:hover {
      filter: brightness(0.85);
    }

    &.m-link--underline:hover {
      text-decoration: underline;
    }
  }
}
</style>
