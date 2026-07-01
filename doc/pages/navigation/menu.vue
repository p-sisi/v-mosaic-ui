<template>
  <div class="doc-page">
    <AnchorNav :anchors="anchors" />
    <h1>Menu 导航菜单</h1>
    <p class="doc-page__desc">为网站提供导航功能的菜单，支持垂直、水平、折叠模式，可自定义选中颜色。</p>

    <div class="doc-grid">
      <div class="doc-section" id="basic">
        <h2>垂直菜单</h2>
        <p class="doc-page__hint">默认为垂直模式。点击菜单项后右侧内容区会展示对应内容。</p>
        <DemoBlock :code="basicCode">
          <div class="menu-demo">
            <MMenu default-active="1" @select="handleSelect">
              <MMenuItem index="1">处理中心</MMenuItem>
              <MSubmenu index="2">
                <template #title>我的工作台</template>
                <MMenuItem index="2-1">选项1</MMenuItem>
                <MMenuItem index="2-2">选项2</MMenuItem>
                <MMenuItemGroup title="分组">
                  <MMenuItem index="2-3">选项3</MMenuItem>
                  <MMenuItem index="2-4">选项4</MMenuItem>
                </MMenuItemGroup>
              </MSubmenu>
              <MMenuItem index="3" disabled>消息中心</MMenuItem>
            </MMenu>
            <div class="menu-demo__content">{{ contentText }}</div>
          </div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="horizontal">
        <h2>水平菜单</h2>
        <p class="doc-page__hint">设置 <code>mode="horizontal"</code> 切换为水平导航模式，二级菜单以弹出方式展示。</p>
        <DemoBlock :code="horizontalCode">
          <MMenu mode="horizontal" default-active="1" @select="handleSelect">
            <MMenuItem index="1">处理中心</MMenuItem>
            <MSubmenu index="2">
              <template #title>我的工作台</template>
              <MMenuItem index="2-1">选项1</MMenuItem>
              <MMenuItem index="2-2">选项2</MMenuItem>
              <MMenuItem index="2-3">选项3</MMenuItem>
            </MSubmenu>
            <MSubmenu index="3">
              <template #title>订单管理</template>
              <MMenuItem index="3-1">订单列表</MMenuItem>
              <MMenuItem index="3-2">退款管理</MMenuItem>
            </MSubmenu>
            <MMenuItem index="4" disabled>消息中心</MMenuItem>
          </MMenu>
          <div class="menu-demo__content menu-demo__content--horizontal">{{ contentText }}</div>
        </DemoBlock>
      </div>

      <div class="doc-section" id="collapse">
        <h2>折叠模式</h2>
        <p class="doc-page__hint">设置 <code>collapse</code> 可将菜单折叠为图标模式，常用于侧边栏，二级菜单以弹出方式展示。</p>
        <DemoBlock :code="collapseCode">
          <div class="menu-demo">
            <MMenu default-active="1" :collapse="isCollapsed" @select="handleSelect">
              <MMenuItem index="1">处理中心</MMenuItem>
              <MSubmenu index="2">
                <template #title>工作台</template>
                <MMenuItem index="2-1">选项1</MMenuItem>
                <MMenuItem index="2-2">选项2</MMenuItem>
              </MSubmenu>
              <MMenuItem index="3">消息中心</MMenuItem>
            </MMenu>
            <div class="menu-demo__content">{{ contentText }}</div>
          </div>
          <MButton size="small" @click="isCollapsed = !isCollapsed" style="margin-top: 12px;">
            {{ isCollapsed ? '展开' : '折叠' }}
          </MButton>
        </DemoBlock>
      </div>

      <div class="doc-section" id="color">
        <h2>自定义颜色</h2>
        <p class="doc-page__hint">通过 <code>color</code> 属性自定义菜单选中态颜色。</p>
        <DemoBlock :code="colorCode">
          <div class="doc-demo-group">
            <MMenu default-active="1" color="#13ce66">
              <MMenuItem index="1">处理中心</MMenuItem>
              <MSubmenu index="2">
                <template #title>我的工作台</template>
                <MMenuItem index="2-1">选项1</MMenuItem>
                <MMenuItem index="2-2">选项2</MMenuItem>
              </MSubmenu>
              <MMenuItem index="3">消息中心</MMenuItem>
            </MMenu>
            <MMenu default-active="1" color="#ff4949">
              <MMenuItem index="1">处理中心</MMenuItem>
              <MSubmenu index="2">
                <template #title>我的工作台</template>
                <MMenuItem index="2-1">选项1</MMenuItem>
                <MMenuItem index="2-2">选项2</MMenuItem>
              </MSubmenu>
              <MMenuItem index="3">消息中心</MMenuItem>
            </MMenu>
          </div>
        </DemoBlock>
      </div>
    </div>

    <h2 id="api">API</h2>
    <h3>MMenu Props</h3>
    <ApiTable type="prop" :data="DATA.menuProps" />
    <h3>MMenuItem Props</h3>
    <ApiTable type="prop" :data="DATA.menuItemProps" />
    <h3>MMenu Events</h3>
    <ApiTable type="event" :data="DATA.events" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoBlock from '../../components/DemoBlock.vue'
import AnchorNav from '../../components/AnchorNav.vue'
import ApiTable from '../../components/ApiTable.vue'

