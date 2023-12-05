import { useState, useCallback, useEffect } from 'react';
import { Option } from '../types';

type ValueType = string | number | boolean;

export default function useOther({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value?: ValueType[];
  onChange?: (val: ValueType[]) => void;
}) {
  const [selectedValue, setSelectedValue] = useState<ValueType[]>([]);
  const [otherValue, setOtherValue] = useState<string | undefined>(undefined);
  const [otherChecked, setOtherChecked] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      const optionValues: ValueType[] = options.map((option) => option.value);
      const selectedVal: ValueType[] = [];
      let otherVal: string | undefined;
      value.forEach((val) => {
        if (optionValues.includes(val)) {
          selectedVal.push(val);
        } else {
          otherVal = val as string;
        }
      });

      setSelectedValue(selectedVal);
      setOtherValue(otherVal);
      if (otherVal !== undefined) setOtherChecked(true);
    }
  }, [value, options]);

  const changeSelectedValue = useCallback(
    (vals: ValueType[]) => {
      setSelectedValue(vals);
      if (otherValue !== undefined) {
        if (onChange) onChange([...vals, otherValue]);
      } else {
        if (onChange) onChange([...vals]);
      }
    },
    [otherValue],
  );

  const changeOtherValue = useCallback(
    (val?: string) => {
      setOtherValue(val);
      if (onChange) onChange(val !== undefined ? [...selectedValue, val] : selectedValue);
    },
    [selectedValue],
  );

  const changeOtherChecked = useCallback(
    (checked: boolean) => {
      setOtherChecked(checked);
      if (!checked) changeOtherValue();
    },
    [changeOtherValue],
  );

  return {
    selectedValue,
    otherValue,
    otherChecked,
    changeSelectedValue,
    changeOtherValue,
    changeOtherChecked,
  };
}
