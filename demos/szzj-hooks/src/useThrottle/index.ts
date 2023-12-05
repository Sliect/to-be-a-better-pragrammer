/*
 * @Author: zhangwei
 * @Date: 2021-12-07 15:22:13
 * @LastEditors: zhangwei
 * @LastEditTime: 2021-12-07 17:32:50
 * @Description: 
 * @Version: 
 * @FilePath: \szzj-hooks\src\useThrottle\index.ts
 */
import { useRef, useCallback, useEffect } from 'react';
function useThrottle(fn: (...args: any[]) => void, delay: number, dep = []) {
  const { current } = useRef({ fn, timer:  null as  unknown  });
  useEffect(
    function() {
      current.fn = fn;
    },
    [fn],
  );

  return useCallback(function f(this: unknown,...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
          if(current.timer){
            delete current.timer;
          }
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
}

export default useThrottle;
