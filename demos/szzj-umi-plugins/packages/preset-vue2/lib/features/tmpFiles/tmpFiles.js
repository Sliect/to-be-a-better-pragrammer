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

// src/features/tmpFiles/tmpFiles.ts
var tmpFiles_exports = {};
__export(tmpFiles_exports, {
  default: () => tmpFiles_default
});
module.exports = __toCommonJS(tmpFiles_exports);
var import_path = require("path");
var import_plugin_utils = require("umi/plugin-utils");
var import_constants = require("../../constants");
var tmpFiles_default = (api) => {
  api.describe({
    key: "preset-vue2:tmpFiles"
  });
  api.onGenerateFiles(async () => {
    const rendererPath = (0, import_plugin_utils.winPath)(
      await api.applyPlugins({
        key: "modifyRendererPath"
      })
    );
    api.writeTmpFile({
      noPluginDir: true,
      path: "plugin-vue/index.ts",
      tplPath: (0, import_path.join)(import_constants.TEMPLATES_DIR, "useAppData.tpl"),
      context: {
        rendererPath
      }
    });
  });
  api.register({
    key: "onGenerateFiles",
    fn: async () => {
      const rendererPath = (0, import_plugin_utils.winPath)(
        await api.applyPlugins({
          key: "modifyRendererPath"
        })
      );
      api.writeTmpFile({
        noPluginDir: true,
        path: "core/history.ts",
        tplPath: (0, import_path.join)(import_constants.TEMPLATES_DIR, "history.tpl"),
        context: {
          rendererPath
        }
      });
      api.writeTmpFile({
        noPluginDir: true,
        path: "core/EmptyRoute.tsx",
        content: `
import { defineComponent, h } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'EmptyRoute',
  render() {
    return () => h(RouterView, null);
  },
});
        `
      });
      api.writeTmpFile({
        noPluginDir: true,
        path: "core/App.vue",
        content: `
<template>
  <router-view></router-view>
</template>
        `
      });
    },
    stage: Infinity
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
