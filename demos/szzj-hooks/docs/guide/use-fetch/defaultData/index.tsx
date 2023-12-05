import React from 'react';
import { useFetch } from '@szzj/hooks';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

export default () => {
  const form = Form.useForm();
  const {
    loading,
    data,
    fetch: submit,
  } = useFetch<any>(
    (params) => {
      return axios.post('/submit', params);
    },
    {
      manual: true,
      useData: true,
      defaultData: {},
    },
  );

  const { fetch: submitTest } = useFetch<any>(
    (params) => {
      return axios.post('/submit', params).then((res) => {
        //此处可进行一些数据处理操作
        return res;
      });
    },
    {
      manual: true,
    },
  );

  const handleSubmit = () => {
    form[0]
      .validateFields()
      .then((result) => {
        submit(result); //此处成功返回的则是res.data,失败返回的是默认值defaultData
        // submitTest(result);//不使用defaultData则可使用then进行操作
      })
      .catch(() => {});
  };

  return (
    <Form form={form[0]} layout="vertical">
      <Form.Item
        label="年龄"
        name="age"
        required
        rules={[
          {
            required: true,
            message: '年龄不能为空',
          },
        ]}
      >
        <Input placeholder="请输入年龄" />
      </Form.Item>

      <Button type="primary" loading={loading} onClick={handleSubmit}>
        提交
      </Button>
    </Form>
  );
};
