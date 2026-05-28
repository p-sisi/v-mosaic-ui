import type { App, Component } from 'vue'
import { MButton, MInput } from './components'

const components: Component[] = [MButton, MInput]

function install(app: App) {
  components.forEach((component) => {
    app.component(component.name!, component)
  })
}

export { install }
export { MButton, MInput }
export { useClickOutside } from './hooks'
export { bem } from './utils'

export default { install }