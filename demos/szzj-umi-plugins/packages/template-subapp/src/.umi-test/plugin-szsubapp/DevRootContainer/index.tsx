import React from 'react';
import dayjs from 'dayjs';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import zh from 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn', zh);

export function rootContainer(container: React.ReactNode) {
  return <ConfigProvider locale={zh_CN}>{container}</ConfigProvider>;
}
