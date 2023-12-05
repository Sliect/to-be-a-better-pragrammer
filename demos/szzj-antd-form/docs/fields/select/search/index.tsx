import React, { useCallback } from 'react';
import { Form, Select } from '@szzj/antd-form';

export default () => {
  const query = useCallback((val: string): Promise<Array<{ label: string; value: string }>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            label: val,
            value: val,
          },
        ]);
      }, 100);
    });
  }, []);

  return (
    <Form labelCol={{ span: 3 }}>
      <Select name="sex" label="性别" options={query} searchable={true} />
    </Form>
  );
};
