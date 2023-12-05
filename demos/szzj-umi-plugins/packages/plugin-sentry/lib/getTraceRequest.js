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

// src/getTraceRequest.ts
var getTraceRequest_exports = {};
__export(getTraceRequest_exports, {
  default: () => getTraceRequest_default
});
module.exports = __toCommonJS(getTraceRequest_exports);
var getTraceRequest_default = ({ importUmiRequest }) => {
  return `${importUmiRequest}
import { captureException } from 'umi';
import { startTransaction } from '@sentry/react';

umiRequest.use(async (ctx, next) => {
  const { req } = ctx;
  const { originUrl, url, options } = req;
  const { method } = options;

  const transaction = startTransaction({ name: "test-transaction" });
  const span = transaction.startChild({
    op: method,
    description: originUrl,
  });

  try {
    await next();

    const { res } = ctx;
    const { status } = res;
    switch (status) {
      case 200:
        try {
          data = await response.clone().json();
          if (!data.success){
            captureException(data);
          }
        } catch (err) {
          console.log(err);
        }
        break;
      default:
        span.setTag("http.status_code", status);
        span.finish();
        transaction.finish();
    };
  } catch(err){
    captureException(err);
  }
});`;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
