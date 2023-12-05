import { KeepAlive, Outlet, useRouteData } from 'umi';

export default function KeepAliveWrapper() {
  // @fixme useRouteData 这个接口可能会被调整，先标记为 fixme
  const { route } = useRouteData();

  return (
    <KeepAlive name={route.path}>
      <Outlet />
    </KeepAlive>
  );
}
