import React, { useRef, useCallback } from 'react';
import { useFullScreen } from '@szzj/hooks';
import { Button } from 'antd';

export default () => {
  const [isFullScreen, toggle] = useFullScreen();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    if (containerRef.current) toggle(containerRef.current);
  }, []);

  return (
    <>
      <>
        <Button onClick={handleClick}>切换全屏</Button>
      </>
      <div ref={containerRef} style={{ backgroundColor: 'white', padding: '40px' }}>
        全屏{isFullScreen ? '展示中' : '关闭中'}
      </div>
    </>
  );
};
