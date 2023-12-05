import React from 'react';
import { Form, List, Input, Checkbox } from '@szzj/antd-form';

export default () => {
  const form = Form.useForm()[0];
  return (
    <Form labelCol={{ span: 3 }} form={form}>
      <List name="list" label="列表">
        <Input name="name" label="姓名" />
        <Checkbox
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
      </List>
    </Form>
  );
};
