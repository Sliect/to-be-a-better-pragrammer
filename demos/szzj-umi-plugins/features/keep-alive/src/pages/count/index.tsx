import { useLayoutEffect, useState } from 'react';
import { Button, Space } from 'antd';

function Index() {
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    console.log('layouting');
  }, []);

  return (
    <div>
      <Space>
        <Button onClick={() => setCount(count + 1)} type="primary">
          +
        </Button>
        <Button onClick={() => setCount(count - 1)}>-</Button>
      </Space>
      <div>计数：{count}</div>
    </div>
  );
}

export default Index;
