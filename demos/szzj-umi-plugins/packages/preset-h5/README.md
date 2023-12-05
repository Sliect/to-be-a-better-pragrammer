# @szzj/umi-preset-h5

为了简化应用开发成本。

## Features

- ✔︎ 简化 .umirc 配置。
- ✔︎ 区分 pc 和 mobile 端，按需加载 antd 或 antd-mobile。
- ✔︎ 支持仅对 chunk 使用 hash 名。

## Install

```bash
# or yarn
$ npm install @szzj/umi-preset-h5 --save
```

## .umirc

```js
export default defineConfig({
  szh5: {
    zlb: true,
    mobile: false,
    publicPath: '/',
    onlyChunkHash: true,
  },
});
```

## history

- 4.0 版本：PageResponse 使用 current 等；
- 4.1 版本：PageResponse 使用 pageNum 等；
