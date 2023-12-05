import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { Table } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useValue from './hooks/useValue';
import useTable from './hooks/useTable';
import useColumns from './hooks/useColumns';
import DraggableBodyRow from './DraggableBodyRow';
import TopStoreInput from './TopStoreInput';

import type { IEditableTableProps, IEntity, IRef } from './types';

/**
 * 可编辑表格
 */
function EditableTable<T extends IEntity<T>>(
  {
    name,
    extraFieldNamesForSubmit,
    initialValue = [{ _vid: 0 }] as T[],
    columns: columnsProp,
    usingCustomActionColumn,
    value,
    form,
    uniqueKey = 'id',
    rowExpandable,
    dragable,
    addable = true,
    min,
    max,
    rowExpandMin,
    rowExpandMax,
    rowExpandAutoAdd,
    rowKey: rowKeyProp,
    validateRow,
    Fields,
    rules,
    ...rest
  }: IEditableTableProps<T>,
  ref: React.ForwardedRef<IRef<T>>,
) {
  const { dataSource, rowKey, expandedKeys, onExpand, expandRow } = useTable({
    value,
    uniqueKey,
    rowKey: rowKeyProp,
  });

  const {
    addItem,
    removeItem,
    moveItem,
    setParentValue,
    setChildrenValue,
    getValue,
    setValue,
  } = useValue(form, {
    name,
    initialValue,
    value,
    rowKey,
    min,
    max,
    rowExpandMin,
    rowExpandMax,
    expandRow,
  });

  const { columns } = useColumns(form, {
    columns: columnsProp,
    usingCustomActionColumn,
    name,
    uniqueKey,
    extraFieldNamesForSubmit,
    rowExpandable,
    addable,
    addItem,
    removeItem,
    setParentValue,
    setChildrenValue,
    rowExpandAutoAdd,
    Fields,
  });

  useImperativeHandle<IRef<T>, IRef<T>>(
    ref,
    () => ({
      addItem,
      removeItem,
      getValue,
      setValue,
    }),
    [addItem, removeItem, getValue, setValue],
  );

  const restProps = useMemo(() => {
    return {
      rowKey,
      expandable: {
        expandedRowKeys: expandedKeys,
      },
      onExpand,
      footer: () => (
        <TopStoreInput name={name} columns={columnsProp} rules={rules} validateRow={validateRow} />
      ),
    };
  }, [rowKey, expandedKeys, onExpand, name, columnsProp, validateRow, rest.pagination]);

  return (
    <div className="szzj-antd-form-editable-table">
      {dragable ? (
        <DndProvider backend={HTML5Backend}>
          <Table
            size="small"
            {...rest}
            columns={columns}
            dataSource={dataSource}
            {...restProps}
            components={{
              body: {
                row: DraggableBodyRow,
              },
            }}
            // @ts-ignore
            onRow={(row, index) => ({
              index,
              moveRow: (dragIndex: number, hoverIndex: number) =>
                moveItem(row, dragIndex, hoverIndex),
            })}
          />
        </DndProvider>
      ) : (
        <Table size="small" {...rest} columns={columns} dataSource={dataSource} {...restProps} />
      )}
    </div>
  );
}

export default forwardRef(EditableTable);
