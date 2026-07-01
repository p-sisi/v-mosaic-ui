# Mosaic UI

A Vue 3 component library built with Composition API & TypeScript.

一个基于 Vue 3 Composition API + TypeScript 的组件库，内置文档站点，覆盖日常中后台与通用场景常用组件，持续迭代中。

---

## Features / 特性

- **Vue 3 Composition API** — `<script setup>` + TypeScript 全量类型
- **主题定制** — 基于 CSS 变量，轻松覆盖
- **按需引入** — 命名导出，支持 Tree-shaking
- **内置文档站点** — 示例 + API + 可复制代码，可作静态站点部署

---

## Install / 安装

```bash
npm install @pang/mosaic-ui
```

## Quick Start / 快速上手

Global registration / 全局注册：

```ts
import { createApp } from 'vue'
import MosaicUI from '@pang/mosaic-ui'
import '@pang/mosaic-ui/style.css'

const app = createApp(App)
app.use(MosaicUI)
```

Import on demand / 按需引入：

```ts
import { MButton, MInput, MTable } from '@pang/mosaic-ui'
import '@pang/mosaic-ui/style.css'
```

---

## Components / 组件

| 分类 | 组件 |
|------|------|
| 通用 | Button、Text、Link、Divider、Badge、Tag、Avatar、AvatarGroup、Skeleton、Empty、Result、Statistic、Spinner、Scrollbar |
| 布局 | Container、Header、Aside、Main、Footer、Row、Col |
| 表单 | Input、InputNumber、InputTag、InputOTP、Select、Autocomplete、Cascader、TreeSelect、ColorPicker、DatePicker、TimePicker、Switch、Slider、Rate、Checkbox、Radio、Transfer、Upload、Form |
| 数据 | Table、Tree、Calendar、Card、Carousel、Collapse、Descriptions、Image、Progress、Timeline |
| 反馈 | Alert、Message、MessageBox、Notification、Dialog、Drawer、Tooltip、Popover、Popconfirm、Loading、Backtop |
| 导航 | Menu、Tabs、Breadcrumb、Dropdown、Pagination、Steps、PageHeader |

---

## Theme / 主题定制

覆盖 CSS 变量即可定制主题：

```css
:root {
  --mosaic-primary: #a78bfa;       /* 主色调 */
  --mosaic-primary-light: #c4b5fd; /* 悬浮色 */
  --mosaic-primary-dark: #7c3aed;  /* 激活色 */
  --mosaic-border-radius: 4px;     /* 圆角 */
  --mosaic-font-size: 14px;        /* 基础字号 */
}
```

---

## Dev / 开发

```bash
npm run dev          # 启动文档站点
npm run build        # 构建组件库
npm run build:doc    # 构建文档站点
```

---

## License / 许可

MIT