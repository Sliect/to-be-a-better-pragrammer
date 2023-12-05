import { dirname } from 'path';
import { resolve } from '@umijs/utils';

/**
 * 解析获得依赖的 package.json 路径
 * @param opts
 * @returns
 */
export function resolveProjectDep(opts: { pkg: any; cwd: string; dep: string }) {
  if (opts.pkg.dependencies?.[opts.dep] || opts.pkg.devDependencies?.[opts.dep]) {
    return dirname(
      resolve.sync(`${opts.dep}/package.json`, {
        basedir: opts.cwd,
      }),
    );
  }
}
