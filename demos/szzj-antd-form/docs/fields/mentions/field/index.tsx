import React from 'react';
import { Form, Mentions } from '@szzj/antd-form';

export default () => {
  return (
    <Form labelCol={{ span: 3 }}>
      <Mentions
        options={[
          {
            label: 'author',
            value: 'author',
          },
        ]}
      />
    </Form>
  );
};
