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

// src/qiankun/slave.ts
var slave_exports = {};
__export(slave_exports, {
  default: () => slave_default
});
module.exports = __toCommonJS(slave_exports);
var import_http_proxy_middleware = require("@umijs/bundler-utils/compiled/http-proxy-middleware");
var import_utils = require("@umijs/utils");
var import_assert = __toESM(require("assert"));
var import_fs = require("fs");
var import_path = require("path");
var import_umi = require("umi");
var import_plugin_utils = require("umi/plugin-utils");
var import_withTmpPath = require("../utils/withTmpPath");
var import_constants = require("./constants");
function getCurrentLocalDevServerEntry(api, req) {
  const port = api.appData.port;
  const hostname = req.hostname;
  const protocol = req.protocol;
  return `${protocol}://${hostname}${port ? ":" : ""}${port}/local-dev-server`;
}
function handleOriginalHtml(api, microAppEntry, originalHtml) {
  const appName = api.pkg.name;
  (0, import_assert.default)(appName, "[@umijs/plugin-qiankun]: You should have name in package.json");
  const $ = import_utils.cheerio.load(originalHtml);
  $("head").prepend(
    `<script>window.__QIANKUN_DEVELOPMENT__=true</script>
    <script type="extra-qiankun-config">${JSON.stringify({
      master: {
        apps: [
          {
            name: appName,
            entry: microAppEntry,
            extraSource: microAppEntry
          }
        ],
        routes: [
          {
            microApp: appName,
            name: appName,
            path: "/" + appName,
            extraSource: microAppEntry
          }
        ],
        prefetch: false
      }
    })}</script>`
  );
  return api.applyPlugins({
    key: "modifyMasterHTML",
    type: api.ApplyPluginsType.modify,
    initialValue: $.html()
  });
}
function isSlaveEnable(opts) {
  var _a, _b;
  const slaveCfg = (_b = (_a = opts.userConfig) == null ? void 0 : _a.qiankun) == null ? void 0 : _b.slave;
  if (slaveCfg) {
    return slaveCfg.enable !== false;
  }
  return !!process.env.INITIAL_QIANKUN_SLAVE_OPTIONS;
}
var slave_default = (api) => {
  api.describe({
    key: "qiankun-slave",
    enableBy: isSlaveEnable
  });
  api.addRuntimePlugin(() => {
    return [(0, import_withTmpPath.withTmpPath)({ api, path: "slaveRuntimePlugin.ts" })];
  });
  api.register({
    key: "addExtraModels",
    fn() {
      return [
        (0, import_withTmpPath.withTmpPath)({
          api,
          path: `qiankunModel.ts#{"namespace":"${import_constants.qiankunStateFromMasterModelNamespace}"}`
        })
      ];
    }
  });
  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: import_umi.RUNTIME_TYPE_FILE_NAME,
      content: `
interface LifeCycles {
    bootstrap?: (props?: any) => Promise<any>;
    mount?: (props?: any) => Promise<any>;
    unmount?: (props?: any) => Promise<any>;
    update?: (props?: any) => Promise<any>;
}
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);
interface SlaveOption extends LifeCycles {
    enable?: boolean;
}
interface Config {
    slave?: SlaveOption;
}
export interface IRuntimeConfig {
    qiankun?: XOR<Config, LifeCycles>
}
      `
    });
  });
  api.modifyDefaultConfig((memo) => {
    var _a, _b, _c, _d, _e;
    const initialSlaveOptions = {
      devSourceMap: true,
      ...JSON.parse(process.env.INITIAL_QIANKUN_SLAVE_OPTIONS || "{}"),
      ...(memo.qiankun || {}).slave
    };
    const modifiedDefaultConfig = {
      ...memo,
      // 默认开启 runtimePublicPath，避免出现 dynamic import 场景子应用资源地址出问题
      runtimePublicPath: true,
      qiankun: {
        ...memo.qiankun,
        slave: initialSlaveOptions
      }
    };
    const shouldNotModifyDefaultBase = ((_b = (_a = api.userConfig.qiankun) == null ? void 0 : _a.slave) == null ? void 0 : _b.shouldNotModifyDefaultBase) ?? initialSlaveOptions.shouldNotModifyDefaultBase;
    const historyType = ((_c = api.userConfig.history) == null ? void 0 : _c.type) || "browser";
    if (!shouldNotModifyDefaultBase && historyType !== "hash") {
      modifiedDefaultConfig.base = `/${api.pkg.name}`;
    }
    if (modifiedDefaultConfig.mfsu !== false) {
      modifiedDefaultConfig.mfsu = {
        ...modifiedDefaultConfig.mfsu,
        mfName: ((_d = modifiedDefaultConfig.mfsu) == null ? void 0 : _d.mfName) || `mf_${(_e = api.pkg.name) == null ? void 0 : _e.replace(/^@/, "").replace(/\W/g, "_")}`
      };
    }
    return modifiedDefaultConfig;
  });
  api.addHTMLHeadScripts(() => {
    var _a, _b;
    const dontModify = (_b = (_a = api.config.qiankun) == null ? void 0 : _a.slave) == null ? void 0 : _b.shouldNotModifyRuntimePublicPath;
    return dontModify ? [] : [
      `window.publicPath = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || "${api.config.publicPath || "/"}";`
    ];
  });
  api.chainWebpack((config) => {
    (0, import_assert.default)(api.pkg.name, "You should have name in package.json.");
    const { shouldNotAddLibraryChunkName } = (api.config.qiankun || {}).slave;
    config.output.libraryTarget("umd").library(shouldNotAddLibraryChunkName ? api.pkg.name : `${api.pkg.name}-[name]`);
    return config;
  });
  api.modifyHTML(($) => {
    $("script").each((_, el) => {
      const scriptEl = $(el);
      const umiEntry = /\/?umi(\.\w+)?\.js$/g;
      if (umiEntry.test(scriptEl.attr("src") ?? "")) {
        scriptEl.attr("entry", "");
      }
    });
    return $;
  });
  api.addEntryImports(() => {
    return [
      {
        source: "@@/plugin-qiankun-slave/lifecycles",
        specifier: "{ genMount as qiankun_genMount, genBootstrap as qiankun_genBootstrap, genUnmount as qiankun_genUnmount, genUpdate as qiankun_genUpdate }"
      }
    ];
  });
  api.addEntryCode(() => [
    `
export const bootstrap = qiankun_genBootstrap(render);
export const mount = qiankun_genMount('${api.config.mountElementId}');
export const unmount = qiankun_genUnmount('${api.config.mountElementId}');
export const update = qiankun_genUpdate();
if (!window.__POWERED_BY_QIANKUN__) {
  bootstrap().then(mount);
}
    `
  ]);
  function getFileContent(file) {
    return (0, import_fs.readFileSync)((0, import_path.join)(__dirname, "../../tpls/slave", file), "utf-8");
  }
  api.onGenerateFiles({
    fn() {
      [
        "constants.ts",
        "qiankunModel.ts",
        "connectMaster.tsx",
        "MicroAppLink.tsx",
        "slaveRuntimePlugin.ts",
        "lifecycles.ts"
      ].forEach((file) => {
        api.writeTmpFile({
          path: file.replace(/\.tpl$/, ""),
          content: getFileContent(file).replace(
            "__USE_MODEL__",
            api.isPluginEnable("model") ? `import { useModel } from '@@/plugin-model'` : `const useModel = null;`
          ).replace(
            /from 'qiankun'/g,
            `from '${(0, import_plugin_utils.winPath)((0, import_path.dirname)(require.resolve("qiankun/package")))}'`
          ).replace(
            /from 'lodash\//g,
            `from '${(0, import_plugin_utils.winPath)((0, import_path.dirname)(require.resolve("lodash/package")))}/`
          )
        });
      });
      api.writeTmpFile({
        path: "index.ts",
        content: `
export { connectMaster } from './connectMaster';
export { MicroAppLink } from './MicroAppLink';
      `
      });
    },
    before: "model"
  });
  api.addMiddlewares(async () => {
    return async (req, res, next) => {
      var _a;
      const qiankunConfig = api.config.qiankun || {};
      const masterEntry = (_a = qiankunConfig.slave) == null ? void 0 : _a.masterEntry;
      const { proxyToMasterEnabled } = await api.applyPlugins({
        key: "shouldProxyToMaster",
        type: api.ApplyPluginsType.modify,
        initialValue: { proxyToMasterEnabled: true, req }
      }) ?? {};
      if (masterEntry && proxyToMasterEnabled) {
        await api.applyPlugins({
          key: "onLocalProxyStart",
          type: api.ApplyPluginsType.event
        });
        return (0, import_http_proxy_middleware.createProxyMiddleware)((pathname) => pathname !== "/local-dev-server", {
          target: masterEntry,
          secure: false,
          ignorePath: false,
          followRedirects: false,
          changeOrigin: true,
          selfHandleResponse: true,
          onProxyReq(proxyReq) {
            api.applyPlugins({
              key: "onLocalProxyReq",
              type: api.ApplyPluginsType.event,
              sync: true,
              args: proxyReq
            });
          },
          onProxyRes: (0, import_http_proxy_middleware.responseInterceptor)(
            async (responseBuffer, proxyRes, req2, res2) => {
              var _a2;
              if (proxyRes.statusCode === 302) {
                const hostname = req2.hostname;
                const port = process.env.PORT || ((_a2 = api.appData) == null ? void 0 : _a2.port);
                const goto = `${hostname}:${port}`;
                const redirectUrl = proxyRes.headers.location.replace(
                  encodeURIComponent(new URL(masterEntry).hostname),
                  encodeURIComponent(goto)
                ) || masterEntry;
                const redirectMessage = `[@umijs/plugin-qiankun]: redirect to ${redirectUrl}`;
                api.logger.info(redirectMessage);
                res2.statusCode = 302;
                res2.setHeader("location", redirectUrl);
                return redirectMessage;
              }
              const microAppEntry = getCurrentLocalDevServerEntry(api, req2);
              const originalHtml = responseBuffer.toString("utf8");
              const html = handleOriginalHtml(api, microAppEntry, originalHtml);
              return html;
            }
          ),
          onError(err, _, res2) {
            api.logger.error(err);
            res2.set("content-type", "text/plain; charset=UTF-8");
            res2.end(
              `[@umijs/plugin-qiankun] 代理到 ${masterEntry} 时出错了，请尝试 ${masterEntry} 是否是可以正常访问的，然后重新启动项目试试。(注意如果出现跨域问题，请修改本地 host ，通过一个和主应用相同的一级域名的域名来访问 127.0.0.1)`
            );
          }
        })(req, res, next);
      }
      return next();
    };
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
