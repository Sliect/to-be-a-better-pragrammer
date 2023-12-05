import { join } from 'path';
import { winPath } from '@umijs/utils';
import { genLayoutContainer, genLayoutApi, genDefaultRender, genTypes } from './generate';
import type { IApi } from 'umi';
import type { Route } from './types';

const DIR_NAME = 'plugin-szlayout';

const getRoutes = (
  files: string[],
  {
    prefix,
    path,
  }: {
    prefix: string;
    path: string;
  },
) => {
  const routes = {};
  let lastRoute: any = undefined;
  files.reduceRight((prev: any, curr: string, index: number) => {
    const route = {
      id: `${prefix}${index}`,
      key: `${prefix}${index}`,
      path,
      absPath: path,
      file: curr,
    };
    routes[`${prefix}${index}`] = route;

    if (!lastRoute) lastRoute = route;
    if (prev) prev.parentId = `${prefix}${index}`;

    return route;
  }, undefined);

  return {
    routes,
    lastRoute,
  };
};

export default (api: IApi) => {
  api.describe({
    key: 'szlayout',
    config: {
      default: {
        layout: 'sider',
        base: '/',
        menuBase: '/',
      },
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            /** wrapper */
            wrapper: Joi.string(),
            /** 包裹 layout 的 base 路由 */
            base: Joi.string(),
            /** 显示菜单的 base 路由 */
            menusBase: Joi.string(),
            /** 仅包含头尾、不包含菜单的页面路由 */
            excludes: Joi.array(),
            /** 布局模式，mix 混合，sider 侧边栏，header 头部，inner-sider 内部侧边栏 */
            layout: Joi.string(),
            /** 面包屑模式，simple 简单，complex 复杂 */
            breadcrumbsMode: Joi.string(),
            /** 是否展示面包屑 */
            doNotRenderBreadcrumbs: Joi.boolean(),
            /** 标题 */
            title: Joi.string(),
            /** logo */
            logo: Joi.string(),
            /** 页尾 */
            copyright: Joi.string(),
          }),
          Joi.boolean().invalid(true),
        );
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
    enableBy: () =>
      'szlayout' in api.userConfig ? api.userConfig.szlayout : api.config?.szlayout,
  });

  api.onGenerateFiles(() => {
    const {
      wrapper,
      base = '/',
      menusBase = '/',
      excludes,
      ...rest
    } = api.config.szlayout;
    let defaultExcludes = ['/403', '/404', '/500'];

    /**
     * 比如 odlab 指定 /console 内页展示菜单，menusBase = '/console' 以外的页面无需展示菜单
     */
    if (menusBase !== base) {
      defaultExcludes = (api.userConfig.routes ?? [])
        .filter((route: Route) => route.path !== menusBase)
        .map((route: Route) => route.path)
        // 显式排除 403 等页面
        .concat(defaultExcludes);
    }

    api.writeTmpFile({
      path: 'Layout.tsx',
      content: genLayoutContainer({
        ...rest,
        base: menusBase ?? base,
        excludes: excludes ?? defaultExcludes,
        routes: [
          {
            key: 'szzjLayout_base',
            path: base,
            routes: api.userConfig.routes,
          },
        ],
      }),
    });

    api.writeTmpFile({
      path: 'index.ts',
      content: genLayoutApi(),
    });

    api.writeTmpFile({
      path: 'DefaultRender.tsx',
      content: genDefaultRender(),
    });

    api.writeTmpFile({
      path: 'types.d.ts',
      content: genTypes(),
    });
  });

  api.modifyRoutes((routes: any) => {
    const { wrapper, base = '/', menusBase = '/' } = api.config.szlayout;
    const wrapperFiles = wrapper
      ? [winPath(wrapper[0] === '@' ? wrapper : join(api.paths.absSrcPath!, wrapper))]
      : [];

    const routesArr = Object.keys(routes).map((id) => routes[id]);

    if (menusBase === base) {
      const level0Routes = routesArr
        .filter((route) => !route.parentId)
        .map((route) => {
          route.key = route.id;
          return route;
        });

      const topRoute: any = {
        id: 'szzjLayout_top',
        key: 'szzjLayout_top',
        path: base,
        absPath: base,
        file: winPath(join(api.paths.absTmpPath || '', DIR_NAME, 'Layout.tsx')),
      };

      let { routes: topWrapperRoutes, lastRoute: lastTopWrapperRoute } = getRoutes(
        wrapperFiles,
        { prefix: 'szzjLayout_topWrapper', path: menusBase },
      );
      if (wrapperFiles?.length) {
        topRoute.parentId = lastTopWrapperRoute?.id;
      }

      level0Routes.forEach((route) => {
        route.parentId = topRoute.id;
      });

      return {
        ...topWrapperRoutes,
        top: topRoute,
        ...routes,
      };
    }

    // @FIXME，menusBase 不支持与 base 不同，须处理
    // const matchedRoute = routesArr.find((route) => route.path === menusBase);
    // if (matchedRoute) {
    //   // layout 中的 wrapper 位于首位，这样可以提前处理全局状态
    //   matchedRoute.wrappers = [...wrapperFiles, ...(matchedRoute.wrappers || [])];
    //   matchedRoute.parentId = lastTopWrapperRoute.id;

    //   if (matchedRoute.component.component) {
    //     throw new Error(`path ${menusBase} should not config with a component!`);
    //   }

    //   // 没有 component，wrappers 会失效
    //   matchedRoute.component = winPath(
    //     join(api.paths.absTmpPath || '', DIR_NAME, 'Layout.tsx'),
    //   );
    // }

    return routes;
  });
};
