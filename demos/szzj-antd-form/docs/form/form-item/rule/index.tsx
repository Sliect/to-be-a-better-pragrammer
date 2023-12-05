import React from 'react';
import { Form, Select, Input } from '@szzj/antd-form';

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} labelCol={{ span: 3 }}>
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

      <Input
        name="fruit"
        label="水果"
        required={false}
        dynamicProps={[
          (form) => {
            const { sex } = form?.getFieldsValue() ?? {};
            console.log(sex);
            if (sex === 'male') return { rules: [{ required: true, message: '不能为空' }] };
          },
          ['sex'],
        ]}
      />
    </Form>
  );
};
