import React from 'react';
import { Tag } from 'antd';
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

const leftTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
  {
    dataIndex: 'tag',
    title: 'Tag',
    render: (tag) => <Tag>{tag}</Tag>,
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
];

export default () => {
  return (
    <Form labelCol={{ span: 3 }}>
      <Transfer.TableTransfer
        name="transfer"
        label="穿梭框"
        dataSource={mockData}
        render={(item) => item.title}
        onChange={(...args) => console.log(...args)}
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
    </Form>
  );
};
