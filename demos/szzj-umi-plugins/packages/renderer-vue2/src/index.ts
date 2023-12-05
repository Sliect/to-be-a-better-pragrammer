// @ts-ignore
import { RouterOptions } from 'vue-router';

// @ts-ignore
export {
  RouterLink,
  RouterView,
  // @ts-ignore
} from 'vue-router';

// @ts-ignore
export type { RouterHistory } from 'vue-router';

export { AppContextKey, renderClient } from './browser';

export type RouterConfig = Omit<RouterOptions, 'history' | 'routes'>;

/**
 * 根节点渲染时无实际意义，可通过 @@/history 导出跳转方法，替换原 router
 * @returns
 */
export const createMemoryHistory = () => {
  return window.router;
};

/**
 * 根节点渲染时无实际意义，可通过 @@/history 导出跳转方法，替换原 router
 * @returns
 */
export const createWebHashHistory = () => {
  return window.router;
};

/**
 * 根节点渲染时无实际意义，可通过 @@/history 导出跳转方法，替换原 router
 * @returns
 */
export const createWebHistory = () => {
  return window.router;
};
