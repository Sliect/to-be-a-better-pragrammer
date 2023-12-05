import { useEffect } from 'react';
import { Outlet, useRouteProps } from 'umi';

/**
 * 设置页面标题
 * @returns
 */
export default function TitleLayout() {
  const { title } = useRouteProps();

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return <Outlet />;
}
