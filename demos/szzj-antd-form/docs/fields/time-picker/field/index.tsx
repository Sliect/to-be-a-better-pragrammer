import React from 'react';
import { Form, TimePicker } from '@szzj/antd-form';

export default () => {
  return (
    <Form labelCol={{ span: 3 }}>
      <TimePicker name="time" label="时间" />
      <TimePicker.RangePicker name="range" label="区间" />
    </Form>
  );
};
