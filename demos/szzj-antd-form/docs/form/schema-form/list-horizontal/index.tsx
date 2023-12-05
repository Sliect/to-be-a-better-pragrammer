import React from 'react';
import { SchemaForm } from '@szzj/antd-form';

export default () => {
  return (
    <SchemaForm
      layout="horizontal"
      fields={[
        {
          fieldType: 'list',
          name: 'users',
          label: '联系人',
          fields: [
            {
              fieldType: 'input',
              name: 'name',
              label: '姓名',
            },
            {
              fieldType: 'date-picker',
              name: 'date',
              label: '时间',
            },
          ],
          initialValue: [{}],
        },
      ]}
      wrapperCol={{
        xs: { span: 24 },
        sm: { span: 18 },
        xxl: { span: 18 },
      }}
      labelCol={{
        xs: { span: 24 },
        sm: { span: 6 },
        xxl: { span: 6 },
      }}
      onSubmit={(vals) => console.log(vals)}
    />
  );
};
