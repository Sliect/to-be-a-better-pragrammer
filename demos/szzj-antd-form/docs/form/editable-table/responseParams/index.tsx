import React from 'react';
import { Form, EditableTable } from '@szzj/antd-form';

export default () => {
  const [form] = Form.useForm();
  const columns = [
    {
      title: '',
      key: 'flag',
      fieldType: 'checkbox',
      width: 54,
      required: false,
      changeWithChildrenValue: true,
      onChange: (fieldName, value, { setParentValue, getSameLevelValues }) => {
        const sameLevelFlags = getSameLevelValues('flag') || [];
        if (!!value || (!value && sameLevelFlags.every((flag) => !flag)))
          setParentValue('flag', value);
      },
    },
    {
      title: '参数名称',
      key: 'code',
      width: 200,
    },
    {
      title: '是否列表',
      key: 'isArray',
      width: 88,
      render: (e: any) => (e ? '是' : '否'),
    },
    {
      title: '参数类型',
      key: 'typeName',
      width: 100,
    },
    {
      title: '示例',
      key: 'sample',
      ellipsis: true,
      width: 150,
    },
    {
      title: '中文名称',
      key: 'name',
      width: 120,
      ellipsis: true,
    },
  ];

  return (
    <Form
      form={form}
      initialValues={{
        eapiResStructParam: [
          {
            flag: true,
            code: 'a',
            typeName: 'Struct',
            typeId: '12',
            name: 'a',
            children: [
              { flag: true, code: 'a-1', typeName: 'char', typeId: '1', name: 'a-1' },
              { flag: true, code: 'a-2', typeName: 'char', typeId: '1', name: 'a-2' },
            ],
          },
        ],
      }}
    >
      <EditableTable
        form={form}
        name="eapiResStructParam"
        columns={columns}
        rowExpandable={(row) => row.typeId === '12'}
        expandable={{
          defaultExpandAllRows: true,
        }}
        addable={false}
        rules={[
          {
            validator: async (rule, value) => {
              if (value.every((it) => !it.flag)) {
                throw new Error('请选择出参');
              }
            },
          },
        ]}
      />
    </Form>
  );
};
