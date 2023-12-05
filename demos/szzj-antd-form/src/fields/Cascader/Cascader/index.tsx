import React from 'react';
import { Cascader as AntdCascader } from 'antd';
import createField from '../../../createField';
import { useFieldContext } from '../../../contexts/FieldContext';
import { CascaderProps } from 'antd/es/cascader';

const Cascader: React.FC<CascaderProps> = ({ children, ...props }) => {
  const { label } = useFieldContext()!;

  return (
    <AntdCascader placeholder={`请选择${label || ''}`} {...props}>
      {children}
    </AntdCascader>
  );
};

export default createField<CascaderProps>(Cascader);
