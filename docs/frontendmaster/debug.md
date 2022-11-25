# 代码调试

attach: 在谷歌快捷方式的属性里末尾添加 -remote-debugging-port=9222，重新打开浏览器后，启动vscode 的 attach 型的debug 模式，且port 为9222

resolveSourceMapLocations 默认只支持项目文件下的sourcemap, 且不支持node_modules下的sourcemap, 如果node_modules下的包带了sourcemap，可以修改配置后调试源码，如果不带，需要自己手动打包(可能默认打包不生成sourcemap,需要改打包的配置)去覆盖源码及sourcemap,并将sourcemap中指向源码的相对路径改为绝对路径

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