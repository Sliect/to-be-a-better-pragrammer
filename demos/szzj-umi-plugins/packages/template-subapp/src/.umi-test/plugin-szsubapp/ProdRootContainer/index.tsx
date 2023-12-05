import React from 'react';
import dayjs from 'dayjs';
import { ConfigProvider, Layout } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import zh from 'dayjs/locale/zh-cn';
import styles from './index.less';

dayjs.locale('zh-cn', zh);

const { Content } = Layout;

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider locale={zh_CN}>
      <Content className={styles.content}>{container}</Content>
    </ConfigProvider>
  );
}
