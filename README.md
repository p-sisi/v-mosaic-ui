# Mosaic UI

A Vue 3 component library built with Composition API & TypeScript.

一个基于 Vue 3 Composition API + TypeScript 的组件库。

---

## Features / 特性

- **Vue 3 Composition API** — `<script setup>` + TypeScript
- **Tree-shaking** — Named exports, import only what you need
- **Themeable** — CSS variables, easy to override
- **Documentation site** — Built-in doc site, deployable as static pages

---

## Install / 安装

```bash
npm install @sisipang/mosaic-ui
```

## Quick Start / 快速上手

Global registration / 全局注册：

```ts
import { createApp } from 'vue'
import MosaicUI from '@sisipang/mosaic-ui'
import '@sisipang/mosaic-ui/style.css'

const app = createApp(App)
app.use(MosaicUI)
```

Import on demand / 按需引入：

```ts
import { MButton, MInput } from '@sisipang/mosaic-ui'
import '@sisipang/mosaic-ui/style.css'
```

---

## Components / 组件

| Component | Description / 说明 |
|-----------|---------------------|
| MButton   | Button with types, sizes, round, plain, disabled, loading / 多类型、多尺寸、圆角、朴素、禁用、加载按钮 |
| MInput    | Input with v-model, clearable, sizes, disabled / 双向绑定、可清除、多尺寸、禁用输入框 |

---

## Theme / 主题定制

Override CSS variables to customize the theme / 覆盖 CSS 变量即可定制主题：

```css
:root {
  --mosaic-primary: #a78bfa;       /* Primary color / 主色调 */
  --mosaic-primary-light: #c4b5fd; /* Hover color / 悬浮色 */
  --mosaic-primary-dark: #7c3aed;  /* Active color / 激活色 */
  --mosaic-border-radius: 4px;     /* Border radius / 圆角 */
  --mosaic-font-size: 14px;        /* Base font size / 基础字号 */
}
```

---

## Dev / 开发

```bash
# Start doc site / 启动文档站点
npm run dev

# Build library / 构建组件库
npm run build

# Build doc site / 构建文档站点
npm run build:doc
```

---

## License / 许可

MIT