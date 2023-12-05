import React from 'react';
import { Form, Input } from '@szzj/antd-form';

export default () => {
  return (
    <Form labelCol={{ span: 6 }}>
      <Input name="gerenal" label="数字、英文、中文或下划线" required={false} valueType="gerenal" />
      <Input name="alphanumeric" label="数字英文下划线" required={false} valueType="alphanumeric" />
      <Input
        name="alphanumericcn"
        label="数字英文下划线"
        required={false}
        valueType="alphanumericcn"
      />
      <Input name="email" label="邮箱" required={false} valueType="email" />
      <Input name="idCard" label="身份证号" required={false} valueType="idCard" />
      <Input name="ipv4" label="ipv4" required={false} valueType="ipv4" />
      <Input name="ipv6" label="ipv6" required={false} valueType="ipv6" />
      <Input name="mobileCn" label="手机号" required={false} valueType="mobileCn" />
      <Input name="port" label="端口号" required={false} valueType="port" />
      <Input name="telephone" label="电话" required={false} valueType="telephone" />
      <Input name="uniscid" label="组织机构代码" required={false} valueType="uniscid" />
      <Input
        name="name"
        label="姓名"
        required={false}
        rules={(form) => {
          console.log(form);
          return [
            {
              required: true,
            },
          ];
        }}
      />
    </Form>
  );
};
