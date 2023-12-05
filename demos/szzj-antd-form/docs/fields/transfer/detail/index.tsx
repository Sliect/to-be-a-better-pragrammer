import React from 'react';
import { Form, Transfer } from '@szzj/antd-form';

const mockData: any[] = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

export default () => {
  return (
    <Form detail labelCol={{ span: 3 }} initialValues={{ transfer: ['2', '3'] }}>
      <Transfer
        name="transfer"
        label="穿梭框"
        dataSource={mockData}
        render={(item) => item.title}
      />
    </Form>
  );
};
