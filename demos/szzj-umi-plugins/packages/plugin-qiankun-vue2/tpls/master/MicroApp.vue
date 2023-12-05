<template>
  <div
    :style="{ position: 'relative' }"
    class="{wrapperClassName} qiankun-micro-app-wrapper"
  >
    <Loading v-if="loading"></Loading>
    <ErrorBoundary v-if="error" error="error"></ErrorBoundary>
    <div ref="container" class="{className} qiankun-micro-app-container"></div>
  </div>
</template>

<script>
import concat from 'lodash/concat';
import mergeWith from 'lodash/mergeWith';
import {
  addGlobalUncaughtErrorHandler,
  removeGlobalUncaughtErrorHandler,
  loadMicroApp,
  prefetchApps,
} from 'qiankun';
import Loading from './Loading.vue';
import ErrorBoundary from './ErrorBoundary.vue';
import { getMasterOptions } from './masterOptions';
import stateForSlave from './stateForSlave';

/**
 * 卸载子应用
 * @param {*} microApp
 * @param {*} updatingPromise
 */
function unmountMicroApp(microApp, updatingPromise) {
  if (microApp) {
    microApp.mountPromise.then(() => {
      switch (microApp.getStatus()) {
        case 'MOUNTED':
          microApp.unmount();
          break;
        case 'UPDATING':
          // UPDATING 阶段 updatingPromise 一定存在
          updatingPromise.then(() => microApp.unmount());
          break;
        default:
          break;
      }
    });
  }
}

let noneMounted = true;

const qiankGlobalUncaughtErrorHandler = (event) => {
  console.log('[@szzj/ones qiankun]', event);
};

/**
 * vue2 版本 MicroApp
 * @chore 相较于 plugin-qiankun 插件，通过 vuex 允许通过 useQiankunStateForSlave 共享数据
 * @chore 相较于 plugin-qiankun 插件，访问 microApp 方式变更为 this.$refs.getMicroApp()，需要对 MicroApp 设置 ref 引用
 * @chore 相较于 plugin-qiankun 插件，内置 Loading，不允许定制。移除 loader、autoSetLoading 属性
 * @chore 相较于 plugin-qiankun 插件，内置 ErrorBoundary，不允许定制。移除 errorBoundary、autoCaptureError 属性
 * @chore 相较于 plugin-qiankun 插件，不再支持 appNameKeyAlias 配置（对 app 的 name 字段设置别名）
 */
