# 代码调试

attach: 在谷歌快捷方式的属性里末尾添加 -remote-debugging-port=9222，重新打开浏览器后，启动vscode 的 attach 型的debug 模式，且port 为9222

resolveSourceMapLocations 默认只支持项目文件下的sourcemap, 且不支持node_modules下的sourcemap, 如果node_modules下的包带了sourcemap，可以修改配置后调试源码，如果不带，需要自己手动打包(可能默认打包不生成sourcemap,需要改打包的配置)去覆盖源码及sourcemap,并将sourcemap中指向源码的相对路径改为绝对路径

``` 
// --depth=1 是下载单个commit 
// --single-branch 是下载单个分支 
// 可以提升下载速度
git clone --depth=1 --single-branch git@github.com:ant-design/ant-design.git
```

## react 源码调试

0. 新建一个目录foo包含 react项目 和 cra项目
1. cra 启动项目, npm run eject 后修改 config/webpack.config.js,在尾部添加
``` js
externals: {
  react: 'React',
  'react-dom': 'ReactDOM'
}
```
2. clone react 项目打包 react 和 react-dom
3. 修改 react 项目的 script/rollup/build.js 里 sourcemap 设为 true, getPlugins函数里的插件注释掉 5 个影响 sourcemap 生成的插件
``` js
// {
//   transform(source) {
//     return source.replace(/['"]use strict["']/g, '');
//   },
// },

// isProduction &&
//   closure({
//     compilation_level: 'SIMPLE',
//     language_in: 'ECMASCRIPT_2015',
//     language_out:
//       bundleType === BROWSER_SCRIPT ? 'ECMASCRIPT5' : 'ECMASCRIPT5_STRICT',
//     env: 'CUSTOM',
//     warning_level: 'QUIET',
//     apply_input_source_maps: false,
//     use_types_for_optimization: false,
//     process_common_js_modules: false,
//     rewrite_polyfills: false,
//     inject_libraries: false,

//     // Don't let it create global variables in the browser.
//     // https://github.com/facebook/react/issues/10909
//     assume_function_wrapper: !isUMDBundle,
//     renaming: !shouldStayReadable,
//   }),

// shouldStayReadable &&
//   prettier({
//     parser: 'babel',
//     singleQuote: false,
//     trailingComma: 'none',
//     bracketSpacing: true,
//   }),

// isProduction && stripUnusedImports(pureExternalModules),

// {
//   renderChunk(source) {
//     return Wrappers.wrapBundle(
//       source,
//       bundleType,
//       globalName,
//       filename,
//       moduleType,
//       bundle.wrapWithModuleBoundaries
//     );
//   },
// },
```
4. react打包后将react-development.js,react-development.js.map,react-dom-development.js,react-dom-development.js.map 的umd版本复制到cra项目的public下
5. 在 public/index.html 里添加
``` html
<script src="./react.development.js"></script>
<script src="./react-dom.development.js"></script>
```

--- 以上能跳转源码位置，但是不能定位源码文件 ---

6. 修改 react 项目的 script/rollup/build.js 里 sourcemap 设为 true 的下面加上以下配置
``` js
sourcemapPathTransform(relativePath) {
  return relativePath.replace('..\\..\\..\\..\\packages', 'C:\\Users\\dell\\Desktop\\react-debug\\react\\packages')
},
```
7. 重新打包react项目
8. 将打包后的那四个文件复制到 cra项目的 public下
9. 配置foo项目的 vscode debug 配置，在项目中打上断点，即可跳转 react项目的源码位置，并且也能在 react项目中打断点


### antd 调试

Button.tsx --tsc--> Button.js --babel--> Button.js --> bundle.js
每一环节都要生成sourcemap，才能定位到最开始的源码
[devtools](https://webpack.js.org/configuration/devtool/#special-cases) 设为 cheap-module-source-map 建立ts-loader的sourcemap

1. clone antd 项目，安装依赖
2. 在 node_modules/@ant-design/tools/lib/getWebpackConfig.js 里
  2.1 将 devtools: 'source-map' 改成 devtools: 'cheap-module-source-map',
  2.2 babelConfig.sourcemap设为true
3. 将 antd 的tsconfig.json中 将 sourceMap 设为 true
4. 运行npm run dist
5. 拷贝 antd.js 和 antd.js.map 到 node_modules/antd/dist 下
6. 配置vscode 如下
``` js
{
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```
7. 引用antd 改为 import { Button } from 'antd/dist/antd';
8. 打断点调试

## node 调试

1. 配置 vscode debug
``` js
{
  "name": "node 调试 attach",
  "port": 8888,
  "request": "attach",
  "skipFiles": [
    "<node_internals>/**"
  ],
  "type": "node"
},
```
2. 执行命令 node --inspect-brk=8888 xxx.js
3. 点击debug调试

或者配置以下后点debug调试
``` js
{
  "name": "node 调试 launch",
  "program": "${workspaceFolder}/demo/src/main.js",
  "request": "launch",
  "skipFiles": [
    "<node_internals>/**"
  ],
  "type": "node",
  "stopOnEntry": true
},
```