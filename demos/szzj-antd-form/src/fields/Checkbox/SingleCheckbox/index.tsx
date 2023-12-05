import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import createField from '../../../createField';
import { CheckboxProps } from 'antd/es/checkbox';

const SingleCheckbox: React.FC<CheckboxProps> = ({ ...rest }) => {
  return <AntdCheckbox {...rest} />;
};

export default createField<CheckboxProps>(SingleCheckbox, {
  defaultDetailComponent: (props: CheckboxProps) => {
    return <AntdCheckbox {...props} disabled />;
  },
  defaultFormItemProps: {
    valuePropName: 'checked',
    // @ts-ignore
    getValueFromEvent: (event: React.ChangeEvent) => event.target.checked,
  },
});
