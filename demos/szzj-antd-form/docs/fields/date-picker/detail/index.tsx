import React from 'react';
import { Form, DatePicker } from '@szzj/antd-form';

export default () => {
  return (
    <Form
      detail
      labelCol={{ span: 3 }}
      initialValues={{
        date: '2020-05-13 20:54:00',
        range: ['2020-05-13 20:54:00', '2021-05-13 20:54:00'],
        year: '2020',
        month: '2020-05',
        week: '1',
        quarter: '2020 Q1',
      }}
    >
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
