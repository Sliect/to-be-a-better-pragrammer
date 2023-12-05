import React, { useEffect, useCallback, useRef } from 'react';
import { message } from 'antd';
import set from 'lodash/set';
import get from 'lodash/get';

import type { FormInstance } from 'antd/es/form';
import type { IEditableTableProps, IEntity, IName } from '../types';

type IOptions<T extends IEntity<T>> = Pick<
  IEditableTableProps<T>,
  'name' | 'initialValue' | 'value' | 'min' | 'max' | 'rowExpandMin' | 'rowExpandMax'
> & {
  rowKey: (row: T) => React.Key;
  expandRow: (expanded: boolean, row: T) => void;
};

export default function useValue<T extends IEntity<T>>(
  form: FormInstance,
  {
    name,
    initialValue,
    value,
    rowKey,
    expandRow,
    min,
    max,
    rowExpandMin,
    rowExpandMax,
  }: IOptions<T>,
) {
  const vidRef = useRef(1);

  useEffect(() => {
    if (name && initialValue !== undefined && value === undefined) {
      form.setFieldsValue({
        [name]: initialValue,
      });
    }
  }, [form, name, initialValue, value]);

  /** 新建时，使用虚拟 id */
  const getVirtualItem = useCallback(() => {
    vidRef.current = vidRef.current + 1;

    return {
      _vid: vidRef.current,
    };
  }, [vidRef]);

  /** 新增一行 */
  const addItem = useCallback(
    (row?: T) => {
      const value = form.getFieldValue(name) || [];
      const newValue = [...value];
      const item = getVirtualItem();

      // 首层
      if (!row) {
        if (max && newValue?.length >= max) {
          message.error(`配置的条目数须小于等于${max}条`);
          return;
        }
        newValue.push(item);

        // 深层
      } else {
        const children = row.children ? [...row.children, item] : [item];

        if (rowExpandMax && children?.length >= rowExpandMax) {
          message.error(`配置的子级条目数须小于等于${rowExpandMax}条`);
          return;
        }

        set(newValue, row.childFieldNamePrefix, children);
        expandRow(true, row);
      }

      form.setFieldsValue({
        [name]: newValue,
      });
    },
    [name, expandRow, form],
  );

  /** 删除一行 */
  const removeItem = useCallback(
    (row: T) => {
      const value = form.getFieldValue(name) || [];
      let newValue = [...value];

      if (!row._parent) {
        if (min && newValue?.length <= min) {
          message.error(`配置的条目数须大于等于${min}条`);
          return;
        }

        newValue = newValue!.filter((item: T) => rowKey(item) !== rowKey(row));
      } else {
        const parent = row._parent;
        const children = parent.children?.filter((item: T) => rowKey(item) !== rowKey(row));

        if (rowExpandMin && (children ?? []).length <= rowExpandMin) {
          message.error(`配置的子级条目数须大于等于${rowExpandMin}条`);
          return;
        }

        set(newValue, parent.childFieldNamePrefix, !!children?.length ? children : undefined);
        if (!children?.length) expandRow(false, parent);
      }

      form.setFieldsValue({
        [name]: newValue,
      });
    },
    [name, expandRow, form, rowKey],
  );

  /** 移动 */
  const moveItem = useCallback(
    (row: T, dragIndex: number, hoverIndex: number) => {
      const value = form.getFieldValue(name) || [];
      let newValue = [...value];
      const dragChildrenName = row.fieldNamePrefix?.slice(0, -1) ?? [];
      const dragRowValue = get(newValue, [...dragChildrenName, dragIndex]);

      if (!row._parent) {
        newValue.splice(dragIndex, 1);
        newValue.splice(hoverIndex, 0, dragRowValue);
      } else {
        const children = get(newValue, dragChildrenName);
        children.splice(dragIndex, 1);
        children.splice(hoverIndex, 0, dragRowValue);
        set(newValue, dragChildrenName, children);
      }

      form.setFieldsValue({
        [name]: newValue,
      });
    },
    [name, form],
  );

  /** 批量递归设置子节点的某个字段 */
  const setParentValue = useCallback(
    (row: T, fieldName: IName, fieldValue: any) => {
      const value = form.getFieldValue(name) || [];
      let newValue = [...value];

      const parentNamePrefix = row.fieldNamePrefix?.slice(0, row.fieldNamePrefix.length - 2);
      if (parentNamePrefix?.length) {
        set(newValue, [...parentNamePrefix, fieldName], fieldValue);
        form.setFieldsValue({
          [name]: newValue,
        });
      }
    },
    [name, form],
  );

  /** 批量递归设置子节点的某个字段 */
  const setChildrenValue = useCallback(
    (row: T, fieldName: IName, fieldValue: any) => {
      const value = form.getFieldValue(name) || [];
      let newValue = [...value];
      if (row.children) {
        const travser = (list: any[]): any[] => {
          return list.map((item) => ({
            ...item,
            [fieldName]: fieldValue,
            children: item.children ? travser(item.children) : undefined,
          }));
        };
        const children = travser(row.children);

        set(newValue, row.childFieldNamePrefix, children);
        form.setFieldsValue({
          [name]: newValue,
        });
      }
    },
    [name, form],
  );

  /** 可编辑表格整体取值 */
  const getValue = useCallback(() => {
    return form.getFieldValue(name) as T[];
  }, [name, form]);

  /** 可编辑表格整体赋值 */
  const setValue = useCallback(
    (newValue: T[]) => {
      return form.setFieldsValue({ [name]: newValue });
    },
    [name, form],
  );

  return {
    addItem,
    removeItem,
    moveItem,
    setParentValue,
    setChildrenValue,
    getValue,
    setValue,
  };
}
