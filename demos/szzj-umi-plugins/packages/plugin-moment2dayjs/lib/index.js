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
var DIR_NAME = "plugin-moment2dayjs";
var src_default = (api) => {
  api.describe({
    key: "moment2dayjs",
    config: {
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            preset: Joi.string(),
            // 'antd' | 'none'
            plugins: Joi.array()
          }),
          Joi.boolean().invalid(true)
        );
      }
    },
    enableBy: api.EnableBy.config
  });
  const presets = {
    antd: [
      "isSameOrBefore",
      "isSameOrAfter",
      "advancedFormat",
      "customParseFormat",
      "weekday",
      "weekYear",
      "weekOfYear",
      "isMoment",
      "localeData",
      "localizedFormat"
    ]
  };
  const getDayjsPlugins = (api2) => {
    let { preset = "antd", plugins = [] } = api2.config.moment2dayjs || {};
    switch (preset) {
      case "antd":
        return Array.from(new Set(presets["antd"].concat(plugins)));
      case "none":
        return [].concat(plugins);
      default:
        return [];
    }
  };
  api.modifyConfig((memo) => {
    memo.alias.moment = (0, import_path.dirname)(require.resolve("dayjs/package.json"));
    return memo;
  });
  api.onGenerateFiles(() => {
    const plugins = getDayjsPlugins(api);
    const runtimeTpl = `
import dayjs from '{{{dayjsPath}}}';
import antdPlugin from '{{{dayjsAntdPluginPath}}}';

{{#plugins}}
import {{.}} from '{{{dayjsPath}}}/plugin/{{.}}';
{{/plugins}}

{{#plugins}}
dayjs.extend({{.}});
{{/plugins}}

dayjs.extend(antdPlugin);
    `;
    const dayjsAntdPluginPath = (0, import_utils.winPath)(
      require.resolve("antd-dayjs-webpack-plugin/src/antd-plugin")
    );
    const dayjsPath = (0, import_utils.winPath)((0, import_path.dirname)(require.resolve("dayjs/package.json")));
    api.writeTmpFile({
      path: "runtime.tsx",
      content: import_utils.Mustache.render(runtimeTpl, {
        plugins,
        dayjsPath,
        dayjsAntdPluginPath
      })
    });
  });
  api.addEntryCodeAhead(() => [`import './${DIR_NAME}/runtime.tsx'`]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
