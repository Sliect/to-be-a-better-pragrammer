import { useEffect, useRef, useCallback } from 'react';

/**
 * 防抖hook -多次执行变为最后一次执行
 * 单位时间内事件触发会被重置，避免事件被误触发多次，触发高频事件，n秒内事件只会执行一次，如果n秒内再次触发，则会重新计算时间
 * @param fn 需要执行的函数
 * @param delay 延迟时间
 * @param immediate 是否立即执行
 */
const useDebounce = (
  fn: Function,
  options?: {
    delay: number;
    immediate: boolean;
  },
) => {
  const { delay = 500, immediate } = options || {};
  const fnRef = useRef(fn);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const execute = useCallback((...args) => {
    if (timerRef.current) {
      cancel();
    }

    if (immediate) {
      fnRef.current(...args);
    } else {
      timerRef.current = setTimeout(() => {
        fnRef.current(...args);
        timerRef.current = null;
      }, delay);
    }
  }, []);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cancel;
  }, [cancel]);

  return {
    execute,
    cancel,
  };
};

export default useDebounce;
