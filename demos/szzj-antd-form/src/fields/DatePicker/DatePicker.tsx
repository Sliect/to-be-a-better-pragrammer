import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import createField from '../../createField';
import { DatePickerProps } from 'antd/es/date-picker';

const DatePicker: React.FC<DatePickerProps> = (props) => {
  return <AntdDatePicker {...props} />;
};

export default createField<DatePickerProps>(DatePicker);
