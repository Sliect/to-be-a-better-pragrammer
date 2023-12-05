import React from 'react';
import { Form, InputNumber } from '@szzj/antd-form';

export default () => {
  return (
    <Form labelCol={{ span: 3 }}>
      <InputNumber name="amount" label="金额" min={1} max={10} defaultValue={3} />
    </Form>
  );
};
