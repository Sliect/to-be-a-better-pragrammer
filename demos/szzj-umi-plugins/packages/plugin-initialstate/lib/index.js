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
var import_umi = require("umi");
var import_withTmpPath = require("./utils/withTmpPath");
var src_default = (api) => {
  api.describe({
    config: {
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            loading: Joi.string()
          }),
          Joi.boolean().invalid(true)
        );
      }
    }
  });
  api.register({
    key: "addExtraModels",
    fn: () => [
      (0, import_withTmpPath.withTmpPath)({
        api,
        path: '@@initialState.ts#{"namespace":"@@initialState"}'
      })
    ]
  });
  api.addRuntimePluginKey(() => ["getInitialState"]);
  api.addRuntimePlugin(() => {
    return [(0, import_withTmpPath.withTmpPath)({ api, path: "runtime.tsx" })];
  });
  api.onGenerateFiles(() => {
    var _a;
    const { loading } = api.config.initialState ?? {};
    api.writeTmpFile({
      path: "Provider.tsx",
      content: `
import React from 'react';
import { useModel } from '@@/plugin-model';
${loading ? `import Loading from '${loading}'` : `function Loading() { return <div />; }`}
export default function InitialStateProvider(props: any) {
  const appLoaded = React.useRef(false);
  const { loading = false } = useModel("@@initialState") || {};
  React.useEffect(() => {
    if (!loading) {
      appLoaded.current = true;
    }
  }, [loading]);
  if (loading && !appLoaded.current) {
    return <Loading />;
  }
  return props.children;
}
      `
    });
    api.writeTmpFile({
      path: "@@initialState.ts",
      content: ((_a = api.appData.appJS) == null ? void 0 : _a.exports.includes("getInitialState")) ? `
import { useState, useEffect, useCallback } from 'react';
import { getInitialState } from '@/app';

export type InitialStateType = Awaited<ReturnType<typeof getInitialState>> | undefined;

const initState = {
  initialState: undefined as InitialStateType,
  loading: true,
  error: undefined,
};

export default () => {
  const [state, setState] = useState(initState);
  const refresh = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: undefined }));
    try {
      const ret = await getInitialState();
      setState((s) => ({ ...s, initialState: ret, loading: false }));
    } catch (e) {
      setState((s) => ({ ...s, error: e, loading: false }));
    }
  }, []);

  const setInitialState = useCallback(
    async (
      initialState: InitialStateType | ((initialState: InitialStateType) => InitialStateType),
    ) => {
      setState((s) => {
        if (typeof initialState === 'function') {
          return { ...s, initialState: initialState(s.initialState), loading: false };
        }
        return { ...s, initialState, loading: false };
      });
    },
    [],
  );

  useEffect(() => {
    refresh();
  }, []);

  return {
    ...state,
    refresh,
    setInitialState,
  };
}
        ` : `
export default () => ({ loading: false, refresh: () => {} })
      `
    });
    api.writeTmpFile({
      path: "runtime.tsx",
      content: `
import React from 'react';
import Provider from './Provider';
export function dataflowProvider(container) {
  return <Provider>{ container }</Provider>;
}
      `
    });
    api.writeTmpFile({
      path: import_umi.RUNTIME_TYPE_FILE_NAME,
      content: `
export interface IRuntimeConfig {
  getInitialState?: () => Promise<Record<string, any>>
}
      `
    });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});