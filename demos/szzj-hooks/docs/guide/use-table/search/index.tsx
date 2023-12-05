import React, { useState } from 'react';
import { useTable } from '@szzj/hooks';
import { Table, Input, Button } from 'antd';

export default () => {
  const [name, setName] = useState('');
  const { params, props, search, research, reset } = useTable(
    (params) => {
      const { name } = params || {};
      const list = [];

      for (let i = 0; i < 60; i++) {
        list[i] = {
          id: i,
          name: `name_${i}`,
        };
      }

      return Promise.resolve({
        success: true,
        data: name ? list.filter((item) => item.name.indexOf(name) !== -1) : list,
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
      sorter: true,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Input
          placeholder="请输入名称搜索"
          style={{ marginRight: '10px', width: '40%' }}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            search({
              name,
            });
          }}
        >
          搜索
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: 10 }}
          onClick={() => {
            research({});
          }}
        >
          重新搜索
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          onClick={() => {
            reset();
          }}
        >
          重置
        </Button>
      </div>
      <code>查询参数：{JSON.stringify(params)}</code>
      <Table
        columns={columns}
        {...props}
        pagination={{ ...props.pagination, showSizeChanger: true, showQuickJumper: true }}
        rowKey="id"
      />
    </div>
  );
};
