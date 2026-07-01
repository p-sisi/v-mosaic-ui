import type { Directive, App } from 'vue';
import { vInfiniteScroll } from './InfiniteScroll';
declare const directives: Record<string, Directive>;
export { vInfiniteScroll };
export { directives };
export declare function installDirectives(app: App): void;
