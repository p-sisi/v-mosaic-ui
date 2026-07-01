<template>
  <li
    :class="classes"
    :style="itemStyle"
    @click="handleClick"
  >
    <span class="m-menu-item__title">
      <slot />
    </span>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, ref, onMounted, onUnmounted, type Ref } from 'vue'

defineOptions({ name: 'MMenuItem' })

const props = withDefaults(defineProps<{
  index?: string             // 唯一标识
  route?: string | object    // Vue Router 路由路径
  disabled?: boolean         // 是否禁用
}>(), {
  index: '',
  route: '',
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

const isActive = computed(() => menu.activeIndex.value === props.index)

const classes = computed(() => [
  'm-menu-item',
  {
    'm-menu-item--active': isActive.value,
    'm-menu-item--disabled': props.disabled,
  },
])

const itemStyle = computed(() => {
  const style: Record<string, string> = {}
  if (menu.textColor()) style.color = menu.textColor()
  if (isActive.value && menu.activeTextColor()) style.color = menu.activeTextColor()
  if (menu.color()) style['--m-menu-color'] = menu.color()
  return style
})

function handleClick() {
  if (props.disabled) return
  menu.handleSelect(props.index, [props.index], { index: props.index, route: props.route })

  if (menu.router() && props.route) {
    // Use vue-router navigation if available
    try {
      const router = (window as any).__VUE_ROUTER__
      if (router) {
        router.push(props.route)
      }
    } catch {
      // Router not available
    }
  }
}

onMounted(() => {
  menu.addItem({ index: props.index, disabled: props.disabled })
})

onUnmounted(() => {
  menu.removeItem({ index: props.index })
})
</script>

<style lang="scss">
.m-menu-item {
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  font-size: var(--mosaic-font-size);
  color: var(--mosaic-text-primary);
  cursor: pointer;
  transition: color var(--mosaic-transition-duration-fast), background-color var(--mosaic-transition-duration-fast);
  list-style: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;

  &:hover,
  &:focus {
    background-color: var(--mosaic-fill-color-light);
    color: var(--m-menu-color, var(--mosaic-primary));
    outline: none;
  }

  &--active {
    color: var(--m-menu-color, var(--mosaic-primary));
    font-weight: 500;

    &:hover {
      color: var(--m-menu-color, var(--mosaic-primary));
    }
  }

  &--disabled {
    color: var(--mosaic-disabled-text-color);
    cursor: not-allowed;
    background: none !important;

    &:hover {
      color: var(--mosaic-disabled-text-color);
    }
  }

  &__title {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.m-menu--vertical {
  .m-menu-item--active {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: var(--m-menu-color, var(--mosaic-primary));
    }
  }
}
</style>
