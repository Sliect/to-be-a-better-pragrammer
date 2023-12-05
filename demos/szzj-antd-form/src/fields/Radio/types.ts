import { RadioProps as AntdRadioProps } from 'antd/es/radio';
import { Options } from '../../hooks/useOptions';

export interface RadioProps extends AntdRadioProps {
  options: Options;
}
