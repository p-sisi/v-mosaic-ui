<template>
  <div class="doc-layout">
    <header class="doc-header">
      <div class="doc-header__left">
        <button class="doc-header__toggle" @click="toggleSider">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <router-link to="/" class="doc-header__logo">
          <span class="doc-header__logo-icon">M</span>
          <span v-if="!siderCollapsed" class="doc-header__logo-text">Mosaic UI</span>
        </router-link>
      </div>
      <div class="doc-header__right">
        <a
          href="https://github.com/sisipang/v-mosaic-ui"
          target="_blank"
          rel="noopener noreferrer"
          class="doc-header__github"
        >
          GitHub
        </a>
      </div>
    </header>

    <div class="doc-body">
      <aside :class="['doc-sider', { 'doc-sider--collapsed': siderCollapsed }]">
        <nav class="doc-sider__nav">
          <template v-for="group in navGroups" :key="group.label">
            <div class="doc-nav-group">
              <div class="doc-nav-group__label">{{ group.label }}</div>
              <template v-for="child in group.children" :key="child.label">
                <template v-if="child.children">
                  <div class="doc-nav-sub-group">
                    <div class="doc-nav-sub-group__label">{{ child.label }}</div>
                    <router-link
                      v-for="item in child.children"
                      :key="item.path"
                      :to="item.path"
                      :class="['doc-nav-item', { 'doc-nav-item--active': currentPath === item.path }]"
                    >
                      {{ item.label }}
                    </router-link>
                  </div>
                </template>
                <template v-else>
                  <router-link
                    :to="child.path"
                    :class="['doc-nav-item', { 'doc-nav-item--active': currentPath === child.path }]"
                  >
                    {{ child.label }}
                  </router-link>
                </template>
              </template>
            </div>
          </template>
        </nav>
      </aside>

      <main class="doc-content-wrapper">
        <div class="doc-content">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AnchorNav from './components/AnchorNav.vue'

const route = useRoute()
const siderCollapsed = ref(false)

type NavItem = { label: string; path: string; children?: undefined }
type NavSubGroup = { label: string; children: NavItem[]; path?: undefined }
type NavChild = NavItem | NavSubGroup

const navGroups: { label: string; children: NavChild[] }[] = [
  {
    label: '开发指南',
    children: [
      { label: '首页', path: '/' },
    ],
  },
  {
    label: '通用',
    children: [
      { label: 'Button 按钮', path: '/general/button' },
      { label: 'ButtonGroup 按钮组', path: '/general/button-group' },
      { label: 'Text 文本', path: '/general/text' },
      { label: 'Link 链接', path: '/general/link' },
      { label: 'Divider 分割线', path: '/general/divider' },
      { label: 'Badge 徽标', path: '/general/badge' },
      { label: 'Tag 标签', path: '/general/tag' },
      { label: 'Avatar 头像', path: '/general/avatar' },
      { label: 'AvatarGroup 头像组', path: '/general/avatar-group' },
      { label: 'Skeleton 骨架屏', path: '/general/skeleton' },
      { label: 'Empty 空状态', path: '/general/empty' },
      { label: 'Result 结果', path: '/general/result' },
      { label: 'Statistic 统计数值', path: '/general/statistic' },
      { label: 'Spinner 加载', path: '/general/spinner' },
      { label: 'Scrollbar 滚动条', path: '/general/scrollbar' },
    ],
  },
  {
    label: '布局',
    children: [
      { label: 'Container 布局容器', path: '/layout/container' },
      { label: 'Row / Col 行列', path: '/layout/row-col' },
    ],
  },
  {
    label: '表单',
    children: [
      { label: 'Input 输入框', path: '/form/input' },
      { label: 'InputNumber 数字输入', path: '/form/input-number' },
      { label: 'InputTag 标签输入', path: '/form/input-tag' },
      { label: 'InputOTP 验证码输入', path: '/form/input-otp' },
      { label: 'Checkbox 多选', path: '/form/checkbox' },
      { label: 'Radio 单选', path: '/form/radio' },
      { label: 'Switch 开关', path: '/form/switch' },
      { label: 'Slider 滑块', path: '/form/slider' },
      { label: 'Rate 评分', path: '/form/rate' },
      { label: 'Select 选择器', path: '/form/select' },
      { label: 'Transfer 穿梭框', path: '/form/transfer' },
      { label: 'TreeSelect 树形选择', path: '/form/tree-select' },
      { label: 'Form 表单', path: '/form/form' },
      { label: 'Autocomplete 自动补全', path: '/form/autocomplete' },
      { label: 'Cascader 级联选择器', path: '/form/cascader' },
      { label: 'ColorPicker 颜色选择器', path: '/form/color-picker' },
      { label: 'DatePicker 日期选择器', path: '/form/date-picker' },
      { label: 'TimePicker 时间选择器', path: '/form/time-picker' },
      { label: 'Upload 上传', path: '/form/upload' },
    ],
  },
  {
    label: '导航',
    children: [
      { label: 'Breadcrumb 面包屑', path: '/navigation/breadcrumb' },
      { label: 'Tabs 标签页', path: '/navigation/tabs' },
      { label: 'Dropdown 下拉菜单', path: '/navigation/dropdown' },
      { label: 'Menu 导航菜单', path: '/navigation/menu' },
      { label: 'Pagination 分页', path: '/navigation/pagination' },
      { label: 'Steps 步骤条', path: '/navigation/steps' },
      { label: 'PageHeader 页头', path: '/navigation/page-header' },
    ],
  },
  {
    label: '数据展示',
    children: [
      { label: 'Progress 进度条', path: '/data/progress' },
      { label: 'Image 图片', path: '/data/image' },
      { label: 'Card 卡片', path: '/data/card' },
      { label: 'Timeline 时间线', path: '/data/timeline' },
      { label: 'Table 表格', path: '/data/table' },
      { label: 'Tree 树形', path: '/data/tree' },
      { label: 'Calendar 日历', path: '/data/calendar' },
      { label: 'Carousel 走马灯', path: '/data/carousel' },
      { label: 'Collapse 折叠面板', path: '/data/collapse' },
      { label: 'Descriptions 描述列表', path: '/data/descriptions' },
    ],
  },
  {
    label: '反馈',
    children: [
      { label: 'Alert 警告', path: '/feedback/alert' },
      { label: 'Backtop 回到顶部', path: '/feedback/backtop' },
      { label: 'Popover 弹出框', path: '/feedback/popover' },
      { label: 'Tooltip 文字提示', path: '/feedback/tooltip' },
      { label: 'Popconfirm 气泡确认', path: '/feedback/popconfirm' },
      { label: 'Dialog 对话框', path: '/feedback/dialog' },
      { label: 'Drawer 抽屉', path: '/feedback/drawer' },
      { label: 'Message 消息提示', path: '/feedback/message' },
      { label: 'MessageBox 消息弹框', path: '/feedback/message-box' },
      { label: 'Notification 通知', path: '/feedback/notification' },
    ],
  },
]

