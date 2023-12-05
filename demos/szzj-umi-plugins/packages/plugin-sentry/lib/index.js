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
var import_utils = require("@umijs/utils");
var import_path = require("path");
var import_getDebugContainer = __toESM(require("./getDebugContainer"));
var import_getRootContainer = __toESM(require("./getRootContainer"));
var import_getTraceRequest = __toESM(require("./getTraceRequest"));
var import_getUmiExports = __toESM(require("./getUmiExports"));
var ACCESS_DIR = "plugin-szsentry";
var src_default = (api) => {
  const { NODE_ENV, DEPLOY_ENV } = process.env;
  const umiTmpDir = api.paths.absTmpPath;
  api.describe({
    key: "szsentry",
    config: {
      default: {
        importUmiRequest: "import { umiRequest } from 'umi';",
        client: "pc"
      },
      schema: (joi) => {
        return joi.object({
          dsn: joi.string().required(),
          debug: joi.bool(),
          importUmiRequest: joi.string(),
          captureConsole: joi.bool(),
          sessionReplay: joi.bool(),
          client: joi.string()
        });
      }
    },
    enableBy: api.EnableBy.config
  });
  api.onGenerateFiles(() => {
    const env = DEPLOY_ENV ? DEPLOY_ENV : NODE_ENV === "production" ? "prod" : "local";
    const { name, version } = api.pkg;
    const {
      dsn,
      importUmiRequest = "import { umiRequest } from 'umi';",
      captureConsole,
      sessionReplay,
      client
    } = api.userConfig.sentry;
    api.writeTmpFile({
      path: "rootContainer.tsx",
      content: (0, import_getRootContainer.default)({
        dsn,
        env,
        release: `${name}@${version}`,
        captureConsole,
        sessionReplay
      })
    });
    api.writeTmpFile({
      path: "debugContainer.tsx",
      content: (0, import_getDebugContainer.default)()
    });
    api.writeTmpFile({
      path: "traceRequest.ts",
      content: (0, import_getTraceRequest.default)({
        importUmiRequest
      })
    });
    api.writeTmpFile({
      path: "index.ts",
      content: (0, import_getUmiExports.default)({
        client
      })
    });
  });
  api.addRuntimePlugin(() => (0, import_utils.winPath)((0, import_path.join)(umiTmpDir, ACCESS_DIR, "rootContainer.tsx")));
  const { debug } = api.userConfig.sentry;
  if (debug || debug !== false && ["dev", "pre"].includes(DEPLOY_ENV)) {
    api.addRuntimePlugin(
      () => (0, import_utils.winPath)((0, import_path.join)(umiTmpDir, ACCESS_DIR, "debugContainer.tsx"))
    );
  }
  api.addRuntimePlugin(() => (0, import_utils.winPath)((0, import_path.join)(umiTmpDir, ACCESS_DIR, "traceRequest.ts")));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
