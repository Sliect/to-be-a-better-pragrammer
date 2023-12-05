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

// src/utils.ts
var utils_exports = {};
__export(utils_exports, {
  getRegionList: () => getRegionList,
  withTmpPath: () => withTmpPath
});
module.exports = __toCommonJS(utils_exports);
var import_utils = require("@umijs/utils");
var import_path = require("path");
var getRegionList = async (opts) => {
  const {
    regionFolder,
    absSrcPath = "",
    absPagesPath = ""
  } = opts;
  const regionFiles = import_utils.glob.sync("*.{ts,js,json}", {
    cwd: (0, import_utils.winPath)((0, import_path.join)(absSrcPath, regionFolder))
  }).map((name) => (0, import_utils.winPath)((0, import_path.join)(absSrcPath, regionFolder, name))).concat(
    import_utils.glob.sync(`**/${regionFolder}/*.{ts,js,json}`, {
      cwd: absPagesPath
    }).map((name) => (0, import_utils.winPath)((0, import_path.join)(absPagesPath, name)))
  ).map((fullName) => {
    var _a;
    const fileName = (0, import_path.basename)(fullName);
    return {
      regionName: fileName,
      path: fullName,
      name: (_a = fileName.split(".")[0]) == null ? void 0 : _a.replace("-", "_")
    };
  });
  return regionFiles;
};
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
  getRegionList,
  withTmpPath
});
