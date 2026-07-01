<template>
  <span :class="classes" :style="customStyle">
    <img
      v-if="src && !hasLoadError"
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      class="m-avatar__bg"
      aria-hidden="true"
      @error="handleError"
    />
    <img
      v-if="src && !hasLoadError"
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      :style="{ objectFit: fit }"
      class="m-avatar__image"
      @error="handleError"
    />
    <slot v-else />
    <div v-if="$slots.mask" class="m-avatar__mask">
      <slot name="mask" />
    </div>
  </span>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

defineOptions({ name: 'MAvatar' })

type AvatarSize = number | 'large' | 'default' | 'small'
type AvatarShape = 'circle' | 'square'
type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'

const props = withDefaults(defineProps<{
  size?: AvatarSize         // 头像尺寸，数字为像素，字符串为预设大小
  shape?: AvatarShape       // 头像形状，圆形或方形
  src?: string              // 图片资源地址
  alt?: string              // 图片替代文本
  srcSet?: string            // 图片 srcset 属性
  fit?: ObjectFit           // 图片填充模式
}>(), {
  size: 'default',
  shape: 'circle',
  src: '',
  alt: '',
  srcSet: '',
  fit: 'cover',
})

const emit = defineEmits<{
  error: [event: Event]
}>()

const slots = useSlots()
const hasLoadError = ref(false)

const sizeMap: Record<string, string> = {
  large: '40px',
  default: '32px',
  small: '24px',
}

const classes = computed(() => [
  'm-avatar',
  `m-avatar--${props.shape}`,
])

const customStyle = computed(() => {
  const style: Record<string, string> = {}
  const sizeValue = typeof props.size === 'number'
    ? `${props.size}px`
    : sizeMap[props.size]
  style.width = sizeValue
  style.height = sizeValue
  style.lineHeight = sizeValue
  return style
})

function handleError(event: Event) {
  hasLoadError.value = true
  emit('error', event)
}
</script>

<style lang="scss">
.m-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  font-size: var(--mosaic-font-size);
  color: var(--mosaic-text-regular);
  background-color: var(--mosaic-fill-color-light);
  box-sizing: border-box;
  text-align: center;
  white-space: nowrap;

  &--circle {
    border-radius: 50%;
  }

  &--square {
    border-radius: 4px;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(8px);
    transform: scale(1.2);
    z-index: 0;
  }

  &__image {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 1;
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 0.5em;
    z-index: 2;
  }
}
</style>
