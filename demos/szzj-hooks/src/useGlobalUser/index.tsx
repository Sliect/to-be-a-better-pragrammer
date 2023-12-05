import { useState, useMemo, createContext, useContext } from 'react';
import useFetch from '../useFetch';

type RequestResponse<T = Record<string, any>> = {
  success: boolean;
  data: T;
};

type USE_APP_OPTIONS<UserInfo = Record<string, any>> = {
  /** 本地环境调试用的用户信息 */
  defaultLocalUser?: UserInfo;
  /** 用户信息转换处理 */
  transform?: (data: Record<string, any>) => UserInfo;
};

type GlobalUserHooks<UserInfo = Record<string, any>> = {
  /** 用户信息 */
  userInfo: UserInfo;
  /** 修改用户信息 */
  setUserInfo: (useInfo: UserInfo) => void;
  /** 获取用户信息 */
  fetchUserInfo: (params?: any) => Promise<RequestResponse<UserInfo>>;
  /** 是否已登录 */
  isLogined: boolean;
};

/**
 * 用户信息处理 hooks
 * @param routes
 * @param options
 */
function useGlobalUser<UserInfo = Record<string, any>>(
  request: (params?: Record<string, any>) => Promise<RequestResponse>,
  options?: USE_APP_OPTIONS<UserInfo>,
): GlobalUserHooks<UserInfo> {
  const IS_LOCAL = process.env.NODE_ENV === 'development';
  const { transform, defaultLocalUser } = options || ({} as USE_APP_OPTIONS<UserInfo>);
  const [userInfo, setUserInfo] = useState<UserInfo>(
    IS_LOCAL && defaultLocalUser ? defaultLocalUser : ({} as UserInfo),
  );

  const { fetch: fetchUserInfo } = useFetch<RequestResponse<UserInfo>>(
    (params?: Record<string, any>) => {
      return request(params).then((res: RequestResponse) => {
        if (res && res.success) {
          const convertedUserInfo = transform ? transform(res.data) : (res.data as UserInfo);
          setUserInfo(convertedUserInfo);
        }

        return res;
      });
    },
    {
      manual: true,
    },
  );

  const isLogined = useMemo(() => {
    return !!(userInfo && Object.keys(userInfo).length);
  }, [userInfo]);

  return {
    userInfo,
    setUserInfo,
    fetchUserInfo,
    isLogined,
  };
}

const GlobalUserContext = createContext<GlobalUserHooks<any>>({} as GlobalUserHooks<any>);
useGlobalUser.GlobalUserContext = GlobalUserContext;

function useGlobalUserContext<UserInfo>() {
  return useContext<GlobalUserHooks<UserInfo>>(GlobalUserContext);
}
useGlobalUser.useGlobalUserContext = useGlobalUserContext;

export default useGlobalUser;
