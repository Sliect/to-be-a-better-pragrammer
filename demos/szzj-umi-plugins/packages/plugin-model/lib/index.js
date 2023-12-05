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
var import_fs = require("fs");
var import_path = require("path");
var t = __toESM(require("@umijs/bundler-utils/compiled/babel/types"));
var import_utils = require("@umijs/utils");
var import_modelUtils = require("./utils/modelUtils");
var import_withTmpPath = require("./utils/withTmpPath");
var src_default = (api) => {
  api.describe({
    key: "model",
    config: {
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            extraModels: Joi.array().items(Joi.string()),
            excludeModels: Joi.array().items(Joi.string())
          }),
          Joi.boolean().invalid(true)
        );
      }
    }
  });
  api.onGenerateFiles(async () => {
    const { excludeModels } = api.config.model ?? {};
    const models = await getAllModels(api, { excludeModels });
    api.writeTmpFile({
      path: "model.ts",
      content: import_modelUtils.ModelUtils.getModelsContent(models)
    });
    const indexContent = (0, import_fs.readFileSync)(
      (0, import_path.join)(__dirname, "../tpls/model.tsx"),
      "utf-8"
    ).replace("fast-deep-equal", (0, import_utils.winPath)(require.resolve("fast-deep-equal")));
    api.writeTmpFile({
      path: "index.tsx",
      content: indexContent
    });
    api.writeTmpFile({
      path: "runtime.tsx",
      content: `
import React  from 'react';
import { Provider } from './';
import { models as rawModels } from './model';

function ProviderWrapper(props: any) {
  const models = React.useMemo(() => {
    return Object.keys(rawModels).reduce((memo, key) => {
      memo[rawModels[key].namespace] = rawModels[key].model;
      return memo;
    }, {});
  }, []);
  return <Provider models={models} {...props}>{ props.children }</Provider>
}

export function dataflowProvider(container, opts) {
  return <ProviderWrapper {...opts}>{ container }</ProviderWrapper>;
}
      `
    });
  });
  api.addTmpGenerateWatcherPaths(() => {
    return [(0, import_path.join)(api.paths.absSrcPath, "models")];
  });
  api.addRuntimePlugin(() => {
    return [(0, import_withTmpPath.withTmpPath)({ api, path: "runtime.tsx" })];
  });
};
async function getAllModels(api, { excludeModels }) {
  var _a;
  const extraModels = await api.applyPlugins({
    key: "addExtraModels",
    type: api.ApplyPluginsType.add,
    initialValue: []
  });
  return new import_modelUtils.ModelUtils(api, {
    astTest({ node }) {
      return t.isArrowFunctionExpression(node) || t.isFunctionDeclaration(node);
    }
  }).getAllModels({
    sort: {},
    extraModels: [...extraModels, ...((_a = api.config.model) == null ? void 0 : _a.extraModels) || []]
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
