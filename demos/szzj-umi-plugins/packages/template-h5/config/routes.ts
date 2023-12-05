export default [
  {
    path: '/',
    component: '@/pages/home',
    wrappers: ['@/wrappers/LoginWrapper/index.tsx'],
    title: '首页',
    keepAlive: true,
  },
  {
    path: '*',
    redirect: '/',
  },
];
