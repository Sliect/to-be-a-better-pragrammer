import React from 'react';
import { InputNumber as AntdInputNumber } from 'antd';
import createField from '../../createField';
import { InputNumberProps } from 'antd/es/input-number';

const InputNumber: React.FC<InputNumberProps> = (props) => {
  return <AntdInputNumber {...props}></AntdInputNumber>;
};

export default createField(InputNumber);
