import path from 'path';
import { defineConfig } from 'dumi';

export default defineConfig({
  history: { type: 'hash' },
  base: '/',
  publicPath: process.env.DOCS_ENV === 'prod' ? './' : '/',
  // '//10.145.11.75:8080/gui/szzj-hooks/' : '/',
  outputPath: 'site',
  mode: 'site',
  logo: 'https://smebimage.fuliaoyi.com/Fger7VZclDUaXDJuqg42MlsUqV-w',
  favicon: 'https://smebimage.fuliaoyi.com/Fger7VZclDUaXDJuqg42MlsUqV-w',
  outputPath: 'site',
  navs: [null, { title: 'Gitlab', path: 'http://59.202.42.100/data/tc/g-ui/szzj-hooks' }],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  alias: {
    '@szzj/hooks': path.resolve(__dirname, 'src'),
  },
  resolve: {
    includes: ['docs'],
  },
  // umi3 comple node_modules by default, could be disable
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
});
