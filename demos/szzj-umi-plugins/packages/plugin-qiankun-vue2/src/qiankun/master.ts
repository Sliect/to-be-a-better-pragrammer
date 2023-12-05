import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { IApi, RUNTIME_TYPE_FILE_NAME } from 'umi';
import { winPath } from 'umi/plugin-utils';
import { withTmpPath } from '../utils/withTmpPath';
import { defaultHistoryType, defaultMasterRootId, MODEL_EXPORT_NAME } from './constants';

export function isMasterEnable(opts: { userConfig: any }) {
  const masterCfg = opts.userConfig.qiankun?.master;
  if (masterCfg) {
    return masterCfg.enable !== false;
  }
  return !!process.env.INITIAL_QIANKUN_MASTER_OPTIONS;
}

export default (api: IApi) => {
  api.describe({
    key: 'qiankun-master',
    enableBy: isMasterEnable,
  });

  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'masterRuntimePlugin.ts' })];
  });

  api.modifyDefaultConfig((config) => ({
    ...config,
    mountElementId: defaultMasterRootId,
    qiankun: {
      ...config.qiankun,
      master: {
        ...JSON.parse(process.env.INITIAL_QIANKUN_MASTER_OPTIONS || '{}'),
        ...(config.qiankun || {}).master,
      },
    },
  }));

  /**
   * MicroApp 渲染容器改为 vue@2 组件
   */
  api.modifyRoutes((memo) => {
    Object.keys(memo).forEach((id) => {
      const route = memo[id];
      if (route.microApp) {
        const appName = route.microApp;
        const base = api.config.base || '/';

        // react-router 形式的 historyType 转换成 vue-router 形式
        const masterHistoryType =
          api.config.history?.type === 'browser'
            ? 'history'
            : api.config.history?.type === 'memory'
            ? 'abstract'
            : api.config.history?.type || defaultHistoryType;

        const routeProps = route.microAppProps || {};
        const normalizedRouteProps = JSON.stringify(routeProps).replace(/"/g, "'");
        route.file = `(async () => {
          const { getMicroAppRouteComponent } = await import('@@/plugin-qiankun-master/getMicroAppRouteComponent');
          return getMicroAppRouteComponent({ appName: '${appName}', base: '${base}', routePath: '${route.path}', masterHistoryType: '${masterHistoryType}', routeProps: ${normalizedRouteProps} })
        })()`;
      }
    });
    return memo;
  });

  function getFileContent(file: string) {
    return readFileSync(join(__dirname, '../../tpls/master', file), 'utf-8');
  }

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: RUNTIME_TYPE_FILE_NAME,
      content: `
import { MasterOptions } from './types'
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);
interface Config {
  master?: MasterOptions;
}
export interface IRuntimeConfig {
  qiankun?: XOR<MasterOptions, Config>;
  ${MODEL_EXPORT_NAME}?: () => Record<string, any>;
}
      `,
    });

    // react-router 形式的 historyType 转换成 vue-router 形式
    const masterHistoryType =
      api.config.history?.type === 'browser'
        ? 'history'
        : api.config.history?.type === 'memory'
        ? 'abstract'
        : api.config.history?.type || defaultHistoryType;

    api.writeTmpFile({
      path: 'masterOptions.ts',
      content: `
let options = ${JSON.stringify({
        masterHistoryType,
        base: api.config.base || '/',
        ...api.config.qiankun.master,
      })};
export const getMasterOptions = () => options;
export const setMasterOptions = (newOpts) => options = ({ ...options, ...newOpts });
      `,
    });

    [
      'common.ts',
      'constants.ts',
      'types.ts',
      'routeUtils.ts',
      'masterRuntimePlugin.ts',
      'getMicroAppRouteComponent.ts.tpl',
      'Loading.vue',
      'ErrorBoundary.vue',
      'MicroApp.vue',
      'MicroAppWithMemoHistory.vue',
    ].forEach((file) => {
      if (file.endsWith('.tpl')) {
        api.writeTmpFile({
          path: file.replace(/\.tpl$/, ''),
          tpl: getFileContent(file),
          context: {
            dynamicRoot: false,
            hasModelPlugin: api.isPluginEnable('model'),
            // dynamicRoot:
            //   api.config.exportStatic && api.config.exportStatic.dynamicRoot,
          },
        });
      } else {
        let content = getFileContent(file);

        if (!api.config.qiankun.externalQiankun) {
          content = content.replace(
            /from 'qiankun'/g,
            `from '${winPath(dirname(require.resolve('qiankun/package')))}'`,
          );
        }

        api.writeTmpFile({
          path: file.replace(/\.tpl$/, ''),
          content: content.replace(
            /from 'lodash\//g,
            `from '${winPath(dirname(require.resolve('lodash/package')))}/`,
          ),
        });
      }
    });

    api.writeTmpFile({
      path: 'index.ts',
      content: `
export { default as MicroApp } from './MicroApp';
export { default as MicroAppWithMemoHistory } from './MicroAppWithMemoHistory';
      `,
    });

    /**
     * vue@2 使用 store 进行数据共享
     */
    const { path, exports } = api.appData.appJS || {};
    api.writeTmpFile({
      path: 'stateForSlave.ts',
      content:
        path && exports.includes(MODEL_EXPORT_NAME)
          ? `import { ${MODEL_EXPORT_NAME} } from '@/app';
export default ${MODEL_EXPORT_NAME}();`
          : 'export default {};',
    });
  });

  // state model for slave app
  api.addRuntimePluginKey(() => [MODEL_EXPORT_NAME]);
};
