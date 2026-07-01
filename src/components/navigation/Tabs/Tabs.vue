<template>
  <div :class="classes" :style="rootStyle">
    <div :class="['m-tabs__header', `m-tabs__header--${tabPosition}`]" ref="headerRef">
      <div class="m-tabs__nav-wrap" :class="{ 'm-tabs__nav-wrap--center': center }">
        <div class="m-tabs__nav-scroll">
          <div class="m-tabs__nav">
            <!-- segment 类型的滑块 -->
            <div
              v-if="type === 'segment'"
              class="m-tabs__segment-slider"
              :style="activeBarStyle"
            />
            <div
              v-for="pane in panes"
              :key="pane.name"
              :class="[
                'm-tabs__item',
                {
                  'm-tabs__item--active': pane.name === activeName,
                  'm-tabs__item--disabled': pane.disabled,
                  'm-tabs__item--closable': pane.closable || closable || editable,
                },
              ]"
              @click="handleTabClick(pane)"
              @mouseenter="handleTabHover(pane)"
            >
              <span class="m-tabs__item-label">{{ pane.label }}</span>
              <span
                v-if="pane.closable || closable || editable"
                class="m-tabs__item-close"
                @click.stop="handleTabRemove(pane)"
              >
                &times;
              </span>
            </div>
          </div>
        </div>
        <div
          v-if="type === 'line'"
          class="m-tabs__active-bar"
          :style="activeBarStyle"
        />
      </div>
      <span
        v-if="addable && type === 'card'"
        class="m-tabs__nav-add"
        @click="handleTabAdd"
      >
        +
      </span>
    </div>
    <div class="m-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch, onMounted, nextTick, type Ref } from 'vue'

defineOptions({ name: 'MTabs' })

type TabType = 'line' | 'card' | 'segment'
type TabPosition = 'top' | 'right' | 'bottom' | 'left'
type TabTrigger = 'click' | 'hover'

interface TabPaneData {
  label: string
  name: string | number
  disabled: boolean
  closable: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: string | number   // 当前激活的标签页名称，支持 v-model
  type?: TabType                 // 标签页类型风格
  closable?: boolean             // 标签是否可关闭
  addable?: boolean              // 标签是否可新增（仅 card 类型生效）
  editable?: boolean             // 标签是否同时可新增和关闭
  tabPosition?: TabPosition      // 标签页位置
  beforeLeave?: (newName: string | number, oldName: string | number) => boolean | Promise<boolean>  // 切换标签前的钩子函数
  stretch?: boolean              // 标签是否自适应宽度
  color?: string                 // 选中态颜色
  cardColor?: string             // 卡片头部背景颜色（card / segment 类型生效）
  center?: boolean               // 标签是否水平居中容器
  trigger?: TabTrigger           // 标签页触发方式
}>(), {
  modelValue: '',
  type: 'line',
  closable: false,
  addable: false,
  editable: false,
  tabPosition: 'top',
  stretch: false,
  color: '',
  cardColor: '',
  center: false,
  trigger: 'click',
})

const emit = defineEmits([
  'update:modelValue',
  'tab-click',
  'tab-remove',
  'tab-add',
  'edit',
])

const activeName = ref<string | number>(props.modelValue)
const panes = ref<TabPaneData[]>([])
const activeBarStyle = ref<Record<string, string>>({})
const headerRef = ref<HTMLElement | null>(null)

const classes = computed(() => [
  'm-tabs',
  `m-tabs--${props.type}`,
  `m-tabs--${props.tabPosition}`,
  {
    'm-tabs--stretch': props.stretch,
    'm-tabs--center': props.center,
  },
])

const rootStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style['--m-tabs-color'] = props.color
  }
  if (props.cardColor) {
    style['--m-tabs-card-color'] = props.cardColor
  }
  return style
})

watch(() => props.modelValue, (val) => {
  activeName.value = val
})

watch(activeName, () => {
  updateActiveBar()
})

watch(panes, () => {
  updateActiveBar()
}, { deep: true })

provide('mTabs', {
  activeName,
  type: () => props.type,
  closable: () => props.closable || props.editable,
  tabPosition: () => props.tabPosition,
  registerPane: (pane: TabPaneData) => {
    panes.value.push(pane)
  },
  unregisterPane: (pane: TabPaneData) => {
    const idx = panes.value.findIndex(p => p.name === pane.name)
    if (idx !== -1) panes.value.splice(idx, 1)
  },
})

