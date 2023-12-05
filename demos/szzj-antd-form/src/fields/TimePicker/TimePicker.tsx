import React from 'react';
import { TimePicker as AntdTimePicker } from 'antd';
import createField from '../../createField';
import { TimePickerProps } from 'antd/es/time-picker';

const TimePicker: React.FC<TimePickerProps> = (props) => {
  return <AntdTimePicker {...props} />;
};

export default createField<TimePickerProps>(TimePicker);
