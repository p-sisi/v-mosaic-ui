<template>
  <div class="m-image" :class="{ 'm-image--previewable': previewSrcList.length > 0 }" :style="containerStyle" @click="handlePreview">
    <img
      v-if="!hasError"
      :src="currentSrc"
      :alt="alt"
      class="m-image__bg"
      aria-hidden="true"
      :loading="lazy ? 'lazy' as const : loading"
    />
    <img
      v-if="!hasError"
      :src="currentSrc"
      :alt="alt"
      :style="imgStyle"
      class="m-image__main"
      :loading="lazy ? 'lazy' as const : loading"
      @load="handleLoad"
      @error="handleError"
    />
    <!-- 加载占位 -->
    <div v-if="isLoading && !hasError" class="m-image__placeholder">
      <slot name="placeholder">
        <svg viewBox="0 0 1024 1024" width="32" height="32"><path fill="currentColor" d="M304.3 565.3l89.3-164.5c5.7-10.5 14.3-10.5 20 0L503 565.3c5.7 10.5 2.9 18.7-6.3 18.7H310.6c-9.2 0-12-8.2-6.3-18.7zm232.4-18.7c9.2 0 12-8.2 6.3-18.7l-89.3-164.5c-5.7-10.5-14.3-10.5-20 0l-38.7 71.3 55.2 100.5c5.7 10.5 2.9 18.7-6.3 18.7H536.7z"/><path fill="currentColor" d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136V232h752v560z"/></svg>
      </slot>
    </div>
    <!-- 错误占位 -->
    <div v-if="hasError" class="m-image__error">
      <slot name="error">
        <svg viewBox="0 0 1024 1024" width="32" height="32"><path fill="currentColor" d="M304.3 565.3l89.3-164.5c5.7-10.5 14.3-10.5 20 0L503 565.3c5.7 10.5 2.9 18.7-6.3 18.7H310.6c-9.2 0-12-8.2-6.3-18.7zm232.4-18.7c9.2 0 12-8.2 6.3-18.7l-89.3-164.5c-5.7-10.5-14.3-10.5-20 0l-38.7 71.3 55.2 100.5c5.7 10.5 2.9 18.7-6.3 18.7H536.7z"/><path fill="currentColor" d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136V232h752v560z"/><path fill="currentColor" d="M477.3 608l-68.6-68.6L336 612l71.3 71.3L336 754.6l55.3 55.3L462.6 738l71.3 71.3 55.3-55.3-71.3-71.3 71.3-71.3-55.3-55.3z"/></svg>
      </slot>
    </div>
    <!-- 预览遮罩 -->
    <div v-if="previewSrcList.length > 0 && !isLoading && !hasError" class="m-image__mask">
      <svg viewBox="0 0 1024 1024" width="28" height="28"><path fill="currentColor" d="M621.2 312.6L534.6 399.2c-9.6 9.6-21.6 9.6-31.2 0l-86.6-86.6c-9.6-9.6-9.6-21.6 0-31.2l86.6-86.6c9.6-9.6 21.6-9.6 31.2 0l86.6 86.6c9.6 9.6 9.6 21.6 0 31.2z"/><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm160 464H560v112c0 8.8-7.2 16-16 16h-64c-8.8 0-16-7.2-16-16V528H352c-8.8 0-16-7.2-16-16v-64c0-8.8 7.2-16 16-16h112V320c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16v112h112c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16z"/></svg>
    </div>

    <!-- 预览大图 -->
    <Teleport to="body">
      <transition name="m-image-preview">
        <div v-if="previewVisible" class="m-image-viewer" :style="{ zIndex: zIndex }" @click="closePreview">
          <div class="m-image-viewer__mask"></div>
          <div class="m-image-viewer__btn m-image-viewer__close" @click.stop="closePreview">
            <svg viewBox="0 0 1024 1024" width="24" height="24"><path fill="currentColor" d="M563.8 512l261.9-261.9c14.3-14.3 14.3-37.5 0-51.7-14.3-14.3-37.5-14.3-51.7 0L512 460.3 250.1 198.4c-14.3-14.3-37.5-14.3-51.7 0-14.3 14.3-14.3 37.5 0 51.7L460.3 512 198.4 773.9c-14.3 14.3-14.3 37.5 0 51.7 14.3 14.3 37.5 14.3 51.7 0L512 563.8l261.9 261.9c14.3 14.3 37.5 14.3 51.7 0 14.3-14.3 14.3-37.5 0-51.7L563.8 512z"/></svg>
          </div>
          <div v-if="previewList.length > 1" class="m-image-viewer__btn m-image-viewer__prev" @click.stop="prev">
            <svg viewBox="0 0 1024 1024" width="28" height="28"><path fill="currentColor" d="M685.1 217.9c-12.5-12.5-32.8-12.5-45.3 0L338.9 518.8c-12.5 12.5-12.5 32.8 0 45.3l300.9 300.9c12.5 12.5 32.8 12.5 45.3 0 12.5-12.5 12.5-32.8 0-45.3L406.9 541.5l278.2-278.2c12.5-12.6 12.5-32.9 0-45.4z"/></svg>
          </div>
          <div v-if="previewList.length > 1" class="m-image-viewer__btn m-image-viewer__next" @click.stop="next">
            <svg viewBox="0 0 1024 1024" width="28" height="28"><path fill="currentColor" d="M338.9 217.9c12.5-12.5 32.8-12.5 45.3 0l300.9 300.9c12.5 12.5 12.5 32.8 0 45.3L384.2 805c-12.5 12.5-32.8 12.5-45.3 0-12.5-12.5-12.5-32.8 0-45.3L617.1 541.5 338.9 263.3c-12.5-12.6-12.5-32.9 0-45.4z"/></svg>
          </div>
          <img class="m-image-viewer__img" :src="previewList[currentPreviewIndex]" @click.stop />
          <div v-if="previewList.length > 1" class="m-image-viewer__indicator">
            {{ currentPreviewIndex + 1 }} / {{ previewList.length }}
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'MImage' })

