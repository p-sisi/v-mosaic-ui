/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module '@pang/mosaic-ui' {
  import type { App, Component } from 'vue'
  export const MButton: Component
  export const MInput: Component
  export function install(app: App): void
  export { useClickOutside } from './hooks'
  export { bem } from './utils'
  const _default: { install: (app: App) => void }
  export default _default
}

declare module '@pang/mosaic-ui/style.css' {
  const content: string
  export default content
}