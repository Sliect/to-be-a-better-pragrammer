import React from 'react';
import { Button } from 'antd-mobile';

/**
 * 404 错误页面
 * @returns
 */
export default function Page404() {
  return (
    <Result
      status='warning'
      title='404'
      description='对不起，您访问的页面不存在'
    />
  )
};
