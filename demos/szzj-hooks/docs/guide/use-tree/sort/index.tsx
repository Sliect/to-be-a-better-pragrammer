import React from 'react';
import { Table, Tag } from 'antd';
import { useTree } from '@szzj/hooks';

import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const initialNodes: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default () => {
  const { treeNodes, exchange, up, down } = useTree(initialNodes, {
    uniqueKey: 'key',
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record, index) => {
        const downDisabled = index === treeNodes.length - 1;
        const upDisabled = !index;
        const disabled = index === treeNodes.length - 1;
        return (
          <div>
            <a
              onClick={downDisabled ? undefined : () => down(record)}
              style={downDisabled ? { color: '#ccc', marginRight: 5 } : { marginRight: 5 }}
            >
              下移
            </a>
            <a
              onClick={upDisabled ? undefined : () => up(record)}
              style={upDisabled ? { color: '#ccc', marginRight: 5 } : { marginRight: 5 }}
            >
              上移
            </a>
            <a
              onClick={
                disabled ? undefined : () => exchange(record, treeNodes[treeNodes.length - 1])
              }
              style={disabled ? { color: '#ccc' } : {}}
            >
              与第三项交换
            </a>
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={treeNodes} />;
};
