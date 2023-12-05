import React, { useEffect } from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import useOptions from '../../../hooks/useOptions';
import createField from '../../../createField';
import { CheckboxGroupProps as AntdCheckboxGroupProps } from 'antd/es/checkbox';
import { Options } from '../../../hooks/useOptions';

export type CheckboxProps = AntdCheckboxGroupProps & {
  options: Options;
};

const Checkbox: React.FC<CheckboxProps> = ({ children, options: optionsProp, ...rest }) => {
  const { options } = useOptions(optionsProp);

  useEffect(() => {
    const existed =
      rest?.value && options.length
        ? options.some((option) => {
            return rest.value?.includes(option.value);
          })
        : false;

    if (rest?.value && !existed) {
      rest.onChange?.([]);
    }
  }, [options]);

  return (
    <AntdCheckbox.Group {...rest} options={options}>
      {children}
    </AntdCheckbox.Group>
  );
};

export default createField<CheckboxProps>(Checkbox);
