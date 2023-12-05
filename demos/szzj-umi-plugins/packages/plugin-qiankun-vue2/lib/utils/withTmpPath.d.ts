import type { IApi } from 'umi';
/**
 * 插件临时文件的路径
 * @param opts
 * @returns
 */
export declare function withTmpPath(opts: {
    api: IApi;
    path: string;
    noPluginDir?: boolean;
}): string;
