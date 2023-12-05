import React from 'react';
import { Button, Result } from 'antd';
import { history } from 'umi';
import 'antd/es/result/style/index.js';
import 'antd/es/button/style/index.js';

/**
 * 500 错误页面
 * @returns
 */
export default function Page500() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="服务器异常"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          返回首页
        </Button>
      }
    />
  );
}
