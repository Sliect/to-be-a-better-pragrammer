import { useRef } from 'react';

/**
 * 实时读取 value 值变更，避免 useCallback 等缓存影响
 * @param value
 * @returns
 */
const useRealtimeRef = <T>(value: T) => {
  const ref = useRef<T>(value);
  ref.current = value;

  return ref;
};

export default useRealtimeRef;
