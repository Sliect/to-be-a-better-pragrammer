import Input from '../Input';
import Radio from '../Radio';
import Checkbox from '../Checkbox';
import Select from '../Select';
import Cascader from '../Cascader';

export const DefaultFields: {
  [key: string]: React.ComponentType<any>;
} = {
  input: Input,
  radio: Radio.SingleRadio,
  checkbox: Checkbox.SingleCheckbox,
  select: Select,
  cascader: Cascader,
};
