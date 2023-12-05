import { defineConfig } from 'umi';

export default defineConfig({
  plugins: ['@szzj/umi-plugin-app', './configs/plugin.ts'],
  mfsu: false,
  routes: [
    {
      path: '/',
      component: '@/pages/home',
    },
  ],
  szapp: {
    errorBoundary: true,
    errorPages: true,
  },
});
