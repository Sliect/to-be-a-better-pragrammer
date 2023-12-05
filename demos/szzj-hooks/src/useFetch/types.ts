export interface Options {
  /* 是否手动发起请求 */
  manual: boolean;
  /* 是否返回res.data */
  useData?: boolean;
  /* 请求失败的默认返回值 */
  defaultData?: any;
}
