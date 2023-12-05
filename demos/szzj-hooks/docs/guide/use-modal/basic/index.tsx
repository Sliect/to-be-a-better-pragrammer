import React from 'react';
import { useModal } from '@szzj/hooks';
import { Button, Modal } from 'antd';

export default () => {
  const { visible, show, hide, dataSource } = useModal<{ title: string }>();

  const handleClick = () => {
    show({
      title: 'test title',
    });
  };

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        打开弹窗
      </Button>
      <Modal
        title={dataSource ? dataSource.title : undefined}
        visible={visible}
        onCancel={() => hide()}
      >
        我是一个弹窗
      </Modal>
    </div>
  );
};
