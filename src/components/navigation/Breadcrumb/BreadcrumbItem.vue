<template>
  <span class="m-breadcrumb__item">
    <span v-if="to" class="m-breadcrumb__inner is-link" @click="handleClick">
      <slot />
    </span>
    <span v-else class="m-breadcrumb__inner">
      <slot />
    </span>
    <span class="m-breadcrumb__separator">
      <slot name="separator">
        <i v-if="separatorIcon" :class="separatorIcon" />
        <template v-else>{{ separator }}</template>
      </slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({ name: 'MBreadcrumbItem' })

const props = withDefaults(defineProps<{
  to?: string | object   // 路由跳转目标，支持 vue-router 的 to 格式
  replace?: boolean      // 是否使用 replace 方式跳转
}>(), {
  to: '',
  replace: false,
})

const breadcrumb = inject<{ separator: () => string; separatorIcon: () => string }>('mBreadcrumb', {
  separator: () => '/',
  separatorIcon: () => '',
})

const separator = computed(() => breadcrumb.separator())
const separatorIcon = computed(() => breadcrumb.separatorIcon())

const router = useRouter()

function handleClick() {
  if (!props.to) return
  if (router) {
    props.replace ? router.replace(props.to) : router.push(props.to)
  }
}
</script>

<style lang="scss">
.m-breadcrumb {
  &__item {
    display: inline-flex;
    align-items: center;

    &:last-child {
      .m-breadcrumb__inner {
        color: var(--mosaic-text-primary);
        font-weight: 500;
      }

      .m-breadcrumb__separator {
        display: none;
      }
    }
  }

  &__inner {
    color: var(--mosaic-text-regular);
    transition: color var(--mosaic-transition-duration-fast);

    &.is-link {
      color: var(--mosaic-text-primary);
      font-weight: 500;
      cursor: pointer;

      &:hover {
        color: var(--mosaic-primary);
      }
    }
  }

  &__separator {
    margin: 0 8px;
    color: var(--mosaic-text-placeholder);
    font-size: var(--mosaic-font-size);
  }
}
</style>
