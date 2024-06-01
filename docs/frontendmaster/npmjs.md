# npmjs

## npm 机制

设计哲学：优点是局部安装，减轻版本兼容的压力，缺点是可能要多次安装

### npm install 的安装流程

1. 检查 config
2. 有无 lock 文件？
3. 若有则查看与 package.json 声明版本是否一致？  
   3.1 若版本一致则检查缓存  
   3.2 若版本不一致,且 lock 文件和 package.json 兼容则按 lock 文件安装;不兼容则按 package.json 安装，且更新 lock 文件
4. 若没有则获取包信息并构建依赖树
5. 检查缓存？（同 3.1）
   5.1 若无缓存则下载包资源并添加到缓存
   5.2 若有缓存则到步骤 6
6. 解压到 node_modules
7. 生成 lock 文件

## npm 缓存机制

npm 全局环境下有个 \_cacache 目录，目录下有 content-v2, index-v5, tmp 三个子目录

- npm cache clean --force 命令会删除 \_cacache 目录
- content-v2 下面存着二进制文件，修改其扩展名即可解压成 npm 包资源
- index-v5 存着 content-v2 里文件的索引
- lock 文件中存储的信息会生成一个唯一的 key 对应 index-v5 目录下的缓存记录，若发现缓存资源则根据索引找到 npm 包资源，并解压到相应项目的 node_modules 下面

## npm link

1. 在当前项目 foo 中执行 npm link, 将当前项目 foo 链接到全局环境
2. 进入项目 bar 中执行 npm link foo, foo 会被链接到 bar/node_modules 下面
3. foo 中的修改会被直接映射到 bar 项目, 方便调试
4. 在 bar 项目下执行 npm unlink foo 解除对 foo 模块的依赖
5. 在 foo 项目下执行 npm unlink 解除全局环境上 foo 的软链

## npx

可以直接执行 node_modules/.bin 文件夹下的文件，且会在执行模块时优先安装依赖，在安装执行后便删除此依赖，避免全局安装模块带来的问题

## yarn

npm dedupe 会优化重构 node_modules 结构, yarn 在安装依赖得时候会自动执行 dedupe 命令

## npmjs 依赖库

react-scripts create react app, 用 react-scripts start 启动

fast-deep-equal 对象深比较

copy-to-clipboard 复制

husky git 提交前的钩子

pretty-quick 快速 pretty

react-use-gesture 鼠标和手势库，配合 react-spring 动画库一起使用

puppeteer Puppeteer 是一个 Node 库，它提供了高级 API 来通过 DevTools 协议控制 Chrome 或 Chromium

pdf-merge 合并 pdf

commitizen git 提交规范

minimist 解析 node 命令传参，pnpm 才会给脚本后自动加上参数

esbuild go 语言实现的构建工具

nrm 管理多个 npm 源

concurrently 同时执行多个 node 命令

pnpm 包管理工具

nodemon 监听 js 变化后自动运行

commander 命令行的解决方案

enquirer 命令行选择交互

mousetrap 键盘交互监听

speed-measure-webpack-plugin 速度分析插件作用

@ebay/nice-modal-react 全局弹窗

eruda 调试栏

patch-package 保留依赖修复操作

zustand 状态管理库

fast-glob 文件目录操作

execa nodejs 执行 bin 命令

chalk 终端字符串样式

semver 版本计算

@dnd-kit/core  拖动

figlet 终端字符串图形

cli-progress  终端进度条

jsonwebtoken  jwt鉴权

passport      身份认证

winston       nojs日志记录

pm2           生产环境进程管理和监控

react-grid-layout  栅格布局

allotment     拖动分配面板大小

@monaco-editor/react 在线编辑器

@typescript/ata   自动下载用到的类型包

dompurify     预防xss攻击

he            html转译

click-to-react-component  点击浏览器元素，打开vscode源码文件

@floating-ui  浮动元素定位

react-intl    国际化
