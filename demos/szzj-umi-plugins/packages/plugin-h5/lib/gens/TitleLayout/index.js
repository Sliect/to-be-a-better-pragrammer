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

// src/gens/TitleLayout/index.tsx
var TitleLayout_exports = {};
__export(TitleLayout_exports, {
  default: () => TitleLayout
});
module.exports = __toCommonJS(TitleLayout_exports);
var import_react = require("react");
var import_umi = require("umi");
function TitleLayout() {
  const { title } = (0, import_umi.useRouteProps)();
  (0, import_react.useEffect)(() => {
    if (title)
      document.title = title;
  }, [title]);
  return /* @__PURE__ */ React.createElement(import_umi.Outlet, null);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