const currentPath = computed(() => route.path)

function toggleSider() {
  siderCollapsed.value = !siderCollapsed.value
}
</script>

<style lang="scss">
@use '../src/styles/base';
@use './styles/doc-page.scss';

* {
  margin: 0;
  padding: 0;
}

.doc-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.doc-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid var(--mosaic-border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 100;

  &__left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--mosaic-text-regular);
    padding: 4px;

    @media (max-width: 768px) {
      & {
        display: flex;
      }
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: var(--mosaic-text-primary);
  }

  &__logo-icon {
    width: 32px;
    height: 32px;
    background: var(--mosaic-primary);
    color: #fff;
    border-radius: 6px;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__logo-text {
    font-size: 18px;
    font-weight: 600;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__github {
    color: var(--mosaic-text-regular);
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s;

    &:hover {
      color: var(--mosaic-primary);
    }
  }
}

.doc-body {
  display: flex;
  margin-top: 56px;
  min-height: calc(100vh - 56px);
}

.doc-sider {
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  width: 240px;
  background: #fff;
  border-right: 1px solid var(--mosaic-border-color);
  overflow-y: auto;
  padding: 16px 0;
  transition: width 0.3s, transform 0.3s;

  &--collapsed {
    width: 0;
    transform: translateX(-240px);

    ~ .doc-content-wrapper {
      margin-left: 0;
    }
  }

  &__nav {
    padding: 0 12px;
  }

  @media (max-width: 768px) {
    & {
      transform: translateX(-240px);
      width: 240px;
    }

    &--collapsed {
      transform: translateX(-240px);
    }

    &:not(.doc-sider--collapsed) {
      transform: translateX(0);
    }
  }
}

.doc-nav-group {
  margin-bottom: 16px;

  &__label {
    font-size: 16px;
    color: var(--mosaic-text-primary);
    font-weight: 600;
    padding: 4px 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background-color: #f2f2f0;
    border-radius: 6px;
  }
}

.doc-nav-item {
  display: block;
  padding: 8px 12px;
  color: var(--mosaic-text-regular);
  text-decoration: none;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    color: var(--mosaic-primary);
    background: rgba(167, 139, 250, 0.08);
  }

  &--active {
    color: var(--mosaic-primary);
    background: rgba(167, 139, 250, 0.1);
    font-weight: 500;
  }
}

.doc-nav-sub-group {
  margin-bottom: 8px;

  &__label {
    font-size: 13px;
    color: var(--mosaic-text-primary);
    font-weight: 500;
    padding: 6px 12px;
  }
}

.doc-content-wrapper {
  margin-left: 240px;
  flex: 1;
  display: flex;
  transition: margin-left 0.3s;
}

.doc-content {
  flex: 1;
  padding: 32px 40px;
  min-width: 0;

  @media (min-width: 1200px) {
    & {
      padding-right: 200px;
    }
  }

  @media (max-width: 768px) {
    & {
      padding: 24px 16px;
    }
  }
}

@media (max-width: 768px) {
  .doc-content-wrapper {
    margin-left: 0;
  }
}
</style>