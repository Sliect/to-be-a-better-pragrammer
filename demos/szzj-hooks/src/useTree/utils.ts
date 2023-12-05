import * as logger from '../logger';

import type { TreeNode, Key } from './types';

export type ForEachCallback<T> = (
  treeNode: T,
  options: {
    level: number;
    index: number;
    parent?: T;
  },
) => void;

/**
 * 节点遍历，使用 callback 进行处理
 */
export const forEach = <T extends TreeNode>(
  treeNodes: T[],
  callback: ForEachCallback<T>,
  options?: {
    /** children 键 */
    childrenKey?: string;
    /** 层级 */
    level?: number;
    /** 父节点 */
    parent?: T;
    /** 前序遍历，后序遍历，默认采用后序遍历 */
    order?: 'dlr' | 'lrd';
  },
) => {
  const { level = 0, childrenKey = 'children', parent, order = 'lrd' } = options ?? {};

  return treeNodes.forEach((treeNode, index) => {
    if (order == 'dlr') callback(treeNode, { level, index, parent });

    const children = treeNode[childrenKey];
    if (children?.length) {
      forEach(children, callback, {
        childrenKey,
        level: level + 1,
        parent: treeNode,
      });
    }

    if (order == 'lrd') callback(treeNode, { level, index, parent });
  });
};

export type MapCallback<T> = (
  treeNode: T,
  options: {
    level: number;
    index: number;
    parent?: T;
  },
) => T;

/**
 * 节点遍历，使用 callback 进行转换
 */
export const map = <T extends TreeNode>(
  treeNodes: T[],
  callback: MapCallback<T>,
  options?: {
    /** children 键 */
    childrenKey?: string;
    /** 层级 */
    level?: number;
    /** 父节点 */
    parent?: T;
  },
): T[] => {
  const { level = 0, childrenKey = 'children', parent } = options ?? {};

  return treeNodes.map((treeNode, index) => {
    const children = treeNode[childrenKey];
    if (children?.length) {
      const treeNodeWithOutChildren = {} as T;
      Object.keys(treeNode).forEach((key) => {
        // @ts-ignore
        if (key !== childrenKey) treeNodeWithOutChildren[key] = treeNode[key];
      });

      const convertedTreeNode = callback(treeNodeWithOutChildren, { level, index, parent });

      return {
        ...convertedTreeNode,
        [childrenKey]: map(children, callback, {
          childrenKey,
          level: level + 1,
          parent: treeNode,
        }),
      };
    }

    return callback(treeNode, { level, index, parent });
  });
};

/**
 * 节点过滤
 * @param treeNodes
 * @param callback
 * @param options
 * @returns
 */
export const filter = <T extends TreeNode>(
  treeNodes: T[],
  callback: (treeNode: T) => boolean,
  options?: {
    childrenKey: string;
  },
): T[] => {
  const { childrenKey = 'children' } = options || {};

  const filteredTreeNodes: T[] = [];

  const internalFilter = (nodes: T[], result: T[]) => {
    nodes.forEach((node) => {
      // 遍历子节点
      const children = node[childrenKey];
      if (children?.length) {
        const filteredChildren: T[] = [];
        internalFilter(children, filteredChildren);

        if (!filteredChildren.length) {
          if (callback(node)) {
            result.push({
              ...node,
              [childrenKey]: node[childrenKey] === null ? null : undefined,
            });
          }
          return;
        }

        return result.push({
          ...node,
          [childrenKey]: filteredChildren,
        });
      }

      if (callback(node)) {
        return result.push({
          ...node,
          [childrenKey]: node[childrenKey] === null ? null : undefined,
        });
      }
    });
  };

  internalFilter(treeNodes, filteredTreeNodes);

  return filteredTreeNodes;
};

/**
 * 扁平化成一维数组
 * @param treeNodes
 * @param options
 * @returns
 */
