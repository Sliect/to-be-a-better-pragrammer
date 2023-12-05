import { defineConfig } from 'umi';

import routes from './routes';

export default defineConfig({
  szrequest: {
    // 后端服务地址
    proxyTarget: 'http://backend:8000',
  },
  szkeepalive: {},
  // subapp: {
  //   name: 'a',
  //   publicPath: 'http://frontend:8000',
  // },
  routes,
  presets: ['@szzj/umi-preset-subapp'],
  plugins: ['@szzj/umi-plugin-keepalive'],
});