function handleTabClick(pane: TabPaneData) {
  if (pane.disabled) return
  trySwitch(pane.name)
}

function handleTabHover(pane: TabPaneData) {
  if (props.trigger !== 'hover') return
  if (pane.disabled) return
  trySwitch(pane.name)
}

function trySwitch(newName: string | number) {
  if (newName === activeName.value) return
  if (props.beforeLeave) {
    const result = props.beforeLeave(newName, activeName.value)
    if (result === false) return
    if (result instanceof Promise) {
      result.then((ok) => {
        if (ok !== false) switchTab(newName)
      })
      return
    }
  }
  switchTab(newName)
}

function switchTab(name: string | number) {
  activeName.value = name
  emit('update:modelValue', name)
  emit('tab-click', name, new Event('click'))
}

function handleTabRemove(pane: TabPaneData) {
  const name = pane.name
  emit('tab-remove', name)
  emit('edit', name, 'remove')
}

function handleTabAdd() {
  emit('tab-add')
  emit('edit', '', 'add')
}

function updateActiveBar() {
  nextTick(() => {
    const headerEl = headerRef.value
    if (!headerEl) return
    if (props.type !== 'line' && props.type !== 'segment') return
    const items = headerEl.querySelectorAll('.m-tabs__item')
    const activeIdx = panes.value.findIndex((p) => p.name === activeName.value)
    if (activeIdx < 0 || !items[activeIdx]) {
      activeBarStyle.value = { width: '0', transform: 'translateX(0)' }
      return
    }
    const activeItem = items[activeIdx] as HTMLElement
    const navWrap = headerEl.querySelector('.m-tabs__nav-wrap') as HTMLElement
    if (props.tabPosition === 'top' || props.tabPosition === 'bottom') {
      const wrapRect = navWrap.getBoundingClientRect()
      const itemRect = activeItem.getBoundingClientRect()
      const offset = itemRect.left - wrapRect.left
      activeBarStyle.value = {
        width: `${activeItem.offsetWidth}px`,
        transform: `translateX(${offset}px)`,
      }
    } else {
      const wrapRect = navWrap.getBoundingClientRect()
      const itemRect = activeItem.getBoundingClientRect()
      const offset = itemRect.top - wrapRect.top
      activeBarStyle.value = {
        height: `${activeItem.offsetHeight}px`,
        transform: `translateY(${offset}px)`,
      }
    }
  })
}

onMounted(() => {
  updateActiveBar()
})
</script>

