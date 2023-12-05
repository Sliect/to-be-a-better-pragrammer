import { useEffect } from 'react';

/**
 * 组件挂载时执行 fn
 * @param fn
 */
const useMount = (fn: () => void) => {
  useEffect(() => fn?.(), []);
};

export default useMount;
