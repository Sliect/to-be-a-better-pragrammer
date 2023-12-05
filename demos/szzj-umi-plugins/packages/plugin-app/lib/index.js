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
var DIR_NAME = "plugin-szapp";
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, function(match, letter) {
    return letter.toUpperCase();
  });
}
var src_default = (api) => {
  api.describe({
    key: "szapp",
    config: {
      default: {
        onlyChunkHash: true,
        history: "hash",
        publicPath: "/",
        errorPages: true,
        errorBoundary: false
      },
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            /**
             * 是否启用调试模式，工程会自动加载 eruda。如需使用 vconsole，请自行在工程中安装依赖
             */
            debug: Joi.boolean(),
            /**
             * 是否为政务网 pc 端页面，应用会自动加载政务网页面头尾内容
             */
            zwfw: Joi.boolean(),
            /**
             * 是否为浙政钉 pc 端页面，应用会自动加载埋点 bridge
             */
            zzd: Joi.boolean(),
            /**
             * 路由模式，默认使用 hash 路由
             */
            history: Joi.string(),
            /**
             * publicPath，开发环境始终会使用 '/'
             */
            publicPath: Joi.string(),
            /**
             * 入口文件名打包后是否不包含 hash 值
             */
            onlyChunkHash: Joi.boolean(),
            /**
             * 是否包含 403、404、500 等错误页面，需自行安装 antd 等
             */
            errorPages: Joi.alternatives().try(
              Joi.object({
                /**
                 * 应用归属单位，浙政钉规范需要
                 */
                belong: Joi.string(),
                /**
                 * 应用管理员，浙政钉规范需要
                 */
                manager: Joi.string(),
                /**
                 * 联系方式，浙政钉规范需要
                 */
                mobile: Joi.string()
              }),
              Joi.boolean()
            ),
            /**
             * 是否启用异常捕获，展示友好错误信息防止白屏
             */
            errorBoundary: Joi.boolean()
          }),
          Joi.boolean().invalid(true)
        );
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles
    }
  });
  api.modifyDefaultConfig((memo) => {
    const { NODE_ENV } = process.env;
    const { szapp = {} } = api.userConfig;
    const { history = "hash", publicPath = "/", onlyChunkHash = true, zzd } = szapp;
    let realPublicPath;
    if (zzd) {
      realPublicPath = NODE_ENV === "production" ? "./" : "/";
    } else {
      realPublicPath = NODE_ENV === "production" ? publicPath : "/";
    }
    return {
      ...memo,
      history: NODE_ENV !== "production" ? { type: "hash" } : {
        type: history
      },
      // 配置驼峰式使用
      cssLoaderModules: {
        exportLocalsConvention: "camelCase"
      },
      publicPath: realPublicPath,
      targets: { chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10, ie: 11 },
      // 当 targets 中有 ie 时，不支持 esbuild。build 时会提醒，dev 不提醒
      jsMinifier: "terser",
      /** 提升编译速度 */
      externals: process.env.NODE_ENV === "development" || zzd ? void 0 : {
        react: "window.React",
        "react-dom": "window.ReactDOM"
      },
      /** 提升编译速度 */
      /** 减少打包体积 */
      ignoreMomentLocale: true,
      /** 减少打包体积 */
      chainWebpack(config) {
        if (!onlyChunkHash)
          config.output.filename(`[name].[contenthash:8].js`);
        config.output.chunkFilename(`[name].[contenthash:8].async.js`);
        config.plugin("mini-css-extract-plugin").tap(() => {
          return [
            {
              filename: onlyChunkHash ? `[name].css` : `[name].[contenthash:8].css`,
              chunkFilename: `[name].[contenthash:8].chunk.css`,
              ignoreOrder: true
            }
          ];
        });
      },
      verifyCommit: {
        scope: [
          "feat",
          "fix",
          "docs",
          "style",
          "refactor",
          "perf",
          "test",
          "build",
          "ci",
          "chore",
          "revert"
        ],
        allowEmoji: true
      }
    };
  });
  api.addEntryCode(() => {
    const { debug } = api.config.szapp;
    if (!debug)
      return "";
    return `import eruda from 'eruda';
eruda.init();`;
  });
  api.onGenerateFiles(() => {
    if (api.config.szapp) {
      const { errorPages } = api.config.szapp;
      if (errorPages) {
        const errorPagesConfig = typeof errorPages !== "boolean" ? errorPages : {};
        const { belong, manager, mobile } = errorPagesConfig;
        const arr = ["403", "404", "500", "network-error", "building"];
        arr.forEach((status) => {
          api.writeTmpFile({
            path: (0, import_path.join)(toCamelCase(status), "index.tsx"),
            content: `import React from 'react';
import { Result } from '@szzj/components';

export default () => {
  return <Result 
    code="${status}" 
    belong=${belong ? `"${belong}"` : `{undefined}`}
    manager=${manager ? `"${manager}"` : `{undefined}`}
    mobile=${mobile ? `"${mobile}"` : `{undefined}`}
  />;
};`
          });
        });
      }
    }
    api.writeTmpFile({
      path: "ErrorBoundary/index.tsx",
      content: `import React from 'react';
import { Outlet } from 'umi';
import { ErrorBoundary } from '@szzj/components';

export default () => {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};`
    });
    api.writeTmpFile({
      path: "index.ts",
      content: `import { Loading } from '@szzj/components';

export { Loading };`
    });
  });
  api.addLayouts((args) => {
    const { szapp = {} } = api.config;
    const { errorBoundary } = szapp;
    if (errorBoundary) {
      const { absTmpPath } = api.paths;
      return [
        {
          id: "errorBoundary",
          file: (0, import_utils.winPath)((0, import_path.join)(absTmpPath, DIR_NAME, "ErrorBoundary/index.tsx"))
        }
      ];
    }
    return [];
  });
  api.modifyRoutes((memo) => {
    const { absTmpPath } = api.paths;
    const { errorPages } = api.config.szapp;
    if (errorPages) {
      const found = Object.keys(memo).map((k) => memo[k]).find((route) => !!route.isLayout);
      memo["403"] = {
        id: "403",
        path: "/403",
        absPath: "/403",
        file: (0, import_utils.winPath)((0, import_path.join)(absTmpPath, DIR_NAME, "403/index.tsx")),
        exact: true,
        parentId: found == null ? void 0 : found.id
      };
      memo["404"] = {
        id: "404",
        path: "/404",
        absPath: "/404",
        file: (0, import_utils.winPath)((0, import_path.join)(absTmpPath, DIR_NAME, "404/index.tsx")),
        exact: true,
        parentId: found == null ? void 0 : found.id
      };
      memo["500"] = {
        id: "500",
        path: "/500",
        absPath: "/500",
        file: (0, import_utils.winPath)((0, import_path.join)(absTmpPath, DIR_NAME, "500/index.tsx")),
        exact: true,
        parentId: found == null ? void 0 : found.id
      };
      memo["networkError"] = {
        id: "networkError",
        path: "/networkError",
        absPath: "/networkError",
        file: (0, import_utils.winPath)((0, import_path.join)(absTmpPath, DIR_NAME, "networkError/index.tsx")),
        exact: true,
        parentId: found == null ? void 0 : found.id
      };
      memo["building"] = {
        id: "building",
        path: "/building",
        absPath: "/building",
        file: (0, import_utils.winPath)((0, import_path.join)(absTmpPath, DIR_NAME, "building/index.tsx")),
        exact: true,
        parentId: found == null ? void 0 : found.id
      };
    }
    return memo;
  });
  api.addHTMLHeadScripts(() => {
    const { zwfw } = api.config.szapp;
    return zwfw ? [
      {
        src: "//zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web3096/site/script/1136/2012241433372250.js"
      }
    ] : [];
  });
  api.addHTMLScripts(() => {
    const { zwfw } = api.config.szapp;
    return zwfw ? [
      {
        src: "//zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web3096/site/script/1145/2101141427284013.js"
      }
    ] : [];
  });
  api.addHTMLHeadScripts(() => {
    const { zzd } = api.config.szapp;
    return zzd ? [
      {
        src: "//wpk-gate.zjzwfw.gov.cn/static/wpk-jssdk.1.0.2/wpkReporter.js"
      }
    ] : [];
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
