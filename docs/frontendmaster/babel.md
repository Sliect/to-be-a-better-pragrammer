# babel

> ### babel 的整体流程
>
> - input string -> `@babel/parser` parser -> `AST` -> transformer[s] -> `AST` -> `@babel/generator` -> output string
>
> ### babel 的核心库
>
> - @babel/parser
>
>   - 解析 js 代码为 ast
>
>     - 词法分析，语法分析
>
>   - babelparse.parse(code, options)
>   - babelparse.parseExpression(code, options)
>
> - @babel/core
>
>   - 修改 ast，增删改
>
>     - babel.transform
>     - babel.transformSync
>     - babel.transformAsync
>     - babel.transformFile
>     - babel.transformFileSync
>     - babel.transformFileAsync
>     - babel.transformFromAst
>     - babel.transformFromAstSync
>     - babel.transformFromAstAsync
>
>   ```
>    const babel = require('babel-core')
>    babel.transformFile('./demo.js', {
>      presets: [],
>      plugins: []
>    }, function(err, result) {
>      console.log(result)
>    })
>   ```
>
> - @babel/traverse
> - @babel/generator
>
>   - 将 ast 转换成 js 代码
>   - generate(ast, options, code)
>
> ### babel 其他库
>
> - @babel/cli
>
>   - 命令工具
>
> - @babel/types
>
>   - used to validate, build and change AST nodes
>
> - @babel/polyfill
>
>   - core-js 和 regenerator-runtime 的封装
>   - 用于模拟完整的 es2015+ 的环境（不包括第四阶段的提议）
>   - 在入口顶部引入
>   - 建议在应用中使用，而不是在库开发中使用
>   - @babel/polyfill 是一个大而全的方案，除非是不考虑体积性能的项目，一般不建议使用。
>   - 可以使用 @babel/preset-env useBuildIn 来代替，或者从 core-js 中手动引入需要的 polyfill
>
>     - 当 useBuildIn：usage，需要安装 @babel/polyfill
>     - 当 useBuildIn：entry，安装 @babel/polyfill 同时入口顶部引入
>     - 当 useBuildIn：false，安装 @babel/polyfill 同时入口顶部引入
>     - 需要结合 transform-runtime
>
>   - babel 7.4 不建议使用了，直接用 core-js 和 regenerator-runtime
>
>   ```js
>   import "core-js/stable";
>   import "regenerator-runtime/runtime";
>   ```
>
>   - @babel/polyfill 里包含了什么？
>   - 了解下 core-js ？
>
>     - 几乎实现了所有的 polyfill，但是没有实现 generator，所以需要 regenerator-runtime 来解决 generator 的兼容性
>
>   - 了解 regenerator-runtime ？
>
>     - 实现 generator 函数的兼容性
>
> - @babel/runtime
>
>   - 包含 Babel modular runtime helpers 和 `regenerator-runtime`
>   - 作为 @babel/plugin-transform-runtime 的 runtime 依赖。
>   - 简单来说：
>
>     - babel 会在源码中插入一些 helper 来解决兼容性问题
>     - @babel/plugin-transform-runtime 能识别这些 helper，然后改成从 @babel/runtime 里引入的方式，来达到减少代码体积
>
>     ```js
>     // code
>     class Circle {}
>
>     // turn into
>     function _classCallCheck(instance, Constructor) {
>       // this is a helper func
>     }
>     var Circle = function Circle() {
>       _classCallCheck(this, Circle);
>     };
>
>     // use @babel/plugin-transform-runtime
>     var _classCallCheck = require("@babel/runtime/helpers/classCallCheck"); // helper from babel-runtime
>
>     var Circle = function Circle() {
>       _classCallCheck(this, Circle);
>     };
>     ```
>
>   - 将 babel 插入到源码中的一些 helper 提取到一个独立的模块中引入，以减少代码重复来减少 polyfill 的体积
>   - 同时还可以避免某些全局污染，例如：promise、set、map 等，@babel/runtime 会将他们重新命名，避免全局污染
>   - 具体做了什么？
>
>     - `@babel/runtime/regenerator`当您使用生成器/异步功能（可通过该`regenerator`选项切换）时自动需要。
>     - 根据项目使用，必要时按需引入 core-js 里的函数，而不是假设用户会对其进行填充（可通过该`corejs`选项切换）
>     - 删除内嵌的 Babel 的 helper 函数，并在`@babel/runtime/helpers`中引入对应模块（可通过该`helpers`选项切换）。
>
>   ```
>     {
>       "plugins": [
>         [
>           "@babel/plugin-transform-runtime",
>           {
>             "absoluteRuntime": false,
>             "corejs": false, // 推荐 corejs 3
>             "helpers": true, // 通过独立模块来替换 inline 的 helper
>             "regenerator": true, // 修改名称，避免全局命名污染
>             "useESModules": false,
>             "version": "7.0.0-beta.0"
>           }
>         ]
>       ]
>     }
>
>     // 代码调用
>     require("@babel/core").transform("code", {
>       plugins: ["@babel/plugin-transform-runtime"],
>     })
>
>     // corejs option
>     false	npm install --save @babel/runtime
>     2	npm install --save @babel/runtime-corejs2
>     3	npm install --save @babel/runtime-corejs
>   ```
>
>   - @babel/runtime-corejs-2 和 @babel/runtime-corejs-3 有什么不同？
>
>     - @babel/runtime-corejs-2
>
>       - 内置类型
>       - 类型的静态方法
>
>     - @babel/runtime-corejs-3
>
>       - 内置类型
>       - 类型的静态方法
>       - 类型的实例方法
>
> - @babel/register
>
>   - 实时编译，适用于开发阶段，多用在 node 应用，做实时编译
>   - 如何使用？
>
>   ```js
>     // register.js
>     require('babel-register)
>     require('./my-demo.js')
>
>     // run:
>     node register.js
>
>     // 或者 npm script
>     'build': 'babel-node register.js'
>   ```
>
>   - babel-node vs babel-cli
>
>     - babel-node 提供一个支持 ES6 的 REPL 环境，能直接运行 es6 代码
>
> - @babel/template
> - @babel/helpers
> - @babel/core-frame
>
> ### babel preset
>
> - preset 是 plugin 的集合
> - @babel/preset-env
>
>   - 包含了以下 plugin
>
>     - es5
>     - es2015
>     - es2016
>     - es2017
>     - es2018
>
>   - 不包含实验性的 plugin
>
>     - 可以通过 结合 stage-x 来覆盖
>     - stage-x 包含了不同阶段的试验性 plugin，但是 babel 7 已经不支持 preset-stage-x 了，只能将这些 preset 里的 plugin 手动一一配置到 plugin 里
>
>   - 所以 preset-env + 实验性特性的覆盖面是最广的。实验性特性要一一添加，没有 preset 可以便捷添加
>
> - @babel/preset-react
> - @babel/preset-typescript
> - @babel/preset-flow
> - 如何开发自己的 preset？
>   ```js
>   module.exports = () => ({
>     presets: [require("@babel/preset-env")],
>     plugins: [
>       [require("@babel/plugin-proposal-class-properties"), { loose: true }],
>       require("@babel/plugin-proposal-object-rest-spread"),
>     ],
>   });
>   ```
> - preset 的执行顺序？
>
>   - Presets: ['a', 'b', 'c']，执行顺序是从右到左 c，b，a
>   - 所以配置 babelrc 时要注意顺序
>
> ```
> {
>   "presets": [
>     "env"
>   ],
>   "plugins": [
>     ["transform-runtime", {
>       "helpers": true,
>       "polyfill": true,
>       "regenerator": true,
>       "moduleName": "babel-runtime"
>     }]
>   ]
> }
> ```
>
> ### 兼容性怎么做？
>
> - 直接引入 babel-polyfill
>
>   - 缺点：很大，冗余
>   - 适合后台类项目，不要在库中使用
>
> - 从 core-js 和 regenerator-runtime 中安实际需要手动引入
>
>   - 缺点：麻烦，容易漏掉
>   - 但体积小
>
> - @babel/preset-env
>
>   - useBuildIn：usage，按需引入 helper
>   - 指定适配的 browserlist
>   - @babel/plugin-transform-runtime，抽离重用 helper，缩小体积
>   - 使用 runtime-corejs 3
>   - 需要安装 @babel/runtime-corejs3
>
> - polyfill.io 服务
>
>   - 自建兼容性服务，通过 ua 来返回相应的 polyfill
>   - 可以做到无冗余，但 ua 有时候不可信，需要有兜底方案
>
> ### 测试
>
> ```js
> // input
> class A {
>   constructor(name) {
>     this.name = name;
>     console.log(new.target);
>   }
>   get() {
>     return "a";
>   }
>   static say() {
>     return "hi";
>   }
> }
>
> Promise.resolve()
>   .then(() => {
>     console.log(1);
>   })
>   .finally(() => {
>     console.log(2);
>   });
>
> [1, 2].map((item) => item + 1);
>
> "x".padStart(2, "a");
>
> let m = new Map();
>
> let s = new Set();
>
> [1, 2].includes((item) => item === 1);
> ```
>
> ```js
> // demo 1：usage + runtime-corejs3
> module.exports = {
>   presets: [
>     ['@babel/preset-env', {
>       'debug': false,
>       'useBuiltIns': 'usage',
>       'modules': false,
>       targets: {
>         "node": "current",
>         browsers: ['last 2 versions']
>       }
>     }],
>   ],
>   plugins: [
>     ["@babel/plugin-transform-runtime", {
>       corejs: 3 ,
>       helpers: true
>     }],
>   ]
> }
>
> // output
> import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
> import _Set from "@babel/runtime-corejs3/core-js-stable/set";
> import _Map from "@babel/runtime-corejs3/core-js-stable/map";
> import _padStartInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/pad-start";
> import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
> import _Promise from "@babel/runtime-corejs3/core-js-stable/promise"; // 有重复引入
> import "core-js/modules/es6.promise";
> import "core-js/modules/es6.object.to-string";
> import "core-js/modules/es7.promise.finally";
> import "core-js/modules/es6.function.name";
> import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
> import _createClass from "@babel/runtime-corejs3/helpers/createClass";
>
> var _context, _context2, _context3;
>
> var A =
> /*#__PURE__*/
> function () {
>   function A(name) {
>     _classCallCheck(this, A);
>
>     this.name = name;
>     console.log(this instanceof A ? this.constructor : void 0);
>   }
>
>   _createClass(A, [{
>     key: "get",
>     value: function get() {
>       return 'a';
>     }
>   }], [{
>     key: "say",
>     value: function say() {
>       return 'hi';
>     }
>   }]);
>
>   return A;
> }();
>
> _Promise.resolve().then(function () {
>   console.log(1);
> }).finally(function () {
>   console.log(2);
> });
>
> _mapInstanceProperty(_context = [1, 2]).call(_context, function (item) {
>   return item + 1;
> });
>
> _padStartInstanceProperty(_context2 = 'x').call(_context2, 2, 'a');
>
> var m = new _Map();
> var s = new _Set();
>
> _includesInstanceProperty(_context3 = [1, 2]).call(_context3, function (item) { // 实例方法兼容
>   return item === 1;
> });
>
>
> // 总结
> 1、存在重复引入
> 2、从 core-js 和 @babel/runtime-corejs3 中引入
> 3、可以对实例方法进行 helper
> ```
>
> ```js
> // demo2: usage + runtime-corejs2
> module.exports = {
>   presets: [
>     ['@babel/preset-env', {
>       'debug': false,
>       'useBuiltIns': 'usage',
>       'modules': false,
>       targets: {
>         "node": "current",
>         browsers: ['last 2 versions']
>       }
>     }],
>   ],
>   plugins: [
>     ["@babel/plugin-transform-runtime", {
>       corejs: 2 ,
>       helpers: true
>     }],
>   ]
> }
>
> // output
> import "core-js/modules/es7.array.includes";
> import "core-js/modules/es6.string.includes";
> import _Set from "@babel/runtime-corejs2/core-js/set";
> import _Map from "@babel/runtime-corejs2/core-js/map";
> import "core-js/modules/es7.string.pad-start";
> import _Promise from "@babel/runtime-corejs2/core-js/promise";
> import "core-js/modules/es6.promise";
> import "core-js/modules/es6.object.to-string";
> import "core-js/modules/es7.promise.finally";
> import "core-js/modules/es6.function.name";
> import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
> import _createClass from "@babel/runtime-corejs2/helpers/createClass";
>
> var A =
> /*#__PURE__*/
> function () {
>   function A(name) {
>     _classCallCheck(this, A);
>
>     this.name = name;
>     console.log(this instanceof A ? this.constructor : void 0);
>   }
>
>   _createClass(A, [{
>     key: "get",
>     value: function get() {
>       return 'a';
>     }
>   }], [{
>     key: "say",
>     value: function say() {
>       return 'hi';
>     }
>   }]);
>
>   return A;
> }();
>
> _Promise.resolve().then(function () {
>   console.log(1);
> }).finally(function () {
>   console.log(2);
> });
>
> [1, 2].map(function (item) {
>   return item + 1;
> });
> 'x'.padStart(2, 'a');
> var m = new _Map();
> var s = new _Set();
> [1, 2].includes(function (item) {
>   return item === 1;
> });
>
> // 总结
> 1、重复引入
> 2、从 core-js 和 @babel/runtime-corejs2 中引入
> 3、@babel/runtime-corejs2 无法实现实例方法兼容
> 4、core-js 可以实例方法兼容
> ```
>
> ```js
> // demo 3: usage + @babel/runtime
> module.exports = {
>   presets: [
>     ['@babel/preset-env', {
>       'debug': false,
>       'useBuiltIns': 'usage',
>       'modules': false,
>       targets: {
>         "node": "current",
>         browsers: ['last 2 versions']
>       }
>     }],
>   ],
>   plugins: [
>     ["@babel/plugin-transform-runtime", {  // 默认从 @babel/runtime 里导入
>       helpers: true
>     }],
>   ]
> }
>
> // output
> import "core-js/modules/es7.array.includes";
> import "core-js/modules/es6.string.includes";
> import "core-js/modules/es6.set";
> import "core-js/modules/web.dom.iterable";
> import "core-js/modules/es6.array.iterator";
> import "core-js/modules/es6.string.iterator";
> import "core-js/modules/es6.map"; // 直接覆盖内置类型
> import "core-js/modules/es7.string.pad-start";
> import "core-js/modules/es6.promise";
> import "core-js/modules/es6.object.to-string";
> import "core-js/modules/es7.promise.finally";
> import "core-js/modules/es6.function.name";
> import _classCallCheck from "@babel/runtime/helpers/classCallCheck"; // 从 @babel/runtime 里导入
> import _createClass from "@babel/runtime/helpers/createClass";
>
> var A =
> /*#__PURE__*/
> function () {
>   function A(name) {
>     _classCallCheck(this, A);
>
>     this.name = name;
>     console.log(this instanceof A ? this.constructor : void 0);
>   }
>
>   _createClass(A, [{
>     key: "get",
>     value: function get() {
>       return 'a';
>     }
>   }], [{
>     key: "say",
>     value: function say() {
>       return 'hi';
>     }
>   }]);
>
>   return A;
> }();
>
> Promise.resolve().then(function () {
>   console.log(1);
> }).finally(function () {
>   console.log(2);
> });
> [1, 2].map(function (item) {
>   return item + 1;
> });
> 'x'.padStart(2, 'a');
> var m = new Map();
> var s = new Set();
> [1, 2].includes(function (item) {
>   return item === 1;
> });
>
> // 总结
> 1、覆盖内置类型
> 2、从 core-js 中引入
> ```
>
> ```js
> // demo 4: 'useBuiltIns': false + babel/runtime-corejs3
> module.exports = {
>   presets: [
>     ['@babel/preset-env', {
>       'debug': false,
>       'useBuiltIns': false,
>       'modules': false,
>       targets: {
>         "node": "current",
>         browsers: ['last 2 versions']
>       }
>     }],
>   ],
>   plugins: [
>     ["@babel/plugin-transform-runtime", {
>       corejs: 3 ,
>       helpers: true
>     }],
>   ]
> }
>
> // output
> import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
> import _Set from "@babel/runtime-corejs3/core-js-stable/set";
> import _Map from "@babel/runtime-corejs3/core-js-stable/map";
> import _padStartInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/pad-start";
> import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
> import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
> import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
> import _createClass from "@babel/runtime-corejs3/helpers/createClass";
>
> var _context, _context2, _context3;
>
> var A =
> /*#__PURE__*/
> function () {
>   function A(name) {
>     _classCallCheck(this, A);
>
>     this.name = name;
>     console.log(this instanceof A ? this.constructor : void 0);
>   }
>
>   _createClass(A, [{
>     key: "get",
>     value: function get() {
>       return 'a';
>     }
>   }], [{
>     key: "say",
>     value: function say() {
>       return 'hi';
>     }
>   }]);
>
>   return A;
> }();
>
> _Promise.resolve().then(function () {
>   console.log(1);
> }).finally(function () {
>   console.log(2);
> });
>
> _mapInstanceProperty(_context = [1, 2]).call(_context, function (item) {
>   return item + 1;
> });
>
> _padStartInstanceProperty(_context2 = 'x').call(_context2, 2, 'a');
>
> var m = new _Map();
> var s = new _Set();
>
> _includesInstanceProperty(_context3 = [1, 2]).call(_context3, function (item) {
>   return item === 1;
> });
>
> // 总结
> 1、全部从 runtime-corejs3 中导出
> 2、无覆盖，无命名冲突
> 3、没有 useBuiltIns 也能插入 helper？？？
> ```
>
> ### babel 的未来？
>
> - babel 8 plan [babel/babel#10746](https://github.com/babel/babel/issues/10746)
