import React from 'react';
import { Form, Radio } from '@szzj/antd-form';

const options = [
  {
    label: '橘子',
    value: '橘子',
  },
  {
    label: '苹果',
    value: '苹果',
  },
];

export default () => {
  return (
    <Form labelCol={{ span: 3 }}>
      <Radio.RadioWithOther name="fruit1" label="最喜欢的水果" options={options} />
      <Radio.RadioWithOther
        name="fruit2"
        label="最喜欢的水果2"
        options={options}
        initialValue={'苹果'}
      />
    </Form>
  );
};
