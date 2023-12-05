var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/plugin.ts
var plugin_exports = {};
__export(plugin_exports, {
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_debug = __toESM(require("debug"));
var import_withTmpPath = require("./utils/withTmpPath");
var { NODE_ENV } = process.env;
var IS_LOCAL = NODE_ENV === "development";
var debug = (0, import_debug.default)("@szzj/umi-plugin-szsubapp");
var plugin_default = (api) => {
  api.describe({
    key: "szsubapp",
    config: {
      default: {
        devMode: "app"
      },
      schema(joi) {
        return joi.object({
          /** 本地开发模式，app 作为独立应用调试，subapp 作为子应用调试，布局需由主应用提供 */
          devMode: joi.string(),
          /** 子应用名，不设置会使用 package.json 中的 name 值 */
          name: joi.string(),
          /** 资源加载路径 */
          publicPath: joi.string(),
          /** 后端服务地址 */
          proxyTarget: joi.string(),
          /** 是否需要 Layout.Content 包裹 */
          hasNotLayoutContent: joi.boolean(),
          /** 请求前缀是否携带子应用标识 */
          prefixWithSubappName: joi.boolean()
        });
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles
    }
  });
  api.modifyDefaultConfig((memo) => {
    var _a;
    const name = ((_a = api.userConfig.szsubapp) == null ? void 0 : _a.name) ? api.userConfig.szsubapp.name : api.pkg.name;
    const {
      devMode = "app",
      proxyTarget,
      publicPath,
      prefixWithSubappName
    } = api.userConfig.szsubapp || {};
    debug("NODE_ENV is %o", NODE_ENV);
    debug("subapp name is %o", name);
    debug("devMode is %o", devMode);
    debug("proxyTarget is %o", proxyTarget);
    debug("publicPath is %o", publicPath);
    debug("prefixWithSubappName is %o", prefixWithSubappName);
    const routerBase = IS_LOCAL && devMode === "app" ? "/" : `/${name}`;
    const result = {
      ...memo,
      history: {
        type: "hash"
      },
      szapp: {
        history: "hash",
        publicPath,
        errorPages: false
      },
      szlayout: IS_LOCAL && devMode === "app" ? {
        layout: "sider",
        breadcrumbsMode: "simple",
        title: `子应用 ${name}`,
        copyright: `@子应用 ${name}`,
        userName: "本地模拟用户",
        logo: "https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg",
        base: `/`,
        excludes: []
      } : false,
      szrequest: {
        prefix: `${IS_LOCAL ? "/api" : ""}${prefixWithSubappName && name ? "/" + name : ""}`,
        proxyTarget
      },
      base: routerBase,
      mountElementId: `subapp-${name}`,
      headScripts: IS_LOCAL && devMode === "app" ? [
        "https://unpkg.com/react@18.2.0/umd/react.production.min.js",
        "https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js",
        {
          content: `window.routerBase = "${routerBase}"`,
          charset: "utf-8"
        }
      ] : [
        {
          content: `window.routerBase = "${routerBase}"`,
          charset: "utf-8"
        }
      ],
      externals: {
        react: {
          root: "React",
          commonjs2: "react",
          commonjs: "react",
          amd: "react"
        },
        "react-dom": {
          root: "ReactDOM",
          commonjs2: "ReactDOM",
          commonjs: "ReactDOM",
          amd: "ReactDOM"
        }
      }
    };
    return result;
  });
  api.onGenerateFiles(() => {
    const { hasNotLayoutContent = false } = api.userConfig.szsubapp ?? {};
    const { antd } = api.pkg.dependencies;
    const hasAntd5 = antd.match(/^[\^]?5\./);
    debug("hasNotLayoutContent is %o", hasNotLayoutContent);
    if (hasNotLayoutContent || IS_LOCAL) {
      api.writeTmpFile({
        path: "runtime.tsx",
        content: `import React from 'react';
import { ConfigProvider } from 'antd';
${hasAntd5 ? "import zh_CN from 'antd/locale/zh_CN';" : "import zh_CN from 'antd/es/locale/zh_CN';"}

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider locale={zh_CN}>
      {container}
    </ConfigProvider>
  );
}`
      });
    } else {
      api.writeTmpFile({
        path: "runtime.tsx",
        content: `import React from 'react';
import { ConfigProvider, Layout } from 'antd';
${hasAntd5 ? "import zh_CN from 'antd/locale/zh_CN';" : "import zh_CN from 'antd/es/locale/zh_CN';"}

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider locale={zh_CN}>
      <Layout.Content style={{ minHeight: 'calc(100vh - 175px)', margin: '24px 16px 0' }}>
        {container}
      </Layout.Content>
    </ConfigProvider>
  );
}`
      });
    }
  });
  api.addRuntimePlugin(() => {
    return [(0, import_withTmpPath.withTmpPath)({ api, path: "runtime.tsx" })];
  });
  if (IS_LOCAL) {
    api.addHTMLStyles(() => {
      return [
        {
          content: `
            .ant-layout.ly { height: inherit; }
            .ant-layout-content.ly-content { background: inherit; padding: inherit; min-height: calc(100vh - 176px); margin: 24px 16px 0; }
            .breadcrumbs.breadcrumbs-simple { margin: 16px 0 0px 16px; }
          `
        }
      ];
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
