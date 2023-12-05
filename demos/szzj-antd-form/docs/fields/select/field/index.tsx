import React from 'react';
import { Form, Select } from '@szzj/antd-form';

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
    </Form>
  );
};
