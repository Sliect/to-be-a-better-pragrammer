import React, { type FC, useCallback, useEffect, useMemo, useState } from 'react';

const Input: FC<{
  /**
   * @description 受控模式 value 值
   */
  value?: string;
  /**
   * @description 非受控模式value值
   */
  defaultValue?: string;
  /**
   * @description 事件监听
   */
  onChange?: (value: string) => void;
}> = (props) => {
  const { value, defaultValue, onChange } = props;
  const controlled = useMemo(() => {
    return value !== undefined;
  }, []);

  const [stateValue, setStateValue] = useState(value !== undefined ? value : defaultValue ?? '');

  useEffect(() => {
    /**
     * 如果 stateValue 与 value 等值，setState 不会驱动视图重绘
     */
    if (controlled) setStateValue(value ?? '');
  }, [value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setStateValue(event?.target?.value);
      onChange?.(event?.target?.value);
    },
    [onChange],
  );

  return (
    // 样式类推荐使用 szzj 前缀，不使用 css modules
    <div className="szzj-input">
      <input value={stateValue} onChange={handleChange} />
    </div>
  );
};

export default Input;

/**
 * 使用 jsdoc、typescript 注释 props 属性，以便 dumi 解析出 API
 * @see https://d.umijs.org/guide/auto-api-table
 */
