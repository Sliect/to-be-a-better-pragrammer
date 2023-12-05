import React from 'react';
import { Form, Switch } from '@szzj/antd-form';

export default () => {
  return (
    <Form detail labelCol={{ span: 3 }} initialValues={{ switch: true }}>
      <Switch name="switch" />
    </Form>
  );
};
