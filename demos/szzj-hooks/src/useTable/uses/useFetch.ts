import { useState, useCallback } from 'react';
import useFetch from '../../useFetch';
import * as logger from '../../logger';
import { Params, Options } from '../types';

const useFetchInTable = <Q extends Params, R>(
  request: (...args: any[]) => Promise<any>,
  options: Options<Q, R> = {} as Options<Q, R>,
): {
  params: Q;
  data?: R;
  loading: boolean;
  search: (params: Q) => Promise<R>;
  research: (params: Q) => Promise<R>;
  reset: () => Promise<R>;
} => {
  const {
    defaultParams,
    useFetchOptions,
    enableSuccessLog,
    enableFailLog = true,
    transfrom,
    transfromParams,
  } = options;

  const [params, setParams] = useState<Q>({
    ...defaultParams,
  } as Q);

  const { fetch, data, loading } = useFetch<R>((...args: R[]) => {
    return request(...args)
      .then((res: any) => {
        if (res && res.success) {
          if (enableSuccessLog) logger.success('查询成功', res);

          return transfrom ? transfrom(res.data) : res.data;
        } else {
          if (enableFailLog) logger.fail('查询失败', res);
        }
      })
      .catch((err) => {
        if (enableFailLog) logger.fail('查询失败', err);
      });
  }, useFetchOptions);

  const handleFetch = useCallback((params: Q) => {
    setParams(params);
    const paramsTransformed = transfromParams ? transfromParams(params) : params;
    return fetch(paramsTransformed);
  }, []);

  /**
   * 使用原先的 pageSize 查询
   * @param pms
   */
  const search = useCallback(
    (pms: Q) => {
      return handleFetch({
        // @ts-ignore
        current: 1,
        // @ts-ignore
        pageSize: params.pageSize,
        ...pms,
      });
    },
    [params],
  );

  /**
   * 使用原先的 params 查询
   * @param pms
   */
  const research = useCallback(
    (pms: Q) => {
      return handleFetch({
        ...params,
        ...pms,
      });
    },
    [params],
  );

  /**
   * 重置
   */
  const reset = useCallback(() => {
    return handleFetch({ ...defaultParams } as Q);
  }, []);

  return {
    params,
    data,
    loading,
    search,
    research,
    reset,
  };
};

export default useFetchInTable;
