import { RuleItem } from 'async-validator';

export interface FieldMeta<Values> {
  initialValue?: any; // 初始值
  trigger?: string; // 收集字段的事件
  valuePropName?: string; // 字段值的 props 属性
  getValueFromEvent?: (...args: any[]) => any; // 灌入 store 的值
  normalize?: (value: any) => any; // 将值序列化后灌入字段组件
  rules?: RuleItem[]; // 字段校验规则
  validateFirst?: boolean; // 校验失败后是否阻止其他字段校验
  validateTrigger?: string; // 校验字段的事件
  fieldRef?: any; // 字段组件 ref
  [key: string]: any;
}

export interface Fields {
  [name: string]: any;
}

export interface Errors {
  [name: string]: string[];
}

export interface Options<Values> {
  onValuesChange?: (values: Values) => void;
  /**
   * 是否纯净模式，即当字段控件未注册时，通过 setFieldValue、setFieldsValue 赋值无效
   * 使用场景如同一个搜索框在不同 tab 中复用，有些 tab 需要这些字段，另一些不需要，可以在 tab 切换时通过 resetFields + setFieldsValue 复用搜索框的值
   */
  pure?: boolean;
}

export interface Form<Values> {
  /** 手动注册字段 */
  registerField: (name: string, meta?: FieldMeta<Values>) => void;
  /** 手动销毁字段 */
  unRegisterField: (name: string) => void;
  /** JSX 中注册字段 */
  getFieldDecorator: (
    name: string,
    meta: FieldMeta<Values>,
  ) => (inst: React.ReactElement) => React.ReactElement;
  /** 设置字段的元数据 */
  setFieldMeta: (name: string, key: string | any, value?: any) => void;
  /** 获取字段的元数据 */
  getFieldMeta: (name: string, key?: string) => any;
  /** 获取字段元素的引用 */
  getFieldRef: (name: string) => any;
  /** 获取表单的值 */
  getFieldsValue: () => Values;
  /** 获取字段的值 */
  getFieldValue: (name: string) => any;
  /** 获取字段的初始值 */
  getFieldInitialValue: (name: string) => any;
  /** 获取表单错误 */
  getFieldsError: () => Errors;
  /** 获取字段错误 */
  getFieldError: (name: string) => undefined | string[];
  /**
   * 设置表单的值
   * undefined 会重设为初始值，可使用 null 清空
   */
  setFieldsValue: (vals: Values) => void;
  /**
   * 设置字段的值
   * undefined 会重设为初始值，可使用 null 清空
   */
  setFieldValue: (name: string, value: any) => void;
  /** 重置表单 */
  resetFields: () => void;
  /** 校验字段 */
  validateField: (name: string, value?: any) => Promise<Fields>;
  /** 校验字段 */
  validateFields: (names?: string[]) => Promise<Fields>;
  /** 表单是否更改 */
  isFormChanged: () => boolean;
  /** 字段是否更改 */
  isFieldChanged: (name: string) => boolean;
  /** 字段是否更改 */
  isFieldTouched: (name: string) => boolean;
  /** 字段更改情况 */
  isFieldsTouched: () => boolean;
}
