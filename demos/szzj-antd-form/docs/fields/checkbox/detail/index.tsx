import React from 'react';
import { Form, Checkbox } from '@szzj/antd-form';

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
    <Form detail labelCol={{ span: 3 }} initialValues={{ sex: 'male' }}>
      <Checkbox name="sex" label="性别" options={options} />
    </Form>
  );
};
