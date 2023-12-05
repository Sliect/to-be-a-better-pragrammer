import React from 'react';
import { useList } from '@szzj/hooks';
import { Button, Tag } from 'antd';

export default () => {
  const { list, add, remove } = useList({
    defaultList: ['item 1', 'item 2', 'item 3'],
  });

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Button onClick={() => add(`item ${list.length + 1}`)} style={{ marginRight: '5px' }}>
          添加
        </Button>
        <Button onClick={() => remove(0)}>删除首项</Button>
      </div>
      {list.map((item) => {
        return <Tag key={item}>{item}</Tag>;
      })}
    </div>
  );
};
