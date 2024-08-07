import React, { useEffect } from 'react';
import { Form, TreeSelect } from '@szzj/antd-form';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

export default () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      treeselect: '0-1-2',
    });
  }, []);

  return (
    <Form form={form} labelCol={{ span: 3 }}>
      <TreeSelect name="treeselect" label="树选择" treeData={treeData} />
    </Form>
  );
};
