import {
  Checkbox,
  Input,
  InputNumber,
  DatePicker,
  Radio,
  Select,
  Cascader,
  Switch,
  Upload,
} from '../../fields';
import { List } from '../fields';

export const Fields: {
  [key: string]: React.ComponentType<any>;
} = {
  input: Input,
  textarea: Input.Textarea,
  'input-number': InputNumber,
  radio: Radio,
  checkbox: Checkbox,
  select: Select,
  cascader: Cascader,
  'date-picker': DatePicker,
  'range-picker': DatePicker.RangePicker,
  switch: Switch,
  upload: Upload,
  list: List,
};

/**
 * 获取全量的表单控件
 */
export const getFields = () => {
  return Fields;
};

/**
 * 获取表单控件
 * @param type
 */
export const getField = (type: string) => {
  return Fields[type];
};

/**
 * 注册表单控件
 * @param type
 * @param Field
 */
export const registerField = (type: string, Field: React.ComponentType<any>) => {
  Fields[type] = Field;
};

/**
 * 撤销表单控件
 * @param type
 * @param Field
 */
export const unregisterField = (type: string, Field: React.ComponentType<any>) => {
  delete Fields[type];
};
