import React from 'react';
import { Form, Cascader } from '@szzj/antd-form';

const options = [
  {
    value: '浙江省',
    label: '浙江省',
    children: [
      {
        value: '杭州市',
        label: '杭州市',
        children: [
          {
            value: '西湖区',
            label: '西湖区',
          },
        ],
      },
    ],
  },
  {
    value: '江苏省',
    label: '江苏省',
    children: [
      {
        value: '南京市',
        label: '南京市',
        children: [
          {
            value: '中华门',
            label: '中华门',
          },
        ],
      },
    ],
  },
];

export default () => {
  return (
    <Form detail labelCol={3} initialValues={{ address: ['浙江省', '杭州市', '西湖区'] }}>
      <Cascader name="address" label="地址" options={options} />
    </Form>
  );
};
