import React from 'react';
import { Form, Slider } from '@szzj/antd-form';

export default () => {
  return (
    <Form detail labelCol={{ span: 3 }} initialValues={{ rate: 30 }}>
      <Slider name="rate" />
    </Form>
  );
};
