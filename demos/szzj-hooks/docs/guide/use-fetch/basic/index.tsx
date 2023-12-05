import React from 'react';
import { useFetch } from '@szzj/hooks';
import axios from 'axios';
import { Table } from 'antd';

interface Response<T> {
  success: boolean;
  data: T;
}

export default () => {
  const { loading, data = [] } = useFetch<any[]>(() => {
    return axios.get<any, Response<any[]>>('/getList.json').then((res) => {
      if (res && res.success) {
        return res.data;
      } else {
        return [];
      }
    });
  });
  const columns = [
    {
      title: '姓名',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '身份证号',
      key: 'idCard',
      dataIndex: 'idCard',
    },
    {
      title: '手机号',
      key: 'phone',
      dataIndex: 'phone',
    },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} />;
};
