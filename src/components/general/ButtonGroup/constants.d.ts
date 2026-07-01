import type { InjectionKey } from 'vue';
type ButtonSize = 'small' | 'default' | 'large';
export interface ButtonGroupContext {
    size: ButtonSize;
}
export declare const buttonGroupKey: InjectionKey<ButtonGroupContext>;
export {};
