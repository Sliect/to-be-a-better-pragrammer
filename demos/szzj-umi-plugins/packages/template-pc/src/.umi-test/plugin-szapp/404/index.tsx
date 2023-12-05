import React from 'react';
import { Button, Result } from 'antd';
import { history } from 'umi';
import 'antd/es/result/style/index.js';
import 'antd/es/button/style/index.js';

/**
 * 404 错误页面
 * @returns
 */
export default function Page404() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的页面不存在"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          返回首页
        </Button>
      }
    />
  );
}
