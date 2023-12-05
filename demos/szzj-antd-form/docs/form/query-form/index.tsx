import React, { Fragment, useCallback } from 'react';
import { Button } from 'antd';
import { Form, QueryForm, Input } from '@szzj/antd-form';

export default () => {
  const form = Form.useForm()[0];
  const handleSearch = useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <Fragment>
      <QueryForm form={form} onSearch={handleSearch} layout="vertical">
        <Input name="name" label="姓名" required={false} />
        <Input name="name1" label="姓名1" required={false} />
        <Input name="name2" label="姓名2" required={false} />
        <Input name="name3" label="姓名3" required={false} />
        <Input name="name4" label="姓名4" required={false} />
      </QueryForm>
    </Fragment>
  );
};
