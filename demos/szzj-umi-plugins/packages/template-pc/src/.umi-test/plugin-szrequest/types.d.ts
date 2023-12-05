import type { RequestMethod, RequestOptionsInit } from 'umi-request';

/**
 * 响应
 * @see https://dtzhejiang.yuque.com/fmki7n/xex2vc/bwwsx1aq5fxsnefu#hGEX2
 */
export interface Response<T> {
  readonly success: boolean;
  readonly data: T;
  readonly errorCode: number;
  readonly errorMsg?: string;
  readonly extraData?: any;
}

/**
 * 分页响应
 * @see https://dtzhejiang.yuque.com/fmki7n/xex2vc/bwwsx1aq5fxsnefu#bNxr1
 */
export interface PageData<T> {
  readonly list: T[];
  readonly totalItem: number;
  readonly pageSize: number;
  readonly pageNum: number;
}

/**
 * 分页响应
 */
export type PageResponse<T> = Response<PageData<T>>;

/**
 * get 请求
 */
interface get {
  <T>(url: string, params?: Record<string, any>, opts?: RequestOptionsInit): Promise<T>;
}

/**
 * post 请求
 */
interface post {
  <T>(url: string, data?: Record<string, any>, opts?: RequestOptionsInit): Promise<T>;
}

/**
 * put 请求
 */
interface put {
  <T>(url: string, data?: Record<string, any>, opts?: RequestOptionsInit): Promise<T>;
}

/**
 * delete 请求
 */
interface del {
  <T>(url: string, params?: Record<string, any>, opts?: RequestOptionsInit): Promise<T>;
}

declare var request: RequestMethod;
