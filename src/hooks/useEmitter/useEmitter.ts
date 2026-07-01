import { getCurrentInstance, type ComponentInternalInstance } from 'vue'

/** Vue 3 替代 Element 的 emitter mixin，使用 provide/inject + 自定义事件实现组件间通信 */
export function useEmitter() {
  const instance = getCurrentInstance()

  /** 向上派发事件，匹配到指定组件名后触发其 $emit */
  function dispatch(componentName: string, eventName: string, params?: unknown) {
    let parent: ComponentInternalInstance | null | undefined = instance?.parent
    while (parent) {
      if (parent.type.name === componentName) {
        parent.emit(eventName, params)
        break
      }
      parent = parent.parent
    }
  }

  /** 向下广播事件，遍历所有子组件匹配指定组件名后触发其 $emit */
  function broadcast(componentName: string, eventName: string, params?: unknown) {
    function _broadcast(children: ComponentInternalInstance[]) {
      children.forEach((child) => {
        if (child.type.name === componentName) {
          child.emit(eventName, params)
        }
        if (child.subTree?.component) {
          _broadcast([child.subTree.component])
        }
        if (child.subTree?.children && Array.isArray(child.subTree.children)) {
          const childComponents = (child.subTree.children as any[])
            .filter((v: any) => v?.component)
            .map((v: any) => v.component)
          _broadcast(childComponents)
        }
      })
    }
    if (instance?.subTree?.component) {
      _broadcast([instance.subTree.component])
    }
  }

  return { dispatch, broadcast }
}
