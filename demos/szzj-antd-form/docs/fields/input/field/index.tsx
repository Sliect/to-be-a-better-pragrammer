import React from 'react';
import { Form, Input } from '@szzj/antd-form';

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} labelCol={{ span: 3 }} initialValues={{ id: 111 }}>
      <Input name="name" label="姓名" />
      <Input.Password name="password" label="密码" />
      <Input.Textarea
        name="description"
        label="描述"
        required
        rules={[{ required: true, message: 'texxxtarea' }]}
      />
      <Input name="id" hidden />
    </Form>
  );
};
