import React from 'react';
import { Form, Input } from '@szzj/antd-form';

export default () => {
  const form = Form.useForm()[0];
  return (
    <Form form={form} labelCol={{ span: 3 }}>
      <Input
        name="min"
        label="最小值"
        required
        rules={[
          {
            lessThen: 'max',
          },
        ]}
      />
      <Input
        name="max"
        label="最大值"
        required
        rules={[
          {
            greaterThen: 'min',
          },
        ]}
      />
    </Form>
  );
};
