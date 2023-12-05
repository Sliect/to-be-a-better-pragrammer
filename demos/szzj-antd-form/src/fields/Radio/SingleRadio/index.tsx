import React from 'react';
import { Radio as AntdRadio } from 'antd';
import createField from '../../../createField';
import { RadioProps } from 'antd/es/radio';

const SingleRadio: React.FC<RadioProps> = ({ ...rest }) => {
  return <AntdRadio {...rest} />;
};

export default createField<RadioProps>(SingleRadio, {
  defaultDetailComponent: (props: RadioProps) => {
    return <AntdRadio {...props} disabled />;
  },
  defaultFormItemProps: {
    valuePropName: 'checked',
    // @ts-ignore
    getValueFromEvent: (event: React.ChangeEvent) => event.target.checked,
  },
});
