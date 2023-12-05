import React, { useState } from 'react';
import { useTable } from '@szzj/hooks';
import axios from 'axios';
import { Table } from 'antd';

export default () => {
  const [name, setName] = useState('');
  const { props, search } = useTable((params) => {
    return axios.get('/getList.json', { params }).then((res) => {
      if (res && res.success) {
        return res.data;
      } else {
        return [];
      }
    });
  });

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'name_1', value: 'name_1' },
        { text: 'name_2', value: 'name_2' },
      ],
    },
  ];

  return <Table columns={columns} {...props} rowKey="id" />;
};
