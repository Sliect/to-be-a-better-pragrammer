import type { RequestMethod, RequestOptionsInit } from 'umi-request';

/**
 * 响应
 */
export interface Response<T> {
  readonly code: number;
  readonly data: T;
  readonly success: boolean;
  readonly errorMsg?: string;
  readonly errorMessage?: string;
}

/**
 * 分页响应
 */
export interface PageData<T> {
  readonly list: T[];
  readonly total: number;
  readonly pageSize: number;
  readonly current: number;
}

/**
 * 分页响应
 */
export type PageResponse<T> = Response<PageData<T>>;

/**
 * get 请求
 */
interface get{
  <T>(
    url: string,
    params?: Record<string, any>,
    opts?: RequestOptionsInit,
  ): Promise<T>;
}

/**
 * post 请求
 */
interface post{
  <T>(
    url: string,
    data?: Record<string, any>,
    opts?: RequestOptionsInit,
  ): Promise<T>;
}

/**
 * put 请求
 */
interface put{
  <T>(
    url: string,
    data?: Record<string, any>,
    opts?: RequestOptionsInit,
  ): Promise<T>;
}

/**
 * delete 请求
 */
interface del{
  <T>(
    url: string,
    params?: Record<string, any>,
    opts?: RequestOptionsInit,
  ): Promise<T>;
}

declare var request: RequestMethod;