import React from 'react';
import { Slider as AntdSlider } from 'antd';
import { SliderSingleProps, SliderRangeProps } from 'antd/es/slider';
import createField from '../../createField';

const Slider: React.FC<SliderSingleProps | SliderRangeProps> = (props) => {
  return <AntdSlider {...props} />;
};

export default createField<SliderSingleProps | SliderRangeProps>(Slider, {
  defaultDetailComponent: (props: any) => {
    return <Slider {...props} disabled />;
  },
});
