export default [
  {
    path: '/',
    component: '@/pages/home',
    wrappers: ['@/wrappers/LoginWrapper/index.tsx'],
    title: '首页',
    menu: true,
    icon: 'HeatMapOutlined',
    keepAlive: true,
  },
  {
    path: '*',
    redirect: '/',
  },
];
