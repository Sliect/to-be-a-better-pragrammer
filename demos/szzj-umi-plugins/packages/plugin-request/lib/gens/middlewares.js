var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/gens/middlewares.ts
var middlewares_exports = {};
__export(middlewares_exports, {
  AttachmentMiddleware: () => AttachmentMiddleware,
  DecryptMiddleware: () => DecryptMiddleware,
  EncryptMiddleware: () => EncryptMiddleware
});
module.exports = __toCommonJS(middlewares_exports);
var import_utils = require("@szzj/utils");
var EncryptMiddleware = async (ctx, next) => {
  const { req } = ctx;
  if (req.options.encrypt) {
    const {
      type = "AES",
      fields,
      getPublicKeyParams = {},
      publicKey: configPublicKey,
      iv: configIv,
      ...rest
    } = req.options.encrypt;
    let appJs = {};
    try {
      appJs = require("@/app");
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.warn("if you want to use decrypt, please check app.ts is existed.");
      }
    }
    if (!configPublicKey && !appJs.getPublicKey) {
      throw new Error("app.ts must export getPublicKey for encrypt config.");
    }
    const cryptoInstance = (0, import_utils.crypto)({ type });
    if (configPublicKey) {
      cryptoInstance.setKey(configPublicKey);
      if (cryptoInstance.setIv && configIv)
        cryptoInstance.setIv(configIv);
    } else {
      const publicKey = await appJs.getPublicKey({ ...getPublicKeyParams, type });
      if (typeof publicKey === "string") {
        cryptoInstance.setKey(publicKey);
      } else {
        cryptoInstance.setKey(publicKey.publicKey);
        if (cryptoInstance.setIv && publicKey.iv)
          cryptoInstance.setIv(publicKey.iv);
      }
    }
    if (!fields) {
      const data = cryptoInstance.encrypt(req.options.data, {
        ...rest
      });
      req.options.data = data;
    } else {
      const data = { ...req.options.data };
      fields.map(async (fieldName) => {
        data[fieldName] = cryptoInstance.encrypt(data[fieldName], {
          ...rest
        });
      });
      req.options.data = data;
    }
    await next();
  } else {
    await next();
  }
};
var DecryptMiddleware = async (ctx, next) => {
  const { req } = ctx;
  await next();
  const { res } = ctx;
  if (req.options.decrypt) {
    const {
      type = "AES",
      fields,
      getPublicKeyParams = {},
      publicKey: configPublicKey,
      iv: configIv,
      ...rest
    } = req.options.decrypt;
    let appJs = {};
    try {
      appJs = require("@/app");
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.warn("if you want to use decrypt, please check app.ts is existed.");
      }
    }
    if (!configPublicKey && !appJs.getPublicKey) {
      throw new Error("app.ts must export getPublicKey for decrypt config.");
    }
    if (!["AES", "SM4"].includes(type)) {
      throw new Error("decrypt is only support AES or SM4.");
    }
    const cryptoInstance = (0, import_utils.crypto)({ type });
    if (configPublicKey) {
      cryptoInstance.setKey(configPublicKey);
      if (cryptoInstance.setIv && configIv)
        cryptoInstance.setIv(configIv);
    } else {
      const publicKey = await appJs.getPublicKey({ ...getPublicKeyParams, type });
      if (typeof publicKey === "string") {
        cryptoInstance.setKey(publicKey);
      } else {
        cryptoInstance.setKey(publicKey.publicKey);
        if (cryptoInstance.setIv && publicKey.iv)
          cryptoInstance.setIv(publicKey.iv);
      }
    }
    if (!fields) {
      if (typeof res.data !== "string") {
        throw new Error("res.data should be string");
      }
      const data = cryptoInstance.decrypt(res.data, {
        ...rest
      });
      res.data = data;
    } else {
      const data = { ...res.data };
      fields.map(async (fieldName) => {
        if (typeof data[fieldName] !== "string") {
          throw new Error("fieldName in response should be string");
        }
        data[fieldName] = cryptoInstance.decrypt(data[fieldName], {
          ...rest
        });
      });
      res.data = data;
    }
  }
};
var AttachmentMiddleware = async (ctx, next) => {
  const { req } = ctx;
  const { attachment } = req.options;
  if (attachment) {
    if (attachment.type === "normal") {
      const { url } = req;
      const { headers } = req.options;
      const getHeadersString = () => {
        const result = [];
        if (headers) {
          Object.keys(headers).forEach((key) => {
            if (key.toLocaleLowerCase() !== "accept") {
              result.push(`${key}=${headers[key]}`);
            }
          });
        }
        return result.join("&");
      };
      const link = url.indexOf("?") !== -1 ? url + "&" + getHeadersString() : url + "?" + getHeadersString();
      (0, import_utils.download)(link, attachment.name, attachment.extname);
      return;
    } else {
      req.options.getResponse = true;
      req.options.responseType = "blob";
    }
  }
  await next();
  const { res } = ctx;
  if (attachment) {
    const contentDisposition = res.response.headers.get("Content-Disposition");
    if (contentDisposition) {
      const matchs = contentDisposition.match(
        /filename[\*]?=(utf-8)?[\'\"]*([^\'\"]*)[\'\"]*/
      );
      const fileName = decodeURIComponent(matchs[2]);
      const [name, extname] = fileName.split(".");
      (0, import_utils.downloadByBlob)(res.data, name, extname);
    } else {
      (0, import_utils.downloadByBlob)(res.data, attachment.name, attachment.extname);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AttachmentMiddleware,
  DecryptMiddleware,
  EncryptMiddleware
});
