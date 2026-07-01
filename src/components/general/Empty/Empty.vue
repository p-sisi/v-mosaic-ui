<template>
  <div class="m-empty">
    <div class="m-empty__image" :style="imageStyle">
      <img v-if="image" :src="image" class="m-empty__image-img" />
      <svg v-else class="m-empty__image-svg" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M855.6 840H168.4c-39 0-70.8-31.8-70.8-70.8V254.8c0-39 31.8-70.8 70.8-70.8h687.2c39 0 70.8 31.8 70.8 70.8v514.4c0 39-31.8 70.8-70.8 70.8zM168.4 224c-17 0-30.8 13.8-30.8 30.8v514.4c0 17 13.8 30.8 30.8 30.8h687.2c17 0 30.8-13.8 30.8-30.8V254.8c0-17-13.8-30.8-30.8-30.8H168.4z" fill="currentColor" />
        <path d="M507.2 400c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9zm0 56c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9zm-72 0c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9zm144 0c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z" fill="currentColor" />
        <path d="M688 612H336c-11 0-20-9-20-20s9-20 20-20h352c11 0 20 9 20 20s-9 20-20 20z" fill="currentColor" />
        <path d="M632 700H392c-11 0-20-9-20-20s9-20 20-20h240c11 0 20 9 20 20s-9 20-20 20z" fill="currentColor" />
      </svg>
    </div>
    <p v-if="description" class="m-empty__description">{{ description }}</p>
    <p v-if="subDescription" class="m-empty__sub-description">{{ subDescription }}</p>
    <div v-if="$slots.default" class="m-empty__bottom">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'MEmpty' })

const props = withDefaults(defineProps<{
  description?: string      // 主标题提示文案
  subDescription?: string  // 次级提示文案
  image?: string        // 自定义图片地址
  imageSize?: number    // 图片大小（像素）
}>(), {
  description: '',
  subDescription: '',
  image: '',
  imageSize: undefined,
})

const imageStyle = computed(() => {
  if (props.imageSize) {
    return { width: `${props.imageSize}px`, height: `${props.imageSize}px` }
  }
  return {}
})
</script>

<style lang="scss">
.m-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;

  &__image {
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__image-svg {
    width: 100%;
    height: 100%;
    color: var(--mosaic-text-placeholder);
  }

  &__description {
    margin-bottom: 0;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
    line-height: 1.5;
    margin-top: 12px;
  }

  &__sub-description {
    margin-top: 4px;
    margin-bottom: 0;
    font-size: var(--mosaic-font-size-sm);
    color: var(--mosaic-text-placeholder);
    line-height: 1.5;
  }

  &__bottom {
    margin-top: 16px;
  }
}
</style>
