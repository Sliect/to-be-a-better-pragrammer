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
