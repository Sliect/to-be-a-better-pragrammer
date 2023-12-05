import { defineConfig } from 'umi';

import routes from './routes';

export default defineConfig({
  szrequest: {
    // 后端服务地址
    proxyTarget: 'http://backend:8000',
  },
  szapp: {
    // 前端打包地址
    publicPath: 'http://frontend:8000',
  },
  routes,
  szlayout: false,
  szkeepalive: {},
  presets: ['@szzj/umi-preset-app'],
  plugins: ['@szzj/umi-plugin-keepalive'],
  // react多实例问题（导入antd导致），先这么配置等官方修复，参考https://github.com/umijs/umi/issues/9522
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
    },
  },
  antd: {
    dayjs: true,
    import: true,
    style: 'less',
  },
  moment2dayjs: {
    preset: 'antd',
  },
});
