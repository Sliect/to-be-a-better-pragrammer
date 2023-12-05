import React from 'react';
import { Form, InputNumber } from '@szzj/antd-form';

export default () => {
  return (
    <Form detail labelCol={{ span: 3 }} initialValues={{ amount: '2020' }}>
      <InputNumber name="amount" label="金额" />
    </Form>
  );
};
