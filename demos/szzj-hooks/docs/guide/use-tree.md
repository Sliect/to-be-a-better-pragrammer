---
title: useTree
order: 6
---

# useTree

处理树形数据。

## features

- 支持增删改查。
- 支持排序。

## usage

```jsx | pure
import { useTree } from '@szzj/hooks';

type TreeNode = {
  label: string,
  value: string,
  children?: TreeNode[],
};

const { treeNodes } =
  useTree <
  TreeNode >
  (initialTreeNodes,
  {
    uniqueKey: 'value',
  });
```

## demos

### 编辑

<code src="./use-tree/edit/index.tsx" />

### 排序

<code src="./use-tree/sort/index.tsx" />

## properties

useTree 参数。

| 属性 | 类型 | 默认值 | 意义 |
| :-- | :-: | --: | --: |
| initialTreeNodes | T[] | undefined | 树节点列表 |
| options | object | undefined | 选项 |
| options.uniqueKey | string | undefined | 唯一键属性名 |
| options.levelKey | string | undefined | 层级属性名，从 1 开始计数 |
| options.parentKey | string | undefined | 父节点属性名 |
| options.childrenKey | string | undefined | 子节点属性名 |
| options.onAdd | (targetNode: T, parentNode?: T) => void | undefined | 节点新增时回调 |
| options.onInsertAfter | (sourceNode: T, targetNode: T) => void | undefined | 节点后插入回调 |
| options.onReplace | (targetNode: T) => void | undefined | 节点替换时回调，不能替换 uniqueKey、levelKey、parentKey、childrenKey 等关键属性 |
| options.onRemove | (removedKeys: Key[], removedNodes: T[], node: T) => void | undefined | 节点删除时回调 |

## Apis

### findNode(uniqueKey)

通过 key 获取节点。

### findIndex(node)

找到节点在同一层级元素中的索引。

### findSiblingsIncludeSelf(node)

获取同一层级元素，包含自身。

### findParent(node)

获取父节点。

### findAncestorNodes(uniqueKey)

获取祖先节点。

### findPosterityNodesByKey(uniqueKey)

数组形式获取子孙节点列表。

### forEach(treeNodes, callback, opts?: { order?: 'dlr' | 'lrd' }))

遍历节点。

### map(treeNodes, callback)

遍历转换节点。

### filter(treeNodes, callback)

过滤节点。

### toArray(treeNodes, callback)

扁平化成一维数组。

### toMap(treeNodes, options?: { beginingLevel: number })

扁平化成键值对映射。

### exchange(sourceNode, targetNode)

交换节点。

### up(sourceNode)

节点上移。

### down(sourceNode)

节点下移。

### insertAfter(sourceNode, targetKey)

在指定节点后插入。

### append(sourceNode, parentKey)

在指定节点下方插入，作为最后一个子节点。

### prepend(sourceNode, parentKey)

在指定节点下方插入，作为第一个子节点。

### replace(node)

替换节点。

### remove(uniqueKey)

移除节点。
