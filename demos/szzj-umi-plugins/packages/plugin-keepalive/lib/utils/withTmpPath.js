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

// src/utils/withTmpPath.ts
var withTmpPath_exports = {};
__export(withTmpPath_exports, {
  withTmpPath: () => withTmpPath
});
module.exports = __toCommonJS(withTmpPath_exports);
var import_utils = require("@umijs/utils");
var import_path = require("path");
function withTmpPath(opts) {
  return (0, import_utils.winPath)(
    (0, import_path.join)(
      opts.api.paths.absTmpPath,
      opts.api.plugin.key && !opts.noPluginDir ? `plugin-${opts.api.plugin.key}` : "",
      opts.path
    )
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  withTmpPath
});
