import React from 'react';
import { When } from '@szzj/antd-form';
import styles from './index.less';

export default function Title({
  title,
  when,
}: {
  title: string;
  when?: [(vals: any) => boolean, string[]];
}) {
  return (
    <When when={when}>
      <div className={styles.container}>
        <span className={styles.mark} />
        <span className={styles.title}>{title}</span>
      </div>
    </When>
  );
}
