import { useState, useCallback, useEffect } from 'react';
import { Options } from './types';

/**
 * 获取远程数据
 * @param request  通过 axios, umi-request 等获取远程数据
 * @param options options.manual boolean 是否手动发起请求 options.useData boolean 是否返回res.data options.defaultData any 请求失败返回的默认值
 * @returns fetch 发起远程请求
 * @returns loading 远程请求状态
 * @returns data 转换处理后的远程数据
 */
function useFetch<T>(
  request: (...args: any[]) => Promise<any>,
  options?: Options,
): {
  fetch: (...args: any[]) => Promise<T>;
  loading: boolean;
  data: T | undefined;
  /** 直接变更数据 */
  mutate: (data: T | undefined) => void;
} {
  const { manual, defaultData } = options || ({} as Options);

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | undefined>(defaultData);

  //@ts-ignore
  const fetch = useCallback<(...args: any[]) => Promise<T>>(
    (...args: any[]) => {
      setLoading(true);
      return new Promise((resolve, reject) => {
        request(...args)
          .then((res: any) => {
            setLoading(false);
            let result = res;
            if (options?.useData) {
              if (res?.success) {
                result = res.data;
              } else {
                result = null;
              }
            }

            // 如果 result 为 null 或 undefined，使用 options.defaultData 代替
            if ((result === null || result === undefined) && options && 'defaultData' in options) {
              result = defaultData;
            }

            setData(result);
            resolve(result);
          })
          .catch((err) => {
            setLoading(false);
            setData(defaultData);
            reject(err);
          });
      });
    },
    // loading 会导致 fetch 更新，不利于 fetch 作为其他 hooks 的依赖
    [],
  );

  useEffect(() => {
    if (!manual) {
      fetch();
    }
  }, [manual]);

  return {
    fetch,
    loading,
    data,
    mutate: setData,
  };
}

export default useFetch;
