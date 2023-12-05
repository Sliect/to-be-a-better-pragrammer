import React, { useEffect, useState } from 'react';
import { useForm } from '@szzj/hooks';
import { Form, Input, Button } from 'antd';

export default () => {
  const [ageVisible, setAgeVisible] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => setAgeVisible(false), 30000);
  // }, []);

  const form = useForm();
  const { getFieldDecorator, validateFields, getFieldError } = form;

  const handleSubmit = () => {
    validateFields()
      .then((vals) => {
        console.log(vals);
      })
      .catch(() => {});
  };

  return (
    <Form layout="vertical">
      <Form.Item
        required
        label="姓名"
        help={getFieldError('name') ? getFieldError('name')?.join(',') : undefined}
        validateStatus={getFieldError('name') ? 'error' : undefined}
      >
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '姓名不能为空',
            },
          ],
        })(<Input placeholder="请输入姓名" />)}
      </Form.Item>

      {ageVisible && (
        <Form.Item
          required
          label="年龄"
          help={getFieldError('age') ? getFieldError('age')?.join(',') : undefined}
          validateStatus={getFieldError('age') ? 'error' : undefined}
        >
          {getFieldDecorator('age', {
            rules: [
              {
                required: true,
                message: '年龄不能为空',
              },
            ],
          })(<Input placeholder="请输入年龄" />)}
        </Form.Item>
      )}

      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </Form>
  );
};
