<template>
  <div class="m-page-header">
    <div class="m-page-header__left" @click="handleBack">
      <span class="m-page-header__arrow">&#8592;</span>
      <span class="m-page-header__title">{{ title }}</span>
    </div>
    <div class="m-page-header__content">
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MPageHeader' })

const props = withDefaults(defineProps<{
  title?: string    // 标题文字
  content?: string  // 内容文字
}>(), {
  title: '返回',
  content: '',
})

const emit = defineEmits<{
  back: []  // 点击返回按钮时触发
}>()

function handleBack() {
  emit('back')
}
</script>

<style lang="scss">
.m-page-header {
  display: flex;
  align-items: center;
  padding: 16px 0;
  font-size: var(--mosaic-font-size);
  color: var(--mosaic-text-primary);
  line-height: 1;

  &__left {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    margin-right: 16px;
    transition: color var(--mosaic-transition-duration-fast);
    color: var(--mosaic-text-regular);

    &:hover {
      color: var(--mosaic-primary);

      .m-page-header__title {
        color: var(--mosaic-primary);
      }
    }
  }

  &__arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    font-size: var(--mosaic-font-size-lg);
    font-weight: 600;
  }

  &__title {
    font-size: var(--mosaic-font-size);
    font-weight: 500;
    color: var(--mosaic-text-regular);
  }

  &__content {
    flex: 1;
    font-size: var(--mosaic-font-size-lg);
    font-weight: 500;
    color: var(--mosaic-text-primary);
    padding-left: 16px;
    border-left: 1px solid var(--mosaic-border-color-light);
  }
}
</style>