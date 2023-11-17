"use strict";
const forEach = (treeNodes, callback, options) => {
    const { level = 0, childrenKey = 'children', parent, order = 'lrd', } = options !== null && options !== void 0 ? options : {};
    return treeNodes.forEach((treeNode, index) => {
        if (order == 'dlr')
            callback(treeNode, { level, index, parent });
        const children = treeNode[childrenKey];
        if (children === null || children === void 0 ? void 0 : children.length) {
            forEach(children, callback, {
                childrenKey,
                level: level + 1,
                parent: treeNode,
            });
        }
        if (order == 'lrd')
            callback(treeNode, { level, index, parent });
    });
};
const filter = (treeNodes, callback, options) => {
    const { childrenKey = 'children' } = options || {};
    const filteredTreeNodes = [];
    const internalFilter = (nodes, result) => {
        forEach(nodes, (node) => {
            // 遍历子节点
            const children = node[childrenKey];
            if (children === null || children === void 0 ? void 0 : children.length) {
                const filteredChildren = [];
                internalFilter(children, filteredChildren);
                if (!filteredChildren.length) {
                    // dfs 前置条件满足就不往下递归
                    if (callback(node)) {
                        result.push(Object.assign(Object.assign({}, node), { [childrenKey]: node[childrenKey] === null ? null : undefined }));
                    }
                    return;
                }
                return result.push(Object.assign(Object.assign({}, node), { [childrenKey]: filteredChildren }));
            }
            // dfs 前置条件满足就不往下递归
            if (callback(node)) {
                result.push(Object.assign(Object.assign({}, node), { [childrenKey]: node[childrenKey] === null ? null : undefined }));
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
//# sourceMappingURL=TreeTest.js.map