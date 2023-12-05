import React from 'react';
import { Input as AntdInput } from 'antd';
import { getExtraProps, getRulesFromProps } from './utils';
import createField, { FieldWrapProps } from '../../createField';
import { useFormContext } from '../../contexts/FormContext';
import { useFieldContext } from '../../contexts/FieldContext';
import { InputProps as AntdInputProps } from 'antd/es/input';

export type InputProps = AntdInputProps & {
  /** 字段校验 */
  valueType?: string;
};

const Input: React.FC<InputProps> = ({ maxLength = 30, valueType, ...props }) => {
  const form = useFormContext()!;
  const { label } = useFieldContext()!;
  const extraProps = getExtraProps({ valueType, ...props }, form);

  return (
    <AntdInput placeholder={`请输入${label}`} maxLength={maxLength} {...extraProps} {...props} />
  );
};

export default createField(Input, {
  defaultDetailType: 'text',
  getFormItemPropsFromProps: (props: FieldWrapProps & InputProps, form) => {
    return {
      rules: getRulesFromProps(props, form),
    };
  },
});
