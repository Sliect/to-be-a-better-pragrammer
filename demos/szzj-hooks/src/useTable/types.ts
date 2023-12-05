import { TableProps as AntdTableProps, TablePaginationConfig } from 'antd/es/table';
import { Options as UseFetchOptions } from '../useFetch/types';

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export interface Data<T> extends Pagination {
  list?: T[];
}

export interface Params {
  current?: number;
  pageSize?: number;
}

export interface Options<Q, R> {
  enableSuccessLog?: boolean; // 开启成功日志
  enableFailLog?: boolean; // 开启失败日志
  defaultParams?: Q; // 默认参数
  useFetchOptions?: UseFetchOptions; // useFetch 配置
  enableFakePagination?: boolean; // 开启伪分页
  enableRowSelection?: boolean; // 开启选择
  transfrom?: (
    data: R[] | Data<R>,
    pagination?: Pagination,
  ) => {
    // 转换响应
    pagination: Pagination;
    list: R[];
  };
  transfromParams?: (params: Q) => any; // 转换请求
}

interface TableProps<R>
  extends Pick<
    AntdTableProps<R>,
    'dataSource' | 'pagination' | 'loading' | 'onChange' | 'rowSelection'
  > {
  dataSource: R[];
}

export interface Table<R> {
  params: Params;
  searchFields: any;
  props: TableProps<R>;
  search: (...args: any[]) => Promise<any>;
  research: (...args: any[]) => Promise<any>;
  reset: () => void;
  getSelectedRowKeys?: () => string[];
  clearSelectedRowKeys?: () => void;
}
