import React from 'react';
import { Button } from 'antd-mobile';

/**
 * 500 错误页面
 * @returns
 */
export default function Page500() {
  return (
    <Result
      status='warning'
      title='500'
      description='服务器异常'
    />
  )
};