const isCollapsed = ref(true)
const contentText = ref('处理中心')

function handleSelect(index: string) {
  const map: Record<string, string> = {
    '1': '处理中心',
    '2': '我的工作台',
    '2-1': '选项1',
    '2-2': '选项2',
    '2-3': '选项3',
    '2-4': '选项4',
    '3': '消息中心',
    '3-1': '订单列表',
    '3-2': '退款管理',
    '4': '消息中心',
  }
  contentText.value = map[index] || `菜单项 ${index}`
}

const basicCode = `<MMenu default-active="1" @select="handleSelect">
  <MMenuItem index="1">处理中心</MMenuItem>
  <MSubmenu index="2">
    <template #title>我的工作台</template>
    <MMenuItem index="2-1">选项1</MMenuItem>
    <MMenuItem index="2-2">选项2</MMenuItem>
    <MMenuItemGroup title="分组">
      <MMenuItem index="2-3">选项3</MMenuItem>
      <MMenuItem index="2-4">选项4</MMenuItem>
    </MMenuItemGroup>
  </MSubmenu>
  <MMenuItem index="3" disabled>消息中心</MMenuItem>
</MMenu>`

const horizontalCode = `<MMenu mode="horizontal" default-active="1" @select="handleSelect">
  <MMenuItem index="1">处理中心</MMenuItem>
  <MSubmenu index="2">
    <template #title>我的工作台</template>
    <MMenuItem index="2-1">选项1</MMenuItem>
    <MMenuItem index="2-2">选项2</MMenuItem>
    <MMenuItem index="2-3">选项3</MMenuItem>
  </MSubmenu>
  <MSubmenu index="3">
    <template #title>订单管理</template>
    <MMenuItem index="3-1">订单列表</MMenuItem>
    <MMenuItem index="3-2">退款管理</MMenuItem>
  </MSubmenu>
  <MMenuItem index="4" disabled>消息中心</MMenuItem>
</MMenu>`

const collapseCode = `<MMenu default-active="1" :collapse="isCollapsed" @select="handleSelect">
  <MMenuItem index="1">处理中心</MMenuItem>
  <MSubmenu index="2">
    <template #title>工作台</template>
    <MMenuItem index="2-1">选项1</MMenuItem>
    <MMenuItem index="2-2">选项2</MMenuItem>
  </MSubmenu>
  <MMenuItem index="3">消息中心</MMenuItem>
</MMenu>

<script setup>
const isCollapsed = ref(true)
<` + `/script>`

const colorCode = `<MMenu default-active="1" color="#13ce66">
  <MMenuItem index="1">处理中心</MMenuItem>
  <MSubmenu index="2">
    <template #title>我的工作台</template>
    <MMenuItem index="2-1">选项1</MMenuItem>
    <MMenuItem index="2-2">选项2</MMenuItem>
  </MSubmenu>
  <MMenuItem index="3">消息中心</MMenuItem>
</MMenu>

<MMenu default-active="1" color="#ff4949">
  <MMenuItem index="1">处理中心</MMenuItem>
  <MSubmenu index="2">
    <template #title>我的工作台</template>
    <MMenuItem index="2-1">选项1</MMenuItem>
    <MMenuItem index="2-2">选项2</MMenuItem>
  </MSubmenu>
  <MMenuItem index="3">消息中心</MMenuItem>
</MMenu>`

const anchors = [
  { id: 'basic', label: '垂直菜单' },
  { id: 'horizontal', label: '水平菜单' },
  { id: 'collapse', label: '折叠模式' },
  { id: 'color', label: '自定义颜色' },
  { id: 'api', label: 'API' },
]

const DATA = {
  menuProps: [
    ['mode', 'vertical | horizontal', 'vertical', '菜单模式'],
    ['collapse', 'boolean', 'false', '是否折叠'],
    ['defaultActive', 'string', '—', '默认激活菜单项的 index'],
    ['backgroundColor', 'string', '—', '菜单背景色'],
    ['textColor', 'string', '—', '菜单文字颜色'],
    ['activeTextColor', 'string', '—', '激活菜单项文字颜色'],
    ['uniqueOpened', 'boolean', 'false', '是否只保持一个子菜单展开'],
    ['router', 'boolean', 'false', '是否使用 vue-router 模式'],
    ['color', 'string', '—', '选中态颜色'],
  ],
  menuItemProps: [
    ['index', 'string', '—', '唯一标识'],
    ['route', 'RouteLocationRaw', '—', '路由跳转对象'],
    ['disabled', 'boolean', 'false', '是否禁用'],
  ],
  events: [
    ['select', 'index, indexPath, item', '菜单项被点击时触发'],
    ['open', 'index, indexPath', '子菜单展开时触发'],
    ['close', 'index, indexPath', '子菜单收起时触发'],
  ],
}
</script>

<style scoped lang="scss">
.menu-demo {
  display: flex;
  gap: 16px;
  align-items: flex-start;

  &__content {
    flex: 1;
    min-height: 120px;
    padding: 16px;
    background-color: var(--mosaic-fill-color-light);
    border-radius: var(--mosaic-border-radius);
    color: var(--mosaic-text-regular);
    font-size: var(--mosaic-font-size);
    display: flex;
    align-items: center;
    justify-content: center;

    &--horizontal {
      margin-top: 16px;
    }
  }
}
</style>
