import React, { Fragment } from 'react';
import { Radio as AntdRadio, Input } from 'antd';
import createField from '../../../createField';
import useOptions from '../../../hooks/useOptions';
import useOther from '../../../hooks/useSingleOther';
import { useFieldContext } from '../../../contexts/FieldContext';
import './index.less';
import {
  RadioProps as AntdRadioProps,
  RadioGroupProps as AntdRadioGroupProps,
} from 'antd/es/radio';
import { Options } from '../../../hooks/useOptions';

export type CheckboxWithOtherProps = AntdRadioGroupProps & {
  options: Options;
  itemProps:
    | Partial<AntdRadioProps>
    | ((option: { label: string; value: string }) => Partial<AntdRadioProps>);
  onChange: (val?: string) => void;
};

const CheckboxWithOther: React.FC<CheckboxWithOtherProps> = ({
  value,
  onChange,
  options: optionsProp,
  itemProps,
  ...rest
}) => {
  const { options } = useOptions(optionsProp);
  const { label } = useFieldContext()!;
  const {
    otherChecked,
    changeOtherChecked,
    selectedValue,
    changeSelectedValue,
    otherValue,
    changeOtherValue,
  } = useOther({
    value,
    onChange,
    options,
  });

  return (
    <Fragment>
      <AntdRadio.Group
        value={selectedValue}
        onChange={(event) => {
          changeSelectedValue(event.target.value);
        }}
        {...rest}
        style={{ marginRight: 10 }}
      >
        {options.map((item: any) => {
          return (
            <AntdRadio
              key={item.value}
              value={item.value}
              {...(typeof itemProps == 'function' ? itemProps(item) : itemProps)}
            >
              {item.label}
            </AntdRadio>
          );
        })}
      </AntdRadio.Group>
      <AntdRadio
        checked={otherChecked}
        onChange={(event) => changeOtherChecked(event?.target.checked)}
      >
        其他
      </AntdRadio>

      {otherChecked ? (
        <Input
          placeholder={`请输入${label || ''}`}
          style={{ width: 120 }}
          maxLength={100}
          value={otherValue}
          onChange={(event) => changeOtherValue(event?.target.value)}
        />
      ) : null}
    </Fragment>
  );
};

export default createField<CheckboxWithOtherProps>(CheckboxWithOther);