<style lang="scss">
.m-tabs {
  width: 100%;

  &--top,
  &--bottom {
    display: flex;
    flex-direction: column;
  }

  &--right {
    display: flex;
    flex-direction: row;
  }

  &--left {
    display: flex;
    flex-direction: row-reverse;
  }

  &__header {
    display: flex;
    align-items: center;
    position: relative;
    padding: 0;
    margin: 0;

    &--top {
      border-bottom: 2px solid var(--mosaic-border-color-light);
    }

    &--bottom {
      border-top: 2px solid var(--mosaic-border-color-light);
      order: 1;
    }

    &--right,
    &--left {
      flex-direction: column;
      border-right: 2px solid var(--mosaic-border-color-light);
    }

    &--left {
      border-right: 2px solid var(--mosaic-border-color-light);
    }

    &--right {
      border-right: none;
      border-left: 2px solid var(--mosaic-border-color-light);
    }
  }

  &__nav-wrap {
    overflow: visible;
    position: relative;
    flex: 1;

    &--center {
      display: flex;
      justify-content: center;
    }
  }

  &__nav-scroll {
    overflow: hidden;
  }

  &__nav {
    display: flex;
    position: relative;
    float: left;
    white-space: nowrap;
    transition: transform var(--mosaic-transition-duration);
  }

  &--right &__nav,
  &--left &__nav {
    flex-direction: column;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-regular);
    cursor: pointer;
    position: relative;
    transition: color var(--mosaic-transition-duration-fast);
    box-sizing: border-box;

    &:hover {
      color: var(--m-tabs-color, var(--mosaic-primary));
    }

    &--active {
      color: var(--m-tabs-color, var(--mosaic-primary));
      font-weight: 500;
    }

    &--disabled {
      color: var(--mosaic-disabled-text-color);
      cursor: not-allowed;

      &:hover {
        color: var(--mosaic-disabled-text-color);
      }
    }
  }

  &--stretch &__item {
    flex: 1;
    text-align: center;
  }

  &__item-label {
    display: inline-block;
  }

  &__item-close {
    position: absolute;
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
    transition: all var(--mosaic-transition-duration-fast);

    &:hover {
      background-color: var(--mosaic-text-secondary);
      color: #fff;
    }
  }

  &__nav-add {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: 12px;
    margin-left: 10px;
    cursor: pointer;
    border: 1px solid var(--mosaic-border-color);
    border-radius: 3px;
    color: var(--mosaic-text-regular);
    transition: all var(--mosaic-transition-duration-fast);

    &:hover {
      color: var(--mosaic-primary);
      border-color: var(--mosaic-primary);
    }
  }

  &__active-bar {
    position: absolute;
    bottom: -2px;
    left: 0;
    height: 2px;
    background-color: var(--m-tabs-color, var(--mosaic-primary));
    transition: transform var(--mosaic-transition-duration-fast) cubic-bezier(0.645, 0.045, 0.355, 1),
                width var(--mosaic-transition-duration-fast) cubic-bezier(0.645, 0.045, 0.355, 1),
                height var(--mosaic-transition-duration-fast) cubic-bezier(0.645, 0.045, 0.355, 1);
    z-index: 1;
  }

  &--bottom &__active-bar {
    top: -2px;
    bottom: auto;
  }

  &--right &__active-bar,
  &--left &__active-bar {
    width: 2px;
    height: auto;
    top: 0;
    bottom: auto;
  }

  &--left &__active-bar {
    left: auto;
    right: -2px;
  }

  &--right &__active-bar {
    left: -2px;
  }

  &__content {
    flex: 1;
    overflow: hidden;
  }

  /* === card type === */
  &--card {
    border: 1px solid var(--mosaic-border-color-light);
    border-radius: var(--mosaic-border-radius);
    overflow: hidden;
  }

  &--card > &__header--top {
    border-bottom: none;
    background-color: var(--m-tabs-card-color, var(--mosaic-fill-color-light));
  }

  &--card &__item {
    border: none;
    border-radius: var(--mosaic-border-radius) var(--mosaic-border-radius) 0 0;
    margin-left: 0;
    background-color: transparent;
    transition: color var(--mosaic-transition-duration-fast), background-color var(--mosaic-transition-duration-fast);

    &:hover:not(.m-tabs__item--active):not(.m-tabs__item--disabled) {
      background-color: var(--mosaic-fill-color);
    }

    &--active {
      background-color: #fff;
      color: var(--m-tabs-color, var(--mosaic-primary));
      position: relative;
      z-index: 2;

      // 左侧弧形：填充前一个标签的右下角，形成圆角过渡
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: -8px;
        width: 8px;
        height: 8px;
        background-color: #fff;
        border-top-left-radius: 8px;
      }

      // 右侧弧形：填充后一个标签的左下角，形成圆角过渡
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: -8px;
        width: 8px;
        height: 8px;
        background-color: #fff;
        border-top-right-radius: 8px;
      }
    }
  }

  /* === segment type === */
  &--segment {
    .m-tabs__header--top {
      border-bottom: none;
      padding: 4px;
      background-color: var(--m-tabs-card-color, var(--mosaic-fill-color-light));
      border-radius: var(--mosaic-border-radius);
    }

    .m-tabs__nav-wrap {
      overflow: hidden;
      border-radius: var(--mosaic-border-radius);
    }

    .m-tabs__nav {
      float: none;
      display: flex;
      width: 100%;
    }

    .m-tabs__item {
      flex: 1;
      height: 32px;
      line-height: 32px;
      padding: 0 12px;
      z-index: 1;
      transition: color var(--mosaic-transition-duration-fast);

      &--active {
        color: var(--m-tabs-color, var(--mosaic-primary));
        font-weight: 500;
      }
    }
  }

  &__segment-slider {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #fff;
    border-radius: calc(var(--mosaic-border-radius) - 1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: transform var(--mosaic-transition-duration-fast) cubic-bezier(0.645, 0.045, 0.355, 1),
                width var(--mosaic-transition-duration-fast) cubic-bezier(0.645, 0.045, 0.355, 1);
    z-index: 0;
  }
}
</style>