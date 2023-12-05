import React from 'react';
import { TimePicker as AntdTimePicker } from 'antd';
import createField from '../../createField';
import { TimeRangePickerProps } from 'antd/es/time-picker';

const RangePicker: React.FC<TimeRangePickerProps> = (props) => {
  return <AntdTimePicker.RangePicker {...props} />;
};

export default createField<TimeRangePickerProps>(RangePicker);