export const toArray = <T extends TreeNode>(
  treeNodes: T[],
  options?: {
    /** 唯一键属性名 */
    uniqueKey?: string;
    /** 层级属性名，从 1 开始计数 */
    levelKey?: string;
    /** 父节点属性名 */
    parentKey?: string;
    /** 子节点属性名 */
    childrenKey?: string;
    /** 层级从几开始计算 */
    beginingLevel?: number;
  },
) => {
  const {
    uniqueKey = 'key',
    levelKey = 'level',
    childrenKey = 'children',
    parentKey = 'parentKey',
    beginingLevel = 1,
  } = options ?? {};
  const result: T[] = [];
  forEach(
    treeNodes,
    (treeNode: T, { parent, level: levelFromZero }) => {
      if (!(uniqueKey in treeNode)) {
        logger.fail('please check unique key!');
      }

      // @ts-ignore
      treeNode[levelKey] = levelFromZero + beginingLevel;
      if (levelFromZero !== 0) {
        // @ts-ignore
        treeNode[parentKey] = parent?.[uniqueKey];
      }

      result.push(treeNode);
    },
    { childrenKey, order: 'dlr' },
  );

  return result;
};

/**
 * 扁平化成映射
 * @param treeNodes
 * @param options
 * @returns
 */
export const toMap = <T extends TreeNode>(
  treeNodes: T[],
  options?: {
    /** 唯一键属性名 */
    uniqueKey?: string;
    /** 层级属性名，从 1 开始计数 */
    levelKey?: string;
    /** 父节点属性名 */
    parentKey?: string;
    /** 子节点属性名 */
    childrenKey?: string;
    /** 层级从几开始计算 */
    beginingLevel?: number;
  },
) => {
  const {
    uniqueKey = 'key',
    levelKey = 'level',
    childrenKey = 'children',
    parentKey = 'parentKey',
    beginingLevel = 1,
  } = options ?? {};

  const result: Record<Key, T> = {};
  forEach(
    treeNodes,
    (treeNode, { parent, level: levelFromZero }) => {
      if (!(uniqueKey in treeNode)) {
        logger.fail('please check unique key!');
      }

      if (result[treeNode[uniqueKey]]) {
        logger.fail('some tree-node has same unique key!');
      }

      // @ts-ignore
      treeNode[levelKey] = levelFromZero + beginingLevel;
      if (levelFromZero !== 0) {
        // @ts-ignore
        treeNode[parentKey] = parent?.[uniqueKey];
      }

      result[treeNode[uniqueKey]] = treeNode;
    },
    {
      childrenKey,
    },
  );

  return result;
};

/**
 * 树节点交换顺序
 * @todo 可优化性能
 * @param treeNodes
 * @param options
 * @returns
 */
export const exchange = <T extends TreeNode>(
  treeNodes: T[],
  targetNode: T,
  sourceNode: T,
  options?: {
    /** 唯一键属性名 */
    uniqueKey?: string;
    /** 层级属性名，从 1 开始计数 */
    levelKey?: string;
    /** 子节点属性名 */
    childrenKey?: string;
  },
) => {
  const { uniqueKey = 'key', levelKey = 'level', childrenKey = 'children' } = options ?? {};

  if (
    levelKey in targetNode &&
    levelKey in sourceNode &&
    targetNode[levelKey] !== sourceNode[levelKey]
  ) {
    logger.fail('only support nodes that have same parent');
    return;
  }

  const convert = (nodes: T[]) => {
    return nodes.map((node) => {
      if (node[uniqueKey] === targetNode[uniqueKey]) {
        return sourceNode;
      } else if (node[uniqueKey] === sourceNode[uniqueKey]) {
        return targetNode;
      } else {
        return node;
      }
    });
  };

  let result: T[] = [];
  forEach(
    treeNodes,
    (treeNode, { parent }) => {
      const siblings = parent?.[childrenKey] ?? treeNodes;

      const hasTarget = treeNode[uniqueKey] === targetNode[uniqueKey];
      const hasSource = siblings.some((node) => node[uniqueKey] === targetNode[uniqueKey]);

      if (hasTarget !== hasSource) {
        logger.fail('only support nodes that have same parent');
        return;
      }

      if (hasTarget && hasSource) {
        if (parent) {
          // @ts-ignore
          parent[childrenKey] = convert(parent[childrenKey]);
          result = treeNodes;
        } else {
          result = convert(treeNodes);
        }
      }
    },
    {
      childrenKey,
      order: 'dlr',
    },
  );

  return result;
};
