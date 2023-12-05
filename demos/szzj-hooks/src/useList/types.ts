export interface Options<T> {
  onChange?: (list: T[]) => void;
  defaultList?: T[];
}

export interface List<T> {
  list: T[];
  edit: (predicate: (it: T) => boolean, item: T) => void;
  add: (item: T) => void;
  remove: (item: T | number) => void;
  exchange: (sourceIndex: number, targetIndex: number) => void;
  move: (sourceIndex: number, targetIndex: number) => void;
  setList: (newList: T[]) => void;
}
