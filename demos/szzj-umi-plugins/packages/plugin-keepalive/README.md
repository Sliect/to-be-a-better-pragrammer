# @szzj/umi-plugin-keepalive

提供 keep-alive 组件缓存能力。

- 对于 /apps/\:id 形式动态路由，keepalive 插件会根据实际的访问路径进行缓存，以免 /apps/1 跟 /apps/2 访问内容不一致。同一个动态路由下，仅会一份缓存数据；

## changelog

1. 4.0 版本使用 [react-activation](https://www.npmjs.com/package/react-activation)，需要手动安装 react-activation；
2. 4.1 版本使用 [react-stillness-component](https://www.npmjs.com/package/react-stillness-component)，需要手动安装 react-stillness-component；

react-stillness-component 使用 createPortal 渲染缓存组件，不会对 react 原生的 context 机制、合成事件有破坏性影响。您可以自行选用 @szzj/umi-plugin-keepalive@4.0 版本。

## Features

- ✔︎ 支持路由配置 keepAlive: true，自动对路由组件进行缓存；
- ✔︎ 导出 Offscreen 缓存组件, useStillnessManager, useStillness 钩子，KeepAliveWrapper 容器；

## Install

```bash
# or yarn
$ cnpm install @szzj/umi-plugin-keepalive --save
```

## .umirc

```js
export default defineConfig({
  szkeepalive: {},
});
```

### 配置项

| 属性            |  类型   |    默认值 |                                 意义 |
| :-------------- | :-----: | --------: | -----------------------------------: |
| keepAliveLayout | boolean | undefined | 是否将 KeepAliveWrapper 作为布局容器 |

## Apis

### useStillnessManager

useStillnessManager 管理内部存储的 redux 数据。

```tsx | pure
import { useStillnessManager } from 'umi';

function LogoutButton() {
  const { getActions } = useStillnessManager();

  return <a onClick={() => getActions().triggerClear()}>登出</a>;
}
```

### useStillness

useStillness 获取缓存组件再次渲染状态。

```tsx | pure
import { useStillness } from 'umi';

function Count(props) {
  const [count, setCount] = useState(0);
  const collected = useStillness({
    mounted: (contract) => {
      return 'mounted';
    },
    unmounted: (contract) => {
      return 'unmounted';
    },
    collect: (contract) => {
      return {
        isStillness: contract.isStillness(),
        stillnessId: contract.getStillnessId(),
        item: contract.getStillnessItem(),
      };
    },
  });

  useEffect(() => {
    console.log(collected);
  }, [collected]);

  return <div>...</div>;
}
```

## 注意

### keep-alive 插件须置于 layout 布局插件之先

keep-alive 插件会使用 umijs#addLayout 接口注册 KeepAliveWrapper 布局容器。umijs#addLayout 注册布局容器默认的执行顺序为 preset 在前，plugin 在后，越先调用 umijs#addLayout 的层级更深。比如在同时安装 preset-app、plugin-keepalive 的项目中，preset-app 注册的 ErrorBoundary 容器会在 KeepAliveWrapper 容器上游。因此，需要注意，当有布局插件通过 umijs#addLayout 渲染全局的菜单布局，为了使页面组件的缓存生效，keep-alive 插件需要在布局容器插件之前注册。

有时候，您可以使用 keep-alive 插件提供的 @szzj/umi-plugin-keepalive/lib/preset，以使 keep-alive 插件转换 preset，以便其最先注册，最后渲染。

【典型案例】DRS 主应用由 drs-plugin-layout 提供布局能力，当保证该插件注册在 keep-alive 插件之后，仅需对路由配置添加 keepAlive 配置项，即可开启页面的缓存能力。

### layout 布局作为 wrapper 存在

当 layout 作为 wrapper 时，通过 keep-alive 插件注册的 KeepAliveWrapper 布局容器将始终在 LayoutWrapper 之前渲染，也因此，它会导致 LayoutWrapper 以至于页面组件的重绘，缓存功能就会失效。

这时候，我们需要将 keepAliveLayout 配置项置为 false，额外将 umijs 导出的 KeepAliveWrapper 作为路由配置的 wrappers 配置。

```ts | pure
// src/wrappers/KeepAliveWrapper/index.ts
import { KeepAliveWrapper } from 'umi';

export default KeepAliveWrapper;
```

在有了这个 KeepAliveWrapper 之后，我们需要保证 KeepAliveWrapper 置于 LayoutWrapper 之后，比如：

```ts | pure
// .umirc
export default {
  szkeepalive: {
    // 关闭 KeepAliveWrapper 布局容器
    keepAliveLayout: false,
  },
  routes: [
    {
      path: '/',
      wrappers: [
        '@/wrappers/LayoutWrapper/index.tsx',
        '@/wrappers/KeepAliveWrapper/index.tsx',
      ],
      // KeepAliveWrapper 对这一组子路由生效，即这组子路由相互切换时会缓存页面
      routes: [
        {
          path: '/list',
          component: '@/pages/list',
          // 缓存页面
          keepAlive: true,
        },
      ],
    },
  ],
};
```

当路由配置上有多个使用 LayoutWrapper、KeepAliveWrapper 包裹的路由时，那么，在这些路由之间作切换时，页面缓存将失效。因此，在业务形态同一的单个布局系统中，尽量保证 LayoutWrapper 只有一份。当然，多份也会导致菜单不停重绘。

## develop

不兼容升级建议使用 minor 版本号。升级完成后，需要同步更新 template-pc、template-h5、template-subapp 等模板。

1. 更新 keepalive 插件代码及 README.md 文档，根目录 cnpm run build 打包；
2. 跳转到 features/keep-alive 目录，cnpm run dev 启动调试；
3. 跳转到 plugin-keepalive，cnpm publish 发布插件；
4. 同步更新 template-pc、template-h5、template-subapp 依赖，keepalive 依赖使用 '~4.1.0' 形式（即手动更新小版本）；
5. 调试 template-pc、template-h5、template-subapp 并发布；
