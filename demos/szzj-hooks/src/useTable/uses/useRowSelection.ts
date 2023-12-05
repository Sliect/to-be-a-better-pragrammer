import { useState } from 'react';
import { Table } from '../types';

/**
 * 添加复选框功能
 * @param table
 */
const useRowSelection = <R>(table: Table<R>, enableRowSelection?: boolean) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  if (!enableRowSelection) return;

  const onSelectionChange = (selectedRowKeys: string[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  table.props.rowSelection = {
    selectedRowKeys,
    // @ts-ignore
    onChange: onSelectionChange,
  };

  table.getSelectedRowKeys = () => {
    return selectedRowKeys;
  };

  table.clearSelectedRowKeys = () => {
    setSelectedRowKeys([]);
  };

  const originSearch = table.search;
  table.search = (...args: any[]) => {
    table.clearSelectedRowKeys && table.clearSelectedRowKeys();
    return originSearch(...args);
  };

  const originResearch = table.research;
  table.research = (...args: any[]) => {
    table.clearSelectedRowKeys && table.clearSelectedRowKeys();
    return originResearch(...args);
  };

  const originReset = table.reset;
  table.reset = () => {
    table.clearSelectedRowKeys && table.clearSelectedRowKeys();
    return originReset();
  };
};

export default useRowSelection;
