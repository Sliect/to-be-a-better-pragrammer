import React from 'react';
import { Transfer as AntdTransfer, Table } from 'antd';
import difference from 'lodash/difference';
import createField from '../../../createField';
import { TransferProps as AntdTransferProps } from 'antd/es/transfer';
import { TableProps, ColumnType } from 'antd/es/table';

type TableTransferProps = AntdTransferProps<any> & {
  leftColumns: ColumnType<any>;
  rightColumns: ColumnType<any>;
  tableProps?: TableProps<any>;
};

const TableTransfer: React.FC<TableTransferProps> = ({
  leftColumns,
  rightColumns,
  children,
  tableProps = {},
  ...rest
}) => {
  return (
    <AntdTransfer {...rest}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;

        const rowSelection = {
          getCheckboxProps: (item: any) => ({ disabled: listDisabled || item.disabled }),
          onSelectAll(selected: boolean, selectedRows: any[]) {
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }: { key: string }, selected: boolean) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <Table
            rowSelection={rowSelection}
            dataSource={filteredItems}
            size="small"
            // @ts-ignore
            style={{ pointerEvents: listDisabled ? 'none' : null }}
            {...tableProps}
            // @ts-ignore
            columns={columns}
            // @ts-ignore
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </AntdTransfer>
  );
};

export default createField<TableTransferProps>(TableTransfer, {
  defaultFormItemProps: {
    valuePropName: 'targetKeys',
  },
});
