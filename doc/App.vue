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
    ],
  },
  {
    label: '表单',
    children: [
      { label: 'Input 输入框', path: '/form/input' },
    ],
  },
  {
    label: '消息反馈',
    children: [
      { label: '概览', path: '/message' },
    ],
  },
]

const currentPath = computed(() => route.path)

function toggleSider() {
  siderCollapsed.value = !siderCollapsed.value
}
</script>

<style>
@import '../src/styles/base.css';
@import './styles/doc-page.scss';

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
}

.doc-header__left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.doc-header__toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--mosaic-text-regular);
  padding: 4px;
}

@media (max-width: 768px) {
  .doc-header__toggle {
    display: flex;
  }
}

.doc-header__logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--mosaic-text-primary);
}

.doc-header__logo-icon {
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

.doc-header__logo-text {
  font-size: 18px;
  font-weight: 600;
}

.doc-header__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.doc-header__github {
  color: var(--mosaic-text-regular);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.doc-header__github:hover {
  color: var(--mosaic-primary);
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
}

.doc-sider--collapsed {
  width: 0;
  transform: translateX(-240px);
}

.doc-sider__nav {
  padding: 0 12px;
}

.doc-nav-group {
  margin-bottom: 16px;
}

.doc-nav-group__label {
  font-size: 12px;
  color: var(--mosaic-text-secondary);
  font-weight: 600;
  padding: 4px 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.doc-nav-item {
  display: block;
  padding: 8px 12px;
  color: var(--mosaic-text-regular);
  text-decoration: none;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;
}

.doc-nav-item:hover {
  color: var(--mosaic-primary);
  background: rgba(167, 139, 250, 0.08);
}

.doc-nav-item--active {
  color: var(--mosaic-primary);
  background: rgba(167, 139, 250, 0.1);
  font-weight: 500;
}

.doc-nav-sub-group {
  margin-bottom: 8px;
}

.doc-nav-sub-group__label {
  font-size: 13px;
  color: var(--mosaic-text-primary);
  font-weight: 500;
  padding: 6px 12px;
}

.doc-content-wrapper {
  margin-left: 240px;
  flex: 1;
  display: flex;
  transition: margin-left 0.3s;
}

.doc-sider--collapsed ~ .doc-content-wrapper {
  margin-left: 0;
}

.doc-content {
  flex: 1;
  padding: 32px 40px;
  min-width: 0;
}

@media (min-width: 1200px) {
  .doc-content {
    padding-right: 200px;
  }
}

@media (max-width: 768px) {
  .doc-sider {
    transform: translateX(-240px);
    width: 240px;
  }

  .doc-sider--collapsed {
    transform: translateX(-240px);
  }

  .doc-sider:not(.doc-sider--collapsed) {
    transform: translateX(0);
  }

  .doc-content-wrapper {
    margin-left: 0;
  }

  .doc-content {
    padding: 24px 16px;
  }
}
</style>