import React, { useEffect } from 'react';
import { useForm } from '@szzj/hooks';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

const CustomInput = ({ name, rules, defaultValue, form, ...rest }) => {
  useEffect(() => {
    return form.registerField(name, {
      initialValue: defaultValue,
      rules,
    });
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    form.setFieldValue(name, value);
    form.validateField(name, value);
  };

  return <Input onChange={handleChange} {...rest} />;
};

export default () => {
  const form = useForm();
  const { validateFields, getFieldError } = form;

  const handleSubmit = () => {
    validateFields()
      .then((vals) => {
        console.log(vals);
      })
      .catch(() => {});
  };

  const errs = getFieldError('name');

  return (
    <Form layout="vertical">
      <Form.Item
        label="姓名"
        help={errs ? errs.join(',') : undefined}
        validateStatus={errs ? 'error' : undefined}
      >
        <CustomInput
          form={form}
          name="name"
          rules={[
            {
              required: true,
              message: '姓名不能为空',
            },
          ]}
          placeholder="请输入姓名"
        />
      </Form.Item>

      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </Form>
  );
};
