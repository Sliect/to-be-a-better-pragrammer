import React, { Fragment } from 'react';
import { Checkbox as AntdCheckbox, Input } from 'antd';
import createField from '../../../createField';
import useOptions from '../../../hooks/useOptions';
import useOther from '../../../hooks/useOther';
import { useFieldContext } from '../../../contexts/FieldContext';
import {
  CheckboxProps as AntdCheckboxProps,
  CheckboxGroupProps as AntdCheckboxGroupProps,
} from 'antd/es/checkbox';
import { Options } from '../../../hooks/useOptions';
import './index.less';

export type CheckboxWithOtherProps = AntdCheckboxGroupProps & {
  options: Options;
  itemProps:
    | Partial<AntdCheckboxProps>
    | ((option: { label: string; value: string }) => Partial<AntdCheckboxProps>);
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
      <AntdCheckbox.Group
        value={selectedValue}
        onChange={changeSelectedValue}
        {...rest}
        style={{ marginRight: 10 }}
      >
        {options.map((item: any) => {
          return (
            <AntdCheckbox
              key={item.value}
              value={item.value}
              {...(typeof itemProps == 'function' ? itemProps(item) : itemProps)}
            >
              {item.label}
            </AntdCheckbox>
          );
        })}
      </AntdCheckbox.Group>
      <AntdCheckbox
        checked={otherChecked}
        onChange={(event) => changeOtherChecked(event?.target.checked)}
      >
        其他
      </AntdCheckbox>

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
