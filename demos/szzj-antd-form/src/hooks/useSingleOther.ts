import { useState, useCallback, useEffect } from 'react';
import { Option } from '../types';

export default function useSingleOther({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value?: string | number;
  onChange?: (val?: string) => void;
}) {
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>();
  const [otherValue, setOtherValue] = useState<string | undefined>(undefined);
  const [otherChecked, setOtherChecked] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      const optionValues: (string | number)[] = options.map((option) => option.value);
      let selectedVal: string | number | undefined;
      let otherVal: string | undefined;
      if (optionValues.includes(value)) {
        selectedVal = value;
      } else {
        otherVal = value as string;
      }

      setSelectedValue(selectedVal);
      setOtherValue(otherVal);
      if (otherVal !== undefined) setOtherChecked(true);
    }
  }, [value, options]);

  const changeSelectedValue = useCallback(
    (val: string) => {
      setSelectedValue(val);
      setOtherChecked(false);
      setOtherValue(undefined);
      if (onChange) onChange(val);
    },
    [otherValue],
  );

  const changeOtherValue = useCallback(
    (val?: string) => {
      setOtherValue(val);
      if (onChange) onChange(val);
    },
    [selectedValue],
  );

  const changeOtherChecked = useCallback(
    (checked: boolean) => {
      setOtherChecked(checked);
      if (checked) setSelectedValue(undefined);
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
