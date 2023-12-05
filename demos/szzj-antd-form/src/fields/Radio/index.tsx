import { Radio as AntdRadio } from 'antd';
import Radio from './Radio';
import RadioWithOther from './RadioWithOther';
import SingleRadio from './SingleRadio';

type RadioType = typeof Radio;

interface RadioInterface extends RadioType {
  SingleRadio: typeof SingleRadio;
  RadioWithOther: typeof RadioWithOther;
  RadioItem: typeof AntdRadio;
}

const FinalRadio = Radio as RadioInterface;
FinalRadio.SingleRadio = SingleRadio;
FinalRadio.RadioWithOther = RadioWithOther;
FinalRadio.RadioItem = AntdRadio;

export default FinalRadio;
