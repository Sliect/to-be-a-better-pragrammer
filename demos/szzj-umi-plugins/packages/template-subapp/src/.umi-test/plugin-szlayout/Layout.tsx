// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React, { useMemo } from 'react';
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
      ...{'layout':'sider','menuBase':'/','base':'/','excludes':['/403','/404','/500'],'routes':[{'key':'szzjLayout_base','path':'/','routes':[{'path':'/','component':'@/pages/home','title':'测试','menu':true}]}]},
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
