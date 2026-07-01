/** 全局 z-index 管理器，确保弹出层层叠顺序正确 */
let zIndex = 2000

export function useZIndex() {
  const nextZIndex = () => ++zIndex
  const currentZIndex = () => zIndex
  return { nextZIndex, currentZIndex }
}
