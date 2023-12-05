import TimePicker from './TimePicker';
import RangePicker from './RangePicker';

type TimePickerType = typeof TimePicker;

interface TimePickerInterface extends TimePickerType {
  RangePicker: typeof RangePicker;
}

const FinalTimePicker = TimePicker as TimePickerInterface;
FinalTimePicker.RangePicker = RangePicker;

export default FinalTimePicker;
