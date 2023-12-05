import React from 'react';
import { Form, AutoComplete } from '@szzj/antd-form';

const options = [
  {
    label: '杭州市西湖区大光明路1号',
    value: '杭州市西湖区大光明路1号',
  },
  {
    label: '杭州市西湖区紫金花路142号',
    value: '杭州市西湖区紫金花路142号',
  },
];

export default () => {
  return (
    <Form detail labelCol={{ span: 3 }} initialValues={{ address: '杭州市西湖区高教路411号' }}>
      <AutoComplete label="收货地址" name="address" options={options} />
    </Form>
  );
};
