/**
 * 提取对象数据，构建新对象
 * @param source
 * @param keys
 * @returns
 */
export const extract = (source: Record<string, any>, keys: string[]) => {
  const result: Record<string, any> = {};

  keys.forEach((key) => {
    if (key in source) {
      result[key] = source[key];
    }
  });

  return result;
};
