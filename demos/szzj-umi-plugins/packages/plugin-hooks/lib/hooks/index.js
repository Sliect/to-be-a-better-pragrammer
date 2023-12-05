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

// src/hooks/index.ts
var hooks_exports = {};
__export(hooks_exports, {
  useFetch: () => import_hooks5.useFetch,
  useForm: () => import_hooks4.useForm,
  useList: () => import_hooks2.useList,
  useModal: () => import_hooks.useModal,
  useTable: () => import_useTable.default,
  useTree: () => import_hooks3.useTree
});
module.exports = __toCommonJS(hooks_exports);
var import_hooks = require("@szzj/hooks");
var import_hooks2 = require("@szzj/hooks");
var import_hooks3 = require("@szzj/hooks");
var import_hooks4 = require("@szzj/hooks");
var import_hooks5 = require("@szzj/hooks");
var import_useTable = __toESM(require("./useTable"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useFetch,
  useForm,
  useList,
  useModal,
  useTable,
  useTree
});
