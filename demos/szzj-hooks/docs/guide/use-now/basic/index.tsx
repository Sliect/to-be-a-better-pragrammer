import React, { useMemo } from 'react';
import { useNow } from '@szzj/hooks';

export default () => {
  const { now } = useNow();
  const date = useMemo(() => new Date(now), [now]);

  return (
    <div>
      <div>year: {date.getFullYear()}</div>
      <div>month: {date.getMonth()}</div>
      <div>day: {date.getDay()}</div>
      <div>hour: {date.getHours()}</div>
      <div>minute: {date.getMinutes()}</div>
      <div>second: {date.getSeconds()}</div>
    </div>
  );
};
