import React, { Fragment } from 'react';
import { Form, Radio } from '@szzj/antd-form';

export default () => {
  return (
    <Fragment>
      <Form labelCol={{ span: 3 }}>
        <Radio.SingleRadio name="right" />
      </Form>
      <Form labelCol={{ span: 3 }} initialValues={{ right: true }} detail>
        <Radio.SingleRadio name="right" />
      </Form>
    </Fragment>
  );
};
