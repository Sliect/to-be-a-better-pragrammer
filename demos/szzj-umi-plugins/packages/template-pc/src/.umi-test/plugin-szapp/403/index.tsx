import React from 'react';
import { Result, Button } from 'antd';
import { history } from 'umi';
import 'antd/es/result/style/index.js';
import 'antd/es/button/style/index.js';

/**
 * 403 错误页面
 * @returns
 */
export default function Page403() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="对不起，您没有足够的权限访问页面"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          返回首页
        </Button>
      }
    />
  );
}
