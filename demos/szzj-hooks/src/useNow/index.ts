import { useEffect, useState } from 'react';

export default function useNow(options?: { ms?: number }) {
  const { ms = 1000 } = options ?? {};
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(111);
      setNow(Date.now());
    }, ms);

    return () => clearInterval(interval);
  }, []);

  console.log(now);
  return {
    now,
  };
}
