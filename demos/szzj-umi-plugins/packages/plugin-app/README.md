# @szzj/umi-plugin-app

为了简化应用开发成本。

## Features

- ✔︎ 简化 .umirc 配置；
- ✔︎ 默认启用 css module 小驼峰式编程；
- ✔︎ 支持仅对 chunk 使用 hash 名；
- ✔︎ 内置 403, 404, 500, network-error, building 页面及路由；
- ✔︎ 内置 Loading 组件；
- ✔︎ 配置开启 ErrorBoundary 容器包裹；
- ✔︎ 配置开启 eruda 调试；
- ✔︎ 配置加载政务网头尾；
- ✔︎ 默认兼容 chrome@49, firefox@64, safari@10, edge@13, ios@10, ie@11；

## Install

```bash
# or yarn
$ cnpm install @szzj/umi-plugin-app --save-dev
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

| 属性          |      类型       |    默认值 |                                                                 意义 |
| :------------ | :-------------: | --------: | -------------------------------------------------------------------: |
| debug         |     boolean     | undefined |                                                  是否加载 eruda 调试 |
| zwfw          |     boolean     | undefined |                                     是否加载政务服务网头部、尾部内容 |
| zzd           |     boolean     | undefined |                   是否 irs 部署，前后端完全分离；自动加载埋点 bridge |
| history       |     string      |    'hash' |                                                             路由模式 |
| publicPath    |     string      |       '/' | publicPath，开发环境始终会使用 '/'。zzd = true 时，打包始终使用 './' |
| onlyChunkHash |     boolean     | undefined |            仅 chunk 打包时携带 hash 值，否则入口文件也会携带 hash 值 |
| errorPages    | object, boolean |      true |             是否包含内置的 403、404、500 错误页面，需要自行安装 antd |
| errorBoundary |     boolean     |     false |                                          是否包含 ErrorBoundary 容器 |

errorPages 对象形式可配置如下值：

| 属性    |  类型  |    默认值 |                         意义 |
| :------ | :----: | --------: | ---------------------------: |
| belong  | string | undefined | 应用归属单位，浙政钉规范需要 |
| manager | string | undefined |   应用管理员，浙政钉规范需要 |
| mobile  | string | undefined |     联系方式，浙政钉规范需要 |

特殊说明：

- 插件会修改 umi 的默认配置，因此优先级低于用户配置；
- onlyChunkHash 当前后端完全分离时，入口文件和 chunk 资源均可以携带 hash 值；当 html 放在后端工程中，入口文件不应携带 hash 值，onlyChunkHash 可设为 true；
- irs 部署时，可将 zzd 配置项置为 true，那样打包时会自动将 publicPath 设为 './' 且打包内容包含 react、react-dom，以便正常加载到 chunk 资源；

### 调试

当将 debug 配置项置为 true 时，插件会自动加载 eruda 并启用。如需使用 vconsole 调试，可自行安装 vconsole 并启动。

如果调试功能启用取决于当前访问用户是否在白名单时，自定安装 eruda 并启用。

## 内置错误页面等

### 错误页面

错误页面基于 @szzj/components [Result](http://10.145.11.75:8080/gui/szzj-components#/components/result) 组件。

<code src="./docs/403.tsx">403 错误页面</code>

<code src="./docs/404.tsx">404 错误页面</code>

<code src="./docs/500.tsx">500 错误页面</code>

<code src="./docs/network-error.tsx">网络错误页面</code>

<code src="./docs/building.tsx">建设中页面</code>

### ErrorBoundary

错误页面基于 @szzj/components [ErrorBoundary](http://10.145.11.75:8080/gui/szzj-components#/components/error-boundary) 组件。

<code src="./docs/error-boundary.tsx">ErrorBoundary 容器</code>

### Loading 加载中

错误页面基于 @szzj/components [Loading](http://10.145.11.75:8080/gui/szzj-components#/components/loading) 组件。

<code src="./docs/loading.tsx">加载中组件</code>

## 兼容性情况（截止 2023.06.14）

### web 端

### 国产信创电脑

### 浙政钉 pc 端

- 浏览器版本：chrome/91
- 浙政钉版本：2.13.2
- 全量 ua：Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36 dingtalk-win/1.0.0 nw(0.14.7) DingTalk(2.13.2-Release.27) TaurusApp(tauruszjd/2.13.2.27) Mojo/1.0.0 Native AppType(release) TaurusLanguage/zh_CN

### 浙政钉安卓手机端

- 浏览器版本：chrome/69
- 浙政钉最新版本：2.14.0
- 全量 ua：Mozilla/5.0 (Linux; U; Android 10; zh-CN; CDY-AN00 Build/HUAWEICDY-AN00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.100 UWS/3.22.2.57 Mobile Safari/537.36 UCBS/3.22.2.57_221124174238 ChannelId(8) NebulaSDK/1.8.100112 Nebula TaurusApp(zhejiang/2.13.5.2) TaurusLanguage/zh_CN TaurusFontSizeType/1 PhoneType/Phone mPaaSClient

### 浙政钉苹果手机端

- ios 版本：16.0.2
- 浙政钉最新版本：2.14.1
- 全量 ua：Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20A380 ChannelId(62) NebulaSDK/1.8.100112 Nebula TaurusApp(zhejiang/2.14.1) TaurusLang
