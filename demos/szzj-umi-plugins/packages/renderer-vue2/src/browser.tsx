// @ts-ignore
import App from '@@/core/App.vue';
// @ts-ignore
import Vue from 'vue';
// @ts-ignore
import VueRouter, { RouterMode } from 'vue-router';
// @ts-ignore
import Vuex from 'vuex';
// @ts-ignore
import createLogger from 'vuex/dist/logger';
import { createClientRoutes } from './routes';
import { IRouteComponents, IRoutesById } from './types';

Vue.use(VueRouter);

export const AppContextKey = Symbol('AppContextKey');

/* 滚动到顶部 */
function scrollToTop() {
  /**
   * @fixme
   * 与服务网关保持一致。需要约定
   */
  const pageDom = document.getElementsByClassName('bodyContent')[0];

  if (pageDom) {
    pageDom.scrollTo({
      left: 0,
      top: 0,
    });
  }
}

const historyTypeMap = {
  browser: 'history',
  hash: 'hash',
  memory: 'abstract',
};

export function renderClient(opts: {
  rootElement: string;
  routes: IRoutesById;
  routeComponents: IRouteComponents;
  pluginManager: any;
  basename?: string;
  historyType: 'browser' | 'hash' | 'memory';
}) {
  const routes = createClientRoutes({
    routesById: opts.routes,
    routeComponents: opts.routeComponents,
  }) as any;

  let rootContainer = App;

  for (const key of [
    // Lowest to the highest priority
    'innerProvider',
    'i18nProvider',
    'accessProvider',
    'dataflowProvider',
    'outerProvider',
    'rootContainer',
  ]) {
    rootContainer = opts.pluginManager.applyPlugins({
      type: 'modify',
      key,
      initialValue: rootContainer,
      args: {},
    });
  }

  const store = opts.pluginManager.applyPlugins({
    type: 'modify',
    key: 'createStore',
    args: { },
  });

  // 路由配置
  const routerConfig = opts.pluginManager.applyPlugins({
    key: 'router',
    type: 'modify',
    initialValue: {},
  });

  const router = new VueRouter({
    mode: historyTypeMap[opts.historyType ?? 'browser'],
    base: opts.basename ?? '/',
    routes,
    scrollBehavior(to, from, savedPosition) {
      // 返回到 hash 位置
      if (to.hash) {
        return {
          selector: to.hash,
        };
      }
      // 返回到上一次浏览位置（模拟浏览器回退按钮等）
      if (savedPosition) {
        return savedPosition;
      }

      // 局部滚动
      scrollToTop();

      // 切换页面，统一返回到顶部
      return { x: 0, y: 0 };
    },
    ...routerConfig,
  });

  // 切换页面完毕后，滚动，避免部分异步渲染数据页面定位不准
  router.afterEach(() => {
    scrollToTop();
  });

  /**
   * @fixme
   * 临时性方案，通过 window 变量共享 router
   */
  window.router = router;

  opts.pluginManager.applyPlugins({
    type: 'event',
    key: 'onRouterCreated',
    args: {
      router,
      store,
    },
  });

  /**
   * 使用 vue2 的实例化方式
   */
  const app = new Vue({
    router,
    store,
    render: (h) => h(rootContainer),
  }).$mount(opts.rootElement);

  opts.pluginManager.applyPlugins({
    type: 'event',
    key: 'onAppCreated',
    args: {
      app,
      router,
      store,
    },
  });

  /**
   * @fixme
   * appData 通过 vue@2 方式进行注入
   */
  // 注入appData 数据
  // app.provide(AppContextKey, {
  //   routes: opts.routes,
  //   routeComponents: opts.routeComponents,
  //   clientRoutes: routes,
  //   pluginManager: opts.pluginManager,
  //   rootElement: opts.rootElement,
  // });

  opts.pluginManager.applyPlugins({
    type: 'event',
    key: 'onMounted',
    args: {
      app,
      router,
      store,
    },
  });

  return {
    app,
    router,
  };
}
