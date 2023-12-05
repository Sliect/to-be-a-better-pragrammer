import React, { Fragment } from 'react';
import { Button } from 'antd';
import { useModal } from '@szzj/hooks';
import { Form, DrawerForm, Input, InputNumber } from '@szzj/antd-form';

export default () => {
  const [form] = Form.useForm();
  const drawer = useModal({
    /**
     * 弹窗表单数据提交处理
     * @param vals 表单提交数据
     * @param dataSource 外部数据源
     * @returns 返回 Promise。当 success = true 时，会自动关闭弹窗
     */
    onSubmit: (vals, dataSource) => {
      console.log('vals', vals);
      console.log('dataSource', dataSource);
      return Promise.resolve({ success: true });
    },
  });

  return (
    <Fragment>
      <Button type="primary" onClick={() => drawer.show()}>
        新建
      </Button>
      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={() => drawer.show({ name: '史泰龙', age: 72 })}
      >
        编辑
      </Button>

      <DrawerForm title="新建" form={form} {...drawer.props}>
        <Input name="name" label="姓名" required />
        <InputNumber name="age" label="年龄" required />
      </DrawerForm>
    </Fragment>
  );
};
