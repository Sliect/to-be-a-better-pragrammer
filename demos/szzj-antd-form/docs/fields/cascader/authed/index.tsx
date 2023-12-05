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
          {
            value: '滨江区',
            label: '滨江区',
          },
        ],
      },
      {
        value: '宁波市',
        label: '宁波市',
        children: [
          {
            value: '海曙区',
            label: '海曙区',
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
    <Form labelCol={{ span: 3 }}>
      <Cascader.AuthedCascader
        name="address"
        label="地址"
        options={options}
        authedBy={['浙江省', '杭州市']}
      />
    </Form>
  );
};
