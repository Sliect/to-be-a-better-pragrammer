import React from 'react';
import { Form, Input, Select, Switch } from '@szzj/antd-form';

export default () => {
  const form = Form.useForm()[0];

  return (
    <Form
      form={form}
      initialValues={{ required: true }}
      onValuesChange={(vals) => console.log(vals)}
    >
      <Input name="name" label="姓名" required />
      <Select
        name="sex"
        label="性别"
        options={[
          {
            label: '男',
            value: 'male',
          },
          {
            label: '女',
            value: 'female',
          },
        ]}
      />
      <Switch name="required" label="必填" />
    </Form>
  );
};
