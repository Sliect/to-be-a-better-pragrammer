# @szzj/umi-plugin-sentry

## install

```bash
$ npm install @szzj/umi-plugin-sentry
```

## usage

```ts
// .umirc.ts
{
  sentry: {
    dsn: string;// sentry 配置
    debug: boolean;// 是否开启用户反馈
    importUmiRequest: string;// umiRequest 加载方式
    captureConsole: boolean;// 是否上报 console.error
    sessionReplay: boolean;// 是否录屏
    client: string;// 客户端类型
  },
  plugins: ['@szzj/umi-plugin-sentry']
}
```
