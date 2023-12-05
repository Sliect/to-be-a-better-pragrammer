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

// src/features/vueBabelLoaderCustomize.ts
var vueBabelLoaderCustomize_exports = {};
__export(vueBabelLoaderCustomize_exports, {
  default: () => vueBabelLoaderCustomize
});
module.exports = __toCommonJS(vueBabelLoaderCustomize_exports);
var import_querystring = require("querystring");
function vueBabelLoaderCustomize() {
  return {
    config(config) {
      const context = this;
      if (config.options.filename) {
        if (/\.vue$/.test(config.options.filename)) {
          const query = (0, import_querystring.parse)(context.resourceQuery.slice(1));
          if (query.type === "template") {
            config.options.filename = `${config.options.filename}?type=${query.type}`;
          }
        }
      }
      return config.options;
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
