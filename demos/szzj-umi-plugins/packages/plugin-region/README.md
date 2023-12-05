# @szzj/umi-plugin-region

适用于多地部署场景插件。

## Features

- ✔︎ 自动注册；
- ✔︎ 为 umi 工程添加 process.env.NODE_ENV, process.env.DEPLOY_ENV, process.env.DEPLOY_REGION；
- ✔︎ umi 导出添加 NODE_ENV, DEPLOY_ENV, DEPLOY_REGION；
- ✔︎ umi 导出添加 IS_LOCAL, IS_DEV, IS_PROD；
- ✔︎ umi 导出添加 IS_IN_ZLB, IS_IN_ALIPAY, IS_IN_ZLB_OR_ALIPAY_OR_WECHAT, IS_IN_ZZD；
- ✔︎ 优先加载指定部署地域的脚本；
- ✔︎ 打包添加版本，环境，部署地域，日期等信息，以便查验；
- ✔︎ umi 导出添加 useRegions，读取多地部署文案regions夹下内容

## Install

```bash
# or yarn
$ npm install @szzj/umi-plugin-region --save
```

## .umirc

```ts | pure
export default defineConfig({
  szrequest: {
    // 是否 IRS 应用发布系统部署
    irs: false,
  },
});
```

## 环境

### 测试环境、生产环境

一般来说，可通过 process.env.DEPLOY_ENV === 'dev' 区分测试环境，通过 process.env.DEPLOY_ENV === 'prod' 区分生产环境。

如果应用通过 IRS 发布，测试环境以及生产环境的打包命令通常是一致的，就需要通过判断访问地址是否携带 '/reserved'，来区分生产环境。
