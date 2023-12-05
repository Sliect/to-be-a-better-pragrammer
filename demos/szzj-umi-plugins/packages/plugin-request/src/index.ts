import { glob, fsExtra } from '@umijs/utils';
import { join } from 'path';
import type { IApi } from 'umi';

const DIR_NAME = 'plugin-szrequest';

export default (api: IApi) => {
  api.describe({
    key: 'szrequest',
    config: {
      default: {
        prefix: '/api',
        prefixTarget: '',
      },
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            /** 请求前缀 */
            prefix: Joi.string(),
            /** 请求转发域名 */
            proxyTarget: Joi.string(),
            /** 请求转发路径前缀 */
            prefixTarget: Joi.string(),
            /** mock 服务地址 */
            mockServiceUrl: Joi.alternatives().try(Joi.string(), Joi.boolean()),
          }),
          Joi.boolean().invalid(true),
        );
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
  });

  api.modifyConfig((memo) => {
    const { prefix = '/api', proxyTarget, prefixTarget = '' } = memo.szrequest || {};
    if (!prefix) return memo;

    const prefixWillRewrite = prefix.indexOf('/api') !== -1 ? '/api' : prefix;
    return {
      ...memo,
      proxy: {
        [prefix]: {
          target: proxyTarget,
          pathRewrite: {
            [`^${prefixWillRewrite}`]: prefixTarget,
          },
          changeOrigin: true,
          // bypass: function (req, res, proxyOptions) {
          //   if (req.originalUrl.indexOf(prefix) !== -1) {
          //     console.log(req.originalUrl);
          //     console.log(proxyOptions);
          //     console.log(res);
          //   }
          // },
        },
        ...memo.proxy,
      },
    };
  });

  let generatedOnce = false;
  api.onGenerateFiles(() => {
    if (generatedOnce) return;
    generatedOnce = true;
    const cwd = join(__dirname, '../src/gens');
    const files = glob.sync('**/*', {
      cwd,
    });
    const base = join(api.paths.absTmpPath!, DIR_NAME);
    fsExtra.mkdirpSync(base);
    files.forEach((file) => {
      const source = join(cwd, file);
      const target = join(base, file);
      if (fsExtra.statSync(source).isDirectory()) {
        fsExtra.mkdirpSync(target);
      } else {
        fsExtra.copyFileSync(source, target);
      }
    });
  });

  // 导出 request 方法
  api.onGenerateFiles(() => {
    const {
      prefix = '/api',
      mockServiceUrl = 'http://59.202.54.14:18087/mock/644793528807247e213956e7/ones',
    } = api.config.szrequest || {};
    const urlPrefix = process.env.NODE_ENV === 'development' ? prefix : '';

    api.writeTmpFile({
      path: 'index.ts',
      content: `import type { RequestMethod } from 'umi-request';
import { getInstance, getMethods, HttpStatusMap } from './instance';
import { get as GetType, post as PostType } from './types';

const URL_PREFIX = '${urlPrefix}';

const request = getInstance({
  prefix: '${urlPrefix}',
}) as RequestMethod;

request.use(async (ctx, next) => {
  // 开发环境开启 mock 服务
  if (${process.env.NODE_ENV === 'development'} && ctx?.req.options.mock) {
    const mockUrlPrefix = typeof ctx?.req.options.mock === 'string' ? ctx?.req.options.mock : '${mockServiceUrl}';
    ctx.req.url = mockUrlPrefix + ctx.req.url.slice('${urlPrefix}'.length);
  }

  await next();
});

const { get, post, put, del } = getMethods(request);

export {
  URL_PREFIX,
  HttpStatusMap,
  request,
  get,
  post,
  put,
  del,
}`,
    });
  });

  api.addRuntimePluginKey(() => ['getPublicKey']);
};
