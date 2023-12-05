import { Input as AntdInput } from 'antd';
import Input from './Input';
import Textarea from './Textarea';
import Password from './Password';

type InputType = typeof Input;

interface InputInterface extends InputType {
  Textarea: typeof Textarea;
  TextArea: typeof Textarea;
  Password: typeof Password;
  Group: typeof AntdInput.Group;
}

const FinalInput = Input as InputInterface;

/** Textarea will depecrated, please use TextArea */
FinalInput.Textarea = Textarea;
FinalInput.TextArea = Textarea;
FinalInput.Password = Password;
FinalInput.Group = AntdInput.Group;

export default FinalInput;
