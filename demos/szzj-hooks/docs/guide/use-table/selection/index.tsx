import React from 'react';
import { useTable } from '@szzj/hooks';
import { Table, Button } from 'antd';

export default () => {
  const { props, getSelectedRowKeys } = useTable(
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
      enableRowSelection: true,
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
      sorter: true,
    },
  ];

  const alertSelectedRowKeys = () => {
    alert(JSON.stringify(getSelectedRowKeys()));
  };

  return (
    <div>
      <Button type="primary" onClick={alertSelectedRowKeys} style={{ marginBottom: '10px' }}>
        选中项
      </Button>

      <Table columns={columns} {...props} rowKey="id" />
    </div>
  );
};
