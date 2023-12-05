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

// src/generate.ts
var generate_exports = {};
__export(generate_exports, {
  genDefaultRender: () => genDefaultRender,
  genLayoutApi: () => genLayoutApi,
  genLayoutContainer: () => genLayoutContainer,
  genTypes: () => genTypes
});
module.exports = __toCommonJS(generate_exports);
var genLayoutContainer = (userConfig) => `import React, { useMemo } from 'react';
import { history, useLocation, useParams, useOutletContext, Outlet } from 'umi';
import Layout from '@szzj/layout';

/**
 * @szzj/layout 布局组件
 */
export default function LayoutContainer() {
  const layoutContext = useOutletContext();
  const location = useLocation();
  const params = useParams();
  const props = useMemo(() => {
    const { routes, ...rest } = layoutContext ?? {};
    const result = {
      ...${JSON.stringify(userConfig).replace(/"/g, "'")},
      ...rest,
    };

    if (routes) result.routes = [{ key: 'wrapper', path: '/', menu: true, routes }];
    return result;
  }, [layoutContext]);
  
  return (
    <Layout {...props} history={history} location={location} params={params}>
      <Outlet />
    </Layout>
  )
};
`;
var genLayoutApi = () => `import Layout, { layoutApi } from '@szzj/layout';

export {
  Layout,
  layoutApi,
};`;
var genDefaultRender = () => `export default function DefaultRender({ children }: any) {
  return children;
};`;
var genTypes = () => `import { LayoutProps } from '@szzj/layout';

export type Route = {
  key: string;
  path: string;
  target?: string;
  wrappers?: string[];
  component?: string;
  menu?: boolean;
  title?: string;
  icon?: string;
  routes?: Route[];
};

export type { LayoutProps };`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  genDefaultRender,
  genLayoutApi,
  genLayoutContainer,
  genTypes
});
