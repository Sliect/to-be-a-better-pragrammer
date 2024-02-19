# vite

no-bundle(源码): 利用浏览器原生 ES 模块的支持，实现开发阶段的 Dev Server，进行模块的按需加载，而不是先整体打包再进行加载

在第一次运行vite时，会 Dependency Pre-Bundling ，是为了将依赖都转换成ESM规范，其次将包含多个内部模块的ESM转换成单个模块，提供页面加载性能；如果发现找不到缓存，会自动找到后缓存

如果有一个无法在源代码中直接发现的导入，比如用插件转换而创建的。这意味着Vite无法在初始扫描中发现导入，只能在浏览器请求并转换文件后发现，这将导致服务器在启动后立刻重新捆绑。可以用optimizeDeps.include 和 optimizeDeps.exclude 来自定义处理

Esbuild 作为构建的性能利器，Vite 利用其 Bundler 的功能进行依赖预构建，用其 Transformer 的能力进行 TS 和 JSX 文件的转译，也用到它的压缩能力进行 JS 和 CSS 代码的压缩

在 Vite 当中，无论是插件机制、还是底层的打包手段，都基于 Rollup 来实现，可以说 Vite 是对于 Rollup 一种场景化的深度扩展，将 Rollup 从传统的 JS 库打包场景扩展至完整 Web 应用打包

项目初始化
> pnpm create vite

### FQA

q: 如何避免使用node环境特性时报错
a: pnpm i @types/node -D

q: 如何自动引入
a: 在vite.config.ts中配置如下
``` ts
const variablePath = normalizePath(path.resolve(__dirname, './src/variable.scss'))

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // 注入额外的代码
        additionalData: `@import "${variablePath}";`
      }
    }
  }
});
```

q: 如何使用css modules
a: vite内置了Css Modules, 需要将xxx.scss命名为xxx.module.scss, 然后在tsx中以对象的形式引入

q: 如何为vite添加css的autoprefixer
a: 内联配置后, vite不会搜索postcss的配置文件
```ts
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  }
});
```

q: 如何添加cssinjs
a:
```ts
export default defineConfig({
  plugins: [
    react({
      babel: {
        // 加入 babel 插件
        // 以下插件包都需要提前安装
        // 当然，通过这个配置你也可以添加其它的 Babel 插件
        plugins: [
          // 适配 styled-component
          "babel-plugin-styled-components"
          // 适配 emotion
          "@emotion/babel-plugin"
        ]
      },
      // 注意: 对于 emotion，需要单独加上这个配置
      // 通过 `@emotion/react` 包编译 emotion 中的特殊 jsx 语法
      jsxImportSource: "@emotion/react"
    })
  ]
})
```

q: 如何集成unocss
a: 配置如下
> pnpm i @unocss/vite unocss -D
```ts
// main.ts
// 需要在入口文件中中引入这个样式文件，样式才会生效
import 'uno.css';
```
```ts 
// vite.config.ts
import UnoCSS from '@unocss/vite';

export default defineConfig({
  plugins: [UnoCSS(), react()],
});
```
```ts
// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  shortcuts: [
    {
      // 集合简写
      // 如 'flex-c': 'flex justify-center items-center'
    },
  ],
  theme: {
    colors: {
      // ...
    },
  },
  presets: [
    presetUno(),
    presetAttributify({
      // 集合简写的前缀
      // 如: uno-p="y-2 x-4"
      prefix: 'uno-',
    }),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
```

q: 在vite中如何将svg用组件的方式引入
a: 配置如下
> pnpm i vite-plugin-svgr -D
```ts
// vite.config.ts
import svgr from 'vite-plugin-svgr';

{
  plugins: [
    // 其它插件省略
    svgr()
  ]
}
```

```json
{
  "compilerOptions": {
    // 省略其它配置
    "types": ["vite-plugin-svgr/client"]
  }
}
```

```ts
import ReactLogo from '@assets/react.svg?react';

export default function() {
  return <ReactLogo />
}
```

q: React为什么本地会渲染两次
a: React的开发环境在严格模式下会渲染两次，去掉 React.StrictMode 即可

