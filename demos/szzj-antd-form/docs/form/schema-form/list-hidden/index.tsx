import React from 'react';
import { SchemaForm } from '@szzj/antd-form';

export default () => {
  return (
    <SchemaForm
      fields={[
        {
          fieldType: 'select',
          name: 'year',
          label: '年份',
          options: [
            { label: '2023', value: '2023' },
            { label: '2022', value: '2022' },
          ],
        },
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
          min: 1,
          max: 3,
          when: [(vals) => vals.year === '2023', ['year']],
        },
      ]}
      onSubmit={(vals) => console.log(vals)}
    />
  );
};
