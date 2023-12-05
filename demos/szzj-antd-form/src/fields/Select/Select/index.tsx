import React, { useCallback, useEffect } from 'react';
import { useDebounce } from '@szzj/hooks';
import { Select as AntdSelect } from 'antd';
import createField from '../../../createField';
import useOptions from '../../../hooks/useOptions';
import { useFieldContext } from '../../../contexts/FieldContext';
import { SelectProps as AntdSelectProps } from 'antd/es/select';
import { Options } from '../../../hooks/useOptions';

type SelectProps<T> = AntdSelectProps<T> & {
  options: Options;
  /** 开启远程搜索，需结合 options 选项用于获取数据 */
  searchable?: boolean;
  /** 是否使用第一个 option 作为值 */
  useFirstOption?: boolean;
};

type InnerProps = Pick<SelectProps<any>, 'showSearch' | 'onClear' | 'onSearch' | 'filterOption'>;

const Select: React.FC<SelectProps<any>> = ({
  options: optionsProp,
  searchable,
  useFirstOption,
  ...rest
}) => {
  const { options, fetchOptions } = useOptions(optionsProp);
  const { label } = useFieldContext()!;
  const innerProps: InnerProps = {} as InnerProps;

  const _search = useCallback(
    (val: string) => {
      if (searchable && typeof optionsProp === 'function') fetchOptions(val);
    },
    [searchable],
  );
  const { execute: search, cancel } = useDebounce(_search);

  if (searchable && typeof optionsProp === 'function') {
    innerProps.showSearch = true;
    innerProps.onClear = () => {
      cancel();
      fetchOptions();
    };
    innerProps.onSearch = search;
    innerProps.filterOption = () => true;
  }

  useEffect(() => {
    const existed =
      rest?.value && options.length
        ? options.some((option) => {
            return rest.mode && ['multiple', 'tags'].includes(rest.mode)
              ? rest.value?.includes(option.value)
              : rest.value === option.value;
          })
        : false;

    if (!existed) {
      // 使用首项
      if (useFirstOption && options?.length) {
        if (rest.mode && ['multiple', 'tags'].includes(rest.mode)) {
          rest.onChange?.(rest.labelInValue ? [options[0]] : [options[0].value], [options[0]]);
        } else {
          rest.onChange?.(rest.labelInValue ? options[0] : options[0].value, options[0]);
        }
        return;
      }

      // 重置为 undefined
      if (rest?.value) {
        if (rest.mode && ['multiple', 'tags'].includes(rest.mode)) {
          rest.onChange?.([], []);
        } else {
          // @ts-ignore
          rest.onChange?.(undefined, undefined);
        }
      }
    }
  }, [options]);

  return <AntdSelect placeholder={`请选择${label}`} {...innerProps} {...rest} options={options} />;
};

export default createField<SelectProps<any>>(Select);
