import React from 'react';
import { SchemaForm, Input } from '@szzj/antd-form';

export default () => {
  return (
    <SchemaForm
      fields={[
        {
          fieldType: 'select',
          name: 'sex',
          label: '性别',
          options: [
            {
              label: '男',
              value: 'male',
            },
            {
              label: '女',
              value: 'female',
            },
          ],
        },
        {
          fieldType: 'input',
          name: 'name',
          label: '姓名',
          when: [(vals) => vals.sex === 'male', ['sex']],
        },
        {
          fieldType: 'date-picker',
          name: 'date',
          label: '时间',
        },
      ]}
    />
  );
};
