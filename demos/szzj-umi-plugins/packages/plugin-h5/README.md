# @szzj/umi-plugin-h5

为了简化应用开发成本。

## Features

- ✔︎ 简化 .umirc 配置；
- ✔︎ 默认启用 css module 小驼峰式编程；
- ✔︎ 支持仅对 chunk 使用 hash 名；
- ✔︎ 内置 403, 404, 500 页面及路由；
- ✔︎ 内置 Loading 组件；
- ✔︎ 配置开启 eruda 调试；
- ✔︎ 配置加载政务网头尾；
- ✔︎ 默认兼容 chrome@49, firefox@64, safari@10, edge@13, ios@10, ie@11；
- ✔︎ 读取路由配置，自动设置 title；

## Install

```bash
# or yarn
$ npm install @szzj/umi-plugin-app --save
```

## .umirc

```js
export default defineConfig({
  szapp: {
    zzd: true,
  },
});
```

### 配置项

| 属性          |  类型   |    默认值 |                                                                 意义 |
| :------------ | :-----: | --------: | -------------------------------------------------------------------: |
| debug         | boolean | undefined |                                                  是否加载 eruda 调试 |
| zlb           | boolean | undefined |  是否 irs 部署，前后端完全分离；自动加载浙里办 jsbridge、埋点 bridge |
| zzd           | boolean | undefined |                   是否 irs 部署，前后端完全分离；自动加载埋点 bridge |
| history       | string  |    'hash' |                                                             路由模式 |
| publicPath    | string  |       '/' | publicPath，开发环境始终会使用 '/'。zzd = true 时，打包始终使用 './' |
| onlyChunkHash | boolean | undefined |            仅 chunk 打包时携带 hash 值，否则入口文件也会携带 hash 值 |
| errorPages    | boolean |      true |      是否包含内置的 403、404、500 错误页面，需要自行安装 antd-mobile |

特殊说明：

- 插件会修改 umi 的默认配置，因此优先级低于用户配置；
- onlyChunkHash 当前后端完全分离时，入口文件和 chunk 资源均可以携带 hash 值；当 html 放在后端工程中，入口文件不应携带 hash 值，onlyChunkHash 可设为 true；
- irs 部署时，可将 zzd 或 zlb 配置项置为 true，那样打包时会自动将 publicPath 设为 './' 且打包内容包含 react、react-dom，以便正常加载到 chunk 资源；

### 调试

当将 debug 配置项置为 true 时，插件会自动加载 eruda 并启用。如需使用 vconsole 调试，可自行安装 vconsole 并启动。

如果调试功能启用取决于当前访问用户是否在白名单时，自定安装 eruda 并启用。

## 自动设置 title

插件会自动读取路由配置中的 title，并以此修改 document.title。因此，当您在路由配置中添加如下配置时：

```ts | pure
export default {
  routes: [
    {
      path: '/home',
      component: '@/pages/home',
      title: '余杭区基层工作台',
    },
  ],
};
```

那么，在访问 /home 页面时，document.title 会自动修改为“余杭区基层工作台”。

## 内置错误页面等

<!-- <code src="./src/gens/403/index.tsx">403 错误页面</code>

<code src="./src/gens/404/index.tsx">404 错误页面</code>

<code src="./src/gens/500/index.tsx">500 错误页面</code> -->
<!--
<code src="./src/gens/Loading/index.tsx">加载中组件</code> -->