type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
type ImageLoading = 'lazy' | 'eager'

const props = withDefaults(defineProps<{
  src?: string                          // 图片源地址
  alt?: string                          // 原生 alt 属性
  fit?: ImageFit                        // 图片填充模式
  lazy?: boolean                        // 是否懒加载
  previewSrcList?: string[]             // 预览图片列表
  initialIndex?: number                 // 预览初始索引
  zindex?: number                       // 预览层级
  loading?: ImageLoading                // 原生 loading 属性
}>(), {
  src: '',
  alt: '',
  fit: 'fill',
  lazy: false,
  previewSrcList: () => [],
  initialIndex: 0,
  zindex: 2000,
  loading: 'eager',
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

const isLoading = ref(true)
const hasError = ref(false)
const currentSrc = computed(() => props.src)

const imgStyle = computed(() => ({
  objectFit: props.fit,
}))

const containerStyle = computed(() => ({}))

const previewVisible = ref(false)
const currentPreviewIndex = ref(0)
const previewList = computed(() =>
  props.previewSrcList.length > 0 ? props.previewSrcList : (props.src ? [props.src] : [])
)
const zIndex = computed(() => props.zindex)

function handleLoad(event: Event) {
  isLoading.value = false
  hasError.value = false
  emit('load', event)
}

function handleError(event: Event) {
  isLoading.value = false
  hasError.value = true
  emit('error', event)
}

function handlePreview() {
  if (previewList.value.length === 0) return
  currentPreviewIndex.value = Math.min(props.initialIndex, previewList.value.length - 1)
  previewVisible.value = true
}

function closePreview() {
  previewVisible.value = false
}

function prev() {
  currentPreviewIndex.value = (currentPreviewIndex.value - 1 + previewList.value.length) % previewList.value.length
}

function next() {
  currentPreviewIndex.value = (currentPreviewIndex.value + 1) % previewList.value.length
}

function handleKeydown(e: KeyboardEvent) {
  if (!previewVisible.value) return
  if (e.key === 'Escape') closePreview()
  else if (e.key === 'ArrowLeft' && previewList.value.length > 1) prev()
  else if (e.key === 'ArrowRight' && previewList.value.length > 1) next()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

watch(() => props.src, () => {
  isLoading.value = true
  hasError.value = false
})
</script>

<style lang="scss">
.m-image {
  position: relative;
  overflow: hidden;
  display: inline-block;

  img {
    display: block;
    width: 100%;
    height: 100%;
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

  &__main {
    position: relative;
    z-index: 1;
  }

  &--previewable {
    cursor: pointer;

    &:hover .m-image__mask {
      opacity: 1;
    }
  }

  &__placeholder,
  &__error {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--mosaic-fill-color-lighter);
    color: var(--mosaic-text-placeholder);
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
}

/* --- Preview viewer --- */
.m-image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.85);
  }

  &__img {
    position: relative;
    max-width: 80vw;
    max-height: 80vh;
    object-fit: contain;
  }

  &__btn {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.15);
    color: #fff;
    cursor: pointer;
    z-index: 1;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }

  &__close {
    top: 40px;
    right: 40px;
  }

  &__prev {
    left: 40px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__next {
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 14px;
    background-color: rgba(255, 255, 255, 0.15);
    padding: 4px 12px;
    border-radius: 12px;
  }
}

.m-image-preview-enter-active,
.m-image-preview-leave-active {
  transition: opacity 0.2s ease;
}

.m-image-preview-enter-from,
.m-image-preview-leave-to {
  opacity: 0;
}
</style>
