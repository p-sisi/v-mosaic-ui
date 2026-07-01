<template>
  <ul :class="classes" :style="menuStyle">
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'

defineOptions({ name: 'MMenu' })

type MenuMode = 'vertical' | 'horizontal'

const props = withDefaults(defineProps<{
  defaultActive?: string        // 默认激活菜单项的 index
  defaultOpeneds?: string[]     // 默认展开的子菜单数组
  mode?: MenuMode               // 模式：水平或垂直
  collapse?: boolean            // 是否折叠菜单
  backgroundColor?: string      // 菜单背景色
  textColor?: string            // 文字颜色
  activeTextColor?: string      // 激活项文字颜色
  uniqueOpened?: boolean        // 是否只保持一个子菜单展开
  router?: boolean              // 是否使用 vue-router 模式
  collapseTransition?: boolean  // 是否开启折叠过渡动画
  color?: string                // 选中态颜色
}>(), {
  defaultActive: '',
  defaultOpeneds: () => [],
  mode: 'vertical',
  collapse: false,
  backgroundColor: '',
  textColor: '',
  activeTextColor: '',
  uniqueOpened: false,
  router: false,
  collapseTransition: true,
  color: '',
})

const emit = defineEmits<{
  select: [index: string, indexPath: string[], item: any, routeResult?: any]  // 菜单项被点击时触发
  open: [index: string, indexPath: string[]]                                  // 子菜单展开时触发
  close: [index: string, indexPath: string[]]                                 // 子菜单收起时触发
}>()

const activeIndex = ref(props.defaultActive)
const openedMenus = ref<string[]>([...props.defaultOpeneds])
const items = ref<Map<string, any>>(new Map())
const submenus = ref<Map<string, any>>(new Map())

const classes = computed(() => [
  'm-menu',
  `m-menu--${props.mode}`,
  {
    'm-menu--collapse': props.collapse,
  },
])

const menuStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.backgroundColor) style.backgroundColor = props.backgroundColor
  if (props.textColor) style.color = props.textColor
  if (props.color) style['--m-menu-color'] = props.color
  return style
})

function handleSelect(index: string, indexPath: string[], item: any) {
  activeIndex.value = index
  emit('select', index, indexPath, item)
}

function handleOpen(index: string, indexPath: string[]) {
  if (props.uniqueOpened) {
    openedMenus.value = openedMenus.value.filter((i) => indexPath.includes(i))
  }
  if (!openedMenus.value.includes(index)) {
    openedMenus.value.push(index)
  }
  emit('open', index, indexPath)
}

function handleClose(index: string, indexPath: string[]) {
  openedMenus.value = openedMenus.value.filter((i) => i !== index)
  emit('close', index, indexPath)
}

function openMenu(index: string) {
  if (!openedMenus.value.includes(index)) {
    openedMenus.value.push(index)
  }
}

function closeMenu(index: string) {
  openedMenus.value = openedMenus.value.filter((i) => i !== index)
}

provide('mMenu', {
  activeIndex,
  openedMenus,
  mode: () => props.mode,
  collapse: () => props.collapse,
  backgroundColor: () => props.backgroundColor,
  textColor: () => props.textColor,
  activeTextColor: () => props.activeTextColor,
  uniqueOpened: () => props.uniqueOpened,
  router: () => props.router,
  collapseTransition: () => props.collapseTransition,
  color: () => props.color,
  items,
  submenus,
  handleSelect,
  handleOpen,
  handleClose,
  openMenu,
  closeMenu,
  addItem: (item: any) => { items.value.set(item.index, item) },
  removeItem: (item: any) => { items.value.delete(item.index) },
  addSubmenu: (submenu: any) => { submenus.value.set(submenu.index, submenu) },
  removeSubmenu: (submenu: any) => { submenus.value.delete(submenu.index) },
})
</script>

<style lang="scss">
.m-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  border-right: 1px solid var(--mosaic-border-color-light);
  background-color: #fff;
  box-sizing: border-box;
  font-size: var(--mosaic-font-size);
  color: var(--mosaic-text-primary);

  &--vertical {
    width: 240px;
  }

  &--horizontal {
    display: flex;
    flex-direction: row;
    border-right: none;
    border-bottom: 1px solid var(--mosaic-border-color-light);
  }

  &--collapse {
    width: 64px;

    .m-menu-item,
    .m-submenu__title {
      padding: 0;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      justify-content: center;
    }

    .m-submenu__icon-arrow {
      display: none;
    }
  }
}
</style>
