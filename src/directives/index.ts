import type { Directive, App } from 'vue'
import { vInfiniteScroll } from './InfiniteScroll'

const directives: Record<string, Directive> = {
  InfiniteScroll: vInfiniteScroll,
}

export { vInfiniteScroll }
export { directives }

export function installDirectives(app: App) {
  Object.entries(directives).forEach(([name, directive]) => {
    app.directive(name, directive)
  })
}
