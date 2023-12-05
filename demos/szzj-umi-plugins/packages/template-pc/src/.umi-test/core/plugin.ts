// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import * as Plugin_0 from 'D:/sourcecode/frontend/fed/szzj-umi-plugins/packages/template-pc/src/app.ts';
import * as Plugin_1 from '@@/core/helmet.ts';
import * as Plugin_2 from 'D:/sourcecode/frontend/fed/szzj-umi-plugins/packages/template-pc/src/.umi-test/plugin-initialstate/runtime.tsx';
import * as Plugin_3 from 'D:/sourcecode/frontend/fed/szzj-umi-plugins/packages/template-pc/src/.umi-test/plugin-model/runtime.tsx';
import { PluginManager } from 'umi';

function __defaultExport (obj) {
  if (obj.default) {
    return typeof obj.default === 'function' ? obj.default() :  obj.default
  }
  return obj;
}
export function getPlugins() {
  return [
    {
      apply: __defaultExport(Plugin_0),
      path: process.env.NODE_ENV === 'production' ? void 0 : 'D:/sourcecode/frontend/fed/szzj-umi-plugins/packages/template-pc/src/app.ts',
    },
    {
      apply: Plugin_1,
      path: process.env.NODE_ENV === 'production' ? void 0 : '@@/core/helmet.ts',
    },
    {
      apply: Plugin_2,
      path: process.env.NODE_ENV === 'production' ? void 0 : 'D:/sourcecode/frontend/fed/szzj-umi-plugins/packages/template-pc/src/.umi-test/plugin-initialstate/runtime.tsx',
    },
    {
      apply: Plugin_3,
      path: process.env.NODE_ENV === 'production' ? void 0 : 'D:/sourcecode/frontend/fed/szzj-umi-plugins/packages/template-pc/src/.umi-test/plugin-model/runtime.tsx',
    },
  ];
}

export function getValidKeys() {
  return ['patchRoutes','patchClientRoutes','modifyContextOpts','modifyClientRenderOpts','rootContainer','innerProvider','i18nProvider','accessProvider','dataflowProvider','outerProvider','render','onRouteChange','getInitialState',];
}

let pluginManager = null;

export function createPluginManager() {
  pluginManager = PluginManager.create({
    plugins: getPlugins(),
    validKeys: getValidKeys(),
  });


  return pluginManager;
}

export function getPluginManager() {
  return pluginManager;
}
