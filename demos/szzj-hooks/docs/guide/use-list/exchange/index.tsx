import React from 'react';
import { useList } from '@szzj/hooks';
import { Button, Tag } from 'antd';

export default () => {
  const { list, exchange } = useList({
    defaultList: ['item 1', 'item 2', 'item 3'],
  });

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Button onClick={() => exchange(0, 2)}>首项和尾项换位</Button>
      </div>
      {list.map((item) => {
        return <Tag key={item}>{item}</Tag>;
      })}
    </div>
  );
};
