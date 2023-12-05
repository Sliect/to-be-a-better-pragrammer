export default [
  { path: '/', component: '@/pages/home', title: '测试', menu: true, keepAlive: true },
  { path: '*', redirect: '/' },
];
