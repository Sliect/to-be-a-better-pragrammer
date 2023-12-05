import { defineConfig } from 'umi';

export default defineConfig({
  plugins: ['@szzj/umi-plugin-app'],
  mfsu: false,
  routes: [
    {
      path: '/',
      component: '@/pages/home',
    },
  ],
  szapp: {
    errorBoundary: true,
    errorPages: {
      belong: '应用归属单位',
      manager: '应用管理员',
      mobile: '联系方式',
    },
  },
});
