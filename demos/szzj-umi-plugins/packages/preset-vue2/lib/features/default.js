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

// src/features/default.ts
var default_exports = {};
__export(default_exports, {
  default: () => default_default
});
module.exports = __toCommonJS(default_exports);
var import_path = require("path");
var import_resolveProjectDep = require("../utils/resolveProjectDep");
var default_default = (api) => {
  api.describe({
    key: "preset-vue2:default"
  });
  api.modifyDefaultConfig((config) => {
    var _a;
    const vuePath = (0, import_resolveProjectDep.resolveVuePath)({
      pkg: api.pkg,
      cwd: api.cwd,
      path: "dist/vue.esm.js"
    });
    const vueRuntimePath = (0, import_resolveProjectDep.resolveVuePath)({
      pkg: api.pkg,
      cwd: api.cwd,
      path: "dist/vue.runtime.esm.js"
    });
    config.alias = {
      ...config.alias,
      vue: ((_a = api.userConfig.vue) == null ? void 0 : _a.runtimeCompiler) ? vuePath : vueRuntimePath,
      "vue-router": (0, import_resolveProjectDep.resolveProjectDep)({
        pkg: api.pkg,
        cwd: api.cwd,
        dep: "vue-router"
      }) || (0, import_path.dirname)(require.resolve("vue-router/package.json"))
    };
    config.define = {
      ...config.define,
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    };
    return config;
  });
  api.modifyConfig((memo) => {
    memo.fastRefresh = false;
    memo.babelLoaderCustomize = require.resolve("./vueBabelLoaderCustomize");
    memo.svgr = false;
    return memo;
  });
  api.modifyAppData((memo) => {
    memo.framework = "vue";
    return memo;
  });
  api.modifyRendererPath(
    () => (0, import_path.dirname)(require.resolve("@szzj/umi-renderer-vue2/package.json"))
  );
  api.modifyBabelPresetOpts((memo) => {
    memo.presetTypeScript = {
      // 支持 vue 后缀
      allExtensions: true,
      // 支持 tsx
      isTSX: true
    };
    memo.presetReact = false;
    return memo;
  });
  api.addRuntimePluginKey(() => [
    "createStore",
    "router",
    "onRouterCreated",
    "onAppCreated",
    "onMounted"
  ]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
