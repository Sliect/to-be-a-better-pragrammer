import { useState, useRef, useEffect, useCallback } from 'react';
import { matchPath } from '@szzj/utils';
import useTree from '../useTree';
import * as logger from '../logger';

type Route = {
  path: string;
  component: string;
  routes?: Route[];
  [key: string]: any;
};

const useRoutes = (routes: Route[], options?: any) => {
  const routesManager = useTree(routes, {
    uniqueKey: options.uniqueKey ? options.uniqueKey : 'component',
    childrenKey: options.childrenKey ? options.childrenKey : 'routes',
  });
  const authFilter = options.authFilter || ((route: Route) => route);

  return {
    getAuthedRoutes: (cb?: (route: Route) => boolean) => {
      // @ts-ignore
      return routesManager.filter(cb ? cb : authFilter);
    },
    getMatchedRoutes: (pathname: string) => {
      const matchedRoutes: Route[] = [];
      // @ts-ignore
      routesManager.forEach(
        // @ts-ignore
        (route: Route) => {
          if (
            matchPath(pathname, {
              path: route.path,
            })
          ) {
            matchedRoutes.push(route);
          }
        },
        {
          order: 'dlr',
        },
      );
      return matchedRoutes;
    },
  };
};

export default useRoutes;
