import { IEntity, IColumn } from './types';

const trasver = <T extends IEntity<T>>(
  rows: T[],
  columns: IColumn<T>[],
  { validateRow, level }: { validateRow?: (row: T) => void; level: number },
) => {
  const columnsWithRequired = columns.filter((column) => column.required);
  const fieldNamesShouldRequired = columnsWithRequired.map((column) => column.key!);
  rows.forEach((row) => {
    // 必填校验
    fieldNamesShouldRequired.forEach((name) => {
      if (row[name] === undefined || row[name] === null || row[name] === '') {
        const column = columnsWithRequired.find((column) => column.key === name)!;

        // 继承父级不必校验必填
        if (column.inherit && level !== 1) return;

        throw new Error(`${column.title}不能为空`);
      }
    });

    if (validateRow) validateRow(row);

    // 子级校验
    if (row.children) {
      trasver(row.children, columns, { validateRow, level: level + 1 });
    }
  });

  // 重复校验
  const columnsWithUniqued = columns.filter((column) => column.uniqued);
  const fieldNamesShouldUnique = columnsWithUniqued.map((column) => column.key!);
  fieldNamesShouldUnique.forEach((name) => {
    const vals = rows.map((row) => row[name]);
    const setVals = new Set(vals);
    if (setVals.size < vals.length) {
      const column = columnsWithUniqued.find((column) => column.key === name)!;
      throw new Error(`同一层级不能有相同的${column.title}`);
    }
  });
};

/** 校验 */
export const validate = <T extends IEntity<T>>(
  values: T[],
  columns: IColumn<T>[],
  validateRow?: (row: T) => void,
) => {
  trasver(values, columns, { validateRow, level: 1 });
};
