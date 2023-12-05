import { useCallback, useMemo, useState } from 'react';
import type { Response } from 'umi';

import { getUserInfo } from '@/services/global';

import type { IUserInfo } from '@/types/global';

/**
 * 用户登录
 */
export default function useUserInfo() {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [logining, setLogining] = useState<boolean>(false);

  const logined = useMemo(() => !!(userInfo && Object.keys(userInfo).length), [userInfo]);

  /**
   * 登录
   */
  const login = useCallback(() => {
    if (logined) return Promise.resolve(userInfo);
    if (logining) return Promise.resolve(undefined);

    setLogining(true);
    getUserInfo()
      .then((res: Response<IUserInfo>) => {
        if (res?.success) {
          setUserInfo(res?.data);
        }

        return res;
      })
      .catch(() => {
        setLogining(false);
      })
      .finally(() => {
        setLogining(false);
      });
  }, [logined, userInfo]);

  return {
    userInfo,
    logined,
    logining,
    setUserInfo,
    login,
  };
}
