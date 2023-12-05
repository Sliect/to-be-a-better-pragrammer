import { useCallback, useMemo } from 'react';
import * as logger from '../../logger';
import * as utils from './../utils';

import type { TreeNode, Options, Key } from '../types';

/**
 * 查询
 */
const useFind = <T extends TreeNode>(treeNodes: T[], options?: Options<T>) => {
  const { uniqueKey = 'key', childrenKey = 'children', parentKey = 'parentKey' } = options ?? {};

  const treeNodeMap = useMemo(() => {
    const result = {};

    utils.forEach(
      treeNodes,
      (node) => {
        result[node[uniqueKey]] = node;
      },
      {
        childrenKey,
      },
    );

    return result;
  }, [treeNodes]);

  /** 通过 key 判断节点是否存在 */
  const hasNode = useCallback(
    (key: Key) => {
      return !!treeNodeMap[key];
    },
    [treeNodeMap],
  );

  /** 通过 key 获取节点 */
  const findNode = useCallback(
    (key: Key) => {
      return treeNodeMap[key];
    },
    [treeNodeMap],
  );

  /** 通过匹配条件获取节点 */
  const findBy = useCallback(
    (cb: (node: T) => boolean) => {
      return Object.keys(treeNodeMap).find((key) => cb(treeNodeMap[key]));
    },
    [treeNodeMap],
  );

  /** 获取父节点 */
  const findParent = useCallback(
    (node: T) => {
      const parentUniqueKey = node[parentKey];
      return parentUniqueKey ? findNode(parentUniqueKey) : undefined;
    },
    [parentKey, findNode],
  );

  /** 获取同一层级元素，包含自身 */
  const findSiblingsIncludeSelf = useCallback(
    (node: T) => {
      const parent = findParent(node);
      return parent ? parent[childrenKey] : treeNodes;
    },
    [findParent, treeNodes],
  );

  /** 获取祖先节点 */
  const findAncestorNodes = useCallback(
    (key: Key) => {
      if (!parentKey) {
        logger.fail('please config parentKey for getAncestorNodesByKey!');
      }

      const result: T[] = [];
      const currentNode = findNode(key);

      const getParent = (node: T) => {
        const parentUniqueKey = node[parentKey];
        const parentNode = parentUniqueKey ? findNode(parentUniqueKey) : undefined;

        if (parentNode) {
          result.push(parentNode);
          getParent(parentNode);
        }
      };

      if (currentNode) getParent(currentNode);

      return result;
    },
    [findNode],
  );

  /** 获取子孙节点 */
  const findPosterityNodesByKey = useCallback(
    (key: Key) => {
      const result: T[] = [];
      const node = findNode(key);
      const getChildNodes = (n: T) => {
        n[childrenKey]?.map((childNode: T) => {
          result.push(childNode);
          getChildNodes(childNode);
        });
      };

      if (node) getChildNodes(node);
      return result;
    },
    [findNode],
  );

  /** 找到节点在同一层级元素中的索引 */
  const findIndex = useCallback(
    (node: T) => {
      const siblings = findSiblingsIncludeSelf(node);
      return siblings.findIndex((child: T) => node[uniqueKey] == child[uniqueKey]);
    },
    [findSiblingsIncludeSelf],
  );

  return {
    treeNodeMap,
    hasNode,
    findNode,
    findBy,
    findParent,
    findAncestorNodes,
    findSiblingsIncludeSelf,
    findPosterityNodesByKey,
    findIndex,
  };
};

export default useFind;
