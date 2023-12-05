import { defineConfig } from 'umi';

export default defineConfig({
  plugins: ['@szzj/umi-plugin-request'],
  mfsu: false,
  mock: {},
  routes: [
    {
      path: '/',
      component: '@/pages/home',
    },
  ],
});
