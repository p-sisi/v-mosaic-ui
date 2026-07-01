<template>
  <li :class="classes">
    <div
      ref="titleRef"
      class="m-submenu__title"
      :style="titleStyle"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleTitleClick"
    >
      <span class="m-submenu__title-text">
        <slot name="title" />
      </span>
      <span v-if="!isCollapse" class="m-submenu__icon-arrow">&#9662;</span>
    </div>
    <!-- Vertical inline mode -->
    <Transition v-if="!isPopup" :name="transitionName">
      <ul
        v-show="opened"
        class="m-submenu__menu"
        @mouseenter="handleMenuMouseEnter"
        @mouseleave="handleMenuMouseLeave"
      >
        <slot />
      </ul>
    </Transition>
    <!-- Horizontal/collapse popup mode -->
    <Teleport v-else to="body">
      <Transition name="m-zoom-in-top">
        <ul
          v-show="opened"
          class="m-submenu__menu m-submenu__menu--popup"
          :class="{ 'm-submenu__menu--collapse-popup': isCollapse }"
          :style="popupStyle"
          @mouseenter="handleMenuMouseEnter"
          @mouseleave="handleMenuMouseLeave"
        >
          <slot />
        </ul>
      </Transition>
    </Teleport>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch, onMounted, onUnmounted, nextTick, type Ref } from 'vue'
import { useZIndex } from '../../../hooks/useZIndex'

defineOptions({ name: 'MSubmenu' })

const props = withDefaults(defineProps<{
  index?: string             // 唯一标识
  popperClass?: string       // 弹出菜单的自定义类名
  showTimeout?: number       // 展开 sub-menu 的延迟（horizontal 模式下）
  hideTimeout?: number       // 收起 sub-menu 的延迟（horizontal 模式下）
  disabled?: boolean         // 是否禁用
}>(), {
  index: '',
  popperClass: '',
  showTimeout: 300,
  hideTimeout: 300,
  disabled: false,
})

const menu = inject<{
  activeIndex: Ref<string>;
  openedMenus: Ref<string[]>;
  mode: () => string;
  collapse: () => boolean;
  backgroundColor: () => string;
  textColor: () => string;
  activeTextColor: () => string;
  color: () => string;
  uniqueOpened: () => boolean;
  router: () => boolean;
  collapseTransition: () => boolean;
  items: Ref<Map<string, any>>;
  submenus: Ref<Map<string, any>>;
  handleSelect: (index: string, indexPath: string[], item: any) => void;
  handleOpen: (index: string, indexPath: string[]) => void;
  handleClose: (index: string, indexPath: string[]) => void;
  openMenu: (index: string) => void;
  closeMenu: (index: string) => void;
  addItem: (item: any) => void;
  removeItem: (item: any) => void;
  addSubmenu: (submenu: any) => void;
  removeSubmenu: (submenu: any) => void;
}>('mMenu', {
  activeIndex: ref(''),
  openedMenus: ref([]),
  mode: () => 'vertical',
  collapse: () => false,
  backgroundColor: () => '',
  textColor: () => '',
  activeTextColor: () => '',
  color: () => '',
  uniqueOpened: () => false,
  router: () => false,
  collapseTransition: () => true,
  items: ref(new Map()),
  submenus: ref(new Map()),
  handleSelect: () => {},
  handleOpen: () => {},
  handleClose: () => {},
  openMenu: () => {},
  closeMenu: () => {},
  addItem: () => {},
  removeItem: () => {},
  addSubmenu: () => {},
  removeSubmenu: () => {},
})

const { nextZIndex } = useZIndex()

const titleRef = ref<HTMLElement | null>(null)
const popupStyle = ref<Record<string, string>>({})

const opened = computed(() => menu.openedMenus.value.includes(props.index))
const isPopup = computed(() => menu.mode() === 'horizontal' || menu.collapse())
const isCollapse = computed(() => menu.collapse())

