var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/configs/eslint.ts
module.exports = {
  parser: "@typescript-eslint/parser",
  /**
   * - umi/eslint: 扩展自umi4推荐的eslint
   * - plugin:prettier/recommended：
   *
   * - 注意：对eslint的规则改动，在.eslintrc.js，prettier规则改动在.prettierrc，规则改动可能不及时生效，重启vscode即可
   */
  extends: [
    // umi/eslint: 扩展自umi4推荐的eslint
    require.resolve("@umijs/lint/dist/config/eslint"),
    /**
     * 让eslint继承prettier配置&防止规则冲突，这样再结合vscode的插件能力，就可以autofix了。
     * 主要是降低使用成本，做到保存即格式化，又能遵循“eslint负责代码质量，prettier负责代码格式美化”
     * - 参考：https://github.com/prettier/eslint-plugin-prettier
     */
    "plugin:prettier/recommended",
    /**react jsx的规则 */
    "plugin:react/recommended",
    /**react17使用jsx-runtime无需手动导入React */
    "plugin:react/jsx-runtime",
    /**ts的规则 */
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": 1
    //使用@ts-ignore 等注释
  }
};
