import { useState, useEffect, useCallback } from 'react';
import * as logger from '../logger';
import useHelpers from './uses/useHelpers';
import useFind from './uses/useFind';

import type { TreeNode, Options, Key } from './types';

/**
 * 不能修改的关键字
 */
const KEYWORDS = ['uniqueKey', 'levelKey', 'childrenKey', 'parentKey'];

/**
 * 树结构数据管理
 * @see http://10.145.11.75:8080/gui/szzj-hooks/#/guide/use-tree
 * @todo immer.js 只读返回，以免节点引用变更
 * @todo 接口表现上，key 和 node 统一
 * @param treeNodes 树节点列表
 * @param options options.uniqueKey 唯一键属性名
 * @param options options.levelKey 层级属性名，从 1 开始计数
 * @param options options.beginingLevel 层级从几开始计算，默认为 1
 * @param options options.parentKey 父节点属性名
 * @param options options.childrenKey 子节点属性名
 * @param options options.onAdd 节点新增时回调
 * @param options options.onInsertAfter 节点后插入回调
 * @param options options.onReplace 节点替换时回调，不能替换 uniqueKey、levelKey、parentKey、childrenKey 等关键属性
 * @param options options.onRemove 节点删除时回调
 */
const useTree = <T extends TreeNode>(initialTreeNodes: T[], options?: Options<T>) => {
  const {
    uniqueKey = 'key',
    levelKey = 'level',
    beginingLevel = 1,
    childrenKey = 'children',
    parentKey = 'parentKey',
    onAdd,
    onInsertAfter,
    onReplace,
    onRemove,
  } = options ?? {};
  const { forEach, map, filter, toArray, toMap } = useHelpers(options);
  // 内部表示，不同引用，附着 parentKey 及 level
  const [treeNodes, setTreeNodes] = useState<T[]>([]);

  /** 遍历添加 levelKey, parentKey */
  useEffect(() => {
    if (!initialTreeNodes?.length) return;

    const treeNodesAttachedParent = map(initialTreeNodes, (node: T, { level, parent }) => {
      return {
        ...node,
        [levelKey]: level + beginingLevel,
        [parentKey]: parent?.[uniqueKey],
      } as T;
    });

    setTreeNodes(treeNodesAttachedParent);
  }, [initialTreeNodes, beginingLevel, map]);

  const {
    treeNodeMap,
    hasNode,
    findNode,
    findParent,
    findAncestorNodes,
    findSiblingsIncludeSelf,
    findPosterityNodesByKey,
    findIndex,
  } = useFind(treeNodes, options);

  const _changeNodes = useCallback(
    (nodes: T[], parent?: T) => {
      let newTreeNodes: T[] = [];
      if (parent) {
        // @ts-ignore
        parent[childrenKey] = nodes.length ? [...nodes] : undefined;
        newTreeNodes = [...treeNodes];
      } else {
        newTreeNodes = [...nodes];
      }

      setTreeNodes(newTreeNodes);
    },
    [treeNodes],
  );

  /** 节点交换 */
  const exchange = useCallback(
    (sourceNode: T, targetNode: T) => {
      if (!hasNode(sourceNode[uniqueKey]) || !hasNode(targetNode[uniqueKey])) {
        logger.fail('cannot find node，please check');
        return;
      }

      const parent = findParent(sourceNode);
      const siblings = findSiblingsIncludeSelf(sourceNode);

      const newSiblings = siblings.map((sibling) => {
        if (sibling[uniqueKey] === sourceNode[uniqueKey]) return targetNode;
        else if (sibling[uniqueKey] === targetNode[uniqueKey]) return sourceNode;
        return sibling;
      });

      _changeNodes(newSiblings, parent);
    },
    [hasNode, uniqueKey, findParent, findSiblingsIncludeSelf, _changeNodes],
  );

  /** 节点上移 */
  const up = useCallback(
    (sourceNode: T) => {
      if (!hasNode(sourceNode[uniqueKey])) {
        logger.fail('cannot find node，please check');
        return;
      }

      const siblings = findSiblingsIncludeSelf(sourceNode);
      const index = findIndex(sourceNode);

      if (index > 0) {
        exchange(sourceNode, siblings[index - 1]);
      } else {
        logger.fail('index should more then 0');
      }
    },
    [hasNode, uniqueKey, findSiblingsIncludeSelf, findIndex, exchange],
  );

  /** 节点后移 */
  const down = useCallback(
    (sourceNode: T) => {
      if (!hasNode(sourceNode[uniqueKey])) {
        logger.fail('cannot find node，please check');
        return;
      }

      const siblings = findSiblingsIncludeSelf(sourceNode);
      const index = findIndex(sourceNode);

      if (index < siblings.length - 1) {
        exchange(sourceNode, siblings[index + 1]);
      } else {
        logger.fail("index should less then (nodes's length - 1)");
      }
    },
    [hasNode, uniqueKey, findSiblingsIncludeSelf, findIndex, exchange],
  );

  /** 指定节点后插入 */
  const insertAfter = useCallback(
    (sourceNode: T, targetKey: Key) => {
      if (findNode(sourceNode[uniqueKey])) {
        logger.fail('you should not insert node with same key!');
        return;
      }

      const targetNode = findNode(targetKey);
      const parent = findParent(targetNode);

      const subTreeMap = toMap([sourceNode], {
        beginingLevel: (parent?.level ?? 0) + 1,
      });

      const newNode = {
        ...subTreeMap[sourceNode[uniqueKey]],
        [parentKey]: parent?.[uniqueKey],
      };

      const siblings = findSiblingsIncludeSelf(targetNode);
      const index = findIndex(targetNode);
      siblings.splice(index + 1, 0, newNode);

      _changeNodes(siblings, parent);
      onInsertAfter?.(sourceNode, targetNode);
    },
    [findNode, findParent, toMap, findSiblingsIncludeSelf, findIndex, _changeNodes, onInsertAfter],
  );

  /** 父节点下作为尾部节点插入，支持子树 */
  const append = useCallback(
    (sourceNode: T, pKey?: Key) => {
      if (findNode(sourceNode[uniqueKey])) {
        logger.fail('you should not insert node with same key!');
        return;
      }

      const parent = pKey ? findNode(pKey) : undefined;

      const subTreeMap = toMap([sourceNode], {
        beginingLevel: (parent?.level ?? 0) + 1,
      });

      const newNode = {
        ...subTreeMap[sourceNode[uniqueKey]],
        [parentKey]: parent?.[uniqueKey],
      };

      const siblings = parent ? [...(parent[childrenKey] ?? []), newNode] : [...treeNodes, newNode];
      _changeNodes(siblings, parent);
      onAdd?.(newNode, parent);
    },
    [findNode, toMap, treeNodes, _changeNodes, onAdd],
  );

  /** 父节点下作为头部节点插入，支持子树 */
  const prepend = useCallback(
    (sourceNode: T, pKey?: Key) => {
      if (findNode(sourceNode[uniqueKey])) {
        logger.fail('you should not insert node with same key!');
        return;
      }

      const parent = pKey ? findNode(pKey) : undefined;

      const subTreeMap = toMap([sourceNode], {
        beginingLevel: (parent?.level ?? 0) + 1,
      });

      const newNode = {
        ...subTreeMap[sourceNode[uniqueKey]],
        [parentKey]: parent?.[uniqueKey],
      };

      const siblings = parent ? [newNode, ...(parent[childrenKey] ?? [])] : [newNode, ...treeNodes];
      _changeNodes(siblings, parent);
      onAdd?.(newNode, parent);
    },
    [findNode, toMap, treeNodes, _changeNodes, onAdd],
  );

  /** 替换节点 */
  const replace = useCallback(
    (likeNode: T) => {
      const targetNode = findNode(likeNode[uniqueKey]);
      const parent = findParent(targetNode);

      // 1. 构建新的节点
      const newNode = { ...targetNode };
      Object.keys(likeNode).forEach((key) => {
        if (!KEYWORDS.includes(key)) {
          // @ts-ignore
          newNode[key] = likeNode[key];
        }
      });

      const siblings = (parent?.[childrenKey] ?? treeNodes).map((childNode) => {
        if (childNode[uniqueKey] === newNode[uniqueKey]) return newNode;
        return childNode;
      });

      _changeNodes(siblings, parent);

      onReplace?.(newNode);
    },
    [findNode, findParent, treeNodes, _changeNodes, onReplace],
  );

  /** 删除节点 */
  const remove = useCallback(
    (key: Key) => {
      const sourceNode = findNode(key);
      const parent = findParent(sourceNode);

      const removedNodes: T[] = [];
      const removedKeys: string[] = [];
      forEach([sourceNode], (node) => {
        removedNodes.push(node);
        removedKeys.push(node[uniqueKey]);
      });

      const siblings = (parent?.[childrenKey] ?? treeNodes).filter((node) => {
        return node[uniqueKey] !== sourceNode[uniqueKey];
      });
      _changeNodes(siblings, parent);
      onRemove?.(removedKeys, removedNodes, sourceNode);
    },
    [findNode, findParent, forEach, treeNodes, _changeNodes, onRemove],
  );

  return {
    /** 节点树 */
    treeNodes,
    /** 节点映射 */
    treeNodeMap,
    /** 遍历节点 */
    forEach,
    /** 遍历转换节点 */
    map,
    /** 过滤节点 */
    filter,
    /** 扁平化成一维数组 */
    toArray,
    /** 扁平化成键值对映射 */
    toMap,
    /** 通过 key 获取节点 */
    findNode,
    /** 获取父节点 */
    findParent,
    /** 获取祖先节点 */
    findAncestorNodes,
    /** 获取同一层级元素，包含自身 */
    findSiblingsIncludeSelf,
    /** 数组形式获取子孙节点列表 */
    findPosterityNodesByKey,
    /** 找到节点在同一层级元素中的索引 */
    findIndex,
    /** 交换节点 */
    exchange,
    /** 节点上移 */
    up,
    /** 节点下移 */
    down,
    /** 在指定节点后插入 */
    insertAfter,
    /** 在指定节点下方插入，作为最后一个子节点 */
    append,
    /** 在指定节点下方插入，作为第一个子节点 */
    prepend,
    /** 替换节点 */
    replace,
    /** 移除节点 */
    remove,
  };
};

export default useTree;
