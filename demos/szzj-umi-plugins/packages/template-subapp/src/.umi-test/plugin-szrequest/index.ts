// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import { getInstance, getMethods } from './instance';
import { get as GetType, post as PostType } from './types';
const request = getInstance({
  prefix: '',
});

const { get, post, put, del } = getMethods(request);

export {
  request,
  get,
  post,
  put,
  del,
}
