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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_path = require("path");
var import_utils = require("@umijs/utils");
var import_resolveProjectDep = require("./utils/resolveProjectDep");
var import_withTmpPath = require("./utils/withTmpPath");
var src_default = (api) => {
  let pkgPath;
  let antdVersion = "4.0.0";
  try {
    pkgPath = (0, import_resolveProjectDep.resolveProjectDep)({
      pkg: api.pkg,
      cwd: api.cwd,
      dep: "antd"
    }) || (0, import_path.dirname)(require.resolve("antd/package.json"));
    antdVersion = require(`${pkgPath}/package.json`).version;
  } catch (e) {
  }
  api.describe({
    key: "antd",
    config: {
      default: {
        dayjs: true,
        import: true,
        style: "css"
      },
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            configProvider: Joi.object(),
            /**
             * 使用 dayjs 代替 moment
             */
            dayjs: Joi.boolean(),
            /**
             * 主题，dark 暗黑风格；compact 紧凑主题
             */
            dark: Joi.boolean(),
            compact: Joi.boolean(),
            /**
             * 按需加载
             */
            import: Joi.boolean(),
            /**
             * 使用 less 还是 css
             */
            style: Joi.string().allow("less", "css")
          }),
          Joi.boolean().invalid(true)
        );
      }
    }
  });
  function checkPkgPath() {
    if (!pkgPath) {
      throw new Error(`Can't find antd package. Please install antd first.`);
    }
  }
  api.modifyAppData((memo) => {
    checkPkgPath();
    const version = require(`${pkgPath}/package.json`).version;
    memo.antd = {
      pkgPath,
      version
    };
    return memo;
  });
  api.modifyConfig((memo) => {
    checkPkgPath();
    let antd = memo.antd || {};
    memo.alias.antd = pkgPath;
    if (antd.dayjs) {
      memo.alias.moment = (0, import_path.dirname)(require.resolve("dayjs/package.json"));
    }
    if (antdVersion.startsWith("5")) {
      const theme = require("@ant-design/antd-theme-variable");
      memo.theme = {
        ...theme,
        ...memo.theme
      };
    }
    if (antd.dark || antd.compact) {
      const { getThemeVariables } = require("antd/dist/theme");
      memo.theme = {
        ...getThemeVariables(antd),
        ...memo.theme
      };
    }
    memo.theme = {
      "root-entry-name": "default",
      ...memo.theme
    };
    return memo;
  });
  api.addExtraBabelPlugins(() => {
    const style = api.config.antd.style || "less";
    if (antdVersion.startsWith("5")) {
      return [];
    }
    return api.config.antd.import && !api.appData.vite ? [
      [
        require.resolve("babel-plugin-import"),
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: style === "less" ? true : "css"
        },
        "antd"
      ]
    ] : [];
  });
  api.addEntryImportsAhead(() => {
    const style = api.config.antd.style || "less";
    const doNotImportLess = api.config.antd.import && !api.appData.vite || antdVersion.startsWith("5");
    return doNotImportLess ? [] : [
      {
        source: style === "less" ? "antd/dist/antd.less" : "antd/dist/antd.css"
      }
    ];
  });
  api.onGenerateFiles(() => {
    if (!api.config.antd.configProvider)
      return;
    api.writeTmpFile({
      path: `runtime.tsx`,
      content: import_utils.Mustache.render(
        `
import React from 'react';
import { ConfigProvider, Modal, message, notification } from 'antd';

export function rootContainer(container) {
  const finalConfig = {...{{{ config }}}}
  if (finalConfig.prefixCls) {
    Modal.config({
      rootPrefixCls: finalConfig.prefixCls
    });
    message.config({
      prefixCls: \`\${finalConfig.prefixCls}-message\`
    });
    notification.config({
      prefixCls: \`\${finalConfig.prefixCls}-notification\`
    });
  }
  return <ConfigProvider {...finalConfig}>{container}</ConfigProvider>;
}
      `.trim(),
        {
          config: JSON.stringify(api.config.antd.configProvider)
        }
      )
    });
  });
  api.addRuntimePlugin(() => {
    return api.config.antd.configProvider ? [(0, import_withTmpPath.withTmpPath)({ api, path: "runtime.tsx" })] : [];
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
