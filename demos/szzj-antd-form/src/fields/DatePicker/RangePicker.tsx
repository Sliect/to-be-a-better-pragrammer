import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import createField from '../../createField';
import { RangePickerProps } from 'antd/es/date-picker';

const RangePicker: React.FC<RangePickerProps> = (props) => {
  return <AntdDatePicker.RangePicker {...props} />;
};

export default createField<RangePickerProps>(RangePicker);
