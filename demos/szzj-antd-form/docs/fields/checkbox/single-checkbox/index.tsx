import React, { Fragment } from 'react';
import { Form, Checkbox } from '@szzj/antd-form';

export default () => {
  return (
    <Fragment>
      <Form labelCol={{ span: 3 }}>
        <Checkbox.SingleCheckbox name="right" />
      </Form>
      <Form labelCol={{ span: 3 }} initialValues={{ right: true }} detail>
        <Checkbox.SingleCheckbox name="right" />
      </Form>
    </Fragment>
  );
};
