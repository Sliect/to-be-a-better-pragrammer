import { FormProps as AntdFormProps } from 'antd/es/form';

export type FormProps = AntdFormProps & {
  detail?: boolean;
};
