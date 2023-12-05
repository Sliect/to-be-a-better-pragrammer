// @ts-nocheck
import { createHashHistory, History } from 'D:/sourcecode/frontend/fed/szzj-antd-form/node_modules/_@umijs_runtime@3.5.41@@umijs/runtime';

let options = {
  "basename": "/"
};
if ((<any>window).routerBase) {
  options.basename = (<any>window).routerBase;
}

// remove initial history because of ssr
let history: History = process.env.__IS_SERVER ? null : createHashHistory(options);
export const createHistory = (hotReload = false) => {
  if (!hotReload) {
    history = createHashHistory(options);
  }

  return history;
};

export { history };
