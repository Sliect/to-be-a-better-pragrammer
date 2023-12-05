import { message } from 'antd';
import { request } from 'umi';

request.extendOptions({
  message: message.error,
});
