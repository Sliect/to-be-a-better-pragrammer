import { useEffect } from 'react';
import { useRegions } from 'umi';
import Child from './components/Child';
import Child2 from './components/Child2';

export default function Home() {

  const { regionInfo } = useRegions()

  console.log(regionInfo);
  return <>
    <Child />
    <Child2 />
  </>;
}
