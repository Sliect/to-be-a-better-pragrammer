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

// src/features/webpack.ts
var webpack_exports = {};
__export(webpack_exports, {
  default: () => webpack_default
});
module.exports = __toCommonJS(webpack_exports);
var import_config = require("./config/config");
var webpack_default = (api) => {
  api.describe({
    key: "preset-vue2:webpack"
  });
  api.chainWebpack((config) => {
    (0, import_config.getConfig)(config, api);
    return config;
  });
  api.modifyConfig((memo) => {
    const enableMFSU = memo.mfsu !== false;
    if (enableMFSU) {
      memo.mfsu = {
        ...memo.mfsu || {},
        chainWebpack(config) {
          (0, import_config.getConfig)(config, api);
          return config;
        }
      };
    }
    return memo;
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
