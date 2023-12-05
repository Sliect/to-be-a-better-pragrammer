import { Select as AntdSelect } from 'antd';
import Select from './Select';
import SelectWithOther from './SelectWithOther';

type SelectType = typeof Select;

interface SelectInterface extends SelectType {
  SelectWithOther: typeof SelectWithOther;
  Option: typeof AntdSelect.Option;
}

const FinalSelect = Select as SelectInterface;
FinalSelect.SelectWithOther = SelectWithOther;
FinalSelect.Option = AntdSelect.Option;

export default FinalSelect;
