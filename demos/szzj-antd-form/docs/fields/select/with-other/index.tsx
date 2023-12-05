import React from 'react';
import { Form, Select } from '@szzj/antd-form';

const options = [
  {
    label: '橘子',
    value: '橘子',
  },
  {
    label: '苹果',
    value: '苹果',
  },
];

export default () => {
  return (
    <Form labelCol={{ span: 3 }}>
      <Select.SelectWithOther name="fruit1" label="最喜欢的水果" options={options} />
      <Select.SelectWithOther
        name="fruit2"
        label="最喜欢的水果2"
        options={options}
        initialValue={'香蕉'}
      />
    </Form>
  );
};
