import type { FormInstance } from 'antd/es/form';

export interface Options<T> {
  /** antd 表单实例 */
  form?: FormInstance;
  /** 赋值时数据转换 */
  format?: (dataSource?: T) => any;
  /** 提交回调 */
  onSubmit?: (vals: any, dataSource?: T) => any;
}

export interface Modal<T> {
  visible: boolean;
  dataSource?: T;
  loading: boolean;
  show: (record?: T) => void;
  hide: () => void;
  submit: (vals: any) => Promise<any>;
  form?: FormInstance;
  props?: {
    visible: boolean;
    dataSource?: T;
    loading: boolean;
    onCancel: () => void;
    onOk: (vals: any) => Promise<any>;
  };
}
