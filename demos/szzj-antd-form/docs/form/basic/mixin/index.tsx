import React, { Fragment } from 'react';
import { Form, Input, Select } from '@szzj/antd-form';

export default () => {
  const form = Form.useForm()[0];

  return (
    <Form form={form} initialValues={{ sex: 'male' }}>
      <Input name="name" label="姓名" required />
      <Select
        detail
        name="sex"
        label="性别"
        options={[
          {
            label: '男',
            value: 'male',
          },
          {
            label: '女',
            value: 'female',
          },
        ]}
      />
    </Form>
  );
};
