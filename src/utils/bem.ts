/** BEM-style class name generator */
export function bem(block: string, element?: string, modifier?: string): string {
  let cls = block
  if (element) cls += `__${element}`
  if (modifier) cls += `--${modifier}`
  return cls
}