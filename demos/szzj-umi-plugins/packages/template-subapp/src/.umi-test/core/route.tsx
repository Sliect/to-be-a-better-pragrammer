// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/","title":"测试","menu":true,"parentId":"szzjLayout_top","id":"1","key":"1"},"top":{"id":"szzjLayout_top","key":"szzjLayout_top","path":"/"}} as const;
  return {
    routes,
    routeComponents: {
'1': require('@/pages/home/index.tsx').default,
'top': require('D:/sourcecode/frontend/fed/szzj-umi-plugins/packages/template-subapp/src/.umi-test/plugin-szlayout/Layout.tsx').default,
},
  };
}
