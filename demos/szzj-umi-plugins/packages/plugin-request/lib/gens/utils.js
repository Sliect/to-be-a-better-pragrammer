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

// src/gens/utils.ts
var utils_exports = {};
__export(utils_exports, {
  HttpStatusMap: () => HttpStatusMap,
  errorHandler: () => errorHandler
});
module.exports = __toCommonJS(utils_exports);
var import_umi = require("umi");
var HttpStatusMap = {
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误。",
  501: "服务器不具备完成请求的功能。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或停机维护。",
  504: "网关超时。",
  505: "HTTP 版本不受支持。"
};
var errorHandler = (error) => {
  var _a, _b;
  const { options } = (error == null ? void 0 : error.request) ?? {};
  if (error == null ? void 0 : error.response) {
    const { status } = error == null ? void 0 : error.response;
    if (String(status).indexOf("20") !== 0) {
      const isLocal = process.env.NODE_ENV === "development";
      switch (status) {
        case 401:
        case 402:
        case 403:
          if (!isLocal)
            import_umi.history.push("/403");
          break;
        case 404:
          if (!isLocal)
            import_umi.history.push("/404");
          break;
        default:
          const errorMessage = HttpStatusMap[error == null ? void 0 : error.response.status] ?? (error == null ? void 0 : error.message);
          (_a = options == null ? void 0 : options.message) == null ? void 0 : _a.call(options, errorMessage);
      }
    }
  } else {
    (_b = options == null ? void 0 : options.message) == null ? void 0 : _b.call(options, error == null ? void 0 : error.message);
  }
  throw error;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HttpStatusMap,
  errorHandler
});
