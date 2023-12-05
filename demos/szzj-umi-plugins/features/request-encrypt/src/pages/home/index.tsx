import { useEffect } from 'react';
import { request } from 'umi';
import type { Response } from 'umi';

export default function Home() {
  useEffect(() => {
    // 请求体加密
    request<Response<unknown>>(`/test`, {
      encrypt: {
        type: 'AES',
      },
      data: { user: 'admin', password: '123456' },
    });

    // 指定字段加密
    request<Response<unknown>>(`/test`, {
      encrypt: {
        type: 'AES',
        fields: ['password'],
      },
      data: { user: 'admin', password: '123456' },
    });

    // 指定字段加密
    request<Response<unknown>>(
      `http://59.202.54.14:18087/mock/644793528807247e213956e7/ones/getEncryptedData`,
      {
        decrypt: {
          type: 'AES',
        },
        prefix: '',
      },
    ).then((res) => console.log(res));
  }, []);

  return <div></div>;
}
