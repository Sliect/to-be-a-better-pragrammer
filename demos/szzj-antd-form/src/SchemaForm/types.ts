import type { FormInstance } from 'antd/es/form';
import type { FormProps as BasicFormProps } from '../Form/types';

export type Entity = Record<string, any>;

export type Field = {
  /** 表单控件类型 */
  fieldType?: string;
  /** 表单控件 name 值 */
  name: string;
  /** 表单控件 label 值 */
  label: string;
  /** 表单控件何时显示 */
  when?: [(vals: Entity, dataSource?: Entity) => boolean, string[]];
  [key: string]: any;
};

/**
 * 表单控制器实例
 */
export type IFormInstance<Values = any> = FormInstance<Values> & {
  __powerBySzzjSchemaForm?: boolean;
};

/**
 * 与 antd 类型不一致
 * @fixme
 */
export type IColProps = {
  span?: number;
  xs?: { span?: number };
  sm?: { span?: number };
  xxl?: { span?: number };
};

export type FormProps<Values = any> = Omit<
  BasicFormProps,
  'form' | 'fields' | 'labelCol' | 'wrapperCol'
> & {
  /** antd 表单实例 */
  form?: IFormInstance<Values>;
  /** 表单的 schema 描述 */
  fields: Field[];
  /** 样式类 */
  className?: string;
  /** 提交回调 */
  onSubmit?: (vals: Values) => void;
  /** 取消回调 */
  onCancel?: () => void;
  /** 布局模式 */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 按钮表现 */
  footer?: false | ((form: any) => React.ReactNode);
  /** 额外注册的表单控件 */
  Fields?: Record<string, React.ComponentType<any>>;
  /** 容器组件，布局用 */
  FieldWrap?: React.ComponentType<any>;
  labelCol?: IColProps;
  wrapperCol?: IColProps;
};
