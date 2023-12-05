import React from 'react';
import { Input as AntdInput } from 'antd';
import { PasswordProps } from 'antd/es/input';
import createField from '../../createField';
import { useFieldContext } from '../../contexts/FieldContext';

const Password: React.FC<PasswordProps> = (props) => {
  const { label } = useFieldContext()!;

  return <AntdInput.Password placeholder={`请输入${label}`} {...props} />;
};

export default createField<PasswordProps>(Password);
