import React from 'react';
import { Input } from '@szzj/antd-form';
import { validate } from './utils';

import type { IColumn, IEntity } from './types';

/*
 * getFieldsValue、validateFields 仅收集或校验已渲染的字段
 * 这样就将页码切到第二页后，第一页中的字段就会收集、校验不到
 * 所以，在这里注册一个顶层的、隐藏的 name 开启全字段收集与校验
 *
 * @FIXME 除了 required、uniqued 字段规则，这里的全字段校验不支持其余校验形式如 pattern
 */
export default function TopStoreInput<T extends IEntity<T>>({
  name,
  columns,
  validateRow,
  rules = [],
}: {
  name: string;
  columns: IColumn<T>[];
  validateRow?: (row: T) => void;
  rules?: any[];
}) {
  return (
    <Input
      formItemClassName="top-store-input"
      name={name}
      required={false}
      rules={[
        ...rules,
        {
          validator: async (rule, value) => {
            validate(value, columns, validateRow);
          },
        },
      ]}
    />
  );
}
