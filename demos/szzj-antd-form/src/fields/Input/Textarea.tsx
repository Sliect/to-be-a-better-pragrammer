import React from 'react';
import { Input as AntdInput } from 'antd';
import { getExtraProps, getRulesFromProps } from './utils';
import createField, { FieldWrapProps } from '../../createField';
import { useFormContext } from '../../contexts/FormContext';
import { useFieldContext } from '../../contexts/FieldContext';
import { TextAreaProps as AntdTextAreaProps } from 'antd/es/input';

export type TextAreaProps = AntdTextAreaProps & {
  valueType?: string;
};

const TextArea: React.FC<TextAreaProps> = ({ maxLength = 250, valueType, ...props }) => {
  const form = useFormContext()!;
  const { label } = useFieldContext()!;
  const extraProps = getExtraProps({ valueType, ...props }, form);

  return (
    <AntdInput.TextArea
      placeholder={`请输入${label}`}
      maxLength={maxLength}
      {...extraProps}
      {...props}
    />
  );
};

export default createField<TextAreaProps>(TextArea, {
  defaultDetailType: 'text',
  getFormItemPropsFromProps: (props: FieldWrapProps & TextAreaProps, form) => {
    return {
      rules: getRulesFromProps(props, form),
      style: props.formItemStyle
        ? {
            ...props.formItemStyle,
            visibility: !props.hidden ? 'inherit' : 'hidden',
          }
        : props.hidden
        ? {
            display: 'none',
          }
        : undefined,
    };
  },
});
