import { join } from 'path';
import { winPath } from '@umijs/utils';
import { IApi } from 'umi';

/**
 * 插件临时文件的路径
 * @param opts
 * @returns
 */
export function withTmpPath(opts: { api: IApi; path: string; noPluginDir?: boolean }) {
  return winPath(
    join(
      opts.api.paths.absTmpPath,
      opts.api.plugin.key && !opts.noPluginDir ? `plugin-${opts.api.plugin.key}` : '',
      opts.path,
    ),
  );
}
