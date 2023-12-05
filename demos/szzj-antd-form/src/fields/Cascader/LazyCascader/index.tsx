import React, { useCallback, useEffect } from 'react';
import { Cascader as AntdCascader } from 'antd';
import createField from '../../../createField';
import { useFieldContext } from '../../../contexts/FieldContext';
// @ts-ignore
import { CascaderProps as AntdCascaderProps, CascaderOptionType } from 'antd/es/cascader';

// @ts-ignore
type CascaderProps = Omit<AntdCascaderProps, 'options'> & {
  /**
   * 逐级获取远程数据
   */
  fetch: (params?: Record<string, any>) => Promise<CascaderOptionType[]>;
  value?: CascaderOptionType[];
  onChange?: (value?: CascaderOptionType[]) => void;
};

/**
 * 远程逐级拉取数据的级联下拉框，约定了 value 值为 CascaderOptionType[] 形式
 * @param props
 * @returns
 */
const LazyCascader: React.FC<CascaderProps> = ({
  children,
  fieldNames,
  fetch,
  value,
  onChange,
  ...props
}) => {
  const { label } = useFieldContext()!;
  const { value: valueKey = 'value', children: childrenKey = 'children' } = fieldNames || {};
  const [options, setOptions] = React.useState<CascaderOptionType[]>([]);

  /**
   * 根据父节点拉取下一级数据
   */
  const loadData = useCallback(
    (selectedOptions: any) => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;

      fetch(targetOption).then((opts) => {
        targetOption.loading = false;
        targetOption[childrenKey] = opts;
        setOptions([...options]);
      });
    },
    [fetch, options],
  );

  /**
   * 获取第一级数据
   */
  useEffect(() => {
    fetch().then((opts) => {
      setOptions(opts);
    });
  }, [fetch]);

  /**
   * 回显时，逐级拉取数据
   */
  useEffect(() => {
    if (value && value.length && options && options.length) {
      let currentOptions = [...options];
      let currentOption = options.find((cp: any) => {
        return cp[valueKey] === value[0][valueKey];
      }) as any;

      if (currentOption && !currentOption.children) {
        const fetchTasks = value.slice(0, value.length - 1).map((parent: any) => {
          return {
            fn: fetch(parent),
          };
        });

        if (fetchTasks.length > 0) {
          Promise.all(fetchTasks.map((task) => task.fn)).then((allOpts: CascaderOptionType[][]) => {
            allOpts.map((opts, idx: number) => {
              if (!currentOption) return;
              currentOption[childrenKey] = opts;

              currentOption = currentOption.children.find((cp: any) => {
                return cp[valueKey] == value[idx + 1][valueKey];
              });
            });

            setOptions(currentOptions);
          });
        }
      }
    }
  }, [options, value]);

  return (
    // @ts-ignore
    <AntdCascader
      placeholder={`请选择${label || ''}`}
      {...props}
      fieldNames={fieldNames}
      options={options}
      loadData={loadData}
      value={value ? value.map((item: any) => item[valueKey]) : value}
      onChange={(value, selectedOptions) => {
        if (onChange) onChange(selectedOptions);
      }}
      changeOnSelect
    >
      {children}
    </AntdCascader>
  );
};

export default createField<CascaderProps>(LazyCascader, {
  defaultDetailType: 'text-for-options-value',
});
