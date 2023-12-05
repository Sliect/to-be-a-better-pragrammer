# @szzj/umi-plugin-qiankun

主要功能与 umijs 官方插件保持一致，避免加载过多依赖。

## Features

- ✔︎ 追加 MicroApp 渲染过程中错误提示。

## Install

```bash
# or yarn
$ npm install @szzj/umi-plugin-qiankun --save
```

## .umirc

```js
export default defineConfig({
  qiankun: {
    master: {},
  },
});
```
