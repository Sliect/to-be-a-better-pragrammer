# @szzj/umi-plugin-qiankun-vue2

## Features

- ✔︎ 支持 vue@2 作为主应用；
- 支持主应用通过 useQiankunStateForSlave 导出共享数据；
- qiankun.master 配置不支持 routes 选项；
- 内置 Loading，不允许定制；
- 内置 ErrorBoundary，不允许定制；
- 不再支持 appNameKeyAlias 配置；
- 访问 microApp 方式变更为 this.$refs.getMicroApp()；

## Install

```bash
# or yarn
$ npm install @szzj/umi-plugin-qiankun-vue2 --save
```

## .umirc

```js
export default defineConfig({
  qiankun: {
    master: {},
  },
});
```

## useQiankunStateForSlave

通过 vuex 共享数据。

```js
import store from '@/store';

export const useQiankunStateForSlave = () => {
  return {
    userInfo: store.state.user.userInfo,
  };
};
```
