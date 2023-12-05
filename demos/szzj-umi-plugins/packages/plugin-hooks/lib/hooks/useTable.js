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

// src/hooks/useTable.ts
var useTable_exports = {};
__export(useTable_exports, {
  default: () => useTable_default
});
module.exports = __toCommonJS(useTable_exports);
var import_react = require("react");
var import_hooks = require("@szzj/hooks");
var useTable_default = (fetch, options) => {
  const { format, defaultParams, ...rest } = options ?? {};
  const table = (0, import_hooks.useTable)(
    (params) => {
      const values = {};
      if (params) {
        Object.keys(params).forEach((key) => {
          if (params[key] !== void 0 && params[key] !== "") {
            values[key] = params[key];
          }
        });
      }
      return fetch({
        pageNum: 1,
        pageSize: 10,
        ...defaultParams,
        ...values
      });
    },
    {
      transfrom: (data) => {
        const list = data.list || [];
        return {
          pagination: {
            current: data.pageNum,
            pageSize: data.pageSize,
            total: data.totalItem
          },
          list: format ? list.map(format) : list
        };
      },
      transfromParams: (data) => {
        if (data) {
          const { current = 1, pageSize = 10, sorter, filters, ...rest2 } = data;
          return {
            ...rest2,
            pageNum: current,
            pageSize
          };
        }
        return data;
      },
      ...rest
    }
  );
  const finalTable = (0, import_react.useMemo)(() => {
    const { props } = table;
    const { pagination } = props;
    if (typeof pagination === "object") {
      const { total = 0, pageSize = 10, current = 1 } = pagination;
      return {
        ...table,
        props: {
          ...table.props,
          pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => `共${total}条`,
            pageSize,
            current,
            total
          }
        }
      };
    }
    return table;
  }, [table]);
  return finalTable;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
