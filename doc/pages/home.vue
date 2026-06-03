<template>
  <div class="doc-home">
    <div class="doc-home__hero">
      <div class="doc-home__logo">M</div>
      <h1 class="doc-home__title">Mosaic UI</h1>
      <p class="doc-home__desc">一个基于 Vue 3 + Composition API 的组件库，提供简洁、易用的 UI 组件</p>
      <div class="doc-home__actions">
        <MButton type="primary" size="large" round>
          <router-link to="/normal/button" style="color: #fff; text-decoration: none;">开始使用</router-link>
        </MButton>
        <MButton size="large" round>
          <a href="https://github.com/sisipang/v-@pang/mosaic-ui" target="_blank" style="text-decoration: none;">GitHub</a>
        </MButton>
      </div>
    </div>

    <div class="doc-home__features">
      <div class="doc-home__feature">
        <h3>Vue 3 Composition API</h3>
        <p>基于 Vue 3 和 &lt;script setup&gt;，完整 TypeScript 支持</p>
      </div>
      <div class="doc-home__feature">
        <h3>按需引入</h3>
        <p>支持 Tree-shaking，只打包你用到的组件</p>
      </div>
      <div class="doc-home__feature">
        <h3>主题定制</h3>
        <p>CSS 变量驱动，轻松覆盖默认样式</p>
      </div>
    </div>

    <div class="doc-home__section">
      <h2>安装</h2>
      <div class="doc-home__code">
        <pre>npm install @pang/mosaic-ui</pre>
      </div>

      <h2>全局注册</h2>
      <div class="doc-home__code">
        <pre>import { createApp } from 'vue'
import MosaicUI from '@pang/mosaic-ui'
import '@pang/mosaic-ui/style.css'

const app = createApp(App)
app.use(MosaicUI)</pre>
      </div>

      <h2>按需引入</h2>
      <div class="doc-home__code">
        <pre>import { MButton, MInput } from '@pang/mosaic-ui'
import '@pang/mosaic-ui/style.css'</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
.doc-home__hero {
  text-align: center;
  padding: 48px 0 32px;
}

.doc-home__logo {
  width: 64px;
  height: 64px;
  background: var(--mosaic-primary);
  color: #fff;
  border-radius: 12px;
  font-size: 32px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.doc-home__title {
  font-size: 36px;
  font-weight: 700;
  color: var(--mosaic-text-primary);
  margin-bottom: 12px;
}

.doc-home__desc {
  font-size: 16px;
  color: var(--mosaic-text-regular);
  margin-bottom: 24px;
}

.doc-home__actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.doc-home__features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 32px 0;
}

@media (max-width: 768px) {
  .doc-home__features {
    grid-template-columns: 1fr;
  }
}

.doc-home__feature {
  padding: 20px;
  border: 1px solid var(--mosaic-border-color);
  border-radius: 8px;
}

.doc-home__feature h3 {
  font-size: 16px;
  color: var(--mosaic-text-primary);
  margin-bottom: 8px;
}

.doc-home__feature p {
  font-size: 14px;
  color: var(--mosaic-text-regular);
}

.doc-home__section {
  padding: 32px 0;
}

.doc-home__section h2 {
  font-size: 22px;
  color: var(--mosaic-text-primary);
  margin-bottom: 12px;
  margin-top: 24px;
}

.doc-home__code {
  background: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
}

.doc-home__code pre {
  font-family: 'Menlo', 'Consolas', monospace;
  font-size: 14px;
  color: var(--mosaic-text-primary);
  line-height: 1.6;
}
</style>