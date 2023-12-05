import React from 'react';
import { Form, DatePicker } from '@szzj/antd-form';

export default () => {
  return (
    <Form labelCol={{ span: 3 }}>
      <DatePicker name="date" label="时间" />
      <DatePicker picker="year" name="year" label="年" />
      <DatePicker picker="quarter" name="quarter" label="季度" />
      <DatePicker picker="month" name="month" label="月" />
      <DatePicker picker="week" name="week" label="周" />
      <DatePicker.RangePicker name="rangeDate" label="时间区间" />
      <DatePicker.RangePicker picker="year" name="rangeYear" label="年区间" />
      <DatePicker.RangePicker picker="quarter" name="rangeQuarter" label="季度区间" />
      <DatePicker.RangePicker picker="month" name="rangeMonth" label="月区间" />
      <DatePicker.RangePicker picker="week" name="rangeWeek" label="周区间" />
    </Form>
  );
};
