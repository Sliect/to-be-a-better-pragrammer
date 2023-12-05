import { DotLoading } from 'antd-mobile';

export default ({ text = '页面加载中' }: { text?: string }) => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '40vh' }}>
      {text}
      <DotLoading color="primary" />
    </div>
  );
};
