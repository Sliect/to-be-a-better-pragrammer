import { dirname } from 'path';
import { Mustache, winPath } from '@umijs/utils';
import type { IApi } from 'umi';

const DIR_NAME = 'plugin-moment2dayjs';

/**
 * copy from umijs
 */
export default (api: IApi) => {
  api.describe({
    key: 'moment2dayjs',
    config: {
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            preset: Joi.string(), // 'antd' | 'none'
            plugins: Joi.array(),
          }),
          Joi.boolean().invalid(true),
        );
      },
    },
    enableBy: api.EnableBy.config,
  });

  const presets = {
    antd: [
      'isSameOrBefore',
      'isSameOrAfter',
      'advancedFormat',
      'customParseFormat',
      'weekday',
      'weekYear',
      'weekOfYear',
      'isMoment',
      'localeData',
      'localizedFormat',
    ],
  };

  const getDayjsPlugins = (api: IApi) => {
    let { preset = 'antd', plugins = [] } = api.config.moment2dayjs || {};

    switch (preset) {
      case 'antd':
        return Array.from(new Set(presets['antd'].concat(plugins)));
      case 'none':
        return [].concat(plugins);
      default:
        return [];
    }
  };

  // replace moment
  api.modifyConfig((memo) => {
    memo.alias.moment = dirname(require.resolve('dayjs/package.json'));
    return memo;
  });

  api.onGenerateFiles(() => {
    const plugins = getDayjsPlugins(api);

    const runtimeTpl = `
import dayjs from '{{{dayjsPath}}}';
import antdPlugin from '{{{dayjsAntdPluginPath}}}';

{{#plugins}}
import {{.}} from '{{{dayjsPath}}}/plugin/{{.}}';
{{/plugins}}

{{#plugins}}
dayjs.extend({{.}});
{{/plugins}}

dayjs.extend(antdPlugin);
    `;
    const dayjsAntdPluginPath = winPath(
      require.resolve('antd-dayjs-webpack-plugin/src/antd-plugin'),
    );
    const dayjsPath = winPath(dirname(require.resolve('dayjs/package.json')));

    api.writeTmpFile({
      path: 'runtime.tsx',
      content: Mustache.render(runtimeTpl, {
        plugins,
        dayjsPath,
        dayjsAntdPluginPath,
      }),
    });
  });

  api.addEntryCodeAhead(() => [`import './${DIR_NAME}/runtime.tsx'`]);
};