q: 在vite中如何使用web worker,新开线程处理复杂计算
a: 示例如下
```js
// example.js
const start = () => {
  let count = 0;
  setInterval(() => {
    postMessage(++count);
  }, 2000)
}
start();
```

```tsx
import Worker from './example.js?worker';

export default function() {
  useEffect(() => {
    const worker = new Worker();
    worker.addEventListener('message', (e) => {
      console.log(e.data);
    })    
  }, [])
}
```

q: 特殊资源后缀
a: ?url 表示获取资源的路径, ?raw 表示获取资源的字符串内容, ?inline 表示资源强制内联,而不是打包成单独的文件

q: 环境变量配置
a: 在根目录下创建.env.development和.env.production, 只有VITE_ 为前缀的key会被打包暴露出去, 访问方式为 import.meta.env.VITE_XXX, 也可以在模板html中用 %VITE_XXX% 使用

q: 如何开启图片压缩
a: 配置如下
> pnpm i -D unplugin-imagemin

```ts
import imagemin from 'unplugin-imagemin/vite';

{
  plugins: [imagemin({})],
}
```

q: import.meta.glob 语法糖怎么用
a: 使用如下
```ts
// 同步引入 key: 路径  value: 对象
const icons = import.meta.glob('@/assets/icons/logo-*.svg', {
  eager: true,
});
const iconUrls = Object.values(icons).map((mod) => mod.default);
```

q: 如何使用 patch-package
a: 配置如下
pnpm 自身支持patch, 不需要安装 patch-package

修改node_modules下的第三方库,建议安装指定版本,比如 lodash@4.17.21
> pnpm patch lodash@4.17.21
会在本地临时文件夹生成一个软链, 然后在上面进行自定义修改后
> pnpm patch-commit <path>  #path为临时生成的目录位置
因为vite的依赖是强缓存,需要在vite项目中删除.vite后重启,即可将修改生效,git提交后,所有用户只需要删除.vite重启即可应用
> pnpm patch-remove lodash@4.17.21 
移除自定义补丁,同理此操作也需删除.vite后重启

q: 如何使用虚拟模块
a: 分以下几步
在插件中声明虚拟模块
```ts
// plugins/virtual-module.ts
export default function myPlugin() {
  const virtualModuleId = 'virtual:my-module'
  // Vite 中约定对于虚拟模块，解析后的路径需要加上`\0`前缀
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'my-plugin', // 必须的，将会在 warning 和 error 中显示
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        // 也可以在各个钩子里缓存配置信息
        // 通过虚拟模块直接获取配置信息
        return `export const msg = "from virtual module"`
      }
    },
  }
}

// vite.config.ts
import virtual from './plugins/virtual-module.ts'

// 配置插件
{
  plugins: [react(), virtual()]
}
```
引用虚拟模块
```ts
// 为了typescript不报错，需要声明一个 .d.ts 文件
import { msg } from 'virtual:my-module'

console.log(msg)

// shim.d.ts
declare module 'virtual:my-module' {
  export default any;
  export const msg = string;
  export const resolvedConfig = string;
}
```

q: 如何调试插件
a: 在plugins里引入vite-plugin-inspect插件，在 http://localhost:5173/__inspect/#/ 下查看项目的模块和栈信息

q: HMR 热插拔
a: accept、dispose
“接受” 热更新的模块被认为是 HMR 边界，即对自身模块热更新要写在当前文件，对依赖模块热更新要写在引入依赖的页面
1. 接受自身模块更新
2. 接受依赖模块更新
dispose 用来清除副作用，比如清理定时器等
data 用于将信息从模块的前一个版本传递到下一个版本

q: 如何进行产物分析报告
a: rollup-plugin-visualizer 插件

q: build.target 是什么意思
a: 默认是modules, 表示默认兼容的浏览器为 ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'], 要兼容更低版本的浏览器, 可以设置为 es2015

q: build.cssTarget
a: 在需要兼容安卓端微信的 webview 时, 需要将 build.cssTarget 设置为 chrome61，以防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式


