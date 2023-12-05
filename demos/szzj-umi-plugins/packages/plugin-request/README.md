# @szzj/umi-plugin-request

提供基本的发送请求能力。

```ts | pure
import { post } from 'umi';
import type { Response } from 'umi';

export async function getUserInfo(params: { authCode: string | void }) {
  const res = await post<Response<UserInfo>>(
    `/jcgzt/login/autoLoginOnlyByAuthCode`,
    params,
  );

  return res;
}
```

## Features

- ✔︎ 通过 umi 全局导出 request, get, post, put, del 方法；
- ✔︎ 通过 umi 全局导出 URL_PREFIX 前端请求路径前缀；
- ✔︎ 通过 umi 全局导出 Response, PageResponse 等类型；
- ✔︎ 简化代理配置（适用于后端仅提供单个服务的场景）；
- ✔︎ 便捷在后端接口或 mock services 接口之间作切换；
- ✔︎ 请求体或请求体指定字段加密（如想定制化加密处理，可直接使用 [@szzj/utils](http://10.145.11.75:8080/gui/szzj-utils/#/guide/encrypt)）；
- ✔︎ 文件下载；

## Install

```bash
# or yarn or pnpm
$ cnpm install @szzj/umi-plugin-request --save-dev
```

## .umirc

```ts | pure
export default defineConfig({
  szrequest: {
    // 本地环境请求前缀。默认 '/api'
    prefix: '/api',
    // 开发环境后端服务地址。无默认值
    proxyTarget: 'http://11.11.121.11/',
    // 代理请求发送时将 '/api' 改为何种形式。默认 ''
    prefixTarget: '',
    // mock 服务地址。默认 'http://59.202.54.14:18087/mock/644793528807247e213956e7/ones'
    mockServiceUrl: 'http://59.202.54.14:18087/mock/644793528807247e213956e7/ones',
  },
});
```

## 发送请求

### 全局修改配置

比如需要修改应用的超时时间（在已知接口超时较严重的情况下），可通过在 app.ts 文件追加如下代码：

```ts | pure
import { request } from 'umi';

/**
 * 参照 umi-request 修改 options
 */
request.extendOptions({
  timeout: 20000,
});
```

### Response、PageResponse

基于已协商的约定，后端提供的普通接口会采用 { success, data, errorCode, errorMsg, extraData } 形式；分页接口，其 data 部分会采用 { pageNum, pageSize, totalItem, list } 形式。Response、PageResponse 正是就此定义的类型。

```ts | pure
import type { Response, PageResponse } from 'umi';

// 定义用户接口的返回值，匹配 { success: true, data: { id: 1, name: '张三' } }
type UserInfoResponse = Response<{ id: number; name: string }>;

// 定义用户接口的返回值，匹配 { success: true, data: { list: [{ id: 1, name: '张三' }], pageNum: 1, pageSize: 10, totalItem: 1 }
type AccountPageResponse = PageResponse<{ id: number; name: string }>;
```

### request

一般来说，仅需使用 request 方法完成接口的调用。

```ts | pure
import { request } from 'umi';
import type { Response } from 'umi';

export async function getUserInfo(data: { authCode: string | void }) {
  const res = await request<Response<IUserInfo>>(`/zlw/login/autoLoginOnlyByAuthCode`, {
    method: 'POST',
    data,
  });

  return res;
}
```

plugin-request 插件也提供了 post、get、put、del 语法糖。上述请求也可以使用如下形式：

```ts | pure
import { post } from 'umi';
import type { Response } from 'umi';

export async function getUserInfo(data: { authCode: string | void }) {
  const res = await post<Response<IUserInfo>>(`/zlw/login/autoLoginOnlyByAuthCode`, data);

  return res;
}
```

### 请求模拟接口

在配置文件追加 mockServiceUrl 配置：

```ts | pure
export default {
  szrequest: {
    // 后端服务地址
    proxyTarget: 'http://dev-bl.zj.gov.cn:18080',
    // 指定 mock 服务地址，配置成 easy-mock 服务中的 Base Url
    mockServiceUrl: 'http://59.202.54.14:18087/mock/64474736179aab66bf09b323',
  },
};
```

调用远程请求时配置 mock：

```ts | pure
import { request } from 'umi';
import type { Response } from 'umi';

export async function pageQueryApi(data: IApi) {
  const res = await request<PageResponse<IApi>>('/user-table-ref/page', {
    method: 'POST',
    data,
    // 实际调用后端接口，移除 mock 配置
    mock: true,
  });

  if (!res?.success) message.error(res?.errorMsg);
  return res;
}
```

更多可参考 [研发流程优化-开发阶段](https://dtzhejiang.yuque.com/fmki7n/xex2vc/beipw0yzz433biuv#exwUv)。

## 文件下载

在请求接口中添加 attachment 配置项，插件会自动将其识别为下载接口。

### 文件流下载

默认情况下，配置了 attachment 的接口会被自动识别为文件流下载，即在插件内部会自动将 responseType 设为 'blob'，以便通过 umi-request 机制将响应解析成 Blob 对象。随后调用 @szzj/utils 库提供的 downloadByBlob 接口完成下载。

一般情况下，插件会解析出响应头中的 Content-Disposition 部分，设置下载文件的名称及扩展名。

```ts | pure
import { request } from 'umi';
import type { Response } from 'umi';

async function test(): Promise<Response<unknown>> {
  /** 默认使用响应头设置文件名和扩展名 */
  request<Response<unknown>>(`/download`, {
    attachment: {},
  });
}
```

如响应头不包含 Content-Disposition，您可以显式设置 attachment.name、attachment.extname。

```ts | pure
import { request } from 'umi';
import type { Response } from 'umi';

async function test(): Promise<Response<unknown>> {
  /** 自定义文件名和扩展名 */
  request<Response<unknown>>(`/download`, {
    responseType: 'blob',
    attachment: {
      name: '附件1',
      extname: 'xlsx',
    },
  });
}
```

### 普通下载

普通下载指的是通过普通的 a 链接完成下载动作。当配置 attachment.type = 'normal' 时，插件会将其识别为普通下载，并在下载过程中会将 header 头写入查询参数中，以完成鉴权。

```ts | pure
import { request } from 'umi';
import type { Response } from 'umi';

async function test(): Promise<Response<unknown>> {
  request<Response<unknown>>(`/test.png`, {
    method: 'get',
    attachment: { type: 'normal', name: 'test', extname: 'png' },
    headers: { AUTH_CODE: 'AUTH_CODE' },
  });
}
```

## 加密

app.ts 追加 getPublicPath 导出：

```ts | pure
/**
 * 可调用远程接口获取公钥及初始化向量
 */
export const getPublicKey = ({ type }: { type: 'AES' | 'RSA' | 'SM2' | 'SM4' }) =>
  Promise.resolve('1234123412ABCDEF');

// 又比如
export const getPublicKey = ({ type }: { type: 'AES' | 'RSA' | 'SM2' | 'SM4' }) =>
  Promise.resolve({ publicKey: '1234123412ABCDEF', iv: '1234123412ABCDEF' });
```

services 追加 encrypt 配置：

```ts | pure
/**
 * 对请求体加密
 * @returns
 */
async function test(): Promise<Response<unknown>> {
  const res = await request<Response<unknown>>(`/test`, {
    encrypt: {
      type: 'AES',
    },
    data: { user: 'admin', password: '123456' },
  });

  if (!res?.success) message.error(res?.errorMsg);
  return res;
}
```

### 获取公钥额外参数

```ts | pure
/**
 * 获取公钥额外参数
 * @returns
 */
async function test(): Promise<Response<unknown>> {
  const res = await request<Response<unknown>>(`/test`, {
    encrypt: {
      type: 'AES',
      fields: ['password'],
    },
    data: { user: 'admin', password: '123456' },
  });

  if (!res?.success) message.error(res?.errorMsg);
  return res;
}

// app.ts 导出
export const getPublicKey = ({ type, a }: { type: 'AES' | 'RSA' | 'SM2' | 'SM4' }) => {
  /** 调用 services 获取公钥，services 可缓存 */
};
```

### 加密接口不同公钥

```ts | pure
/**
 * 获取公钥额外参数
 * @returns
 */
async function test(): Promise<Response<unknown>> {
  // 调用 services 获取公钥
  const publicKey = await getPublicKey();

  const res = await request<Response<unknown>>(`/test`, {
    encrypt: {
      type: 'AES',
      fields: ['password'],
    },
    data: { user: 'admin', password: '123456' },
    // 指定公钥
    publicKey,
  });

  if (!res?.success) message.error(res?.errorMsg);
  return res;
}
```

### 指定字段加密

```ts | pure
/**
 * 指定字段加密
 * @returns
 */
async function test(): Promise<Response<unknown>> {
  const res = await request<Response<unknown>>(`/test`, {
    encrypt: {
      type: 'AES',
      fields: ['password'],
    },
    data: { user: 'admin', password: '123456' },
    getPublicKeyParams: { a: 111 },
  });

  if (!res?.success) message.error(res?.errorMsg);
  return res;
}
```

### 使用 CBC 模式

```ts | pure
/**
 * 使用 CBC 模式
 * @returns
 */
async function testestt2(): Promise<Response<unknown>> {
  const res = await request<Response<unknown>>(`/test`, {
    encrypt: {
      type: 'AES',
      mode: 'CBC',
    },
    data: { user: 'admin', password: '123456' },
  });

  if (!res?.success) message.error(res?.errorMsg);
  return res;
}
```

## 解密

解密配置与加密相同，使用 decrypt 作为键。

app.ts 追加 getPublicPath 导出：

```ts | pure
/**
 * 可调用远程接口获取公钥及初始化向量
 */
export const getPublicKey = ({ type }: { type: 'AES' | 'RSA' | 'SM2' | 'SM4' }) =>
  Promise.resolve('1234123412ABCDEF');

// 又比如
export const getPublicKey = ({ type }: { type: 'AES' | 'RSA' | 'SM2' | 'SM4' }) =>
  Promise.resolve({ publicKey: '1234123412ABCDEF', iv: '1234123412ABCDEF' });
```

services 追加 decrypt 配置：

```ts | pure
/**
 * 解密
 * @returns
 */
async function test(): Promise<Response<unknown>> {
  const res = await request<Response<unknown>>(`/test`, {
    decrypt: {
      type: 'AES',
    },
  });

  if (!res?.success) message.error(res?.errorMsg);
  return res;
}
```

## 反向代理

```ts | pure
export default defineConfig({
  szrequest: {
    // 本地环境请求前缀。默认 '/api'
    prefix: '/api',
    // 开发环境后端服务地址。无默认值
    proxyTarget: 'http://11.11.121.11/',
  },
});
```

配置文件修改如上时，本地环境的请求将会携带上 '/api' 前缀，通过 dev-server 转发到 'http://11.11.121.11/' 后端服务。打包部署后，请求不会携带 '/api' 前缀。

### IRS 应用

通过 IRS 发布的浙政钉或浙里办应用，存在以下两个特殊情况：

1. 前后端完全分离，且访问域名不一样，前端请求必跨域；
2. 线上和测试环境需要通过 html 资源路径是否包含 '/reserved/' 加以判断；

则需要在 @/config.ts 文件中手动维护：

```ts | pure
/** 是否生产环境 */
export const IS_PRODUCTION = window.location.href.indexOf('/reserved/') !== -1;

/**
 * 通过包含 reserved 关键字判断是否生产环境
 */
const REUEST_DOMAIN = IS_PRODUCTION
  ? 'https://zjzwai.zj.gov.cn'
  : 'https://zfxyfwcs.ding.zj.gov.cn:8080';

/**
 * 本地环境，通过代理调用开发环境接口；
 * 测试环境，调用预发环境接口；
 * 生产环境，调用生产环境接口；
 */
export const URL_PREFIX = IS_LOCAL ? '/api' : REUEST_DOMAIN;
```

然后在 app.ts 手动改写请求前缀：

```ts | pure
import { request } from 'umi';

import { URL_PREFIX } from '@/configs';

/**
 * 参照 umi-request 修改 options
 */
request.extendOptions({
  prefix: URL_PREFIX,
});
```

### 多服务场景

多服务场景指的是一个前端应用需要对接多个后端服务。当这些后端服务通过 slb 或其他方式设置了不同的请求前缀而域名相同时，前端基于上述方式配置单一的代理，然后在接口调用时直接设置前缀（比如 DRS 用户中心），或者对请求方法再次封装（比如防疫系统，几个后端服务就封装出几个方法）。

当这些后端服务有不同的域名，则需要 proxy 配置实现：

```ts | pure
export default defineConfig({
  proxy: {
    '/api': {
      target: 'http://11.11.121.11/',
      pathRewrite: { '^/api': '' },
    },
    '/test': {
      target: 'http://101.11.121.11/',
      pathRewrite: { '^/test': '' },
    },
  },
});
```

## 扩展配置

### mock

可配置值为 true 或者 mock services 服务前缀（优先级高于 mockServiceUrl），表示本次调用需要请求模拟接口数据。

```ts | pure
import { request } from 'umi';
import type { PageResponse } from 'umi';

export async function pageQueryApi(data: IApi) {
  const res = await request<PageResponse<IApi>>('/user-table-ref/page', {
    method: 'POST',
    data,
    // 实际调用后端接口，移除 mock 配置
    mock: 'http://59.202.54.14:18087/mock/64474736179aab66bf09b323',
  });

  if (!res?.success) message.error(res?.errorMsg);
  return res;
}
```

### encrypt

设置接口加密，可配置：

- type: 加密算法，默认 AES；
- fields: 加密的字段，不指定加密整个请求体；
- getPublicKeyParams: 获取公钥时的额外参数；
- publicKey: 公钥，优先级高于 app.ts getPublicKey 调用，以便不同加密接口可指定不同公钥；
- iv: 初始化向量，优先级高于 app.ts getPublicKey 调用，以便不同加密接口可指定不同初始化向量；

```ts | pure
import { request } from 'umi';
import type { Response } from 'umi';

/**
 * 对请求体加密
 * @returns
 */
async function test(): Promise<Response<unknown>> {
  const res = await request<Response<unknown>>(`/test`, {
    encrypt: {
      type: 'AES',
    },
    data: { user: 'admin', password: '123456' },
  });

  if (!res?.success) message.error(res?.errorMsg);
  return res;
}
```

### decrypt

设置接口解密，可配置：

- type: 加密算法，默认 AES；
- fields: 解密的字段，不指定解密整个 res.data；
- getPublicKeyParams: 获取公钥时的额外参数；
- publicKey: 公钥，优先级高于 app.ts getPublicKey 调用，以便不同加密接口可指定不同公钥；
- iv: 初始化向量，优先级高于 app.ts getPublicKey 调用，以便不同加密接口可指定不同初始化向量；

```ts | pure
import { request } from 'umi';
import type { Response } from 'umi';

/**
 * 解密
 * @returns
 */
async function test(): Promise<Response<unknown>> {
  const res = await request<Response<unknown>>(`/test`, {
    decrypt: {
      type: 'AES',
    },
  });

  if (!res?.success) message.error(res?.errorMsg);
  return res;
}
```

### attachment

设置文件下载，可配置：

- type: 文件下载模式。normal 为普通模式，否则为文件流模式，默认文件流模式；
- name: 文件名。在文件流模式下，优先级低于 Content-Disposition 响应头内容；
- extname: 扩展名。在文件流模式下，优先级低于 Content-Disposition 响应头内容；

```ts | pure
import { request } from 'umi';
import type { Response } from 'umi';

async function test(): Promise<Response<unknown>> {
  request<Response<unknown>>(`/test.png`, {
    method: 'get',
    attachment: { type: 'normal', name: 'test', extname: 'png' },
    headers: { AUTH_CODE: 'AUTH_CODE' },
  });
}
```

## 注意事项

1. 请在工程文件中自行添加 app.ts 文件；
