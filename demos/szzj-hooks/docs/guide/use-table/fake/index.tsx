import React from 'react';
import { useTable } from '@szzj/hooks';
import { Table } from 'antd';

export default () => {
  const { props } = useTable(
    () => {
      const list = [];

      for (let i = 0; i < 60; i++) {
        list[i] = {
          id: i,
          name: `name_${i}`,
        };
      }

      return Promise.resolve({
        success: true,
        data: list,
      });
    },
    {
      enableFakePagination: true,
    },
  );

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <Table
      columns={columns}
      {...props}
      pagination={{ ...props.pagination, showSizeChanger: true, showQuickJumper: true }}
      rowKey="id"
    />
  );
};
