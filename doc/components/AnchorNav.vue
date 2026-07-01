<template>
  <aside v-if="anchors.length" class="anchor-nav">
    <div class="anchor-nav__title">快速导航</div>
    <nav class="anchor-nav__list">
      <a
        v-for="item in anchors"
        :key="item.id"
        :class="['anchor-nav__link', { 'anchor-nav__link--active': activeId === item.id }]"
        @click.prevent="scrollTo(item.id)"
      >
        {{ item.label }}
      </a>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

interface AnchorItem {
  id: string    // 对应页面中元素的 id，用于定位和观察
  label: string // 导航项显示文本
}

const props = defineProps<{
  anchors: AnchorItem[] // 当前页面的导航项列表
}>()

const route = useRoute()
const activeId = ref('')

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeId.value = id
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-80px 0px -60% 0px' }
  )
  props.anchors.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) observer!.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

watch(route, () => {
  activeId.value = ''
  observer?.disconnect()
  setTimeout(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    )
    props.anchors.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer!.observe(el)
    })
  }, 100)
})
</script>

<style lang="scss">
.anchor-nav {
  position: fixed;
  top: 72px;
  right: 24px;
  width: 160px;
  max-height: calc(100vh - 88px);
  overflow-y: auto;

  &__title {
    font-size: 12px;
    color: var(--mosaic-text-secondary);
    font-weight: 600;
    margin-bottom: 8px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__link {
    display: block;
    padding: 4px 8px;
    font-size: 13px;
    color: var(--mosaic-text-secondary);
    text-decoration: none;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
    border-left: 2px solid transparent;

    &:hover {
      color: var(--mosaic-primary);
    }

    &--active {
      color: var(--mosaic-primary);
      border-left-color: var(--mosaic-primary);
      font-weight: 500;
    }
  }

  @media (max-width: 1200px) {
    & {
      display: none;
    }
  }
}
</style>