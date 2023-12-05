import { Toast } from 'antd-mobile';
import { request } from 'umi';

request.extendOptions({
  message: Toast.show,
});
