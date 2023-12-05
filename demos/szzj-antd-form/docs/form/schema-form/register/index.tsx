import React from 'react';
import { SchemaForm } from '@szzj/antd-form';
import Title from './Title';

SchemaForm.registerField('title', Title);

export default () => {
  return (
    <>
      <SchemaForm
        fields={[
          {
            fieldType: 'input',
            name: 'name',
            label: '姓名',
          },
          {
            fieldType: 'title',
            name: 'title1',
            title: '标题',
            when: [(vals) => vals.name === 'test', ['name']],
          },
          {
            fieldType: 'title',
            name: 'title2',
            title: '联动标题',
            when: [(vals) => vals.name === 'test', ['name']],
          },
        ]}
        layout="vertical"
      />
    </>
  );
};
