import React from 'react';
import { useList } from '@szzj/hooks';
import { Button, Tag } from 'antd';

export default () => {
  const { list, setList } = useList({
    onChange: (newList) => alert(JSON.stringify(newList)),
    defaultList: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'],
  });

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Button onClick={() => setList(['hahaha'])}>全量修改</Button>
      </div>
      {list.map((item) => {
        return <Tag key={item}>{item}</Tag>;
      })}
    </div>
  );
};
