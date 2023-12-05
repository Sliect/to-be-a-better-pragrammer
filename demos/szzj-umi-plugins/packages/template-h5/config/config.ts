import { defineConfig } from 'umi';

import routes from './routes';

export default defineConfig({
  szh5: {
    // 前端打包地址
    publicPath: 'http://frontend:8000',
  },
  szrequest: {
    // 后端服务地址
    proxyTarget: 'http://backend:8000',
  },
  szkeepalive: {},
  routes,
  presets: ['@szzj/umi-preset-h5'],
  plugins: ['@szzj/umi-plugin-keepalive'],
  // react多实例问题（导入antd-mobile导致），先这么配置等官方修复，参考https://github.com/umijs/umi/issues/9522
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
    },
  },
  moment2dayjs: {
    preset: 'antd',
  },
});