const classes = computed(() => [
  'm-submenu',
  {
    'm-submenu--active': opened.value,
    'm-submenu--disabled': props.disabled,
  },
])

const titleStyle = computed(() => {
  const style: Record<string, string> = {}
  if (menu.textColor()) style.color = menu.textColor()
  return style
})

const transitionName = computed(() =>
  menu.collapseTransition() ? 'm-collapse' : ''
)

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

function updatePopupPosition() {
  if (!titleRef.value || !opened.value) return
  const rect = titleRef.value.getBoundingClientRect()
  if (isCollapse.value) {
    popupStyle.value = {
      position: 'absolute',
      top: `${rect.top + window.scrollY}px`,
      left: `${rect.right + window.scrollX}px`,
      zIndex: String(nextZIndex()),
    }
  } else {
    popupStyle.value = {
      position: 'absolute',
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.left + window.scrollX}px`,
      zIndex: String(nextZIndex()),
    }
  }
}

watch(opened, (val) => {
  if (val && isPopup.value) {
    nextTick(updatePopupPosition)
  }
})

function handleTitleClick() {
  if (props.disabled) return
  if (isPopup.value) return // popup modes use hover
  if (opened.value) {
    menu.closeMenu(props.index)
    menu.handleClose(props.index, [props.index])
  } else {
    menu.openMenu(props.index)
    menu.handleOpen(props.index, [props.index])
  }
}

function handleMouseEnter() {
  if (props.disabled) return
  if (!isPopup.value) return
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
  showTimer = setTimeout(() => {
    menu.openMenu(props.index)
    menu.handleOpen(props.index, [props.index])
  }, props.showTimeout)
}

function handleMouseLeave() {
  if (!isPopup.value) return
  if (showTimer) { clearTimeout(showTimer); showTimer = null }
  hideTimer = setTimeout(() => {
    menu.closeMenu(props.index)
    menu.handleClose(props.index, [props.index])
  }, props.hideTimeout)
}

function handleMenuMouseEnter() {
  if (!isPopup.value) return
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
}

function handleMenuMouseLeave() {
  if (!isPopup.value) return
  hideTimer = setTimeout(() => {
    menu.closeMenu(props.index)
    menu.handleClose(props.index, [props.index])
  }, props.hideTimeout)
}

onMounted(() => {
  menu.addSubmenu({ index: props.index, disabled: props.disabled })
})

onUnmounted(() => {
  menu.removeSubmenu({ index: props.index })
  if (showTimer) clearTimeout(showTimer)
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<style lang="scss">
.m-submenu {
  list-style: none;
  position: relative;

  &__title {
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    font-size: var(--mosaic-font-size);
    color: var(--mosaic-text-primary);
    cursor: pointer;
    transition: color var(--mosaic-transition-duration-fast), background-color var(--mosaic-transition-duration-fast);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;

    &:hover {
      background-color: var(--mosaic-fill-color-light);
      color: var(--m-menu-color, var(--mosaic-primary));
    }
  }

  &__title-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__icon-arrow {
    margin-left: 8px;
    font-size: 12px;
    transition: transform var(--mosaic-transition-duration-fast);
  }

  &--active > .m-submenu__title .m-submenu__icon-arrow {
    transform: rotate(180deg);
  }

  &--disabled .m-submenu__title {
    color: var(--mosaic-disabled-text-color);
    cursor: not-allowed;

    &:hover {
      background: none;
      color: var(--mosaic-disabled-text-color);
    }
  }

  /* Popup mode (horizontal + collapse) */
  &__menu--popup {
    min-width: 200px;
    padding: 6px 0;
    margin: 0;
    list-style: none;
    background-color: #fff;
    border: 1px solid var(--mosaic-border-color-light);
    border-radius: var(--mosaic-border-radius);
    box-shadow: var(--mosaic-box-shadow-base);
  }

  &__menu--collapse-popup {
    min-width: 180px;
  }
}

/* Vertical mode: nested inline with indent */
.m-menu--vertical .m-submenu__menu {
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
  padding-left: 20px;
}
</style>
