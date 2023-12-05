import type { IApi } from 'umi';
import createDebug from 'debug';
import { withTmpPath } from './utils/withTmpPath';

const { NODE_ENV } = process.env;
const IS_LOCAL = NODE_ENV === 'development';

const debug = createDebug('@szzj/umi-plugin-szsubapp');

export default (api: IApi) => {
  api.describe({
    key: 'szsubapp',
    config: {
      default: {
        devMode: 'app',
      },
      schema(joi) {
        return joi.object({
          /** 本地开发模式，app 作为独立应用调试，subapp 作为子应用调试，布局需由主应用提供 */
          devMode: joi.string(),
          /** 子应用名，不设置会使用 package.json 中的 name 值 */
          name: joi.string(),
          /** 资源加载路径 */
          publicPath: joi.string(),
          /** 后端服务地址 */
          proxyTarget: joi.string(),
          /** 是否需要 Layout.Content 包裹 */
          hasNotLayoutContent: joi.boolean(),
          /** 请求前缀是否携带子应用标识 */
          prefixWithSubappName: joi.boolean(),
        });
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
  });

  api.modifyDefaultConfig((memo) => {
    const name = api.userConfig.szsubapp?.name
      ? api.userConfig.szsubapp.name
      : api.pkg.name;

    const {
      devMode = 'app',
      proxyTarget,
      publicPath,
      prefixWithSubappName,
    } = api.userConfig.szsubapp || {};

    debug('NODE_ENV is %o', NODE_ENV);
    debug('subapp name is %o', name);
    debug('devMode is %o', devMode);
    debug('proxyTarget is %o', proxyTarget);
    debug('publicPath is %o', publicPath);
    debug('prefixWithSubappName is %o', prefixWithSubappName);

    const routerBase = IS_LOCAL && devMode === 'app' ? '/' : `/${name}`;

    const result = {
      ...memo,
      history: {
        type: 'hash',
      },
      szapp: {
        history: 'hash',
        publicPath,
        errorPages: false,
      },
      szlayout:
        IS_LOCAL && devMode === 'app'
          ? {
              layout: 'sider',
              breadcrumbsMode: 'simple',
              title: `子应用 ${name}`,
              copyright: `@子应用 ${name}`,
              userName: '本地模拟用户',
              logo: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
              base: `/`,
              excludes: [],
            }
          : false,
      szrequest: {
        prefix: `${IS_LOCAL ? '/api' : ''}${
          prefixWithSubappName && name ? '/' + name : ''
        }`,
        proxyTarget,
      },
      base: routerBase,
      mountElementId: `subapp-${name}`,

      headScripts:
        IS_LOCAL && devMode === 'app'
          ? [
              'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
              'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
              {
                content: `window.routerBase = "${routerBase}"`,
                charset: 'utf-8',
              },
            ]
          : [
              {
                content: `window.routerBase = "${routerBase}"`,
                charset: 'utf-8',
              },
            ],

      externals: {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        },
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'ReactDOM',
          commonjs: 'ReactDOM',
          amd: 'ReactDOM',
        },
      },
    };

    return result;
  });

  api.onGenerateFiles(() => {
    const { hasNotLayoutContent = false } = api.userConfig.szsubapp ?? {};
    const { antd } = api.pkg.dependencies;
    const hasAntd5 = antd.match(/^[\^]?5\./);

    debug('hasNotLayoutContent is %o', hasNotLayoutContent);

    if (hasNotLayoutContent || IS_LOCAL) {
      api.writeTmpFile({
        path: 'runtime.tsx',
        content: `import React from 'react';
import { ConfigProvider } from 'antd';
${
  hasAntd5
    ? "import zh_CN from 'antd/locale/zh_CN';"
    : "import zh_CN from 'antd/es/locale/zh_CN';"
}

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider locale={zh_CN}>
      {container}
    </ConfigProvider>
  );
}`,
      });
    } else {
      api.writeTmpFile({
        path: 'runtime.tsx',
        content: `import React from 'react';
import { ConfigProvider, Layout } from 'antd';
${
  hasAntd5
    ? "import zh_CN from 'antd/locale/zh_CN';"
    : "import zh_CN from 'antd/es/locale/zh_CN';"
}

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider locale={zh_CN}>
      <Layout.Content style={{ minHeight: 'calc(100vh - 175px)', margin: '24px 16px 0' }}>
        {container}
      </Layout.Content>
    </ConfigProvider>
  );
}`,
      });
    }
  });

  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.tsx' })];
  });

  if (IS_LOCAL) {
    api.addHTMLStyles(() => {
      return [
        {
          content: `
            .ant-layout.ly { height: inherit; }
            .ant-layout-content.ly-content { background: inherit; padding: inherit; min-height: calc(100vh - 176px); margin: 24px 16px 0; }
            .breadcrumbs.breadcrumbs-simple { margin: 16px 0 0px 16px; }
          `,
        },
      ];
    });
  }
};
