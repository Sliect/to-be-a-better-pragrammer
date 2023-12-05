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

// src/gens/instance.ts
var instance_exports = {};
__export(instance_exports, {
  HttpStatusMap: () => import_utils.HttpStatusMap,
  getInstance: () => getInstance,
  getMethods: () => getMethods
});
module.exports = __toCommonJS(instance_exports);
var import_umi_request = require("umi-request");
var import_utils = require("./utils");
var import_middlewares = require("./middlewares");
var instance = null;
var getInstance = (options) => {
  if (instance)
    instance;
  instance = (0, import_umi_request.extend)({
    prefix: "/api",
    timeout: 3e3,
    credentials: "same-origin",
    method: "POST",
    errorHandler: import_utils.errorHandler,
    ...options,
    headers: {
      Accept: "application/json",
      ...options.headers
    }
  });
  instance.use(import_middlewares.EncryptMiddleware);
  instance.use(import_middlewares.DecryptMiddleware);
  instance.use(import_middlewares.AttachmentMiddleware);
  return instance;
};
var getMethods = (instance2) => {
  async function get(url, params, opts) {
    const res = await instance2.get(url, {
      params,
      ...opts
    });
    return res;
  }
  async function post(url, data, opts) {
    const res = await instance2.post(url, {
      data,
      ...opts
    });
    return res;
  }
  async function put(url, data, opts) {
    const res = await instance2.put(url, {
      data,
      ...opts
    });
    return res;
  }
  async function del(url, params, opts) {
    const res = await instance2.delete(url, {
      params,
      ...opts
    });
    return res;
  }
  return {
    get,
    post,
    put,
    del
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HttpStatusMap,
  getInstance,
  getMethods
});
