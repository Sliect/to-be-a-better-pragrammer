// @ts-ignore

// @ts-ignore
export { RouterLink, RouterView
// @ts-ignore
} from 'vue-router';

// @ts-ignore

export { AppContextKey, renderClient } from "./browser";
/**
 * 根节点渲染时无实际意义，可通过 @@/history 导出跳转方法，替换原 router
 * @returns
 */
export var createMemoryHistory = function createMemoryHistory() {
  return window.router;
};

/**
 * 根节点渲染时无实际意义，可通过 @@/history 导出跳转方法，替换原 router
 * @returns
 */
export var createWebHashHistory = function createWebHashHistory() {
  return window.router;
};

/**
 * 根节点渲染时无实际意义，可通过 @@/history 导出跳转方法，替换原 router
 * @returns
 */
export var createWebHistory = function createWebHistory() {
  return window.router;
};