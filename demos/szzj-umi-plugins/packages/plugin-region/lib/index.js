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
var import_path = require("path");
var import_fs = require("fs");
var import_utils = require("@umijs/utils");
var import_utils2 = require("./utils");
var src_default = (api) => {
  const {
    paths
  } = api;
  api.describe({
    key: "szregion",
    config: {
      default: {
        irs: false
      },
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            /** 是否 IRS 发布 */
            irs: Joi.boolean()
          }),
          Joi.boolean().invalid(true)
        );
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles
    }
  });
  api.modifyDefaultConfig((config) => {
    const { NODE_ENV, DEPLOY_ENV = "local", DEPLOY_REGION = "sj" } = process.env;
    const { define } = config;
    config.define = {
      ...define,
      "process.env.NODE_ENV": NODE_ENV,
      "process.env.DEPLOY_ENV": DEPLOY_ENV,
      "process.env.DEPLOY_REGION": DEPLOY_REGION
    };
    return config;
  });
  function getRegionDir() {
    return api.config.singular ? "region" : "regions";
  }
  function getRegionsPath() {
    return (0, import_path.join)(paths.absSrcPath, getRegionDir());
  }
  const getList = async () => {
    return (0, import_utils2.getRegionList)({
      regionFolder: getRegionDir(),
      absSrcPath: paths.absSrcPath,
      absPagesPath: paths.absPagesPath
    });
  };
  api.onGenerateFiles(async () => {
    const regionList = await getList();
    const regionExportsTpl = (0, import_fs.readFileSync)(
      (0, import_path.join)(__dirname, "../tpls", "regionExports.tpl"),
      "utf-8"
    );
    const { DEPLOY_REGION = "sj" } = process.env;
    api.writeTmpFile({
      path: "regionExports.ts",
      content: import_utils.Mustache.render(regionExportsTpl, {
        RegionList: regionList,
        DEPLOY_REGION
      })
    });
    const providerContent = (0, import_fs.readFileSync)(
      (0, import_path.join)(__dirname, "../tpls/RegionContext.tsx"),
      "utf-8"
    );
    api.writeTmpFile({
      path: "provider.tsx",
      content: providerContent
    });
    api.writeTmpFile({
      path: "runtime.tsx",
      content: `
import React  from 'react';
import { Provider } from './provider';
import { models as rawModels } from './model';

function ProviderWrapper(props: any) {
  return <Provider {...props}>{ props.children }</Provider>
}

export function dataflowProvider(container, opts) {
  return <ProviderWrapper {...opts}>{ container }</ProviderWrapper>;
}
      `
    });
    const { szregion } = api.config;
    const { irs = false } = szregion ?? {};
    api.writeTmpFile({
      path: "index.ts",
      content: `
export {useRegions} from './provider.tsx';

export const DEPLOY_ENV = process.env.DEPLOY_ENV;
export const NODE_ENV = process.env.NODE_ENV;
export const DEPLOY_REGION = process.env.DEPLOY_REGION;

export const IS_LOCAL = NODE_ENV !== 'production';
export const IS_DEV = ${irs} ? (!IS_LOCAL && window.location.href.indexOf('/reserved/') === -1) : DEPLOY_ENV !== 'prod';
export const IS_PROD = ${irs} ? (!IS_LOCAL && window.location.href.indexOf('/reserved/') !== -1) :DEPLOY_ENV === 'prod';

/**
 * 是否在浙里办中
 */
export const IS_IN_ZLB = navigator.userAgent.toLocaleLowerCase().match('dtdreamweb');

/**
 * 是否在支付宝中
 */
export const IS_IN_ALIPAY = navigator.userAgent.toLocaleLowerCase().match('aliapp');

/**
 * 是否在微信中
 */
export const IS_IN_WECHAT = navigator.userAgent.toLocaleLowerCase().match('micromessenger');

/**
 * 是否在浙里办或支付宝或微信中
 */
export const IS_IN_ZLB_OR_ALIPAY_OR_WECHAT = IS_IN_ZLB || IS_IN_ALIPAY || IS_IN_WECHAT;

/**
 * 是否在浙政钉中
 */
export const IS_IN_ZZD = navigator.userAgent.toLocaleLowerCase().match('zhejiang')`
    });
  });
  api.addTmpGenerateWatcherPaths(() => {
    const modelsPath = getRegionsPath();
    return [modelsPath];
  });
  api.chainWebpack((config, { webpack }) => {
    var _a;
    const { DEPLOY_ENV = "local", DEPLOY_REGION = "sj" } = process.env;
    if (DEPLOY_REGION) {
      config.resolve.extensions.prepend(`.${DEPLOY_REGION}.tsx`).prepend(`.${DEPLOY_REGION}.ts`).prepend(`.${DEPLOY_REGION}.json`).prepend(`.${DEPLOY_REGION}.jsx`).prepend(`.${DEPLOY_REGION}.js`).prepend(`.${DEPLOY_REGION}.mjs`);
    }
    config.plugin("banner").use(webpack.BannerPlugin, [
      `版本：${((_a = api.pkg) == null ? void 0 : _a.version) || "-"}
环境：${DEPLOY_ENV || "-"}
地市：${DEPLOY_REGION || "-"}
日期: ${new Date().toLocaleString()}`
    ]);
  });
  api.addRuntimePlugin(() => {
    return [(0, import_utils2.withTmpPath)({ api, path: "runtime.tsx" })];
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
