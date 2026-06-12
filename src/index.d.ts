import type { App } from 'vue';
import { MButton, MInput } from './components';
declare function install(app: App): void;
export { install };
export { MButton, MInput };
export { useClickOutside } from './hooks';
export { bem } from './utils';
declare const _default: {
    install: typeof install;
};
export default _default;
