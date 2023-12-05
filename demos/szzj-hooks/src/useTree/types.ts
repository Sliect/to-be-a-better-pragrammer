/**
 * 树节点
 */
export type TreeNode = {
  [key: string]: any;
};

/**
 * 唯一键值类型
 */
export type Key = string | number;

/**
 * 选项
 */
export interface Options<T extends TreeNode> {
  /** 唯一键属性名 */
  uniqueKey?: string;
  /** 层级属性名，从 1 开始计数 */
  levelKey?: string;
  /** 层级从几开始计算 */
  beginingLevel?: number;
  /** 父节点属性名 */
  parentKey?: string;
  /** 子节点属性名 */
  childrenKey?: string;
  /** 节点新增时回调 */
  onAdd?: (targetNode: T, parentNode?: T) => void;
  /** 节点后插入回调 */
  onInsertAfter?: (sourceNode: T, targetNode: T) => void;
  /** 节点替换时回调，不能替换 uniqueKey、levelKey、parentKey、childrenKey 等关键属性 */
  onReplace?: (targetNode: T) => void;
  /** 节点删除时回调 */
  onRemove?: (removedKeys: Key[], removedNodes: T[], node: T) => void;
}
