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

// src/utils/resolveProjectDep.ts
var resolveProjectDep_exports = {};
__export(resolveProjectDep_exports, {
  resolveProjectDep: () => resolveProjectDep,
  resolveVuePath: () => resolveVuePath
});
module.exports = __toCommonJS(resolveProjectDep_exports);
var import_path = require("path");
var import_plugin_utils = require("umi/plugin-utils");
function resolveProjectDep(opts) {
  var _a, _b;
  if (((_a = opts.pkg.dependencies) == null ? void 0 : _a[opts.dep]) || ((_b = opts.pkg.devDependencies) == null ? void 0 : _b[opts.dep])) {
    return (0, import_path.dirname)(
      import_plugin_utils.resolve.sync(`${opts.dep}/package.json`, {
        basedir: opts.cwd
      })
    );
  }
}
function resolveVuePath(opts) {
  const vuePkgPath = resolveProjectDep({
    pkg: opts.pkg,
    cwd: opts.cwd,
    dep: "vue"
  }) || (0, import_path.dirname)(require.resolve("vue/package.json"));
  return (0, import_path.join)(vuePkgPath, opts.path);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resolveProjectDep,
  resolveVuePath
});
