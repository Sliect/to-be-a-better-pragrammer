// @ts-nocheck
/* eslint-disable */
import { Component } from 'vue';
import { type IRouteProps } from 'umi';

export const defaultMountContainerId = 'root-subapp';

// @formatter:off
export const noop = () => {};
// @formatter:on

export function toArray<T>(source: T | T[]): T[] {
  return Array.isArray(source) ? source : [source];
}

export function patchMicroAppRoute(
  route: any,
  getMicroAppRouteComponent: (opts: {
    appName: string;
    base: string;
    routePath: string;
    masterHistoryType: string;
    routeProps?: any;
  }) => string | Component<any>,
  masterOptions: {
    base: string;
    masterHistoryType: string;
    routeBindingAlias: string;
  },
) {
  const { base, masterHistoryType, routeBindingAlias } = masterOptions;
  // 当配置了 routeBindingAlias 时，优先从 routeBindingAlias 里取配置，但同时也兼容使用了默认的 microApp 方式
  const microAppName = route[routeBindingAlias] || route.microApp;
  const microAppProps =
    route[`${routeBindingAlias}Props`] || route.microAppProps || {};
  if (microAppName) {
    if (route.children?.length) {
      const childrenRouteHasComponent = route.children.some(
        (r: any) => r.element,
      );
      if (childrenRouteHasComponent) {
        throw new Error(
          `[@umijs/plugin-qiankun-vue2]: You can not attach micro app ${microAppName} to route ${route.path} whose children has own component!`,
        );
      }
    }

    // 自动追加通配符，匹配子应用的路由
    if (!route.path.endsWith('/*')) {
      route.path = route.path.replace(/\/?$/, '/*');
    }

    const { settings = {}, ...componentProps } = microAppProps;
    const routeProps = {
      // 兼容以前的 settings 配置
      settings: route.settings || settings || {},
      ...componentProps,
    };
    const opts = {
      appName: microAppName,
      base,
      routePath: route.path,
      masterHistoryType,
      routeProps,
    };

    /**
     * qiankun.master 不再支持 routes 配置
     * @todo 使用 Vue-Router 重定向
     */
    // route.element = Vue.createElement(getMicroAppRouteComponent(opts), null);
  } else if (route.redirect) {
    /**
     * qiankun.master 不再支持 routes 配置
     * @todo 使用 Vue-Router 重定向
     */
    // patchClientRoutes 插入的 redirect 不会被转换，所以这里需要手动处理成重定向组件
    // route.element = React.createElement(Navigate, {
    //   to: route.redirect,
    //   replace: true,
    // });
  }
}

const recursiveSearch = (
  routes: IRouteProps[],
  path: string,
  parentPath: string,
): [IRouteProps, IRouteProps[], number, string] | null => {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path === path) {
      return [routes[i], routes, i, parentPath];
    }
    if (routes[i].children && routes[i].children?.length) {
      const found = recursiveSearch(
        routes[i].children || [],
        path,
        routes[i].path,
      );
      if (found) {
        return found;
      }
    }
  }
  return null;
};

export function insertRoute(routes: IRouteProps[], microAppRoute: IRouteProps) {
  const mod =
    microAppRoute.appendChildTo || microAppRoute.insert
      ? 'appendChildTo'
      : microAppRoute.insertBefore
      ? 'insertBefore'
      : undefined;
  const target =
    microAppRoute.appendChildTo ||
    microAppRoute.insert ||
    microAppRoute.insertBefore;
  const [found, foundParentRoutes = [], index = 0, parentPath] =
    recursiveSearch(routes, target, '/') || [];
  if (found) {
    switch (mod) {
      case 'appendChildTo':
        if (
          !microAppRoute.path ||
          !found.path ||
          !microAppRoute.path.startsWith(found.path)
        ) {
          throw new Error(
            `[plugin-qiankun]: path "${microAppRoute.path}" need to starts with "${found.path}"`,
          );
        }
        found.exact = false;
        found.children = found.children || [];
        found.children.push(microAppRoute);
        break;
      case 'insertBefore':
        if (
          !microAppRoute.path ||
          !found.path ||
          !microAppRoute.path.startsWith(parentPath)
        ) {
          throw new Error(
            `[plugin-qiankun]: path "${microAppRoute.path}" need to starts with "${parentPath}"`,
          );
        }
        foundParentRoutes.splice(index, 0, microAppRoute);
        break;
    }
  } else {
    throw new Error(`[plugin-qiankun]: path "${target}" not found`);
  }
}
