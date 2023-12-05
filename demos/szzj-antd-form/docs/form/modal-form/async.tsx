import React, { Fragment, useEffect } from 'react';
import { Button } from 'antd';
import { useModal } from '@szzj/hooks';
import { Form, ModalForm, Input } from '@szzj/antd-form';

export default () => {
  const [form] = Form.useForm();
  const modal = useModal();

  useEffect(() => {
    if (modal.visible) {
      const timer = setTimeout(() => {
        form.setFieldsValue({
          name: '史泰龙',
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [modal.visible]);

  return (
    <Fragment>
      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={() => modal.show({ name: 'test' })}
      >
        编辑
      </Button>

      <ModalForm
        title="新建"
        form={form}
        {...modal.props}
        format={(dataSource) => ({})}
        onOk={(vals) => {
          console.log('vals', vals);
        }}
      >
        <Input name="name" label="姓名" required />
      </ModalForm>
    </Fragment>
  );
};
