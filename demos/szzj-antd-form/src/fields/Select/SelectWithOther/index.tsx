import React, { Fragment, useCallback, useRef } from 'react';
import { Select as AntdSelect, Input } from 'antd';
import createField from '../../../createField';
import useOptions from '../../../hooks/useOptions';
import useOther from '../../../hooks/useSingleOther';
import { useFieldContext } from '../../../contexts/FieldContext';
import { SelectProps as AntdSelectProps } from 'antd/es/select';
import { Options } from '../../../hooks/useOptions';

export type SelectWithOtherProps<T> = AntdSelectProps<T> & {
  options: Options;
  onChange?: (val?: string) => void;
};

/**
 * 性能未必可靠，选择其他失焦校验不好
 * @param param0
 * @returns
 */
const SelectWithOther: React.FC<SelectWithOtherProps<any>> = ({
  value,
  onChange,
  options: optionsProp,
  ...rest
}) => {
  const { options } = useOptions(optionsProp);
  const { label } = useFieldContext()!;

  const otherRef = useRef<string>('select-other-' + Math.random());
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

  const handleSelectChange = useCallback(
    (val: string | number) => {
      const fnd = options.find((op: any) => op.value === val);
      let newVal;
      if (fnd) {
        newVal = fnd.value;
        changeSelectedValue(newVal);
      } else {
        newVal = undefined;
        changeOtherChecked(true);
      }
    },
    [options, onChange],
  );

  const handleInputChange = useCallback((event: any) => {
    changeOtherValue(event.target.value);
  }, []);

  return (
    <Fragment>
      <AntdSelect
        value={otherChecked ? otherRef.current : selectedValue}
        onChange={handleSelectChange}
        placeholder={`请选择${label}`}
        {...rest}
        style={{ width: 'calc(50% - 5px)', marginRight: 10 }}
      >
        {(options || []).map((option: any) => {
          return (
            <AntdSelect.Option key={option.value} value={option.value}>
              {option.label}
            </AntdSelect.Option>
          );
        })}

        <AntdSelect.Option key="other" value={otherRef.current}>
          其他
        </AntdSelect.Option>
      </AntdSelect>

      {otherChecked ? (
        <Input
          value={otherChecked ? otherValue : undefined}
          onChange={handleInputChange}
          style={{ width: 'calc(50% - 5px)' }}
          maxLength={100}
        />
      ) : null}
    </Fragment>
  );
};

export default createField<SelectWithOtherProps<any>>(SelectWithOther);
