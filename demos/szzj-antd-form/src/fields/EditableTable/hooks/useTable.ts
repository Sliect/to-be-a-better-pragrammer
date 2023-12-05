import { useMemo, useState, useCallback } from 'react';

import type { IEntity, IRowKey } from '../types';

/**
 * 持有父节点引用
 * @param nodes
 * @param parent
 */
const traverse = <T extends IEntity<T>>(nodes: T[], parent: T | null): T[] => {
  return (nodes || []).map((node, index) => {
    const prefix =
      parent && parent.childFieldNamePrefix ? [...parent.childFieldNamePrefix, index] : [index];

    const convertedNode = {
      ...node,
      _parent: parent,
      fieldNamePrefix: prefix,
      childFieldNamePrefix: [...prefix, 'children'],
    };

    return {
      ...convertedNode,
      children: convertedNode.children
        ? traverse(convertedNode.children, convertedNode)
        : undefined,
    };
  });
};

export default function useTable<T extends IEntity<T>>({
  value,
  uniqueKey,
  rowKey: rowKeyProp,
}: {
  value?: T[];
  uniqueKey: string;
  rowKey?: IRowKey<T>;
}) {
  const dataSource: any[] = useMemo(() => {
    return value ? traverse(value, null) : [];
  }, [value]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [expandedKeys, setExpandedKeys] = useState([]);

  const rowKey = useMemo(() => {
    return typeof rowKeyProp === 'function'
      ? rowKeyProp
      : (row: T) => {
          return row[uniqueKey] || row._vid;
        };
  }, [rowKeyProp, uniqueKey]);

  const expandRow = useCallback(
    (expanded: boolean, row: T) => {
      let result = [...expandedKeys];
      const key = rowKey(row);

      if (expanded) {
        // @ts-ignore
        if (!result.includes(key)) result.push(key);
      } else {
        result = result.filter((k) => k !== key);
      }

      setExpandedKeys(result);
    },
    [expandedKeys, rowKey],
  );

  return {
    dataSource,
    rowKey,
    pagination,
    setPagination,
    expandedKeys,
    onExpand: expandRow,
    expandRow,
  };
}
