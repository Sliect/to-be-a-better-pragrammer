import { useState, useEffect, useCallback } from 'react';
import { Option } from '../types';

export type Options = Option[] | ((params: any) => Promise<Option[]>);

export default (options: Options) => {
  const [innerOptions, setInnerOptions] = useState(Array.isArray(options) ? options : []);

  const fetchOptions = useCallback(
    (params?: any) => {
      if (typeof options === 'function') {
        return options(params).then((data) => {
          setInnerOptions(data);
        });
      }
    },
    [options],
  );

  useEffect(() => {
    if (typeof options === 'function') {
      fetchOptions();
    } else if (Array.isArray(options)) {
      setInnerOptions(options);
    }
  }, [options]);

  return {
    options: innerOptions,
    setOptions: setInnerOptions,
    fetchOptions,
  };
};
