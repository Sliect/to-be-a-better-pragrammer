import { Outlet } from 'umi';

export default function LayoutWrapper() {
  return (
    <div>
      这是一个容器
      <Outlet />
    </div>
  );
}
