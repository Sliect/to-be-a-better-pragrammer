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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_fs = require("fs");
var import_path = require("path");
var import_utils = require("@umijs/utils");
var import_postcss_px_to_viewport = __toESM(require("postcss-px-to-viewport"));
var DIR_NAME = "plugin-szh5";
var src_default = (api) => {
  api.describe({
    key: "szh5",
    config: {
      default: {
        onlyChunkHash: true,
        history: "hash",
        publicPath: "/",
        errorPages: {
          mode: "normal"
        }
      },
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            /**
             * 是否启用调试模式，工程会自动加载 eruda。如需使用 vconsole，请自行在工程中安装依赖
             */
            debug: Joi.boolean(),
            /**
             * 是否为浙里办 h5，应用会自动加载浙里办 jsbridge，埋点 bridge
             */
            zlb: Joi.boolean(),
            /**
             * 是否为浙政钉 h5，应用会自动加载埋点 bridge
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
             * 是否包含 403、404、500 等错误页面，需自行安装 antd-mobile 等
             */
            errorPages: Joi.alternatives().try(
              Joi.object({
                mode: Joi.string().required(),
                appBelong: Joi.string(),
                appAdmin: Joi.string(),
                appAdminMobile: Joi.string(),
                labelWidth: Joi.number(),
                totalWidth: Joi.number()
              }),
              Joi.boolean().invalid(true)
            )
          }),
          Joi.boolean().invalid(true)
        );
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles
    }
  });
  api.modifyDefaultConfig((memo) => {
    const { NODE_ENV } = process.env;
    const { szh5 = {} } = api.userConfig;
    const { history = "hash", publicPath = "/", onlyChunkHash = true, zlb, zzd } = szh5;
    let realPublicPath;
    if (zlb || zzd) {
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
      externals: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production" || zlb || zzd ? void 0 : {
        react: "window.React",
        "react-dom": "window.ReactDOM"
      },
      /** 提升编译速度 */
      /** 减少打包体积 */
      ignoreMomentLocale: true,
      /** 减少打包体积 */
      extraPostCSSPlugins: [
        (0, import_postcss_px_to_viewport.default)({
          viewportWidth: 375,
          viewportHeight: 667,
          unitPrecision: 5,
          viewportUnit: "vw",
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false
        })
      ],
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
    const { debug } = api.config.szh5;
    if (!debug)
      return "";
    return `import eruda from 'eruda';
    eruda.init();`;
  });
  api.onGenerateFiles(() => {
    const { absTmpPath } = api.paths;
    const cwd = (0, import_path.join)(__dirname, "../src/gens");
    const files = import_utils.glob.sync("**/*", {
      cwd
    });
    const base = (0, import_path.join)(absTmpPath, DIR_NAME, "");
    import_utils.fsExtra.mkdirpSync(base);
    files.forEach((file) => {
      const source = (0, import_path.join)(cwd, file);
      const target = (0, import_path.join)(base, file);
      if ((0, import_fs.statSync)(source).isDirectory()) {
        import_utils.fsExtra.mkdirpSync(target);
      } else {
        (0, import_fs.copyFileSync)(source, target);
      }
    });
    if (api.config.szh5) {
      const arr = ["403", "404", "500"];
      const { errorPages } = api.config.szh5;
      const { mode, appBelong, appAdmin, appAdminMobile, labelWidth, totalWidth } = errorPages;
      arr.forEach((status) => {
        api.writeTmpFile({
          path: (0, import_path.join)(status, "index.tsx"),
          content: `import { ErrorPage } from '@szzj/components-mobile';
    
export default function Page${status}() {
  return <ErrorPage 
    mode="${mode}" 
    status="${status}" 
    appBelong=${appBelong ? `"${appBelong}"` : `{${void 0}}`}
    appAdmin=${appAdmin ? `"${appAdmin}"` : `{${void 0}}`}
    appAdminMobile=${appAdminMobile ? `"${appAdminMobile}"` : `{${void 0}}`}
    totalWidth=${totalWidth ? `{${totalWidth}}` : `{${void 0}}`}
    labelWidth=${labelWidth ? `{${labelWidth}}` : `{${void 0}}`}
  />;
}`
        });
      });
    }
  });
  api.addLayouts(() => {
    const { absTmpPath } = api.paths;
    return [
      {
        id: "titleLayout",
        file: (0, import_utils.winPath)((0, import_path.join)(absTmpPath, DIR_NAME, "TitleLayout/index.tsx"))
      }
    ];
  });
  api.modifyRoutes((memo) => {
    const { absTmpPath } = api.paths;
    const { errorPages } = api.config.szh5;
    if (errorPages) {
      memo["403"] = {
        id: "403",
        path: "/403",
        absPath: "/403",
        file: (0, import_utils.winPath)((0, import_path.join)(absTmpPath, DIR_NAME, "403/index.tsx")),
        exact: true
      };
      memo["404"] = {
        id: "404",
        path: "/404",
        absPath: "/404",
        file: (0, import_utils.winPath)((0, import_path.join)(absTmpPath, DIR_NAME, "404/index.tsx")),
        exact: true
      };
      memo["500"] = {
        id: "500",
        path: "/500",
        absPath: "/500",
        file: (0, import_utils.winPath)((0, import_path.join)(absTmpPath, DIR_NAME, "500/index.tsx")),
        exact: true
      };
    }
    return memo;
  });
  api.addHTMLHeadScripts(() => {
    const { zlb } = api.config.szh5;
    return zlb ? [
      {
        src: "//assets.zjzwfw.gov.cn/assets/ZWJSBridge/1.1.0/zwjsbridge.js"
      },
      {
        src: "//assets.zjzwfw.gov.cn/assets/zwlog/1.0.0/zwlog.js"
      }
    ] : [];
  });
  api.addHTMLHeadScripts(() => {
    const { zzd } = api.config.szh5;
    return zzd ? [
      {
        src: "//wpk-gate.zjzwfw.gov.cn/static/wpk-jssdk.1.0.2/wpkReporter.js"
      }
    ] : [];
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
