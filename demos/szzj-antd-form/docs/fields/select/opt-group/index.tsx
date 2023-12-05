import React from 'react';
import { Form, Select } from '@szzj/antd-form';

export default function OptGroupDemo() {
  return (
    <Form labelCol={{ span: 3 }}>
      <Select
        name="sex"
        label="性别"
        initialValue="lucy"
        options={[
          {
            label: 'Manager',
            options: [
              { label: 'Jack', value: 'jack' },
              { label: 'Lucy', value: 'lucy' },
            ],
          },
          {
            label: 'Engineer',
            options: [{ label: 'yiminghe', value: 'Yiminghe' }],
          },
        ]}
      />
    </Form>
  );
}
