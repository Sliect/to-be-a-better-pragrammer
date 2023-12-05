import { useEffect } from 'react';
import { Outlet, useModel } from 'umi';

export default function LoginWrapper() {
  const { login } = useModel('global');

  useEffect(() => {
    login();
  }, [login]);

  return <Outlet />;
}
