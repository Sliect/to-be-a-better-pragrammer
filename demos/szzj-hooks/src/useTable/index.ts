import useBaseTable from './uses/useBaseTable';
import useRowSelection from './uses/useRowSelection';
import { Params, Options, Table } from './types';

/**
 * 用于快速对接 ant design 表格，或者分页列表等
 * @param request  通过 axios, umi-request 等获取远程数据
 * @param options options.enableSuccessLog, enableFailLog 打印日志
 * @param options options.defaultParams 默认参数
 * @param options options.transfromParams 请求参数转换
 * @param options options.transfrom 响应参数转换
 * @param options options.useFetchOptions useFetch 配置
 * @param options options.enableFakePagination 开启伪分页
 * @param options options.enableRowSelection 开启行选择
 * @returns params 请求参数，未转换前的
 * @returns searchFields 过滤条件
 * @returns props 可以注入到 ant design 表格中的 props
 * @returns search 以新参数查询第一页数据
 * @returns research 混合原有参数进行查询
 * @returns reset 重置
 * @returns getSelectedRowKeys 获取选中行的键
 * @returns clearSelectedRowKeys 清除选中行的键
 */
const useTable = <Q extends Params, R>(
  request: (...args: any[]) => Promise<any>,
  options: Options<Q, R> = {} as Options<Q, R>,
): Table<R> => {
  const { enableRowSelection } = options;
  const table = useBaseTable<Q, R>(request, options);

  // 添加复选框功能
  useRowSelection<R>(table, enableRowSelection);

  return table;
};

export default useTable;
