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
var DIR_NAME = "plugin-szrequest";
var src_default = (api) => {
  api.describe({
    key: "szrequest",
    config: {
      default: {
        prefix: "/api",
        prefixTarget: ""
      },
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            /** 请求前缀 */
            prefix: Joi.string(),
            /** 请求转发域名 */
            proxyTarget: Joi.string(),
            /** 请求转发路径前缀 */
            prefixTarget: Joi.string(),
            /** mock 服务地址 */
            mockServiceUrl: Joi.alternatives().try(Joi.string(), Joi.boolean())
          }),
          Joi.boolean().invalid(true)
        );
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles
    }
  });
  api.modifyConfig((memo) => {
    const { prefix = "/api", proxyTarget, prefixTarget = "" } = memo.szrequest || {};
    if (!prefix)
      return memo;
    const prefixWillRewrite = prefix.indexOf("/api") !== -1 ? "/api" : prefix;
    return {
      ...memo,
      proxy: {
        [prefix]: {
          target: proxyTarget,
          pathRewrite: {
            [`^${prefixWillRewrite}`]: prefixTarget
          },
          changeOrigin: true
          // bypass: function (req, res, proxyOptions) {
          //   if (req.originalUrl.indexOf(prefix) !== -1) {
          //     console.log(req.originalUrl);
          //     console.log(proxyOptions);
          //     console.log(res);
          //   }
          // },
        },
        ...memo.proxy
      }
    };
  });
  let generatedOnce = false;
  api.onGenerateFiles(() => {
    if (generatedOnce)
      return;
    generatedOnce = true;
    const cwd = (0, import_path.join)(__dirname, "../src/gens");
    const files = import_utils.glob.sync("**/*", {
      cwd
    });
    const base = (0, import_path.join)(api.paths.absTmpPath, DIR_NAME);
    import_utils.fsExtra.mkdirpSync(base);
    files.forEach((file) => {
      const source = (0, import_path.join)(cwd, file);
      const target = (0, import_path.join)(base, file);
      if (import_utils.fsExtra.statSync(source).isDirectory()) {
        import_utils.fsExtra.mkdirpSync(target);
      } else {
        import_utils.fsExtra.copyFileSync(source, target);
      }
    });
  });
  api.onGenerateFiles(() => {
    const {
      prefix = "/api",
      mockServiceUrl = "http://59.202.54.14:18087/mock/644793528807247e213956e7/ones"
    } = api.config.szrequest || {};
    const urlPrefix = process.env.NODE_ENV === "development" ? prefix : "";
    api.writeTmpFile({
      path: "index.ts",
      content: `import type { RequestMethod } from 'umi-request';
import { getInstance, getMethods, HttpStatusMap } from './instance';
import { get as GetType, post as PostType } from './types';

const URL_PREFIX = '${urlPrefix}';

const request = getInstance({
  prefix: '${urlPrefix}',
}) as RequestMethod;

request.use(async (ctx, next) => {
  // 开发环境开启 mock 服务
  if (${process.env.NODE_ENV === "development"} && ctx?.req.options.mock) {
    const mockUrlPrefix = typeof ctx?.req.options.mock === 'string' ? ctx?.req.options.mock : '${mockServiceUrl}';
    ctx.req.url = mockUrlPrefix + ctx.req.url.slice('${urlPrefix}'.length);
  }

  await next();
});

const { get, post, put, del } = getMethods(request);

export {
  URL_PREFIX,
  HttpStatusMap,
  request,
  get,
  post,
  put,
  del,
}`
    });
  });
  api.addRuntimePluginKey(() => ["getPublicKey"]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
