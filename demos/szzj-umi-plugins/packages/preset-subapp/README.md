# @szzj/umi-preset-subapp

子应用本地调试、打包插件集。

## Features

- ✔︎ 简化 .umirc 配置，默认使用 hash 路径，不包含错误页面等；
- ✔︎ 本地环境自动加载 @szzj/layout 布局，生产环境则无；
- ✔︎ 自动使用 hash 路由；
- ✔︎ 请求前缀配置使用子应用标识。如不携带子应用标识，则为 '/api'；
- ✔︎ 生产环境路由前缀携带子应用标识，本地环境则无；
- ✔︎ 生产和本地环境路由均使用 window.React，以便调试过程中不会造成文件过大；

## Install

```bash
# or yarn
$ npm install @szzj/umi-preset-subapp --save
```

## .umirc

```js
export default defineConfig({
  subapp: {
    /** 子应用名，不设置会使用 package.json 中的 name 值 */
    name: true,
    publicPath: false,
    proxyTarget: '/',
    hasNotLayoutContent: true,
    prefixWithSubappName: true,
  },
});
```

### 配置项

| 属性                 |  类型   |    默认值 |                                               意义 |
| :------------------- | :-----: | --------: | -------------------------------------------------: | ----------------------------------------------------------------------------- |
| devMode              |  'app'  |  'subapp' |                                          undefined | 本地开发模式，app 作为独立应用调试，subapp 作为子应用调试，布局需由主应用提供 |
| name                 | string  | undefined | 子应用标识，不设置会使用 package.json 中的 name 值 |
| publicPath           | string  | undefined |                                       资源加载路径 |
| proxyTarget          | string  | undefined |                                       后端服务地址 |
| hasNotLayoutContent  | boolean | undefined |                       是否需要 Layout.Content 包裹 |
| prefixWithSubappName | boolean | undefined |                         请求前缀是否携带子应用标识 |

## 子应用调试

在本地开发阶段，子应用有两种启动模式：

- devMode = 'app'：作为独立应用启动。路由前缀不会携带子应用名称，无 @szzj/layout 布局包裹
- devMode = 'subapp'：作为子应用启动。路由前缀会携带子应用名称，有 @szzj/layout 布局包裹

### 借助 ihost 共享 cookie

关于本地开发环境的登录问题，可借助 ihost 或 switch-host 共享 cookie 去实现。比如开放域即按如下方式完成登录：

1. ihost 配置 10.145.10.113 api-inner-gateway.dev.kfy.xip.io，访问 http://api-inner-gateway.dev.kfy.xip.io/opserver/login#/ 并登录；
2. ihost 配置 127.0.0.1 api-inner-gateway.dev.kfy.xip.io，访问 http://api-inner-gateway.dev.kfy.xip.io:8001/#/ 调试应用；
3. .umirc 配置文件，proxy 需代理至 ' http://10.145.10.113:30087/'；

一般系统中，可将 ihost 配置为 test.com 形式。
