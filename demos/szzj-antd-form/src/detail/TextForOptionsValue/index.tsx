import React from 'react';
import { CascaderProps as AntdCascaderProps } from 'antd/es/cascader';

const TextForOptionsValue: React.FC<
  Pick<AntdCascaderProps<any>, 'fieldNames'> & {
    value?: string[];
  }
> = ({ value, fieldNames }) => {
  const { value: labelKey = 'label' } = fieldNames || {};
  // @ts-ignore
  const texts = value?.map((val) => val[labelKey]);

  return <span className="szzj-form-detail-options">{texts?.join(',')}</span>;
};

export default TextForOptionsValue;
