import React, { Fragment, useEffect } from 'react';
import { Button } from 'antd';
import { useModal } from '@szzj/hooks';
import { Form, DrawerForm, Input } from '@szzj/antd-form';

export default () => {
  const [form] = Form.useForm();
  const drawer = useModal();

  useEffect(() => {
    if (drawer.visible) {
      const timer = setTimeout(() => {
        form.setFieldsValue({
          name: '史泰龙',
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [drawer.visible]);

  return (
    <Fragment>
      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={() => drawer.show({ name: 'test' })}
      >
        编辑
      </Button>

      <DrawerForm
        title="新建"
        form={form}
        {...drawer.props}
        format={(dataSource) => ({})}
        onOk={(vals) => {
          console.log('vals', vals);
        }}
      >
        <Input name="name" label="姓名" required />
      </DrawerForm>
    </Fragment>
  );
};
