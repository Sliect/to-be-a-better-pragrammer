import React, { Fragment } from 'react';
import { Button } from 'antd';
import { useModal } from '@szzj/hooks';
import { Form, DrawerForm, Input } from '@szzj/antd-form';

export default () => {
  const [form] = Form.useForm();
  const drawer = useModal();

  return (
    <Fragment>
      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={() => drawer.show(JSON.stringify({ name: '史泰龙' }))}
      >
        编辑
      </Button>

      <DrawerForm
        title="新建"
        form={form}
        {...drawer.props}
        format={(dataSource) => JSON.parse(dataSource)}
        transform={(vals) => ({ ...vals, id: 111 })}
        onOk={(vals) => {
          console.log('vals', vals);
        }}
      >
        <Input name="name" label="姓名" required />
      </DrawerForm>
    </Fragment>
  );
};
