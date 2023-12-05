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
var import_utils = require("@umijs/utils");
var import_path = require("path");
var DIR_NAME = "plugin-szhooks";
var src_default = (api) => {
  api.describe({
    key: "szhooks",
    config: {
      schema(Joi) {
        return Joi.alternatives().try(Joi.object({}), Joi.boolean().invalid(true));
      }
    },
    enableBy: () => api.userConfig.szhooks !== false
  });
  let generatedOnce = false;
  api.onGenerateFiles(() => {
    if (generatedOnce)
      return;
    generatedOnce = true;
    const hooksDirPath = (0, import_path.join)(__dirname, "../src/hooks");
    const files = import_utils.glob.sync("**/*", {
      cwd: hooksDirPath
    });
    const base = (0, import_path.join)(api.paths.absTmpPath, DIR_NAME);
    import_utils.fsExtra.mkdirpSync(base);
    files.forEach((file) => {
      const source = (0, import_path.join)(hooksDirPath, file);
      const target = (0, import_path.join)(base, file);
      if (import_utils.fsExtra.statSync(source).isDirectory()) {
        import_utils.fsExtra.mkdirpSync(target);
      } else {
        import_utils.fsExtra.copyFileSync(source, target);
      }
    });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
