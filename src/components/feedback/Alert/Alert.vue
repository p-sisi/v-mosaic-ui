<template>
  <Transition name="m-fade-in">
    <div :class="classes" v-show="visible">
      <span v-if="showIcon" class="m-alert__icon">
        <svg v-if="type === 'success'" viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.3 0 19.9 5 25.9 13.3l71.2 98.8 157.2-218c6-8.4 15.7-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/></svg>
        <svg v-else-if="type === 'warning'" viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/></svg>
        <svg v-else-if="type === 'error'" viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 358.5c-1.2-1.5-1.9-3.4-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 463.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130.1 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/></svg>
        <svg v-else viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/></svg>
      </span>
      <div class="m-alert__content">
        <span v-if="title" class="m-alert__title">{{ title }}</span>
        <p v-if="description" class="m-alert__description">{{ description }}</p>
      </div>
      <span v-if="closable" class="m-alert__close" @click="handleClose">
        <template v-if="closeText">{{ closeText }}</template>
        <svg v-else viewBox="0 0 1024 1024" width="12" height="12"><path fill="currentColor" d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg>
      </span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({ name: 'MAlert' })

type AlertType = 'success' | 'warning' | 'error' | 'info'
type AlertEffect = 'light' | 'dark'

const props = withDefaults(defineProps<{
  title?: string             // 标题文本
  description?: string       // 辅助描述文本
  type?: AlertType           // 警告类型，决定颜色风格
  closable?: boolean         // 是否可关闭
  closeText?: string         // 关闭按钮自定义文本
  showIcon?: boolean         // 是否显示类型图标
  center?: boolean           // 是否居中
  effect?: AlertEffect       // 主题样式，light 为浅色背景，dark 为深色背景
}>(), {
  title: '',
  description: '',
  type: 'info',
  closable: true,
  closeText: '',
  showIcon: false,
  center: false,
  effect: 'light',
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(true)

const classes = computed(() => [
  'm-alert',
  `m-alert--${props.type}`,
  `m-alert--${props.effect}`,
  {
    'm-alert--center': props.center,
    'm-alert--with-description': props.description,
  },
])

function handleClose() {
  visible.value = false
  emit('close')
}
</script>

<style lang="scss">
.m-alert {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: var(--mosaic-font-size);
  line-height: 1.6;
  transition: opacity var(--mosaic-transition-duration-fast) ease;

  &--center {
    justify-content: center;

    .m-alert__content {
      flex: none;
      text-align: center;
    }

    .m-alert__icon {
      margin-right: 6px;
    }

    .m-alert__close {
      margin-left: 6px;
    }
  }

  &--with-description {
    align-items: flex-start;

    .m-alert__icon {
      margin-top: 2px;
    }
  }

  /* --- Light effect --- */
  &--light.m-alert--success {
    background-color: rgba(103, 194, 58, 0.1);
    border: 1px solid rgba(103, 194, 58, 0.3);
    color: var(--mosaic-success);
  }
  &--light.m-alert--warning {
    background-color: rgba(230, 162, 60, 0.1);
    border: 1px solid rgba(230, 162, 60, 0.3);
    color: var(--mosaic-warning);
  }
  &--light.m-alert--error {
    background-color: rgba(245, 108, 108, 0.1);
    border: 1px solid rgba(245, 108, 108, 0.3);
    color: var(--mosaic-danger);
  }
  &--light.m-alert--info {
    background-color: rgba(144, 147, 153, 0.1);
    border: 1px solid rgba(144, 147, 153, 0.3);
    color: var(--mosaic-info);
  }

  /* --- Dark effect --- */
  &--dark.m-alert--success {
    background-color: var(--mosaic-success);
    border: 1px solid var(--mosaic-success);
    color: #fff;
  }
  &--dark.m-alert--warning {
    background-color: var(--mosaic-warning);
    border: 1px solid var(--mosaic-warning);
    color: #fff;
  }
  &--dark.m-alert--error {
    background-color: var(--mosaic-danger);
    border: 1px solid var(--mosaic-danger);
    color: #fff;
  }
  &--dark.m-alert--info {
    background-color: var(--mosaic-info);
    border: 1px solid var(--mosaic-info);
    color: #fff;
  }

  &__icon {
    flex-shrink: 0;
    margin-right: 8px;
    display: flex;
    align-items: center;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-weight: 600;
    font-size: var(--mosaic-font-size);
    line-height: 1.6;
  }

  &__description {
    margin: 4px 0 0;
    font-size: var(--mosaic-font-size-sm);
    line-height: 1.5;
  }

  &__close {
    flex-shrink: 0;
    margin-left: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    opacity: 0.6;
    transition: opacity var(--mosaic-transition-duration-fast);

    &:hover {
      opacity: 1;
    }
  }
}
</style>
