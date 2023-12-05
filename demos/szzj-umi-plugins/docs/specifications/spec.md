---
nav:
  title: 编码规范
  order: 1
title: spec
order: 1
group:
  title: 相关工具
  order: 2
---

## @szzj/spec 编码规范

基于 @umijs/lint，提供 eslint、stylelint、prettier 统一配置。

### eslint

```js | pure
module.exports = {
  parser: '@typescript-eslint/parser',
  /**
   * - umi/eslint: 扩展自umi4推荐的eslint
   * - plugin:prettier/recommended：
   *
   * - 注意：对eslint的规则改动，在.eslintrc.js，prettier规则改动在.prettierrc，规则改动可能不及时生效，重启vscode即可
   */
  extends: [
    // umi/eslint: 扩展自umi4推荐的eslint
    require.resolve('@umijs/lint/dist/config/eslint'),
    /**
     * 让eslint继承prettier配置&防止规则冲突，这样再结合vscode的插件能力，就可以autofix了。
     * 主要是降低使用成本，做到保存即格式化，又能遵循“eslint负责代码质量，prettier负责代码格式美化”
     * - 参考：https://github.com/prettier/eslint-plugin-prettier
     */
    'plugin:prettier/recommended',
    /**react jsx的规则 */
    'plugin:react/recommended',
    /**react17使用jsx-runtime无需手动导入React */
    'plugin:react/jsx-runtime',
    /**ts的规则 */
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1, //使用@ts-ignore 等注释
  },
};
```

### stylelint

```js | pure
module.exports = {
  // Umi 项目
  extends: require.resolve('@umijs/lint/dist/config/stylelint'),
};
```

### prettier

```js | pure
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  endOfLine: 'lf',
  importOrder: [
    '^@szzj/(.*)$',
    '^@/components/(.*)$',
    '^@/contexts/(.*)$',
    '^@/models/(.*)$',
    '^@/hooks/(.*)$',
    '^@/services/(.*)$',
    '^@/utils/(.*)$',
    '^@/enums/(.*)$',
    '^@/consts/(.*)$',
    '^[./]',
    '^@/types/(.*)$',
    '^(.*)types(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [{ files: '.prettierrc', options: { parser: 'json' } }],
  plugins: [
    require.resolve('prettier-plugin-packagejson'),
    require.resolve('@trivago/prettier-plugin-sort-imports'),
  ],
};
```
