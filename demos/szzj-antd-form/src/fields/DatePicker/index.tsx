import DatePicker from './DatePicker';
import RangePicker from './RangePicker';

type DatePickerType = typeof DatePicker;

interface DatePickerInterface extends DatePickerType {
  RangePicker: typeof RangePicker;
}

const FinalDatePicker = DatePicker as DatePickerInterface;
FinalDatePicker.RangePicker = RangePicker;

export default FinalDatePicker;
