import { defineConfig } from 'umi';

export default defineConfig({
  plugins: ['@szzj/umi-plugin-h5', './configs/plugin.ts'],
  mfsu: false,
  routes: [
    {
      path: '/',
      component: '@/pages/home',
    },
  ],
  szh5: {
    errorPages: {
      mode: 'zzd',
      appBelong: '数字浙江',
      appAdmin: '张三',
      appAdminMobile: '11012011988',
      labelWidth: 120,
      totalWidth: 260
    },
  },
});
