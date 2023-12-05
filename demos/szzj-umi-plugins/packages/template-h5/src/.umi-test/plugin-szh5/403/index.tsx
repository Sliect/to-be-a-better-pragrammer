import React from 'react';
import { Result } from 'antd-mobile';

/**
 * 403 错误页面
 * @returns
 */
export default function Page403() {
  return (
    <Result
      status='warning'
      title='403'
      description='对不起，您没有足够的权限访问页面'
    />
  )
};
