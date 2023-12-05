---
title: useRoutes
order: 7
---

# useRoutes

处理路由数据。

## demos

### demo 1: authed menus

```jsx
import React, { Fragment } from 'react';
import { useRoutes } from '@szzj/hooks';
import { Menu, Button } from 'antd';

const routes = [
  { path: '/403', component: '../pages/403' },
  { path: '/404', component: '../pages/404' },
  { path: '/500', component: '../pages/500' },
  { path: '/login', component: '../pages/login' },
  { path: '/register', component: '../pages/register' },
  { path: '/', component: '../pages/index', menu: true, title: '首页' },
  {
    path: '/apps',
    component: '../pages/apps',
    menu: true,
    title: '应用列表',
    routes: [
      {
        path: '/apps/:id/detail',
        component: '../pages/apps/detail',
      },
      {
        path: '/apps/:id/edit',
        component: '../pages/apps/edit',
      },
    ],
  },
];
const { SubMenu } = Menu;

export default () => {
  const router = useRoutes(routes, {
    authFilter: (node) => !!node.menu,
  });

  const renderMenu = (menu, level) => {
    const key = `${level}-${menu.path}`;
    return menu.routes ? (
      <SubMenu
        key={key}
        title={
          menu.icon ? (
            <Fragment>
              <span>{menu.title}</span>
            </Fragment>
          ) : (
            menu.title
          )
        }
      >
        {menu.routes.map((childMenu) => {
          return renderMenu(childMenu, level + 1);
        })}
      </SubMenu>
    ) : (
      <Menu.Item key={key}>
        <span>{menu.title}</span>
      </Menu.Item>
    );
  };

  return (
    <Fragment>
      <Menu mode="inline">
        {router.getAuthedRoutes().map((menu) => {
          return renderMenu(menu, 0);
        })}
      </Menu>
    </Fragment>
  );
};
```
