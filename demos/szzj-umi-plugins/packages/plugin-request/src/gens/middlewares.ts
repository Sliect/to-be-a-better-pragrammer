import { crypto, downloadByBlob, download } from '@szzj/utils';
import type { Context } from 'umi-request';

/**
 * 全局性加密中间件
 * @param ctx
 * @param next
 */
export const EncryptMiddleware = async (ctx: Context, next: () => void) => {
  const { req } = ctx;

  if (req.options.encrypt) {
    const {
      type = 'AES',
      fields,
      getPublicKeyParams = {},
      publicKey: configPublicKey,
      iv: configIv,
      ...rest
    } = req.options.encrypt;

    let appJs = {};

    /**
     * @fixme 临时性捕获错误处理，需要通过 node.js 判断模块存在与否
     */
    try {
      appJs = require('@/app');
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('if you want to use decrypt, please check app.ts is existed.');
      }
    }

    if (!configPublicKey && !appJs.getPublicKey) {
      throw new Error('app.ts must export getPublicKey for encrypt config.');
    }

    const cryptoInstance = crypto({ type });

    if (configPublicKey) {
      cryptoInstance.setKey(configPublicKey);
      if (cryptoInstance.setIv && configIv) cryptoInstance.setIv(configIv);
    } else {
      const publicKey = await appJs.getPublicKey({ ...getPublicKeyParams, type });

      if (typeof publicKey === 'string') {
        cryptoInstance.setKey(publicKey);
      } else {
        cryptoInstance.setKey(publicKey.publicKey);
        if (cryptoInstance.setIv && publicKey.iv) cryptoInstance.setIv(publicKey.iv);
      }
    }

    if (!fields) {
      const data = cryptoInstance.encrypt(req.options.data, {
        ...rest,
      });

      req.options.data = data;
    } else {
      const data = { ...req.options.data };

      fields.map(async (fieldName: string) => {
        data[fieldName] = cryptoInstance.encrypt(data[fieldName], {
          ...rest,
        });
      });

      req.options.data = data;
    }

    await next();
  } else {
    await next();
  }
};

/**
 * 全局性解密中间件
 * @param ctx
 * @param next
 */
export const DecryptMiddleware = async (ctx: Context, next: () => void) => {
  const { req } = ctx;

  await next();

  const { res } = ctx;
  if (req.options.decrypt) {
    const {
      type = 'AES',
      fields,
      getPublicKeyParams = {},
      publicKey: configPublicKey,
      iv: configIv,
      ...rest
    } = req.options.decrypt;

    let appJs = {};
    /**
     * @fixme 临时性捕获错误处理，需要通过 node.js 判断模块存在与否
     */
    try {
      appJs = require('@/app');
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('if you want to use decrypt, please check app.ts is existed.');
      }
    }

    if (!configPublicKey && !appJs.getPublicKey) {
      throw new Error('app.ts must export getPublicKey for decrypt config.');
    }

    if (!['AES', 'SM4'].includes(type)) {
      throw new Error('decrypt is only support AES or SM4.');
    }

    const cryptoInstance = crypto({ type });

    if (configPublicKey) {
      cryptoInstance.setKey(configPublicKey);
      if (cryptoInstance.setIv && configIv) cryptoInstance.setIv(configIv);
    } else {
      const publicKey = await appJs.getPublicKey({ ...getPublicKeyParams, type });

      if (typeof publicKey === 'string') {
        cryptoInstance.setKey(publicKey);
      } else {
        cryptoInstance.setKey(publicKey.publicKey);
        if (cryptoInstance.setIv && publicKey.iv) cryptoInstance.setIv(publicKey.iv);
      }
    }

    if (!fields) {
      if (typeof res.data !== 'string') {
        throw new Error('res.data should be string');
      }

      const data = cryptoInstance.decrypt(res.data, {
        ...rest,
      });

      res.data = data;
    } else {
      const data = { ...res.data };

      fields.map(async (fieldName: string) => {
        if (typeof data[fieldName] !== 'string') {
          throw new Error('fieldName in response should be string');
        }

        data[fieldName] = cryptoInstance.decrypt(data[fieldName], {
          ...rest,
        });
      });

      res.data = data;
    }
  }
};

/**
 * 全局二进制流文件下载中间件
 * @param ctx
 * @param next
 */
export const AttachmentMiddleware = async (ctx: Context, next: () => void) => {
  const { req } = ctx;
  const { attachment } = req.options;

  if (attachment) {
    if (attachment.type === 'normal') {
      // 普通模式下载
      const { url } = req;
      const { headers } = req.options;

      const getHeadersString = () => {
        const result: string[] = [];

        if (headers) {
          Object.keys(headers).forEach((key) => {
            if (key.toLocaleLowerCase() !== 'accept') {
              result.push(`${key}=${headers[key as keyof typeof headers]}`);
            }
          });
        }

        return result.join('&');
      };

      const link =
        url.indexOf('?') !== -1
          ? url + '&' + getHeadersString()
          : url + '?' + getHeadersString();

      download(link, attachment.name, attachment.extname);
      return;
    } else {
      // 文件流下载
      // 当为附件下载时，获取原始 response
      req.options.getResponse = true;
      // 当为附件下载时，使用 umi-request 内置机制将其转化为 blob 对象
      req.options.responseType = 'blob';
    }
  }

  await next();

  const { res } = ctx;

  if (attachment) {
    const contentDisposition = res.response.headers.get('Content-Disposition');
    if (contentDisposition) {
      const matchs = contentDisposition.match(
        /filename[\*]?=(utf-8)?[\'\"]*([^\'\"]*)[\'\"]*/,
      );
      const fileName = decodeURIComponent(matchs[2]);
      const [name, extname] = fileName.split('.');
      downloadByBlob(res.data, name, extname);
    } else {
      downloadByBlob(res.data, attachment.name, attachment.extname);
    }
  }
};
