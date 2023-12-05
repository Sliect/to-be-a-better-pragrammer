import React from 'react';
import { Form, Input } from '@szzj/antd-form';

export default () => {
  return (
    <Form
      detail
      labelCol={{ span: 3 }}
      initialValues={{
        name: 'test123',
        password: '123456',
        description:
          '居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左居左',
      }}
    >
      <Input name="name" label="姓名" />
      <Input.Password name="password" label="密码" />
      <Input.Textarea name="description" label="描述" />
    </Form>
  );
};
