type TreeNode = {
  [key: string]: any;
};

const forEach = <T extends TreeNode>(
  treeNodes: T[],
  callback,
  options?: {
    /** children 键 */
    childrenKey?: string;
    /** 层级 */
    level?: number;
    /** 父节点 */
    parent?: T;
    /** 前序遍历，后序遍历，默认采用后序遍历 */
    order?: 'dlr' | 'lrd';
  }
) => {
  const {
    level = 0,
    childrenKey = 'children',
    parent,
    order = 'lrd',
  } = options ?? {};

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

const filter = <T extends TreeNode>(
  treeNodes: T[],
  callback: (treeNode: T) => boolean,
  options?: {
    childrenKey: string;
  }
): T[] => {
  const { childrenKey = 'children' } = options || {};

  const filteredTreeNodes: T[] = [];

  const internalFilter = (nodes: T[], result: T[]) => {
    forEach(nodes, (node) => {
      // 遍历子节点
      const children = node[childrenKey];
      if (children?.length) {
        const filteredChildren: T[] = [];
        internalFilter(children, filteredChildren);

        if (!filteredChildren.length) {
          // dfs 前置条件满足就不往下递归
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

      // dfs 前置条件满足就不往下递归
      if (callback(node)) {
        result.push({
          ...node,
          [childrenKey]: node[childrenKey] === null ? null : undefined,
        });
        return;
      }
    });
  };

  internalFilter(treeNodes, filteredTreeNodes);

  return filteredTreeNodes;
};

const treeNodes = [
  {
    id: 1,
    label: '余杭',
    children: [
      {
        id: 2,
        label: '良渚',
        children: null,
      },
      {
        id: 3,
        label: '瓶窑',
        children: null,
      },
      {
        id: 4,
        label: '良好',
        children: [
          {
            id: 5,
            label: '善良',
            children: null,
          },
        ],
      },
    ],
  },
];
const res = filter(treeNodes, (node) => node.label.includes('良'));
console.log(res);
