"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = exports.breathFirstSearch = void 0;
const nodes = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    { title: '0-0-0-0', key: '0-0-0-0' },
                    { title: '0-0-0-1', key: '0-0-0-1' },
                    { title: '0-0-0-2', key: '0-0-0-2' },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    { title: '0-0-1-0', key: '0-0-1-0' },
                    { title: '0-0-1-1', key: '0-0-1-1' },
                    { title: '0-0-1-2', key: '0-0-1-2' },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];
const nodes2 = [
    {
        title: '0-0',
        key2: '0-0',
        children2: [
            {
                title: '0-0-0',
                key2: '0-0-0',
                children2: [
                    { title: '0-0-0-0', key2: '0-0-0-0' },
                    { title: '0-0-0-1', key2: '0-0-0-1' },
                    { title: '0-0-0-2', key2: '0-0-0-2' },
                ],
            },
            {
                title: '0-0-1',
                key2: '0-0-1',
                children2: [
                    { title: '0-0-1-0', key2: '0-0-1-0' },
                    { title: '0-0-1-1', key2: '0-0-1-1' },
                    { title: '0-0-1-2', key2: '0-0-1-2' },
                ],
            },
            {
                title: '0-0-2',
                key2: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key2: '0-1',
        children2: [
            { title: '0-1-0-0', key2: '0-1-0-0' },
            { title: '0-1-0-1', key2: '0-1-0-1' },
            { title: '0-1-0-2', key2: '0-1-0-2' },
        ],
    },
    {
        title: '0-2',
        key2: '0-2',
    },
];
// 新增一个幽灵根节点，便于操作第一层的节点
const root = Symbol('ghostRoot');
function breathFirstSearch(list, cb, opts) {
    const queue = [...list];
    const rootNode = new TreeNode(root, opts);
    rootNode.source = list;
    const parentQueue = list.map(() => rootNode);
    const childrenKey = opts.childrenKey;
    while (queue.length) {
        let top = queue.shift();
        let parent = parentQueue.length ? parentQueue.shift() : null;
        // 生成 TreeNode
        let treeNode;
        if (top instanceof TreeNode) {
            treeNode = top;
        }
        else if (top) {
            treeNode = new TreeNode(top, opts);
            top._instance = treeNode;
        }
        treeNode.parent = parent;
        // 幽灵根节点
        if (parent === rootNode) {
            const res = (parent === null || parent === void 0 ? void 0 : parent.children) || [];
            res.push(treeNode);
            parent.children = res;
        }
        cb(treeNode, parent);
        const children = (top === null || top === void 0 ? void 0 : top[childrenKey]) || [];
        for (let i = 0; i < (children === null || children === void 0 ? void 0 : children.length); i++) {
            queue.push(children[i]);
            parentQueue.push(treeNode);
        }
    }
}
exports.breathFirstSearch = breathFirstSearch;
class Tree {
    constructor(data, opts = {
        uniqKey: 'key',
        childrenKey: 'children',
    }) {
        this.cacheMap = new Map();
        this.key = opts.uniqKey;
        this.childrenKey = opts.childrenKey;
        const self = this;
        // 初始化 TreeNode
        breathFirstSearch(data, (curr, parent) => {
            self.cacheMap.set(curr.data[this.key], curr);
        }, opts);
    }
    get length() {
        return this.cacheMap.size;
    }
    findNodeByKey(key) {
        return this.cacheMap.get(key);
    }
    hasNode(key) {
        return this.cacheMap.has(key);
    }
    findParent(key) {
        if (!this.cacheMap.get(key)) {
            throw 'the key is not existed';
        }
        return this.cacheMap.get(key).parent;
    }
    findSiblingsIncludeSelf(key) {
        const n = this.findParent(key);
        return n.children;
    }
    findPath(key) {
        let curr = this.findNodeByKey(key);
        const res = [];
        while (curr && curr.data !== root) {
            res.unshift(curr);
            curr = curr.parent;
        }
        return res;
    }
    /** 获取子孙节点 */
    findPosterityNodesByKey(key) {
        const result = [];
        const node = this.findNodeByKey(key);
        const traverse = (n) => {
            (n.children || []).forEach((child) => {
                result.push(child);
                traverse(child);
            });
        };
        if (node)
            traverse(node);
        return result;
    }
    /** 找到节点在同一层级元素中的索引 */
    findIndex(key) {
        const arr = this.findSiblingsIncludeSelf(key);
        return arr.map((it) => it.key).indexOf(key);
    }
    /** 获取所有叶子节点 */
    findLeafNodesByKey(key) {
        const node = this.findNodeByKey(key);
        const subTree = new Tree([node.data], {
            uniqKey: this.key,
            childrenKey: this.childrenKey,
        });
        const res = [];
        subTree.cacheMap.forEach((node) => {
            node.isLeaf && res.push(node);
        });
        return res;
    }
    /** 获取第一层级的所有节点 */
    findFirstLevelNodes() {
        return this.filter((node) => { var _a; return ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.data) === root; });
    }
    /** 返回map */
    toMap() {
        return this.cacheMap;
    }
    /** 返回array */
    toArray() {
        return Array.from(this.cacheMap).map((arr) => arr[1]);
    }
    forEach(iteratee) {
        return this.toArray().forEach(iteratee);
    }
    filter(iteratee) {
        return this.toArray().filter(iteratee);
    }
    map(iteratee) {
        return this.toArray().map(iteratee);
    }
    generateSubTree(nodeData) {
        const subTree = new Tree(nodeData, {
            uniqKey: this.key,
            childrenKey: this.childrenKey,
        });
        // 确保 key 唯一
        let isSomeNodeNotUniq = false;
        subTree.cacheMap.forEach((_, key) => {
            if (this.cacheMap.has(key)) {
                isSomeNodeNotUniq = true;
            }
        });
        if (isSomeNodeNotUniq) {
            throw 'there are duplicate keys';
        }
        return subTree;
    }
    // 往叶子节点添加树
    appendToLeafNode(key, childrenData) {
        const node = this.findNodeByKey(key);
        if (childrenData && Array.isArray(childrenData)) {
            const subTree = this.generateSubTree(childrenData);
            const self = this;
            // 更新 data
            node.data[this.childrenKey] = childrenData;
            // 更新 cacheMap
            subTree.cacheMap.forEach((it, key) => {
                self.cacheMap.set(key, it);
            });
            // 更新两棵树之间的父子关系
            node.children = subTree.findFirstLevelNodes();
            node.children.forEach((it) => {
                it.parent = node;
            });
        }
        else {
            throw 'please input correct childrenData';
        }
    }
    /** 在对应节点后插入一个树节点 */
    insertAfter(key, nodeData) {
        const node = this.findNodeByKey(key);
        if (!node) {
            throw 'the key is not existed';
        }
        const subTree = this.generateSubTree([nodeData]);
        const self = this;
        const parentNode = node.parent;
        // 更新 data 和 children
        const i = this.findIndex(key);
        // 第一层的节点要特殊处理
        if (parentNode.data !== root) {
            const dataArr = parentNode.data[this.childrenKey] || [];
            dataArr.splice(i + 1, 0, nodeData);
            const childrenArr = parentNode.children;
            childrenArr.splice(i + 1, 0, subTree.findFirstLevelNodes()[0]);
        }
        else {
            const dataArr = parentNode.source;
            dataArr.splice(i + 1, 0, nodeData);
            const childrenArr = parentNode.children;
            childrenArr.splice(i + 1, 0, subTree.findFirstLevelNodes()[0]);
        }
        // 更新 cacheMap
        subTree.cacheMap.forEach((it, key) => {
            self.cacheMap.set(key, it);
        });
        // 更新两棵树之间的父子关系
        const subFirstLevelNodes = subTree.findFirstLevelNodes();
        subFirstLevelNodes.forEach((it) => {
            it.parent = parentNode;
        });
    }
    /** 父节点下作为尾部节点插入 */
    append(key, nodeData) {
        const node = this.findNodeByKey(key);
        if (!node) {
            throw 'the key is not existed';
        }
        const subTree = this.generateSubTree([nodeData]);
        const self = this;
        // 更新 data
        const dataArr = node.data[this.childrenKey] || [];
        dataArr.push(nodeData);
        node.data[this.childrenKey] = dataArr;
        // 更新 cacheMap
        subTree.cacheMap.forEach((it, key) => {
            self.cacheMap.set(key, it);
        });
        // 更新两棵树之间的父子关系
        const subFirstLevelNodes = subTree.findFirstLevelNodes();
        node.children = subFirstLevelNodes;
        subFirstLevelNodes.forEach((it) => {
            it.parent = node;
        });
    }
    /** 父节点下作为头部节点插入 */
    prepend(key, nodeData) {
        const node = this.findNodeByKey(key);
        if (!node) {
            throw 'the key is not existed';
        }
        const subTree = this.generateSubTree([nodeData]);
        const self = this;
        // 更新 children
        const dataArr = node.data[this.childrenKey] || [];
        dataArr.unshift(nodeData);
        // 更新 cacheMap
        subTree.cacheMap.forEach((it, key) => {
            self.cacheMap.set(key, it);
        });
        // 更新两棵树之间的父子关系
        const subFirstLevelNodes = subTree.findFirstLevelNodes();
        subFirstLevelNodes.forEach((it) => {
            it.parent = node;
        });
    }
    /** 同层交互节点 */
    exchange(aKey, bKey) {
        if (!this.cacheMap.has(aKey) || !this.cacheMap.has(bKey)) {
            throw 'the key is not existed';
        }
        const children = this.findSiblingsIncludeSelf(aKey);
        const keys = children.map((it) => it.key);
        if (!keys.includes(bKey)) {
            throw 'they are not sibling nodes';
        }
        const aNode = this.findNodeByKey(aKey);
        const parentNode = aNode.parent;
        // 更新 data 和 children 顺序
        const i = keys.indexOf(aKey);
        const j = keys.indexOf(bKey);
        // 第一层的节点要特殊处理
        if (parentNode.data !== root) {
            const dataArr = parentNode.data[this.childrenKey];
            dataArr[i] = dataArr[j];
            dataArr[j] = aNode.data;
            parentNode.data[this.childrenKey] = dataArr;
            const childrenArr = parentNode.children;
            childrenArr[i] = childrenArr[j];
            childrenArr[j] = aNode;
        }
        else {
            const dataArr = parentNode.source;
            dataArr[i] = dataArr[j];
            dataArr[j] = aNode.data;
            parentNode.source = dataArr;
            const childrenArr = parentNode.children;
            childrenArr[i] = childrenArr[j];
            childrenArr[j] = aNode;
        }
    }
    /** 删除节点 */
    remove(key) {
        if (!this.cacheMap.has(key)) {
            throw 'the key is not existed';
        }
        const node = this.findNodeByKey(key);
        const parentNode = node.parent;
        if (parentNode) {
            const keys = this.findPosterityNodesByKey(key);
            // 更新 data
            const i = this.findIndex(key);
            if (parentNode.data[this.childrenKey]) {
                parentNode.data[this.childrenKey].splice(i, 1);
            }
            // 更新 cacheMap
            this.cacheMap.delete(key);
            const self = this;
            keys.forEach((n) => {
                self.cacheMap.delete(n.key);
            });
            // 更新 parentNode.children
            parentNode.children.splice(i, 1);
        }
    }
}
exports.Tree = Tree;
class TreeNode {
    constructor(data, opts = {
        uniqKey: 'key',
        childrenKey: 'children',
    }) {
        this.data = data;
        if (data !== root) {
            this.data._instance = this;
        }
        this._key = opts.uniqKey;
        this._childrenKey = opts.childrenKey;
    }
    get children() {
        if (this.data[this._childrenKey]) {
            return this.data[this._childrenKey].map((it) => it._instance);
        }
        return this._children;
    }
    set children(newArr) {
        if (Array.isArray(newArr)) {
            if (this.data !== root) {
                this.data[this._childrenKey] = newArr.map((it) => it.data);
            }
            else {
                this.source = newArr.map((it) => it.data);
            }
            this._children = newArr;
        }
        else {
            throw "TreeNode's children need to be set array";
        }
    }
    get key() {
        return this.data[this._key];
    }
    get isLeaf() {
        var _a;
        return !((_a = this.children) === null || _a === void 0 ? void 0 : _a.length);
    }
}
const tree = new Tree(JSON.parse(JSON.stringify(nodes2)), {
    uniqKey: 'key2',
    childrenKey: 'children2',
});
tree.prepend('0-2', { title: '0-2-1', key2: '0-2-1' });
const arr = tree.findSiblingsIncludeSelf('0-2-1');
console.log(arr);
//# sourceMappingURL=TreeUtils.js.map