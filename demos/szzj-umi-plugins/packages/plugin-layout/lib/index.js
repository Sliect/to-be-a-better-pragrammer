var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_path = require("path");
var import_utils = require("@umijs/utils");
var import_generate = require("./generate");
var DIR_NAME = "plugin-szlayout";
var getRoutes = (files, {
  prefix,
  path
}) => {
  const routes = {};
  let lastRoute = void 0;
  files.reduceRight((prev, curr, index) => {
    const route = {
      id: `${prefix}${index}`,
      key: `${prefix}${index}`,
      path,
      absPath: path,
      file: curr
    };
    routes[`${prefix}${index}`] = route;
    if (!lastRoute)
      lastRoute = route;
    if (prev)
      prev.parentId = `${prefix}${index}`;
    return route;
  }, void 0);
  return {
    routes,
    lastRoute
  };
};
var src_default = (api) => {
  api.describe({
    key: "szlayout",
    config: {
      default: {
        layout: "sider",
        base: "/",
        menuBase: "/"
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
            copyright: Joi.string()
          }),
          Joi.boolean().invalid(true)
        );
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles
    },
    enableBy: () => {
      var _a;
      return "szlayout" in api.userConfig ? api.userConfig.szlayout : (_a = api.config) == null ? void 0 : _a.szlayout;
    }
  });
  api.onGenerateFiles(() => {
    const {
      wrapper,
      base = "/",
      menusBase = "/",
      excludes,
      ...rest
    } = api.config.szlayout;
    let defaultExcludes = ["/403", "/404", "/500"];
    if (menusBase !== base) {
      defaultExcludes = (api.userConfig.routes ?? []).filter((route) => route.path !== menusBase).map((route) => route.path).concat(defaultExcludes);
    }
    api.writeTmpFile({
      path: "Layout.tsx",
      content: (0, import_generate.genLayoutContainer)({
        ...rest,
        base: menusBase ?? base,
        excludes: excludes ?? defaultExcludes,
        routes: [
          {
            key: "szzjLayout_base",
            path: base,
            routes: api.userConfig.routes
          }
        ]
      })
    });
    api.writeTmpFile({
      path: "index.ts",
      content: (0, import_generate.genLayoutApi)()
    });
    api.writeTmpFile({
      path: "DefaultRender.tsx",
      content: (0, import_generate.genDefaultRender)()
    });
    api.writeTmpFile({
      path: "types.d.ts",
      content: (0, import_generate.genTypes)()
    });
  });
  api.modifyRoutes((routes) => {
    const { wrapper, base = "/", menusBase = "/" } = api.config.szlayout;
    const wrapperFiles = wrapper ? [(0, import_utils.winPath)(wrapper[0] === "@" ? wrapper : (0, import_path.join)(api.paths.absSrcPath, wrapper))] : [];
    const routesArr = Object.keys(routes).map((id) => routes[id]);
    if (menusBase === base) {
      const level0Routes = routesArr.filter((route) => !route.parentId).map((route) => {
        route.key = route.id;
        return route;
      });
      const topRoute = {
        id: "szzjLayout_top",
        key: "szzjLayout_top",
        path: base,
        absPath: base,
        file: (0, import_utils.winPath)((0, import_path.join)(api.paths.absTmpPath || "", DIR_NAME, "Layout.tsx"))
      };
      let { routes: topWrapperRoutes, lastRoute: lastTopWrapperRoute } = getRoutes(
        wrapperFiles,
        { prefix: "szzjLayout_topWrapper", path: menusBase }
      );
      if (wrapperFiles == null ? void 0 : wrapperFiles.length) {
        topRoute.parentId = lastTopWrapperRoute == null ? void 0 : lastTopWrapperRoute.id;
      }
      level0Routes.forEach((route) => {
        route.parentId = topRoute.id;
      });
      return {
        ...topWrapperRoutes,
        top: topRoute,
        ...routes
      };
    }
    return routes;
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
