import React from 'react';
import { Form, Transfer } from '@szzj/antd-form';

const treeData = [
  { key: '0-0', title: '0-0' },
  {
    key: '0-1',
    title: '0-1',
    children: [
      { key: '0-1-0', title: '0-1-0' },
      { key: '0-1-1', title: '0-1-1' },
    ],
  },
  { key: '0-2', title: '0-3' },
];

export default () => {
  return (
    <Form labelCol={{ span: 3 }}>
      <Transfer.TreeTransfer
        name="transfer"
        label="穿梭框"
        dataSource={treeData}
        render={(item) => item.title}
        onChange={(...args) => console.log(...args)}
      />
    </Form>
  );
};
