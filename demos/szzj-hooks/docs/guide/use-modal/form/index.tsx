import React from 'react';
import { useModal } from '@szzj/hooks';
import { Button, Modal, Form, Input } from 'antd';

export default () => {
  const form = Form.useForm()[0];
  const { visible, show, hide } = useModal<{ name: string }>({
    form,
  });

  const handleClick = () => {
    show({
      name: 'test',
    });
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((vals) => {
        console.log(vals);
      })
      .catch(() => {});
  };

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        打开弹窗
      </Button>
      <Modal title="我是一个弹窗" visible={visible} onCancel={hide} onOk={handleSubmit}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="姓名"
            rules={[
              {
                required: true,
                message: '姓名不能为空',
              },
            ]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
