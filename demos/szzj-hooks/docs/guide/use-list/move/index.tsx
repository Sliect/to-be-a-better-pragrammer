import React from 'react';
import { useList } from '@szzj/hooks';
import { Button, Tag } from 'antd';

export default () => {
  const { list, move } = useList({
    defaultList: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'],
  });

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Button onClick={() => move(0, 3)} style={{ marginRight: '5px' }}>
          首项下移至倒数第二项
        </Button>
        <Button onClick={() => move(4, 1)}>尾项上移至第二项</Button>
      </div>
      {list.map((item) => {
        return <Tag key={item}>{item}</Tag>;
      })}
    </div>
  );
};
