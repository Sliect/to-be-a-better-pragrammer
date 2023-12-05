import React, { useRef } from 'react';
import { Button } from 'antd';
import { Form, EditableTable } from '@szzj/antd-form';

import type { IEditableTableRef } from '@szzj/antd-form/es/types';

export default () => {
  const [form] = Form.useForm();
  const editableTableRef = useRef<IEditableTableRef<any>>(null);

  const columns = [
    {
      title: '参数名称',
      key: 'code',
      fieldType: 'input',
      required: true,
      uniqued: true,
    },
    {
      title: '是否列表',
      key: 'isArray',
      width: 88,
      required: false,
      fieldType: 'checkbox',
    },
    {
      title: '参数类型',
      key: 'typeId',
      width: 130,
      required: false,
      fieldType: 'select',
      fieldProps: {
        options: [
          {
            value: '0',
            label: 'char',
          },
          {
            value: '12',
            label: 'struct',
          },
        ],
      },
    },
    {
      title: '示例',
      key: 'sample',
      required: false,
      fieldType: 'input',
    },
    {
      title: '中文名称',
      key: 'name',
      fieldType: 'input',
      required: true,
      uniqued: true,
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
        name="responseParams"
        columns={columns}
        rowExpandable={(row) => row.typeId === '12'}
        ref={editableTableRef}
        expandable={{
          defaultExpandAllRows: true,
        }}
        rowExpandAutoAdd
        rowExpandMin={1}
        min={1}
        dragable
        validateRow={(row) => {
          if (row.typeId === '12' && (!row.children || !row.children.length)) {
            throw new Error('Struct 结构须填写子节点');
          }
        }}
      />
    </Form>
  );
};
