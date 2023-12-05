import { useState, useCallback } from 'react';
import { Options, List } from './types';

/**
 * 管理列表增删元素、交换树脂、移动位置、重新赋值操作
 * @param options options.onChange 列表数据变更回调
 * @param options options.defaultList 列表数据默认值
 * @returns list 列表数据
 * @returns edit 编辑一条数据
 * @returns add 添加一条数据
 * @returns remove 删除一条数据
 * @returns exchange 交换元素位置
 * @returns move 移动元素位置
 * @returns setList 设置列表数据
 */
const useList = <T>(options?: Options<T>): List<T> => {
  const { onChange, defaultList = [] } = options || ({} as Options<T>);
  const [list, setList] = useState<T[]>(defaultList);

  /**
   * 全量变更
   * @param item
   */
  const triggerChange = useCallback(
    (newList: T[]) => {
      setList(newList);
      if (onChange) onChange(newList);
    },
    [onChange],
  );

  /**
   * 编辑一项
   * @param item
   */
  const edit = useCallback(
    (predicate: (it: T) => boolean, item: T) => {
      const newList = list.map((it) => {
        if (predicate(it)) {
          return item;
        } else {
          return it;
        }
      });
      triggerChange(newList);
    },
    [list],
  );

  /**
   * 添加一项
   * @param item
   */
  const add = useCallback(
    (item: T) => {
      list.push(item);
      triggerChange([...list]);
    },
    [list],
  );

  /**
   * 删除一项
   * @param item
   */
  const remove = useCallback(
    (item: T | number) => {
      if (typeof item === 'number') {
        list.splice(item, 1);
        triggerChange([...list]);
      } else {
        const newList = list.filter((it) => item !== it);
        triggerChange(newList);
      }
    },
    [list],
  );

  /**
   * 交换位置
   * @param sourceIndex 源节点位置
   * @param targetIndex 目标位置
   */
  const exchange = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      const temp = list[sourceIndex];
      list[sourceIndex] = list[targetIndex];
      list[targetIndex] = temp;
      triggerChange([...list]);
    },
    [list],
  );

  /**
   * 移动
   * @param sourceIndex
   * @param targetIndex
   */
  const move = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      const source = list.splice(sourceIndex, 1)[0];
      if (sourceIndex < targetIndex) {
        // 下移
        list.splice(targetIndex, 0, source);
      } else {
        list.splice(targetIndex, 0, source);
      }

      triggerChange([...list]);
    },
    [list],
  );

  return {
    list,
    setList: triggerChange,
    edit,
    add,
    remove,
    exchange,
    move,
  };
};

export default useList;
