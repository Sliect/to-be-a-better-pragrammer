import React from 'react';
import { Form, List, Input, Checkbox } from '@szzj/antd-form';

export default () => {
  return (
    <Form
      detail
      labelCol={{ span: 3 }}
      initialValues={{
        list: [
          {
            name: '居左',
            sex: 'male',
          },
          {
            name: '白帝',
            sex: 'female',
          },
        ],
        list2: [
          {
            name: '居左',
            sex: 'male',
          },
          {
            name: '白帝',
            sex: 'female',
          },
        ],
      }}
    >
      <List
        name="list"
        label="列表"
        renderItemDetail={(item) => `姓名：${item.name}；性别：${item.sex}；`}
      >
        <Input name="name" label="姓名" />
        <Checkbox
          name="sex"
          label="性别"
          options={[
            {
              label: '男',
              value: 'male',
            },
            {
              label: '女',
              value: 'female',
            },
          ]}
        />
      </List>

      <List name="list2" label="列表2">
        <Input name="name" label="姓名" />
        <Checkbox
          name="sex"
          label="性别"
          options={[
            {
              label: '男',
              value: 'male',
            },
            {
              label: '女',
              value: 'female',
            },
          ]}
        />
      </List>
    </Form>
  );
};
