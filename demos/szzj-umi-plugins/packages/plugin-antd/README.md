# @szzj/umi-plugin-antd

扩展 antd 插件，适配 antd-mobile。

## Features

- ✔︎ 注册启用。
- 按需加载 antd-mobile。

## Install

```bash
# or yarn
$ npm install @szzj/umi-plugin-antd --save
```

## .umirc

```js
export default defineConfig({
  antd: {
    dayjs: true,
    import: true,
    style: 'css',
  },
});
```
