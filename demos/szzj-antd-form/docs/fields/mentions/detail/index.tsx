import React from 'react';
import { Form, Mentions } from '@szzj/antd-form';

export default () => {
  return (
    <Form detail labelCol={{ span: 3 }} initialValues={{ author: 'author1' }}>
      <Mentions
        name="author"
        options={[
          {
            label: 'author1',
            value: 'author1',
          },
        ]}
      />
    </Form>
  );
};
