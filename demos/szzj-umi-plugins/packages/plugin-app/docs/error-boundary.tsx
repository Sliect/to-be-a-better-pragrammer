import React from 'react';
import { ErrorBoundary } from '@szzj/components';

export default () => {
  return (
    <ErrorBoundary>
      <div
        onClick={() => {
          throw new Error('err');
        }}
      >
        报错
      </div>
    </ErrorBoundary>
  );
};
