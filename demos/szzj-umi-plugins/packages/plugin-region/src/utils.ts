

import { glob, winPath } from '@umijs/utils';
import { join, basename } from 'path';
import { IApi } from 'umi';

export const getRegionList = async (
  opts: any,
) => {
  const {
    regionFolder,
    absSrcPath = '',
    absPagesPath = '',
  } = opts;
  

  const regionFiles = glob
    .sync('*.{ts,js,json}', {
      cwd: winPath(join(absSrcPath, regionFolder)),
    })
    .map((name) => winPath(join(absSrcPath, regionFolder, name)))
    .concat(
      glob
        .sync(`**/${regionFolder}/*.{ts,js,json}`, {
          cwd: absPagesPath,
        })
        .map((name) => winPath(join(absPagesPath, name))),
    )
    .map((fullName) => {
      const fileName = basename(fullName);
      
      return {
        regionName: fileName,
        path: fullName,
        name: fileName.split('.')[0]?.replace('-', '_'),
      };
    });
  
    return regionFiles
};

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