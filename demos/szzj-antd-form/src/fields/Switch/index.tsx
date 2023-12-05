import React from 'react';
import { Switch as AntdSwitch } from 'antd';
import createField from '../../createField';
import { SwitchProps } from 'antd/es/switch';

const Switch: React.FC<SwitchProps> = (props) => {
  return <AntdSwitch checkedChildren="开" unCheckedChildren="关" {...props} />;
};

export default createField<SwitchProps>(Switch, {
  defaultDetailComponent: (props: SwitchProps) => {
    return <Switch {...props} disabled />;
  },
  defaultFormItemProps: {
    valuePropName: 'checked',
  },
});
