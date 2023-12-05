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

// src/getUmiExports.ts
var getUmiExports_exports = {};
__export(getUmiExports_exports, {
  default: () => getUmiExports_default
});
module.exports = __toCommonJS(getUmiExports_exports);
var getUmiExports_default = ({ client = "pc" }) => {
  return `import * as Sentry from '@sentry/react';

export const captureException = (err: any) => {
  Sentry.withScope(scope => {
    scope.setTags({
      client: '${client}',
    });

    if (err instanceof Error){
      Sentry.captureException(err);
    } else if (typeof err === 'object'){
      Sentry.captureEvent(err);
    } else {
      Sentry.captureMessage(err);
    };
  });
}`;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
