import React from 'react';
import { Form, Slider } from '@szzj/antd-form';

export default () => {
  return (
    <Form labelCol={{ span: 3 }}>
      <Slider defaultValue={30} />
    </Form>
  );
};
