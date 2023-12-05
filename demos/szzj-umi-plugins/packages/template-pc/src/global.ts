import { message } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

/**
 * message 显示配置
 */
message.config({
  maxCount: 3,
});
