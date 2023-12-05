import React from 'react';
import { Form, Upload } from '@szzj/antd-form';

export default () => {
  return (
    <Form
      detail
      labelCol={3}
      initialValues={{
        avator: [
          {
            name: '图片',
            url: 'www.baidu.com',
            uid: 'www.baidu.com',
          },
          {
            name: '图片1',
            url: 'www.baidu1.com',
            uid: 'www.baidu1.com',
          },
        ],
      }}
    >
      <Upload
        name="avator"
        label="上传图片"
        renderDetailItem={(tag) => {
          return tag ? (
            <a href={tag.url} target="_blank">
              {tag.name}
            </a>
          ) : null;
        }}
      />
    </Form>
  );
};
