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

// src/features/vite/vite.ts
var vite_exports = {};
__export(vite_exports, {
  default: () => vite_default
});
module.exports = __toCommonJS(vite_exports);
var import_plugin_vue2_jsx = __toESM(require("@vitejs/plugin-vue2-jsx"));
var import_plugin_vue2 = __toESM(require("@vitejs/plugin-vue2"));
var vite_default = (api) => {
  api.describe({
    key: "preset-vue2:vite"
  });
  api.modifyViteConfig((config) => {
    var _a, _b, _c, _d;
    (_a = config.plugins) == null ? void 0 : _a.push((0, import_plugin_vue2.default)(api.config.vue));
    (_d = config.plugins) == null ? void 0 : _d.push((0, import_plugin_vue2_jsx.default)((_c = (_b = api.config) == null ? void 0 : _b.vue) == null ? void 0 : _c.pluginJsx));
    return config;
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
