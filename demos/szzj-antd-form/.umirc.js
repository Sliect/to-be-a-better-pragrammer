import path from 'path';
import { defineConfig } from 'dumi';

export default defineConfig({
  history: { type: 'hash' },
  base: '/',
  publicPath: process.env.DOCS_ENV === 'prod' ? '//10.145.11.75:8080/gui/szzj-antd-form/' : '/',
  outputPath: 'site',
  mode: 'site',
  logo: 'https://smebimage.fuliaoyi.com/Fger7VZclDUaXDJuqg42MlsUqV-w',
  favicon: 'https://smebimage.fuliaoyi.com/Fger7VZclDUaXDJuqg42MlsUqV-w',
  outputPath: 'site',
  navs: [
    { title: '表单项', path: '/fields' },
    { title: '表单', path: '/form' },
    { title: 'Antd 表单编程技巧', path: '/antd' },
    {
      title: 'Gitlab',
      path: 'https://code.dtzhejiang.com/data/tc/g-ui/szzj-antd-components/szzj-antd-form.git',
    },
  ],
  resolve: {
    includes: ['docs', 'src'],
  },
  alias: {
    '@szzj/antd-from':
      process.env.DOCS_ENV === 'prod'
        ? path.resolve(__dirname, 'lib')
        : path.resolve(__dirname, 'src'),
  },
  // umi3 comple node_modules by default, could be disable
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
});
