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

type EncryptOption = {
  /** 加密算法，默认 AES */
  type?: 'AES' | 'RSA' | 'SM2' | 'SM4';
  /** 加密的字段，不指定加密整个请求体 */
  fields?: string[];
  /** 获取公钥时的额外参数 */
  getPublicKeyParams?: Object;
  /** 公钥，优先级高于 app.ts getPublicKey 调用，以便不同加密接口可指定不同公钥 */
  publicKey?: string;
  /** 初始化向量 */
  iv?: string;
  /** encrypt 接口调用时的额外配置项 */
  [key: string]: any;
};

type DecryptOption = {
  /** 加密算法，默认 AES */
  type?: 'AES' | 'SM4';
  /** 加密的字段，不指定加密整个请求体 */
  fields?: string[];
  /** 获取公钥时的额外参数 */
  getPublicKeyParams?: Object;
  /** 公钥，优先级高于 app.ts getPublicKey 调用，以便不同加密接口可指定不同公钥 */
  publicKey?: string;
  /** 初始化向量 */
  iv?: string;
  /** encrypt 接口调用时的额外配置项 */
  [key: string]: any;
};

type AttachmentOption = {
  name?: string;
  extname?: string;
}

type ExtraOptions = {
  message?: (text: string) => void;
  mock?: string | boolean;
  encrypt?: EncryptOption;
  decrypt?: DecryptOption;
  attachment?: AttachmentOption;
};

/**
 * get 请求
 */
interface get {
  <T>(
    url: string,
    params?: Record<string, any>,
    opts?: RequestOptionsInit & ExtraOptions,
  ): Promise<T>;
}

/**
 * post 请求
 */
interface post {
  <T>(
    url: string,
    data?: Record<string, any>,
    opts?: RequestOptionsInit & ExtraOptions,
  ): Promise<T>;
}

/**
 * put 请求
 */
interface put {
  <T>(
    url: string,
    data?: Record<string, any>,
    opts?: RequestOptionsInit & ExtraOptions,
  ): Promise<T>;
}

/**
 * delete 请求
 */
interface del {
  <T>(
    url: string,
    params?: Record<string, any>,
    opts?: RequestOptionsInit & ExtraOptions,
  ): Promise<T>;
}

declare var request: RequestMethod;
