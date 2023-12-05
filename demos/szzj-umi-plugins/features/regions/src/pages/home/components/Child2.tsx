import { useRegions } from 'umi';

export default function Home() {

  const { locale, setLocale, currentRegionInfo, getMessage } = useRegions()

  console.log('子组件', locale, currentRegionInfo)
  return <>
    <div>子组件消息是：{getMessage('home.nav.goHome')}</div>
    <button onClick={() => setLocale('yc')}>切换语言</button>
  </>;
}
