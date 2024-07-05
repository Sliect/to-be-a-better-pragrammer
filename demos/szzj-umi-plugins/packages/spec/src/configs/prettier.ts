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