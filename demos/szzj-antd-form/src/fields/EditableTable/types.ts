import type { TableProps, ColumnGroupType, ColumnType } from 'antd/es/table';
import type { FormInstance, Rule } from 'antd/es/form';

/** 字段名 */
export type IName = string | number;

/** 实体 */
export type IEntity<T extends IEntity<T>> = {
  _vid?: number;
  _parent?: null | T;
  fieldName?: IName[];
  fieldNamePrefix?: IName[];
  children?: T[];
  [key: string]: any;
};

/** onChange 选项 */
export type IOnChangeOptions = {
  form: FormInstance;
  addChild: () => void;
  remove: () => void;
  setChildrenValue: (fieldName: IName, fieldValue: any) => void;
  setParentValue: (fieldName: IName, fieldValue: any) => void;
  getSameLevelValues: (fieldName?: IName) => any;
};

/** 字段类型 */
export type IFieldProps<T extends IEntity<T>> = {
  /** 字段类型 */
  fieldType?: string;
  /** 字段 props */
  fieldProps?:
    | {
        [key: string]: any;
      }
    | ((
        row: T,
      ) => {
        [key: string]: any;
      });
  required?: boolean;
  /** 重名校验 */
  uniqued?: boolean;
  /** 是否继承父节点配置 */
  inherit?: boolean;
  /** 递归改变子孙节点数据 */
  changeWithChildrenValue?: boolean;
  /** checkbox 联动赋值 */
  linkCheckboxValue?: boolean;
  /** 值变更时触发 */
  onChange?: (
    fieldName: IName[],
    value: any,
    { form, addChild, remove, setChildrenValue, setParentValue }: IOnChangeOptions,
  ) => void;
};

/** 列类型 */
export type IColumn<T extends IEntity<T>> =
  | (ColumnGroupType<T> & IFieldProps<T>)
  | (ColumnType<T> & IFieldProps<T>);

/**
 * EditableTable props
 */
export interface IEditableTableProps<T extends IEntity<T>> extends TableProps<T> {
  /** 表单字段 */
  name: string;
  /** 须提交的额外字段 */
  extraFieldNamesForSubmit?: string[];
  /** 表单实例 */
  form: FormInstance;
  /** 唯一键 */
  uniqueKey?: string;
  /** 列信息 */
  columns: Array<IColumn<T>>;
  /** 是否使用自定义操作列 */
  usingCustomActionColumn?: boolean;
  /** 表单的值 */
  value?: T[];
  /** 初始值 */
  initialValue?: T[];
  /** 行是否可展开 */
  rowExpandable?: (row: T) => boolean;
  /** 行是否可拖拽 */
  dragable?: boolean;
  /* 可否新增 */
  addable?: boolean;
  /* 最小行数 */
  min?: number;
  /* 最大行数 */
  max?: number;
  /* 子节点最小条数 */
  rowExpandMin?: number;
  /* 子节点最大条数 */
  rowExpandMax?: number;
  /** 可扩展时自动新增数据 */
  rowExpandAutoAdd?: boolean;
  /** 行数据校验 */
  validateRow?: (row: T) => void;
  /** 表单字段组件 */
  Fields?: {
    [key: string]: React.ComponentType<T>;
  };
  /** 字段校验规则 */
  rules?: Rule[];
}

/** 行的键 */
export type IRowKey<T extends IEntity<T>> = TableProps<T>['rowKey'];

/** Ref 引用 */
export type IRef<T extends IEntity<T>> =
  | {
      /** 新增一行 */
      addItem: (row?: T) => void;
      /** 删除一行 */
      removeItem: (row: T) => void;
      /** 获取可编辑表格的数据 */
      getValue: () => T[];
      /** 设置可编辑表格的数据 */
      setValue: (value: T[]) => void;
    }
  | undefined;
