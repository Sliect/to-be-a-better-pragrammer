import {
  CheckboxProps as AntdCheckboxProps,
  CheckboxGroupProps as AntdCheckboxGroupProps,
} from 'antd/es/checkbox';
import { Options } from '../../hooks/useOptions';

export interface CheckboxProps extends AntdCheckboxProps {
  options: Options;
}

export type CheckboxGroupProps = AntdCheckboxGroupProps & {
  options: Options;
};
