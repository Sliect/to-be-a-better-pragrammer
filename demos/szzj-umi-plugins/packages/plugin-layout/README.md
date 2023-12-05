# @szzj/umi-plugin-subapp

为了简化微应用开发成本。

## Features

- ✔︎ 简化 .umirc 配置。
- ✔︎ 为微服务子应用提供 layout 布局组件，子应用不必在另行制作 layout 层。
- ✔︎ 为 umi 添加 useFetch, useTable, useModal, useTree 方法，可直接使用。
- ✔︎ 为 umi 添加 request.get[, post, put, del] 方法，可直接使用。
- ✔︎ 为 umi 添加 NODE_ENV, DEPLOY_ENV, IS_LOCAL, IS_DEV, IS_PROD 等环境信息。
- ✔︎ 为 umi 添加 Response, PageResponse, Option 等类型。

## Install

```bash
# or yarn
$ npm install @szzj/umi-plugin-subapp --save
```

## 简化后的 umirc

```js
export default defineConfig({
  szly: {
    wrapper: '@/wrappers/LayoutWrapper', // wrapper 包装其
    base: '/', // 包裹 layout 的 base 路由
    menusBase: '/console', // 显示菜单的 base 路由
    excludes: ['/'], // 仅包含头尾的页面路由
    layout: 'sider', // 可选项，mix 混合，sider 侧边栏，header 头部，inner-sider 内部侧边栏
    breadcrumbsMode: 'simple', // 可选项，simple 简单，complex 复杂
    doNotRenderBreadcrumbs: false, // 是否展示面包屑
    title: '测试技术有限公司',
    logo: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    copyright: '@2021 测试技术有限公司',
    userName: '本地模拟用户',
  },
  routes: [
    {
      path: '/apis',
      title: 'API数据服务',
      isMenu: true,
      component: './apis',
    },
    {
      path: '/apis/:id',
      title: '添加API',
      isMenu: false,
      component: './api',
    },
    {
      path: '/apis-temp',
      title: 'API数据服务',
      isMenu: true,
      component: './api-temp',
    },
  ],
});
```
