import { useEffect } from 'react';
import useRealtimeRef from '../useRealtimeRef';

/**
 * 组件卸载时执行 fn
 * @param fn
 */
const useUnmount = (fn: () => void) => {
  const fnRef = useRealtimeRef(fn);

  useEffect(() => {
    return () => fnRef.current?.();
  }, []);
};

export default useUnmount;
