import { Table, Form, Input, Row, Col, Select } from 'antd';
import { useStillness } from 'umi';
import { useEffect, useState } from 'react';

const defaultData = [
  {
    name: '大王',
    age: 18,
    sex: '1',
    sexFont: '女',
  },
  {
    name: '小赵',
    age: 19,
    sex: '0',
    sexFont: '男',
  },
  {
    name: '阿陈',
    age: 28,
    sex: '0',
    sexFont: '男',
  },
  {
    name: '蔡蔡',
    age: 23,
    sex: '1',
    sexFont: '女',
  },
  {
    name: '梅梅',
    age: 24,
    sex: '1',
    sexFont: '女',
  },
];

export default function TableList() {
  const collected = useStillness({
    mounted: (contract) => {
      console.log(contract);
      return 'mounted';
    },
    unmounted: (contract) => {
      console.log(contract);
      return 'unmounted';
    },
    collect: (contract) => {
      return {
        isStillness: contract.isStillness(),
        stillnessId: contract.getStillnessId(),
        item: contract.getStillnessItem(),
      };
    },
  });

  useEffect(() => {
    console.log(collected);
  }, [collected]);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sexFont',
    },
  ];

  const [dataSource, setDataSource] = useState(defaultData);

  return (
    <>
      <Form>
        <Row gutter={5}>
          <Col span={8}>
            <Form.Item label="姓名" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="性别" name="sex">
              <Select>
                <Select.Option value={'0'}>男</Select.Option>
                <Select.Option value={'1'}>女</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
}
