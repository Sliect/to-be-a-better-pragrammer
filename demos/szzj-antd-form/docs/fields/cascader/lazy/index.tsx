import React from 'react';
import { Form, Cascader } from '@szzj/antd-form';

const fetch = (node) => {
  if (!node) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        resolve([
          {
            value: '浙江省',
            label: '浙江省',
            isLeaf: false,
          },
          {
            value: '江苏省',
            label: '江苏省',
            isLeaf: false,
          },
        ]);
        clearTimeout(timer);
      }, 1000);
    });
  } else {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        resolve(
          node.label === '浙江省'
            ? [
                {
                  value: '杭州市',
                  label: '杭州市',
                  isLeaf: true,
                },
                {
                  value: '宁波市',
                  label: '宁波市',
                  isLeaf: true,
                },
              ]
            : [
                {
                  value: '南京市',
                  label: '南京市',
                  isLeaf: true,
                },
              ],
        );
        clearTimeout(timer);
      }, 1000);
    });
  }
};

export default () => {
  return (
    <div>
      <Form labelCol={{ span: 3 }} onValuesChange={(vals) => console.log(vals)}>
        <Cascader.LazyCascader name="address" label="地址" fetch={fetch} />
        <Cascader.LazyCascader
          name="address2"
          label="地址2"
          fetch={fetch}
          initialValue={[
            { label: '浙江省', value: '浙江省' },
            { label: '杭州市', value: '杭州市' },
          ]}
        />
      </Form>
      <Form detail labelCol={{ span: 3 }}>
        <Cascader.LazyCascader
          name="address"
          label="地址"
          fetch={fetch}
          initialValue={[
            { label: '浙江省', value: '浙江省' },
            { label: '杭州市', value: '杭州市' },
          ]}
        />
      </Form>
    </div>
  );
};
