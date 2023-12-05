import { dirname } from 'path';
import { Mustache } from '@umijs/utils';
import { resolveProjectDep } from './utils/resolveProjectDep';
import { withTmpPath } from './utils/withTmpPath';
import type { IApi } from 'umi';

/**
 * copy from umijs
 */
export default (api: IApi) => {
  let pkgPath: string;
  let antdVersion = '4.0.0';
  try {
    pkgPath =
      resolveProjectDep({
        pkg: api.pkg,
        cwd: api.cwd,
        dep: 'antd',
      }) || dirname(require.resolve('antd/package.json'));
    antdVersion = require(`${pkgPath}/package.json`).version;
  } catch (e) {}

  api.describe({
    key: 'antd',
    config: {
      default: {
        dayjs: true,
        import: true,
        style: 'css',
      },
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            configProvider: Joi.object(),
            /**
             * 使用 dayjs 代替 moment
             */
            dayjs: Joi.boolean(),
            /**
             * 主题，dark 暗黑风格；compact 紧凑主题
             */
            dark: Joi.boolean(),
            compact: Joi.boolean(),
            /**
             * 按需加载
             */
            import: Joi.boolean(),
            /**
             * 使用 less 还是 css
             */
            style: Joi.string().allow('less', 'css'),
          }),
          Joi.boolean().invalid(true),
        );
      },
    },
  });

  function checkPkgPath() {
    if (!pkgPath) {
      throw new Error(`Can't find antd package. Please install antd first.`);
    }
  }

  api.modifyAppData((memo) => {
    checkPkgPath();
    const version = require(`${pkgPath}/package.json`).version;
    memo.antd = {
      pkgPath,
      version,
    };
    return memo;
  });

  api.modifyConfig((memo) => {
    checkPkgPath();

    let antd = memo.antd || {};

    // antd import
    memo.alias.antd = pkgPath;

    // moment > dayjs
    if (antd.dayjs) {
      memo.alias.moment = dirname(require.resolve('dayjs/package.json'));
    }

    // antd 5 里面没有变量了，less 跑不起来。注入一份变量至少能跑起来
    if (antdVersion.startsWith('5')) {
      const theme = require('@ant-design/antd-theme-variable');
      memo.theme = {
        ...theme,
        ...memo.theme,
      };
    }

    // dark mode & compact mode
    if (antd.dark || antd.compact) {
      const { getThemeVariables } = require('antd/dist/theme');
      memo.theme = {
        ...getThemeVariables(antd),
        ...memo.theme,
      };
    }

    // antd theme
    memo.theme = {
      'root-entry-name': 'default',
      ...memo.theme,
    };

    return memo;
  });

  // babel-plugin-import
  api.addExtraBabelPlugins(() => {
    const style = api.config.antd.style || 'less';

    // antd@5 不需要插件了，会报错
    if (antdVersion.startsWith('5')) {
      return [];
    }

    return api.config.antd.import && !api.appData.vite
      ? [
          [
            require.resolve('babel-plugin-import'),
            {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: style === 'less' ? true : 'css',
            },
            'antd',
          ],
        ]
      : [];
  });

  // import antd style if antd.import is not configured
  api.addEntryImportsAhead(() => {
    const style = api.config.antd.style || 'less';

    const doNotImportLess =
      (api.config.antd.import && !api.appData.vite) || antdVersion.startsWith('5');

    return doNotImportLess
      ? []
      : [
          {
            source: style === 'less' ? 'antd/dist/antd.less' : 'antd/dist/antd.css',
          },
        ];
  });

  // antd config provider
  api.onGenerateFiles(() => {
    if (!api.config.antd.configProvider) return;
    api.writeTmpFile({
      path: `runtime.tsx`,
      content: Mustache.render(
        `
import React from 'react';
import { ConfigProvider, Modal, message, notification } from 'antd';

export function rootContainer(container) {
  const finalConfig = {...{{{ config }}}}
  if (finalConfig.prefixCls) {
    Modal.config({
      rootPrefixCls: finalConfig.prefixCls
    });
    message.config({
      prefixCls: \`\${finalConfig.prefixCls}-message\`
    });
    notification.config({
      prefixCls: \`\${finalConfig.prefixCls}-notification\`
    });
  }
  return <ConfigProvider {...finalConfig}>{container}</ConfigProvider>;
}
      `.trim(),
        {
          config: JSON.stringify(api.config.antd.configProvider),
        },
      ),
    });
  });

  api.addRuntimePlugin(() => {
    return api.config.antd.configProvider
      ? [withTmpPath({ api, path: 'runtime.tsx' })]
      : [];
  });
};
