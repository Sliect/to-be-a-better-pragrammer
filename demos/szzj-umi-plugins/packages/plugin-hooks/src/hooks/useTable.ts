import { useMemo } from 'react';
import { useTable } from '@szzj/hooks';

type Entity = Record<string, any>;

interface Params extends Entity {
  pageNum?: number;
  pageSize?: number;
  [key: string]: any;
}

/**
 * 响应
 * @see https://dtzhejiang.yuque.com/fmki7n/xex2vc/bwwsx1aq5fxsnefu#hGEX2
 */
interface Response<T> {
  readonly success: boolean;
  readonly data: T;
  readonly errorCode: number;
  readonly errorMsg?: string;
  readonly extraData?: any;
}

/**
 * 分页响应
 * @see https://dtzhejiang.yuque.com/fmki7n/xex2vc/bwwsx1aq5fxsnefu#bNxr1
 */
interface PageData<T> {
  readonly list: T[];
  readonly totalItem: number;
  readonly pageSize: number;
  readonly pageNum: number;
}

/**
 * 分页响应
 */
type PageResponse<T> = Response<PageData<T>>;

export default <T, P = Params>(
  fetch: (params: P) => Promise<PageResponse<T>>,
  options: {
    format?: (entity: T) => T;
    defaultParams?: P;
    [key: string]: any;
  },
) => {
  const { format, defaultParams, ...rest } = options ?? {};
  const table = useTable<any, T>(
    (params: any) => {
      const values: any = {};
      if (params) {
        Object.keys(params).forEach((key) => {
          if (params[key] !== undefined && params[key] !== '') {
            values[key] = params[key];
          }
        });
      }

      return fetch({
        pageNum: 1,
        pageSize: 10,
        ...defaultParams,
        ...values,
      });
    },
    {
      transfrom: (data: any) => {
        const list = data.list || [];
        return {
          pagination: {
            current: data.pageNum,
            pageSize: data.pageSize,
            total: data.totalItem,
          },
          list: format ? list.map(format) : list,
        };
      },
      transfromParams: (data: any) => {
        if (data) {
          const { current = 1, pageSize = 10, sorter, filters, ...rest } = data;
          return {
            ...rest,
            pageNum: current,
            pageSize,
          };
        }

        return data;
      },
      ...rest,
    },
  );

  const finalTable = useMemo(() => {
    const { props } = table;
    const { pagination } = props;

    if (typeof pagination === 'object') {
      const { total = 0, pageSize = 10, current = 1 } = pagination;
      return {
        ...table,
        props: {
          ...table.props,
          pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => `共${total}条`,
            pageSize,
            current,
            total,
          },
        },
      };
    }

    return table;
  }, [table]);

  return finalTable;
};
