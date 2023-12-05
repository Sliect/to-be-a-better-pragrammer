import React, { useEffect } from 'react';
import { Radio as AntdRadio } from 'antd';
import useOptions from '../../../hooks/useOptions';
import createField from '../../../createField';
import { RadioGroupProps as AntdRadioGroupProps } from 'antd/es/radio';
import { Options } from '../../../hooks/useOptions';

type RadioGroupProps = AntdRadioGroupProps & {
  options: Options;
  vertical?: boolean;
};

const Radio: React.FC<RadioGroupProps> = ({
  children,
  options: optionsProp,
  vertical,
  ...rest
}) => {
  const { options } = useOptions(optionsProp);

  useEffect(() => {
    const existed =
      rest?.value && options.length
        ? options.some((option) => {
            return rest.value !== option.value;
          })
        : false;

    if (rest?.value && !existed) {
      // @ts-ignore
      rest.onChange?.(undefined);
    }
  }, [options]);

  return (
    <AntdRadio.Group {...rest} options={options}>
      {children
        ? children
        : options.map((option) => {
            const { label, ...rest } = option;
            return (
              <AntdRadio key={rest.value} {...rest}>
                {label}
              </AntdRadio>
            );
          })}
    </AntdRadio.Group>
  );
};

export default createField(Radio);
