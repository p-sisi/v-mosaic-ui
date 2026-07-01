import type { InjectionKey } from 'vue'

type ButtonSize = 'small' | 'default' | 'large'

export interface ButtonGroupContext {
  size: ButtonSize
}

export const buttonGroupKey: InjectionKey<ButtonGroupContext> = Symbol('buttonGroup')