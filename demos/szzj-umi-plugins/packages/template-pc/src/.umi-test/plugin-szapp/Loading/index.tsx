import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.loading}>
      <Spin tip="页面加载中..." className={styles.content} />
    </div>
  );
};
