import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  // dumi 暂不支持 hash 路由：https://github.com/umijs/dumi/commit/9838d7c906ff3f76dbfdd31f8067cdad57b38acc
  history: { type: 'hash' },
  outputPath: 'site',
  publicPath: process.env.DOCS_ENV === 'prod' ? './' : '/',
  themeConfig: {
    name: 'react-template',
  },
  alias: {
    '@szzj/template-lib-react': path.resolve(__dirname, 'src'),
  },
  mfsu: false,
});
