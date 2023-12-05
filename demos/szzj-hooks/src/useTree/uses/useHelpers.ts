import { useCallback } from 'react';
import * as utils from './../utils';

import type { ForEachCallback, MapCallback } from '../utils';
import type { TreeNode, Options } from '../types';

/**
 * 工具函数
 */
const useHelpers = <T extends TreeNode>(options?: Options<T>) => {
  const {
    uniqueKey = 'key',
    levelKey = 'level',
    childrenKey = 'children',
    parentKey = 'parentKey',
  } = options ?? {};

  const forEach = useCallback(
    (treeNodes: T[], callback: ForEachCallback<T>, opts?: { order?: 'dlr' | 'lrd' }) => {
      return utils.forEach(treeNodes, callback, {
        childrenKey,
        ...opts,
      });
    },
    [],
  );

  const map = useCallback((treeNodes: T[], callback: MapCallback<T>) => {
    return utils.map(treeNodes, callback, { childrenKey });
  }, []);

  const filter = useCallback((treeNodes: T[], callback: (treeNode: T) => boolean) => {
    return utils.filter(treeNodes, callback, { childrenKey });
  }, []);

  const toArray = useCallback((treeNodes: T[]) => {
    return utils.toArray(treeNodes, { childrenKey });
  }, []);

  const toMap = useCallback((treeNodes: T[], options?: { beginingLevel: number }) => {
    return utils.toMap(treeNodes, {
      uniqueKey,
      levelKey,
      parentKey,
      childrenKey,
      beginingLevel: options?.beginingLevel,
    });
  }, []);

  return {
    forEach,
    map,
    filter,
    toArray,
    toMap,
  };
};

export default useHelpers;
