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

// src/features/config/assetRules.ts
var assetRules_exports = {};
__export(assetRules_exports, {
  addAssetRules: () => addAssetRules
});
module.exports = __toCommonJS(assetRules_exports);
async function addAssetRules({ config, api }) {
  config.module.rules.delete("asset");
  const { userConfig } = api;
  const inlineLimit = parseInt(userConfig.inlineLimit || "10000", 10);
  config.module.rule("avif").test(/\.avif$/).type("asset").mimetype("image/avif").parser({
    dataUrlCondition: {
      maxSize: inlineLimit
    }
  });
  config.module.rule("image").test(/\.(bmp|gif|jpg|jpeg|png|svg)$/).type("asset").parser({
    dataUrlCondition: {
      maxSize: inlineLimit
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addAssetRules
});
