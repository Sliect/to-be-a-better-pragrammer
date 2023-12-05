import { IRef, IEntity } from './fields/EditableTable/types';

export type Option = {
  label: string;
  value: string;
  options?: Option[];
};

/** EditableTable ref 设置 */
export type IEditableTableRef<T extends IEntity<T>> = IRef<T>;
