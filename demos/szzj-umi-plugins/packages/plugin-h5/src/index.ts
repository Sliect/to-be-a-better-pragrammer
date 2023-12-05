import { copyFileSync, statSync } from 'fs';
import { join } from 'path';
import { glob, fsExtra, winPath } from '@umijs/utils';
import pxToViewPort from 'postcss-px-to-viewport';
import type { IApi } from 'umi';

const DIR_NAME = 'plugin-szh5';

export default (api: IApi) => {
  api.describe({
    key: 'szh5',
    config: {
      default: {
        onlyChunkHash: true,
        history: 'hash',
        publicPath: '/',
        errorPages: {
          mode: 'normal',
        },
      },
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            /**
             * 是否启用调试模式，工程会自动加载 eruda。如需使用 vconsole，请自行在工程中安装依赖
             */
            debug: Joi.boolean(),
            /**
             * 是否为浙里办 h5，应用会自动加载浙里办 jsbridge，埋点 bridge
             */
            zlb: Joi.boolean(),
            /**
             * 是否为浙政钉 h5，应用会自动加载埋点 bridge
             */
            zzd: Joi.boolean(),
            /**
             * 路由模式，默认使用 hash 路由
             */
            history: Joi.string(),
            /**
             * publicPath，开发环境始终会使用 '/'
             */
            publicPath: Joi.string(),
            /**
             * 入口文件名打包后是否不包含 hash 值
             */
            onlyChunkHash: Joi.boolean(),
            /**
             * 是否包含 403、404、500 等错误页面，需自行安装 antd-mobile 等
             */
            errorPages: Joi.alternatives().try(
              Joi.object({
                mode: Joi.string().required(),
                appBelong: Joi.string(),
                appAdmin: Joi.string(),
                appAdminMobile: Joi.string(),
                labelWidth: Joi.number(),
                totalWidth: Joi.number(),
              }),
              Joi.boolean().invalid(true),
            ),
          }),
          Joi.boolean().invalid(true),
        );
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
  });

  /**
   * 修改默认配置
   */
  api.modifyDefaultConfig((memo) => {
    const { NODE_ENV } = process.env;
    const { szh5 = {} } = api.userConfig;
    const { history = 'hash', publicPath = '/', onlyChunkHash = true, zlb, zzd } = szh5;

    let realPublicPath;

    if (zlb || zzd) {
      realPublicPath = NODE_ENV === 'production' ? './' : '/';
    } else {
      realPublicPath = NODE_ENV === 'production' ? publicPath : '/';
    }

    return {
      ...memo,

      history:
        NODE_ENV !== 'production'
          ? { type: 'hash' }
          : {
              type: history,
            },
      // 配置驼峰式使用
      cssLoaderModules: {
        exportLocalsConvention: 'camelCase',
      },
      publicPath: realPublicPath,
      targets: { chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10, ie: 11 },
      // 当 targets 中有 ie 时，不支持 esbuild。build 时会提醒，dev 不提醒
      jsMinifier: 'terser',
      /** 提升编译速度 */
      externals:
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'production' ||
        zlb ||
        zzd
          ? undefined
          : {
              react: 'window.React',
              'react-dom': 'window.ReactDOM',
            },
      /** 提升编译速度 */
      /** 减少打包体积 */
      ignoreMomentLocale: true,
      /** 减少打包体积 */
      extraPostCSSPlugins: [
        pxToViewPort({
          viewportWidth: 375,
          viewportHeight: 667,
          unitPrecision: 5,
          viewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
        }),
      ],
      chainWebpack(config: any) {
        if (!onlyChunkHash) config.output.filename(`[name].[contenthash:8].js`);
        config.output.chunkFilename(`[name].[contenthash:8].async.js`);
        config.plugin('mini-css-extract-plugin').tap(() => {
          return [
            {
              filename: onlyChunkHash ? `[name].css` : `[name].[contenthash:8].css`,
              chunkFilename: `[name].[contenthash:8].chunk.css`,
              ignoreOrder: true,
            },
          ];
        });
      },
      verifyCommit: {
        scope: [
          'feat',
          'fix',
          'docs',
          'style',
          'refactor',
          'perf',
          'test',
          'build',
          'ci',
          'chore',
          'revert',
        ],
        allowEmoji: true,
      },
    };
  });

  /**
   * 使用 eruda 调试
   */
  api.addEntryCode(() => {
    const { debug } = api.config.szh5;
    if (!debug) return '';
    return `import eruda from 'eruda';
    eruda.init();`;
  });

  /**
   * 403, 404, 500 页面注入
   */
  api.onGenerateFiles(() => {
    const { absTmpPath } = api.paths;

    const cwd = join(__dirname, '../src/gens');
    const files = glob.sync('**/*', {
      cwd,
    });
    const base = join(absTmpPath!, DIR_NAME, '');
    fsExtra.mkdirpSync(base);
    files.forEach((file) => {
      const source = join(cwd, file);
      const target = join(base, file);
      if (statSync(source).isDirectory()) {
        fsExtra.mkdirpSync(target);
      } else {
        copyFileSync(source, target);
      }
    });
    if (api.config.szh5) {
      const arr = ['403', '404', '500'];
      const { errorPages } = api.config.szh5;
      const { mode, appBelong, appAdmin, appAdminMobile, labelWidth, totalWidth } =
        errorPages;
      arr.forEach((status) => {
        api.writeTmpFile({
          path: join(status, 'index.tsx'),
          content: `import { ErrorPage } from '@szzj/components-mobile';
    
export default function Page${status}() {
  return <ErrorPage 
    mode="${mode}" 
    status="${status}" 
    appBelong=${appBelong ? `"${appBelong}"` : `{${undefined}}`}
    appAdmin=${appAdmin ? `"${appAdmin}"` : `{${undefined}}`}
    appAdminMobile=${appAdminMobile ? `"${appAdminMobile}"` : `{${undefined}}`}
    totalWidth=${totalWidth ? `{${totalWidth}}` : `{${undefined}}`}
    labelWidth=${labelWidth ? `{${labelWidth}}` : `{${undefined}}`}
  />;
}`,
        });
      });
    }
  });

  /**
   * 设置页面标题
   */
  api.addLayouts(() => {
    const { absTmpPath } = api.paths;
    return [
      {
        id: 'titleLayout',
        file: winPath(join(absTmpPath!, DIR_NAME, 'TitleLayout/index.tsx')),
      },
    ];
  });

  /**
   * 403/404/500 错误页面
   */
  api.modifyRoutes((memo) => {
    const { absTmpPath } = api.paths;
    const { errorPages } = api.config.szh5;

    if (errorPages) {
      memo['403'] = {
        id: '403',
        path: '/403',
        absPath: '/403',
        file: winPath(join(absTmpPath!, DIR_NAME, '403/index.tsx')),
        exact: true,
      };

      memo['404'] = {
        id: '404',
        path: '/404',
        absPath: '/404',
        file: winPath(join(absTmpPath!, DIR_NAME, '404/index.tsx')),
        exact: true,
      };

      memo['500'] = {
        id: '500',
        path: '/500',
        absPath: '/500',
        file: winPath(join(absTmpPath!, DIR_NAME, '500/index.tsx')),
        exact: true,
      };
    }

    return memo;
  });

  /**
   * 浙里办 jsbridge
   */
  api.addHTMLHeadScripts(() => {
    const { zlb } = api.config.szh5;
    return zlb
      ? [
          {
            src: '//assets.zjzwfw.gov.cn/assets/ZWJSBridge/1.1.0/zwjsbridge.js',
          },
          {
            src: '//assets.zjzwfw.gov.cn/assets/zwlog/1.0.0/zwlog.js',
          },
        ]
      : [];
  });

  /**
   * 浙政钉逐木鸟埋点
   */
  api.addHTMLHeadScripts(() => {
    const { zzd } = api.config.szh5;
    return zzd
      ? [
          {
            src: '//wpk-gate.zjzwfw.gov.cn/static/wpk-jssdk.1.0.2/wpkReporter.js',
          },
        ]
      : [];
  });
};
