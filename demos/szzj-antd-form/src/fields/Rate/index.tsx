import React from 'react';
import { Rate as AntdRate } from 'antd';
import createField from '../../createField';
import { RateProps } from 'antd/es/rate';

const Rate: React.FC<RateProps> = (props) => {
  return <AntdRate {...props} />;
};

export default createField(Rate, {
  defaultDetailComponent: (props: RateProps) => {
    return <Rate {...props} disabled />;
  },
});
