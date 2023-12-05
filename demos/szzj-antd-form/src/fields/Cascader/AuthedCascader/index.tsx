import React, { useMemo, Fragment, useCallback } from 'react';
import { Cascader } from 'antd';
import createField from '../../../createField';
import { useFieldContext } from '../../../contexts/FieldContext';
import {
  CascaderProps as AntdCascaderProps,
  // @ts-ignore
  CascaderOptionType,
  // @ts-ignore
  CascaderValueType,
} from 'antd/es/cascader';

export type CascaderProps = AntdCascaderProps<any> & {
  authedBy?: string[] | true;
};

const AuthedCascader: React.FC<CascaderProps> = ({
  options,
  fieldNames,
  authedBy,
  value,
  onChange,
  ...props
}) => {
  const { label } = useFieldContext()!;
  const {
    value: valueKey = 'value',
    label: labelKey = 'label',
    children: childrenKey = 'children',
  } = fieldNames || {};

  const innerOptions = useMemo(() => {
    if (authedBy === true)
      return {
        readonlyOptions: [],
        configOptions: options,
      };

    let readonlyOptions: CascaderOptionType[] = [];
    let configOptions: CascaderOptionType[] = [];
    const travser = (opts: CascaderOptionType[], level: number = 0) => {
      const matched = opts.find((opt) => {
        return authedBy && opt[valueKey] === authedBy[level];
      });

      if (!matched) return;

      if (level + 1 === authedBy?.length) {
        configOptions = matched[childrenKey];
      }
      if (level < authedBy!.length) {
        readonlyOptions.push(matched);
        if (matched.children) travser(matched.children, level + 1);
      }
    };

    // @ts-ignore
    travser(options);

    return {
      readonlyOptions,
      configOptions,
    };
  }, [options, authedBy]);

  const readonlyValues = useMemo(() => {
    const { readonlyOptions } = innerOptions;
    return readonlyOptions.map((item) => item[valueKey]);
  }, [innerOptions]);

  const readonlyLabels = useMemo(() => {
    const { readonlyOptions } = innerOptions;
    return readonlyOptions.map((item) => item[labelKey]);
  }, [innerOptions]);

  const configOptions = useMemo(() => {
    return innerOptions.configOptions;
  }, [innerOptions]);

  const handleChange = useCallback(
    (value: CascaderValueType) => {
      // @ts-ignore
      if (onChange) onChange(!readonlyValues.length ? value : [...readonlyValues, ...value]);
    },
    [readonlyValues, onChange],
  );

  return (
    <Fragment>
      {readonlyLabels.length ? <span>{readonlyLabels.join('')}</span> : ''}
      {/* @ts-ignore */}
      {configOptions.length ? (
        <Cascader
          options={configOptions}
          placeholder={`请选择${label || ''}`}
          style={!readonlyLabels.length ? undefined : { width: '72%', marginLeft: 5 }}
          {...props}
          value={
            value !== undefined
              ? value.slice(!readonlyValues.length ? 0 : readonlyValues.length)
              : undefined
          }
          onChange={handleChange}
        />
      ) : null}
    </Fragment>
  );
};

export default createField<CascaderProps>(AuthedCascader);
