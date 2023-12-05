import React, { useRef } from 'react';
import { Button } from 'antd';
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
  ];

  return (
    <Form form={form}>
      <Button
        type="primary"
        onClick={() => {
          if (editableTableRef.current) editableTableRef.current.addItem();
        }}
        style={{ marginBottom: 10 }}
      >
        新增一行
      </Button>

      <EditableTable
        form={form}
        name="fields"
        columns={columns}
        ref={editableTableRef}
        min={1}
        pagination={false}
      />
    </Form>
  );
};
