import React from 'react';
import { Form, Rate } from '@szzj/antd-form';

export default () => {
  return (
    <Form detail labelCol={{ span: 3 }} initialValues={{ rate: 3 }}>
      <Rate name="rate" />
    </Form>
  );
};
