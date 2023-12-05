import { Checkbox as AntdCheckbox } from 'antd';
import Checkbox from './Checkbox';
import SingleCheckbox from './SingleCheckbox';
import CheckboxWithOther from './CheckboxWithOther';

type CheckboxType = typeof Checkbox;

interface CheckboxInterface extends CheckboxType {
  SingleCheckbox: typeof SingleCheckbox;
  CheckboxWithOther: typeof CheckboxWithOther;
  CheckboxItem: typeof AntdCheckbox;
}

const FinalCheckbox = Checkbox as CheckboxInterface;
FinalCheckbox.SingleCheckbox = SingleCheckbox;
FinalCheckbox.CheckboxWithOther = CheckboxWithOther;
FinalCheckbox.CheckboxItem = AntdCheckbox;

export default FinalCheckbox;
