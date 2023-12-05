import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  // dumi 暂不支持 hash 路由：https://github.com/umijs/dumi/commit/9838d7c906ff3f76dbfdd31f8067cdad57b38acc
  history: { type: 'hash' },
  outputPath: 'site',
  publicPath:
    process.env.DOCS_ENV === 'prod' ? '//10.145.11.75:8080/gui/szzj-ones/' : '/',
  themeConfig: {
    name: 'ones',
  },
});
