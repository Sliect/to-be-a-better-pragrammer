import { request } from 'umi';
import type { Response } from 'umi';

export default function Home() {
  const downloadStream = () => {
    request<Response<unknown>>(`/download/test.xlsx`, {
      method: 'get',
      attachment: true,
    });
  };

  const downloadNormal = () => {
    request<Response<unknown>>(`/test.png`, {
      prefix: '',
      method: 'get',
      attachment: { type: 'normal', name: 'test', extname: 'png' },
      headers: { test: '11' },
    });
  };

  return (
    <div>
      <div onClick={downloadStream} style={{ cursor: 'pointer', marginBottom: 10 }}>
        文件流下载
      </div>
      <div onClick={downloadNormal} style={{ cursor: 'pointer' }}>
        普通模式下载
      </div>
    </div>
  );
}
