import React, { useCallback, useMemo } from 'react';
import { Popconfirm } from 'antd';
import set from 'lodash/set';
import get from 'lodash/get';
import Input from '../../Input';
import { DefaultFields } from '../consts';
import { FormInstance } from 'antd/es/form';

import type { IEditableTableProps, IEntity, IName } from '../types';

/**
 * useColumns 选项
 */
type IOptions<T extends IEntity<T>> = Pick<
  IEditableTableProps<T>,
  | 'name'
  | 'uniqueKey'
  | 'extraFieldNamesForSubmit'
  | 'columns'
  | 'usingCustomActionColumn'
  | 'rowExpandable'
  | 'rowExpandAutoAdd'
  | 'addable'
  | 'Fields'
> & {
  /** 新增一行 */
  addItem: (row?: T) => void;
  /** 删除一行 */
  removeItem: (row: T) => void;
  /** 设置父节点的值 */
  setParentValue: (row: T, fieldName: IName, fieldValue: any) => void;
  /** 设置子节点列表的值 */
  setChildrenValue: (row: T, fieldName: IName, fieldValue: any) => void;
};

export default function useColumns<T extends IEntity<T>>(
  form: FormInstance,
  {
    columns: columnsProp,
    usingCustomActionColumn = false,
    name,
    uniqueKey,
    extraFieldNamesForSubmit,
    rowExpandable,
    rowExpandAutoAdd,
    addable = true,
    addItem,
    removeItem,
    setParentValue,
    setChildrenValue,
    Fields,
  }: IOptions<T>,
) {
  const getActionColumn = useCallback(() => {
    return {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      width: 120,
      render(_: unknown, row: T) {
        const removeNode = (
          <Popconfirm key="remove" title="您确认删除吗？" onConfirm={() => removeItem(row)}>
            <a>删除</a>
          </Popconfirm>
        );

        let nodes;
        if (rowExpandable?.(row)) {
          nodes = [
            <a key="add" onClick={() => addItem(row)} style={{ marginRight: 5 }}>
              新增
            </a>,
            removeNode,
          ];
        } else {
          nodes = removeNode;
        }

        return nodes;
      },
    };
  }, [addItem, removeItem, rowExpandable]);

  const renderExtraFields = useCallback(
    (fieldNamePrefix: any) => {
      return [uniqueKey, ...(extraFieldNamesForSubmit || []), '_vid'].map((extraFieldName) => {
        const name = [...fieldNamePrefix, extraFieldName];
        // @ts-ignore
        return <Input key={name.join('')} name={name} hidden required={false} />;
      });
    },
    [uniqueKey, extraFieldNamesForSubmit],
  );

  const columns = useMemo(() => {
    const fieldColumns = columnsProp.map((column, columnIndex) => {
      const {
        render: originRender,
        onChange: originOnChange,
        changeWithChildrenValue,
        linkCheckboxValue,
        key,
        fieldType,
        fieldProps = {},
        title,
        required,
        uniqued,
        inherit,
        ...rest
      } = column;

      let render;
      if (originRender) {
        render = originRender;
      } else if (fieldType) {
        const Field = Fields && Fields[fieldType] ? Fields[fieldType] : DefaultFields[fieldType];
        const placeholderPrefix = ['select', 'cascader'].includes(fieldType) ? '请选择' : '请输入';

        render = (_: unknown, row: T) => {
          if (inherit && row._parent) {
            return <div style={{ textAlign: 'center' }}>同上</div>;
          }

          const fieldNamePrefix: (string | number)[] = [name, ...(row.fieldNamePrefix || [])];
          const fieldName = [...fieldNamePrefix, key as string];
          const restFieldProps = typeof fieldProps === 'function' ? fieldProps(row) : fieldProps;

          if (
            uniqued &&
            (!restFieldProps.rules ||
              !restFieldProps.rules.length ||
              // @ts-ignore
              !restFieldProps.rules.some((rule) => rule._attachUniqued))
          ) {
            restFieldProps.rules = [
              ...(restFieldProps.rules || []),
              {
                validator: async (rule: any, value: any) => {
                  const rowValues = !row._parent
                    ? form.getFieldValue(name)
                    : form.getFieldValue([name, ...row._parent.childFieldNamePrefix]);
                  const filtered = (rowValues || []).filter((rowValue: T) => {
                    return rowValue[key!] === value;
                  });
                  if (filtered?.length > 1) {
                    throw new Error(`同一层级不能有相同的${title}`);
                  }
                },
                _attachUniqued: true,
              },
            ];
          }

          const fieldNode = (
            <Field
              placeholder={`${placeholderPrefix}${title}`}
              required={required}
              {...restFieldProps}
              key={fieldName.join('')}
              name={fieldName}
              label={title}
              onChange={() => {
                const value = form.getFieldValue(name) || [];
                const newValue = [...value];
                const rowValue = form.getFieldValue(fieldNamePrefix);
                const childrenName = [...(row.fieldNamePrefix || []), 'children'];

                // 如果可展开，满足展开条件时，自动添加一个子节点
                if (rowExpandable) {
                  const canExpand = rowExpandable(rowValue);
                  if (!canExpand) {
                    set(newValue, childrenName, undefined);
                    form.setFieldsValue({
                      [name]: newValue,
                    });
                  } else if (canExpand && rowExpandAutoAdd) {
                    const children = get(newValue, childrenName);
                    if (!children || !children?.length) addItem(row);
                  }
                }

                /**
                 * 获取同一层级各行节点的值
                 * @param fieldName
                 * @returns
                 */
                const getSameLevelValues = (fieldName?: IName) => {
                  const sameLevelNamePrefix = fieldNamePrefix.slice(0, fieldNamePrefix.length - 2);
                  if (sameLevelNamePrefix.length) {
                    const sameLevelRowValues = form.getFieldValue([
                      ...sameLevelNamePrefix,
                      'children',
                    ]);
                    return fieldName
                      ? sameLevelRowValues.map(
                          (rowValues: Record<string, any>) => rowValues[fieldName],
                        )
                      : sameLevelRowValues;
                  }
                };

                // 父节点变更，对子节点设置相同的值
                if (changeWithChildrenValue) {
                  const fieldValue = form.getFieldValue(fieldName);
                  setChildrenValue(row, key as string, fieldValue);
                }

                if (fieldType === 'checkbox' && linkCheckboxValue) {
                  // 父节点变更，对子节点设置相同的值
                  const fieldValue = form.getFieldValue(fieldName);
                  setChildrenValue(row, key as string, fieldValue);

                  const sameLevelCheckedValues = getSameLevelValues(key as IName);
                  if (
                    !!fieldValue ||
                    (!fieldValue && sameLevelCheckedValues.every((checked: boolean) => !checked))
                  )
                    setParentValue(row, key as string, fieldValue);
                }

                if (originOnChange) {
                  const fieldValue = form.getFieldValue(fieldName);
                  originOnChange(fieldName, fieldValue, {
                    form,
                    addChild: () => {
                      addItem(row);
                    },
                    remove: () => {
                      removeItem(row);
                    },
                    setChildrenValue: (fName: IName, fValue: any) =>
                      setChildrenValue(row, fName, fValue),
                    setParentValue: (fName: IName, fValue: any) =>
                      setParentValue(row, fName, fValue),
                    getSameLevelValues,
                  });
                }
              }}
              // onKeyUp={() => {
              //   // 若存在同名校验，强制校验全字段，以清除校验错误文案
              //   if (uniqued) {
              //     form.validateFields([name], { recursive: true });
              //   }
              // }}
              // validateTrigger={['onKeyUp', 'onMouseUp']}
            />
          );

          return !columnIndex ? [fieldNode, ...renderExtraFields(fieldNamePrefix)] : fieldNode;
        };
      }

      return {
        ...rest,
        /* @ts-ignore */
        title: required ? <div className="required">{title}</div> : title,
        key,
        dataIndex: key,
        render,
      };
    });

    if (usingCustomActionColumn || !addable) return fieldColumns;

    return addable ? [...fieldColumns, getActionColumn()] : fieldColumns;
  }, [
    form,
    columnsProp,
    usingCustomActionColumn,
    rowExpandable,
    renderExtraFields,
    getActionColumn,
    rowExpandAutoAdd,
    addItem,
    setParentValue,
    setChildrenValue,
  ]);

  return {
    columns,
  };
}
