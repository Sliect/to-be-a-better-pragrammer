import { useState } from 'react';
import useFetch from './useFetch';
import { defaultPagination } from '../consts';
import { Params, Pagination, Data, Options, Table } from '../types';

const defaultTransform = <R>(
  data: R[] | Data<R>,
  pagination?: Pagination,
): {
  pagination: Pagination;
  list: R[];
} => {
  return Array.isArray(data)
    ? {
        pagination: {
          current: 1,
          pageSize: pagination ? pagination.pageSize : defaultPagination.pageSize,
          total: (data || []).length,
        },
        list: data || [],
      }
    : {
        pagination: {
          current: data.current,
          pageSize: data.pageSize,
          total: data.total,
        },
        list: data.list || [],
      };
};

const getDataSourceByPagination = <R>(list: any[], pagination: Pagination): R[] => {
  const { current = 0, pageSize = defaultPagination.pageSize, total = 0 } = pagination;
  return (list || []).slice(
    0 + pageSize * (current - 1),
    total < pageSize * current ? total : pageSize * current,
  );
};

const useBaseTable = <Q extends Params, R>(
  request: (...args: any[]) => Promise<any>,
  options: Options<Q, R> = {} as Options<Q, R>,
): Table<R> => {
  const { enableFakePagination, transfrom = defaultTransform } = options;
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);
  const [dataSource, setDataSource] = useState<R[]>([]);
  const { params, data, loading, search, research, reset } = useFetch<Q, Data<R>>(request, {
    ...options,
    // @ts-ignore
    transfrom: (data: any) => {
      const temp = transfrom(data, pagination);
      setPagination(temp.pagination);
      const dataSource = enableFakePagination
        ? getDataSourceByPagination<R>(temp.list, temp.pagination)
        : temp.list;
      setDataSource(dataSource);

      return temp;
    },
  });

  const onChange = (
    pagination: Pagination,
    filters: { [key: string]: any[] },
    sorter: {
      field: string;
      order: string;
    },
  ) => {
    const { current, pageSize } = pagination;
    if (enableFakePagination) {
      const pag = {
        current,
        pageSize,
        total: pagination.total,
      };
      setPagination(pag);
      setDataSource(getDataSourceByPagination<R>((data || { list: [] }).list as any[], pag));

      return;
    }

    // @ts-ignore
    research({
      current,
      pageSize,
      sorter: sorter ? sorter : undefined,
      filters: filters ? filters : undefined,
    });
  };

  const { current, pageSize, ...searchFields } = params;

  return {
    params,
    searchFields,
    props: {
      pagination,
      dataSource,
      loading,
      // @ts-ignore
      onChange,
    },
    search,
    research,
    reset,
  };
};

export default useBaseTable;
