import React from 'react';
import { Form, InputNumber } from '@szzj/antd-form';

export default () => {
  const form = Form.useForm()[0];
  return (
    <Form form={form} labelCol={{ span: 3 }}>
      <InputNumber
        name="min"
        label="最小值"
        required
        rules={[
          {
            lessThen: 'max',
          },
        ]}
      />
      <InputNumber
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
