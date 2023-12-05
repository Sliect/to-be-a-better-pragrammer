import React from 'react';
import { Form, TimePicker } from '@szzj/antd-form';

export default () => {
  return (
    <Form
      detail
      labelCol={{ span: 3 }}
      initialValues={{ time: '20:54:00', range: ['20:54:00', '21:54:00'] }}
    >
      <TimePicker name="time" label="时间" />
      <TimePicker.RangePicker name="range" label="区间" />
    </Form>
  );
};
