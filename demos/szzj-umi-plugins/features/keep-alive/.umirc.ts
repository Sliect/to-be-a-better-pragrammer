import { defineConfig } from 'umi';

export default defineConfig({
  plugins: ['@szzj/umi-plugin-keepalive'],
  // react多实例问题（导入antd导致），先这么配置等官方修复，参考https://github.com/umijs/umi/issues/9522
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
    },
  },
  routes: [
    {
      path: '/',
      component: '@/pages/home',
      wrappers: ['@/wrappers/LayoutWrapper'],
    },
    {
      path: '/count',
      wrappers: ['@/wrappers/LayoutWrapper'],
      routes: [
        {
          path: '/count/:id',
          component: '@/pages/count',
          keepAlive: true,
        },
        {
          path: '/count/list',
          component: '@/pages/table',
          keepAlive: true,
        },
      ],
    },
    {
      path: '/table',
      component: '@/pages/table',
      wrappers: ['@/wrappers/LayoutWrapper'],
      keepAlive: true,
    },
  ],
  szkeepalive: {},
});
