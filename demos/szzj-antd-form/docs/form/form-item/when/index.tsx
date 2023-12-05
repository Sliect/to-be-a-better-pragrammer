import React from 'react';
import { Form, Select, Input } from '@szzj/antd-form';

export default () => {
  return (
    <Form labelCol={{ span: 3 }}>
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

      <Input name="fruit" label="水果" when={[(vals) => vals.sex === 'male', ['sex']]} />
    </Form>
  );
};
