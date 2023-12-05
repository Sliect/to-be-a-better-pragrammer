import React from 'react';
import { Form, Upload } from '@szzj/antd-form';

export default () => {
  return (
    <Form labelCol={{ span: 3 }}>
      <Upload name="avator" label="上传文件" accept="vedio" maxSize={2} />
    </Form>
  );
};
