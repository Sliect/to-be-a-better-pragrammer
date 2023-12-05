import { extend } from 'umi-request';
import { errorHandler } from './utils';
import type { RequestMethod, RequestOptionsInit } from 'umi-request';

let instance: RequestMethod | null = null;

export const getInstance = (options: RequestOptionsInit) => {
  if (instance) instance;

  instance = extend({
    prefix: '/api',
    timeout: 3000,
    credentials: 'same-origin',
    method: 'POST',
    errorHandler,
    ...options,
    headers: {
      Accept: 'application/json',
      ...options.headers,
    },
  });

  return instance;
};

export const getMethods = (instance: RequestMethod) => {
  /**
   * 处理 get 请求
   * @param url
   * @param params
   * @param opts
   */
  async function get<T>(
    url: string,
    params?: Record<string, any>,
    opts?: RequestOptionsInit,
  ): Promise<T> {
    const res = await instance.get(url, {
      params,
      ...opts,
    });
    return res;
  }

  /**
   * 处理 post 请求
   * @param url
   * @param params
   * @param opts
   */
  async function post<T>(
    url: string,
    data?: Record<string, any>,
    opts?: RequestOptionsInit,
  ): Promise<T> {
    const res = await instance.post(url, {
      data,
      ...opts,
    });
    return res;
  }

  /**
   * 处理 put 请求
   * @param url
   * @param params
   * @param opts
   */
  async function put<T>(
    url: string,
    data?: Record<string, any>,
    opts?: RequestOptionsInit,
  ): Promise<T> {
    const res = await instance.put(url, {
      data,
      ...opts,
    });
    return res;
  }

  /**
   * 处理 delete 请求
   * @param url
   * @param params
   * @param opts
   */
  async function del<T>(
    url: string,
    params?: Record<string, any>,
    opts?: RequestOptionsInit,
  ): Promise<T> {
    const res = await instance.delete(url, {
      params,
      ...opts,
    });
    return res;
  }

  return {
    get,
    post,
    put,
    del,
  };
};