export default {
  components: {
    Loading,
    ErrorBoundary,
  },
  props: {
    name: String,
    setting: Object,
    lifeCycles: Object,
    // history: 'hash',
    getMatchedBase: Function,
    onHistoryInit: Function,
    /** 外层容器样式类，与 plugin-qiankun 一致命名 */
    wrapperClassName: String,
    /** 样式类，与 plugin-qiankun 一致命名 */
    className: String,
    extraProps: Object,
  },
  data: () => {
    return {
      /** 加载中状态 */
      loading: false,
      /** 错误信息 */
      error: null,
    };
  },
  computed: {},
  methods: {
    getMicroApp() {
      return this.$refs.microApp;
    },
    isCurrentApp(app) {
      return app.name === this.name;
    },
    loadMicroApps() {
      console.dir(this);
      const self = this;
      self.error = null;
      self.loading = true;

      const {
        masterHistoryType = 'hash',
        apps = [],
        lifeCycles: globalLifeCycles,
        prefetch = true,
        prefetchThreshold = 5,
        ...globalSettings
      } = getMasterOptions();

      const appConfig = apps.find((app) => app.name === this.name);
      const {
        entry,
        props: { settings: settingsFromConfig = {}, ...propsFromConfig } = {},
      } = appConfig || {};

      const {
        settings: settingsFromProps = {},
        loader,
        errorBoundary,
        lifeCycles,
        wrapperClassName,
        className,
        ...propsFromParams
      } = self._props;

      const configuration = {
        globalContext: window,
        ...globalSettings,
        ...settingsFromConfig,
        ...settingsFromProps,
      };

      // 加载子应用
      self.$refs.microApp = loadMicroApp(
        {
          name: this.name,
          entry,
          container: this.$refs.container,
          props: {
            ...propsFromConfig,
            /**
             * 通过 store 支持 src/app.ts/useQiankunStateForSlave
             */
            ...stateForSlave,
            // 其余的 props 参数
            ...propsFromParams,
            __globalRoutesInfo: {
              masterHistoryType,
              base: globalSettings.base,
              microAppRoutes: globalSettings.microAppRoutes,
            },
            // 子应用渲染过程中，基于向下传递的 autoSetLoading 为真值
            // 调用 setLoading 更新加载状态
            autoSetLoading: true,
            setLoading: (loading) => (self.loading = loading),
            autoCaptureError: true,
          },
        },
        configuration,
        mergeWith({}, globalLifeCycles, this.lifeCycles, (v1, v2) =>
          concat(v1 ?? [], v2 ?? []),
        ),
      );

      // 当配置了 prefetch true 时，在第一个应用 mount 完成之后，再去预加载其他应用
      if (prefetch && prefetch !== 'all' && noneMounted) {
        self.$refs.microApp?.mountPromise.then(() => {
          if (noneMounted) {
            if (Array.isArray(prefetch)) {
              const specialPrefetchApps = apps.filter(
                (app) => !this.isCurrentApp(app) && prefetch.indexOf(app.name) !== -1,
              );
              prefetchApps(specialPrefetchApps, configuration);
            } else {
              // 不能无脑全量 prefetch，需要有一个阈值
              const otherNotMountedApps = apps
                .filter((app) => !this.isCurrentApp(app))
                .slice(0, prefetchThreshold);
              prefetchApps(otherNotMountedApps, configuration);
            }
            noneMounted = false;
          }
        });
      }

      const { microApp } = self.$refs;

      /**
       * @fixme 无法捕获错误问题
       */
      [('loadPromise', 'bootstrapPromise', 'mountPromise')].forEach((key) => {
        const promise = microApp?.[key];
        promise.catch((e) => {
          self.error = e;
          self.loading = false;
        });
      });
    },
  },
  mounted() {
    const { apps = [] } = getMasterOptions();
    const appConfig = apps.find((app) => app.name === this.name);

    if (!appConfig) {
      this.error = new Error(
        `[@umijs/plugin-qiankun-vue2]: Can not find the configuration of ${this.name} app!`,
      );
    }

    if (process.env.NODE_ENV === 'development') {
      addGlobalUncaughtErrorHandler(qiankGlobalUncaughtErrorHandler);
    }

    this.loadMicroApps();
  },
  beforeDestroy() {
    unmountMicroApp(this.$refs.microApp, this.$refs.updatingPromise);
    removeGlobalUncaughtErrorHandler(qiankGlobalUncaughtErrorHandler);
  },
  errorCaptured(err) {
    console.log(err);
    return false;
  },
  watch: {
    name: {
      handler() {
        this.loadMicroApps();
      },
    },
    extraProps(current) {
      const microApp = this.$refs.microApp;

      if (microApp) {
        if (!this.$refs.updatingPromise) {
          // 初始化 updatingPromise 为 microApp.mountPromise，从而确保后续更新是在应用 mount 完成之后
          this.$refs.updatingPromise = microApp.mountPromise;
        } else {
          // 确保 microApp.update 调用是跟组件状态变更顺序一致的，且后一个微应用更新必须等待前一个更新完成
          this.$refs.updatingPromise = this.$refs.updatingPromise.then(() => {
            const canUpdate = (microApp) =>
              microApp?.update && microApp.getStatus() === 'MOUNTED';
            if (canUpdate(microApp)) {
              const props = {
                ...propsFromConfig,
                ...stateForSlave,
                ...propsFromParams,
                __globalRoutesInfo: {
                  masterHistoryType,
                  base: globalSettings.base,
                  microAppRoutes: globalSettings.microAppRoutes,
                },
                setLoading,
              };

              if (process.env.NODE_ENV === 'development') {
                if (Date.now() - this.$refs.updatingTimestamp < 200) {
                  console.warn(
                    `[@umijs/plugin-qiankun-vue2] It seems like microApp ${this.name} is updating too many times in a short time(200ms), you may need to do some optimization to avoid the unnecessary re-rendering.`,
                  );
                }

                console.info(
                  `[@umijs/plugin-qiankun-vue2] MicroApp ${this.name} is updating with props: `,
                  props,
                );
                this.$refs.updatingTimestamp = Date.now();
              }

              // 返回 microApp.update 形成链式调用
              // @ts-ignore
              return microApp.update(props);
            }

            return void 0;
          });
        }
      }
    },
  },
};
</script>
