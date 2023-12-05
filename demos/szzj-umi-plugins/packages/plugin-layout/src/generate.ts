/**
 * 生成布局容器组件
 * @param userConfig
 * @returns
 */
export const genLayoutContainer = (
  userConfig: any,
) => `import React, { useMemo } from 'react';
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

export const genLayoutApi = () => `import Layout, { layoutApi } from '@szzj/layout';

export {
  Layout,
  layoutApi,
};`;

export const genDefaultRender =
  () => `export default function DefaultRender({ children }: any) {
  return children;
};`;

export const genTypes = () => `import { LayoutProps } from '@szzj/layout';

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
