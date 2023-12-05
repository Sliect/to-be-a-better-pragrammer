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

// src/qiankun/master.ts
var master_exports = {};
__export(master_exports, {
  default: () => master_default,
  isMasterEnable: () => isMasterEnable
});
module.exports = __toCommonJS(master_exports);
var import_fs = require("fs");
var import_path = require("path");
var import_umi = require("umi");
var import_plugin_utils = require("umi/plugin-utils");
var import_withTmpPath = require("../utils/withTmpPath");
var import_constants = require("./constants");
function isMasterEnable(opts) {
  var _a;
  const masterCfg = (_a = opts.userConfig.qiankun) == null ? void 0 : _a.master;
  if (masterCfg) {
    return masterCfg.enable !== false;
  }
  return !!process.env.INITIAL_QIANKUN_MASTER_OPTIONS;
}
var master_default = (api) => {
  api.describe({
    key: "qiankun-master",
    enableBy: isMasterEnable
  });
  api.addRuntimePlugin(() => {
    return [(0, import_withTmpPath.withTmpPath)({ api, path: "masterRuntimePlugin.ts" })];
  });
  api.modifyDefaultConfig((config) => ({
    ...config,
    mountElementId: import_constants.defaultMasterRootId,
    qiankun: {
      ...config.qiankun,
      master: {
        ...JSON.parse(process.env.INITIAL_QIANKUN_MASTER_OPTIONS || "{}"),
        ...(config.qiankun || {}).master
      }
    }
  }));
  api.modifyRoutes((memo) => {
    Object.keys(memo).forEach((id) => {
      var _a, _b, _c;
      const route = memo[id];
      if (route.microApp) {
        const appName = route.microApp;
        const base = api.config.base || "/";
        const masterHistoryType = ((_a = api.config.history) == null ? void 0 : _a.type) === "browser" ? "history" : ((_b = api.config.history) == null ? void 0 : _b.type) === "memory" ? "abstract" : ((_c = api.config.history) == null ? void 0 : _c.type) || import_constants.defaultHistoryType;
        const routeProps = route.microAppProps || {};
        const normalizedRouteProps = JSON.stringify(routeProps).replace(/"/g, "'");
        route.file = `(async () => {
          const { getMicroAppRouteComponent } = await import('@@/plugin-qiankun-master/getMicroAppRouteComponent');
          return getMicroAppRouteComponent({ appName: '${appName}', base: '${base}', routePath: '${route.path}', masterHistoryType: '${masterHistoryType}', routeProps: ${normalizedRouteProps} })
        })()`;
      }
    });
    return memo;
  });
  function getFileContent(file) {
    return (0, import_fs.readFileSync)((0, import_path.join)(__dirname, "../../tpls/master", file), "utf-8");
  }
  api.onGenerateFiles(() => {
    var _a, _b, _c;
    api.writeTmpFile({
      path: import_umi.RUNTIME_TYPE_FILE_NAME,
      content: `
import { MasterOptions } from './types'
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);
interface Config {
  master?: MasterOptions;
}
export interface IRuntimeConfig {
  qiankun?: XOR<MasterOptions, Config>;
  ${import_constants.MODEL_EXPORT_NAME}?: () => Record<string, any>;
}
      `
    });
    const masterHistoryType = ((_a = api.config.history) == null ? void 0 : _a.type) === "browser" ? "history" : ((_b = api.config.history) == null ? void 0 : _b.type) === "memory" ? "abstract" : ((_c = api.config.history) == null ? void 0 : _c.type) || import_constants.defaultHistoryType;
    api.writeTmpFile({
      path: "masterOptions.ts",
      content: `
let options = ${JSON.stringify({
        masterHistoryType,
        base: api.config.base || "/",
        ...api.config.qiankun.master
      })};
export const getMasterOptions = () => options;
export const setMasterOptions = (newOpts) => options = ({ ...options, ...newOpts });
      `
    });
    [
      "common.ts",
      "constants.ts",
      "types.ts",
      "routeUtils.ts",
      "masterRuntimePlugin.ts",
      "getMicroAppRouteComponent.ts.tpl",
      "Loading.vue",
      "ErrorBoundary.vue",
      "MicroApp.vue",
      "MicroAppWithMemoHistory.vue"
    ].forEach((file) => {
      if (file.endsWith(".tpl")) {
        api.writeTmpFile({
          path: file.replace(/\.tpl$/, ""),
          tpl: getFileContent(file),
          context: {
            dynamicRoot: false,
            hasModelPlugin: api.isPluginEnable("model")
            // dynamicRoot:
            //   api.config.exportStatic && api.config.exportStatic.dynamicRoot,
          }
        });
      } else {
        let content = getFileContent(file);
        if (!api.config.qiankun.externalQiankun) {
          content = content.replace(
            /from 'qiankun'/g,
            `from '${(0, import_plugin_utils.winPath)((0, import_path.dirname)(require.resolve("qiankun/package")))}'`
          );
        }
        api.writeTmpFile({
          path: file.replace(/\.tpl$/, ""),
          content: content.replace(
            /from 'lodash\//g,
            `from '${(0, import_plugin_utils.winPath)((0, import_path.dirname)(require.resolve("lodash/package")))}/`
          )
        });
      }
    });
    api.writeTmpFile({
      path: "index.ts",
      content: `
export { default as MicroApp } from './MicroApp';
export { default as MicroAppWithMemoHistory } from './MicroAppWithMemoHistory';
      `
    });
    const { path, exports } = api.appData.appJS || {};
    api.writeTmpFile({
      path: "stateForSlave.ts",
      content: path && exports.includes(import_constants.MODEL_EXPORT_NAME) ? `import { ${import_constants.MODEL_EXPORT_NAME} } from '@/app';
export default ${import_constants.MODEL_EXPORT_NAME}();` : "export default {};"
    });
  });
  api.addRuntimePluginKey(() => [import_constants.MODEL_EXPORT_NAME]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isMasterEnable
});
