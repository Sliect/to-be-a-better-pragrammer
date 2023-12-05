import React from 'react';
import { Form, Upload } from '@szzj/antd-form';

export default () => {
  return (
    <Form
      labelCol={3}
      initialValues={{
        avator: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
      }}
    >
      <Upload name="avator" label="上传图片" listType="picture-card" accept="image" max={2} />
    </Form>
  );
};
