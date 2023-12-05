import { defineConfig } from 'umi';

export default defineConfig({
  plugins: ['@szzj/umi-plugin-region'],
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
    },
  ],
});
