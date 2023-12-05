import React from 'react';
import { useImmer } from '@szzj/hooks';

export default () => {
  const [immerState, setImmerState] = useImmer({ arr: [] });

  return (
    <div>
      {JSON.stringify(immerState)}
      <button
        onClick={() => {
          setImmerState(obj => {
            obj.arr.push(1);
          });
        }}
      >
        immer +1
      </button>
    </div>
  );
};
