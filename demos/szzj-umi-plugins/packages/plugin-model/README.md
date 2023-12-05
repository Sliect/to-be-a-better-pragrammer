# @szzj/umi-plugin-model

主要功能与 umijs 官方插件保持一致，避免加载过多依赖。

## Features

- ✔︎ 注册启用。
- ✔︎ 扩展 excludeModels，用于排除指定 model。

## Install

```bash
# or yarn
$ npm install @szzj/umi-plugin-model --save
```

## .umirc

```js
export default defineConfig({
  /** 额外的 model */
  extraModels: [],
  /** 无需包含的 model。多端发布，裁剪功能时可能需要 */
  excludeModels: [],
});
```
