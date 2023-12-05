import React from 'react';
import { useList } from '@szzj/hooks';
import { Button, Tag } from 'antd';

export default () => {
  const { list, edit } = useList({
    defaultList: ['item 1', 'item 2', 'item 3'],
  });

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Button
          onClick={() => edit((it) => it === 'item 1', 'item first')}
          style={{ marginRight: '5px' }}
        >
          编辑
        </Button>
      </div>
      {list.map((item) => {
        return <Tag key={item}>{item}</Tag>;
      })}
    </div>
  );
};
