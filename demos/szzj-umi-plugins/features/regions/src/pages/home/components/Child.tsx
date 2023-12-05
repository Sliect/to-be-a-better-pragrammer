import { useRegions } from 'umi';

export default function Home() {

  const {  setLocale, getMessage } = useRegions()

  return <div style={{marginBottom: '50px'}}>
    <div>子组件消息是：{getMessage('home.nav.goHome')}</div>
    <button onClick={() => setLocale('yc')}>切换语言</button>
  </div>;
}
