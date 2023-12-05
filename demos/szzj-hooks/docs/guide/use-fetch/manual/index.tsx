import React from 'react';
import { useFetch } from '@szzj/hooks';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

interface Response<T> {
  success: boolean;
  data: T;
}

export default () => {
  const form = Form.useForm();
  const { loading, fetch: submit } = useFetch<any>(
    (data) => {
      return axios.post('/submit', data);
    },
    {
      manual: true,
    },
  );

  const handleSubmit = () => {
    form[0]
      .validateFields()
      .then((vals) => {
        submit(vals);
      })
      .catch(() => {});
  };

  return (
    <Form form={form[0]} layout="vertical">
      <Form.Item
        label="姓名"
        name="name"
        required
        rules={[
          {
            required: true,
            message: '姓名不能为空',
          },
        ]}
      >
        <Input placeholder="请输入姓名" />
      </Form.Item>

      <Button type="primary" loading={loading} onClick={handleSubmit}>
        提交
      </Button>
    </Form>
  );
};
