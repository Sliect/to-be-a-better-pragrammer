import React, { useRef } from 'react';
import { Button, Popconfirm } from 'antd';
import { Form, EditableTable } from '@szzj/antd-form';

import type { IEditableTableRef } from '@szzj/antd-form/es/types';

export default () => {
  const [form] = Form.useForm();
  const editableTableRef = useRef<IEditableTableRef<{ code?: string; sample?: string }>>(null);

  const columns = [
    {
      title: '名称',
      key: 'code',
      fieldType: 'input',
      required: true,
      uniqued: true,
    },
    {
      title: '示例',
      key: 'sample',
      width: 100,
      required: false,
      fieldType: 'input',
    },
    {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      width: 120,
      render(_: unknown, row: { code?: string; sample?: string }) {
        return [
          <a key="add" onClick={() => console.log(row)} style={{ marginRight: 5 }}>
            保存
          </a>,
          <Popconfirm
            key="remove"
            title="您确认删除吗？"
            onConfirm={() => editableTableRef.current?.removeItem(row)}
          >
            <a>删除</a>
          </Popconfirm>,
        ];
      },
    },
  ];

  return (
    <Form form={form}>
      <Button
        type="primary"
        onClick={() => {
          editableTableRef.current?.addItem();
        }}
        style={{ marginBottom: 10 }}
      >
        新增一行
      </Button>

      <EditableTable<{ code?: string; sample?: string }>
        form={form}
        name="fields"
        columns={columns}
        usingCustomActionColumn
        ref={editableTableRef}
        min={1}
        pagination={false}
      />
    </Form>
  );
};
