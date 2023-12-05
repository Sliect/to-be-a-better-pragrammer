import { useState, useRef } from 'react';
import { Item } from './types';

const useList = (opts?: {
  initialDataSource?: Item[];
  onChange?: (dataSource: Item[]) => void;
  onAddOrRemove?: () => void;
}) => {
  const { initialDataSource = [{}], onChange, onAddOrRemove } = opts || {};
  const [dataSource, setDataSource] = useState<Item[]>(initialDataSource);
  const countRef = useRef<number>(0);

  const add = (item?: Item) => {
    dataSource.push(item || {});
    changeDataSource([...dataSource]);
    onAddOrRemove && onAddOrRemove();
  };

  const remove = (item?: Item | number) => {
    countRef.current = countRef.current + 1;
    if ( typeof item === 'number' ){
      dataSource.splice(item, 1);
      changeDataSource([...dataSource]);
    } else {
      const newDataSource = dataSource.filter(it => item !== it);
      changeDataSource(newDataSource);
    };
    onAddOrRemove && onAddOrRemove();
  };

  const changeDataSource = (newDataSource: Item[]) => {
    setDataSource(newDataSource);
    onChange && onChange(newDataSource);
  }

  return {
    dataSource,
    setDataSource: changeDataSource,
    add,
    remove,
    mainKey: countRef.current,
  }
}

export default useList;