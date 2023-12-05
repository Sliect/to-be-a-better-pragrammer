function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// @ts-ignore
import App from '@@/core/App.vue';
// @ts-ignore
import Vue from 'vue';
// @ts-ignore
import VueRouter from 'vue-router';
// @ts-ignore

import { createClientRoutes } from "./routes";
Vue.use(VueRouter);
export var AppContextKey = Symbol('AppContextKey');

/* 滚动到顶部 */
function scrollToTop() {
  /**
   * @fixme
   * 与服务网关保持一致。需要约定
   */
  var pageDom = document.getElementsByClassName('bodyContent')[0];
  if (pageDom) {
    pageDom.scrollTo({
      left: 0,
      top: 0
    });
  }
}
var historyTypeMap = {
  browser: 'history',
  hash: 'hash',
  memory: 'abstract'
};
export function renderClient(opts) {
  var _opts$historyType, _opts$basename;
  var routes = createClientRoutes({
    routesById: opts.routes,
    routeComponents: opts.routeComponents
  });
  var rootContainer = App;
  for (var _i = 0, _arr = [
    // Lowest to the highest priority
    'innerProvider', 'i18nProvider', 'accessProvider', 'dataflowProvider', 'outerProvider', 'rootContainer']; _i < _arr.length; _i++) {
    var key = _arr[_i];
    rootContainer = opts.pluginManager.applyPlugins({
      type: 'modify',
      key: key,
      initialValue: rootContainer,
      args: {}
    });
  }
  var store = opts.pluginManager.applyPlugins({
    type: 'modify',
    key: 'createStore',
    args: {}
  });

  // 路由配置
  var routerConfig = opts.pluginManager.applyPlugins({
    key: 'router',
    type: 'modify',
    initialValue: {}
  });
  var router = new VueRouter(_objectSpread({
    mode: historyTypeMap[(_opts$historyType = opts.historyType) !== null && _opts$historyType !== void 0 ? _opts$historyType : 'browser'],
    base: (_opts$basename = opts.basename) !== null && _opts$basename !== void 0 ? _opts$basename : '/',
    routes: routes,
    scrollBehavior: function scrollBehavior(to, from, savedPosition) {
      // 返回到 hash 位置
      if (to.hash) {
        return {
          selector: to.hash
        };
      }
      // 返回到上一次浏览位置（模拟浏览器回退按钮等）
      if (savedPosition) {
        return savedPosition;
      }

      // 局部滚动
      scrollToTop();

      // 切换页面，统一返回到顶部
      return {
        x: 0,
        y: 0
      };
    }
  }, routerConfig));

  // 切换页面完毕后，滚动，避免部分异步渲染数据页面定位不准
  router.afterEach(function () {
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
      router: router,
      store: store
    }
  });

  /**
   * 使用 vue2 的实例化方式
   */
  var app = new Vue({
    router: router,
    store: store,
    render: function render(h) {
      return h(rootContainer);
    }
  }).$mount(opts.rootElement);
  opts.pluginManager.applyPlugins({
    type: 'event',
    key: 'onAppCreated',
    args: {
      app: app,
      router: router,
      store: store
    }
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
      app: app,
      router: router,
      store: store
    }
  });
  return {
    app: app,
    router: router
  };
}