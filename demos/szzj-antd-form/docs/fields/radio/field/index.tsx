import React from 'react';
import { Form, Radio } from '@szzj/antd-form';

const options = [
  {
    label: '男',
    value: 'male',
  },
  {
    label: '女',
    value: 'female',
  },
];

export default () => {
  return (
    <Form labelCol={{ span: 3 }}>
      <Radio name="sex" label="性别" options={options} />
      <Radio name="vertial" label="垂直" options={options} vertical />
    </Form>
  );
};
